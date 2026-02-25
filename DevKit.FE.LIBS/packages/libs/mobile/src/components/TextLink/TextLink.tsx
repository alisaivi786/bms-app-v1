import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useMobileUIConfigOptions } from '../../layouts';
import styles from './textLink.styles';

type Sizes = 'sm' | 'md' | 'lg';
type Variant = 'default' | 'danger';

export type TextLinkProps = {
	children?: string;
	onPress: () => void;
	icon?: React.ReactNode;
	variant?: Variant;
	size?: Sizes;
	iconPosition?: 'left' | 'right';
	isBolded?: boolean;
};

const SIZE_MAP = {
	sm: { iconSize: 12, fontSize: 12 },
	md: { iconSize: 14, fontSize: 14 },
	lg: { iconSize: 16, fontSize: 16 },
};

const VARIANT_MAP = {
	default: { textColor: 'text-brand-600', iconColor: 'text-brand-500' },
	danger: { textColor: 'text-secondary-600', iconColor: 'text-secondary-500' },
};

export const TextLink = ({
	children,
	onPress,
	icon,
	variant = 'default',
	size = 'md',
	iconPosition = 'left',
	isBolded = false,
}: TextLinkProps) => {
	const { tw } = useMobileUIConfigOptions();
	const { iconSize, fontSize } = SIZE_MAP[size];
	const { textColor, iconColor } = VARIANT_MAP[variant];

	return (
		<Pressable onPress={onPress}>
			{({ pressed }) => (
				<View style={tw`${styles.textLinkContainer(pressed)}`}>
					{icon && iconPosition === 'left' && (
						<View style={tw`${styles.iconContainer(iconSize)}`}>
							{React.cloneElement(icon as React.ReactElement, {
								width: iconSize,
								height: iconSize,
								color: tw.color(iconColor),
							})}
						</View>
					)}

					<Text style={tw`${styles.textStyle(textColor, fontSize, isBolded)}`}>{children}</Text>

					{icon && iconPosition === 'right' && (
						<View style={tw`${styles.iconContainer(iconSize)}`}>
							{React.cloneElement(icon as React.ReactElement, {
								width: iconSize,
								height: iconSize,
								color: tw.color(iconColor),
							})}
						</View>
					)}
				</View>
			)}
		</Pressable>
	);
};
