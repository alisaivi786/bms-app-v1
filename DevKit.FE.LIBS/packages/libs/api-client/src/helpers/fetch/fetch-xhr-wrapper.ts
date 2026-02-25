import { logger } from '@devkit/utilities/dist/Debug';
import { NetworkConnectionStatusCode, ProgressEventCallBack } from '../../types';

/**
 * Makes an XMLHttpRequest with upload progress tracking
 * This is used for file uploads when progress tracking is needed,
 * as the Fetch API doesn't support upload progress natively.
 *
 * @param method - HTTP method
 * @param fullUrl - Complete URL including base URL and parameters
 * @param headers - Request headers
 * @param body - Request body (FormData)
 * @param timeout - Request timeout in milliseconds
 * @param onProgress - Progress callback
 * @param requestId - Request ID for logging
 * @returns Promise resolving to response data
 */
export const makeXHRRequest = (
	method: string,
	fullUrl: string,
	headers: Record<string, string>,
	body: FormData,
	timeout: number | undefined,
	onProgress: ProgressEventCallBack,
	requestId: string,
	signal?: AbortSignal
): Promise<{ data: unknown; status: number; headers: Record<string, unknown> }> => {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

		// Track upload progress
		xhr.upload.addEventListener('progress', (event) => {
			if (event.lengthComputable && onProgress) {
				const percentCompleted = Math.round((event.loaded * 100) / event.total);

				onProgress({
					loaded: event.loaded,
					total: event.total,
					progress: event.loaded / event.total,
					bytes: event.loaded,
					rate: undefined,
					estimated: undefined,
					download: false,
					upload: true,
					percentage: percentCompleted,
				});
			}
		});

		// Handle successful response
		xhr.addEventListener('load', () => {
			const responseHeaders: Record<string, unknown> = {};
			const headerLines = xhr.getAllResponseHeaders().split('\r\n');

			headerLines.forEach((line) => {
				const parts = line.split(': ');

				if (parts.length === 2) {
					responseHeaders[parts[0].toLowerCase()] = parts[1];
				}
			});

			let data;

			try {
				data = JSON.parse(xhr.responseText);
			} catch {
				data = xhr.responseText;
			}

			if (xhr.status >= 200 && xhr.status < 300) {
				logger.log(requestId, '[devkit][API-Client][xhr-success]', fullUrl, {
					status: xhr.status,
				});
				resolve({ data, status: xhr.status, headers: responseHeaders });
			} else {
				logger.error(requestId, '[devkit][API-Client][xhr-error]', fullUrl, {
					status: xhr.status,
					error: data,
				});
				resolve({ data, status: xhr.status, headers: responseHeaders });
			}
		});

		// Handle network errors
		xhr.addEventListener('error', () => {
			logger.error(requestId, '[devkit][API-Client][xhr-error]', fullUrl, 'Network error');
			reject({ mapped: [{ code: 'NetworkConnection' }], status: NetworkConnectionStatusCode });
		});

		// Handle timeout
		xhr.addEventListener('timeout', () => {
			logger.error(requestId, '[devkit][API-Client][xhr-error]', fullUrl, 'Request timeout');
			reject({ mapped: [{ code: 'NetworkConnection' }], status: NetworkConnectionStatusCode });
		});

		// Listen for external abort signal
		if (signal) {
			if (signal.aborted) {
				xhr.abort();
				reject(new DOMException('Aborted', 'AbortError'));
			} else {
				const onAbort = () => {
					xhr.abort();
					reject(new DOMException('Aborted', 'AbortError'));
				};

				signal.addEventListener('abort', onAbort, { once: true });
			}
		}

		// Open connection
		xhr.open(method, fullUrl);

		// Set headers (skip Content-Type for FormData - browser sets it automatically with boundary)
		Object.entries(headers).forEach(([key, value]) => {
			if (value && key !== 'Content-Type') {
				xhr.setRequestHeader(key, value);
			}
		});

		// Set timeout if provided
		if (timeout) {
			xhr.timeout = timeout;
		}

		// Send request
		xhr.send(body);
	});
};
