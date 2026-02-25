import React, { DOMAttributes, createRef } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import InputComponent, { InputComponentProps } from './InputComponent';

const createComponent = (props: InputComponentProps & DOMAttributes<HTMLTextAreaElement | HTMLInputElement>) =>
	render(<InputComponent {...props} />);

const mockRef = createRef<HTMLTextAreaElement | HTMLInputElement>();
const clearFuncMock = jest.fn();
const onChangeMock = jest.fn();
const onFocusMock = jest.fn();
const onBlurMock = jest.fn();

const getTextbox = () => screen.getByRole('textbox') as HTMLInputElement;

beforeAll(() => {
	window.ResizeObserver = jest.fn(() => ({
		observe: jest.fn(),
		unobserve: jest.fn(),
		disconnect: jest.fn(),
	}));
});

const mockIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => (
	<svg role="img" data-testid="mock-icon">
		<path d="M0 0h24v24H0z" fill="none" />
	</svg>
);

describe('InputComponent', () => {
	Date.now = jest.fn();
	test('Should match snapshot', () => {
		const component = createComponent({
			type: 'text',
			placeholder: 'test placeholder',
			onClearValue: clearFuncMock,
			inputRef: mockRef,
			onChange: onChangeMock,
			isFocused: false,
			disabled: false,
			suffix: undefined,
			prefix: undefined,
			maxLength: undefined,
			dir: 'ltr',
			noCopy: undefined,
			noPaste: undefined,
			autoFill: undefined,
			hasErrors: false,
			isClearable: false,
			size: 'small',
			startIcon: undefined,
			endIcon: undefined,
			rotateEndIconOnFocus: false,
			readOnly: false,
			alwaysShowClearIcon: false,
			onFocus: undefined,
			onBlur: undefined,
			formId: 'formId',
		});

		expect(component).toMatchSnapshot();
	});

	test('Should render InputComponent with initial value', () => {
		const { getByPlaceholderText } = createComponent({
			type: 'text',
			placeholder: 'test placeholder',
			onClearValue: clearFuncMock,
			inputRef: mockRef,
			onChange: onChangeMock,
			isFocused: false,
			disabled: false,
			suffix: undefined,
			prefix: undefined,
			maxLength: undefined,
			dir: 'ltr',
			noCopy: undefined,
			noPaste: undefined,
			autoFill: undefined,
			hasErrors: false,
			isClearable: false,
			size: 'small',
			startIcon: undefined,
			endIcon: undefined,
			rotateEndIconOnFocus: false,
			readOnly: false,
			alwaysShowClearIcon: false,
			onFocus: undefined,
			onBlur: undefined,
			formId: 'formId',
		});
		const input = getByPlaceholderText('test placeholder') as HTMLInputElement;

		expect(input).toBeInTheDocument();
	});

	test('Should call onFocus', () => {
		createComponent({
			type: 'text',
			placeholder: 'test placeholder',
			onClearValue: clearFuncMock,
			inputRef: mockRef,
			onChange: onChangeMock,
			onFocus: onFocusMock,
			isFocused: false,
			disabled: false,
			suffix: undefined,
			prefix: undefined,
			maxLength: undefined,
			dir: 'ltr',
			noCopy: undefined,
			noPaste: undefined,
			autoFill: undefined,
			hasErrors: false,
			isClearable: false,
			size: 'small',
			startIcon: undefined,
			endIcon: undefined,
			rotateEndIconOnFocus: false,
			readOnly: false,
			alwaysShowClearIcon: false,
			onBlur: undefined,
			formId: 'formId',
		});

		fireEvent.focus(getTextbox());

		const parentDivFocusedStyle = getTextbox().className.includes(
			'!nj-border-brand !outline !outline-3 !outline-brand-400 bg-white'
		);

		waitFor(() => {
			expect(getTextbox).toHaveFocus();
			expect(parentDivFocusedStyle).toBeTruthy();
			expect(onFocusMock).toHaveBeenCalledTimes(1);
		});
	});

	test('Should call onBlur', () => {
		createComponent({
			type: 'text',
			placeholder: 'test placeholder',
			onClearValue: clearFuncMock,
			inputRef: mockRef,
			onChange: onChangeMock,
			onBlur: onBlurMock,
			isFocused: false,
			disabled: false,
			suffix: undefined,
			prefix: undefined,
			maxLength: undefined,
			dir: 'ltr',
			noCopy: undefined,
			noPaste: undefined,
			autoFill: undefined,
			hasErrors: false,
			isClearable: false,
			size: 'small',
			startIcon: undefined,
			endIcon: undefined,
			rotateEndIconOnFocus: false,
			readOnly: false,
			alwaysShowClearIcon: false,
			onFocus: undefined,
			formId: 'formId',
		});

		fireEvent.focus(getTextbox());
		fireEvent.blur(getTextbox());

		const parentDivFocusedStyle = getTextbox().className.includes(
			'!nj-border-brand !outline !outline-3 !outline-brand-400 bg-white'
		);
		const parentDivIdleStyle = getTextbox().className.includes('border-gray-200 bg-white');

		waitFor(() => {
			expect(getTextbox()).not.toHaveFocus();
			expect(parentDivFocusedStyle).not.toBeTruthy();
			expect(parentDivIdleStyle).toBeTruthy();
			expect(onBlurMock).toHaveBeenCalledTimes(1);
		});
	});

	test('Should text-area inputComponent call onFocus', () => {
		createComponent({
			type: 'text-area',
			placeholder: 'test placeholder',
			onClearValue: clearFuncMock,
			inputRef: mockRef,
			onChange: onChangeMock,
			onFocus: onFocusMock,
			isFocused: false,
			disabled: false,
			suffix: undefined,
			prefix: undefined,
			maxLength: undefined,
			dir: 'ltr',
			noCopy: undefined,
			noPaste: undefined,
			autoFill: undefined,
			hasErrors: false,
			isClearable: false,
			size: 'small',
			startIcon: undefined,
			endIcon: undefined,
			rotateEndIconOnFocus: false,
			readOnly: false,
			alwaysShowClearIcon: false,
			onBlur: undefined,
			formId: 'formId',
		});

		fireEvent.focus(getTextbox());

		const parentDivFocusedStyle = getTextbox().className.includes(
			'!nj-border-brand !outline !outline-3 !outline-brand-400 bg-white'
		);

		waitFor(() => {
			expect(getTextbox()).toHaveFocus();
			expect(parentDivFocusedStyle).toBeTruthy();
			expect(onFocusMock).toHaveBeenCalledTimes(1);
		});
	});

	test('Should text-area inputComponent call onBlur', () => {
		createComponent({
			type: 'text-area',
			placeholder: 'test placeholder',
			onClearValue: clearFuncMock,
			inputRef: mockRef,
			onChange: onChangeMock,
			onBlur: onBlurMock,
			isFocused: false,
			disabled: false,
			suffix: undefined,
			prefix: undefined,
			maxLength: undefined,
			dir: 'ltr',
			noCopy: undefined,
			noPaste: undefined,
			autoFill: undefined,
			hasErrors: false,
			isClearable: false,
			size: 'small',
			startIcon: undefined,
			endIcon: undefined,
			rotateEndIconOnFocus: false,
			readOnly: false,
			alwaysShowClearIcon: false,
			onFocus: undefined,
			formId: 'formId',
		});

		fireEvent.focus(getTextbox());
		fireEvent.blur(getTextbox());

		const parentDivFocusedStyle = getTextbox().className.includes(
			'!nj-border-brand !outline !outline-3 !outline-brand-400 bg-white'
		);
		const parentDivIdleStyle = getTextbox().className.includes('border-gray-200 bg-white');

		waitFor(() => {
			expect(getTextbox()).not.toHaveFocus();
			expect(parentDivFocusedStyle).not.toBeTruthy();
			expect(parentDivIdleStyle).toBeTruthy();
			expect(onBlurMock).toHaveBeenCalledTimes(1);
		});
	});

	test('Should render text-area', () => {
		createComponent({
			type: 'text-area',
			placeholder: 'test placeholder',
			onClearValue: clearFuncMock,
			inputRef: mockRef,
			onChange: onChangeMock,
			isFocused: false,
			disabled: false,
			suffix: undefined,
			prefix: undefined,
			maxLength: undefined,
			dir: 'ltr',
			noCopy: undefined,
			noPaste: undefined,
			autoFill: undefined,
			hasErrors: false,
			isClearable: false,
			size: 'small',
			startIcon: undefined,
			endIcon: undefined,
			rotateEndIconOnFocus: false,
			readOnly: false,
			alwaysShowClearIcon: false,
			onFocus: undefined,
			onBlur: undefined,
			formId: 'formId',
		});

		expect(getTextbox()).toBeInTheDocument();
		expect(getTextbox().type).toBe('textarea');
	});

	test('Should render password icon', () => {
		createComponent({
			type: 'password',
			placeholder: 'test placeholder',
			onClearValue: clearFuncMock,
			inputRef: mockRef,
			onChange: onChangeMock,
			isFocused: false,
			disabled: false,
			suffix: undefined,
			prefix: undefined,
			maxLength: undefined,
			dir: 'ltr',
			noCopy: undefined,
			noPaste: undefined,
			autoFill: undefined,
			hasErrors: false,
			isClearable: false,
			size: 'small',
			startIcon: undefined,
			endIcon: undefined,
			rotateEndIconOnFocus: false,
			readOnly: false,
			alwaysShowClearIcon: false,
			onFocus: undefined,
			onBlur: undefined,
			formId: 'formId',
		});
		const eyeIcon = screen.getByText('EyeIcon');

		expect(eyeIcon).toBeInTheDocument();
		fireEvent.click(eyeIcon);
		waitFor(() => {
			expect(eyeIcon).not.toBeInTheDocument();
			const eyeSlashIcon = screen.getByText('EyeSlashIcon');

			expect(eyeSlashIcon).toBeInTheDocument();
		});
	});

	test('Should call onChange for InputComponent when the value changes', () => {
		createComponent({
			type: 'text',
			onClearValue: clearFuncMock,
			inputRef: mockRef,
			onChange: onChangeMock,
			isFocused: false,
			disabled: false,
			placeholder: undefined,
			suffix: undefined,
			prefix: undefined,
			maxLength: undefined,
			dir: 'ltr',
			noCopy: undefined,
			noPaste: undefined,
			autoFill: undefined,
			hasErrors: false,
			isClearable: false,
			size: 'small',
			startIcon: undefined,
			endIcon: undefined,
			rotateEndIconOnFocus: false,
			readOnly: false,
			alwaysShowClearIcon: false,
			onFocus: undefined,
			onBlur: undefined,
			formId: 'formId',
		});

		fireEvent.change(getTextbox(), { target: { value: '1' } });

		waitFor(() => {
			expect(getTextbox().value).toBe('1');
			expect(onChangeMock).toHaveBeenCalledTimes(1);
		});
	});

	test('Should not call onChange when InputComponent is disabled', () => {
		createComponent({
			type: 'text',
			onClearValue: clearFuncMock,
			inputRef: mockRef,
			onChange: onChangeMock,
			disabled: true,
			isFocused: false,
			placeholder: undefined,
			suffix: undefined,
			prefix: undefined,
			maxLength: undefined,
			dir: 'ltr',
			noCopy: undefined,
			noPaste: undefined,
			autoFill: undefined,
			hasErrors: false,
			isClearable: false,
			size: 'small',
			startIcon: undefined,
			endIcon: undefined,
			rotateEndIconOnFocus: false,
			readOnly: false,
			alwaysShowClearIcon: false,
			onFocus: undefined,
			onBlur: undefined,
			formId: 'formId',
		});

		fireEvent.change(getTextbox(), { target: { value: '1' } });

		waitFor(() => {
			expect(getTextbox().value).not.toBe('1');
			expect(onChangeMock).not.toHaveBeenCalledTimes(1);
		});
	});

	test('Should render InputComponent with suffix correctly', () => {
		createComponent({
			type: 'text',
			onClearValue: clearFuncMock,
			inputRef: mockRef,
			onChange: onChangeMock,
			suffix: '+971',
			prefix: undefined,
			isFocused: false,
			disabled: false,
			placeholder: undefined,
			maxLength: undefined,
			dir: 'ltr',
			noCopy: undefined,
			noPaste: undefined,
			autoFill: undefined,
			hasErrors: false,
			isClearable: false,
			size: 'small',
			startIcon: undefined,
			endIcon: undefined,
			rotateEndIconOnFocus: false,
			readOnly: false,
			alwaysShowClearIcon: false,
			onFocus: undefined,
			onBlur: undefined,
			formId: 'formId',
		});
		const suffix = screen.getByText('+971');

		expect(suffix).toBeInTheDocument();
	});

	test('Should render InputComponent with prefix correctly', () => {
		createComponent({
			type: 'text',
			onClearValue: clearFuncMock,
			inputRef: mockRef,
			onChange: onChangeMock,
			suffix: undefined,
			prefix: '$',
			isFocused: false,
			disabled: false,
			placeholder: undefined,
			maxLength: undefined,
			dir: 'ltr',
			noCopy: undefined,
			noPaste: undefined,
			autoFill: undefined,
			hasErrors: false,
			isClearable: false,
			size: 'small',
			startIcon: undefined,
			endIcon: undefined,
			rotateEndIconOnFocus: false,
			readOnly: false,
			alwaysShowClearIcon: false,
			onFocus: undefined,
			onBlur: undefined,
			formId: 'formId',
		});
		const prefix = screen.getByText('$');

		expect(prefix).toBeInTheDocument();
	});

	test('Should render InputComponent with maxLength', () => {
		createComponent({
			type: 'text',
			onClearValue: clearFuncMock,
			inputRef: mockRef,
			onChange: onChangeMock,
			maxLength: 1,
			isFocused: false,
			disabled: false,
			placeholder: undefined,
			suffix: undefined,
			prefix: undefined,
			dir: 'ltr',
			noCopy: undefined,
			noPaste: undefined,
			autoFill: undefined,
			hasErrors: false,
			isClearable: false,
			size: 'small',
			startIcon: undefined,
			endIcon: undefined,
			rotateEndIconOnFocus: false,
			readOnly: false,
			alwaysShowClearIcon: false,
			onFocus: undefined,
			onBlur: undefined,
			formId: 'formId',
		});

		fireEvent.change(getTextbox(), { target: { value: '123' } });

		waitFor(() => {
			expect(getTextbox().value).toBe('1');
		});
	});

	test('Should render InputComponent with noCopy', () => {
		createComponent({
			type: 'text',
			onClearValue: clearFuncMock,
			inputRef: mockRef,
			onChange: onChangeMock,
			noCopy: true,
			isFocused: false,
			disabled: false,
			placeholder: undefined,
			suffix: undefined,
			prefix: undefined,
			maxLength: undefined,
			dir: 'ltr',
			noPaste: undefined,
			autoFill: undefined,
			hasErrors: false,
			isClearable: false,
			size: 'small',
			startIcon: undefined,
			endIcon: undefined,
			rotateEndIconOnFocus: false,
			readOnly: false,
			alwaysShowClearIcon: false,
			onFocus: undefined,
			onBlur: undefined,
			formId: 'formId',
		});

		fireEvent.copy(getTextbox());
		fireEvent.paste(getTextbox());
		fireEvent.paste(getTextbox());

		expect(getTextbox()).toBeInTheDocument();
	});

	test('Should render InputComponent with noPaste', () => {
		createComponent({
			type: 'text',
			onClearValue: clearFuncMock,
			inputRef: mockRef,
			onChange: onChangeMock,
			noPaste: true,
			isFocused: false,
			disabled: false,
			placeholder: undefined,
			suffix: undefined,
			prefix: undefined,
			maxLength: undefined,
			dir: 'ltr',
			noCopy: undefined,
			autoFill: undefined,
			hasErrors: false,
			isClearable: false,
			size: 'small',
			startIcon: undefined,
			endIcon: undefined,
			rotateEndIconOnFocus: false,
			readOnly: false,
			alwaysShowClearIcon: false,
			onFocus: undefined,
			onBlur: undefined,
			formId: 'formId',
		});

		fireEvent.copy(getTextbox());
		fireEvent.paste(getTextbox());
		fireEvent.paste(getTextbox());

		expect(getTextbox()).toBeInTheDocument();
	});

	test('Should render InputComponent text-area with noCopy', () => {
		createComponent({
			type: 'text-area',
			onClearValue: clearFuncMock,
			inputRef: mockRef,
			onChange: onChangeMock,
			noCopy: true,
			isFocused: false,
			disabled: false,
			placeholder: undefined,
			suffix: undefined,
			prefix: undefined,
			maxLength: undefined,
			dir: 'ltr',
			noPaste: undefined,
			autoFill: undefined,
			hasErrors: false,
			isClearable: false,
			size: 'small',
			startIcon: undefined,
			endIcon: undefined,
			rotateEndIconOnFocus: false,
			readOnly: false,
			alwaysShowClearIcon: false,
			onFocus: undefined,
			onBlur: undefined,
			formId: 'formId',
		});

		fireEvent.copy(getTextbox());
		fireEvent.paste(getTextbox());
		fireEvent.paste(getTextbox());

		expect(getTextbox()).toBeInTheDocument();
	});

	test('Should render InputComponent text-area with noPaste', () => {
		createComponent({
			type: 'text-area',
			onClearValue: clearFuncMock,
			inputRef: mockRef,
			onChange: onChangeMock,
			noPaste: true,
			isFocused: false,
			disabled: false,
			placeholder: undefined,
			suffix: undefined,
			prefix: undefined,
			maxLength: undefined,
			dir: 'ltr',
			noCopy: undefined,
			autoFill: undefined,
			hasErrors: false,
			isClearable: false,
			size: 'small',
			startIcon: undefined,
			endIcon: undefined,
			rotateEndIconOnFocus: false,
			readOnly: false,
			alwaysShowClearIcon: false,
			onFocus: undefined,
			onBlur: undefined,
			formId: 'formId',
		});

		fireEvent.copy(getTextbox());
		fireEvent.paste(getTextbox());
		fireEvent.paste(getTextbox());

		expect(getTextbox()).toBeInTheDocument();
	});

	test('Should render InputComponent invalid style', () => {
		createComponent({
			type: 'text',
			onClearValue: clearFuncMock,
			inputRef: mockRef,
			onChange: onChangeMock,
			hasErrors: true,
			isFocused: false,
			disabled: false,
			placeholder: undefined,
			suffix: undefined,
			prefix: undefined,
			maxLength: undefined,
			dir: 'ltr',
			noCopy: undefined,
			noPaste: undefined,
			autoFill: undefined,
			isClearable: false,
			size: 'small',
			startIcon: undefined,
			endIcon: undefined,
			rotateEndIconOnFocus: false,
			readOnly: false,
			alwaysShowClearIcon: false,
			onFocus: undefined,
			onBlur: undefined,
			formId: 'formId',
		});

		const parentDivInvalidStyle = getTextbox().className.includes('bg-red-50');

		expect(parentDivInvalidStyle).toBeTruthy();
	});

	test('Should render render icon without errors', () => {
		createComponent({
			type: 'text',
			onClearValue: clearFuncMock,
			inputRef: mockRef,
			onChange: onChangeMock,
			startIcon: mockIcon,
			isFocused: false,
			disabled: false,
			placeholder: undefined,
			suffix: undefined,
			prefix: undefined,
			maxLength: undefined,
			dir: 'ltr',
			noCopy: undefined,
			noPaste: undefined,
			autoFill: undefined,
			hasErrors: false,
			isClearable: false,
			size: 'small',
			endIcon: undefined,
			rotateEndIconOnFocus: false,
			readOnly: false,
			alwaysShowClearIcon: false,
			onFocus: undefined,
			onBlur: undefined,
			formId: 'formId',
		});
		const iconElement = screen.getByTestId('mock-icon');

		expect(iconElement).toBeInTheDocument();
	});

	test('Should render InputComponent with clear function', () => {
		createComponent({
			type: 'text',
			onClearValue: clearFuncMock,
			inputRef: mockRef,
			onChange: onChangeMock,
			isClearable: true,
			isFocused: false,
			disabled: false,
			placeholder: undefined,
			suffix: undefined,
			prefix: undefined,
			maxLength: undefined,
			dir: 'ltr',
			noCopy: undefined,
			noPaste: undefined,
			autoFill: undefined,
			hasErrors: false,
			size: 'small',
			startIcon: undefined,
			endIcon: undefined,
			rotateEndIconOnFocus: false,
			readOnly: false,
			alwaysShowClearIcon: false,
			onFocus: undefined,
			onBlur: undefined,
			formId: 'formId',
		});

		waitFor(() => {
			expect(getTextbox().value).toBe('');
			expect(clearFuncMock).toHaveBeenCalledTimes(1);
		});
	});

	test('Should toggle isFocused state when input is focused and blurred', () => {
		createComponent({
			type: 'text',
			inputRef: mockRef,
			onFocus: onFocusMock,
			onBlur: onBlurMock,
			onClearValue: clearFuncMock,
			onChange: onChangeMock,
			isFocused: false,
			disabled: false,
			placeholder: undefined,
			suffix: undefined,
			prefix: undefined,
			maxLength: undefined,
			dir: 'ltr',
			noCopy: undefined,
			noPaste: undefined,
			autoFill: undefined,
			hasErrors: false,
			isClearable: false,
			size: 'small',
			startIcon: undefined,
			endIcon: undefined,
			rotateEndIconOnFocus: false,
			readOnly: false,
			alwaysShowClearIcon: false,
			formId: 'formId',
		});

		expect(getTextbox()).not.toHaveClass('!nj-border-brand');
		fireEvent.focus(getTextbox());

		waitFor(() => {
			expect(getTextbox()).toHaveClass('!nj-border-brand');
		});
		fireEvent.blur(getTextbox());
		waitFor(() => {
			expect(getTextbox()).not.toHaveClass('!nj-border-brand');
			expect(getTextbox().focus).toHaveBeenCalled();
		});
	});
});
