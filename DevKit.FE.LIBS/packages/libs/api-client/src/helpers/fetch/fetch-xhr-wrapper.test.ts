/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */
import { logger } from '@devkit/utilities/dist/Debug';
import { NetworkConnectionStatusCode } from '../../types';
import { makeXHRRequest } from './fetch-xhr-wrapper';

// Mock dependencies
jest.mock('@devkit/utilities/dist/Debug');

const mockedLogger = jest.mocked(logger);

describe('fetch-xhr-wrapper', () => {
	let mockXHR: any;
	let xhrInstances: any[] = [];

	beforeEach(() => {
		jest.clearAllMocks();
		xhrInstances = [];

		// Mock XMLHttpRequest
		mockXHR = {
			open: jest.fn(),
			send: jest.fn(),
			setRequestHeader: jest.fn(),
			getAllResponseHeaders: jest.fn().mockReturnValue('content-type: application/json\r\nauthorization: Bearer token'),
			addEventListener: jest.fn(),
			upload: {
				addEventListener: jest.fn(),
			},
			status: 200,
			responseText: '{"success": true}',
			timeout: 0,
		};

		global.XMLHttpRequest = jest.fn(() => {
			xhrInstances.push(mockXHR);

			return mockXHR;
		}) as any;
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('makeXHRRequest', () => {
		it('should make successful XHR request with progress tracking', async () => {
			const onProgress = jest.fn();
			const formData = new FormData();

			formData.append('file', new Blob(['test'], { type: 'text/plain' }));

			// Set up mock to simulate successful request
			mockXHR.addEventListener.mockImplementation((event: string, callback: Function) => {
				if (event === 'load') {
					setTimeout(() => callback(), 0);
				}
			});

			const requestPromise = makeXHRRequest(
				'POST',
				'https://api.example.com/upload',
				{ Authorization: 'Bearer token' },
				formData,
				5000,
				onProgress,
				'test-request-id'
			);

			const result = await requestPromise;

			expect(result).toEqual({
				data: { success: true },
				status: 200,
				headers: {
					'content-type': 'application/json',
					authorization: 'Bearer token',
				},
			});

			expect(mockXHR.open).toHaveBeenCalledWith('POST', 'https://api.example.com/upload');
			expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('Authorization', 'Bearer token');
			expect(mockXHR.send).toHaveBeenCalledWith(formData);
			expect(mockXHR.timeout).toBe(5000);
		});

		it('should track upload progress', async () => {
			const onProgress = jest.fn();
			const formData = new FormData();

			mockXHR.upload.addEventListener.mockImplementation((event: string, callback: Function) => {
				if (event === 'progress') {
					// Simulate progress event
					setTimeout(() => {
						callback({
							lengthComputable: true,
							loaded: 50,
							total: 100,
						});
					}, 0);
				}
			});

			mockXHR.addEventListener.mockImplementation((event: string, callback: Function) => {
				if (event === 'load') {
					setTimeout(() => callback(), 10);
				}
			});

			await makeXHRRequest(
				'POST',
				'https://api.example.com/upload',
				{},
				formData,
				undefined,
				onProgress,
				'test-request-id'
			);

			expect(onProgress).toHaveBeenCalledWith({
				loaded: 50,
				total: 100,
				progress: 0.5,
				bytes: 50,
				rate: undefined,
				estimated: undefined,
				download: false,
				upload: true,
				percentage: 50,
			});
		});

		it('should handle non-JSON response text', async () => {
			mockXHR.responseText = 'Plain text response';
			mockXHR.addEventListener.mockImplementation((event: string, callback: Function) => {
				if (event === 'load') {
					setTimeout(() => callback(), 0);
				}
			});

			const result = await makeXHRRequest(
				'POST',
				'https://api.example.com/upload',
				{},
				new FormData(),
				undefined,
				jest.fn(),
				'test-request-id'
			);

			expect(result.data).toBe('Plain text response');
		});

		it('should handle error status codes but still resolve', async () => {
			mockXHR.status = 400;
			mockXHR.responseText = '{"error": "Bad request"}';
			mockXHR.addEventListener.mockImplementation((event: string, callback: Function) => {
				if (event === 'load') {
					setTimeout(() => callback(), 0);
				}
			});

			const result = await makeXHRRequest(
				'POST',
				'https://api.example.com/upload',
				{},
				new FormData(),
				undefined,
				jest.fn(),
				'test-request-id'
			);

			expect(result).toEqual({
				data: { error: 'Bad request' },
				status: 400,
				headers: expect.any(Object),
			});

			expect(mockedLogger.error).toHaveBeenCalledWith(
				'test-request-id',
				'[devkit][API-Client][xhr-error]',
				'https://api.example.com/upload',
				{
					status: 400,
					error: { error: 'Bad request' },
				}
			);
		});

		it('should handle network errors', async () => {
			mockXHR.addEventListener.mockImplementation((event: string, callback: Function) => {
				if (event === 'error') {
					setTimeout(() => callback(), 0);
				}
			});

			await expect(
				makeXHRRequest(
					'POST',
					'https://api.example.com/upload',
					{},
					new FormData(),
					undefined,
					jest.fn(),
					'test-request-id'
				)
			).rejects.toEqual({
				mapped: [{ code: 'NetworkConnection' }],
				status: NetworkConnectionStatusCode,
			});

			expect(mockedLogger.error).toHaveBeenCalledWith(
				'test-request-id',
				'[devkit][API-Client][xhr-error]',
				'https://api.example.com/upload',
				'Network error'
			);
		});

		it('should handle timeout errors', async () => {
			mockXHR.addEventListener.mockImplementation((event: string, callback: Function) => {
				if (event === 'timeout') {
					setTimeout(() => callback(), 0);
				}
			});

			await expect(
				makeXHRRequest('POST', 'https://api.example.com/upload', {}, new FormData(), 1000, jest.fn(), 'test-request-id')
			).rejects.toEqual({
				mapped: [{ code: 'NetworkConnection' }],
				status: NetworkConnectionStatusCode,
			});

			expect(mockedLogger.error).toHaveBeenCalledWith(
				'test-request-id',
				'[devkit][API-Client][xhr-error]',
				'https://api.example.com/upload',
				'Request timeout'
			);
		});

		it('should skip Content-Type header when setting headers', async () => {
			mockXHR.addEventListener.mockImplementation((event: string, callback: Function) => {
				if (event === 'load') {
					setTimeout(() => callback(), 0);
				}
			});

			await makeXHRRequest(
				'POST',
				'https://api.example.com/upload',
				{
					Authorization: 'Bearer token',
					'Content-Type': 'multipart/form-data; boundary=123',
					'X-Custom-Header': 'value',
				},
				new FormData(),
				undefined,
				jest.fn(),
				'test-request-id'
			);

			expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('Authorization', 'Bearer token');
			expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('X-Custom-Header', 'value');
			expect(mockXHR.setRequestHeader).not.toHaveBeenCalledWith('Content-Type', expect.any(String));
		});

		it('should handle progress event without onProgress callback', async () => {
			mockXHR.upload.addEventListener.mockImplementation((event: string, callback: Function) => {
				if (event === 'progress') {
					setTimeout(() => {
						callback({
							lengthComputable: true,
							loaded: 50,
							total: 100,
						});
					}, 0);
				}
			});

			mockXHR.addEventListener.mockImplementation((event: string, callback: Function) => {
				if (event === 'load') {
					setTimeout(() => callback(), 10);
				}
			});

			// Should not throw when onProgress is not provided but progress event fires
			await expect(
				makeXHRRequest(
					'POST',
					'https://api.example.com/upload',
					{},
					new FormData(),
					undefined,
					undefined as any, // No progress callback
					'test-request-id'
				)
			).resolves.toBeDefined();
		});

		it('should skip empty header values', async () => {
			mockXHR.addEventListener.mockImplementation((event: string, callback: Function) => {
				if (event === 'load') {
					setTimeout(() => callback(), 0);
				}
			});

			await makeXHRRequest(
				'POST',
				'https://api.example.com/upload',
				{
					Authorization: 'Bearer token',
					'Empty-Header': '',
					'Null-Header': null as any,
					'Undefined-Header': undefined as any,
				},
				new FormData(),
				undefined,
				jest.fn(),
				'test-request-id'
			);

			expect(mockXHR.setRequestHeader).toHaveBeenCalledWith('Authorization', 'Bearer token');
			expect(mockXHR.setRequestHeader).not.toHaveBeenCalledWith('Empty-Header', '');
			expect(mockXHR.setRequestHeader).not.toHaveBeenCalledWith('Null-Header', null);
			expect(mockXHR.setRequestHeader).not.toHaveBeenCalledWith('Undefined-Header', undefined);
		});
	});
});
