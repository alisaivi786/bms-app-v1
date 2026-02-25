import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TailwindFn } from 'twrnc';
import { SfChevronDownIcon } from '@devkit/icons/native';
import { Step } from './types';

export const StepperHeader: React.FC<{
	currentStepIndex: number;
	steps: Step[];
	toggleOpen: () => void;
	tw: TailwindFn;
}> = ({ currentStepIndex = 0, steps, toggleOpen, tw }) => (
	<TouchableOpacity onPress={toggleOpen} style={tw`flex-row items-center gap-4 px-4 py-2.5 bg-brand-50`}>
		<View style={tw`w-5 h-5 rounded-full bg-black flex items-center justify-center`}>
			<Text style={tw`text-white text-caption1 font-semibold`}>{currentStepIndex + 1}</Text>
		</View>
		<Text style={tw`text-body font-main-medium`}>{steps[currentStepIndex]?.title}</Text>
		<View style={tw`ml-auto`}>
			<SfChevronDownIcon height={16} width={16} style={tw`text-black`} />
		</View>
	</TouchableOpacity>
);
