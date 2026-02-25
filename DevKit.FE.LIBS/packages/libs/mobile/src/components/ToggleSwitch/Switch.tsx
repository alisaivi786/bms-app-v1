import React, { FC, useEffect, useRef } from 'react';
import { Animated, Platform, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { useMobileUIConfigOptions } from '../../layouts';

type TrackColor = {
	active?: string;
	inActive?: string;
};

type SwitchProps = {
	value: boolean;
	onValueChange: (newValue: boolean) => void;
	disabled: boolean;
	trackColor: TrackColor;
	thumbColor?: string;
	style?: StyleProp<ViewStyle>;
	hasErrors?: boolean;
};

export const Switch: FC<SwitchProps> = ({
	value,
	onValueChange,
	disabled,
	trackColor,
	thumbColor,
	hasErrors,
	style,
}) => {
	const { tw, isRtlLocale, reverseLayout } = useMobileUIConfigOptions();

	const animation = useRef(new Animated.Value(value ? 1 : 0)).current;

	useEffect(() => {
		Animated.timing(animation, {
			toValue: value ? 1 : 0,
			duration: 300,
			useNativeDriver: true,
		}).start();
	}, [value, animation]);

	const translateX = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [
			isRtlLocale && !reverseLayout ? -4 : 4,
			(Platform.OS === 'ios' ? 33 : 32) * (reverseLayout ? 1 : isRtlLocale ? -1 : 1),
		],
	});

	const backgroundColor = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [trackColor?.inActive as string, trackColor?.active as string],
	});

	const handlePress = () => {
		if (!disabled) {
			onValueChange(!value);
		}
	};

	return (
		<TouchableOpacity onPress={handlePress} activeOpacity={1}>
			<Animated.View
				style={[
					tw`flex-row items-center w-17 h-10 rounded-full border-2 p-${hasErrors ? '0' : '0.5'}`,
					{ backgroundColor },
					style,
				]}
			>
				<Animated.View
					style={[
						tw`w-7 h-7 rounded-full`,
						{
							backgroundColor: thumbColor,
							transform: [{ translateX }],
						},
					]}
				/>
			</Animated.View>
		</TouchableOpacity>
	);
};
