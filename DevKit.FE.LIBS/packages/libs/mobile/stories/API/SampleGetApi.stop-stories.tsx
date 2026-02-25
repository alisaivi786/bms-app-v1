import React from 'react';
import { Text, View } from 'react-native';
import 'react-native-get-random-values';
import { z } from 'zod';
import { createAPIDefinition, useApiOnMount } from '@devkit/api-client';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

type ComponentType = () => JSX.Element;

const apiDefinition = createAPIDefinition({
	baseUrl: 'https://extdev.shory.com/visit-api',
	url: '/app/init',
	method: 'GET',
	responseSchema: z.object({
		agencyStatuses: z.array(z.object({ id: z.number(), status: z.string() })),
		documentTypes: z.array(z.object({ id: z.number(), label: z.string() })),
	}),
});

const Template: StoryFn<ComponentType> = () => {
	const { result, errors, isLoading } = useApiOnMount(apiDefinition, []);

	return (
		<View>
			<Text>isLoading {JSON.stringify(isLoading)}</Text>
			<Text>Errors: {JSON.stringify(errors)}</Text>
			<Text>Result: {JSON.stringify(result)}</Text>
		</View>
	);
};

const StoryMeta: Meta = {
	title: 'Api/Sample Api/GET/Lazy',
	component: Template,
};

export default StoryMeta;

export const SampleGetApi: StoryObj<ComponentType> = {
	args: {},
};
