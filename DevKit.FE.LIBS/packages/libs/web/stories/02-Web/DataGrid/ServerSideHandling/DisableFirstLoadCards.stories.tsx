import { useRef, useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import Button from '../../../../src/components/Buttons/Button';
import { Card } from '../../../../src/components/Card';
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
				serverSideHandling
				noDataLoadedMessage="Search for policies"
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
	argTypes: {
		tableVariant: {
			control: 'select',
			options: ['default', 'without-border'],
			defaultValue: 'default',
		},
	},
};

export default StoryMeta;

export const DisableFirstLoadCards: StoryObj<ComponentType> = {
	args: {
		keyField: 'id',
		onFetchData: async (pagingAndSortingState) => {
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
		},
		onRenderItem: ({ item }) => <Card>{item.id}</Card>,
		numberOfColumns: 2,
	},
};
