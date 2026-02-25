import { useRef, useState } from 'react';
import ErrorIcon from '@devkit/icons/web/ErrorIcon';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Button } from '../../../src/components/Buttons';
import { DataGrid, IDataGridProps, IDataGridRef } from '../../../src/components/DataGrid';
import { fetchGridSampleData } from './grid-sample-data';

type ColumnsType = {
	id?: number;
	name?: string;
	hidden?: boolean;
};
type ComponentType = (
	args: IDataGridProps<ColumnsType, 'id', string> & {
		columns: ColumnsType;
	}
) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [selectedRows, setSelectedRows] = useState('');
	const gridRef = useRef<IDataGridRef>(null);

	return (
		<>
			<DataGrid
				{...args}
				ref={gridRef}
				onSelectedRowsChange={(rows) => setSelectedRows(JSON.stringify(rows))}
				emptyDataMessage={
					<div className="flex h-40 w-full items-center justify-center bg-brand-50">
						<div className="">BG</div>
					</div>
				}
			/>

			{selectedRows}
			<Button
				onClick={() => {
					gridRef.current?.removeSelection();
				}}
			>
				Reset Selection
			</Button>
		</>
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

export const SelectableRows: StoryObj<ComponentType> = {
	args: {
		keyField: 'id',
		columns: [
			{
				name: 'Pinned Column',
				pinned: true,
				cellRender: (row) => (row.id === 1 ? <ErrorIcon /> : null),
			},
			{
				name: 'ID',
				field: 'id',
				hidden: false,
				popover: { header: 'test header', description: 'test desc' },
				width: '170px',
			},
			{ field: 'name', name: 'Name' },
		],
		hidePaging: false,
		onFetchData: async () => fetchGridSampleData,
		enableSelection: true,
		getSelectPageText: (count: number, isUnselect: boolean) =>
			isUnselect ? (
				<>
					Unselect <p className="font-bold">&nbsp;{count}&nbsp;</p> Members on this page
				</>
			) : (
				<>
					Select <p className="font-bold">&nbsp;{count}&nbsp;</p> Members on this page
				</>
			),
		getSelectAllText: (count: number, isUnselect: boolean) =>
			isUnselect ? (
				<>
					Unselect all <p className="font-bold">&nbsp;{count}&nbsp;</p> Members
				</>
			) : (
				<>
					Select all <p className="font-bold">&nbsp;{count}&nbsp;</p> Members
				</>
			),
	},
};
