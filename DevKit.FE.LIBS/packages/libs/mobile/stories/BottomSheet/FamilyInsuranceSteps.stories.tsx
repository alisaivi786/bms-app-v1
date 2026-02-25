import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AgCloseCrossLargeIcon } from '@devkit/icons/native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { BottomSheet } from '../../src/components/BottomSheet';
import { Button } from '../../src/components/Buttons';
import { useMobileUIConfigOptions } from '../../src/layouts/ThemeProvider/theme-context';

interface InsuranceStep {
	number: number;
	title: string;
}

interface InsuranceStepsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const InsuranceStepItem: React.FC<{ step: InsuranceStep }> = ({ step }) => {
	const { tw } = useMobileUIConfigOptions();

	return (
		<View style={tw`flex-row items-center gap-4 py-4`}>
			<View style={tw`w-6 h-6 rounded-full bg-brand-600 items-center justify-center`}>
				<Text style={tw`text-white font-medium text-paragraph`}>{step.number}</Text>
			</View>
			<Text style={tw`flex-1 text-paragraph font-medium`}>{step.title}</Text>
		</View>
	);
};

const InsuranceStepsModal: React.FC<InsuranceStepsModalProps> = ({ isOpen, onClose }) => {
	const { tw } = useMobileUIConfigOptions();

	const steps: InsuranceStep[] = [
		{
			number: 1,
			title: 'Share your details',
		},
		{
			number: 2,
			title: 'Declare medical conditions',
		},
		{
			number: 3,
			title: 'Choose your quote',
		},
		{
			number: 4,
			title: 'Upload documents',
		},
		{
			number: 5,
			title: 'Review and pay',
		},
	];

	const title = `Health Insurance \nFor yourself or your Family`;

	const footerComponent = (
		<View style={tw`bg-white p-4 shadow-lg`}>
			<TouchableOpacity style={tw`bg-brand-600 rounded-xl py-4 items-center`} onPress={onClose}>
				<Text style={tw`text-white font-semibold text-body`}>Insure Now</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<BottomSheet isOpen={isOpen} onClose={onClose} title={title} footer={footerComponent} enableDynamicSizing={true}>
			<View style={tw`gap-4`}>
				<View>
					<Text style={tw`text-body font-bold`}>No sales calls or spam</Text>
					<Text style={tw`text-caption1 mt-1`}>Follow these simple steps to get started</Text>
				</View>
				<View>
					{steps.map((step) => (
						<View
							key={step.number}
							style={tw`flex-row items-center gap-3 ${step.number === 5 ? '' : 'border-b border-gray-200'}`}
						>
							<InsuranceStepItem step={step} />
						</View>
					))}
				</View>
			</View>
		</BottomSheet>
	);
};

const meta: Meta<typeof BottomSheet> = {
	title: 'Components/BottomSheet/FamilyInsuranceSteps',
	component: BottomSheet,
	parameters: {
		docs: {
			description: {
				component: 'A BottomSheet displaying family insurance steps with header and footer.',
			},
		},
	},
	args: {
		snapPoints: ['50%', '75%'],
		enableDynamicSizing: true,
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

const InsuranceStepsWrapper = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => setIsOpen(false);

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
			<Button onPress={() => setIsOpen(true)}>Open Insurance Steps Modal</Button>
			<InsuranceStepsModal isOpen={isOpen} onClose={handleClose} />
		</View>
	);
};

export const FamilyInsuranceSteps: Story = {
	render: () => <InsuranceStepsWrapper />,
	parameters: {
		docs: {
			description: {
				story: 'Insurance steps modal configured for family insurance.',
			},
		},
	},
};
