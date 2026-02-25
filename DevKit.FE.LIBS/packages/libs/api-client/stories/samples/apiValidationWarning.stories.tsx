import React from 'react';
import { z } from 'zod';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { createAPIDefinition } from '../../src/apiCreateDefinition';
import useApiOnMount from '../../src/useApiOnMount';

type ComponentType = () => JSX.Element;

const apiDefinition = createAPIDefinition({
	url: 'https://extdev.shory.com/visit-api/app/init',
	responseSchema: z.object({
		agencyStatuses: z.array(z.object({ id: z.number(), status: z.number() })),
		documentTypes: z.array(z.object({ id: z.number(), label: z.string() })),
	}),
});

const Template: StoryFn<ComponentType> = () => {
	useApiOnMount(apiDefinition, []);

	return <div>Welcome to validate response schema Warning Mode as console Warning.</div>;
};

const StoryMeta: Meta = {
	title: 'Api/Samples/Validate Response Schema/Warning',
	component: Template,
};

export default StoryMeta;

export const ValidationResponseSchema: StoryObj<ComponentType> = {
	args: {},
};
