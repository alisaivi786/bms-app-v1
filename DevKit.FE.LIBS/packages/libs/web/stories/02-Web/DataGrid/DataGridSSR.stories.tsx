import { Meta, StoryFn } from '@storybook/react-vite';
import { DataGrid, IDataGridProps, SortOrder } from '../../../src/components/DataGrid';
import { fetchGridSampleData, gridSampleData as sampleData } from './grid-sample-data';

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

const Template: StoryFn<ComponentType> = () => {
	const data = fetchGridSampleData;
	const searchParams = new URLSearchParams(window.location.search);
	const pageNumber = +(searchParams.get('page') ?? 1);
	const pageSize = +(searchParams.get('size') ?? 10);
	const sorting = searchParams.get('sorting') ?? 'id';
	const dir = searchParams.get('dir') === '1' ? SortOrder.Descending : SortOrder.Ascending;
	const dataPage = data.slice((pageNumber - 1) * pageSize, (pageNumber - 1) * pageSize + pageSize);

	return (
		<DataGrid
			columns={[
				{
					name: 'ID',
					field: 'id',
					sortable: true,
					frozen: 'left',
				},
				{ field: 'name', name: 'Name', sortable: true, width: '250px' },
				{
					field: 'weight',
					name: 'Person Weight',
					sortable: true,
				},
				{
					name: 'Custom Field',
					format: (val) => `${val.name}'s weight is ${val.weight?.toFixed(2)}`,
					sortable: true,
					width: '200px',
					frozen: 'right',
				},
			]}
			keyField="id"
			ssr
			data={dataPage}
			totalCount={data.length}
			defaultPagingAndSortingState={{
				paging: {
					pageNumber,
					pageSize,
				},
				sorting: { sortOrder: dir, columnName: sorting },
			}}
			onPagingAndSortingStateChanged={(state) => {
				const currentUrl = new URL(window.location.href);

				currentUrl.searchParams.set('page', state.paging.pageNumber.toString());
				currentUrl.searchParams.set('size', state.paging.pageSize.toString());
				currentUrl.searchParams.set('dir', state.sorting.sortOrder === SortOrder.Ascending ? '2' : '1');
				currentUrl.searchParams.set('sorting', state.sorting.columnName);

				window.location.href = currentUrl.toString();
			}}
		/>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Data Grid',
	component: Template,
};

export default StoryMeta;

/** This is the Basic data table */
export const SSR = {
	args: {
		...sampleData({ sortable: false, formatted: false }),
	},
};
