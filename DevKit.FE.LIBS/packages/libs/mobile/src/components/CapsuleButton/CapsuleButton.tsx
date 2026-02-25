import { isValidElement } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { CapsuleButtonFieldProps, FieldValues, StringAndNumberKeys, useReactFormController } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { FormFieldErrors } from '../FormFieldErrors';
import { FormInputGroup } from '../FormInputGroup';
import styles from './CapsuleButton.styles';

export const CapsuleButton = <TValue, TKey extends StringAndNumberKeys<TValue>, TForm extends FieldValues>(
	props: CapsuleButtonFieldProps<TValue, TKey, TForm>
) => {
	const {
		options,
		valueKey,
		labelKey,
		size = 'small',
		variant = 'gray',
		overflowWrap = 'wrap',
		multiSelect = false,
		selected,
		label,
		description,
		isRequired,
		popover,
		popoverVariant,
		layoutClassName,
		reserveLabelSpacing,
		disabled = false,
		onChange,
		minWidth,
	} = props;

	const { tw } = useMobileUIConfigOptions();
	const {
		onChange: onFormChange,
		value: formValue,
		hasErrors,
		errors,
		formId,
	} = useReactFormController({
		...props,
		value: selected as TValue[TKey][],
		onChange: onChange as (value: TValue[TKey][] | undefined) => void,
	});

	const onPress = (optionValueKey: TValue[TKey]) => {
		if (multiSelect) {
			const selectedArray = Array.isArray(formValue) ? formValue : formValue ? [formValue] : [];
			const isCurrentlySelected = selectedArray.includes(optionValueKey);

			if (isCurrentlySelected) {
				// Remove from selection
				const newSelection = selectedArray.filter((item) => item !== optionValueKey);

				onFormChange?.(newSelection.length > 0 ? newSelection : undefined);
			} else {
				// Add to selection
				onFormChange?.([...selectedArray, optionValueKey]);
			}
		} else {
			// Original single select behavior
			const singleOnChange = onFormChange as (value: TValue[TKey] | undefined) => void;

			formValue === optionValueKey ? onFormChange?.(undefined) : singleOnChange?.(optionValueKey);
		}
	};

	const isOptionSelected = (optionValueKey: TValue[TKey]) => {
		if (multiSelect) {
			const selectedArray = Array.isArray(formValue) ? formValue : formValue ? [formValue] : [];

			return selectedArray.includes(optionValueKey);
		} else {
			// Original single select behavior - unchanged
			return formValue === optionValueKey;
		}
	};
	const renderButtons = () =>
		options.map((option) => {
			const isSelected = isOptionSelected(option[valueKey]);

			return (
				<Pressable
					key={`${option[valueKey]}`}
					style={[
						tw`${styles.button(size, isSelected, variant, disabled, hasErrors)}`,
						minWidth !== undefined ? { minWidth } : undefined,
					]}
					onPress={() => onPress(option[valueKey])}
					disabled={disabled}
				>
					<Text style={tw`${styles.label(size, isSelected, hasErrors)}`}>
						{isValidElement(option[labelKey]) ? option[labelKey] : `${option[labelKey]}`}
					</Text>
				</Pressable>
			);
		});

	return (
		<FormInputGroup
			isRequired={isRequired}
			label={label}
			popover={popover}
			popoverVariant={popoverVariant}
			layoutClassName={layoutClassName}
			reserveLabelSpacing={reserveLabelSpacing}
			formId={formId}
			hasErrors={hasErrors}
		>
			{overflowWrap === 'no-wrap' ? (
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={tw`${styles.containerScrollable}`}
					contentContainerStyle={tw`${styles.containerScrollableContent}`}
				>
					{renderButtons()}
				</ScrollView>
			) : (
				<View style={tw`${styles.container}`}>{renderButtons()}</View>
			)}
			{errors ? (
				<FormFieldErrors errors={errors} />
			) : (
				description && <Text style={tw`${styles.descriptionClassNames}`}>{description}</Text>
			)}
		</FormInputGroup>
	);
};
