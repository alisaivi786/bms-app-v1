import { useRef } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { DataGrid, IDataGridProps, IDataGridRef } from '../../../src/components/DataGrid';

type ColumnsType = {
	id?: number;
	name?: string;
};
type ComponentType = (args: IDataGridProps<ColumnsType, 'id', string>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const gridRef = useRef<IDataGridRef>(null);

	return (
		<div className="flex flex-col gap-24 p-5">
			<DataGrid {...args} ref={gridRef} />
		</div>
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

export const EmptyDataComponent = {
	args: {
		keyField: 'id',
		onFetchData: async () => [],
		emptyDataMessage: (
			<div className="flex items-center justify-center w-full h-40 bg-brand-50">
				<div className="">BG</div>
			</div>
		),
		columns: [].concat(
			...new Array(15)
				.fill([
					{
						name: 'ID',
						field: 'id',
					},
					{
						field: 'name',
						name: 'Formatted Name',
					},
				])
				.concat([
					{
						name: 'Freeze Column',
						field: 'id',
						width: '30px',
						frozen: 'left',
					},
				])
		),
	},
};

export const EmptyDataString = {
	args: {
		keyField: 'id',
		onFetchData: async () => [],
		// emptyDataMessage: 'No Records',
		columns: [].concat(
			...new Array(15)
				.fill([
					{
						name: 'ID',
						field: 'id',
					},
					{
						field: 'name',
						name: 'Formatted Name',
					},
				])
				.concat([
					{
						name: 'Freeze Column',
						field: 'id',
						width: '30px',
						frozen: 'left',
					},
				])
		),
	},
};
