/* eslint-disable quotes */
import { ReactElement } from 'react';
import { CheckIcon } from '@devkit/icons/web';
import styles from './stepper.styles';

export interface IStepperProps {
	/**the stepper items*/
	items: {
		/**An optional property to add any child under the step title */
		child?: ReactElement;
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
	return (
		<ul className={styles.verticalStepperList}>
			{items.map((step, index) => {
				return (
					<li key={index} className={styles.verticalStepperListItem}>
						<div className={styles.verticalStepperCircleContainer}>
							{/* Circle */}
							{index + 1 < current ? (
								<div
									className={styles.verticalStepperCircleChecked} // completed case
								>
									<CheckIcon className={styles.verticalStepperCircleCheckIcon} />
								</div>
							) : (
								<div className={styles.verticalStepperCircle(index, current)}>
									<p className={styles.verticalStepperCircleNumber}>{index + 1}</p>
								</div>
							)}
							{/* Line */}
							{index + 1 !== items?.length ? <div className={styles.verticalStepperLine}></div> : null}
						</div>

						<div className={styles.verticalStepperContent}>
							<p className={styles.verticalStepperTitle(index, current)}>{step.title}</p>
							{step.child && <div className={styles.verticalStepperChild}>{step.child}</div>}
							{step.description && <p className={styles.verticalStepperDesc}>{step.description}</p>}
						</div>
					</li>
				);
			})}
		</ul>
	);
};
