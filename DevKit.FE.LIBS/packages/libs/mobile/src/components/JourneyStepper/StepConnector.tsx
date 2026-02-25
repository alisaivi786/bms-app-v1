import React from 'react';
import { View } from 'react-native';
import { TailwindFn } from 'twrnc';

export const StepConnector: React.FC<{
	index: number;
	currentStepIndex: number;
	startY: number;
	endY: number;
	tw: TailwindFn;
}> = ({ index, currentStepIndex, startY, endY, tw }) => {
	if (startY === 0 || endY === 0) return null;

	const isCompleted = index < currentStepIndex;

	return (
		<View style={[tw`absolute left-4 w-5 z-0 flex-row justify-center`, { top: startY, height: endY - startY }]}>
			<View style={tw`w-0.5 h-full z-0 ${isCompleted ? 'bg-black' : 'bg-gray-400'}`} />
		</View>
	);
};
