import { Meta, StoryFn } from '@storybook/react-vite';
import { IPopoverProps, Popover as PopoverComponent } from '../../../src/components/Popover';

type ComponentType = (args: IPopoverProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	return <PopoverComponent {...args} />;
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/Popover',
	component: PopoverComponent,
	render: Template,
	parameters: {},
};

export default StoryMeta;

export const PopoverWithHover = {
	args: {
		variant: 'dark',
		persistOnClick: true,
		content: {
			header: 'Title',
			description:
				'GCC specifications means there are no after market modifications and the car has not been privately imported from other countries',
		},
	},
};
