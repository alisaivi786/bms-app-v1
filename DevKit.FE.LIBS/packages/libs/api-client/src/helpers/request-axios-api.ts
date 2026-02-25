import axios, { AxiosError, AxiosHeaderValue, AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';
import axiosRetry, { exponentialDelay } from 'axios-retry';
import { isNil } from 'lodash';
import { z } from 'zod';
import { logger } from '@devkit/utilities/dist/Debug';
import {
	APIHeaders,
	APIHttpStatusCode,
	APIParametersType,
	APIRefreshToken,
	NetworkConnectionStatusCode,
	NoStatusCode,
	ProgressEventCallBack,
	RetryConfig,
} from '../types';
import getUrlWithPathParams from './transform-url';

const convertResponseDataToJson = async (response: AxiosResponse | undefined, requestId: string) => {
	const hasContentData = response?.data instanceof Blob ? response.data.size : !!response?.data;

	if (hasContentData && !response?.headers['content-type']) {
		logger.warn(
			requestId,
			'[devkit][API-Client][convertResponseDataToJson]',
			'content type header is missing in response'
		);

		return response?.data;
	}

	if (hasContentData && response?.headers['content-type'].includes('json')) {
		if (response.data instanceof Blob) {
			return JSON.parse(await response.data.text());
		} else {
			return response.data;
		}
	}

	return response?.data;
};

export async function requestAxiosApi<TRequest extends Zod.ZodTypeAny>(
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
	responseType?: 'json' | 'blob' | 'arraybuffer',
	retryConfig?: RetryConfig,
	progressEventCallBack?: ProgressEventCallBack,
	signal?: AbortSignal
): Promise<{ data: unknown; status: number; headers: Record<string, unknown> }> {
	const urlWithParams = getUrlWithPathParams(url, requestSpecificParameters);
	const customHeaders: Record<string, AxiosHeaderValue> = {};

	Object.keys(requestSpecificHeaders ?? {}).forEach((key) => {
		const value = requestSpecificHeaders?.[key];

		if (value) {
			if (Array.isArray(value)) {
				customHeaders[key] = value.join(',');
			} else {
				customHeaders[key] = value;
			}
		}
	});

	const combinedHeaders = await Promise.all(
		Object.entries({ ...headers, ...customHeaders }).map(async ([key, value]) => {
			if (typeof value === 'function') return [key, await value()];
			else return [key, value];
		})
	);

	const axiosRequestConfig: AxiosRequestConfig = {
		baseURL,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		headers: combinedHeaders.reduce((acc: Record<string, any>, [k, v]) => ((acc[`${k}`] = v), acc), {}),
		url: urlWithParams,
		method,
		data: request,
		responseType,
		timeout,
		signal,
		onUploadProgress(progressEvent) {
			const percentCompleted = progressEvent.total
				? Math.round((progressEvent.loaded * 100) / progressEvent.total)
				: 100;

			progressEventCallBack?.({ ...progressEvent, percentage: percentCompleted });
		},
	};

	logger.log(requestId, '[devkit][API-Client][request]', axiosRequestConfig.url, {
		baseUrl: axiosRequestConfig.baseURL,
		method: axiosRequestConfig.method,
		data: axiosRequestConfig.data,
		headers: axiosRequestConfig.headers,
	});

	const axiosInstance = axios.create();

	try {
		axiosRetry(axiosInstance, {
			retries: retryConfig?.retries ?? 2,
			retryCondition:
				retryConfig?.retryCondition ??
				function retryCondition(error) {
					switch (error.response?.status) {
						case APIHttpStatusCode.BadRequest:
						case APIHttpStatusCode.Unauthorized:
						case APIHttpStatusCode.PaymentRequired:
						case APIHttpStatusCode.MethodNotAllowed:
						case APIHttpStatusCode.UnprocessableEntity:
						case APIHttpStatusCode.InternalServerError:
							return false;
						default:
							return true;
					}
				},
			retryDelay: retryConfig?.retryDelay ?? exponentialDelay,
		});

		const response = await axiosInstance.request(axiosRequestConfig);
		const data = await convertResponseDataToJson(response, requestId);

		logger.log(requestId, '[devkit][API-Client][success]', axiosRequestConfig.url, {
			res: data,
			status: response.status,
		});

		const responseHeaders: Record<string, unknown> = isNil(response.headers) ? {} : response.headers;

		return { data, status: response.status, headers: responseHeaders };
	} catch (ex) {
		let status: number = NoStatusCode;
		let data = undefined;
		let responseHeaders: Record<string, unknown> = {};

		if (isAxiosError(ex)) {
			status = (ex as AxiosError).response?.status ?? NetworkConnectionStatusCode;
			data = await convertResponseDataToJson((ex as AxiosError).response, requestId);
			responseHeaders = (ex as AxiosError).response?.headers ?? {};
		} else {
			status = NoStatusCode;
		}

		if (status === NetworkConnectionStatusCode) {
			logger.error(requestId, '[devkit][API-Client][error]', axiosRequestConfig.url, 'NetworkConnection');

			throw { mapped: [{ code: 'NetworkConnection' }], status };
		}

		switch (status) {
			case APIHttpStatusCode.Unauthorized: {
				logger.error(requestId, '[devkit][API-Client][error]', axiosRequestConfig.url, 'Unauthorized');

				const newAccessToken = await refreshToken?.(headers, responseHeaders);

				if (newAccessToken) {
					const newHeaders = { ...headers, Authorization: `Bearer ${newAccessToken}` };

					return requestAxiosApi(
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
						responseType
					);
				} else {
					throw { mapped: [{ code: 'Unauthorized' }], status };
				}
			}
			case APIHttpStatusCode.MethodNotAllowed:
				logger.error(requestId, '[devkit][API-Client][error]', axiosRequestConfig.url, 'MethodNotAllowed');
				throw { mapped: [{ code: 'MethodNotAllowed' }], status };
			case APIHttpStatusCode.InternalServerError:
				logger.error(requestId, '[devkit][API-Client][error]', axiosRequestConfig.url, 'UnexpectedError');

				throw {
					mapped: [{ code: 'UnexpectedError' }],
					status,
					originalResponse: data,
				};
			case NoStatusCode:
				// In case there was a javascript error
				throw { mapped: [{ code: 'UnexpectedError' }], originalResponse: ex?.toString(), status };
		}

		logger.error(requestId, '[devkit][API-Client][error]', axiosRequestConfig.url, { res: ex, status });

		// return response data so it is validated and transformed by createAPIDefinition
		return { data, status, headers: responseHeaders };
	}
}
