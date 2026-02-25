import {
	ArrayPath,
	DeepMap,
	DeepPartial,
	FieldError,
	FieldErrors,
	FieldValues,
	Path,
	UseFieldArrayReturn,
	UseFormGetValues,
	UseFormSetValue,
	UseFormWatch,
} from 'react-hook-form';
import { AnyObjectSchema } from 'yup';
import { ZodSchema } from 'zod';

export type FormValidationModeZod<T> = {
	validation: ZodSchema | ((data: T) => ZodSchema);
	validationMode: 'zod';
};

export type FormValidationModeYup<T> = {
	validation?: AnyObjectSchema | ((data: T) => AnyObjectSchema);
	validationMode?: 'yup' | undefined;
};

export type ReactFormOptions<T extends FieldValues> = {
	initialValues: T;
	initialErrors?: FieldErrors<T>;
	currentValues?: T;
	onFormSubmit?: (values: T) => Promise<void> | void;
	onFormReset?: () => Promise<void> | void;
	serverMessageLocalizationKey?: string;
	validateBehavior?: 'on-submit' | 'on-blur';
	/**
	 * If true, the form will throw an error if the validation fails and will rethrow the onSubmit exceptions if any.
	 */
	onSubmitThrowErrors?: boolean;
} & (FormValidationModeZod<T> | FormValidationModeYup<T>);

export type ReactForm<T extends FieldValues> = {
	disableSubmit: boolean;
	fieldsErrors: FieldErrors<T>;
	isSubmitting: boolean;
	submitForm: () => Promise<void>;
	resetForm: (defaultValues?: T) => Promise<void>;
	setFieldValue: UseFormSetValue<T>;
	touchedFields: Partial<Readonly<DeepMap<DeepPartial<T>, boolean>>>;
	dirtyFields: Partial<Readonly<DeepMap<DeepPartial<T>, boolean>>>;
	getValues: UseFormGetValues<T>;
	watchValues: UseFormWatch<T>;
	setFieldTouched: (field: Path<T>) => void;
	setFieldTouchedDeep: (field: Path<T>) => void;
	getFieldState: (field: Path<T>) => {
		invalid: boolean;
		isDirty: boolean;
		isTouched: boolean;
		error?: FieldError | undefined;
	};
	useFieldArray: <TKeyName extends ArrayPath<T>>(field: TKeyName) => UseFieldArrayReturn<T, TKeyName, 'id'>;
	setFieldError: (field: Path<T>, error: undefined | string | { type: string; message: string }) => void;
	validateField: (field: Path<T>) => Promise<FieldError | FieldError[] | undefined>;
	resetTouchedField: (field: Path<T>) => void;
	isDirty: boolean;
	setFieldsValue: (values: DeepPartial<T>) => void;
	validateBehavior?: 'on-submit' | 'on-blur';
	formId: string;
};
