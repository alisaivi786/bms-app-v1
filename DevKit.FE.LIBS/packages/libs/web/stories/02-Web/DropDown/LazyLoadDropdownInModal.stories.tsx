import { useState } from 'react';
import { DropdownProps } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Button } from '../../../src/components/Buttons';
import { BottomSheet as ModalBottomSheet } from '../../../src/components/DialogModal';
import { Dropdown } from '../../../src/components/Dropdown/Dropdown';
import { TextField } from '../../../src/components/TextField/TextField';
import { options } from './SampleOptions';


type ItemType = { id: string; label: string };

type ComponentType = (args: DropdownProps<ItemType, 'label', never, undefined>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState<{
		name?: string;
		email?: string;
		phone?: string;
		address?: string;
		city?: string;
		zipCode?: string;
		country?: string;
		selectedOption?: string;
		selectedCategory?: string;
		selectedRegion?: string;
		selectedDepartment?: string;
		selectedStatus?: string;
		selectedPriority?: string;
		selectedType?: string;
		selectedLanguage?: string;
		additionalNotes?: string;
		companyName?: string;
		jobTitle?: string;
	}>({});

	return (
		<>
			<div className="p-5">
				<Button onClick={() => setIsModalOpen(true)}>Open Form Modal</Button>
			</div>

			<ModalBottomSheet
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Form with LazyLoad Dropdown"
				variant="large"
				hasCloseICon
				hasDivider
			>
				<div className="flex flex-col gap-6 p-5">
					<div className="flex flex-col gap-4">
						<TextField
							label="Name"
							placeholder="Enter your name"
							value={formData.name}
							onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
						/>

						<TextField
							label="Email"
							placeholder="Enter your email"
							value={formData.email}
							onChange={(value) => setFormData((prev) => ({ ...prev, email: value }))}
						/>

						<TextField
							label="Phone"
							placeholder="Enter your phone number"
							value={formData.phone}
							onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
						/>

						<TextField
							label="Address"
							placeholder="Enter your address"
							value={formData.address}
							onChange={(value) => setFormData((prev) => ({ ...prev, address: value }))}
						/>

						<div className="grid grid-cols-2 gap-4">
							<TextField
								label="City"
								placeholder="Enter your city"
								value={formData.city}
								onChange={(value) => setFormData((prev) => ({ ...prev, city: value }))}
							/>

							<TextField
								label="Zip Code"
								placeholder="Enter zip code"
								value={formData.zipCode}
								onChange={(value) => setFormData((prev) => ({ ...prev, zipCode: value }))}
							/>
						</div>

						<TextField
							label="Country"
							placeholder="Enter your country"
							value={formData.country}
							onChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
						/>

						<Dropdown
							{...args}
							isSearchable
							value={formData.selectedCategory}
							onChange={(val) => setFormData((prev) => ({ ...prev, selectedCategory: val }))}
							placeholder="Please select a category"
							options={options}
							valueKey="id"
							labelKey="label"
							label="Category"
							disabled={args.disabled}
							initialOptionCount={50}
						/>
					</div>

					<div className="mt-4 p-4 bg-gray-100 rounded">
						<div className="text-sm font-semibold mb-2">Form Values:</div>
						<pre className="text-xs overflow-auto">{JSON.stringify(formData, null, 2)}</pre>
					</div>
				</div>
			</ModalBottomSheet>
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/Inputs/Dropdown',
	component: Dropdown,
	render: Template,
};

export default StoryMeta;

export const LazyLoadDropDownInModal: StoryObj<DropdownProps<ItemType, 'label', never, undefined>> = {
	args: {
		label: 'Dropdown',
		placeholder: 'Please select',
		onSearch: undefined,
	},
};