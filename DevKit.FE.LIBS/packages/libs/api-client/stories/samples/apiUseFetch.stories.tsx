import React from 'react';
import { z } from 'zod';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { createAPIDefinition } from '../../src/apiCreateDefinition';

type ComponentType = () => JSX.Element;

/**
 * ## httpClient Flag Documentation
 *
 * The `httpClient` flag allows you to explicitly choose the Fetch API over Axios for your API calls.
 *
 * ### When to use `httpClient: 'fetch'`:
 * 1. **Browser-native approach**: When you prefer using native browser APIs
 * 2. **Smaller bundle size**: Fetch API is built into browsers, reducing bundle size
 * 3. **Modern projects**: When working with modern web standards
 * 4. **Streaming APIs**: Required for server-sent events or streaming responses (automatically enabled when `onStreamData` is provided)
 *
 * ### When to use Axios (default):
 * 1. **Legacy compatibility**: When working with older codebases that use Axios
 * 2. **Request cancellation**: When you need robust request cancellation with AbortController
 * 3. **Interceptors**: When you need request/response interceptors beyond token refresh
 * 4. **Backwards compatibility**: When working with older codebases that use Axios
 *
 * ### Automatic Streaming Detection:
 * - When `onStreamData` callback is provided in options, Fetch API is automatically used
 * - No need to explicitly set `httpClient: 'fetch'` for streaming APIs
 *
 * ### Feature Parity:
 * Both implementations support:
 * - **Upload/Download progress tracking** with `onProgress` callback
 * - Token refresh on 401 Unauthorized
 * - Retry logic with exponential backoff
 * - Comprehensive error handling
 * - Request/response validation with Zod schemas
 */

// API definition WITHOUT httpClient (uses Axios by default)
const axiosApiDefinition = createAPIDefinition({
	url: 'https://jsonplaceholder.typicode.com/posts/1',
	method: 'GET',
	responseSchema: z.object({
		userId: z.number(),
		id: z.number(),
		title: z.string(),
		body: z.string(),
	}),
	// httpClient is false by default, so Axios is used
});

// API definition WITH httpClient (explicitly uses Fetch API)
const fetchApiDefinition = createAPIDefinition({
	url: 'https://jsonplaceholder.typicode.com/posts/1',
	method: 'GET',
	responseSchema: z.object({
		userId: z.number(),
		id: z.number(),
		title: z.string(),
		body: z.string(),
	}),
	httpClient: 'fetch', // Explicitly use Fetch API
});

