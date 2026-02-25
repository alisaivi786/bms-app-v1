import React from 'react';
import { z } from 'zod';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { APIFactory } from '../../src';
import useApiOnMount from '../../src/useApiOnMount';

type ComponentType = () => JSX.Element;

const apiFactory = new APIFactory({
	baseUrl: '',
	originalResponseSchema: z
		.object({
			data: z.record(z.string(), z.string()),
			errors: z.undefined(),
		})
		.or(
			z.object({
				data: z.undefined(),
				errors: z.array(z.object({ code: z.string() })),
			})
		),
	isErrorResponse: (options) => {
		return options.status >= 300;
	},
	transformResponse: (response) => {
		return response.data;
	},
	transformError: (response) => {
		if (!response.errors) return undefined;

		return { mapped: response.errors };
	},
	headers: { Authorization: 'Test', 'Content-Type': 'test' },
	errorCodes: ['TestGlobalError'],
});

const apiDefinition = apiFactory.createAPIDefinition({
	errorCodes: ['TestDefError'],
	url: '/app/init',
	responseSchema: z.object({
		agencyStatuses: z.array(z.object({ id: z.number(), status: z.string() })),
		documentTypes: z.array(z.object({ id: z.number(), label: z.string() })),
	}),
});

apiFactory.updateConfig({ baseUrl: 'https://extdev.shory.com/visit-api11ss' });

const Template: StoryFn<ComponentType> = () => {
	const { result, errors } = useApiOnMount(apiDefinition, []);

	return (
		<div>
			API Factory set up
			<div>
				<h5>Result:</h5>
				<pre>{JSON.stringify(result, null, 4)}</pre>
			</div>
			<hr />
			<div>
				<div>
					<h5>Errors:</h5>
					<pre>{JSON.stringify(errors, null, 4)}</pre>
				</div>
			</div>
		</div>
	);
};

const StoryMeta: Meta = {
	title: 'Api/Samples/Factory Set Up',
	component: Template,
};

export default StoryMeta;

export const ApiFactorySetUp: StoryObj<ComponentType> = {
	args: {},
};
