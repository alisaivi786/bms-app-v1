import { FieldValues, FormFieldsSchema, ReactForm } from '@devkit/utilities';
import { render, screen } from '@testing-library/react';
import SearchForm from './SearchForm';

jest.mock('../DatePicker/date-picker-original.scss', () => jest.fn());
jest.mock('../DatePicker/date-picker.scss', () => jest.fn());

const formMock: ReactForm<FieldValues> = {
	disableSubmit: false,
	submitForm: jest.fn(),
	formId: 'formId',
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
};

const mockSubmitLabel = 'Search';
const mockResetLabel = 'Reset';
const mockColumnsCount = 3;

describe('SearchForm Component', () => {
	Date.now = jest.fn();
	test('Should match the snapshot', () => {
		const { asFragment } = render(
			<SearchForm
				form={formMock}
				fieldsStructure={mockFieldsStructure}
				submitLabel={mockSubmitLabel}
				resetLabel={mockResetLabel}
				columnsCount={mockColumnsCount}
			/>
		);

		expect(asFragment()).toMatchSnapshot();
	});

	test('Should render SearchForm with default labels', () => {
		render(<SearchForm form={formMock} fieldsStructure={mockFieldsStructure} />);

		expect(screen.getByText('Search')).toBeInTheDocument();
		expect(screen.getByText('Reset')).toBeInTheDocument();
	});

	test('Should render SearchForm with custom submit and reset labels', () => {
		render(
			<SearchForm
				form={formMock}
				fieldsStructure={mockFieldsStructure}
				submitLabel="Custom Search"
				resetLabel="Custom Reset"
			/>
		);

		expect(screen.getByText('Custom Search')).toBeInTheDocument();
		expect(screen.getByText('Custom Reset')).toBeInTheDocument();
	});

	const mockFieldsStructure: FormFieldsSchema<FieldValues> = [
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
});
