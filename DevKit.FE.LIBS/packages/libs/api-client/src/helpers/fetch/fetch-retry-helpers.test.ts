import { APIHttpStatusCode } from '../../types';
import { getRetryDelay, shouldRetryRequest } from './fetch-retry-helpers';

describe('fetch-retry-helpers', () => {
	describe('shouldRetryRequest', () => {
		it('should not retry for bad request status codes', () => {
			const statusCodesToNotRetry = [
				APIHttpStatusCode.BadRequest,
				APIHttpStatusCode.Unauthorized,
				APIHttpStatusCode.PaymentRequired,
				APIHttpStatusCode.MethodNotAllowed,
				APIHttpStatusCode.UnprocessableEntity,
				APIHttpStatusCode.InternalServerError,
			];

			statusCodesToNotRetry.forEach((status) => {
				expect(shouldRetryRequest(status)).toBe(false);
			});
		});

		it('should retry for other status codes', () => {
			const statusCodesToRetry = [
				APIHttpStatusCode.RequestTimeout,
				APIHttpStatusCode.TooManyRequests,
				APIHttpStatusCode.BadGateway,
				APIHttpStatusCode.ServiceUnavailable,
				APIHttpStatusCode.GatewayTimeout,
			];

			statusCodesToRetry.forEach((status) => {
				expect(shouldRetryRequest(status)).toBe(true);
			});
		});

		it('should use custom retry condition when provided', () => {
			const customRetryCondition = jest.fn().mockReturnValue(true);
			const retryConfig = { retryCondition: customRetryCondition };

			const result = shouldRetryRequest(500, retryConfig);

			expect(result).toBe(true);
			expect(customRetryCondition).toHaveBeenCalledWith(
				expect.objectContaining({
					response: { status: 500 },
				})
			);
		});
	});

	describe('getRetryDelay', () => {
		it('should return delay for retry attempt', () => {
			const delay = getRetryDelay(1);

			expect(typeof delay).toBe('number');
			expect(delay).toBeGreaterThan(0);
		});

		it('should use custom retry delay when provided', () => {
			const customRetryDelay = jest.fn().mockReturnValue(2000);
			const retryConfig = { retryDelay: customRetryDelay };

			const delay = getRetryDelay(2, retryConfig);

			expect(delay).toBe(2000);
			expect(customRetryDelay).toHaveBeenCalledWith(2, expect.any(Object));
		});

		it('should handle missing error parameter', () => {
			const delay = getRetryDelay(1);

			expect(typeof delay).toBe('number');
			expect(delay).toBeGreaterThanOrEqual(0);
		});
	});
});
