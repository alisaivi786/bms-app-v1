import { CheckIcon } from '@devkit/icons/web';
import styles from '../stepper.styles';

interface IStepCircleProps {
	elementIndex: number;
	current: number;
	stepsLength: number;
	direction?: 'horizontal' | 'vertical';
	showNumbers?: boolean;
	circleStyle?: 'border' | 'filled';
	variant?: 'brand' | 'black';
}

const StepCircle = ({
	elementIndex,
	current,
	stepsLength,
	direction = 'horizontal',
	showNumbers = false,
	circleStyle = 'border',
	variant = 'brand',
}: IStepCircleProps) => {
	const isVertical = direction === 'vertical';
	const stepNumber = elementIndex + 1;

	if (stepNumber < current) {
		if (isVertical) {
			return (
				<div className={styles.stepCircleContainerVertical}>
					<div className={styles.stepCircleCheckedBeforeVertical(elementIndex, variant)} />
					<div className={styles.stepCircleCheckedCircle(variant)}>
						<CheckIcon className={styles.stepCircleCheckedIcon} />
					</div>
					<div className={styles.stepCircleCheckedAfterVertical(elementIndex, stepsLength, variant)} />
				</div>
			);
		}

		return (
			<div className={styles.stepCircleContainer}>
				<div className={styles.stepCircleCheckedBefore(elementIndex, variant)} />
				<div className={styles.stepCircleCheckedCircle(variant)}>
					<CheckIcon className={styles.stepCircleCheckedIcon} />
				</div>
				<div className={styles.stepCircleCheckedAfter(elementIndex, stepsLength, variant)} />
			</div>
		);
	}

	const currentStep = stepNumber === current;
	const beforeCurrentStep = current - elementIndex === 1;
	const circleState: 'current' | 'upcoming' = currentStep ? 'current' : 'upcoming';
	const circleContent = showNumbers ? (
		<span className={styles.stepCircleNumber(circleState, circleStyle, variant)}>{stepNumber}</span>
	) : null;

	if (isVertical) {
		return (
			<div className={styles.stepCircleContainerVertical}>
				<div className={styles.stepCircleBeforeVertical(elementIndex, beforeCurrentStep, variant)} />
				<div className={styles.stepCircleCircle(circleState, circleStyle, variant)}>{circleContent}</div>
				<div
					className={styles.stepCircleAfterVertical(
						elementIndex,
						stepsLength,
						beforeCurrentStep,
						currentStep,
						variant
					)}
				/>
			</div>
		);
	}

	return (
		<div className={styles.stepCircleContainer}>
			<div className={styles.stepCircleBefore(elementIndex, beforeCurrentStep, variant)} />
			<div className={styles.stepCircleCircle(circleState, circleStyle, variant)}>{circleContent}</div>
			<div
				className={styles.stepCircleAfter(
					elementIndex,
					stepsLength,
					beforeCurrentStep,
					currentStep,
					variant
				)}
			/>
		</div>
	);
};

export default StepCircle;
