import React from 'react';
import { View } from 'react-native';
import { CheckIcon } from '@devkit/icons/native';
import { useMobileUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import styles from '../stepper.styles';

interface IStepCircleProps {
	elementIndex: number;
	current: number;
	stepsLength: number;
}

const StepCircle = ({ elementIndex, current, stepsLength }: IStepCircleProps) => {
	const { tw } = useMobileUIConfigOptions();

	if (elementIndex + 1 < current) {
		return (
			<View style={tw`${styles.stepCircleContainer}`}>
				<View style={tw`${styles.stepCircleCheckedBefore(elementIndex)}`} />
				<View style={tw`${styles.stepCircleCheckedCircle}`}>
					<CheckIcon style={tw`${styles.stepCircleCheckedIcon}`} height={12} />
				</View>
				<View style={tw`${styles.stepCircleCheckedAfter(elementIndex, stepsLength)}`} />
			</View>
		);
	}

	const currentStep = current === elementIndex + 1;
	const beforeCurrentStep = current - elementIndex === 1;

	return (
		<View style={tw`${styles.stepCircleContainer}`}>
			<View style={tw`${styles.stepCircleBefore(elementIndex, beforeCurrentStep)}`} />
			<View style={tw`${styles.stepCircleCircle(currentStep)}`} />
			<View style={tw`${styles.stepCircleAfter(elementIndex, stepsLength, beforeCurrentStep, currentStep)}`} />
		</View>
	);
};

export default StepCircle;
