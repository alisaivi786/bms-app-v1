import { ArrowDownIcon, SearchIcon } from '@devkit/icons/web';
import { ITextFieldProps } from '@devkit/utilities';
import { Meta } from '@storybook/react-vite';
import { TextField } from '../../../src/components/TextField/TextField';

const StoryMeta: Meta<ITextFieldProps<never>> = {
	title: 'Web/Forms/Inputs/Text Field',
	component: TextField,
	args: {
		placeholder: 'user name',
		endIcon: ArrowDownIcon,
		startIcon: SearchIcon,
		isClearable: true,
		reserveLabelSpacing: true,
	},
};

export default StoryMeta;

export const Default = { args: { label: 'User Name' } };
