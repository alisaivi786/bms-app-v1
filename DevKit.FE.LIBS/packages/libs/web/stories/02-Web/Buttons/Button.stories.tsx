import { PlusIcon } from '@devkit/icons/web';
import { Meta, StoryObj } from '@storybook/react-vite';
import ButtonComponent from '../../../src/components/Buttons/Button';

type ComponentType = typeof ButtonComponent;

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/Button',
	component: ButtonComponent,
	args: {
		children: 'Button',
	},
	argTypes: {
		variant: { control: 'select' },
		state: {
			options: ['success', 'danger'],
			control: {
				type: 'radio',
			},
		},
	},
};

export default StoryMeta;

export const Default: StoryObj<ComponentType> = {
	args: {
		children: 'Button label',
	},
};

export const WithIconStart: StoryObj<ComponentType> = {
	args: {
		children: 'Button label',
		iconStart: PlusIcon,
	},
};

export const WithIconEnd: StoryObj<ComponentType> = {
	args: {
		children: 'Button label',
		iconEnd: PlusIcon,
	},
};

export const WithBothIcons: StoryObj<ComponentType> = {
	args: {
		children: 'Button label',
		iconStart: PlusIcon,
		iconEnd: PlusIcon,
	},
};

Default.parameters = {
	jest: 'Button.spec.tsx',
};
