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
			}}
		>
			<div className="p-5">
				<TextField
					value={state}
					onChange={(value) => {
						setState(value);
					}}
					onPaste={(value: string) => {
						const pastedValue = value.replace(/-|\s/g, '');
						const finalValue = pastedValue.startsWith('784') ? pastedValue.substring(3) : pastedValue;

						return finalValue;
					}}
					{...args}
				/>
			</div>
			<div className="p-5">Value is : {state ? `784${state}` : ''}</div>
		</form>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/Inputs/Text Field',
	component: Template,
};

export default StoryMeta;

export const EmiratesId = {
	args: {
		label: 'Emirates Id',
		type: 'text',
		suffix: '784 -',
		placeholder: '1990 - 1234567 - 8',
		mask: '9999 - 9999999 - 9',
		inputMode: 'numeric',
	},
};
