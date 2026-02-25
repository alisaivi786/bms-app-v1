import React from 'react';
import { z } from 'zod';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { APIFactory } from '../../src';

type ComponentType = () => JSX.Element;

/**
 * ## APIFactory with httpClient Configuration
 *
 * The `httpClient` flag can be configured at the factory level to apply globally to all API definitions created by that factory.
 *
 * ### Factory-Level Configuration:
 * ```typescript
 * const apiFactory = new APIFactory({
 *   httpClient: 'fetch', // All APIs will use Fetch by default
 *   baseUrl: 'https://api.example.com',
 *   // ... other global config
 * });
 * ```
 *
 * ### Override at API Definition Level:
 * Individual API definitions can override the factory's `httpClient` setting:
 * ```typescript
 * const apiDefinition = apiFactory.createAPIDefinition({
 *   url: '/endpoint',
 *   httpClient: 'axios', // Override factory setting - use Axios for this API
 *   responseSchema: z.object({...}),
 * });
 * ```
 *
 * ### Priority Order:
 * 1. **API Definition Level** - Highest priority (overrides everything)
 * 2. **Factory Level** - Medium priority (applies to all APIs in the factory)
 * 3. **Auto-detection** - If `onStreamData` callback is provided, Fetch is used automatically
 *
 * ### Benefits of Factory-Level Configuration:
 * - **Consistency**: All APIs in your application use the same HTTP client
 * - **Easy migration**: Switch all APIs from Axios to Fetch by changing one line
 * - **Flexibility**: Individual APIs can still override when needed
 * - **Maintainability**: Centralized configuration for your entire API layer
 */

// Factory with Fetch API enabled globally
const fetchApiFactory = new APIFactory({
	httpClient: 'fetch', // ✅ All APIs created by this factory will use Fetch
	baseUrl: 'https://jsonplaceholder.typicode.com',
	originalResponseSchema: z.any(),
	headers: {
		'Content-Type': 'application/json',
	},
});

// Factory with Axios (default behavior)
const axiosApiFactory = new APIFactory({
	// httpClient: 'axios' (or omitted) - uses Axios by default
	baseUrl: 'https://jsonplaceholder.typicode.com',
	originalResponseSchema: z.any(),
	headers: {
		'Content-Type': 'application/json',
	},
});

// API definitions using Fetch (from fetchApiFactory)
const fetchPostApi = fetchApiFactory.createAPIDefinition({
	url: '/posts/1',
	method: 'GET',
	responseSchema: z.object({
		userId: z.number(),
		id: z.number(),
		title: z.string(),
		body: z.string(),
	}),
});

// API definitions using Axios (from axiosApiFactory)
const axiosPostApi = axiosApiFactory.createAPIDefinition({
	url: '/posts/1',
	method: 'GET',
	responseSchema: z.object({
		userId: z.number(),
		id: z.number(),
		title: z.string(),
		body: z.string(),
	}),
});

// Override example: Use Axios even though factory has httpClient: 'fetch'
const overrideToAxiosApi = fetchApiFactory.createAPIDefinition({
	url: '/posts/2',
	method: 'GET',
	httpClient: 'axios', // ⚠️ Override factory setting
	responseSchema: z.object({
		userId: z.number(),
		id: z.number(),
		title: z.string(),
		body: z.string(),
	}),
});

