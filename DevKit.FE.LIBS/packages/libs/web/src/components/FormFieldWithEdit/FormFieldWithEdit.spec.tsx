import { FieldValues, FormFieldsSchema, ReactForm } from '@devkit/utilities';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import FormFieldWithEdit, { IFormFieldWithEdit, TButton } from './FormFieldWithEdit';

jest.mock('../DatePicker/date-picker-original.scss', () => jest.fn());
jest.mock('../DatePicker/date-picker.scss', () => jest.fn());

describe('FormFieldWithEdit Component', () => {
	const showEditFormMock = jest.fn();
	const hideEditFormMock = jest.fn();

	Date.now = jest.fn();

	const form: ReactForm<FieldValues> = {
		disableSubmit: false,
		submitForm: jest.fn(),
		fieldsErrors: {},
		isSubmitting: false,
		resetForm: jest.fn(),
		setFieldValue: jest.fn(),
		touchedFields: jest.fn(),
		dirtyFields: jest.fn(),
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
		formId: 'formId',
	};

	const fieldsStructure: FormFieldsSchema<FieldValues> = [
		{
			type: 'text',
			label: 'Field 1',
			field: '',
		},

		{
			type: 'number',
			label: 'Field 4',
			field: '',
		},
	];

	const buttonGroup: TButton[] = [
		{
			label: 'Save',
			onClick: jest.fn(),
			variant: 'primary',
		},
		{
			label: 'Cancel',
			variant: 'secondary',
			onClick: () => {
				hideEditFormMock();
			},
		},
	];

	const defaultProps: IFormFieldWithEdit<FieldValues> = {
		form,
		fieldsStructure,
		label: 'Test Field',
		value: 'Test Value',
		buttonGroup,
		isEditFormOpen: false,
		showEditForm: showEditFormMock,
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('Should render correctly in not edit mode', () => {
		const fieldsStructure: FormFieldsSchema<FieldValues> = [
			{
				type: 'text',
				label: 'Field 1',
				field: '',
			},

			{
				type: 'number',
				label: 'Field 4',
				field: '',
			},
		];

		const form: ReactForm<FieldValues> = {
			disableSubmit: false,
			submitForm: jest.fn(),
			fieldsErrors: {},
			isSubmitting: false,
			resetForm: jest.fn(),
			setFieldValue: jest.fn(),
			touchedFields: jest.fn(),
			dirtyFields: jest.fn(),
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
			formId: 'formId',
		};

		const label = 'Name';
		const value = 'John Doe';
		const isEditFormOpen = false;
		const showEditForm = jest.fn();

		const buttonGroup: TButton[] = [
			{
				label: 'Save',
				onClick: jest.fn(),
				variant: 'primary',
			},
			{
				label: 'Cancel',
				variant: 'secondary',
				onClick: () => {
					hideEditFormMock();
				},
			},
		];

		const { asFragment } = render(
			<FormFieldWithEdit
				fieldsStructure={fieldsStructure}
				form={form}
				label={label}
				value={value}
				isEditFormOpen={isEditFormOpen}
				showEditForm={showEditForm}
				buttonGroup={buttonGroup}
			/>
		);

		expect(asFragment()).toMatchSnapshot();
	});

	test('Should render the read-only view correctly', () => {
		render(<FormFieldWithEdit {...defaultProps} />);
		expect(screen.getByText('Test Field')).toBeInTheDocument();
		expect(screen.getByText('Test Value')).toBeInTheDocument();
		expect(screen.getByText('EDIT')).toBeInTheDocument();
	});

	test('Should show edit form when edit button is clicked', () => {
		render(<FormFieldWithEdit {...defaultProps} />);
		const editButton = screen.getByText('EDIT');

		fireEvent.click(editButton);
		expect(showEditFormMock).toHaveBeenCalledTimes(1);
	});
});
