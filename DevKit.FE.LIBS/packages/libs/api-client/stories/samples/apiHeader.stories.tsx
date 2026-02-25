import React from 'react';
import { z } from 'zod';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { createAPIDefinition } from '../../src/apiCreateDefinition';
import useApiOnMount from '../../src/useApiOnMount';

type ComponentType = () => JSX.Element;

const apiDefinition = createAPIDefinition({
	url: 'https://extdev.shory.com/visit-api/app/init',
	responseSchema: z.object({
		agencyStatuses: z.array(z.object({ id: z.number(), status: z.string() })),
		documentTypes: z.array(z.object({ id: z.number(), label: z.string() })),
	}),
	headers: { Authorization: 'test authorization token' },
});

const Template: StoryFn<ComponentType> = () => {
	useApiOnMount(apiDefinition, []);

	return <div>Welcome to sample APIs with header</div>;
};

const StoryMeta: Meta = {
	title: 'Api/Samples/Sample Api/GET/Set Header',
	component: Template,
};

export default StoryMeta;

export const SetHeader: StoryObj<ComponentType> = {
	args: {},
};
