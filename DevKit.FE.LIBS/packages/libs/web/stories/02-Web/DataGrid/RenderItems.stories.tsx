import { useRef } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Card } from '../../../src/components/Card';
import { DataGrid, IDataGridProps, IDataGridRef } from '../../../src/components/DataGrid';
import { Skeleton } from '../../../src/components/Skeleton';
import { fetchGridSampleData } from './grid-sample-data';

type ColumnsType = {
	id?: number;
};
type ComponentType = (args: IDataGridProps<ColumnsType, 'id', string>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const gridRef = useRef<IDataGridRef>(null);

	return (
		<div className="flex flex-col p-5">
			<DataGrid
				{...args}
				ref={gridRef}
				emptyDataMessage={
					<div className="flex h-40 w-full items-center justify-center bg-brand-50">
						<div className="">BG</div>
					</div>
				}
			/>
		</div>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Data Grid',
	component: Template,
};

export default StoryMeta;

export const RenderItems: StoryObj<ComponentType> = {
	args: {
		keyField: 'id',
		onFetchData: async () => fetchGridSampleData,
		onRenderItem: ({ item }) => <Card>{item.id}</Card>,
		loadingOptions: {
			renderItem: (
				<Card className="flex flex-col gap-2 ">
					<Skeleton className="h-4" />
					<Skeleton className="h-2" />
				</Card>
			),
			numberOfRows: 4,
		},
		numberOfColumns: 2,
	},
};
