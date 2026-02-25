import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { TailwindFn } from 'twrnc';
import { SfCheckmarkIcon, SfChevronUpIcon } from '@devkit/icons/native';
import { Step } from './types';

export const StepItem: React.FC<{
	step: Step;
	index: number;
	currentStepIndex: number;
	onStepPress?: (index: number) => void;
	indicatorRef: (ref: View | null) => void;
	tw: TailwindFn;
	isFirst: boolean;
	setIsOpen: (isOpen: boolean) => void;
	reverseLayout: boolean;
}> = ({ step, index, currentStepIndex, onStepPress, indicatorRef, tw, isFirst, setIsOpen, reverseLayout }) => {
	const isCompleted = index < currentStepIndex;
	const isActive = index === currentStepIndex;
	const isFuture = index > currentStepIndex;

	return (
		<View style={tw`flex-row items-center py-2.5`}>
			<View style={tw`w-5 items-center`}>
				<View
					ref={indicatorRef}
					style={tw`w-5 h-5 rounded-full items-center justify-center z-10 ${
						isCompleted ? 'bg-brand-600' : isActive ? 'bg-black' : 'bg-gray-400'
					}`}
				>
					{isCompleted ? (
						<SfCheckmarkIcon style={tw`text-white`} width={10} height={10} />
					) : (
						<Text style={tw`text-caption1 font-semibold ${isActive ? 'text-white' : 'text-gray-600'}`}>
							{index + 1}
						</Text>
					)}
				</View>
			</View>
			<View style={tw`flex-1 flex-row items-center gap-4`}>
				<TouchableOpacity
					style={tw`flex-1 pl-4 justify-center`}
					onPress={() => onStepPress?.(index)}
					disabled={!onStepPress}
					activeOpacity={0.8}
				>
					<Text
						style={tw`text-paragraph font-main-medium ${reverseLayout ? '' : 'text-left'}
                ${isFuture ? 'text-gray-600' : 'text-black'}`}
					>
						{step.title}
					</Text>
					{step.content &&
						(typeof step.content === 'string' ? (
							<Text style={tw`text-caption1 ${reverseLayout ? '' : 'text-left'} text-gray-700`}>{step.content}</Text>
						) : (
							<View>{step.content}</View>
						))}
				</TouchableOpacity>
				{isFirst && (
					<Pressable
						onPress={() => setIsOpen(false)}
						hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
						accessibilityRole="button"
						accessibilityLabel="Close step modal"
					>
						<SfChevronUpIcon height={16} width={16} color="black" />
					</Pressable>
				)}
			</View>
		</View>
	);
};
