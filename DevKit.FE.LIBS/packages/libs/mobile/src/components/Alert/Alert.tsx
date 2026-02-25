import React, { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { ErrorIcon, InfoCircleIcon, SfCheckmarkCircleFillIcon, SfXmarkIcon, WarningIcon } from '@devkit/icons/native';
import { useMobileUIConfigOptions } from '../../layouts';
import styles from './Alert.styles';

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
	const { tw } = useMobileUIConfigOptions();

	if (!isShown) return <></>;

	return (
		<View style={tw`${styles.alertContainer(iconPosition, severityObject[severity]?.style)}`} role="alert">
			<View style={tw`${styles.alertChildrenContainer(iconPosition)}`}>
				<SeverityIcon severity={severity} />
			</View>
			{children}
			{isClosable && (
				<View style={tw`${styles.xContainer}`}>
					<Pressable onPress={() => onClose?.()}>
						<SfXmarkIcon data-testid="close-icon" style={tw`${styles.closeIcon}`} width={14} height={14} />
					</Pressable>
				</View>
			)}
		</View>
	);
};

const SeverityIcon = ({ severity }: { severity: keyof typeof severityObject }) => {
	const { icon } = severityObject[severity];
	const { tw } = useMobileUIConfigOptions();

	return React.cloneElement(icon, { style: tw`${icon.props.className}`, width: 15, height: 15 });
};
