import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { DataGrid, IDataGridProps } from '../../../src/components/DataGrid';

type ColumnsType = {
	id?: number;
	name: string;
	weight?: number;
	field?: string;
	cellRender?: (row: ColumnsType) => JSX.Element;
	permissions?: string[];
};

type ComponentType = (args: IDataGridProps<ColumnsType, 'name', string> & { columns: ColumnsType[] }) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => <DataGrid {...args} />;

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Data Grid',
	component: Template,
};

export default StoryMeta;

export const ControlsPadding: StoryObj<ComponentType> = {
	args: {
		onFetchData: async () => {
			return [
				{ id: 1, name: 'Jone Doe', weight: 64 },
				{ id: 2, name: 'Jane Doe', weight: 44 },
				{ id: 3, name: 'Aaa Doe', weight: 66 },
				{ id: 4, name: 'Bbb Doe', weight: 44 },
				{ id: 5, name: 'Ccc Doe', weight: 66 },
				{ id: 6, name: 'Ddd Doe', weight: 44 },
				{ id: 7, name: 'Eee Doe', weight: 64 },
				{ id: 8, name: 'Fff Doe', weight: 44 },
				{ id: 9, name: 'Jjj Doe', weight: 66 },
				{ id: 10, name: 'Lll Doe', weight: 44 },
				{ id: 11, name: 'Mmmm Doe', weight: 64 },
				{ id: 12, name: 'Nnn Doe', weight: 44 },
			];
		},
		controlsPadding: true,
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
