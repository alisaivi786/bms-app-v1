'use client';

import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import has from 'lodash/has';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import set from 'lodash/set';
import unset from 'lodash/unset';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
	ArrayPath,
	DeepPartial,
	DefaultValues,
	FieldErrors,
	FieldValues,
	Path,
	UseFormSetValue,
	useFieldArray,
	useForm,
} from 'react-hook-form';
import { useAppPlatformContextOptions } from '../../factories/AppContextFactory/context-factory';
import {
	IRTKQuerySerializedError,
	IResponseError,
	IResponseErrors,
	IResponseErrorsArray,
} from '../../types/shared-types';
import { useErrorsResponseTransform } from '../useErrorsResponseTransform';
import { ReactForm, ReactFormOptions } from './types';
import useValidationResolver from './useValidationResolver';

export const useReactForm = <T extends FieldValues>(options: ReactFormOptions<T>): ReactForm<T> => {
	const {
		initialValues,
		currentValues,
		onFormSubmit,
		onFormReset,
		serverMessageLocalizationKey,
		validateBehavior,
		initialErrors,
		onSubmitThrowErrors,
	} = options;

	const { locale, translate } = useAppPlatformContextOptions();
	const resolver = useValidationResolver<T>(options, locale, translate);
	const formId = useId();

	const {
		formState: { isValid, isSubmitting, errors, touchedFields, dirtyFields, isDirty },
		reset,
		watch,
		setValue,
		getValues,
		control,
		getFieldState,
		handleSubmit,
		trigger,
		setError,
	} = useForm<T>({
		defaultValues: initialValues as DefaultValues<T> | undefined,
		resolver,
		values: currentValues,
	});

	const initialized = useRef(false);

	const { getErrorMessages } = useErrorsResponseTransform(serverMessageLocalizationKey, true);
	const [additionalErrors, setAdditionalErrorsState] = useState<FieldErrors<T>>({});
	const additionalErrorsRef = useRef<FieldErrors<T>>({});
	const isValidForm = () => isValid && isEmpty(additionalErrorsRef.current);

	const setAdditionalErrors = (nextState: FieldErrors<T> | ((prevState: FieldErrors<T>) => FieldErrors<T>)) => {
		// using ref with state is need to handle cases like setFieldError and submitForm in the same function to not waite state render
		if (typeof nextState === 'function') {
			additionalErrorsRef.current = nextState(additionalErrorsRef.current);
			setAdditionalErrorsState(nextState);
		} else {
			additionalErrorsRef.current = nextState;
			setAdditionalErrorsState(nextState);
		}
	};

	const onSubmitForm = async () => {
		let errors: IResponseError[] | FieldErrors<T> | undefined = undefined;

		await handleSubmit(
			async (formValues) => {
				//in case additional errors are visible
				if (!isEmpty(additionalErrorsRef.current)) return;

				const values = cloneDeep(formValues);

				try {
					await onFormSubmit?.(values);
				} catch (ex) {
					if (onSubmitThrowErrors) {
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						errors = ex as any;
					} else {
						errors = getErrorMessages(
							ex as IResponseErrors | IResponseErrorsArray | IRTKQuerySerializedError | undefined
						);

						errors.map((error) => {
							const fieldPath = error.field as Path<T>;

							if (error.field) {
								setValue(fieldPath, getValues(fieldPath), { shouldTouch: true });
								onSetFieldError(fieldPath, error.message);
							}
						});
					}
				}
			},
			(fieldErrors) => {
				if (onSubmitThrowErrors) {
					errors = fieldErrors;
				}

				Object.keys(fieldErrors).forEach((key) => {
					onFieldTouchedDeep(key as Path<T>);
				});
			}
		)();

		if (errors) throw errors;
	};

	const onResetForm = async (defaultValues?: T) => {
		setAdditionalErrors({});
		reset(defaultValues ?? initialValues);

		await onFormReset?.();
	};

	const onResetTouchedField = (field: Path<T>) => {
		const isTouched = getFieldState(field).isTouched;

		if (isTouched) {
			unset(control._formState.touchedFields, field);
			control._updateFormState(control._formState);
		}
	};

	const onSetFieldValue: UseFormSetValue<T> = useCallback(
		(field, value) => {
			onResetTouchedField(field);

			if (has(additionalErrorsRef.current, field)) onSetFieldError(field, undefined);

			const hasError = get(additionalErrors, field);

			if (hasError) {
				setAdditionalErrors((prev) => {
					unset(prev, field);

					return prev;
				});
			}
			setValue(field, value, {
				shouldDirty: true,
				shouldTouch: false,
				shouldValidate: true,
			});
		},
		[setValue]
	);

	const onSetFieldsValue = (values: DeepPartial<T>) => {
		const keys = Object.keys(values);

		keys.forEach((key) => {
			onSetFieldValue(key as Path<T>, values[key]);
		});
	};

	const onFieldTouched = (field: Path<T>) => {
		const fieldValue = getValues(field);

		setValue(field, fieldValue, {
			shouldTouch: true,
		});
	};

	const onFieldTouchedDeep = (startPath: Path<T>) => {
		const fieldErrors = onGetFieldState(startPath).error;
		const errorKeys = typeof fieldErrors === 'object' ? Object.keys(fieldErrors) : [];

		const hasInnerObjects = errorKeys.some((errorValueKey) => {
			return typeof fieldErrors?.[errorValueKey as keyof typeof fieldErrors] === 'object';
		});

		if (!hasInnerObjects) {
			onFieldTouched(startPath);

			return;
		}

		errorKeys.forEach((errorKey) => {
			const errorsValue = fieldErrors?.[errorKey as keyof typeof fieldErrors];

			if (Array.isArray(errorsValue)) {
				errorsValue.forEach((_, index) => {
					onFieldTouchedDeep(`${startPath}.${errorKey}.${index}` as Path<T>);
				});
			} else {
				onFieldTouchedDeep(`${startPath}.${errorKey}` as Path<T>);
			}
		});
	};

	const onGetFieldState = (field: Path<T>) => {
		return getFieldState(field);
	};

	const useReactFormFieldArray = <TKeyName extends ArrayPath<T>>(field: TKeyName) => {
		return useFieldArray({ name: field, control });
	};

	const onSetFieldError = useCallback(
		(field: Path<T>, error: undefined | string | { type: string; message: string }) => {
			if (error) onFieldTouched(field);

			setAdditionalErrors((prev) => {
				if (error) {
					set(prev, field, typeof error === 'object' ? error : { type: 'CustomError', message: error });
				} else {
					let tempField: Path<T> = field;

					unset(prev, tempField);
					do {
						tempField = tempField.substring(0, tempField.lastIndexOf('.')) as Path<T>;

						if (!isEmpty(get(prev, tempField))) {
							break;
						}

						unset(prev, tempField);
					} while (tempField.includes('.'));
				}

				return prev;
			});

			if (error) trigger(field);
			else setError(field, { message: undefined });
		},
		[setError]
	);
	const onValidateField = async (field: Path<T>) => {
		await trigger(field as Path<T>);
		const { error } = getFieldState(field);

		return error;
	};

	if (!initialized.current) {
		initialized.current = true;

		if (initialErrors) {
			Object.keys(initialErrors).map((k) => {
				onSetFieldError(k as Path<T>, initialErrors[k] as unknown as string);
			});
		}
	}

	useEffect(() => {
		trigger();
	}, [translate]);

	return {
		disableSubmit: !isValidForm(),
		fieldsErrors: merge(errors, additionalErrors),
		isSubmitting,
		submitForm: onSubmitForm,
		resetForm: onResetForm,
		setFieldValue: onSetFieldValue,
		touchedFields,
		dirtyFields,
		watchValues: watch,
		getValues,
		setFieldTouched: onFieldTouched,
		setFieldTouchedDeep: onFieldTouchedDeep,
		getFieldState: onGetFieldState,
		useFieldArray: useReactFormFieldArray,
		setFieldError: onSetFieldError,
		validateField: onValidateField,
		resetTouchedField: onResetTouchedField,
		isDirty,
		setFieldsValue: onSetFieldsValue,
		validateBehavior,
		formId,
	};
};
