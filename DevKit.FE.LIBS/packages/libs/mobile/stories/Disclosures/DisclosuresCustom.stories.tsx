import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { IDisclosureProps } from '../../src/components/Disclosures';
import { Disclosures } from '../../src/components/Disclosures';

type ComponentProps = IDisclosureProps & {
	toggleBehavior: 'single' | 'multiple';
};

type ComponentType = (args: ComponentProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (props) => {
	const items = [
		{
			key: 'a',
			header: 'Maternity Cover',
			body: (
				<>
					<Text>
						Inside Abu Dhabi Combined In-patient outpatient limit up to the Annual Benefit limit of the policy. For
						Delivery inside Abu Dhabi, a Deductible of AED 500 is applicable as per HAAD.
					</Text>
					<Text>
						Outside Abu Dhabi Combined Inpatient & Outpatient Limit of AED 10,000 applicable. Same Out Patient
						Deductible as per the selected Plan will be applicable for Maternity Consultations and also Covered on
						reimbursement up to AED 1,600.
					</Text>
					<Text>
						The following screening tests covered as per DHA Antenatal care protocol: o FBC and Platelets o Blood group,
						Rhesus status and antibodies o VDRL o MSU & urinalysis o Rubella serology AED 30,000,000 o HIV o Hepatitis C
						offered to high-risk patients o GTT, if high risk o FBS, Random blood sugar OR HbA1C o Ultrasonography: 3
						scans.
					</Text>
				</>
			),
		},
		{
			key: 'b',
			header: 'Dental and Gum Treatment',
			body: <Text>Covered subject to the following: Sub-limit: AED 3,500, Coinsurance: 20%</Text>,
		},
		{
			key: 'c',
			header: 'Hearing and Vision Aids',
			body: <Text>Covered only in cases of medical emergencies.</Text>,
		},
		{
			key: 'd',
			header: 'Out-Patient Services',
			body: <Text>Co-Payment: 20% co-payment upto AED 50</Text>,
		},
	];

	const [openItems, setOpenItems] = useState<React.Key[]>(props.openItems ?? []);

	const onToggle = (newOpenItems: React.Key[], itemKey: React.Key) => {
		switch (props.toggleBehavior) {
			case 'single':
				// is all items expanded
				if (newOpenItems.length === items.length - 1) {
					setOpenItems([itemKey]);
				} else {
					setOpenItems(openItems.includes(itemKey) ? [] : [itemKey]);
				}
				break;
			case 'multiple':
				setOpenItems(newOpenItems);
				break;
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<Disclosures {...props} openItems={openItems} items={items} onToggle={onToggle} />
		</View>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Components/Disclosures',
	render: Template,
	args: {
		displaySeparator: false,
		openItems: ['c', 'd'],
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'tile'],
		},
		toggleBehavior: {
			description: 'The toggle behavior to use (single and multiple)',
			options: ['single', 'multiple'],
			control: { type: 'radio' },
		},
	},
};

export default StoryMeta;

export const DisclosuresCustom: StoryObj<ComponentType> = {
	args: {
		items: [],
		openItems: ['c', 'd'],
		displaySeparator: true,
		variant: 'tile',
		toggleBehavior: 'single',
	},
};
