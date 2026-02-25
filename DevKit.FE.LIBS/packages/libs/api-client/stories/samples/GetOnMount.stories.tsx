import React from 'react';
import { z } from 'zod';
import { logger } from '@devkit/utilities/dist/Debug';
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
});

const Template: StoryFn<ComponentType> = () => {
	const { result } = useApiOnMount(apiDefinition, []);

	logger.log('result ', result);

	return (
		<div>
			<div>Welcome to sample APIs on mount</div>
			<div>
				Result:
				{result?.agencyStatuses?.map((as) => (
					<div key={as.id}>{`Id: ${as.id} and Status: ${as.status}  `}</div>
				))}
			</div>
		</div>
	);
};

const StoryMeta: Meta = {
	title: 'Api/Samples/Sample Api/GET/On Mount',
	component: Template,
};

export default StoryMeta;

export const SampleGetApi: StoryObj<ComponentType> = {
	args: {},
};
