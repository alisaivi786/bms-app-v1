import React from 'react';
import { Text, View } from 'react-native';
import {
	SfCheckmarkCircleFillIcon,
	SfExclamationmarkCircleFillIcon,
	SfInfoCircleFillIcon,
	SfXmarkCircleFillIcon,
} from '@devkit/icons/native';
import { logger } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import styles, { Size, Status, TVariant } from './Badge.styles';

const iconsByStatus: Partial<Record<Status, React.FC<React.SVGProps<SVGSVGElement>>>> = {
	Success: SfCheckmarkCircleFillIcon,
	Warning: SfExclamationmarkCircleFillIcon,
	Critical: SfXmarkCircleFillIcon,
	Neutral: SfInfoCircleFillIcon,
};

export interface ITagProps {
	/**
	 * Title of the badge
	 */
	title: string | React.ReactNode;
	/**
	 * Variant
	 */
	variant?: TVariant;
	/**
	 * Status
	 */
	status?: Status;

	/**
	 * Icon to be shown inside badge
	 */
	icon?: React.FC<React.SVGProps<SVGSVGElement>>;

	/**
	 * with icon
	 */
	showIcon?: boolean;
	size?: Size;
}

const Badge = ({
	title,
	variant = 'Default',
	status = 'Neutral',
	showIcon = true,
	icon,
	size = 'Small',
}: ITagProps) => {
	const { tw, reverseLayout } = useMobileUIConfigOptions();
	const BadgeIcon = icon ?? iconsByStatus[status];
	const isPrimitive = typeof title === 'string' || typeof title === 'number';
	const isElement = React.isValidElement(title);

	if (!isPrimitive && !isElement) {
		logger.warn('Badge title should be a string, number or a valid React element');

		return null;
	}

	const content = () => {
		if (isPrimitive) {
			return (
				<>
					{!!showIcon && BadgeIcon && (
						<BadgeIcon style={tw`${styles.badgeIcon(variant, status)}`} height={12} width={12} />
					)}
					<Text style={tw`${styles.badgeTitle(variant, status, reverseLayout)}`}>{title}</Text>
				</>
			);
		} else if (isElement) {
			return title;
		}
	};

	return (
		<View data-testid="badge" style={tw`${styles.badgeContainer(variant, status, size)}`}>
			{content()}
		</View>
	);
};

export default Badge;
