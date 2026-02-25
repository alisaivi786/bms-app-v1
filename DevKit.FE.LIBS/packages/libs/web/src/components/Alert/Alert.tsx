import { ReactNode } from 'react';
import { ErrorIcon, InfoCircleIcon, SfCheckmarkCircleFillIcon, SfXmarkIcon, WarningIcon } from '@devkit/icons/web';
import './Alert.scss';
import styles from './Alert.styles';

export interface IObject {
	icon: JSX.Element;
	style: string;
}

const severityObject = {
	warning: {
		icon: <WarningIcon className={styles.warningIconStyle} />,
		style: styles.warningStyle,
	},
	info: {
		icon: <InfoCircleIcon className={styles.infoIconStyle} />,
		style: styles.infoStyle,
	},
	success: {
		icon: <SfCheckmarkCircleFillIcon className={styles.successIconStyle} />,
		style: styles.successStyle,
	},
	error: {
		icon: <ErrorIcon className={styles.errorIconStyle} />,
		style: styles.errorStyle,
	},
};

export interface IAlertProps {
	/**
	 * Severity (warning, info, or error)
	 */
	severity: 'warning' | 'info' | 'error' | 'success';
	/**
	 *React elements to be rendered within the Alert component
	 */
	children?: ReactNode;
	/**If true, then the Alert will be shown */
	isShown: boolean;
	/**If true, then the Close icon will be shown */

	isClosable?: boolean;
	/**Callback function for hiding the Alert*/

	onClose?: () => void;
	/** The position for the icon (center or start) */
	iconPosition?: 'center' | 'start';
}

export const Alert = ({
	children,
	isShown,
	severity,
	isClosable = false,
	onClose,
	iconPosition = 'center',
}: IAlertProps) => {
	if (!isShown) return <></>;

	return (
		<div className={styles.alertContainer(iconPosition, severityObject[severity]?.style)}>
			<div className={styles.alertChildrenContainer(iconPosition)}>{severityObject[severity]?.icon}</div>
			{children}
			{isClosable && (
				<div className={styles.xContainer}>
					<SfXmarkIcon data-testid="close-icon" onClick={() => onClose?.()} className={styles.closeIcon} />
				</div>
			)}
		</div>
	);
};
