'use client';
import { includes } from 'lodash';
import { useState } from 'react';
import { Spinner } from '../Spinner';
import styles from './BaseButton.styles';
import { ButtonVariants, IBaseButtonProps } from './types';

const BaseButton = ({
	variant = 'primary',
	disabled = false,
	state,
	onClick,
	layoutClassName,
	type,
	isLoading: isLoadingProp = false,
	showOutline = false,
	size = 'medium',
	children,
	icon: Icon,
	iconEnd: IconEnd,
	iconStart: IconStart,
	htmlFor,
	textWidth,
}: IBaseButtonProps) => {
	const [isAsyncLoading, setIsAsyncLoading] = useState(false);
	const isIcon = variant === 'iconPrimary' || variant === 'iconSecondary' || variant === 'iconText';
	const spinnerSizes = size === 'large' ? 20 : 16;
	const isLoading = isLoadingProp || isAsyncLoading;
	const socialIconClassname = variant === 'social' ? 'h-6 w-6' : '';

	const onClickCall = async () => {
		try {
			setIsAsyncLoading(true);

			if (onClick) await onClick();

			setIsAsyncLoading(false);
		} catch {
			setIsAsyncLoading(false);
		}
	};

	return (
		<button
			className={styles.button(layoutClassName, variant, disabled, showOutline, size, state, isLoading)}
			disabled={disabled}
			onClick={!isLoading && !disabled ? onClickCall : undefined}
			type={type}
			role="button"
		>
			<label htmlFor={htmlFor} className={styles.container}>
				{isLoading && (
					<div className={styles.spinnerStyle}>
						<Spinner
							borderWidth={2}
							size={spinnerSizes}
							state={state}
							variant={includes<ButtonVariants>(['primary', 'iconPrimary'], variant) ? 'secondary' : 'primary'}
						/>
					</div>
				)}
				<div className={styles.childrenContainer(!!children, isLoading, isIcon, variant)}>
					{isIcon && Icon && <Icon className={socialIconClassname} />}

					{!isIcon && !Icon && IconStart && <IconStart className={socialIconClassname} />}
					{!isIcon && <div className={`${textWidth} text-start`}>{children}</div>}
					{!isIcon && !Icon && IconEnd && <IconEnd className={socialIconClassname} />}
				</div>
			</label>
		</button>
	);
};

export default BaseButton;
