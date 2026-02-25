import { useState } from 'react';
import { SearchIcon } from '@devkit/icons/web';
import { ITextFieldProps } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-vite';
import ResetButton from '../../../src/components/Buttons/ResetButton';
import SubmitButton from '../../../src/components/Buttons/SubmitButton';
import { TextField } from '../../../src/components/TextField/TextField';

type ComponentType = (args: ITextFieldProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [state, setState] = useState<string | undefined>();

	return (
		<form
			onReset={() => {
				setState(undefined);
			}}
			onSubmit={(e) => {
				e.preventDefault();
				alert('form submit');
			}}
		>
			<div className="p-5">
				<TextField
					value={state}
					onChange={(value) => {
						setState(value);
					}}
					startIcon={SearchIcon}
					endIcon={SearchIcon}
					{...args}
				/>
			</div>
			<div className="p-5">Value is : {state || ''}</div>
			<div className="p-5">
				<ResetButton>Reset</ResetButton>
			</div>
			<div className="p-5">
				<SubmitButton>Submit</SubmitButton>
			</div>
		</form>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/Inputs/Text Field',
	component: Template,
};

export default StoryMeta;

export const WithIcon = {
	args: {
		label: 'Company',
		placeholder: 'Search insurer company',
	},
};
