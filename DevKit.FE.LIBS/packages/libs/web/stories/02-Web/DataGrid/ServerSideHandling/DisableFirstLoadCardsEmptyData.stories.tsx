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

export const EmptyData: StoryObj<ComponentType> = {
	args: {
		keyField: 'id',
		onFetchData: async () => {
			return {
				keyField: 'id',
				data: [],
				totalItemsCount: 0,
				onFetchData: async () => {
					return {
						data: [],
						totalItemsCount: 0,
					};
				},
				onRenderItem: ({ item }: { item: ColumnsType }) => <Card>{item.id}</Card>,
				numberOfColumns: 2,
			};
		},
		onRenderItem: ({ item }) => <Card>{item.id}</Card>,
		numberOfColumns: 2,
	},
};
