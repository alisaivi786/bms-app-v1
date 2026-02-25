import { useRef, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import Button from '../../../../src/components/Buttons/Button';
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
		<>
			<DataGrid
				{...args}
				ref={gridRef}
				keyField="id"
				serverSideHandling
				noDataLoadedMessage="Search for policies"
				onFetchData={async (pagingAndSortingState) => {
					// eslint-disable-next-line no-console
					console.log('onFetch is called');

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
				noFetchOnPageLoad
				defaultPagingAndSortingState={pagingState}
				onPagingAndSortingStateChanged={(state) => {
					setPagingState(state);
				}}
			/>
			<Button
				onClick={async () => {
					await gridRef.current?.refetchData();
				}}
			>
				Load Grid Data
			</Button>
			<Button
				onClick={async () => {
					await gridRef.current?.resetData();
				}}
			>
				Reset Grid Data
			</Button>
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Data Grid/Server Side Handling',
	component: Template,
};

export default StoryMeta;

export const DisableFirstLoad = {
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
