import { useState } from 'react';
import { Text, View } from 'react-native';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { Disclosures } from '../../src/components/Disclosures';

const defaultState = [
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
					Outside Abu Dhabi Combined Inpatient & Outpatient Limit of AED 10,000 applicable. Same Out Patient Deductible
					as per the selected Plan will be applicable for Maternity Consultations and also Covered on reimbursement up
					to AED 1,600.
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
		body: (
			<>
				<Text>Covered subject to the following: Sub-limit: AED 3,500, Coinsurance: 20%</Text>
			</>
		),
	},
	{
		key: 'c',
		header: 'Hearing and Vision Aids',
		body: (
			<>
				<Text>Covered only in cases of medical emergencies.</Text>
			</>
		),
	},
	{
		key: 'd',
		header: 'Out-Patient Services',
		body: (
			<>
				<Text>Co-Payment: 20% co-payment upto AED 50</Text>
			</>
		),
	},
];

const DisclosuresMeta: Meta<typeof Disclosures> = {
	title: 'Mobile/Components/Disclosures',
	component: Disclosures,
	argTypes: {
		items: [
			{
				key: 'a',
				header: 'aa',
				body: <Text>aaa</Text>,
			},
		],
		openItems: ['a'],
	},
	args: {
		variant: 'primary',
	},
	decorators: [
		(Story) => {
			return (
				<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
					<Story />
				</View>
			);
		},
	],
};

export default DisclosuresMeta;

export const _1Default: StoryObj<typeof Disclosures> = {
	args: {
		items: defaultState,
		openItems: ['c', 'd'],
	},
};
