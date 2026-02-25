import { TwLayoutClassName, TwWidth } from '@devkit/utilities';

export type ButtonSize = 'xSmall' | 'small' | 'medium' | 'large';

export interface IBaseButtonProps {
	/** The variant to use (primary, iconPrimary, secondary, iconSecondary, text, iconText and social)*/
	variant?: 'primary' | 'iconPrimary' | 'secondary' | 'iconSecondary' | 'text' | 'iconText' | 'social';
	state?: 'danger';
	/**If true, the component is disabled. */
	disabled?: boolean;
	/**If true, a loading spinner will appear. */
	isLoading?: boolean;
	/**Callback function for handling click.  */
	onPress?: () => Promise<void> | void;
	/**Callback function for handling long press.  */
	onLongPress?: () => void;
	/** Override or extend the styles applied to the component */
	layoutClassName?: TwLayoutClassName;
	/**	React elements to be rendered within the Button component */
	children?: string | null;
	/**If true, the border class will be applied. */
	showOutline?: boolean;
	/**SVG Element placed before the children. */
	iconStart?: React.FC<React.SVGProps<SVGSVGElement>>;
	/**SVG Element placed after the children. */
	iconEnd?: React.FC<React.SVGProps<SVGSVGElement>>;
	icon?: React.FC<React.SVGProps<SVGSVGElement>>;
	/**the size of the button (including padding) */
	size?: ButtonSize;
	type: 'button' | 'submit' | 'reset';
	textWidth?: TwWidth;
}

export type IconVariantProps = {
	/** The variant to use ( iconPrimary, iconSecondary, and iconText)*/
	variant?: 'iconPrimary' | 'iconSecondary' | 'iconText';
	icon: React.FC<React.SVGProps<SVGSVGElement>>;
	children?: undefined;
	iconStart?: undefined;
	iconEnd?: undefined;
};

export type TextVariantProps = {
	/** The variant to use (primary,  secondary, text and social )*/
	variant?: 'primary' | 'secondary' | 'text' | 'social';
	children?: string | null;
	iconStart?: React.FC<React.SVGProps<SVGSVGElement>>;
	iconEnd?: React.FC<React.SVGProps<SVGSVGElement>>;
	icon?: undefined;
};

export type CommonButtonProps = {
	/** Override or extend the styles applied to the component */
	layoutClassName?: TwLayoutClassName;
	/**If true, the component is disabled. */
	disabled?: boolean;
	/**If true, a loading spinner will appear. */
	isLoading?: boolean;
	/**Callback function for handling click.  */
	onPress?: () => void;
	/**Callback function for handling long press.  */
	onLongPress?: () => void;
	/**If true, the border class will be applied. */
	showOutline?: boolean;
	/**the size of the button (including padding) */
	size?: ButtonSize;
	/** The variant to use (button, submit, or reset) */
	type: 'button' | 'submit' | 'reset';
	htmlFor?: string;
	state?: 'danger';
	textWidth?: TwWidth;
};

export type ButtonProps = Omit<CommonButtonProps, 'type'> & (IconVariantProps | TextVariantProps);

export type SubmitButtonProps = Omit<CommonButtonProps, 'onPress' | 'type'> & (IconVariantProps | TextVariantProps);

export type ResetButtonProps = Omit<CommonButtonProps, 'onPress' | 'type'> & (IconVariantProps | TextVariantProps);

export type ButtonVariants = ButtonProps['variant'];
