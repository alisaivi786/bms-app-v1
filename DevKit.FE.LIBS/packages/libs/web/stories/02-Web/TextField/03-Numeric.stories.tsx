import { useState } from 'react';
import { INumberFieldProps } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { NumberField } from '../../../src/components/TextField/TextField';

type ComponentType = (args: INumberFieldProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [state, setState] = useState<number | undefined>();

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
				<NumberField
					value={state}
					decimalPlaces={4}
					onChange={(value) => {
						setState(value);
					}}
					directionForInput="ltr"
					{...args}
				/>
			</div>
			<div className="p-5">Value is : {state || ''}</div>
		</form>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/Inputs/Text Field',
	component: NumberField,
	render: Template,
};

export default StoryMeta;

export const Numeric: StoryObj<ComponentType> = {};
