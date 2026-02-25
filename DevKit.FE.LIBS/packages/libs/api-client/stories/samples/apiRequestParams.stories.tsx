import React from 'react';
import { z } from 'zod';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { createAPIDefinition } from '../../src/apiCreateDefinition';
import useApiOnMount from '../../src/useApiOnMount';

type ComponentType = () => JSX.Element;

const apiDefinition = createAPIDefinition({
	url: 'https://healthindividualdev.shory.com/api/Member/:quoteJourneyId/medical-declaration-questions',
	errorCodes: ['InvalidJounreyId'],
	originalResponseSchema: z
		.object({ errors: z.array(z.object({ code: z.string(), message: z.string(), field: z.string() })) })
		.or(
			z.object({
				errors: z.null(),
				agencyStatuses: z.array(z.object({ id: z.number(), status: z.number() })),
				documentTypes: z.array(z.object({ id: z.number(), label: z.string() })),
			})
		),

	requestParameters: { quoteJourneyId: ['required', 'string'], query1: ['optional', 'number'] },
	requestHeaders: { 'otp-token': ['optional', 'string'] },
	responseSchema: z.object({
		agencyStatuses: z.array(z.object({ id: z.number(), status: z.number() })),
		documentTypes: z.array(z.object({ id: z.number(), label: z.string() })),
	}),
	transformError(response, status) {
		return {
			mapped: response.errors ?? [{ code: 'NoErrorCodeMapping' }],
			originalResponse: response,
			status,
		};
	},
});

const Template: StoryFn<ComponentType> = () => {
	const { result, errors, isLoading } = useApiOnMount(apiDefinition, [
		{
			parameters: { quoteJourneyId: 'wp5YM94LTlaZGMfKZ32k1g', query1: 123 },
			headers: { 'otp-token': '1234' },
		},
	]);

	return (
		<div>
			<p>Welcome to path params story</p>
			<p>isLoading:{`${isLoading}`}</p>
			<hr />
			<h5>errors</h5>
			<pre>{JSON.stringify(errors, null, 2)}</pre>
			<hr />

			<h5>Result</h5>
			<pre>{JSON.stringify(result, null, 2)}</pre>
		</div>
	);
};

const StoryMeta: Meta = {
	title: 'Api/Samples/Sample Api/GET/PathParams',
	component: Template,
};

export default StoryMeta;

export const ValidationResponseSchema: StoryObj<ComponentType> = {
	args: {},
};
