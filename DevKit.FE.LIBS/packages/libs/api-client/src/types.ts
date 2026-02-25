import { AxiosError, AxiosProgressEvent } from 'axios';
import { z } from 'zod';

export const NoStatusCode = 999;

export const NetworkConnectionStatusCode = 998;

/**
 * HTTP Status Code mapping
 * Internal status codes for the API client
 */
export const APIHttpStatusCode = {
	// 2xx Success
	Ok: 200,
	Created: 201,
	Accepted: 202,
	NoContent: 204,

	// 3xx Redirection
	MovedPermanently: 301,
	Found: 302,
	NotModified: 304,

	// 4xx Client Errors
	BadRequest: 400,
	Unauthorized: 401,
	PaymentRequired: 402,
	Forbidden: 403,
	NotFound: 404,
	MethodNotAllowed: 405,
	NotAcceptable: 406,
	RequestTimeout: 408,
	Conflict: 409,
	Gone: 410,
	UnprocessableEntity: 422,
	TooManyRequests: 429,

	// 5xx Server Errors
	InternalServerError: 500,
	NotImplemented: 501,
	BadGateway: 502,
	ServiceUnavailable: 503,
	GatewayTimeout: 504,
} as const;

export type APIHttpStatusCode = (typeof APIHttpStatusCode)[keyof typeof APIHttpStatusCode];

export type APIHeaders =
	| { [key in 'Authorization' | 'Content-Type']?: string | (() => string | Promise<string | undefined>) }
	| { [key in string]?: string | (() => string | Promise<string | undefined>) };

export type APIRefreshToken = (
	headers: APIHeaders,
	responseHeaders: Record<string, unknown>
) => Promise<string | undefined>;

export type APIParameterValueType = Record<
	string,
	['required' | 'optional', 'string' | 'number' | 'stringArray' | 'numberArray']
>;

export type APIParametersType = Record<string, string | number | string[] | number[]>;

type OmitUndefined<T> = { [K in keyof T as T[K] extends undefined ? never : K]: T[K] };

export type APIParameterType<T extends APIParameterValueType> = OmitUndefined<{
	[key in keyof T]: T[key][0] extends 'optional'
		? undefined
		: T[key][1] extends 'string'
		? string
		: T[key][1] extends 'number'
		? number
		: T[key][1] extends 'stringArray'
		? string[]
		: T[key][1] extends 'numberArray'
		? number[]
		: never;
}> &
	Partial<
		OmitUndefined<{
			[key in keyof T]: T[key][0] extends 'required'
				? undefined
				: T[key][1] extends 'string'
				? string
				: T[key][1] extends 'number'
				? number
				: T[key][1] extends 'stringArray'
				? string[]
				: T[key][1] extends 'numberArray'
				? number[]
				: never;
		}>
	>;

export type APIDefinitionsErrors =
	| 'NoErrorCodeMapping'
	| 'Unauthorized'
	| 'MethodNotAllowed'
	| 'UnexpectedError'
	| 'NetworkConnection'
	| 'InvalidRequestSchema'
	| 'InvalidResponseSchema'
	| 'InvalidOriginalResponseSchema'
	| 'InvalidConfiguration';

export type ValidationMode = 'Warning' | 'Error';

export type APIMethods = 'POST' | 'PATCH' | 'PUT' | 'GET' | 'DELETE';

type StringLiteral<T> = T extends string ? (string extends T ? never : T) : never;

export type APIResponsePromise<TSuccess, TError = unknown> = {
	then<TResult = never>(
		onfulfilled?: ((value: TSuccess) => TResult | PromiseLike<TResult>) | undefined | null,
		onrejected?: ((reason: TError) => TResult | PromiseLike<TResult>) | undefined | null
	): APIResponsePromise<TSuccess | TResult, TError>;
	catch<TResult = never>(
		onrejected?: ((reason: TError) => TResult | PromiseLike<TResult>) | undefined | null
	): APIResponsePromise<TSuccess | TResult, TError>;
} & Promise<TSuccess>;

