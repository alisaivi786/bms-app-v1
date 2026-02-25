import React, { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { AgCloseCrossLargeIcon } from '@devkit/icons/native';
import { ComponentSize } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts';
import { PasswordIcon } from './PasswordIcon';
import styles from './TextField.styles';

export const PostfixArea = ({
	isClearable,
	alwaysShowClearIcon,
	isPasswordField,
	disabled,
	icon: Icon,
	onClear,
	onIconClick,
	inputValue,
	showPassword,
	onChangeShowPassword,
	postfixNode,
	hasErrors,
	reverseLayout,
}: {
	alwaysShowClearIcon: boolean;
	isClearable: boolean;
	size: ComponentSize;
	hasErrors: boolean;
	disabled: boolean;
	isPasswordField: boolean;
	icon: React.FC<React.SVGProps<SVGSVGElement>> | undefined;
	rotateEndIconOnFocus: boolean;
	inputValue: string;
	isFocused: boolean;
	showPassword: boolean;
	onClear: () => void;
	onIconClick: () => void;
	onChangeShowPassword: () => void;
	postfixNode?: ReactNode;
	reverseLayout: boolean;
}) => {
	const { tw } = useMobileUIConfigOptions();
	const isClearableVisible = !disabled && isClearable && (inputValue || alwaysShowClearIcon);
	const isVisible = isClearableVisible || isPasswordField || Icon || postfixNode;

	const endIconsStyles = styles.postfixArea(reverseLayout, disabled);

	return (
		isVisible && (
			<View style={tw`${endIconsStyles.container}`}>
				{isClearableVisible && (
					<Pressable
						onPress={(e) => {
							onClear();
							e.stopPropagation();
							e.preventDefault();
						}}
						hitSlop={10}
					>
						{({ pressed }) => (
							<AgCloseCrossLargeIcon height={18} width={18} style={tw`${endIconsStyles.clearIcon(pressed)}`} />
						)}
					</Pressable>
				)}
				{isPasswordField && (
					<View>
						<PasswordIcon disabled={disabled} showPassword={showPassword} onChangeShowPassword={onChangeShowPassword} />
					</View>
				)}
				{Icon && !isPasswordField && (
					<Pressable onPress={disabled ? undefined : onIconClick} hitSlop={10}>
						{({ pressed }) => <Icon height={18} width={18} style={tw`${endIconsStyles.endIcon(pressed, hasErrors)}`} />}
					</Pressable>
				)}
				{!!postfixNode && postfixNode}
			</View>
		)
	);
};
