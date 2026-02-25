import { PlusIcon } from '@devkit/icons/web';
import { Meta, StoryObj } from '@storybook/react-vite';
import ButtonComponent from '../../../src/components/Buttons/Button';

type ComponentType = typeof ButtonComponent;

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/Button',
	component: ButtonComponent,
	args: {
		children: 'Button label',
	},
	argTypes: {
		variant: { control: 'select', options: ['iconPrimary', 'iconSecondary', 'iconText'] },
		state: {
			options: ['success', 'danger'],
			control: {
				type: 'radio',
			},
		},
	},
};

export default StoryMeta;

export const Icon: StoryObj<ComponentType> = {
	args: {
		variant: 'iconPrimary',
		size: 'xSmall',
		icon: PlusIcon,
	},
};

Icon.parameters = {
	jest: 'Button.spec.tsx',
};