export type TypeOfAPIError<TDef> = TDef extends (...args: infer TArgs) => APIResponsePromise<unknown, infer TErrors>
	? TErrors
	: unknown;

export type TypeOfAPIResponse<TDef> = TDef extends (
	...args: infer TArgs
) => APIResponsePromise<infer TResponse, unknown>
	? TResponse
	: unknown;

export type ApiErrors<TCode extends string, TField extends string, TOriginalResponse extends Zod.ZodTypeAny> = {
	mapped: { code: TCode; message?: string; field?: TField }[];
	originalResponse?: z.infer<TOriginalResponse>;
	status?: number;
};

export type RetryCondition = (error: AxiosError<unknown, unknown>) => boolean;

export type RetryDelay = (retryCount: number, error: AxiosError<unknown, unknown>) => number;

export type RetryConfig = {
	retries?: number;
	retryCondition?: RetryCondition;
	retryDelay?: RetryDelay;
};

export type APIRequestGlobalConfig<
	TResponse extends Zod.ZodTypeAny,
	TOriginalResponse extends Zod.ZodTypeAny,
	TErrorCodes extends string
> = {
	baseUrl?: string;
	originalResponseSchema?: TOriginalResponse;
	isErrorResponse?: (options: {
		status: APIHttpStatusCode;
		response: z.infer<TOriginalResponse>;
		url: string;
		headers: Record<string, unknown>;
	}) => boolean;
	transformResponse?: (
		response: z.infer<TOriginalResponse>,
		headers: Record<string, unknown>
	) => z.infer<TResponse> | undefined;
	transformError?: (
		response: z.infer<TOriginalResponse>,
		status: APIHttpStatusCode,
		url: string,
		headers: Record<string, unknown>
	) => ApiErrors<string, string, TOriginalResponse> | undefined;
	errorCodes?: TErrorCodes[];
	validationMode?: ValidationMode;
	headers?: APIHeaders;
	/**
	 * Function to refresh the token when the api returns 401
	 * @returns {Promise<string | undefined>} new access token to be used in the next request or undefined to cancel the request
	 */
	refreshToken?: APIRefreshToken;
	timeout?: number;
	retryConfig?: RetryConfig;
	/**
	 * HTTP client to use for making requests.
	 * - 'axios': Use Axios library (default, full-featured with better browser compatibility)
	 * - 'fetch': Use native Fetch API (modern, lightweight)
	 *
	 * Note: Streaming is automatically enabled when onStreamData callback is provided in options.
	 * @default 'axios'
	 */
	httpClient?: 'axios' | 'fetch';
};

export type APIRequestConfig<
	TResponse extends Zod.ZodTypeAny,
	TOriginalResponse extends Zod.ZodTypeAny,
	TErrorCodes extends string,
	TErrorFields extends string,
	TMethod extends APIMethods | undefined,
	TRequest extends Zod.ZodTypeAny | undefined,
	THeaders extends APIParameterValueType | undefined,
	TParameters extends APIParameterValueType | undefined
> = (TMethod extends Exclude<APIMethods, 'GET'>
	? {
			url: string;
			requestSchema: TRequest;
			requestParameters?: TParameters;
			requestHeaders?: THeaders;
			responseSchema: TResponse;
			method?: TMethod;
			errorFields?: TErrorFields[];
			responseType?: 'json' | 'blob' | 'arraybuffer';
	  }
	: {
			url: string;
			requestSchema?: TRequest;
			requestParameters?: TParameters;
			requestHeaders?: THeaders;
			responseSchema: TResponse;
			method?: TMethod;
			errorFields?: TErrorFields[];
			responseType?: 'json' | 'blob' | 'arraybuffer';
	  }) &
	APIRequestGlobalConfig<TResponse, TOriginalResponse, TErrorCodes>;

type TBodyHelper<TRequest extends Zod.ZodTypeAny | undefined> = z.infer<TRequest & Record<string, never>>;

