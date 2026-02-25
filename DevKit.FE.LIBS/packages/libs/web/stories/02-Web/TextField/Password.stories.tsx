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
					value={state}
					onChange={(value) => {
						setState(value);
					}}
					{...args}
				/>
			</div>
			<div className="p-5">Value is : {state || ''}</div>
		</form>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/Inputs/Text Field',
	component: Template,
};

export default StoryMeta;

export const Password = { args: { label: 'Password', type: 'password' } };

export const PasswordDisabled = {
	args: { label: 'Password', type: 'password', placeholder: 'Enter Your Password', disabled: true },
};
