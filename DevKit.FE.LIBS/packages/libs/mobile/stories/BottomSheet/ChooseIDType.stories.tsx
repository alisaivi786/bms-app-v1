import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AgCloseCrossLargeIcon } from '@devkit/icons/native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { BottomSheet } from '../../src/components/BottomSheet';
import { Button } from '../../src/components/Buttons';
import { useMobileUIConfigOptions } from '../../src/layouts/ThemeProvider/theme-context';

// Choose ID Type Component
interface IDTypeOption {
	id: string;
	title: string;
	description?: string;
	isSelected: boolean;
}

interface ChooseIDTypeModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSelectIDType: (id: string) => void;
}

const ChooseIDTypeModal: React.FC<ChooseIDTypeModalProps> = ({ isOpen, onClose, onSelectIDType }) => {
	const { tw } = useMobileUIConfigOptions();
	const [selectedOption, setSelectedOption] = useState('emirates-id');

	const idOptions: IDTypeOption[] = [
		{
			id: 'emirates-id',
			title: 'Emirates ID',
			isSelected: selectedOption === 'emirates-id',
		},
		{
			id: 'unified-id',
			title: 'Unified ID',
			description: 'You can find your Unified ID on your entry permit.',
			isSelected: selectedOption === 'unified-id',
		},
	];

	const handleOptionSelect = (optionId: string) => {
		setSelectedOption(optionId);
		onSelectIDType(optionId);
	};

	const EmiratesIDCard = ({ isSelected }: { isSelected: boolean }) => (
		<View
			style={tw`bg-gray-100 rounded-xl p-4 w-[280px] h-[170px] ${isSelected ? 'border border-brand-600' : ''}`}
		></View>
	);

	const UnifiedIDCard = ({ isSelected }: { isSelected: boolean }) => (
		<View
			style={tw`bg-gray-100 rounded-xl p-4 w-[280px] h-[170px] ${isSelected ? 'border border-brand-600' : ''} `}
		></View>
	);

	return (
		<BottomSheet isOpen={isOpen} onClose={onClose} title={'Choose ID type'} enableDynamicSizing={true}>
			<View>
				{idOptions.map((option) => (
					<TouchableOpacity key={option.id} onPress={() => handleOptionSelect(option.id)} style={tw`mb-6`}>
						<View style={tw`flex-row items-center`}>
							<View style={tw`flex-1`}>
								<Text style={tw`text-body font-medium mb-2`}>{option.title}</Text>
								{option.description && <Text style={tw`text-paragraph font-medium mb-4`}>{option.description}</Text>}
								<View style={tw`flex-row items-center`}>
									{option.id === 'emirates-id' ? (
										<EmiratesIDCard isSelected={option.isSelected} />
									) : (
										<UnifiedIDCard isSelected={option.isSelected} />
									)}

									<View style={tw`ml-4`}>
										<View
											style={tw`w-6 h-6 rounded-full border ${
												option.isSelected ? 'border-brand-600 ' : 'border-gray-300'
											} items-center justify-center`}
										>
											{option.isSelected && <View style={tw`w-5 h-5 rounded-full bg-brand-600`} />}
										</View>
									</View>
								</View>
							</View>
						</View>
					</TouchableOpacity>
				))}
			</View>
		</BottomSheet>
	);
};

const meta: Meta<typeof BottomSheet> = {
	title: 'Components/BottomSheet/ChooseIDType',
	component: BottomSheet,
	parameters: {
		docs: {
			description: {
				component: 'A BottomSheet for selecting ID type between Emirates ID and Unified ID.',
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

const ChooseIDTypeWrapper = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => setIsOpen(false);

	const handleSelectIDType = (idType: string) => {
		console.log('Selected ID Type:', idType);
	};

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
			<Button onPress={() => setIsOpen(true)}>Choose ID Type</Button>
			<ChooseIDTypeModal isOpen={isOpen} onClose={handleClose} onSelectIDType={handleSelectIDType} />
		</View>
	);
};

export const ChooseIDType: Story = {
	render: () => <ChooseIDTypeWrapper />,
	parameters: {
		docs: {
			description: {
				story: 'Bottom sheet modal for choosing ID type between Emirates ID and Unified ID.',
			},
		},
	},
};
