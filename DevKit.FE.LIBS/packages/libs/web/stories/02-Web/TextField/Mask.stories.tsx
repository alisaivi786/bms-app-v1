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
	component: Template,
};

export default StoryMeta;

export const Mask = {
	args: {
		label: 'User Name',
		type: 'text',
		suffix: '+971',
		isRequired: true,
		mask: '99 999 9999',
	},
};
