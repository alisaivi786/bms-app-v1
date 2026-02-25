import { FC, PropsWithChildren, useRef, useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Button } from '../../../src/components/Buttons';
import { IColumn } from '../../../src/components/DataGrid';
import {
	DynamicReport,
	DynamicReportApiPayload,
	DynamicReportDataApiResponse,
	DynamicReportDataGridOptions,
	DynamicReportFiltersApiResponse,
	DynamicReportFormOptions,
	DynamicReportProps,
	DynamicReportRef,
	DynamicReportTab,
	DynamicReportTabsOptions,
} from '../../../src/components/DynamicReport';
import { fetchDataApiSample, fetchFiltersApiSample, validationYup } from './test-data';

type ComponentType = (args: {
	formOptions?: DynamicReportFormOptions;
	dataGridOptions: DynamicReportDataGridOptions;
	tabs?: DynamicReportTab[];
	tabsOptions?: DynamicReportTabsOptions;
	fetchDataApi: (payload: DynamicReportApiPayload) => Promise<DynamicReportDataApiResponse>;
	fetchFiltersApi: (tab?: number | string) => Promise<DynamicReportFiltersApiResponse>;
}) => JSX.Element;

const TopContent: FC<PropsWithChildren<{ data: DynamicReportDataApiResponse }>> = ({
	data,
}: {
	data: DynamicReportDataApiResponse;
}) => {
	const total = data?.data?.reduce((acc, cur) => acc + ((cur?.price as number) || 0), 0);

	return (
		<div className="bg-gray-300 p-4 mb-5">
			<h5 className="m-0">Total Amounts: {total}</h5>
		</div>
	);
};

const BottomContent: FC<PropsWithChildren<{ data: DynamicReportDataApiResponse }>> = ({
	data,
}: {
	data: DynamicReportDataApiResponse;
}) => {
	const total = data?.data?.reduce((acc, cur) => acc + ((cur?.price as number) || 0), 0);

	return (
		<div className="bg-gray-300 p-4 mb-5">
			<h5 className="m-0">Total Amounts: {total}</h5>
		</div>
	);
};

const Template: StoryFn<ComponentType> = (args) => {
	const [gridDataResponse, setGridDataResponse] = useState<DynamicReportDataApiResponse>();
	const ref = useRef<DynamicReportRef>(null);

	return (
		<div className="p-5 bg-gray-50">
			<DynamicReport
				formOptions={args?.formOptions}
				dataGridOptions={args.dataGridOptions}
				tabs={args?.tabs}
				tabsOptions={args?.tabsOptions}
				fetchDataApi={async (payload: DynamicReportApiPayload) => {
					const res = await args.fetchDataApi(payload);

					setGridDataResponse(res);

					return res;
				}}
				fetchFiltersApi={args.fetchFiltersApi}
				topContent={gridDataResponse ? <TopContent data={gridDataResponse} /> : undefined}
				bottomContent={gridDataResponse ? <BottomContent data={gridDataResponse} /> : undefined}
				ref={ref}
			/>
			<Button onClick={() => ref.current?.refetchData()}>Refetch by ref</Button>
		</div>
	);
};

const StoryMeta: Meta<DynamicReportProps> = {
	title: 'Web/Reports/DynamicReport',
	component: DynamicReport,
};

export default StoryMeta;

export const DynamicReportStory: StoryObj<ComponentType> = {
	render: Template,
	args: {
		formOptions: {
			isCollapsable: true,
			columnsCount: 2,
			columnsCountForMobile: 1,
			validationSchema: { validationMode: 'yup', validation: validationYup },
			showShowAllButton: true,
			onFormSubmit: (values) => JSON.stringify(values),
			initialValues: { userName: 'Initial Value Username' },
			onFormReset: async () => Promise.resolve('Promise').then(() => alert('Form Reset Triggered')),
			onValueChange: (values) => JSON.stringify(values),
		},
		dataGridOptions: {
			onExport: async () => Promise.resolve('Promise').then(() => alert('export clicked')),
			keyField: 'name',
			actions: [
				{
					name: 'Actions',
					cellRender: () => (
						<Button variant="primary" onClick={() => alert('Action clicked')}>
							Action
						</Button>
					),
					width: '24px',
					sortable: false,
				},
			],
			additionalColumnMapping: (columns: IColumn<Record<string, unknown>, string>[]) => {
				const tempCols = columns.map((column) => {
					let tempCol: IColumn<Record<string, string>, string> = column as IColumn<Record<string, unknown>, string>;

					if (tempCol.field === 'weight') {
						tempCol = {
							...tempCol,
							cellRender: (row: Record<string, string>) =>
								+row.weight == 0 ? (
									<p>Custom Field mapped by additional column mapper</p>
								) : (
									(row[tempCol.field as string] as string)
								),
						};
					} else if (tempCol.name === 'Custom Field') {
						tempCol = {
							...tempCol,
							format: (val) => `${val.name}'s weight is ${val.weight}`,
						};
					}

					return tempCol;
				});

				return tempCols as IColumn<Record<string, unknown>, string>[];
			},
		},
		tabs: [
			{ title: 'Tab 1', id: 1 },
			{ title: 'Tab 2', id: 2 },
		],
		tabsOptions: {
			onSelectedTabIndexChanged: () => alert('Tab Changed'),
			variant: 'filled',
			titleContainerWidth: '100%',
		},
		fetchDataApi: fetchDataApiSample,
		fetchFiltersApi: fetchFiltersApiSample,
	},
};
