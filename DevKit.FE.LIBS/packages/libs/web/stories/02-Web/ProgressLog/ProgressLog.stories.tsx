import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { ProgressLog, ProgressLogProps } from '../../../src/components/ProgressLog';

const items = [
	{
		title: 'Step1',
		description: 'Some desc text 1',
	},
	{
		title: 'Step 2',
		description:
			'Some desc text 2 Some desc text 2 Some desc text 2Some desc text 2Some desc text 2Some desc text 2Some desc text 2',
	},
	{
		title: 'Step 3 with some long title Step 3 with some long title',
		description:
			'Some desc text 2 Some desc text 2 Some desc text 2Some desc text 2Some desc text 2Some desc text 2Some desc text 2',
		color: '#fbab0b',
	},
	{
		title: 'Step 4',
		description:
			'Some desc text 2 Some desc text 2 Some desc text 2Some desc text 2Some desc text 2Some desc text 2Some desc text 2',
		color: '#f65f4e',
	},
	{
		title: 'Step 5',
		color: 'green',
	},
];

type ComponentType = (args: ProgressLogProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	return <ProgressLog {...args} />;
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/ProgressLog',
	render: Template,
	argTypes: {
		items: items,
		// minWidth: '300px',
	},
};

export const Default: StoryObj<ComponentType> = {
	args: {
		items: items,
		minWidth: '300px',
	},
};

export default StoryMeta;
