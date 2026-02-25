import { render } from '@testing-library/react-native';
import { RadioButtonGroup } from './RadioButtonGroup';

const mockOnChange = jest.fn();

const baseProps = {
	name: 'sample-group',
	label: 'Choose Option',
	description: 'Pick one of the options below',
	options: [
		{ id: 'yes', label: 'Yes' },
		{ id: 'no', label: 'No' },
	],
	control: {},
	onChange: mockOnChange,
	value: undefined,
	hasErrors: false,
};

describe('RadioButtonGroup', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders group with label and description', () => {
		const { getByText } = render(<RadioButtonGroup columnsCount={2} {...baseProps} />);

		expect(getByText('Choose Option')).toBeTruthy();

		expect(getByText('Pick one of the options below')).toBeTruthy();
	});

	it('renders all options', () => {
		const { getByText } = render(<RadioButtonGroup columnsCount={2} {...baseProps} />);

		expect(getByText('Yes')).toBeTruthy();

		expect(getByText('No')).toBeTruthy();
	});

	it('shows required asterisk if isRequired is true', () => {
		const { getByText } = render(<RadioButtonGroup columnsCount={2} {...baseProps} isRequired />);

		expect(getByText('*')).toBeTruthy();
	});

	it('does not show description if there are field errors', () => {
		const { queryByText } = render(<RadioButtonGroup columnsCount={2} {...baseProps} errors="Something went wrong" />);

		expect(queryByText('Pick one of the options below')).toBeNull();
	});

	it('displays error messages when errors are passed', () => {
		const { getByText } = render(<RadioButtonGroup columnsCount={2} {...baseProps} errors="Something went wrong" />);

		expect(getByText('Something went wrong')).toBeTruthy();
	});

	it('matches snapshot with 2 columns', () => {
		const { toJSON } = render(<RadioButtonGroup columnsCount={2} {...baseProps} />);

		expect(toJSON()).toMatchSnapshot();
	});
});
