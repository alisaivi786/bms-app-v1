import { logger } from '@devkit/utilities/dist/Debug';
import {
	APIHttpStatusCode,
	NetworkConnectionStatusCode,
	ProgressEventCallBack,
	StreamingDataCallback,
} from '../../types';

/**
 * Handles streaming response data with progress tracking
 * @param response - Fetch Response object
 * @param requestId - Request ID for logging
 * @param fullUrl - Complete URL for logging
 * @param onStreamData - Optional streaming data callback
 * @param onProgress - Optional progress callback
 * @returns Response data and headers
 */
export const handleStreamingResponse = async (
	response: Response,
	requestId: string,
	fullUrl: string,
	onStreamData?: StreamingDataCallback,
	onProgress?: ProgressEventCallBack
): Promise<{ data: unknown; headers: Record<string, unknown> }> => {
	if (!response.body) {
		throw new Error('Response body is null');
	}

	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let fullData = '';

	// Get content length for progress tracking
	const contentLength = response.headers.get('content-length');
	const total = contentLength ? parseInt(contentLength, 10) : 0;
	let loaded = 0;

	try {
		// eslint-disable-next-line no-constant-condition
		while (true) {
			const { done, value } = await reader.read();

			if (done) break;

			const chunk = decoder.decode(value, { stream: true });

			fullData += chunk;

			// Update progress
			if (value) {
				loaded += value.byteLength;

				if (onProgress && total > 0) {
					const percentage = Math.round((loaded / total) * 100);

					onProgress({
						loaded,
						total,
						progress: loaded / total,
						bytes: loaded,
						rate: undefined,
						estimated: undefined,
						download: true,
						upload: false,
						percentage,
					});
				}
			}

			if (onStreamData) {
				onStreamData(fullData);
			}
		}
	} finally {
		reader.releaseLock();
	}

	logger.log(requestId, '[devkit][API-Client][fetch-success]', fullUrl, {
		dataLength: fullData.length,
		status: response.status,
	});

	// Parse JSON if not streaming (when onStreamData is not provided, we should parse as JSON)
	let parsedData: unknown = fullData;

	if (!onStreamData) {
		try {
			parsedData = JSON.parse(fullData);
		} catch (parseError) {
			// If parsing fails, return the raw string (might be plain text response)
			parsedData = fullData;
		}
	}

	const responseHeaders: Record<string, unknown> = {};

	response.headers.forEach((value, key) => {
		responseHeaders[key] = value;
	});

	return { data: parsedData, headers: responseHeaders };
};

/**
 * Handles error responses from the Fetch API
 * @param response - Fetch Response object
 * @param requestId - Request ID for logging
 * @param fullUrl - Complete URL for logging
 * @returns Response data with error information
 */
export const handleErrorResponse = async (
	response: Response,
	requestId: string,
	fullUrl: string
): Promise<{ data: unknown; status: number; headers: Record<string, unknown> }> => {
	const errorText = await response.text();
	let errorData;

	try {
		errorData = JSON.parse(errorText);
	} catch {
		errorData = errorText;
	}

	const responseHeaders: Record<string, unknown> = {};

	response.headers.forEach((value, key) => {
		responseHeaders[key] = value;
	});

	logger.error(requestId, '[devkit][API-Client][fetch-error]', fullUrl, {
		status: response.status,
		error: errorData,
	});

	return { data: errorData, status: response.status, headers: responseHeaders };
};

/**
 * Checks for network connection errors
 * @param status - HTTP status code
 * @param requestId - Request ID for logging
 * @param fullUrl - Complete URL for logging
 */
export const checkNetworkError = (status: number, requestId: string, fullUrl: string): void => {
	if (status === NetworkConnectionStatusCode) {
		logger.error(requestId, '[devkit][API-Client][fetch-error]', fullUrl, 'NetworkConnection');
		throw { mapped: [{ code: 'NetworkConnection' }], status };
	}
};

/**
 * Handles unauthorized responses with potential token refresh
 * @param status - HTTP status code
 * @returns true if this is an unauthorized error
 */
export const isUnauthorizedError = (status: number): boolean => {
	return status === APIHttpStatusCode.Unauthorized;
};

/**
 * Handles method not allowed errors
 * @param status - HTTP status code
 * @param requestId - Request ID for logging
 * @param fullUrl - Complete URL for logging
 */
export const checkMethodNotAllowed = (status: number, requestId: string, fullUrl: string): void => {
	if (status === APIHttpStatusCode.MethodNotAllowed) {
		logger.error(requestId, '[devkit][API-Client][fetch-error]', fullUrl, 'MethodNotAllowed');
		throw { mapped: [{ code: 'MethodNotAllowed' }], status };
	}
};

/**
 * Handles internal server errors
 * @param status - HTTP status code
 * @param response - Fetch Response object
 * @param requestId - Request ID for logging
 * @param fullUrl - Complete URL for logging
 */
export const checkInternalServerError = async (
	status: number,
	response: Response,
	requestId: string,
	fullUrl: string
): Promise<void> => {
	if (status === APIHttpStatusCode.InternalServerError) {
		const errorText = await response.text();
		let errorData;

		try {
			errorData = JSON.parse(errorText);
		} catch {
			errorData = errorText;
		}

		logger.error(requestId, '[devkit][API-Client][fetch-error]', fullUrl, 'UnexpectedError');

		throw {
			mapped: [{ code: 'UnexpectedError' }],
			status,
			originalResponse: errorData,
		};
	}
};

/**
 * Extracts response headers from a Fetch Response
 * @param response - Fetch Response object
 * @returns Headers as a record object
 */
export const extractResponseHeaders = (response: Response): Record<string, unknown> => {
	const headers: Record<string, unknown> = {};

	response.headers.forEach((value, key) => {
		headers[key] = value;
	});

	return headers;
};
