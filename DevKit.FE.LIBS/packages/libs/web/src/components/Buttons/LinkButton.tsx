import { FC, ReactNode, SVGProps } from 'react';
import { Spinner } from '../Spinner';
import styles from './LinkButton.styles';

export interface ILinkButton {
	/**	React elements to be rendered */
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
	className?: string;
	/** The position for the icon (center or start) */
	iconPosition?: 'start' | 'end';
	/** The ability to rotate the icon */
	iconRotateRTL?: boolean;
	variant?: 'primary' | 'inverse';
}

/**
 * @deprecated use TextLink component instead
 * @example
 * <TextLink className= {['text-paragraph', 'font-medium']} />
 */
export const LinkButton = ({
	text,
	onClick,
	icon: BtnIcon,
	disabled = false,
	className = '',
	isLoading = false,
	iconPosition = 'end',
	iconRotateRTL = false,
	variant = 'primary',
}: ILinkButton) => {
	return (
		<button
			className={styles.buttonStyle(className, disabled, variant)}
			disabled={disabled}
			onClick={onClick}
			role="button"
			type="button"
		>
			{isLoading && <Spinner borderWidth={2} size={17.5} />}
			{iconPosition === 'start' && !isLoading && BtnIcon && <BtnIcon className={styles.iconClassName(iconRotateRTL)} />}
			{text}
			{iconPosition === 'end' && !isLoading && BtnIcon && <BtnIcon className={styles.iconClassName(iconRotateRTL)} />}
		</button>
	);
};
