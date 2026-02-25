import React from 'react';
import { z } from 'zod';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { createAPIDefinition } from '../../src/apiCreateDefinition';
import useLazyApi from '../../src/useLazyApi';

type ComponentType = () => JSX.Element;

const Template: StoryFn<ComponentType> = () => {
	const test = createAPIDefinition({
		method: 'POST',
		url: 'https://accounts-dev.shory.com/api/user/login',
		responseSchema: z.object({
			token: z.string(),
			isAuthenticated: z.boolean(),
		}),
		requestSchema: z.object({
			email: z.string(),
			password: z.string(),
		}),
		requestParameters: { test: ['optional', 'string'] },
	});

	const { callApi, result } = useLazyApi(test);

	return (
		<div>
			Welcome to sample APIs with lazy
			<div>Result: {result?.token}</div>
			<button
				name="Retry"
				onClick={() =>
					callApi({
						body: {
							email: 'testEnrollUser@yahoo.com',
							password: 'Shory@123',
						},
						parameters: {
							test: 'test',
						},
					})
				}
			>
				Retry
			</button>
		</div>
	);
};

const StoryMeta: Meta = {
	title: 'Api/Samples/Sample Api/POST',
	component: Template,
};

export default StoryMeta;

export const SamplePostApi: StoryObj<ComponentType> = {
	args: {},
};
