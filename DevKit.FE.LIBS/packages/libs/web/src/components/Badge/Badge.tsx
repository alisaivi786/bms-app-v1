import React from 'react';
import {
	SfCheckmarkCircleFillIcon,
	SfExclamationmarkCircleFillIcon,
	SfInfoCircleFillIcon,
	SfXmarkCircleFillIcon,
} from '@devkit/icons/web';
import styles, { Size, Status, TVariant } from './Badge.styles';

const icons: Partial<Record<Status, React.FC<React.SVGProps<SVGSVGElement>>>> = {
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

	/**
	 * Size of the badge
	 */
	size?: Size;
}

const Badge = ({
	title,
	variant = 'Default',
	status = 'Neutral',
	showIcon = true,
	icon,
	size = 'Large',
}: ITagProps) => {
	const BadgeIcon = icon ?? icons[status];

	return (
		<div data-testid="badge" className={styles.badgeContainer(variant, status, size)}>
			{!!showIcon && BadgeIcon && (
				<span className={styles.badgeIcon(variant, size)}>
					<BadgeIcon />
				</span>
			)}
			<h6 className={styles.badgeTitle(size)}>{title}</h6>
		</div>
	);
};

export default Badge;
