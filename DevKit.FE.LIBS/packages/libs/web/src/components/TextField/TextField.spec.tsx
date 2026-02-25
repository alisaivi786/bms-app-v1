import { JSX } from 'react/jsx-runtime';
import { FieldValues, ITextFieldProps } from '@devkit/utilities';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NumberField, TextField } from './TextField';

const createComponent = (props: JSX.IntrinsicAttributes & ITextFieldProps<FieldValues>) =>
	render(<TextField {...props} />);
const onChangeMock = jest.fn();
const onBlurMock = jest.fn();
const onFocusMock = jest.fn();

beforeAll(() => {
	window.ResizeObserver = jest.fn(() => ({
		observe: jest.fn(),
		unobserve: jest.fn(),
		disconnect: jest.fn(),
	}));
});

describe('TextFieldBase', () => {
	test('Should render TextField correctly', () => {
		const { getByPlaceholderText } = createComponent({
			label: 'Name',
			placeholder: 'Enter your name',
		});
		const inputElement = getByPlaceholderText('Enter your name');
		const label = screen.getByText('Name');

		expect(label).toBeInTheDocument();
		expect(inputElement).toBeInTheDocument();
	});

	test('Should not accept non-numeric values with numeric variant', () => {
		const { getByPlaceholderText } = render(<NumberField placeholder="Enter your Age" label="Age" />);
		const nonNumericValue = 'test non-numeric';
		const inputElement = getByPlaceholderText('Enter your Age');

		fireEvent.input(inputElement, { target: { value: nonNumericValue } });

		expect(inputElement).not.toHaveValue(nonNumericValue);
	});

	test('Should accept numeric values with numeric variant', () => {
		const { getByPlaceholderText } = render(<NumberField placeholder="Enter your Age" label="Age" />);
		const numericValue = '76283';
		const inputElement = getByPlaceholderText('Enter your Age');

		fireEvent.input(inputElement, { target: { value: numericValue } });

		expect(inputElement).toHaveValue(numericValue);
	});

	test('Should call onChange when the value changes', () => {
		createComponent({
			onChange: onChangeMock,
		});
		const input = screen.getByRole('textbox') as HTMLInputElement;

		fireEvent.change(input, { target: { value: '1' } });
		fireEvent.input(input, { target: { value: '1' } });

		waitFor(() => {
			expect(input.value).toBe('1');
			expect(onChangeMock).toHaveBeenCalledTimes(1);
		});
	});

	test('Should not allow paste when noPaste is true', () => {
		const initialValue = 'initial value';
		const pastedValue = 'pasted value';

		createComponent({
			value: initialValue,
			type: 'text',
			onChange: onChangeMock,
			noPaste: true,
		});

		const input = screen.getByRole('textbox');

		fireEvent.paste(input, pastedValue);
		expect(input).toHaveValue(initialValue);
	});

	test('Should not not accept new value when disabled', () => {
		const initialValue = 'initial value';
		const updatedValue = 'update value';

		createComponent({
			onChange: onChangeMock,
			disabled: true,
			value: initialValue,
		});
		const input = screen.getByRole('textbox') as HTMLInputElement;

		fireEvent.change(input, { target: { value: updatedValue } });

		waitFor(() => {
			expect(input.value).toBe(initialValue);
			expect(onChangeMock).toHaveBeenCalledTimes(0);
		});
	});

	test('Should call onBlur', () => {
		createComponent({
			onChange: onBlurMock,
		});
		const input = screen.getByRole('textbox') as HTMLInputElement;

		fireEvent.blur(input);
		waitFor(() => {
			expect(onBlurMock).toHaveBeenCalledTimes(1);
		});
	});

	test('Should call onFocus', () => {
		createComponent({
			onChange: onFocusMock,
		});
		const input = screen.getByRole('textbox') as HTMLInputElement;

		fireEvent.focus(input);

		waitFor(() => {
			expect(onFocusMock).toHaveBeenCalledTimes(1);
		});
	});

	test('Should render error correctly', () => {
		createComponent({
			hasErrors: true,
			errors: 'test error',
		});
		const errorText = screen.getByText('test error');

		expect(errorText).toBeInTheDocument();
	});

	test('Should render TextField with tooltip trigger', async () => {
		createComponent({
			label: 'test label',
			popover: <div>Tooltip content</div>,
		});

		act(() => {
			fireEvent.mouseEnter(screen.getByText('EmptyInfoCircleIcon'));
		});
		const tooltip = screen.getByText('EmptyInfoCircleIcon');

		expect(tooltip).toBeInTheDocument();
	});

	test('Should render asterisk symbol correctly when required', () => {
		const textStatusDangerColor = 'color: rgb(226 61 40 / var(--tw-text-opacity))';

		createComponent({
			label: 'test label',
			isRequired: true,
		});

		const asterisk = screen.getByText('*');

		expect(asterisk).toBeInTheDocument();
		expect(asterisk).toHaveStyle(textStatusDangerColor);
	});

	test('Should call onChange', () => {
		createComponent({
			value: 'test value',
			type: 'text',
			onChange: onChangeMock,
			isClearable: true,
		});

		const clearIcon = screen.getByText('CloseIcon');

		waitFor(() => {
			fireEvent.click(clearIcon);
		});

		expect(onChangeMock).toHaveBeenCalledTimes(1);
	});

	test('Should mask value accordingly', () => {
		const unmaskedValue = '111222';
		const maskedValue = '111 222';

		createComponent({
			type: 'text',
			mask: '999 999',
			onChange: onChangeMock,
		});

		const value = screen.getByRole('textbox');

		fireEvent.change(value, { target: { value: unmaskedValue } });

		waitFor(() => {
			expect(value).toHaveValue(maskedValue);
		});
	});
});
