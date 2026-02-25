import { useState } from 'react';
import { DropdownProps } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import Button from '../../../src/components/Buttons/Button';
import { Dropdown } from '../../../src/components/Dropdown/Dropdown';
import { options } from './SampleOptions';


type ItemType = { id: string; label: string };

type ComponentType = (args: DropdownProps<ItemType, 'label', never, undefined>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [dropDownState, setDropdownState] = useState<string>();

	return (
		<div className="flex flex-col gap-4">
			<Dropdown
				{...args}
				isSearchable
				value={dropDownState}
				onChange={(val) => setDropdownState(val)}
				placeholder={args.placeholder}
				options={options}
				valueKey="id"
				labelKey="label"
				label={args.label}
				disabled={args.disabled}
				description="Test Description"
				getIsItemDisabled={(item) => {
					return item.id === '2';
				}}
				initialOptionCount={50}
			/>
			<Button
				onClick={() => {
					setDropdownState(undefined);
				}}
			>
				Reset
			</Button>
		</div>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/Inputs/Dropdown',
	component: Dropdown,
	render: Template,
};

export default StoryMeta;

export const LazyLoadDropDown: StoryObj<DropdownProps<ItemType, 'label', never, undefined>> = {
	args: { label: 'Dropdown', placeholder: 'Please select', onSearch: undefined },
};