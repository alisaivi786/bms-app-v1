import { v4 as uuidv4 } from 'uuid';
import { requestAxiosApi } from './helpers/request-axios-api';
import { requestFetchApi } from './helpers/request-fetch-api';
import { validate } from './helpers/validate';
import {
	APICallOptions,
	APIHttpStatusCode,
	APIMethods,
	APIParameterValueType,
	APIParametersType,
	TFuncCreateAPIDefinition,
} from './types';

export function createAPIDefinition<
	TResponse extends Zod.ZodTypeAny,
	TOriginalResponse extends Zod.ZodTypeAny,
	TRequest extends Zod.ZodTypeAny,
	TErrorCodes extends string = never,
	TErrorFields extends string = never,
	TMethod extends APIMethods | undefined = undefined,
	THeaders extends APIParameterValueType | undefined = undefined,
	TParameters extends APIParameterValueType | undefined = undefined
>(
	...args: Parameters<
		TFuncCreateAPIDefinition<
			TResponse,
			TOriginalResponse,
			TMethod,
			TRequest,
			THeaders,
			TParameters,
			TErrorCodes,
			TErrorFields
		>
	>
): ReturnType<
	TFuncCreateAPIDefinition<
		TResponse,
		TOriginalResponse,
		TMethod,
		TRequest,
		THeaders,
		TParameters,
		TErrorCodes,
		TErrorFields
	>
> {
	return (async (request: unknown, options?: APICallOptions) => {
		/**
		 * args[0] is the internal configs
		 * args[1] is the global configs which is used only internally inside apiFactory and excluded from the external usage and types
		 */
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const config = { ...(args as any)?.[1]?.(), ...args[0] } as (typeof args)[0];
		const hasHeadersOrParameters = config.requestParameters || config.requestHeaders;
		const requestBody = hasHeadersOrParameters ? (request as { body?: unknown }).body : request;
		const requestId = uuidv4();

		const requestParameters = hasHeadersOrParameters
			? (request as { parameters?: APIParametersType }).parameters
			: undefined;
		const requestHeaders = hasHeadersOrParameters ? (request as { headers?: APIParametersType }).headers : undefined;

		const {
			method = 'GET',
			responseSchema,
			originalResponseSchema,
			url,
			baseUrl,
			headers = {},
			validationMode = 'Warning',
			transformError,
			transformResponse,
			isErrorResponse = ({ status }: { status: APIHttpStatusCode }) => status >= APIHttpStatusCode.BadRequest,
			refreshToken,
			timeout,
			retryConfig,
			responseType,
			httpClient = 'axios',
		} = config;

		if (!method && method !== 'GET') {
			if (!requestBody) throw Error('[API] request body is required');

			validate({
				requestId,
				validationMode,
				url,
				validationSchema: config.requestSchema,
				code: 'InvalidRequestSchema',
				data: requestBody,
			});
		}

		// Determine if streaming based on whether onStreamData callback is provided
		const isStreaming = !!options?.onStreamData;
		// Use fetch API if explicitly requested OR if streaming is detected
		const shouldUseFetch = httpClient === 'fetch' || isStreaming;

		const {
			data: originalResponse,
			status,
			headers: responseHeader,
		} = shouldUseFetch
			? await requestFetchApi(
					baseUrl,
					headers,
					requestHeaders,
					requestParameters,
					url,
					method,
					requestBody,
					refreshToken,
					requestId,
					timeout,
					retryConfig,
					options?.onStreamData,
					options?.onProgress,
					options?.signal
			  )
			: await requestAxiosApi(
					baseUrl,
					headers,
					requestHeaders,
					requestParameters,
					url,
					method,
					requestBody,
					refreshToken,
					requestId,
					timeout,
					responseType,
					retryConfig,
					options?.onProgress,
					options?.signal
			  );

		validate({
			requestId,
			validationMode,
			url,
			validationSchema: originalResponseSchema,
			code: 'InvalidOriginalResponseSchema',
			data: originalResponse,
			status,
		});

		const isError =
			status >= APIHttpStatusCode.BadRequest ||
			isErrorResponse({
				status: status as APIHttpStatusCode,
				response: originalResponse,
				url,
				headers: responseHeader,
			});

		if (isError) {
			throw (
				transformError?.(originalResponse, status as APIHttpStatusCode, url, responseHeader) ?? {
					mapped: [{ code: 'NoErrorCodeMapping' }],
					status,
					originalResponse: originalResponse,
				}
			);
		}

		const transformedData = transformResponse ? transformResponse(originalResponse, responseHeader) : originalResponse;

		validate({
			requestId,
			validationMode,
			url,
			validationSchema: responseSchema,
			code: 'InvalidResponseSchema',
			data: transformedData,
			transformedData,
			status,
		});

		return transformedData;
	}) as ReturnType<
		TFuncCreateAPIDefinition<
			TResponse,
			TOriginalResponse,
			TMethod,
			TRequest,
			THeaders,
			TParameters,
			TErrorCodes,
			TErrorFields
		>
	>;
}
