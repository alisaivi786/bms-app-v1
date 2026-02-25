import React from 'react';
import { View } from 'react-native';
import { TailwindFn } from 'twrnc';
import { Step } from './types';

export const ProgressBar: React.FC<{
	steps: Step[];
	currentStepIndex: number;
	tw: TailwindFn;
	isHide?: boolean;
}> = ({ steps, currentStepIndex, tw, isHide = false }) =>
	isHide ? null : (
		<View style={tw`flex-row gap-1 p-1 bg-white`}>
			{steps.map((_, index) => (
				<View
					key={`spacer-${index}`}
					style={tw`flex-1 h-0.5 rounded-lg ${
						index < currentStepIndex ? 'bg-brand-900' : index === currentStepIndex ? 'bg-brand-600' : 'bg-gray-400'
					}`}
				/>
			))}
		</View>
	);
