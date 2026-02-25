import React, { useState } from 'react';
import { View } from 'react-native';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { Button } from '../../src/components/Buttons';
import {
	MultiSelectDropdown,
	MultiSelectDropdownMobileProps,
} from '../../src/components/MultiSelectDropdown/MultiSelectDropdown';

type ItemType = { id: string; label: string; group?: string };

type ComponentType = (args: MultiSelectDropdownMobileProps<ItemType, 'id', never, 'group'>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [selectedValues, setSelectedValues] = useState<string[]>([]);
	const options: ItemType[] = [
		// Healthcare Services
		{ id: '1', label: 'Emergency Room', group: 'Emergency' },
		{ id: '2', label: 'Urgent Care', group: 'Emergency' },
		{ id: '3', label: 'Trauma Center', group: 'Emergency' },
		{ id: '4', label: 'Critical Care Unit', group: 'Emergency' },

		// Inpatient Services
		{ id: '5', label: 'General Surgery', group: 'Inpatient' },
		{ id: '6', label: 'Cardiac Surgery', group: 'Inpatient' },
		{ id: '7', label: 'Neurosurgery', group: 'Inpatient' },
		{ id: '8', label: 'Orthopedic Surgery', group: 'Inpatient' },
		{ id: '9', label: 'Intensive Care Unit', group: 'Inpatient' },
		{ id: '10', label: 'Maternity Ward', group: 'Inpatient' },
		{ id: '11', label: 'Pediatric Ward', group: 'Inpatient' },
		{ id: '12', label: 'Oncology Unit', group: 'Inpatient' },

		// Outpatient Services
		{ id: '13', label: 'Family Medicine', group: 'Outpatient' },
		{ id: '14', label: 'Internal Medicine', group: 'Outpatient' },
		{ id: '15', label: 'Pediatrics', group: 'Outpatient' },
		{ id: '16', label: 'Dermatology', group: 'Outpatient' },
		{ id: '17', label: 'Cardiology', group: 'Outpatient' },
		{ id: '18', label: 'Neurology', group: 'Outpatient' },
		{ id: '19', label: 'Endocrinology', group: 'Outpatient' },
		{ id: '20', label: 'Gastroenterology', group: 'Outpatient' },
		{ id: '21', label: 'Pulmonology', group: 'Outpatient' },
		{ id: '22', label: 'Rheumatology', group: 'Outpatient' },
		{ id: '23', label: 'Oncology Consultation', group: 'Outpatient' },
		{ id: '24', label: 'Pain Management', group: 'Outpatient' },

		// Dental Services
		{ id: '25', label: 'General Dentistry', group: 'Dental' },
		{ id: '26', label: 'Oral Surgery', group: 'Dental' },
		{ id: '27', label: 'Orthodontics', group: 'Dental' },
		{ id: '28', label: 'Periodontics', group: 'Dental' },
		{ id: '29', label: 'Endodontics', group: 'Dental' },
		{ id: '30', label: 'Prosthodontics', group: 'Dental' },
		{ id: '31', label: 'Pediatric Dentistry', group: 'Dental' },
		{ id: '32', label: 'Cosmetic Dentistry', group: 'Dental' },

		// Mental Health Services
		{ id: '33', label: 'Psychiatry', group: 'Mental Health' },
		{ id: '34', label: 'Psychology', group: 'Mental Health' },
		{ id: '35', label: 'Addiction Treatment', group: 'Mental Health' },
		{ id: '36', label: 'Behavioral Therapy', group: 'Mental Health' },
		{ id: '37', label: 'Group Therapy', group: 'Mental Health' },
		{ id: '38', label: 'Crisis Intervention', group: 'Mental Health' },

		// Diagnostic Services
		{ id: '39', label: 'X-Ray Imaging', group: 'Diagnostics' },
		{ id: '40', label: 'MRI Scan', group: 'Diagnostics' },
		{ id: '41', label: 'CT Scan', group: 'Diagnostics' },
		{ id: '42', label: 'Ultrasound', group: 'Diagnostics' },
		{ id: '43', label: 'PET Scan', group: 'Diagnostics' },
		{ id: '44', label: 'Blood Work', group: 'Diagnostics' },
		{ id: '45', label: 'Mammography', group: 'Diagnostics' },
		{ id: '46', label: 'Bone Density Scan', group: 'Diagnostics' },
		{ id: '47', label: 'Echocardiogram', group: 'Diagnostics' },
		{ id: '48', label: 'EKG/ECG', group: 'Diagnostics' },

		// Rehabilitation Services
		{ id: '49', label: 'Physical Therapy', group: 'Rehabilitation' },
		{ id: '50', label: 'Occupational Therapy', group: 'Rehabilitation' },
		{ id: '51', label: 'Speech Therapy', group: 'Rehabilitation' },
		{ id: '52', label: 'Cardiac Rehabilitation', group: 'Rehabilitation' },
		{ id: '53', label: 'Stroke Recovery', group: 'Rehabilitation' },
		{ id: '54', label: 'Sports Medicine', group: 'Rehabilitation' },

		// Specialized Services
		{ id: '57', label: 'Geriatric Care', group: 'Specialized' },
		{ id: '58', label: 'Fertility Treatment', group: 'Specialized' },
		{ id: '59', label: 'Weight Management', group: 'Specialized' },
		{ id: '60', label: 'Sleep Medicine', group: 'Specialized' },
		{ id: '61', label: 'Allergy Testing', group: 'Specialized' },
		{ id: '62', label: 'Immunology', group: 'Specialized' },

		// Surgical Specialties
		{ id: '63', label: 'Plastic Surgery', group: 'Surgery' },
		{ id: '64', label: 'Vascular Surgery', group: 'Surgery' },
		{ id: '65', label: 'Thoracic Surgery', group: 'Surgery' },
		{ id: '66', label: 'Urological Surgery', group: 'Surgery' },
		{ id: '67', label: 'Gynecological Surgery', group: 'Surgery' },
		{ id: '68', label: 'Ophthalmic Surgery', group: 'Surgery' },
		{ id: '69', label: 'ENT Surgery', group: 'Surgery' },
		{ id: '70', label: 'Bariatric Surgery', group: 'Surgery' },

		// Preventive Care
		{ id: '71', label: 'Annual Physical', group: 'Preventive' },
		{ id: '72', label: 'Vaccinations', group: 'Preventive' },
		{ id: '73', label: 'Health Screening', group: 'Preventive' },
		{ id: '74', label: 'Cancer Screening', group: 'Preventive' },
		{ id: '75', label: 'Wellness Check', group: 'Preventive' },
		{ id: '76', label: 'Nutrition Counseling', group: 'Preventive' },

		// Telehealth Services
		{ id: '77', label: 'Virtual Consultation', group: 'Telehealth' },
		{ id: '78', label: 'Remote Monitoring', group: 'Telehealth' },
		{ id: '79', label: 'Online Therapy', group: 'Telehealth' },
		{ id: '80', label: 'Digital Health Coaching', group: 'Telehealth' },
	];

	return (
		<View>
			<MultiSelectDropdown
				{...args}
				options={options}
				enableSelectAll={true}
				labelKey="label"
				valueKey="id"
				value={selectedValues}
				placeholder="Select options"
				onChange={(values) => {
					setSelectedValues(values || []);
				}}
				onClearValue={() => setSelectedValues([])}
			/>
			<View style={{ padding: 20 }}>
				<Button
					onPress={() => {
						setSelectedValues([]);
					}}
				>
					Reset
				</Button>
			</View>
		</View>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Forms/Inputs/MultiSelectDropdown',
	render: Template,
};

export default StoryMeta;

export const Default: StoryObj<MultiSelectDropdownMobileProps<ItemType, 'id', never, 'group'>> = {
	args: {
		label: 'Multi-Select Dropdown',
		placeholder: 'Please select options',
		isSearchable: true,
		directChange: false,
		selectAllText: 'Select All',
	},
};

export const DirectChange: StoryObj<MultiSelectDropdownMobileProps<ItemType, 'id', never, 'group'>> = {
	args: {
		label: 'Multi-Select Dropdown (Direct Change)',
		placeholder: 'Please select options',
		isSearchable: true,
		bottomSheetTitle: 'Select Options',
		bottomSheetCloseButton: true,
		directChange: true,
		selectAllText: 'Select All',
	},
};

export const DisabledOptions: StoryObj<MultiSelectDropdownMobileProps<ItemType, 'id', never, 'group'>> = {
	args: {
		label: 'Multi-Select Dropdown with Disabled Options',
		placeholder: 'Please select options',
		isSearchable: true,
		bottomSheetTitle: 'Select Options',
		bottomSheetCloseButton: true,
		directChange: false,
		selectAllText: 'Select All',
		getIsItemDisabled: (item) =>
			// Disable some emergency services and high-cost procedures
			['1', '2', '3', '4', '41', '42', '43', '70'].includes(item.id),
	},
};

export const GroupedOptions: StoryObj<MultiSelectDropdownMobileProps<ItemType, 'id', never, 'group'>> = {
	args: {
		label: 'Multi-Select Dropdown with Grouped Options',
		placeholder: 'Please select options',
		isSearchable: true,
		bottomSheetTitle: 'Select Options',
		bottomSheetCloseButton: true,
		directChange: false,
		selectAllText: 'Select All',
		groupKey: 'group',
	},
};
