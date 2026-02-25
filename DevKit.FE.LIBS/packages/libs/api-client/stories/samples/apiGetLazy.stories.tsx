import React from 'react';
import { z } from 'zod';
import { logger } from '@devkit/utilities/dist/Debug';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { createAPIDefinition } from '../../src/apiCreateDefinition';
import useLazyApi from '../../src/useLazyApi';

type ComponentType = () => JSX.Element;

const apiDefinition = createAPIDefinition({
	url: 'https://extdev.shory.com/visit-api/app/init',
	responseSchema: z.object({
		agencyStatuses: z.array(z.object({ id: z.number(), status: z.string() })),
		documentTypes: z.array(z.object({ id: z.number(), label: z.string() })),
	}),
});

const Template: StoryFn<ComponentType> = () => {
	const { callApi, result } = useLazyApi(apiDefinition);

	logger.log('result ', result);

	return (
		<div>
			Welcome to sample APIs
			<button name="Retry" onClick={() => callApi()}>
				Retry
			</button>
		</div>
	);
};

const StoryMeta: Meta = {
	title: 'Api/Samples/Sample Api/GET/Lazy',
	component: Template,
};

export default StoryMeta;

export const SampleGetApi: StoryObj<ComponentType> = {
	args: {},
};
