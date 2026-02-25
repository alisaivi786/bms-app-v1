import { z } from 'zod';
import { APIFactory } from './apiFactory';
import * as requestAxiosApi from './helpers/request-axios-api';

// Mock the request modules
jest.mock('./helpers/request-axios-api');
jest.mock('uuid', () => ({
	v4: () => 'mock-uuid-123',
}));

describe('APIFactory', () => {
	const mockAxiosRequest = requestAxiosApi.requestAxiosApi as jest.MockedFunction<
		typeof requestAxiosApi.requestAxiosApi
	>;

	beforeEach(() => {
		jest.clearAllMocks();
		mockAxiosRequest.mockResolvedValue({ data: { id: 1, name: 'Test User' }, status: 200, headers: {} });
	});

	describe('Constructor and Configuration', () => {
		it('should create an APIFactory with global config', () => {
			const globalConfig = {
				baseUrl: 'https://api.example.com',
				headers: {
					Authorization: 'Bearer token123',
				},
			};

			const factory = new APIFactory(globalConfig);

			expect(factory).toBeInstanceOf(APIFactory);
		});

		it('should update global config', () => {
			const initialConfig = {
				baseUrl: 'https://api.example.com',
				headers: {
					Authorization: 'Bearer token123',
				},
			};

			const factory = new APIFactory(initialConfig);

			const updateConfig = {
				headers: {
					'X-API-Version': 'v1',
				},
				timeout: 5000,
			};

			// This should not throw
			factory.updateConfig(updateConfig);

			expect(factory).toBeInstanceOf(APIFactory);
		});
	});

	describe('API Definition Creation', () => {
		it('should create API definition with global config', async () => {
			const globalConfig = {
				baseUrl: 'https://api.example.com',
				headers: {
					Authorization: 'Bearer token123',
				},
			};

			const factory = new APIFactory(globalConfig);

			const api = factory.createAPIDefinition({
				url: '/users',
				method: 'GET',
				responseSchema: z.object({
					id: z.number(),
					name: z.string(),
				}),
			});

			expect(api).toBeInstanceOf(Function);

			// Test that the API can be called
			const result = await api();

			expect(result).toEqual({ id: 1, name: 'Test User' });
			expect(mockAxiosRequest).toHaveBeenCalled();
		});

		it('should create API definition with POST method', async () => {
			const globalConfig = {
				baseUrl: 'https://api.example.com',
				headers: {
					Authorization: 'Bearer token123',
				},
			};

			const factory = new APIFactory(globalConfig);

			mockAxiosRequest.mockResolvedValue({
				data: { id: 2, name: 'New User', email: 'new@example.com' },
				status: 201,
				headers: {},
			});

			const api = factory.createAPIDefinition({
				url: '/users',
				method: 'POST',
				requestSchema: z.object({
					name: z.string(),
					email: z.string().email(),
				}),
				responseSchema: z.object({
					id: z.number(),
					name: z.string(),
					email: z.string(),
				}),
			});

			const requestData = { name: 'New User', email: 'new@example.com' };
			const result = await api(requestData);

			expect(result).toEqual({ id: 2, name: 'New User', email: 'new@example.com' });
			expect(mockAxiosRequest).toHaveBeenCalled();
		});

		it('should create API definition with parameters', async () => {
			const globalConfig = {
				baseUrl: 'https://api.example.com',
			};

			const factory = new APIFactory(globalConfig);

			const api = factory.createAPIDefinition({
				url: '/users/:id',
				method: 'GET',
				requestParameters: {
					id: ['required', 'string'],
				},
				responseSchema: z.object({
					id: z.number(),
					name: z.string(),
				}),
			});

			const result = await api({
				parameters: { id: '123' },
			});

			expect(result).toEqual({ id: 1, name: 'Test User' });
			expect(mockAxiosRequest).toHaveBeenCalled();
		});

		it('should work with method binding', async () => {
			const globalConfig = {
				baseUrl: 'https://api.example.com',
			};

			const factory = new APIFactory(globalConfig);

			// Extract the method and call it separately (tests binding)
			const { createAPIDefinition } = factory;

			const api = createAPIDefinition({
				url: '/users',
				method: 'GET',
				responseSchema: z.object({
					id: z.number(),
					name: z.string(),
				}),
			});

			const result = await api();

			expect(result).toEqual({ id: 1, name: 'Test User' });
			expect(mockAxiosRequest).toHaveBeenCalled();
		});
	});

	describe('Error Handling', () => {
		it('should propagate errors from API calls', async () => {
			const mockError = new Error('Network Error');

			mockAxiosRequest.mockRejectedValue(mockError);

			const factory = new APIFactory({
				baseUrl: 'https://api.example.com',
			});

			const api = factory.createAPIDefinition({
				url: '/users',
				responseSchema: z.object({
					id: z.number(),
				}),
			});

			await expect(api()).rejects.toThrow('Network Error');
		});
	});
});
