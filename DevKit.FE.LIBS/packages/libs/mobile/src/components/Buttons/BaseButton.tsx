import { includes, isEmpty } from 'lodash';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { Spinner } from '../Spinner';
import styles from './BaseButton.styles';
import { ButtonVariants, IBaseButtonProps } from './types';

const BaseButton = ({
	variant = 'primary',
	disabled = false,
	state,
	onPress,
	layoutClassName,
	isLoading: isLoadingProp = false,
	showOutline = false,
	size = 'medium',
	children,
	icon: Icon,
	iconEnd: IconEnd,
	iconStart: IconStart,
	textWidth,
	onLongPress,
}: IBaseButtonProps) => {
	const { tw, utilities, gradientConfigs } = useMobileUIConfigOptions();
	const [isAsyncLoading, setIsAsyncLoading] = useState(false);
	const isIcon = ['iconPrimary', 'iconSecondary', 'iconText'].includes(variant);
	const spinnerSizes = size === 'large' ? 20 : 16;
	const isLoading = isLoadingProp || isAsyncLoading;
	const socialIconClassname = variant === 'social' ? 'h-6 w-6' : '';

	const onClickCall = async () => {
		try {
			setIsAsyncLoading(true);

			if (onPress) {
				await onPress();
			}

			setIsAsyncLoading(false);
		} catch {
			setIsAsyncLoading(false);
		}
	};

	const backgroundClass = utilities?.[`nj-${variant}-button-bg`] || '';

	const GRADIENT_KEY = 'gradient-';
	const hasGradient = !isEmpty(gradientConfigs) && backgroundClass?.startsWith(GRADIENT_KEY);

	const gradientVariant = backgroundClass
		?.replace(GRADIENT_KEY, '')
		?.split(' ')?.[0]
		?.split('-')?.[0] as keyof typeof gradientConfigs;

	const gradientProps = hasGradient
		? disabled
			? gradientConfigs.disabled
			: gradientConfigs?.[gradientVariant]
		: undefined;

	return (
		<Pressable
			style={({ pressed }) =>
				tw`${styles.button(layoutClassName, variant, disabled, showOutline, state, isLoading, pressed)}`
			}
			disabled={disabled || isLoading}
			onPress={!isLoading && !disabled ? onClickCall : undefined}
			onLongPress={!isLoading && !disabled ? onLongPress : undefined}
		>
			<View
				style={tw.style(`nj-${variant}-button-gradient-container`, disabled && 'nj-disabled-button-gradient-container')}
			>
				{!!gradientProps && <LinearGradient {...gradientProps} style={tw`absolute inset-0`} />}
				<View style={tw`nj-button-container-border`}>
					<View style={tw`${styles.container(size, variant)}`}>
						{isLoading && (
							<View style={tw`${styles.spinnerStyle(variant, state, disabled)}`}>
								<Spinner
									size={spinnerSizes}
									state={state}
									variant={
										includes<ButtonVariants>(['primary', 'iconPrimary'], variant) || disabled ? 'secondary' : 'primary'
									}
								/>
							</View>
						)}
						<View style={tw`${styles.childrenContainer(!!children, isIcon, variant)}`}>
							{isIcon && Icon && (
								<Icon
									style={tw`${socialIconClassname} ${styles.text(variant, state, disabled, isLoading, size)}`}
									height={styles.iconSize(variant, size)}
									width={styles.iconSize(variant, size)}
								/>
							)}
							{!isIcon && !Icon && IconStart && (
								<IconStart
									style={tw`${socialIconClassname} ${styles.text(variant, state, disabled, isLoading, size)}`}
									height={styles.iconSize(variant, size)}
									width={styles.iconSize(variant, size)}
								/>
							)}
							{!isIcon && (
								<Text style={tw`${textWidth ?? ''} ${styles.text(variant, state, disabled, isLoading, size)}`}>
									{children}
								</Text>
							)}
							{!isIcon && !Icon && IconEnd && (
								<IconEnd
									style={tw`${socialIconClassname} ${styles.text(variant, state, disabled, isLoading, size)}`}
									height={styles.iconSize(variant, size)}
									width={styles.iconSize(variant, size)}
								/>
							)}
						</View>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

export default BaseButton;
