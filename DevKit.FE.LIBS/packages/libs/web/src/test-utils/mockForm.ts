import { FieldValues, ReactForm } from '@devkit/utilities';

function mockForm<T extends FieldValues>() {
	const form: ReactForm<T> = {
		disableSubmit: false,
		formId: 'formId',
		fieldsErrors: {},
		isSubmitting: false,
		submitForm: jest.fn(),
		resetForm: jest.fn(),
		setFieldValue: jest.fn(),
		touchedFields: {},
		dirtyFields: {},
		getValues: jest.fn(),
		watchValues: jest.fn(),
		setFieldTouched: jest.fn(),
		setFieldTouchedDeep: jest.fn(),
		getFieldState: jest.fn(),
		useFieldArray: jest.fn(),
		setFieldError: jest.fn(),
		validateField: jest.fn(),
		resetTouchedField: jest.fn(),
		isDirty: false,
		setFieldsValue: jest.fn(),
	};

	return form;
}

export default mockForm;
