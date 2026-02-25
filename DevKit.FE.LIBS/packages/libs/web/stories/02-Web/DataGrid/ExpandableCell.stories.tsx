import { useRef } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { DataGrid, IDataGridProps, IDataGridRef, SortOrder } from '../../../src/components/DataGrid';
import { TextField } from '../../../src/components/TextField';
import { fetchGridSampleData } from './grid-sample-data';

type ColumnsType = {
	id?: number;
	name?: string;
	weight?: number;
	field?: keyof ColumnsType;
	frozen?: string;
	permissions?: string[];
	hidden?: boolean;
	keyField?: string;
	expandable?: boolean;
	lastColumnFixed?: boolean;
	width?: string;
};

type ComponentType = (
	args: IDataGridProps<ColumnsType, 'id', string> & {
		columns: ColumnsType;
	}
) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const gridRef = useRef<IDataGridRef>(null);

	return (
		<div className="flex flex-col gap-24 p-5">
			<DataGrid
				{...args}
				ref={gridRef}
				onSort={(column: string, sortOrder: SortOrder) => {
					alert(`'${column}' need sort with order ${sortOrder}`);
				}}
			/>
		</div>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Data Grid',
	component: Template,
	argTypes: {
		tableVariant: {
			control: 'select',
			options: ['default', 'without-border'],
			defaultValue: 'default',
		},
	},
};

export default StoryMeta;

export const ExpandableCell: StoryObj<ComponentType> = {
	args: {
		keyField: 'id',
		columns: [
			{
				name: 'ID',
				field: 'id',
				hidden: false,
				width: '30px',
				sortIdentifier: 'userIdField',
				sortable: true,
			},
			{
				field: 'name',
				name: 'expandable name',
				expandable: true,
				format: (row) => `${row.name}`,
				width: '200px',
			},
			{
				field: 'name',
				name: 'ID',
				sortable: true,
				cellRender: (row) => <p>{row.id}</p>,
				cellClassName: (row) => (row.id === 1 ? '!bg-green-100' : ''),
			},
			{
				field: 'name',
				name: 'Name',
				sortable: true,
				cellRender: (row) => <TextField value={row.name} />,
			},
		],
		onFetchData: async () => fetchGridSampleData,
		hidePaging: 'show-count-only',
	},
};