type THeadersHelper<TParameters extends APIParameterValueType | undefined> = APIParameterType<
	TParameters & Record<string, never>
>;

export type ProgressEvent = AxiosProgressEvent & { percentage: number };

export type ProgressEventCallBack = (progressEvent: ProgressEvent) => void;

export type StreamingDataCallback = (partialData: string) => void;

/**
 * Options for API calls
 * @property onProgress - Callback for upload/download progress (works with both Axios and Fetch)
 * @property onStreamData - Callback for streaming data chunks (automatically enables Fetch API and streaming mode)
 */
export type APICallOptions = {
	/** Callback for tracking upload/download progress. Works with both Axios and Fetch API implementations. */
	onProgress?: ProgressEventCallBack;
	/** Callback for receiving streaming data chunks. When provided, automatically uses Fetch API with streaming. */
	onStreamData?: StreamingDataCallback;
	/** Optional AbortSignal to cancel the request */
	signal?: AbortSignal;
};

type TAPICallOptions = Parameters<(options?: APICallOptions) => void>;

type TBodyBasedParam<
	TRequest extends Zod.ZodTypeAny | undefined,
	THeaders extends APIParameterValueType | undefined,
	TParameters extends APIParameterValueType | undefined
> = TParameters extends undefined
	? THeaders extends undefined
		? TBodyHelper<TRequest>
		: { body: TBodyHelper<TRequest>; headers: THeadersHelper<THeaders> }
	: THeaders extends undefined
	? { body: TBodyHelper<TRequest>; parameters: THeadersHelper<TParameters> }
	: { body: TBodyHelper<TRequest>; headers: THeadersHelper<THeaders>; parameters: THeadersHelper<TParameters> };

export type TFuncCreateAPIDefinition<
	TResponse extends Zod.ZodTypeAny,
	TOriginalResponse extends Zod.ZodTypeAny,
	TMethod extends APIMethods | undefined,
	TRequest extends Zod.ZodTypeAny | undefined,
	THeaders extends APIParameterValueType | undefined,
	TParameters extends APIParameterValueType | undefined,
	TErrorCodes extends string,
	TErrorFields extends string
> = (
	requestConfig: APIRequestConfig<
		TResponse,
		TOriginalResponse,
		TErrorCodes,
		TErrorFields,
		TMethod,
		TRequest,
		THeaders,
		TParameters
	>
) => TMethod extends Exclude<APIMethods, 'GET'>
	? (
			...args: [TBodyBasedParam<TRequest, THeaders, TParameters>, ...TAPICallOptions]
	  ) => APIResponsePromise<
			z.infer<TResponse>,
			ApiErrors<StringLiteral<TErrorCodes | APIDefinitionsErrors>, TErrorFields, TOriginalResponse>
	  >
	: TParameters extends undefined
	? THeaders extends undefined
		? (
				...args: [...TAPICallOptions]
		  ) => APIResponsePromise<
				z.infer<TResponse>,
				ApiErrors<StringLiteral<TErrorCodes | APIDefinitionsErrors>, TErrorFields, TOriginalResponse>
		  >
		: (
				...args: [{ headers: THeadersHelper<THeaders> }, ...TAPICallOptions]
		  ) => APIResponsePromise<
				z.infer<TResponse>,
				ApiErrors<StringLiteral<TErrorCodes | APIDefinitionsErrors>, TErrorFields, TOriginalResponse>
		  >
	: (
			...args: THeaders extends undefined
				? [{ parameters: THeadersHelper<TParameters> }, ...TAPICallOptions]
				: [{ headers: THeadersHelper<THeaders>; parameters: THeadersHelper<TParameters> }, ...TAPICallOptions]
	  ) => APIResponsePromise<
			z.infer<TResponse>,
			ApiErrors<StringLiteral<TErrorCodes | APIDefinitionsErrors>, TErrorFields, TOriginalResponse>
	  >;
