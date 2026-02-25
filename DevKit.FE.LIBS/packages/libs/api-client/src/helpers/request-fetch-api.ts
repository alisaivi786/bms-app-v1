import { z } from 'zod';
import { logger } from '@devkit/utilities/dist/Debug';
import {
	APIHeaders,
	APIParametersType,
	APIRefreshToken,
	NetworkConnectionStatusCode,
	NoStatusCode,
	ProgressEventCallBack,
	RetryConfig,
	StreamingDataCallback,
} from '../types';
import { prepareRequestBody } from './fetch/fetch-formdata-helpers';
import {
	checkInternalServerError,
	checkMethodNotAllowed,
	checkNetworkError,
	extractResponseHeaders,
	handleErrorResponse,
	handleStreamingResponse,
	isUnauthorizedError,
} from './fetch/fetch-response-handlers';
import { getRetryDelay, shouldRetryRequest } from './fetch/fetch-retry-helpers';
import { makeXHRRequest } from './fetch/fetch-xhr-wrapper';
import getUrlWithPathParams from './transform-url';

export async function requestFetchApi<TRequest extends Zod.ZodTypeAny>(
	baseURL: string | undefined,
	headers: APIHeaders,
	requestSpecificHeaders: undefined | APIParametersType,
	requestSpecificParameters: undefined | APIParametersType,
	url: string,
	method: string,
	request: z.infer<TRequest> | undefined,
	refreshToken: undefined | APIRefreshToken,
	requestId: string,
	timeout: number | undefined,
	retryConfig?: RetryConfig,
	onStreamData?: StreamingDataCallback,
	onProgress?: ProgressEventCallBack,
	signal?: AbortSignal
): Promise<{ data: unknown; status: number; headers: Record<string, unknown> }> {
	const urlWithParams = getUrlWithPathParams(url, requestSpecificParameters);
	const customHeaders: Record<string, string> = {};

	Object.keys(requestSpecificHeaders ?? {}).forEach((key) => {
		const value = requestSpecificHeaders?.[key];

		if (value) {
			if (Array.isArray(value)) {
				customHeaders[key] = value.join(',');
			} else {
				customHeaders[key] = String(value);
			}
		}
	});

	const resolvedHeaders: Record<string, string> = {};

	for (const [key, value] of Object.entries({ ...headers, ...customHeaders })) {
		if (typeof value === 'function') {
			resolvedHeaders[key] = (await value()) || '';
		} else {
			resolvedHeaders[key] = value || '';
		}
	}

	const fullUrl = baseURL ? `${baseURL}${urlWithParams}` : urlWithParams;

	logger.log(requestId, '[devkit][API-Client][fetch-request]', fullUrl, {
		baseUrl: baseURL,
		method,
		data: request,
		headers: resolvedHeaders,
	});

	const maxRetries = retryConfig?.retries ?? 2;
	let lastError: unknown;

	// Determine if this is a multipart/form-data request
	const isMultipartFormData = resolvedHeaders['Content-Type']?.includes('multipart/form-data');

	// Prepare the request body
	const requestBody = prepareRequestBody(request, isMultipartFormData);

	// Remove Content-Type header for FormData to let browser set it with boundary
	if (isMultipartFormData) {
		delete resolvedHeaders['Content-Type'];
	}

	// For upload progress with multipart/form-data, use XMLHttpRequest since Fetch API doesn't support it
	if (isMultipartFormData && onProgress && requestBody) {
		return makeXHRRequest(
			method,
			fullUrl,
			resolvedHeaders,
			requestBody as FormData,
			timeout,
			onProgress,
			requestId,
			signal
		);
	}

	// Retry loop
	for (let retryCount = 0; retryCount <= maxRetries; retryCount++) {
		try {
			// Create a controller for timeout only; if a signal is provided, use it directly
			let timeoutId: NodeJS.Timeout | undefined;
			let finalSignal: AbortSignal | undefined = undefined;

			const timeoutController = timeout ? new AbortController() : undefined;

			if (signal && timeoutController) {
				if (signal.aborted) {
					timeoutController.abort();
				} else {
					signal.addEventListener('abort', () => timeoutController.abort(), { once: true });
				}
			}

			if (timeoutController && timeout) {
				timeoutId = setTimeout(() => timeoutController.abort(), timeout);
			}

			finalSignal = timeoutController?.signal ?? signal;

			const response = await fetch(fullUrl, {
				method,
				headers: resolvedHeaders,
				body: requestBody,
				signal: finalSignal,
			});

			if (timeoutId) clearTimeout(timeoutId);

			const responseHeaders = extractResponseHeaders(response);
			const status = response.status;

			// Check for network connection error
			checkNetworkError(status, requestId, fullUrl);

			// Handle Unauthorized with token refresh
			if (isUnauthorizedError(status)) {
				logger.error(requestId, '[devkit][API-Client][fetch-error]', fullUrl, 'Unauthorized');

				const newAccessToken = await refreshToken?.(headers, responseHeaders);

				if (newAccessToken) {
					const newHeaders = { ...headers, Authorization: `Bearer ${newAccessToken}` };

					return requestFetchApi(
						baseURL,
						newHeaders,
						requestSpecificHeaders,
						requestSpecificParameters,
						url,
						method,
						request,
						undefined, // to try refresh only once
						requestId,
						timeout,
						retryConfig,
						onStreamData,
						onProgress
					);
				} else {
					throw { mapped: [{ code: 'Unauthorized' }], status };
				}
			}

			// Handle MethodNotAllowed
			checkMethodNotAllowed(status, requestId, fullUrl);

			// Handle InternalServerError
			await checkInternalServerError(status, response, requestId, fullUrl);

			// Handle other error responses
			if (!response.ok) {
				return handleErrorResponse(response, requestId, fullUrl);
			}

			// Handle streaming response with progress tracking
			const { data, headers: finalHeaders } = await handleStreamingResponse(
				response,
				requestId,
				fullUrl,
				onStreamData,
				onProgress
			);

			return { data, status: response.status, headers: finalHeaders };
		} catch (ex) {
			lastError = ex;

			// Don't retry on timeout
			if (ex instanceof Error && ex.name === 'AbortError') {
				logger.error(requestId, '[devkit][API-Client][fetch-error]', fullUrl, 'Request timeout');
				throw { mapped: [{ code: 'NetworkConnection' }], status: NetworkConnectionStatusCode };
			}

			// If it's already a formatted error from our handling above, check if we should retry
			if (typeof ex === 'object' && ex !== null && 'mapped' in ex) {
				const errorStatus = (ex as unknown as { status: number }).status;

				// Check if this is the last retry or if we shouldn't retry this error
				if (retryCount >= maxRetries || !shouldRetryRequest(errorStatus, retryConfig)) {
					throw ex;
				}

				// Wait before retrying
				const delay = getRetryDelay(retryCount, retryConfig);

				logger.warn(requestId, '[devkit][API-Client][fetch-retry]', fullUrl, {
					attempt: retryCount + 1,
					maxRetries,
					delay,
					status: errorStatus,
				});
				await new Promise((resolve) => setTimeout(resolve, delay));
				continue; // Retry
			}

			// Handle unexpected errors
			logger.error(requestId, '[devkit][API-Client][fetch-error]', fullUrl, ex);
			throw { mapped: [{ code: 'UnexpectedError' }], originalResponse: ex?.toString(), status: NoStatusCode };
		}
	}

	// If we've exhausted all retries, throw the last error
	throw (
		lastError || {
			mapped: [{ code: 'UnexpectedError' }],
			originalResponse: 'Max retries exceeded',
			status: NoStatusCode,
		}
	);
}
