import { useRef, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { DataGrid, IDataGridProps, IDataGridRef, IPagingAndSorting, SortOrder } from '../../../src/components/DataGrid';
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
	const [pagingState, setPagingState] = useState<IPagingAndSorting>();
	const gridRef = useRef<IDataGridRef>(null);

	return (
		<DataGrid
			{...args}
			ref={gridRef}
			defaultPagingAndSortingState={pagingState}
			onPagingAndSortingStateChanged={(state) => {
				setPagingState(state);
			}}
			onSort={(column: string, sortOrder: SortOrder) => {
				alert(`'${column}' need sort with order ${sortOrder}`);
			}}
		/>
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

export const SortIdentifier = {
	args: {
		keyField: 'id',
		columns: [
			{
				name: 'ID',
				field: 'id',
				hidden: false,
				width: '600px',
				sortIdentifier: 'userIdField',
				sortable: true,
			},
			{ field: 'name', name: 'Name', sortable: true, width: '1000px' },
		],
		onFetchData: async () => fetchGridSampleData,
	},
};
