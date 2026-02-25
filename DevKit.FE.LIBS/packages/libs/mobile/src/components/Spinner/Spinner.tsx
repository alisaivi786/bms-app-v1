import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import styles from './Spinner.styles';
import { ISpinnerProps } from './types';

export const Spinner = ({ size, borderWidth, variant = 'primary', state }: ISpinnerProps) => {
	let realSize = 0;
	const movingValue = useRef(new Animated.Value(0)).current;
	const interpolated = movingValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

	useEffect(() => {
		Animated.loop(
			Animated.timing(movingValue, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
				easing: Easing.linear,
			})
		).start();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	switch (size) {
		case 'large':
			realSize = 16;

			break;
		case 'small':
			realSize = 14;

			break;
		default:
			if (typeof size === 'number') {
				realSize = size;

				break;
			}
			realSize = 14;
	}

	return (
		<Animated.View
			style={[
				styles.spinnerStyle(variant, state, borderWidth ?? 2, realSize),
				{
					transform: [{ rotate: interpolated }],
				},
			]}
		/>
	);
};
