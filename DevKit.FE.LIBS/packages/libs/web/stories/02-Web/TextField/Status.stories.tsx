import { ITextFieldProps } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-vite';
import { TextField } from '../../../src/components/TextField/TextField';

type ComponentType = (args: ITextFieldProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	return (
		<div className="p-5">
			<TextField status="edited" readOnly value="test" {...args} />
		</div>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/Inputs/Text Field',
	component: Template,
};

export default StoryMeta;

export const Edited = {
	args: {
		label: 'User Name',
		type: 'text',
		status: 'edited',
		readOnly: true,
		value: 'test',
	},
};
