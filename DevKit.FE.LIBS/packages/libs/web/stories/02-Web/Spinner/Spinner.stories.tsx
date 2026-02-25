import { Meta } from '@storybook/react-vite';
import { ISpinnerProps, Spinner as SpinnerComponent } from '../../../src/components/Spinner';

const StoryMeta: Meta<ISpinnerProps> = {
	title: 'Web/Components/Spinner',
	component: SpinnerComponent,
	argTypes: {
		state: {
			options: ['success', 'danger'],
			control: {
				type: 'radio',
			},
		},
	},
};

export default StoryMeta;

export const Spinner = {
	args: {
		size: 100,
		border: 'border-8',
		borderWidth: 10,
	},
};
