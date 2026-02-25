import { DownloadIcon } from '@devkit/icons/web';
import { logger } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-vite';
import { Button } from '../../../src/components/Buttons';
import { DataGrid, IDataGridProps } from '../../../src/components/DataGrid';
import { SearchBox } from '../../../src/components/SearchBox';
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
	return (
		<div className="pt-4">
			<div className="border border-gray-200 rounded-2xl overflow-hidden">
				<div className="pb-4 pt-4">
					<DataGrid tableVariant="flat" pageSizePosition="bottom" {...args} />
				</div>
			</div>
		</div>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Data Grid/Column Selector',
	component: Template,
};

export default StoryMeta;

export const DatagridWithExtraActions = {
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
		onExport: async () => {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(true);
				}, 2000);
			});
		},
		enableRefresh: true,
		extraActions: () => (
			<div className="pe-0 flex gap-2">
				<Button variant="primary">Activate</Button>
				<Button variant="secondary">Column Selector</Button>
			</div>
		),
	},
};

export const DatagridWithCustomHeader = {
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
		extraActions: () => (
			<div className="px-4 flex gap-2 items-center justify-between w-full">
				<div className="font-bold text-title text-dark-1">Recent Transactions</div>
				<div className="flex gap-2">
					<div className="w-[320px]">
						<SearchBox placeholder="Search by Policy Number, registration. Plate Number" />
					</div>

					<div className="w-[165px]">
						<Button variant="secondary">Column Selector</Button>
					</div>
					<div className="w-[165px]">
						<Button variant="secondary" iconEnd={() => <DownloadIcon />}>
							Export Data
						</Button>
					</div>
				</div>
			</div>
		),
	},
};

export const DatagridWithColumnSelector = {
	args: {
		...sampleData({ sortable: true, formatted: true }),
		columns: [
			{
				name: 'ID',
				field: 'id',
				group: 'Public Info',
				section: 'User Details',
				frozen: 'right',
			},
			{ field: 'name', name: 'Name', group: 'Public Info', section: 'User Details' },
			{ field: 'weight', name: 'Weight', group: 'Private Info', section: 'User Details' },
			{ field: 'phone', name: 'Phone', group: 'Private Info', section: 'User Details' },
			{ field: 'email', name: 'Email', group: 'Private Info', section: 'User Details' },
			{ field: 'status', name: 'Status', group: 'Private Info', section: 'User Details' },

			{ field: 'department', name: 'Department', group: 'Public Info', section: 'Work Info' },
			{ field: 'salary', name: 'Salary', group: 'Private Info', section: 'Work Info' },
			{ field: 'joinDate', name: 'Join Date', group: 'Public Info', section: 'Work Info' },
			{ field: 'isActive', name: 'Active', group: 'Public Info', section: 'Work Info' },
		],
		onExport: (columns?: string[]) => {
			return Promise.resolve().then(() => {
				if (columns) {
					alert(`Exporting Selected Columns: ${columns.join(', ')}`);
				} else {
					alert('Exporting All Data');
				}
			});
		},
		enableRefresh: true,
		allowPageSizeChange: true,
		allowColumnSelection: true,
		selectedColumnsEffectExport: true,
		onSelectedColumnsChange: (cols: string[]) => {
			logger.log('Selected Columns: ', cols);
		},
	},
};

export const DatagridWithPreselectedColumns = {
	args: {
		...sampleData({ sortable: true, formatted: true }),
		columns: [
			{
				name: 'ID',
				field: 'id',
				group: 'Public Info',
				section: 'User Details',
			},
			{ field: 'name', name: 'Name', group: 'Public Info', section: 'User Details' },
			{ field: 'weight', name: 'Weight', group: 'Private Info', section: 'User Details' },
			{ field: 'phone', name: 'Phone', group: 'Private Info', section: 'User Details' },
			{ field: 'email', name: 'Email', group: 'Private Info', section: 'User Details' },
			{ field: 'status', name: 'Status', group: 'Private Info', section: 'User Details' },

			{ field: 'department', name: 'Department', group: 'Public Info', section: 'Work Info' },
			{ field: 'salary', name: 'Salary', group: 'Private Info', section: 'Work Info' },
			{ field: 'joinDate', name: 'Join Date', group: 'Public Info', section: 'Work Info' },
			{ field: 'isActive', name: 'Active', group: 'Public Info', section: 'Work Info' },
		],
		onExport: (columns?: string[]) => {
			return Promise.resolve().then(() => {
				if (columns) {
					alert(`Exporting Selected Columns: ${columns.join(', ')}`);
				} else {
					alert('Exporting All Data');
				}
			});
		},
		enableRefresh: true,
		allowPageSizeChange: true,
		allowColumnSelection: true,
		selectedColumnsEffectExport: true,
		selectedColumns: ['ID', 'Name'],
	},
};
