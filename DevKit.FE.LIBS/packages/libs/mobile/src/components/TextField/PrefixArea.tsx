import React, { LegacyRef, ReactNode } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import styles from './TextField.styles';

export const PrefixArea = ({
	suffix,
	size,
	disabled,
	icon: Icon,
	onIconClick,
	suffixNode,
	inputValue,
	reverseLayout,
}: {
	disabled: boolean;
	size: 'small' | 'medium' | 'large';
	suffix: string | undefined;
	inputRef: LegacyRef<TextInput> | undefined;
	icon: React.FC<React.SVGProps<SVGSVGElement>> | undefined;
	onIconClick: () => void;
	reverseLayout: boolean;
	suffixNode: ReactNode | undefined;
	inputValue: string | number | undefined;
}) => {
	const hasValue = !!`${inputValue ?? ''}`.length;

	const prefixAreaStyles = styles.prefixArea(disabled, hasValue, size);
	const { tw } = useMobileUIConfigOptions();
	const isVisible = !!Icon || !!suffix || !!suffixNode;

	return (
		isVisible && (
			<View style={tw`${prefixAreaStyles.container(reverseLayout)}`}>
				{!!suffixNode && suffixNode}
				{Icon && (
					<Pressable onPress={onIconClick}>
						{({ pressed }) => <Icon height={18} width={18} style={tw`${styles.startIcon(pressed, disabled)}`} />}
					</Pressable>
				)}
				{suffix && <Text style={tw`${prefixAreaStyles.suffix}`}>{suffix}</Text>}
			</View>
		)
	);
};
