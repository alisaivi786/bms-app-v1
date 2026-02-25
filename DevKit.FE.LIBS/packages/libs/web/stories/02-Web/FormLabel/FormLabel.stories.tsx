import { Meta } from '@storybook/react-vite';
import { FormLabel as FormLabelComponent, IFormLabelProps } from '../../../src/components/FormLabel/FormLabel';

type ComponentType = (args: IFormLabelProps) => JSX.Element;

const StoryMeta: Meta<ComponentType> = {
	title: 'WEB/Forms/FormLabel',
	component: FormLabelComponent,
};

export default StoryMeta;

export const FormLabel = {
	args: {
		children: 'User Name',
		isRequired: true,
	},
};
