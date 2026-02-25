'use client';

import { FieldValues } from 'react-hook-form';
import { useAppPlatformContextOptions } from '../../factories/AppContextFactory/context-factory';
import { ICommonFieldProps } from '../../types';
import { translateErrors } from './util';

export type ReactFormControllerProps<TValue, TForm extends FieldValues> = Pick<
	ICommonFieldProps<TValue, TForm>,
	'field' | 'form' | 'onChange' | 'onBlur' | 'value' | 'errors' | 'hasErrors' | 'formId'
>;

export const useReactFormController = <TValue, TForm extends FieldValues>({
	field,
	form,
	onChange,
	onBlur,
	value,
	errors,
	hasErrors,
	formId: propsFormId,
}: ReactFormControllerProps<TValue, TForm>) => {
	const { translate } = useAppPlatformContextOptions();
	const isReactForm = field && form;

	const fieldValue = isReactForm ? (form.watchValues(field) as TValue) : value;
	const { error, isTouched } = isReactForm ? form.getFieldState(field) : { isTouched: undefined, error: undefined };
	const fieldErrors = isReactForm && isTouched ? error?.message : errors;
	const fieldHasError = isReactForm && fieldErrors ? true : hasErrors || !!fieldErrors;

	const formId = isReactForm ? form.formId : propsFormId;

	const onFieldChange = (value: TValue | undefined) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if (isReactForm) form.setFieldValue(field, value as any);

		onChange?.(value);
	};

	const onFieldBlur = () => {
		setTimeout(() => {
			if (isReactForm) {
				form.validateField(field);

				if (form.validateBehavior !== 'on-submit') {
					form.setFieldTouched(field);
				}
			}
			onBlur?.();
		});
	};

	const onResetFieldTouch = () => {
		if (isReactForm && isTouched) {
			form.resetTouchedField(field);
		}
	};

	const onSetError = (error: string | undefined) => {
		if (isReactForm) {
			form.setFieldError(field, error);
		}
	};

	return {
		onChange: onFieldChange,
		value: fieldValue,
		hasErrors: fieldHasError,
		onBlur: onFieldBlur,
		errors: translateErrors(fieldErrors, translate),
		resetFieldTouch: onResetFieldTouch,
		onSetError,
		formId,
	};
};