const Template: StoryFn<ComponentType> = () => {
	const [fetchResult, setFetchResult] = React.useState<string>('');
	const [axiosResult, setAxiosResult] = React.useState<string>('');
	const [overrideResult, setOverrideResult] = React.useState<string>('');
	const [fetchLoading, setFetchLoading] = React.useState(false);
	const [axiosLoading, setAxiosLoading] = React.useState(false);
	const [overrideLoading, setOverrideLoading] = React.useState(false);

	const callFetchApi = async () => {
		setFetchLoading(true);
		setFetchResult('Loading...');
		try {
			const res = await fetchPostApi();
			setFetchResult(JSON.stringify(res, null, 2));
		} catch (error) {
			setFetchResult(`Error: ${JSON.stringify(error, null, 2)}`);
		} finally {
			setFetchLoading(false);
		}
	};

	const callAxiosApi = async () => {
		setAxiosLoading(true);
		setAxiosResult('Loading...');
		try {
			const res = await axiosPostApi();
			setAxiosResult(JSON.stringify(res, null, 2));
		} catch (error) {
			setAxiosResult(`Error: ${JSON.stringify(error, null, 2)}`);
		} finally {
			setAxiosLoading(false);
		}
	};

	const callOverrideApi = async () => {
		setOverrideLoading(true);
		setOverrideResult('Loading...');
		try {
			const res = await overrideToAxiosApi();
			setOverrideResult(JSON.stringify(res, null, 2));
		} catch (error) {
			setOverrideResult(`Error: ${JSON.stringify(error, null, 2)}`);
		} finally {
			setOverrideLoading(false);
		}
	};

	return (
		<div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
			<h1>APIFactory with httpClient Configuration</h1>

			<div
				style={{
					marginBottom: '30px',
					padding: '15px',
					backgroundColor: '#f0f7ff',
					borderRadius: '5px',
					border: '1px solid #0066cc',
				}}
			>
				<h3 style={{ margin: '0 0 10px 0', color: '#0066cc' }}>ℹ️ Factory-Level Configuration</h3>
				<p style={{ margin: '5px 0' }}>
					The <code>httpClient</code> flag can be set at the <strong>factory level</strong> to apply to all API
					definitions created by that factory.
				</p>
				<ul style={{ marginLeft: '20px' }}>
					<li>
						<strong>Global Setting</strong>: Set once in the factory constructor
					</li>
					<li>
						<strong>Individual Override</strong>: Each API definition can override this setting
					</li>
					<li>
						<strong>Automatic Detection</strong>: Streaming APIs always use Fetch regardless of this flag
					</li>
				</ul>
			</div>

			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
				{/* Fetch Factory Column */}
				<div style={{ border: '2px solid #28a745', borderRadius: '8px', padding: '20px' }}>
					<h2 style={{ marginTop: 0, color: '#28a745' }}>🟢 Factory with Fetch</h2>
					<div
						style={{
							backgroundColor: '#f8f9fa',
							padding: '10px',
							borderRadius: '5px',
							marginBottom: '15px',
							fontSize: '14px',
						}}
					>
						<strong>Factory Configuration:</strong>
						<pre style={{ margin: '5px 0', fontSize: '12px', overflow: 'auto' }}>
							{`new APIFactory({
  httpClient: 'fetch', // ✅
  baseUrl: '...',
  // ... other config
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
						{fetchLoading ? 'Loading...' : 'Call API (Uses Fetch)'}
					</button>
					<div
						style={{
							backgroundColor: '#f5f5f5',
							padding: '15px',
							borderRadius: '5px',
							minHeight: '150px',
							maxHeight: '300px',
							overflow: 'auto',
							whiteSpace: 'pre-wrap',
							wordBreak: 'break-word',
							border: '1px solid #ddd',
							fontSize: '12px',
						}}
					>
						{fetchResult || 'Click the button to call the API...'}
					</div>
				</div>

				{/* Axios Factory Column */}
				<div style={{ border: '2px solid #007bff', borderRadius: '8px', padding: '20px' }}>
					<h2 style={{ marginTop: 0, color: '#007bff' }}>🔵 Factory with Axios</h2>
					<div
						style={{
							backgroundColor: '#f8f9fa',
							padding: '10px',
							borderRadius: '5px',
							marginBottom: '15px',
							fontSize: '14px',
						}}
					>
						<strong>Factory Configuration:</strong>
						<pre style={{ margin: '5px 0', fontSize: '12px', overflow: 'auto' }}>
							{`new APIFactory({
  // httpClient: 'axios' (default)
  baseUrl: '...',
  // ... other config
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
						{axiosLoading ? 'Loading...' : 'Call API (Uses Axios)'}
					</button>
					<div
						style={{
							backgroundColor: '#f5f5f5',
							padding: '15px',
							borderRadius: '5px',
							minHeight: '150px',
							maxHeight: '300px',
							overflow: 'auto',
							whiteSpace: 'pre-wrap',
							wordBreak: 'break-word',
							border: '1px solid #ddd',
							fontSize: '12px',
						}}
					>
						{axiosResult || 'Click the button to call the API...'}
					</div>
				</div>
			</div>

			{/* Override Example */}
			<div style={{ border: '2px solid #ffc107', borderRadius: '8px', padding: '20px' }}>
				<h2 style={{ marginTop: 0, color: '#856404' }}>⚠️ Override Example</h2>
				<div
					style={{
						backgroundColor: '#fff3cd',
						padding: '15px',
						borderRadius: '5px',
						marginBottom: '15px',
						fontSize: '14px',
					}}
				>
					<strong>API Definition Override:</strong>
					<p style={{ margin: '10px 0 5px 0' }}>
						Even though the factory has <code>httpClient: 'fetch'</code>, this specific API overrides it with{' '}
						<code>httpClient: 'axios'</code>
					</p>
					<pre
						style={{
							margin: '5px 0',
							fontSize: '12px',
							overflow: 'auto',
							backgroundColor: '#fff',
							padding: '10px',
							borderRadius: '3px',
						}}
					>
						{`// Factory has httpClient: 'fetch'
fetchApiFactory.createAPIDefinition({
  url: '/posts/2',
  httpClient: 'axios', // ⚠️ Override - use Axios
  responseSchema: z.object({...}),
})`}
					</pre>
				</div>
				<button
					onClick={callOverrideApi}
					disabled={overrideLoading}
					style={{
						width: '100%',
						padding: '10px 20px',
						fontSize: '16px',
						backgroundColor: overrideLoading ? '#ccc' : '#ffc107',
						color: '#000',
						border: 'none',
						borderRadius: '5px',
						cursor: overrideLoading ? 'not-allowed' : 'pointer',
						marginBottom: '15px',
					}}
				>
					{overrideLoading ? 'Loading...' : 'Call API (Overridden to Axios)'}
				</button>
				<div
					style={{
						backgroundColor: '#f5f5f5',
						padding: '15px',
						borderRadius: '5px',
						minHeight: '150px',
						maxHeight: '300px',
						overflow: 'auto',
						whiteSpace: 'pre-wrap',
						wordBreak: 'break-word',
						border: '1px solid #ddd',
						fontSize: '12px',
					}}
				>
					{overrideResult || 'Click the button to call the API...'}
				</div>
			</div>

			<div
				style={{
					marginTop: '30px',
					padding: '15px',
					backgroundColor: '#e7f3ff',
					borderRadius: '5px',
					border: '1px solid #0066cc',
				}}
			>
				<h3 style={{ margin: '0 0 10px 0', color: '#0066cc' }}>📋 Configuration Priority</h3>
				<ol style={{ marginLeft: '20px', lineHeight: '1.8' }}>
					<li>
						<strong>API Definition Level</strong> (Highest Priority)
						<br />
						<code style={{ fontSize: '12px', backgroundColor: '#fff', padding: '2px 6px', borderRadius: '3px' }}>
							apiFactory.createAPIDefinition({`{ httpClient: 'fetch' }`})
						</code>
					</li>
					<li>
						<strong>Factory Level</strong> (Medium Priority)
						<br />
						<code style={{ fontSize: '12px', backgroundColor: '#fff', padding: '2px 6px', borderRadius: '3px' }}>
							new APIFactory({`{ httpClient: 'fetch' }`})
						</code>
					</li>
					<li>
						<strong>Automatic Detection</strong> (Always applies)
						<br />
						<code style={{ fontSize: '12px', backgroundColor: '#fff', padding: '2px 6px', borderRadius: '3px' }}>
							apiDefinition(data, {'{ onStreamData: callback }'})
						</code>
					</li>
				</ol>
			</div>

			<div
				style={{
					marginTop: '20px',
					padding: '15px',
					backgroundColor: '#d4edda',
					borderRadius: '5px',
					border: '1px solid #28a745',
				}}
			>
				<h3 style={{ margin: '0 0 10px 0', color: '#155724' }}>✅ Best Practices</h3>
				<ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
					<li>
						<strong>Set at factory level</strong> for consistency across your application
					</li>
					<li>
						<strong>Use Fetch</strong> for modern applications to reduce bundle size
					</li>
					<li>
						<strong>Override when needed</strong> for specific APIs that require different behavior
					</li>
					<li>
						<strong>Let auto-detection handle streaming</strong> - no need to set httpClient for streaming APIs
					</li>
					<li>
						<strong>Update the factory config</strong> to migrate all APIs at once when ready
					</li>
				</ul>
			</div>
		</div>
	);
};

const StoryMeta: Meta = {
	title: 'Api/Samples/Factory/httpClient Configuration',
	component: Template,
};

export default StoryMeta;

export const FactoryUseFetch: StoryObj<ComponentType> = {
	args: {},
};
