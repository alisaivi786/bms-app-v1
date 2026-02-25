import { AxiosError } from 'axios';
import { APIHttpStatusCode, RetryConfig } from '../../types';

/**
 * Determines if a request should be retried based on the status code
 * @param status - HTTP status code
 * @param retryConfig - Optional retry configuration
 * @returns true if the request should be retried
 */
export const shouldRetryRequest = (status: number, retryConfig?: RetryConfig): boolean => {
	// Default retry condition matching axios behavior
	const defaultRetryCondition = (statusCode: number) => {
		switch (statusCode) {
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
	};

	if (retryConfig?.retryCondition) {
		// Custom retry condition - create a mock error object
		const mockError = { response: { status } } as AxiosError;

		return retryConfig.retryCondition(mockError);
	}

	return defaultRetryCondition(status);
};

/**
 * Calculates the delay before retrying a request
 * @param retryCount - Current retry attempt number
 * @param retryConfig - Optional retry configuration
 * @returns Delay in milliseconds
 */
export const getRetryDelay = (retryCount: number, retryConfig?: RetryConfig): number => {
	if (retryConfig?.retryDelay) {
		const mockError = { response: { status: 0 } } as AxiosError;

		return retryConfig.retryDelay(retryCount, mockError);
	}

	// Default exponential delay (100ms, 200ms, 400ms, ...)
	return Math.pow(2, retryCount) * 100;
};
