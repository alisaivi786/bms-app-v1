import { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useReactFormController } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts';
import { Switch } from './Switch';

export type ToggleSwitchProps = {
	/** The value of the toggle whither it's true or false */
	isChecked: boolean;
	/**	Callback fired when the state changes. */
	onChange: (val: boolean) => void;
	/** Disable the switch */
	disabled?: boolean;
	/** Error in the Switch */
	hasError?: boolean;
	/** Label the switch */
	label?: string;
	/**	Size of the switch. Default is 'md' */
	size?: 'md' | 'lg';
};

export const ToggleSwitch = (props: ToggleSwitchProps) => {
	const { tw, customColors, reverseLayout } = useMobileUIConfigOptions();

	const { disabled = false, label, hasError, onChange, isChecked = false, size } = props;

	const {
		value: isFormValueChecked = false,
		onChange: onFormChange,
		hasErrors,
	} = useReactFormController({
		...props,
		value: isChecked,
		onChange: (isChecked = false) => onChange?.(isChecked),
		hasErrors: hasError,
	});

	const getScale = useCallback(() => (size === 'lg' ? 0.8 : 0.6), [size]);

	const activeColor = useMemo(
		() => (hasErrors ? tw.color('red-500') : customColors?.['toggle-active'] ?? tw.color('brand-600')),
		[customColors, hasErrors, tw]
	);

	const inActiveColor = useMemo(
		() => (hasErrors ? tw.color('red-200') : customColors?.['toggle-inActive'] ?? tw.color('gray-200')),
		[customColors, hasErrors, tw]
	);

	return (
		<View style={tw.style('flex-row items-center', reverseLayout && 'flex-row-reverse')}>
			<Switch
				trackColor={{
					inActive: inActiveColor,
					active: activeColor,
				}}
				thumbColor={tw.color('white')}
				value={isFormValueChecked}
				onValueChange={() => onFormChange(!isFormValueChecked)}
				disabled={disabled}
				hasErrors={hasErrors}
				style={{
					transform: [{ scaleX: getScale() }, { scaleY: getScale() }],
					borderWidth: hasErrors ? 2 : 0,
					borderColor: tw.color(hasErrors ? 'red-500' : 'brand-600'),
				}}
			/>

			{label && <Text>{label}</Text>}
		</View>
	);
};
