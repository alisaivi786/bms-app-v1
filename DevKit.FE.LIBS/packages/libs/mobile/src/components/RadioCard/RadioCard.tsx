import { useId } from 'react';
import { Text, View } from 'react-native';
import {
	FieldValues,
	ICommonFieldProps,
	RadioCardFieldProps,
	RadioCardOption,
	RadioCardVariant,
	useReactFormController,
} from '@devkit/utilities';
import { useDimensions } from '../../hooks/useDimensions';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { FormFieldErrors } from '../FormFieldErrors';
import { FormInputGroup } from '../FormInputGroup';
import classNames from './RadioCard.styles';
import { RadioCardItem } from './RadioCardItem';

export interface RadioCardProps<TForm extends FieldValues = never> extends RadioCardFieldProps<TForm, number | string> {
	className?: string;
	variant?: RadioCardVariant;
}

export function RadioCard<TForm extends FieldValues>(props: RadioCardProps<TForm>) {
	const {
		cards,
		form,
		field,
		label,
		isRequired,
		popover,
		popoverVariant,
		description,
		onChange,
		layoutClassName,
		reserveLabelSpacing,
		direction,
		size,
		variant = 'primary',
	} = props;

	const {
		onChange: onFormChange,
		value,
		hasErrors,
		errors,
		formId,
	} = useReactFormController(props as ICommonFieldProps<number | string, TForm>);
	const { isPortrait } = useDimensions();

	const isReactForm = form && field;

	const onClick = (card: RadioCardOption<number | string>) => {
		const internalOnChange = isReactForm ? onFormChange : onChange;

		if (value === card.id || !internalOnChange) return;

		internalOnChange(card.id);
	};

	const dir = direction ? direction : isPortrait ? 'col' : 'row';
	const groupName = useId();
	const { tw } = useMobileUIConfigOptions();

	return (
		<FormInputGroup
			label={label}
			isRequired={isRequired}
			popover={popover}
			popoverVariant={popoverVariant}
			layoutClassName={layoutClassName}
			reserveLabelSpacing={reserveLabelSpacing}
			formId={formId}
			hasErrors={hasErrors}
		>
			<View style={tw`${classNames.container(dir, variant)}`}>
				{cards.map((option) => (
					<RadioCardItem
						key={option.id}
						option={option}
						groupName={groupName}
						hasErrors={hasErrors}
						onClick={onClick}
						value={value}
						dir={dir}
						size={size}
						variant={variant}
					/>
				))}
			</View>
			{errors ? (
				<FormFieldErrors errors={errors} />
			) : (
				description && <Text style={tw`${classNames.descriptionClassNames}`}>{description}</Text>
			)}
		</FormInputGroup>
	);
}
