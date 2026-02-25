import { ErrorIcon } from '@devkit/icons/web';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Button } from '../../../src/components/Buttons';
import { DataGrid, IDataGridProps } from '../../../src/components/DataGrid';
import { Popover } from '../../../src/components/Popover';
import { gridSampleData as sampleData } from './grid-sample-data';

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
	args: IDataGridProps<ColumnsType, 'name', string> & {
		columns: ColumnsType;
	}
) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	return <DataGrid {...args} />;
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Data Grid',
	component: Template,
};

export default StoryMeta;

/** This is the Basic data table */
export const Basic = {
	args: {
		...sampleData({ sortable: false, formatted: false }),
	},
};

export const BasicFlat = {
	args: {
		tableVariant: 'flat',
		...sampleData({ sortable: false, formatted: false }),
	},
};

export const BasicFlatStriped = {
	args: {
		tableVariant: 'flat-striped',
		...sampleData({ sortable: false, formatted: false }),
	},
};

export const BasicOutlinedBorder = {
	args: {
		tableVariant: 'outlined-border',
		...sampleData({ sortable: false, formatted: false }),
	},
};

export const Loading = {
	args: {
		...sampleData({ sortable: true, formatted: true }),
		onFetchData: () =>
			new Promise((resolve) =>
				setTimeout(
					() =>
						resolve([
							{ id: 1, name: 'Jone Doe', weight: 64 },
							{ id: 2, name: 'Jane Doe', weight: 44 },
						]),
					2000
				)
			) as Promise<ColumnsType[]>,
	},
};

export const LoadingError = {
	args: {
		...sampleData({ sortable: true, formatted: true }),
		onFetchData: async () => {
			throw new Error('Error');
		},
	},
};

export const Sortable = {
	args: {
		...sampleData({ sortable: true, formatted: false }),
	},
};

export const SortableClientSide = {
	args: {
		...sampleData({ sortable: true, formatted: false }),
	},
};

export const FrozenColumns: StoryObj<ComponentType> = {
	render: Template,
	args: {
		keyField: 'name',
		...sampleData({ sortable: true, formatted: true }),
		columns: [
			{
				name: 'Pinned Column',
				pinned: true,
				width: '45px',
				cellRender: (row) =>
					row.id === 1 ? (
						<ErrorIcon />
					) : row.id === 2 ? (
						<Popover direction="right" content={{ header: 'header', description: 'description' }} />
					) : null,
			},
			{ name: 'ID', field: 'id', frozen: 'left' },
			{ field: 'name', name: 'Name' },
			{ field: 'name', name: 'Formatted Name', width: '300px', format: (row: ColumnsType) => `${row.id}: ${row.name}` },
			{ name: 'Weight', field: 'weight' },
			{ field: 'name', name: 'Name last' },
		],
		extraActions: () => <Button>Activate</Button>,
		enableSelection: true,
		onSelectedRowsChange: (selectedRow: ColumnsType[]) => {
			// eslint-disable-next-line no-console
			console.log('Selected row', selectedRow);
		},
		hidePaging: false,
		selectableRowDisabled: (row) => row.id === 1,
	},
};

export const Formatted = {
	args: {
		...sampleData({ sortable: true, formatted: true }),
	},
};

export const CellOnClick = {
	args: {
		...sampleData({ sortable: true, formatted: true }),
		columns: [
			{
				name: 'ID',
				field: 'id',
				onCellClick: (row: ColumnsType) => alert(`item ${row.id} is clicked`),
			},
			{ field: 'name', name: 'Name' },
		],
	},
};

export const CellCustomRender = {
	args: {
		...sampleData({ sortable: true, formatted: true }),
		columns: [
			{
				name: 'ID',
				field: 'id',
				cellRender: (row: ColumnsType) => <b style={{ color: 'green' }}>{`item ${row.id}`}</b>,
			},
			{ field: 'name', name: 'Name' },
		],
	},
};

export const Export = {
	args: {
		...sampleData({ sortable: true, formatted: true }),
		columns: [
			{
				name: 'ID',
				field: 'id',
				cellRender: (row: ColumnsType) => <b style={{ color: 'green' }}>{`item ${row.id}`}</b>,
			},
			{ field: 'name', name: 'Name' },
		],
		onExport: () => Promise.resolve('Promise').then(() => alert('export clicked')),
	},
};

export const WithColumnPermissions = {
	args: {
		...sampleData({ sortable: true, formatted: true }),
		columns: [
			{
				name: 'ID',
				field: 'id',
				cellRender: (row: ColumnsType) => <b style={{ color: 'green' }}>{`item ${row.id}`}</b>,
				permissions: ['PermissionLevelViewID'],
			},
			{ field: 'name', name: 'Name' },
		],
	},
};

export const HiddenColumns = {
	args: {
		...sampleData({ sortable: true, formatted: true }),
		columns: [
			{
				name: 'ID',
				field: 'id',
				hidden: true,
			},
			{ field: 'name', name: 'Name' },
		],
	},
};

export const HiddenPaging = {
	args: {
		...sampleData({ sortable: true, formatted: true }),
		columns: [
			{
				name: 'ID',
				field: 'id',
				hidden: true,
			},
			{ field: 'name', name: 'Name' },
		],
		hidePaging: true,
	},
};

export const ExtraActions = {
	args: {
		...sampleData({ sortable: true, formatted: true }),
		columns: [
			{
				name: 'ID',
				field: 'id',
				hidden: true,
			},
			{ field: 'name', name: 'Name' },
		],
		extraActions: () => <Button>Add User</Button>,
		onExport: () => Promise.resolve('Promise').then(() => alert('export clicked')),
	},
};

export const ShowRefreshAction = {
	args: {
		...sampleData({ sortable: true, formatted: true }),
		columns: [
			{
				name: 'ID',
				field: 'id',
				hidden: false,
				width: '300px',
			},
			{ field: 'name', name: 'Name', width: '300px' },
			{
				name: 'ID',
				field: 'id',
				hidden: false,
				width: '300px',
			},
			{ field: 'name', name: 'Name', width: '300px' },
			{
				name: 'ID last',
				field: 'id',
				hidden: false,
				width: '300px',
			},
			{ field: 'name', name: 'Name last', width: '300px' },
		],
		extraActions: () => <Button>Add User</Button>,
		onExport: () => Promise.resolve('Promise').then(() => alert('export clicked')),
		enableRefresh: true,
	},
};

export const PagingDisclaimer = {
	args: {
		...sampleData({ sortable: true, formatted: true }),
		columns: [
			{
				name: 'ID',
				field: 'id',
			},
			{ field: 'name', name: 'Name' },
			{ field: 'weight', name: 'Weight' },
		],
		pagingDisclaimer: (
			<div className="flex items-center gap-2 text-sm text-gray-600">
				<span>Paging Disclaimer content</span>
			</div>
		),
		pageSizePosition: 'bottom',
	},
};
