import { useState } from 'react';
import { ITextFieldProps } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-vite';
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
					{...args}
					value={state}
					onChange={(value) => {
						setState(value);
					}}
				/>
			</div>
			<div className="p-5">Value is : {state || ''}</div>
		</form>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/Inputs/Text Field',
	component: TextField,

	render: Template,
};

export default StoryMeta;

export const TextArea = {
	args: { label: 'User Name', type: 'text-area', },
};

export const TextAreaWithDescription = {
	args: { label: 'User Name', type: 'text-area', maxLength: 200, showCharactersCounter: true},
};

export const TextAreaWithError = {
	args: {
		label: 'User Name',
		type: 'text-area',
		errors: 'This field is required',
		maxLength: 200,
		showCharactersCounter: true,
	},
};
