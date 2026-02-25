import { FieldValues, ICommonFieldProps, IMultiTextFieldProps, useReactFormController } from '@devkit/utilities';
import { FormFieldErrors } from '../FormFieldErrors';
import { FormInputGroup } from '../FormInputGroup';
import { TextField } from '../TextField';

const MultiTextField = <TForm extends FieldValues, TValue extends string>(
	props: IMultiTextFieldProps<TForm, TValue>
) => {
	const { extraLabels, isRequired, label, popover, popoverVariant, regex, mask, layoutClassName, reserveLabelSpacing } =
		props;

	const {
		onChange: onStartTextChange,
		onBlur: onStartTextBlur,
		errors: startTextErrors,
		hasErrors: startTextHasError,
	} = useReactFormController({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		...(props as ICommonFieldProps<string | undefined, any>),
		field: props.field ? `${props.field}.startText` : undefined,
	});

	const {
		onChange: onEndTextChange,
		onBlur: onEndTextBlur,
		errors: endTextErrors,
		hasErrors: endTextHasError,
	} = useReactFormController({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		...(props as ICommonFieldProps<string | undefined, any>),
		field: props.field ? `${props.field}.endText` : undefined,
	});

	return (
		<FormInputGroup
			layoutClassName={layoutClassName}
			label={label}
			isRequired={isRequired}
			popover={popover}
			popoverVariant={popoverVariant}
			reserveLabelSpacing={reserveLabelSpacing}
		>
			<div className="flex items-center flex-1 w-full gap-1">
				<TextField
					hasErrors={startTextHasError}
					onBlur={onStartTextBlur}
					onChange={onStartTextChange}
					regex={regex}
					mask={mask}
				/>
				<span>{extraLabels?.to ?? 'To'}</span>
				<TextField
					hasErrors={endTextHasError}
					onBlur={onEndTextBlur}
					onChange={onEndTextChange}
					regex={regex}
					mask={mask}
				/>
			</div>
			<section className={`flex justify-between gap-1 w-full ${startTextErrors || endTextErrors ? '' : 'hidden'}`}>
				<div className="flex-1">
					<FormFieldErrors errors={startTextErrors}></FormFieldErrors>
				</div>
				<div className="invisible"> {extraLabels?.to ?? 'To'}</div>
				<div className="flex-1">
					<FormFieldErrors errors={endTextErrors}></FormFieldErrors>
				</div>
			</section>
		</FormInputGroup>
	);
};

export default MultiTextField;
