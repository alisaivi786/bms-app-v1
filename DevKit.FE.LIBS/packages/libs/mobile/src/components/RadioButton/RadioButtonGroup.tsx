import { StyleSheet, Text, View } from 'react-native';
import { FieldValues, ICommonFieldProps, RadioButtonFieldProps, useReactFormController } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts';
import { FormFieldErrors } from '../FormFieldErrors';
import { FormInputGroup } from '../FormInputGroup';
import { RadioButton } from './RadioButton';
import classNames from './RadioButton.styles';

export function RadioButtonGroup<TForm extends FieldValues, TID extends number | string>(
	props: RadioButtonFieldProps<TForm, TID>
) {
	const {
		label: formLabel,
		isRequired,
		popover,
		popoverVariant,
		layoutClassName,
		reserveLabelSpacing,
		description,
		options,
		size = 'x-small',
		columnsCount = 1,
		disabled,
	} = props;

	const { tw } = useMobileUIConfigOptions();
	const { onChange, value, hasErrors, errors, formId } = useReactFormController(props as ICommonFieldProps<TID, TForm>);

	const hasAnyHighlighted = options?.some((option) => option.highlighted === true);

	const styles = StyleSheet.create({
		radioItem: {
			width: `${100 / columnsCount}%`,
		},
	});

	return (
		<FormInputGroup
			label={formLabel}
			isRequired={isRequired}
			popover={popover}
			popoverVariant={popoverVariant}
			layoutClassName={layoutClassName}
			reserveLabelSpacing={reserveLabelSpacing}
			formId={formId}
			hasErrors={hasErrors}
		>
			<View style={tw`${classNames.getRadioButtonGroupContainerStyles()}`}>
				{options?.map((radio, index) => (
					<View
						key={`${index}${radio.id}`}
						style={[tw`${classNames.getRadioButtonGroupItemStyles()}`, styles.radioItem]}
					>
						<RadioButton
							{...{ ...radio, value, hasErrors, onChange, size }}
							disabled={disabled}
							highlighted={radio.highlighted}
							hasAnyHighlighted={hasAnyHighlighted}
						/>
					</View>
				))}
			</View>
			{errors ? (
				<FormFieldErrors errors={errors} />
			) : (
				description && <Text style={tw`${classNames.getRadioButtonGroupDescriptionStyles()}`}>{description}</Text>
			)}
		</FormInputGroup>
	);
}
