/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { logger } from '@devkit/utilities/dist/Debug';
import { validate } from './validate';

// Mock the logger
jest.mock('@devkit/utilities/dist/Debug', () => ({
	logger: {
		warn: jest.fn(),
		error: jest.fn(),
		level: 'development',
	},
}));

describe('validate', () => {
	const mockRequestId = 'test-request-id-123';
	const mockUrl = 'https://api.example.com/test';

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('InvalidResponseSchema validation', () => {
		it('should validate transformedData when code is InvalidResponseSchema', () => {
			const schema = z.object({
				id: z.number(),
				name: z.string(),
			});

			const validData = { id: 1, name: 'Test' };

			validate({
				requestId: mockRequestId,
				validationMode: 'Warning',
				url: mockUrl,
				validationSchema: schema,
				code: 'InvalidResponseSchema',
				data: {} as any,
				transformedData: validData,
			});
			expect(logger.warn).not.toHaveBeenCalled();
			expect(logger.error).not.toHaveBeenCalled();
		});

		it('should log warning when transformedData is invalid and mode is Warning', () => {
			const schema = z.object({
				id: z.number(),
				name: z.string(),
			});

			const invalidData = { id: 'not-a-number', name: 123 };

			validate({
				requestId: mockRequestId,
				validationMode: 'Warning',
				url: mockUrl,
				validationSchema: schema,
				code: 'InvalidResponseSchema',
				data: {} as any,
				transformedData: invalidData as any,
			});
			expect(logger.warn).toHaveBeenCalledWith(
				mockRequestId,
				'[devkit][API-Client][Schema-Validation]',
				expect.objectContaining({
					url: mockUrl,
					errors: expect.any(Object),
					originalResponse: {},
				})
			);
			expect(logger.error).not.toHaveBeenCalled();
		});

		it('should log error when transformedData is invalid and mode is Error', () => {
			const schema = z.object({
				id: z.number(),
				name: z.string(),
			});

			const invalidData = { id: 'not-a-number', name: 123 };

			validate({
				requestId: mockRequestId,
				validationMode: 'Error',
				url: mockUrl,
				validationSchema: schema,
				code: 'InvalidResponseSchema',
				data: {} as any,
				transformedData: invalidData as any,
			});
			expect(logger.error).toHaveBeenCalledWith(
				mockRequestId,
				'[devkit][API-Client][Schema-Validation]',
				expect.objectContaining({
					url: mockUrl,
					errors: expect.any(Object),
				})
			);
			expect(logger.warn).not.toHaveBeenCalled();
		});
	});

	describe('Regular validation', () => {
		it('should validate data when code is not InvalidResponseSchema', () => {
			const schema = z.object({
				email: z.string().email(),
				age: z.number().positive(),
			});

			const validData = { email: 'test@example.com', age: 25 };

			validate({
				requestId: mockRequestId,
				validationMode: 'Warning',
				url: mockUrl,
				validationSchema: schema,
				code: 'InvalidRequestSchema',
				data: validData,
			});

			expect(logger.warn).not.toHaveBeenCalled();
			expect(logger.error).not.toHaveBeenCalled();
		});

		it('should log warning when data is invalid and mode is Warning', () => {
			const schema = z.object({
				email: z.string().email(),
				age: z.number().positive(),
			});

			const invalidData = { email: 'invalid-email', age: -5 };

			validate({
				requestId: mockRequestId,
				validationMode: 'Warning',
				url: mockUrl,
				validationSchema: schema,
				code: 'InvalidRequestSchema',
				data: invalidData,
			});

			expect(logger.warn).toHaveBeenCalledWith(
				mockRequestId,
				'[devkit][API-Client][Schema-Validation]',
				expect.objectContaining({
					url: mockUrl,
					errors: expect.any(Object),
					originalResponse: invalidData,
				})
			);
		});

		it('should log error when data is invalid and mode is Error', () => {
			const schema = z.object({
				email: z.string().email(),
				age: z.number().positive(),
			});

			const invalidData = { email: 'invalid-email', age: -5 };

			validate({
				requestId: mockRequestId,
				validationMode: 'Error',
				url: mockUrl,
				validationSchema: schema,
				code: 'InvalidRequestSchema',
				data: invalidData,
			});

			expect(logger.error).toHaveBeenCalledWith(
				mockRequestId,
				'[devkit][API-Client][Schema-Validation]',
				expect.objectContaining({
					url: mockUrl,
					errors: expect.any(Object),
				})
			);
		});
	});

	describe('Production mode', () => {
		it('should not include originalResponse in production', () => {
			const originalLevel = logger.level;

			(logger.level as any) = 'production';

			const schema = z.object({
				id: z.number(),
			});

			const invalidData = { id: 'not-a-number' };

			validate({
				requestId: mockRequestId,
				validationMode: 'Warning',
				url: mockUrl,
				validationSchema: schema,
				code: 'InvalidRequestSchema',
				data: invalidData as any,
			});

			expect(logger.warn).toHaveBeenCalledWith(
				mockRequestId,
				'[devkit][API-Client][Schema-Validation]',
				expect.objectContaining({
					url: mockUrl,
					errors: expect.any(Object),
					originalResponse: undefined,
				})
			);

			(logger.level as any) = originalLevel;
		});
	});

	describe('Edge cases', () => {
		it('should handle undefined validationSchema gracefully', () => {
			validate({
				requestId: mockRequestId,
				validationMode: 'Warning',
				url: mockUrl,
				validationSchema: undefined,
				code: 'InvalidRequestSchema',
				data: { anything: 'goes' },
			});

			expect(logger.warn).not.toHaveBeenCalled();
			expect(logger.error).not.toHaveBeenCalled();
		});

		it('should handle empty data object', () => {
			const schema = z.object({
				required: z.string(),
			});

			validate({
				requestId: mockRequestId,
				validationMode: 'Warning',
				url: mockUrl,
				validationSchema: schema,
				code: 'InvalidRequestSchema',
				data: {} as any,
			});
			expect(logger.warn).toHaveBeenCalled();
		});
	});
});
