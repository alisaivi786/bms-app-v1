import { useState } from 'react';
import UserIcon from '@devkit/icons/web/UserIcon';
import { DropdownProps } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-vite';
import Button from '../../../src/components/Buttons/Button';
import { Dropdown } from '../../../src/components/Dropdown/Dropdown';

type ItemType = { id: string; label: string; countryCode: number };

type ComponentType = (args: DropdownProps<ItemType, 'label', never, undefined>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [dropDownState, setDropdownState] = useState<string>();
	const options = [
		{ id: '0', label: 'Afghanistan', countryCode: 93 },
		{ id: '1', label: 'Albania', countryCode: 355 },
		{ id: '2', label: 'Algeria', countryCode: 213 },
		{ id: '3', label: 'American Samoa', countryCode: 1684 },
		{ id: '4', label: 'Angola', countryCode: 244 },
		{ id: '5', label: 'United Arab Emirates', countryCode: 971 },
		{ id: '6', label: 'United Kingdom', countryCode: 44 },
		{ id: '7', label: 'United States', countryCode: 1 },
		{ id: '8', label: 'Uruguay', countryCode: 598 },
		{ id: '9', label: 'Australia', countryCode: 61 },
		{ id: '10', label: 'Brazil', countryCode: 55 },
		{ id: '11', label: 'Canada', countryCode: 1 },
		{ id: '12', label: 'China', countryCode: 86 },
		{ id: '13', label: 'France', countryCode: 33 },
		{ id: '14', label: 'Germany', countryCode: 49 },
	];

	return (
		<>
			<div className="p-5">
				<Dropdown
					{...args}
					onSearch={(searchText, option) => {
						return option?.label.toLowerCase().includes(searchText.toLowerCase());
					}}
					options={options}
					value={dropDownState}
					onChange={(val) => setDropdownState(val)}
					valueKey="id"
					labelKey="label"
					renderItem={(val) => (
						<div className="flex gap-3 justify-between items-center">
							<div className="flex gap-2 ">
								<UserIcon />
								<div className="text-paragraph">{val?.label}</div>
							</div>
							<div className="text-paragraph">{`+${val?.countryCode}`}</div>
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

export const CustomRender = {
	args: {
		label: 'Insurer Company',
		isRequired: true,
		placeholder: 'Please select',
	},
};
