import { useState } from 'react';
import { UserIcon } from '@devkit/icons/web';
import { DropdownProps } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-vite';
import Button from '../../../src/components/Buttons/Button';
import { Dropdown } from '../../../src/components/Dropdown';

type ItemType = { id: string; label: string };

type ComponentType = (args: DropdownProps<ItemType, 'label', never, undefined>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const options = [
		{ id: '0', label: 'Inpatient' },
		{ id: '1', label: 'Dental' },
		{ id: '2', label: 'Outpatient' },
		{ id: '3', label: 'Inpatient2' },
		{ id: '4', label: 'Dental2' },
		{ id: '5', label: 'Outpatient2' },
	];
	const [dropDownState, setDropdownState] = useState<string | undefined>(options[0].id);

	return (
		<>
			<div className="p-5">
				<Dropdown
					{...args}
					value={dropDownState}
					onChange={(val) => setDropdownState(val)}
					placeholder={args.placeholder}
					options={options}
					valueKey="id"
					labelKey="label"
					label={args.label}
					renderItem={(val) => (
						<div className="flex gap-3 justify-between items-center">
							<div className="flex gap-2 ">
								<UserIcon />
								<div className="text-paragraph">{val?.label}</div>
							</div>
						</div>
					)}
					renderSelectedItem={(val) => (
						<div className="flex gap-3 justify-between items-center">
							<UserIcon />
							{val?.label}
						</div>
					)}
				/>
			</div>
			<div className="p-5">
				<Button
					onClick={() => {
						setDropdownState(undefined);
					}}
				>
					Reset
				</Button>
			</div>
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/Inputs/Dropdown',
	component: Dropdown,
	render: Template,
};

export default StoryMeta;

export const DisabledDropdown = {
	args: { label: 'Dropdown', placeholder: 'Please select', onSearch: undefined, disabled: true },
};
