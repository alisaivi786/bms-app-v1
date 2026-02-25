import { useRef, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { DataGrid, IDataGridProps, IDataGridRef, IPagingAndSorting } from '../../../../src/components/DataGrid';

type ColumnsType = {
	id?: string;
	name?: string;
};
type ComponentType = (args: IDataGridProps<ColumnsType, 'id', string> & { serverSideHandling: true }) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [pagingState, setPagingState] = useState<IPagingAndSorting>();
	const gridRef = useRef<IDataGridRef>(null);

	return (
		<DataGrid
			{...args}
			ref={gridRef}
			serverSideHandling
			enableRefresh
			enableSelection
			onFetchData={async (pagingAndSortingState) => {
				return {
					data: [
						{
							id: `${pagingAndSortingState.paging.pageNumber} - 1`,
							name: 'Jane Doe',
						},
						{
							id: `${pagingAndSortingState.paging.pageNumber} - 2`,
							name: 'Ane Doe',
						},
						{
							id: `${pagingAndSortingState.paging.pageNumber} - 3`,
							name: 'Mike Doe',
						},
						{
							id: `${pagingAndSortingState.paging.pageNumber} - 4`,
							name: 'Jone Doe',
						},
						{
							id: `${pagingAndSortingState.paging.pageNumber} - 5`,
							name: 'Jane Doe',
						},
						{
							id: `${pagingAndSortingState.paging.pageNumber} - 6`,
							name: 'Jane Doe',
						},
						{
							id: `${pagingAndSortingState.paging.pageNumber} - 7`,
							name: 'Jane Doe',
						},
						{
							id: `${pagingAndSortingState.paging.pageNumber} - 8`,
							name: 'Jane Doe',
						},
						{
							id: `${pagingAndSortingState.paging.pageNumber} - 9`,
							name: 'Jane Doe',
						},
						{
							id: `${pagingAndSortingState.paging.pageNumber} - 10`,
							name: 'Jane Doe',
						},
					],
					totalItemsCount: 1000,
				};
			}}
			defaultPagingAndSortingState={pagingState}
			onPagingAndSortingStateChanged={(state: IPagingAndSorting) => {
				setPagingState(state);
			}}
		/>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Data Grid/Server Side Handling',
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

export const ServerSideHandling = {
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
	},
};
