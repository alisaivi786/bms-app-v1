import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { useMobileUIConfigOptions } from '../../layouts';
import styles from './ProgressBar.styles';
import { ProgressBarProps } from './ProgressBar.types';

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, size = 'medium' }) => {
	const { tw } = useMobileUIConfigOptions();
	const safeProgress = Math.min(Math.max(progress, 0), 100);
	const bubbleLeft = Dimensions.get('screen').width * (safeProgress / 110);
	const gradientColors = [tw.color('green-300'), tw.color('blue-500')] as string[];

	return (
		<View style={tw`${styles.getContainerStyle()}`}>
			<View style={tw`${styles.getBarStyles(size)} rounded-full`}>
				<LinearGradient
					colors={gradientColors}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={[tw`${styles.getFillBaseStyles(size)}`, { width: `${safeProgress}%` }]}
				/>
			</View>
			<View style={[tw`${styles.getLabelContainerStyles()}`, { left: bubbleLeft }]}>
				<Text style={tw`${styles.getLabelTextStyles()}`}>{safeProgress}%</Text>
			</View>
		</View>
	);
};
