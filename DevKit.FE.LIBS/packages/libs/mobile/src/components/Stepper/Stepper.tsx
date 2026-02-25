import React from 'react';
import { Text, View } from 'react-native';
import { CheckIcon } from '@devkit/icons/native';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import styles from './stepper.styles';

export interface IStepperProps {
	/**the stepper items*/
	items: {
		/**An optional property to add any child under the step title */
		child?: React.ReactElement;
		/**An optional property to add the step description */
		description?: string;
		/**The step title */
		title: string;
	}[];
	/**The current step of the stepper */
	current?: number;
}

/** Use Stepper component to show a series of data entries with a date, title, description as a text, and add any child element, with a vertical line and dots on the left side of the wrapper element */
export const Stepper = ({ current = 1, items }: IStepperProps) => {
	const { tw } = useMobileUIConfigOptions();

	return (
		<View style={tw`${styles.verticalStepperList}`}>
			{items.map((step, index) => {
				return (
					<View key={index} style={tw`${styles.verticalStepperListItem}`}>
						<View style={tw`${styles.verticalStepperCircleContainer}`}>
							{/* Circle */}
							{index + 1 < current ? (
								<View style={tw`${styles.verticalStepperCircleChecked}`}>
									{/* completed case */}
									<CheckIcon style={tw`${styles.verticalStepperCircleCheckIcon}`} height={12} />
								</View>
							) : (
								<View style={tw`${styles.verticalStepperCircle(index, current)}`}>
									<Text style={tw`${styles.verticalStepperCircleNumber(index, current)}`}>{index + 1}</Text>
								</View>
							)}
							{/* Line */}
							{index + 1 !== items.length ? <View style={tw`${styles.verticalStepperLine}`} /> : null}
						</View>

						<View style={tw`${styles.verticalStepperContent}`}>
							<Text style={tw`${styles.verticalStepperTitle(index, current)}`}>{step.title}</Text>
							{step.child && <View style={tw`${styles.verticalStepperChild}`}>{step.child}</View>}
							{step.description && (
								<View style={tw`${styles.verticalStepperDesc}`}>
									<Text>{step.description}</Text>
								</View>
							)}
						</View>
					</View>
				);
			})}
		</View>
	);
};
