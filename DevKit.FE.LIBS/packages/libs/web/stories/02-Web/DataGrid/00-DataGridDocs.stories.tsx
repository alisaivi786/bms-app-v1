import { Meta, StoryFn } from '@storybook/react-vite';
import { DataGridComponent, IDataGridProps } from '../../../src/components/DataGrid';

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
	return <>Story To Render Doc Props</>;
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Data Grid',
	component: DataGridComponent,
	render: Template,
};

export default StoryMeta;

/** This is the Props data table */
export const Props = {};
