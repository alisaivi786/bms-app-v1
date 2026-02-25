import React from 'react';
import { z } from 'zod';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { createAPIDefinition } from '../../src/apiCreateDefinition';

type ComponentType = () => JSX.Element;

const Template: StoryFn<ComponentType> = () => {
	const downloadExcelAPIDefinition = createAPIDefinition({
		method: 'POST',
		baseUrl: 'https://healthindividualdev.shory.com/api',
		url: '/Quote/networksearch/export',
		requestParameters: { planId: ['required', 'number'] },
		requestSchema: z.object({
			paging: z.object({ pageSize: z.number(), pageNumber: z.number() }),
			sorting: z.object({ columnName: z.string(), sortOrder: z.number() }),
			facilityName: z.string().optional(),
			facilityTypeIds: z.array(z.number()).optional(),
			cityIds: z.array(z.number()).optional(),
			countryIds: z.array(z.number()).optional(),
		}),
		responseSchema: z.object({ file: z.instanceof(Blob), fileName: z.string() }),
		transformResponse: (data, headers) => ({
			file: data,
			fileName: `${headers['content-type']}.xlsx`,
		}),
	});

	return (
		<div>
			<button
				name="Get File"
				onClick={async () => {
					const body = {
						paging: {
							pageSize: 0,
							pageNumber: 0,
						},
						sorting: {
							columnName: 'string',
							sortOrder: 1,
						},
						facilityName: undefined,
						facilityTypeIds: undefined,
						cityIds: undefined,
						countryIds: undefined,
					};
					const data = await downloadExcelAPIDefinition({ parameters: { planId: 1 }, body });
					const link = document.createElement('a');

					link.href = URL.createObjectURL(data.file);
					link.setAttribute('download', data.fileName);
					document.body.appendChild(link);
					link.click();
					link.remove();
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

export const GetFile2: StoryObj<ComponentType> = {
	args: {},
};
