import { logger } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { DataGrid, IDataGridProps } from '../../../src/components/DataGrid';
import { DatePicker } from '../../../src/components/DatePicker';
import { Dropdown } from '../../../src/components/Dropdown';
import { TextField } from '../../../src/components/TextField';
import { fetchGridSampleData } from './grid-sample-data';

type ColumnsType = {
	id?: number;
	name?: string;
	weight?: number;
	email?: string;
	phone?: string;
	status?: string;
	department?: string;
	salary?: number;
	joinDate?: string;
	isActive?: boolean;
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
	return (
		<div className="flex flex-col gap-24 p-5">
			<DataGrid {...args} />
		</div>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Data Grid',
	component: Template,
};

export default StoryMeta;

export const ClientSideDataGrid: StoryObj<ComponentType> = {
	args: {
		keyField: 'id',
		data: fetchGridSampleData,
		columns: [
			{
				name: 'ID',
				field: 'id',
				hidden: false,
				width: '200px',
				sortIdentifier: 'userIdField',
				sortable: true,
				frozen: 'left',
			},
			{
				field: 'name',
				name: 'Name',
				sortable: true,
				width: '200px',
				cellRender: (row) => <p>{row.name}</p>,
			},
			{
				field: 'weight',
				name: 'Weight (kg)',
				sortable: true,
				width: '120px',
				cellRender: (row) => <p>{row.weight} kg</p>,
			},
			{
				field: 'email',
				name: 'Email',
				sortable: true,
				width: '250px',
				cellRender: (row) => <p>{row.email}</p>,
			},
			{
				field: 'phone',
				name: 'Phone',
				sortable: true,
				width: '150px',
				cellRender: (row) => <p>{row.phone}</p>,
			},
			{
				field: 'status',
				name: 'Status',
				sortable: true,
				width: '120px',
				cellRender: (row) => (
					<span
						className={`px-2 py-1 rounded-full text-xs ${
							row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
						}`}
					>
						{row.status}
					</span>
				),
			},
			{
				field: 'department',
				name: 'Department (Dropdown)',
				sortable: true,
				width: '180px',
				cellRender: (row) => (
					<Dropdown
						valueKey="value"
						labelKey="label"
						value={row.department}
						options={[
							{ label: 'Engineering', value: 'Engineering' },
							{ label: 'Marketing', value: 'Marketing' },
							{ label: 'Sales', value: 'Sales' },
							{ label: 'HR', value: 'HR' },
							{ label: 'Finance', value: 'Finance' },
							{ label: 'Design', value: 'Design' },
							{ label: 'Operations', value: 'Operations' },
						]}
					/>
				),
			},
			{
				field: 'joinDate',
				name: 'Join Date (DatePicker)',
				sortable: true,
				width: '130px',
				cellRender: (row) => (
					<DatePicker value={row.joinDate} onChange={logger.log} placeholder="YYYY-MM-DD" size="small" />
				),
			},
			{
				field: 'status',
				name: 'Status (Dropdown)',
				sortable: true,
				width: '140px',
				cellRender: (row) => (
					<Dropdown
						valueKey="value"
						labelKey="label"
						value={row.status}
						options={[
							{ label: 'Active', value: 'Active' },
							{ label: 'Inactive', value: 'Inactive' },
							{ label: 'Pending', value: 'Pending' },
						]}
					/>
				),
			},
			{
				field: 'department',
				name: 'Department',
				sortable: true,
				width: '150px',
				cellRender: (row) => <p>{row.department}</p>,
			},
			{
				field: 'salary',
				name: 'Salary ($)',
				sortable: true,
				width: '120px',
				cellRender: (row) => <p>${row.salary?.toLocaleString()}</p>,
			},
			{
				field: 'joinDate',
				name: 'Join Date',
				sortable: true,
				width: '130px',
				cellRender: (row) => <p>{row.joinDate}</p>,
			},
			{
				field: 'isActive',
				name: 'Active',
				sortable: true,
				width: '100px',
				cellRender: (row) => (
					<span
						className={`px-2 py-1 rounded-full text-xs ${
							row.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
						}`}
					>
						{row.isActive ? 'Yes' : 'No'}
					</span>
				),
			},
			{
				field: 'name',
				name: 'Name (Editable)',
				sortable: true,
				width: '200px',
				cellRender: (row) => <TextField value={row.name} onChange={logger.log} placeholder="Enter name" size="small" />,
			},
			{
				field: 'email',
				name: 'Email (Editable)',
				sortable: true,
				width: '250px',
				cellRender: (row) => (
					<TextField value={row.email} onChange={logger.log} placeholder="Enter email" size="small" />
				),
			},
			{
				field: 'salary',
				name: 'Salary (Editable)',
				sortable: true,
				width: '150px',
				cellRender: (row) => (
					<TextField
						value={row.salary?.toString() || ''}
						onChange={logger.log}
						placeholder="Enter salary"
						size="small"
					/>
				),
			},

			{
				field: 'weight',
				name: 'Weight (Editable)',
				sortable: true,
				width: '150px',
				cellRender: (row) => (
					<TextField
						value={row.weight?.toString() || ''}
						onChange={logger.log}
						placeholder="Enter weight"
						size="small"
					/>
				),
			},
			{
				field: 'phone',
				name: 'Phone (Editable)',
				sortable: true,
				width: '180px',
				cellRender: (row) => (
					<TextField value={row.phone} onChange={logger.log} placeholder="Enter phone" size="small" />
				),
			},
			{
				field: 'joinDate',
				name: 'Join Date (Editable)',
				sortable: true,
				width: '160px',
				cellRender: (row) => (
					<TextField value={row.joinDate} onChange={logger.log} placeholder="YYYY-MM-DD" size="small" />
				),
			},
			{
				field: 'salary',
				name: 'Salary Range',
				sortable: true,
				width: '150px',
				cellRender: (row) => (
					<span
						className={`px-2 py-1 rounded-full text-xs ${
							(row.salary || 0) >= 80000
								? 'bg-blue-100 text-blue-800'
								: (row.salary || 0) >= 70000
								? 'bg-green-100 text-green-800'
								: 'bg-yellow-100 text-yellow-800'
						}`}
					>
						${(row.salary || 0).toLocaleString()}
					</span>
				),
			},
			{
				field: 'department',
				name: 'Department Color',
				sortable: true,
				width: '160px',
				cellRender: (row) => (
					<span
						className={`px-2 py-1 rounded-full text-xs ${
							row.department === 'Engineering'
								? 'bg-purple-100 text-purple-800'
								: row.department === 'Marketing'
								? 'bg-pink-100 text-pink-800'
								: row.department === 'Sales'
								? 'bg-orange-100 text-orange-800'
								: row.department === 'HR'
								? 'bg-indigo-100 text-indigo-800'
								: row.department === 'Finance'
								? 'bg-emerald-100 text-emerald-800'
								: row.department === 'Design'
								? 'bg-rose-100 text-rose-800'
								: 'bg-gray-100 text-gray-800'
						}`}
					>
						{row.department}
					</span>
				),
			},
			{
				field: 'joinDate',
				name: 'Experience',
				sortable: true,
				width: '140px',
				cellRender: (row) => {
					const joinDate = new Date(row.joinDate || '');
					const today = new Date();
					const months = (today.getFullYear() - joinDate.getFullYear()) * 12 + (today.getMonth() - joinDate.getMonth());

					return <p>{months} months</p>;
				},
			},
			{
				field: 'weight',
				name: 'BMI Category',
				sortable: true,
				width: '130px',
				cellRender: (row) => {
					// Mock height for BMI calculation
					const height = 1.75; // 1.75 meters
					const bmi = (row.weight || 0) / (height * height);
					const category = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese';

					return (
						<span
							className={`px-2 py-1 rounded-full text-xs ${
								category === 'Normal'
									? 'bg-green-100 text-green-800'
									: category === 'Underweight'
									? 'bg-blue-100 text-blue-800'
									: category === 'Overweight'
									? 'bg-yellow-100 text-yellow-800'
									: 'bg-red-100 text-red-800'
							}`}
						>
							{category}
						</span>
					);
				},
			},
			{
				field: 'email',
				name: 'Domain',
				sortable: true,
				width: '120px',
				cellRender: (row) => {
					const domain = row.email?.split('@')[1] || '';

					return <p>{domain}</p>;
				},
			},
		],
	},
};
