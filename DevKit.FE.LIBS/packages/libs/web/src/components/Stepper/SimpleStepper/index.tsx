import { ReactElement, useCallback } from 'react';
import styles from '../stepper.styles';
import StepCircle from './StepCircle';

export interface ISimpleStepperProps {
	/**The stepper titles */
	items: (string | { title: string; description?: string })[];
	/**The current step of the stepper */
	current?: number;
	/**Orientation of the stepper */
	direction?: 'horizontal' | 'vertical';
	/**Display the step number inside each circle */
	showNumbers?: boolean;
	/**Appearance of the step circle */
	circleStyle?: 'border' | 'filled';
	/**Color palette for the step visuals */
	variant?: 'brand' | 'black';
}

/** Use SimpleStepper for a horizontally aligned timeline component to show a series of data in a chronological order. */
export const SimpleStepper = ({
	current = 1,
	items,
	direction = 'horizontal',
	showNumbers = false,
	circleStyle = 'border',
	variant = 'brand',
}: ISimpleStepperProps) => {
	const renderSteps = useCallback(() => {
		if (direction === 'vertical') {
			const arr: ReactElement[] = [];

			items.forEach((step, elementIndex) => {
				arr.push(
					<li key={`stepper-${elementIndex}`} className={styles.simpleStepperVerticalListItem}>
						<StepCircle
							elementIndex={elementIndex}
							current={current}
							stepsLength={items.length}
							direction="vertical"
							showNumbers={showNumbers}
							circleStyle={circleStyle}
							variant={variant}
						/>
						<div className={styles.simpleStepperVerticalContent}>
							<p className={styles.simpleStepperVerticalLabel(elementIndex, current, variant)}>
								{typeof step === 'string' ? step : step.title}
								{typeof step !== 'string' && step.description && (
									<p className="font-medium text-paragraph">{step.description}</p>
								)}
							</p>
						</div>
					</li>
				);

				// separator
				if (elementIndex < items.length - 1) {
					arr.push(
						<div
							key={`separator-${elementIndex}`}
							className={styles.simpleStepperVerticalSeparator(elementIndex, current, variant)}
						/>
					);
				}
			});

			return arr;
		}

		const arr: ReactElement[] = [];

		for (let index = 0; index < items.length * 2 - 1; index++) {
			if (index % 2 === 0) {
				const elementIndex = index / 2;
				const step = items[elementIndex];

				arr.push(
					<li key={`stepper-${index}`} className={styles.stepperListItem}>
						<p className={styles.lineClass(elementIndex, current, variant)}>
							{typeof step === 'string' ? step : step.title}
							{typeof step !== 'string' && step.description && (
								<p className="font-medium nj-stepper-subtitle-font-size">{step.description}</p>
							)}
						</p>

						<StepCircle
							elementIndex={elementIndex}
							current={current}
							stepsLength={items.length}
							direction="horizontal"
							showNumbers={showNumbers}
							circleStyle={circleStyle}
							variant={variant}
						/>
					</li>
				);
			} else {
				// Separator
				arr.push(<div key={`stepper-${index}`} className={styles.separator(index, current, variant)} />);
			}
		}

		return arr;
	}, [circleStyle, current, direction, items, showNumbers, variant]);

	return (
		<ul className={direction === 'vertical' ? styles.simpleStepperVerticalList : styles.stepperList}>
			{renderSteps()}
		</ul>
	);
};
