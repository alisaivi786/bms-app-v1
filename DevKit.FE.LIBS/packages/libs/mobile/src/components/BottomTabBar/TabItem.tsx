import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import styles from './BottomTabBar.styles';

export interface TabItemProps {
	label: string;
	icon: React.ReactElement;
	onPress: () => void;
	isActive: boolean;
	tabWidth: number;
	labelColor: string;
	accessibilityLabel?: string;
	accessible?: boolean;
}

export function TabItem({
	label,
	icon,
	onPress,
	isActive,
	tabWidth,
	labelColor,
	accessibilityLabel,
	accessible = true,
}: TabItemProps) {
	const { tw } = useMobileUIConfigOptions();

	return (
		<TouchableOpacity
			style={tw.style(styles.tab)}
			onPress={onPress}
			activeOpacity={0.7}
			accessible={accessible}
			accessibilityLabel={accessibilityLabel || `${label} tab${isActive ? ', selected' : ''}`}
			accessibilityRole="tab"
			accessibilityState={{ selected: isActive }}
		>
			<View style={[tw.style(styles.iconLabelContainer), { width: tabWidth }]}>
				{icon && <View style={tw.style(styles.iconAnimated)}>{icon}</View>}
				<View style={tw.style(styles.labelAnimated)}>
					<Text style={[tw.style(styles.activeLabel), { color: labelColor }]}>{label}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}
