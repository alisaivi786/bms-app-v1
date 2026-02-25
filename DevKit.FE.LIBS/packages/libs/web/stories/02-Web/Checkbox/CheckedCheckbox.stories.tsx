import { useState } from 'react';
import { CheckBoxFieldProps } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '../../../src/components/Checkbox';

type ComponentType = (args: CheckBoxFieldProps<never>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [checked, setChecked] = useState<boolean>(true);

	return (
		<>
			<Checkbox
				{...args}
				isChecked={checked}
				onChange={(checked) => {
					setChecked(checked);
				}}
			/>
			<p className="pt-4">Status: {`${checked}`}</p>
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'WEB/Forms/Checkbox',
	component: Checkbox,
};

export default StoryMeta;

export const CheckedCheckbox: StoryObj<ComponentType> = {
	render: Template,
	args: { label: 'Sukoon Insurance', highlighted: false },
};
