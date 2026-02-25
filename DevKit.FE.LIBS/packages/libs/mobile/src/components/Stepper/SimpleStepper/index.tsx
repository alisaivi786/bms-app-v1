import React, { ReactElement, useCallback } from 'react';
import { Text, View } from 'react-native';
import { useMobileUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import styles from '../stepper.styles';
import StepCircle from './StepCircle';

export interface ISimpleStepperProps {
	/**The stepper titles */
	items: string[];
	/**The current step of the stepper */
	current?: number;
}

/** Use SimpleStepper for a horizontally aligned timeline component to show a series of data in a chronological order. */
export const SimpleStepper = ({ current = 1, items }: ISimpleStepperProps) => {
	const { tw } = useMobileUIConfigOptions();

	const renderSteps = useCallback(() => {
		const arr: ReactElement[] = [];

		for (let index = 0; index < items.length * 2 - 1; index++) {
			if (index % 2 === 0) {
				const elementIndex = index / 2;
				const step = items[elementIndex];

				arr.push(
					<View key={`stepper-${index}`} style={tw`${styles.stepperListItem}`}>
						<Text style={tw`${styles.lineClass(elementIndex, current)}`}>{step}</Text>
						<StepCircle elementIndex={elementIndex} current={current} stepsLength={items.length} />
					</View>
				);
			} else {
				// Separator
				arr.push(<View key={`stepper-${index}`} style={tw`${styles.separator(index, current)}`} />);
			}
		}

		return arr;
	}, [current, items, tw]);

	return <View style={tw`${styles.stepperList}`}>{renderSteps()}</View>;
};
