import React from 'react';
import { useState } from 'react';
import { z } from 'zod';
import { logger } from '@devkit/utilities/dist/Debug';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { createAPIDefinition } from '../../src/apiCreateDefinition';
import useLazyApi from '../../src/useLazyApi';

type ComponentType = () => JSX.Element;

const postDocumentUpload = createAPIDefinition({
	method: 'POST',
	url: 'https://healthindividualdev.shory.com/api/document/upload',
	headers: {
		'Content-Type': 'multipart/form-data',
	},
	responseSchema: z.object({ fileUrl: z.string(), lastUpdatedOn: z.string() }),
	requestSchema: z.object({
		uploadRef: z.string(),
		encryptedJourneyId: z.string(),
		memberId: z.string(),
		type: z.string(),
		file: z.string(),
		updatedOnInGST: z.string().optional(),
		operationType: z.number(),
	}),
});

const Template: StoryFn<ComponentType> = () => {
	const { callApi, result } = useLazyApi(postDocumentUpload);

	const [selectedFile, setSelectedFile] = useState<File | null | undefined>(null);

	const onClick = async () => {
		const res = await callApi(
			{
				uploadRef: 'XGLPW2ZN2ZGXNP2',
				encryptedJourneyId: 'fK45sU9y6NoyH3pv9FlsSg',
				memberId: '82b0f8ad-000d-44de-98d6-7ab300fcba5f',
				type: '2',
				file: selectedFile as unknown as string,
				operationType: 1,
			},
			{
				onProgress: (progressEvent) => {
					logger.log('🚀 ~ onClick ~ progressEvent:', progressEvent);
				},
			}
		);

		logger.log('🚀 ~ onClick ~ res:', res);
	};

	return (
		<div>
			Welcome to sample APIs with lazy
			<div>Result: {JSON.stringify(result)}</div>
			<input type="file" onChange={(e) => setSelectedFile(e.target.files?.item(0))} />
			<button name="Upload" onClick={onClick}>
				Upload
			</button>
		</div>
	);
};

const StoryMeta: Meta = {
	title: 'Api/Samples/Sample Api/UploadProgress',
	component: Template,
};

export default StoryMeta;

export const UploadProgressApi: StoryObj<ComponentType> = {
	args: {},
};
