import React from 'react';
import { z } from 'zod';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { createAPIDefinition } from '../../src/apiCreateDefinition';
import useApiOnMount from '../../src/useApiOnMount';

type ComponentType = () => JSX.Element;

// Streaming is automatically detected when onStreamData callback is provided
// No need to set httpClient: 'fetch' flag anymore - it's automatic for streaming
const apiDefinition = createAPIDefinition({
	url: 'https://aida-uat.shory.com/api/chatbot/v1/completions',
	method: 'POST',
	requestSchema: z.object({ message: z.string(), session_id: z.string(), member_id: z.string(), language: z.string() }),
	responseSchema: z.string(),
	headers: {
		'X-API-Key': 'spJDXu9kuafI1VPgACoFWYEPB8Kyd01cYa7Nh0trTirDOhK6EgOXhrhPRL2Isv4W',
		'Content-Type': 'application/json',
	},
	httpClient: 'fetch',
});

const Template: StoryFn<ComponentType> = () => {
	const [response, setResponse] = React.useState('');
	const [isStreaming, setIsStreaming] = React.useState(false);

	return (
		<div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
			<h1>Welcome to sample APIs with streaming</h1>

			<button
				onClick={async () => {
					setIsStreaming(true);
					setResponse('');
					try {
						const res = await apiDefinition(
							{
								message: 'What is my dental coverage?',
								session_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
								member_id: '124644',
								language: 'en',
							},
							{
								onStreamData: (partialData) => {
									// onStreamData callback - called as data streams in
									setResponse(partialData);
								},
							}
						);
						// Final response when streaming is complete
						setResponse(res);
					} catch (error) {
						setResponse(`Error: ${JSON.stringify(error, null, 2)}`);
					} finally {
						setIsStreaming(false);
					}
				}}
				disabled={isStreaming}
				style={{
					padding: '10px 20px',
					fontSize: '16px',
					backgroundColor: isStreaming ? '#ccc' : '#007bff',
					color: 'white',
					border: 'none',
					borderRadius: '5px',
					cursor: isStreaming ? 'not-allowed' : 'pointer',
				}}
			>
				{isStreaming ? 'Streaming...' : 'Call Streaming API'}
			</button>

			<h2>Response:</h2>
			<div
				style={{
					backgroundColor: '#f5f5f5',
					padding: '15px',
					borderRadius: '5px',
					minHeight: '100px',
					whiteSpace: 'pre-wrap',
					wordBreak: 'break-word',
					border: '1px solid #ddd',
				}}
			>
				{response || 'No response yet...'}
			</div>

			{isStreaming && (
				<div style={{ marginTop: '10px', color: '#666', fontStyle: 'italic' }}>
					⚡ Data is streaming in real-time...
				</div>
			)}
		</div>
	);
};

const StoryMeta: Meta = {
	title: 'Api/Samples/Sample Api/Streaming API',
	component: Template,
};

export default StoryMeta;

export const StreamingAPI: StoryObj<ComponentType> = {
	args: {},
};
