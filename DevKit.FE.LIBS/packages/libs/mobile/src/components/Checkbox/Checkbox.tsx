import { Text, View } from 'react-native';
import { CheckedIcon, MinusIcon } from '@devkit/icons/native';
import { CheckBoxFieldProps, FieldValues, useReactFormController } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import styles from './checkbox.styles';
import { PressableOpacity } from './components/PressableOpacity';

export type TCheckboxProps<TForm extends FieldValues> = CheckBoxFieldProps<TForm>;

export const Checkbox = <TForm extends FieldValues = FieldValues>(props: TCheckboxProps<TForm>) => {
	const { tw } = useMobileUIConfigOptions();

	const { disabled = false, label, isIndeterminate = false, hasError, onChange, isChecked = false, size } = props;

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

	const handleToggle = () => {
		if (!disabled) {
			onFormChange?.(!isFormValueChecked);
		}
	};

	return (
		<View style={tw`${styles.checkboxContainer}`}>
			<PressableOpacity onChange={handleToggle} checked={isFormValueChecked} disabled={disabled}>
				<View style={tw`${styles.checkbox(isFormValueChecked, disabled, hasErrors, isIndeterminate, size)}`}>
					{isFormValueChecked && (
						<CheckedIcon
							width={styles.iconDimension(size)}
							height={styles.iconDimension(size)}
							style={tw`${styles.iconStyling(isIndeterminate, size)}`}
						/>
					)}
					{isIndeterminate && (
						<MinusIcon
							width={styles.iconDimension(size)}
							height={styles.iconDimension(size)}
							style={tw`${styles.iconStyling(isIndeterminate, size)}`}
						/>
					)}
				</View>
			</PressableOpacity>

			{label && (
				<PressableOpacity checked={isFormValueChecked} onChange={handleToggle} disabled={disabled}>
					<Text style={tw`${styles.checkboxLabel(size)}`}>{label}</Text>
				</PressableOpacity>
			)}
		</View>
	);
};
