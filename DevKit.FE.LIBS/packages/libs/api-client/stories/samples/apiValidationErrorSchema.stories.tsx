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
	validationMode: 'Error',
});

const Template: StoryFn<ComponentType> = () => {
	const { errors } = useApiOnMount(apiDefinition, []);

	if (errors) {
		alert(errors.mapped[0].message);
	}

	return <div>Welcome to validate response schema Error Mode</div>;
};

const StoryMeta: Meta = {
	title: 'Api/Samples/Validate Response Schema/Error',
	component: Template,
};

export default StoryMeta;

export const ValidationResponseSchema: StoryObj<ComponentType> = {
	args: {},
};
