import { useEffect, useRef, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { RadioButtonOption } from '@devkit/utilities';
import { RadioBoxSize } from '@devkit/utilities/src/types';
import { useMobileUIConfigOptions } from '../../layouts';
import classNames from './RadioButton.styles';

export type RadioButtonProps<TID extends string | number> = RadioButtonOption<TID> & {
	onChange: (value: TID | undefined) => void;
	hasErrors?: boolean;
	value?: TID;
	size?: RadioBoxSize;
	highlighted?: boolean;
	widthFull?: boolean;
	hasAnyHighlighted?: boolean;
};

export function RadioButton<TID extends string | number>(props: RadioButtonProps<TID>) {
	const {
		id,
		label,
		disabled,
		onChange,
		hasErrors = false,
		value,
		size = 'x-small',
		highlighted,
		widthFull,
		hasAnyHighlighted,
	} = props;
	const { tw } = useMobileUIConfigOptions();
	const [effect, setEffect] = useState(false);
	const containerRef = useRef<View>(null);
	const bubbleScale = useRef(new Animated.Value(1)).current;
	const bubbleOpacity = useRef(new Animated.Value(0.3)).current;
	const isChecked = id === value;

	useEffect(() => {
		if (effect) {
			bubbleScale.setValue(1);
			bubbleOpacity.setValue(0.3);

			Animated.parallel([
				Animated.timing(bubbleScale, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(bubbleOpacity, {
					toValue: 0,
					duration: 500,
					useNativeDriver: true,
				}),
			]).start(() => setEffect(false));
		}

		return () => {
			bubbleScale.stopAnimation();
			bubbleOpacity.stopAnimation();
		};
	}, [effect, bubbleScale, bubbleOpacity]);

	return (
		<TouchableOpacity
			testID={`radio-button-container-${id}`}
			style={tw`${classNames.getRadioContainerStyles(highlighted, widthFull, hasAnyHighlighted)} ${
				widthFull ? 'w-full' : ''
			}`}
			disabled={disabled}
			onPress={() => {
				if (!disabled) {
					onChange(id);
					setEffect(true);
				}
			}}
			activeOpacity={1}
		>
			<View style={tw`${classNames.getLabelContainerStyles(size)}`}>
				<View style={tw`${classNames.getRadioButtonWrapperStyles()}`}>
					{effect && (
						<Animated.View
							testID={`radio-button-bubble-${id}`}
							style={[
								tw`${classNames.getBubbleStyles(size, hasErrors)}`,
								{
									transform: [{ scale: bubbleScale }],
									opacity: bubbleOpacity,
								},
							]}
						/>
					)}
					<View
						ref={containerRef}
						testID={`radio-button-${id}`}
						style={tw`${classNames.getRadioButtonStyles(size, isChecked, hasErrors, disabled)}`}
					>
						{isChecked && (
							<View
								testID={`radio-button-check-icon-${id}`}
								style={tw`${classNames.getCheckIconStyles(size, hasErrors)}`}
							/>
						)}
					</View>
				</View>
				{typeof label === 'string' ? (
					<Text style={tw`${classNames.getLabelStyles(size, disabled)}`} numberOfLines={10} ellipsizeMode="tail">
						{label}
					</Text>
				) : (
					<View style={[tw`${disabled ? 'opacity-30' : ''}`, { flex: 1 }]}>{label}</View>
				)}
			</View>
		</TouchableOpacity>
	);
}
