import { PropsWithChildren, ReactNode } from 'react';
import { NjUserLineIcon } from '@devkit/icons/web';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { DataGrid, IDataGridProps } from '../../../src/components/DataGrid';
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
	return <DataGrid {...args} />;
};

type Props = {
	title: ReactNode;
	titleIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
	toolbar?: ReactNode;
};

const DataGridCard = ({ children, title, titleIcon, toolbar }: PropsWithChildren<Props>) => {
	const TitleIcon = titleIcon;

	return (
		<div className="border rounded-xl overflow-hidden">
			<div className="flex items-center justify-between py-4 px-6 bg-gray-50 border-b">
				<div className="flex items-center gap-1.5">
					{TitleIcon && <TitleIcon className="w-6 h-6 text-gray-500" />}
					<h2 className="text-title font-bold">{title}</h2>
				</div>
				{toolbar && toolbar}
			</div>
			<div>{children}</div>
		</div>
	);
};

const DataGridContainer: React.FC<React.PropsWithChildren> = ({ children }) => (
	<DataGridCard title="Members List" titleIcon={NjUserLineIcon} toolbar={<div>Toolbar</div>}>
		{children}
	</DataGridCard>
);

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Data Grid',
	component: Template,
};

export default StoryMeta;

export const GridContainer: StoryObj<ComponentType> = {
	args: {
		keyField: 'id',
		data: fetchGridSampleData,
		onMobileResponsiveHeaderRender: () => (
			<div className="w-full flex items-center gap-2">
				<div className="flex-1 font-bold text-caption2">ID</div>
				<div className="flex-1 font-bold text-caption2">Name</div>
				<div className="w-4 h-4"></div>
			</div>
		),
		onMobileResponsiveRender: ({ item }) => (
			<div>
				<div className="flex justify-between w-full items-center">
					<span className="text-paragraph flex-1">{item.id}</span>
					<span className="text-paragraph flex-1 break-all">{item.name}</span>
				</div>
			</div>
		),
		pageSizePosition: 'bottom',
		headerColor: 'brand-50',
		container: DataGridContainer,
		tableVariant: 'flat',
		columns: [
			{
				name: 'ID',
				field: 'id',
				hidden: false,
				width: '600px',
				sortIdentifier: 'userIdField',
				sortable: true,
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
				width: '1000px',
				cellRender: (row) => <TextField value={row.name} />,
			},
		],
	},
};
