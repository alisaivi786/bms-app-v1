import { DropdownProps } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-vite';
import { Dropdown } from '../../../src/components/Dropdown/Dropdown';

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

	return (
		<>
			<div className="p-5">
				<Dropdown
					{...args}
					onSearch={(searchText, option) => {
						return option?.label?.toLowerCase().includes(searchText.toLowerCase());
					}}
					value={'0' as string}
					placeholder="Search insurer company"
					options={options}
					valueKey="id"
					labelKey="label"
					label={args.label}
					status="edited"
					disabled
				/>
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

export const Edited = { args: { label: 'Edited Field', status: 'edited' } };
