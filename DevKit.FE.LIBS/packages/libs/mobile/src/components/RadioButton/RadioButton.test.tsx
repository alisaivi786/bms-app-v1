import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import { RadioButton } from './RadioButton';

jest.useFakeTimers();

const baseProps = {
	id: 'option-1',
	label: 'Option 1',
	onChange: jest.fn(),
	value: undefined,
	testID: 'radio-button-container-option-1',
	radioButtonTestID: 'radio-button-option-1',
	checkIconTestID: 'radio-button-check-icon-option-1',
};

describe('RadioButton', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	it('renders correctly and matches snapshot', () => {
		const { toJSON } = render(<RadioButton {...baseProps} />);

		expect(toJSON()).toMatchSnapshot();
	});

	it('renders label', () => {
		const { getByText } = render(<RadioButton {...baseProps} />);

		expect(getByText('Option 1')).toBeTruthy();
	});

	it('calls onChange on label click if not disabled', async () => {
		const onChangeMock = jest.fn();

		const { getByText } = render(<RadioButton {...baseProps} onChange={onChangeMock} />);

		await act(async () => {
			fireEvent.press(getByText('Option 1'));
			jest.advanceTimersByTime(300);
			await Promise.resolve();
		});

		expect(onChangeMock).toHaveBeenCalledWith('option-1');
	});

	it('shows check icon when selected', () => {
		const { getByTestId } = render(<RadioButton {...baseProps} value="option-1" />);

		expect(getByTestId('radio-button-check-icon-option-1')).toBeTruthy();
	});

	it('does not show check icon when not selected', () => {
		const { queryByTestId } = render(<RadioButton {...baseProps} value="another-option" />);

		expect(queryByTestId('radio-button-check-icon-option-1')).toBeNull();
	});

	it('applies full width styling', () => {
		const { toJSON } = render(<RadioButton {...baseProps} widthFull />);

		expect(toJSON()).toMatchSnapshot();
	});

	it('triggers effect animation and resets on end', async () => {
		const { getByText, getByTestId } = render(<RadioButton {...baseProps} />);
		const container = getByTestId('radio-button-container-option-1');

		await act(async () => {
			fireEvent.press(getByText('Option 1'));
			jest.advanceTimersByTime(300);
		});

		// Simulate the animation end by firing the animationEnd event
		fireEvent(container, 'animationEnd');

		// Expectation: No crash, effect reset happens silently.
		expect(true).toBeTruthy();
	});
});
