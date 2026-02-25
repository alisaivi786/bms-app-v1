import { useState } from 'react';
import { ITextFieldProps } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-vite';
import { TextField } from '../../../src/components/TextField/TextField';

type ComponentType = (args: ITextFieldProps) => JSX.Element;

const storyToolTip = {
	header: 'Number of lives for SME',
	description: 'A minimum of 5 and a maximum of 150 counts are allowed to proceed with SME Health',
};

const Template: StoryFn<ComponentType> = (args) => {
	const [state, setState] = useState<string | undefined>();

	return (
		<form className="p-32">
			<div className="p-5">
				<TextField
					value={state}
					onChange={(value) => {
						setState(value);
					}}
					{...args}
				/>
			</div>
		</form>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/Inputs/Text Field',
	component: Template,
};

export default StoryMeta;

export const WithPopover = {
	args: {
		label: 'Number of Lives',
		popover: storyToolTip,
	},
};
