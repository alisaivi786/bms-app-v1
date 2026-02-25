import { useState } from 'react';
import * as Yup from 'yup';
import { DropdownProps, useReactForm } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-vite';
import Button from '../../../src/components/Buttons/Button';
import { Dropdown } from '../../../src/components/Dropdown/Dropdown';

type ItemType = { id: string; label: string };

type ComponentType = (args: DropdownProps<ItemType, 'label', never, undefined>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const validation = Yup.object().shape({
		name: Yup.string().required(),
	});

	const reactForm = useReactForm<{ name?: string }>({
		initialValues: {},
		validation: validation,
		onFormSubmit: (values) => {
			alert(values.name);
		},
	});
	const [dropDownState, setDropdownState] = useState<string>();
	const options = [
		{ id: '0', label: 'Inpatient' },
		{ id: '1', label: 'Dental' },
		{ id: '2', label: 'Outpatient' },
		{ id: '3', label: 'Inpatient2' },
		{ id: '4', label: 'Dental2' },
		{ id: '5', label: 'Outpatient2' },
	];

	return (
		<>
			<div className="p-5">
				<Dropdown
					{...args}
					onSearch={(searchText, option) => {
						return option?.label?.toLowerCase().includes(searchText.toLowerCase());
					}}
					value={dropDownState}
					onChange={(val) => {
						setDropdownState(val);
					}}
					getIsItemDisabled={(item) => {
						return item.label === 'Inpatient';
					}}
					placeholder="Search insurer company"
					options={options}
					valueKey="id"
					labelKey="label"
					label={args.label}
					isClearable={true}
					disabled={false}
					isSearchable={true}
				/>
			</div>
			<div className="p-5">
				<Button
					onClick={() => {
						reactForm.resetForm();
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

export const ReactForm = { args: { label: 'Dropdown' } };
