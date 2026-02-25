import { fireEvent, render } from '@testing-library/react';
import ToggleSwitch, { IToggleSwitchProps } from './ToggleSwitch';

const createComponent = (props: IToggleSwitchProps) => render(<ToggleSwitch {...props} />);

describe('ToggleSwitch Component', () => {
	test('should render correctly', () => {
		const { container } = createComponent({ checked: true, onChange: jest.fn(), disabled: false });

		expect(container).toMatchSnapshot();
	});
	test('should render with default props', () => {
		const { container } = render(<ToggleSwitch checked={false} onChange={jest.fn()} />);

		expect(container).toMatchSnapshot();
	});
	test('should render as checked', () => {
		const { container } = render(<ToggleSwitch checked={true} onChange={jest.fn()} />);

		expect(container).toMatchSnapshot();
	});

	test('should call onChange when clicked', () => {
		const handleChange = jest.fn();
		const { getByRole } = render(<ToggleSwitch checked={false} onChange={handleChange} />);

		fireEvent.click(getByRole('switch'));

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith(true);
	});

	test('should not call onChange when disabled', () => {
		const handleChange = jest.fn();
		const { getByRole } = render(<ToggleSwitch checked={false} onChange={handleChange} disabled={true} />);

		fireEvent.click(getByRole('switch'));

		expect(handleChange).not.toHaveBeenCalled();
	});

	test('should have the "checked" class when checked', () => {
		const { getByRole } = render(<ToggleSwitch checked={true} onChange={jest.fn()} />);

		expect(getByRole('switch')).toHaveClass('nj-bg-brand');
	});

	test('should have the "disabled" class when disabled', () => {
		const { getByRole } = render(<ToggleSwitch checked={false} onChange={jest.fn()} disabled={true} />);

		expect(getByRole('switch')).toHaveClass('opacity-50');
	});
});
