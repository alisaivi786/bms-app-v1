'use client';
import { useId } from 'react';
import { FieldValues, ICommonFieldProps, RadioButtonFieldProps, useReactFormController } from '@devkit/utilities';
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

	const { onChange, value, hasErrors, errors, formId } = useReactFormController(props as ICommonFieldProps<TID, TForm>);
	const groupName = useId();

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
			<div className={classNames.container} style={{ gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr)` }}>
				{options?.map((radio, index) => (
					<RadioButton
						key={`${index}${radio.id}`}
						{...{ ...radio, value, hasErrors, onChange, size }}
						disabled={disabled}
						groupName={groupName}
						highlighted={radio.highlighted}
					/>
				))}
			</div>
			{errors ? (
				<FormFieldErrors errors={errors} />
			) : (
				description && <p className={classNames.descriptionClassNames}>{description}</p>
			)}
		</FormInputGroup>
	);
}
