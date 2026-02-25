import { useRef, useState } from 'react';
import { CloseIcon, EditPencilIcon } from '@devkit/icons/web';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Button } from '../../../src/components/Buttons';
import { DataGrid, IDataGridProps, IDataGridRef } from '../../../src/components/DataGrid';
import { useResponsiveView } from '../../../src/hooks/useResponsiveView';
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
	const { sm } = useResponsiveView();

	const desktopActionColumn = (
		<div className="flex items-center gap-2">
			<div className="cursor-pointer">
				<EditPencilIcon />
			</div>
			<div>
				<div className="p-1 bg-black rounded-full cursor-pointer">
					<CloseIcon className="text-white" />
				</div>
			</div>
		</div>
	);
	const mobileActionColumn = (
		<div className="flex flex-col items-center gap-2">
			<Button layoutClassName="w-full">Edit vehicle</Button>
			<Button layoutClassName="w-full">Delete vehicle</Button>
		</div>
	);

	return (
		<div className="flex flex-col gap-5">
			<DataGrid
				{...args}
				ref={gridRef}
				mobileResponsiveModalTitle="Vehicle details"
				onMobileResponsiveHeaderRender={() => <div>Header</div>}
				onMobileResponsiveRender={({ item }) => <div className="w-full h-full">Injected Custom component{item.id}</div>}
				onSelectedRowsChange={(rows) => setSelectedRows(JSON.stringify(rows))}
				extraActions={() => <Button layoutClassName={['w-full', 'md:w-auto']}>Download</Button>}
				emptyDataMessage={
					<div className="flex items-center justify-center w-full h-40 bg-brand-50">
						<div className="">BG</div>
					</div>
				}
				columns={[
					{
						name: 'info',
						isAction: true,
						frozen: 'right',
						width: '50px',
						cellRender: () => {
							if (sm) return mobileActionColumn;

							return desktopActionColumn;
						},
					},
					{
						name: 'ID',
						field: 'id',
						hidden: false,
						popover: { header: 'test header', description: 'test desc' },
						width: '170px',
					},
					{
						field: 'id',
						name: 'Cell Render',
						cellRender: (row) => <div className="text-yellow-500">{row.id}</div>,
					},
					{ field: 'name', name: 'Name' },
					{ field: 'name', name: 'formatted name', format: (row) => `${row.name?.split(' ')[0]} ${row.id}` },
				]}
			/>

			{selectedRows}
			<div>
				<Button
					onClick={() => {
						gridRef.current?.removeSelection();
					}}
				>
					Reset Selection
				</Button>
			</div>
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

export const MobileResponsive: StoryObj<ComponentType> = {
	args: {
		keyField: 'id',
		hidePaging: false,
		enableSelection: true,
		hideMobileResponsiveDetailsArrow: false,
		onFetchData: async () => fetchGridSampleData,
		// eslint-disable-next-line no-console
		onExport: async () => await console.log('object'),
		enableRefresh: true,
	},
};
