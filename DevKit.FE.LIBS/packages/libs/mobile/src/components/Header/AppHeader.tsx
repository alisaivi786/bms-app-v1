import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useMobileUIConfigOptions } from '../../layouts';
import styles from './AppHeader.styles';
import { AppHeaderProps } from './AppHeader.types';

export const AppHeaderComponent = ({
	leftIcon,
	onLeftPress,
	primaryText,
	secondaryText,
	centerComponent,
	title,
	rightComponents = [],
}: AppHeaderProps) => {
	const { tw } = useMobileUIConfigOptions();
	const hasPrimaryText = !!primaryText;
	const hasCenterComponent = !!centerComponent;

	return (
		<View testID="header" style={tw`${styles.container}`}>
			<View style={tw`${styles.leftSection}`}>
			{leftIcon && (
				<Pressable testID="back-button" onPress={onLeftPress} hitSlop={10} accessibilityRole="button" style={tw`${styles.iconWrapper}`}>
					{leftIcon}
				</Pressable>
			)}
		</View>

			<View style={tw`${styles.centerSection(hasPrimaryText)}`}>
				{hasPrimaryText && (
					<View style={{ marginLeft: 8 }}>
						{secondaryText && <Text style={tw`${styles.welcomeText}`}>{secondaryText}</Text>}
						{typeof primaryText === 'string' ? <Text style={tw`${styles.nameText}`}>{primaryText}</Text> : primaryText}
					</View>
				)}
			{!hasPrimaryText && hasCenterComponent && centerComponent}
			{!hasPrimaryText && !hasCenterComponent && title && <Text testID="header-title" style={tw`${styles.titleText}`}>{title}</Text>}
			</View>

			<View style={tw`${styles.rightSection}`}>
				{rightComponents.map((item, index) => (
					<Pressable
						key={index}
						onPress={item.onPress}
						hitSlop={10}
						accessibilityRole="button"
						style={tw`${styles.iconWrapper}`}
					>
						{item.icon}
					</Pressable>
				))}
			</View>
		</View>
	);
};
