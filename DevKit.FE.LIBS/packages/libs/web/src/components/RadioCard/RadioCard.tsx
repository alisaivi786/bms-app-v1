import { useId } from 'react';
import {
	FieldValues,
	ICommonFieldProps,
	RadioCardFieldProps,
	RadioCardOption,
	useReactFormController,
} from '@devkit/utilities';
import { useResponsiveView } from '../../hooks/useResponsiveView';
import { FormFieldErrors } from '../FormFieldErrors';
import { FormInputGroup } from '../FormInputGroup';
import classNames from './RadioCard.styles';
import { RadioCardItem } from './RadioCardItem';

export interface RadioCardProps<TForm extends FieldValues = never> extends RadioCardFieldProps<TForm, number | string> {
	className?: string;
}

export function RadioCard<TForm extends FieldValues>(props: RadioCardProps<TForm>) {
	const { sm: isMobile } = useResponsiveView();
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
		size = 'medium',
		columnsCount,
		testId,
		variant = 'primary',
	} = props;

	const {
		onChange: onFormChange,
		value,
		hasErrors,
		errors,
		formId,
	} = useReactFormController(props as ICommonFieldProps<number | string, TForm>);

	const isReactForm = form && field;

	const onClick = (card: RadioCardOption<number | string>) => {
		const internalOnChange = isReactForm ? onFormChange : onChange;

		value === card.id ? internalOnChange?.(undefined) : internalOnChange?.(card.id);
	};

	const dir = direction ? direction : isMobile ? 'col' : 'row';
	const groupName = useId();

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
			<div className={classNames.container(dir, columnsCount, variant, size)} data-testid={testId}>
				{cards.map((option) => (
					<RadioCardItem
						key={option.id}
						option={option}
						groupName={groupName}
						hasErrors={hasErrors}
						onClick={onClick}
						value={value}
						size={size}
						variant={variant}
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
