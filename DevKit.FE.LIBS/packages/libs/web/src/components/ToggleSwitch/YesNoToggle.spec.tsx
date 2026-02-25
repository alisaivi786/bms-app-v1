import { fireEvent, render } from '@testing-library/react';
import YesNoToggle, { IYesNoToggleProps } from './YesNoToggle';

const createComponent = (props: IYesNoToggleProps) => render(<YesNoToggle {...props} />);

describe('YesNoToggle Component', () => {
	test('should render correctly', () => {
		const { container } = createComponent({
			value: true,
			onChange: jest.fn(),
			yesLabel: 'Yes',
			noLabel: 'No',
			variant: 'primary',
		});

		expect(container).toMatchSnapshot();
	});

	test('should call onChange with true when "Yes" option is clicked', () => {
		const handleChange = jest.fn();
		const { getByText } = render(
			<YesNoToggle value={false} onChange={handleChange} yesLabel="Yes" noLabel="No" variant="primary" />
		);

		fireEvent.click(getByText('Yes'));

		expect(handleChange).toHaveBeenCalledWith(true);
	});

	test('should call onChange with false when "No" option is clicked', () => {
		const handleChange = jest.fn();
		const { getByText } = render(
			<YesNoToggle value={true} onChange={handleChange} yesLabel="Yes" noLabel="No" variant="primary" />
		);

		fireEvent.click(getByText('No'));

		expect(handleChange).toHaveBeenCalledWith(false);
	});

	test('should have the "Yes" option selected when value prop is true', () => {
		const { getByText } = render(
			<YesNoToggle value={true} onChange={jest.fn()} yesLabel="Yes" noLabel="No" variant="primary" />
		);

		const yesOption = getByText('Yes');

		expect(yesOption).toHaveClass('nj-bg-brand text-white');
	});

	test('should have the "No" option selected when value prop is false', () => {
		const { getByText } = render(
			<YesNoToggle value={false} onChange={jest.fn()} yesLabel="Yes" noLabel="No" variant="primary" />
		);

		const noOption = getByText('No');

		expect(noOption).toHaveClass('nj-bg-brand text-white');
	});
});
