import React from 'react';
import { useState } from 'react';
import { z } from 'zod';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { createAPIDefinition } from '../../src/apiCreateDefinition';
import useLazyApi from '../../src/useLazyApi';

type ComponentType = () => JSX.Element;

const Template: StoryFn<ComponentType> = () => {
	const getImage = createAPIDefinition({
		method: 'GET',
		url: '/devkit-logo.png',
		responseSchema: z.instanceof(Blob),
		transformResponse: (data) => data,
	});
	const [imageUrl, setImageUrl] = useState('');

	return (
		<div>
			<div>{imageUrl && <img src={imageUrl} />}</div>
			<button
				name="Get Image"
				onClick={async () => {
					const blob = await getImage();
					const url = URL.createObjectURL(blob);
					setImageUrl(url);
				}}
			>
				Retry
			</button>
		</div>
	);
};

const StoryMeta: Meta = {
	title: 'Api/Samples/Sample Api',
	component: Template,
};

export default StoryMeta;

export const GetFile: StoryObj<ComponentType> = {
	args: {},
};