const Template: StoryFn<ComponentType> = () => {
	const [axiosResponse, setAxiosResponse] = React.useState<string>('');
	const [fetchResponse, setFetchResponse] = React.useState<string>('');
	const [axiosLoading, setAxiosLoading] = React.useState(false);
	const [fetchLoading, setFetchLoading] = React.useState(false);

	const callAxiosApi = async () => {
		setAxiosLoading(true);
		setAxiosResponse('Loading...');
		try {
			const res = await axiosApiDefinition();
			setAxiosResponse(JSON.stringify(res, null, 2));
		} catch (error) {
			setAxiosResponse(`Error: ${JSON.stringify(error, null, 2)}`);
		} finally {
			setAxiosLoading(false);
		}
	};

	const callFetchApi = async () => {
		setFetchLoading(true);
		setFetchResponse('Loading...');
		try {
			const res = await fetchApiDefinition();
			setFetchResponse(JSON.stringify(res, null, 2));
		} catch (error) {
			setFetchResponse(`Error: ${JSON.stringify(error, null, 2)}`);
		} finally {
			setFetchLoading(false);
		}
	};

	return (
		<div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
			<h1>httpClient Flag Comparison</h1>

			<div
				style={{
					marginBottom: '30px',
					padding: '15px',
					backgroundColor: '#f0f7ff',
					borderRadius: '5px',
					border: '1px solid #0066cc',
				}}
			>
				<h3 style={{ margin: '0 0 10px 0', color: '#0066cc' }}>ℹ️ What is httpClient?</h3>
				<p style={{ margin: '5px 0' }}>
					<strong>httpClient</strong> is a flag that lets you choose between two HTTP client implementations:
				</p>
				<ul style={{ marginLeft: '20px' }}>
					<li>
						<strong>Axios (default)</strong>: Full-featured HTTP client with progress tracking
					</li>
					<li>
						<strong>Fetch API (httpClient: 'fetch')</strong>: Browser-native API with streaming support
					</li>
				</ul>
				<p style={{ margin: '10px 0 5px 0', fontStyle: 'italic', color: '#666' }}>
					💡 Tip: When you provide <code>onStreamData</code> callback, Fetch API is automatically used regardless of
					this flag.
				</p>
			</div>

			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
				{/* Axios Column */}
				<div style={{ border: '2px solid #007bff', borderRadius: '8px', padding: '20px' }}>
					<h2 style={{ marginTop: 0, color: '#007bff' }}>🔵 Axios (Default)</h2>
					<div
						style={{
							backgroundColor: '#f8f9fa',
							padding: '10px',
							borderRadius: '5px',
							marginBottom: '15px',
							fontSize: '14px',
						}}
					>
						<strong>Configuration:</strong>
						<pre style={{ margin: '5px 0', fontSize: '12px', overflow: 'auto' }}>
							{`createAPIDefinition({
  url: '...',
  method: 'GET',
  responseSchema: z.object({...}),
  // No httpClient flag = Axios
})`}
						</pre>
					</div>
					<button
						onClick={callAxiosApi}
						disabled={axiosLoading}
						style={{
							width: '100%',
							padding: '10px 20px',
							fontSize: '16px',
							backgroundColor: axiosLoading ? '#ccc' : '#007bff',
							color: 'white',
							border: 'none',
							borderRadius: '5px',
							cursor: axiosLoading ? 'not-allowed' : 'pointer',
							marginBottom: '15px',
						}}
					>
						{axiosLoading ? 'Loading...' : 'Call with Axios'}
					</button>
					<div
						style={{
							backgroundColor: '#f5f5f5',
							padding: '15px',
							borderRadius: '5px',
							minHeight: '200px',
							maxHeight: '400px',
							overflow: 'auto',
							whiteSpace: 'pre-wrap',
							wordBreak: 'break-word',
							border: '1px solid #ddd',
							fontSize: '12px',
						}}
					>
						{axiosResponse || 'Click the button to make a request using Axios...'}
					</div>
					<div style={{ marginTop: '10px', fontSize: '13px', color: '#666' }}>
						<strong>Features:</strong>
						<ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
							<li>Upload/Download progress tracking ✅</li>
							<li>Automatic request/response transformation</li>
							<li>Built-in retry logic</li>
							<li>Token refresh support</li>
						</ul>
					</div>
				</div>

				{/* Fetch Column */}
				<div style={{ border: '2px solid #28a745', borderRadius: '8px', padding: '20px' }}>
					<h2 style={{ marginTop: 0, color: '#28a745' }}>🟢 Fetch API</h2>
					<div
						style={{
							backgroundColor: '#f8f9fa',
							padding: '10px',
							borderRadius: '5px',
							marginBottom: '15px',
							fontSize: '14px',
						}}
					>
						<strong>Configuration:</strong>
						<pre style={{ margin: '5px 0', fontSize: '12px', overflow: 'auto' }}>
							{`createAPIDefinition({
  url: '...',
  method: 'GET',
  responseSchema: z.object({...}),
  httpClient: 'fetch', // ✅ Explicit
})`}
						</pre>
					</div>
					<button
						onClick={callFetchApi}
						disabled={fetchLoading}
						style={{
							width: '100%',
							padding: '10px 20px',
							fontSize: '16px',
							backgroundColor: fetchLoading ? '#ccc' : '#28a745',
							color: 'white',
							border: 'none',
							borderRadius: '5px',
							cursor: fetchLoading ? 'not-allowed' : 'pointer',
							marginBottom: '15px',
						}}
					>
						{fetchLoading ? 'Loading...' : 'Call with Fetch'}
					</button>
					<div
						style={{
							backgroundColor: '#f5f5f5',
							padding: '15px',
							borderRadius: '5px',
							minHeight: '200px',
							maxHeight: '400px',
							overflow: 'auto',
							whiteSpace: 'pre-wrap',
							wordBreak: 'break-word',
							border: '1px solid #ddd',
							fontSize: '12px',
						}}
					>
						{fetchResponse || 'Click the button to make a request using Fetch API...'}
					</div>
					<div style={{ marginTop: '10px', fontSize: '13px', color: '#666' }}>
						<strong>Features:</strong>
						<ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
							<li>Browser-native (smaller bundle)</li>
							<li>Streaming support (ReadableStream)</li>
							<li>Upload/Download progress tracking ✅</li>
							<li>Built-in retry logic</li>
							<li>Token refresh support</li>
						</ul>
					</div>
				</div>
			</div>

			<div
				style={{
					marginTop: '30px',
					padding: '15px',
					backgroundColor: '#fff3cd',
					borderRadius: '5px',
					border: '1px solid #ffc107',
				}}
			>
				<h3 style={{ margin: '0 0 10px 0', color: '#856404' }}>📋 Decision Guide</h3>
				<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
					<thead>
						<tr style={{ backgroundColor: '#ffeaa7' }}>
							<th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Use Case</th>
							<th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Recommended</th>
							<th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Why</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td style={{ padding: '10px', border: '1px solid #ddd' }}>Standard REST API calls</td>
							<td style={{ padding: '10px', border: '1px solid #ddd' }}>
								<strong>Axios (default)</strong>
							</td>
							<td style={{ padding: '10px', border: '1px solid #ddd' }}>Mature, widely-used, feature-rich</td>
						</tr>
						<tr style={{ backgroundColor: '#f9f9f9' }}>
							<td style={{ padding: '10px', border: '1px solid #ddd' }}>File uploads/downloads with progress</td>
							<td style={{ padding: '10px', border: '1px solid #ddd' }}>
								<strong>Both (Axios or Fetch)</strong>
							</td>
							<td style={{ padding: '10px', border: '1px solid #ddd' }}>
								onProgress callback works with both implementations
							</td>
						</tr>
						<tr>
							<td style={{ padding: '10px', border: '1px solid #ddd' }}>Streaming responses</td>
							<td style={{ padding: '10px', border: '1px solid #ddd' }}>
								<strong>Fetch (auto)</strong>
							</td>
							<td style={{ padding: '10px', border: '1px solid #ddd' }}>Automatically enabled with onStreamData</td>
						</tr>
						<tr style={{ backgroundColor: '#f9f9f9' }}>
							<td style={{ padding: '10px', border: '1px solid #ddd' }}>Modern web app (no legacy)</td>
							<td style={{ padding: '10px', border: '1px solid #ddd' }}>
								<strong>Fetch (httpClient: 'fetch')</strong>
							</td>
							<td style={{ padding: '10px', border: '1px solid #ddd' }}>Native browser API, smaller bundle</td>
						</tr>
						<tr>
							<td style={{ padding: '10px', border: '1px solid #ddd' }}>Bundle size optimization</td>
							<td style={{ padding: '10px', border: '1px solid #ddd' }}>
								<strong>Fetch (httpClient: 'fetch')</strong>
							</td>
							<td style={{ padding: '10px', border: '1px solid #ddd' }}>No external HTTP client dependency</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

const StoryMeta: Meta = {
	title: 'Api/Samples/Sample Api/httpClient Flag',
	component: Template,
};

export default StoryMeta;

export const UseFetchComparison: StoryObj<ComponentType> = {
	args: {},
};
