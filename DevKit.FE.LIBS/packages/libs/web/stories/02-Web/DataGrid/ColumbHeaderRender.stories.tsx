import { useRef } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { DataGrid, IDataGridProps, IDataGridRef, SortOrder } from '../../../src/components/DataGrid';
import { TextField } from '../../../src/components/TextField';

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

export const ColumnHeaderRender: StoryObj<ComponentType> = {
	args: {
		keyField: 'id',
		columns: [
			{
				name: 'ID',
				field: 'id',
				hidden: false,
				sortIdentifier: 'userIdField',
				sortable: true,
			},
			{
				field: 'name',
				name: 'Company Id',
				sortable: true,
				width: '50px',
				cellRender: (row) => <TextField value={row.name} />,
				headerRender: () => (
					<div className="text-center">
						<div>Company</div>
						<div>ID</div>
					</div>
				),
			},
		],
		onFetchData: async () => {
			return [
				{ id: 1, name: '123', weight: 66 },
				{ id: 2, name: '123', weight: 44 },
				{ id: 3, name: 'Eee Doe', weight: 64 },
				{ id: 4, name: 'Fff Doe', weight: 44 },
				{ id: 5, name: 'Jjj Doe', weight: 66 },
				{ id: 6, name: 'Lll Doe', weight: 44 },
				{ id: 7, name: 'Mmmm Doe', weight: 64 },
				{ id: 8, name: 'Nnn Doe', weight: 44 },
			];
		},
		hidePaging: 'show-count-only',
	},
};
