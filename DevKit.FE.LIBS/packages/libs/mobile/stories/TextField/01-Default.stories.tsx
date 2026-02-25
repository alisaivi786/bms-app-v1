import { ArrowDownIcon, SearchIcon } from '@devkit/icons/native';
import { ITextFieldProps, logger } from '@devkit/utilities';
import { Meta } from '@storybook/react-webpack5';
import { TextField } from '../../src/components/TextField/TextField';

const StoryMeta: Meta<ITextFieldProps<never>> = {
	title: 'Mobile/Forms/Inputs/Text Field',
	component: TextField,
	args: {
		endIcon: ArrowDownIcon,
		startIcon: SearchIcon,
		isClearable: true,
		reserveLabelSpacing: true,
		size: 'medium',
		onChange(value) {
			logger.log('The new value from default is: ', value);
		},
		mask: '',
		maskReverse: false,
		disabled: false,
	},
	argTypes: {
		size: {
			name: 'Size',
			control: 'select',
			options: ['small', 'medium', 'large'],
		},
	},
};

export default StoryMeta;

export const Default = { args: { label: 'User Name', placeholder: 'User Name' } };
