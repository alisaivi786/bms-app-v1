'use client';

import { FC, ReactNode, SVGProps } from 'react';
import { TwLinkClassName } from '@devkit/utilities';
import { ILink } from '../../layouts/ThemeProvider';
import { useWebUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { Spinner } from '../Spinner';
import styles from './TextLink.styles';

export interface ITextLink {
	/** React elements to be rendered */
	text: ReactNode;
	/**Callback function for handling click.  */
	onClick?: () => void;
	/**SVG Element placed  after the text. */
	icon?: FC<SVGProps<SVGSVGElement>>;
	/**If true, the component is disabled. */
	disabled?: boolean;
	/**If true, a loading spinner will appear. */
	isLoading?: boolean;
	/** Override or extend the styles applied to the component */
	download?: boolean;
	/** Override or extend the styles applied to the component */
	className?: TwLinkClassName;
	/** The position for the icon (center or start) */
	iconPosition?: 'start' | 'end';
	/** The ability to rotate the icon */
	iconRotateRTL?: boolean;
	variant?: 'primary' | 'inverse';
	href?: string;
	target?: React.HTMLAttributeAnchorTarget;
}

export const TextLink = ({
	text,
	onClick,
	icon: BtnIcon,
	disabled = false,
	className,
	isLoading = false,
	iconPosition = 'end',
	iconRotateRTL = false,
	variant = 'primary',
	download,
	href,
	target,
}: ITextLink) => {
	const { renderLink } = useWebUIConfigOptions();

	const linkProps: ILink = {
		className: styles.linkStyle(className, disabled, variant),
		href: disabled ? undefined : href,
		onClick: onClick
			? (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
					e.preventDefault();
					e.stopPropagation();

					if (!disabled) {
						onClick();
					}
			  }
			: undefined,
		download,
		target,
	};

	const children = (
		<>
			{isLoading && <Spinner borderWidth={2} size={17.5} />}
			{iconPosition === 'start' && !isLoading && BtnIcon && <BtnIcon className={styles.iconClassName(iconRotateRTL)} />}
			{text}
			{iconPosition === 'end' && !isLoading && BtnIcon && <BtnIcon className={styles.iconClassName(iconRotateRTL)} />}
		</>
	);

	return renderLink ? renderLink({ ...linkProps, children }) : <a {...linkProps}>{children}</a>;
};
