import { fireEvent, render } from '@testing-library/react';
import { IPopoverProps, Popover } from './Popover';

const mockTriggerElement = <button>Click Me</button>;

const renderPopover = (props: Partial<IPopoverProps> = {}) => {
	const defaultProps: IPopoverProps = {
		content: <div>Popover Content</div>,
		isOpen: false,
		onIsOpenChange: () => jest.fn(),
		direction: 'top',
		...props,
	};

	return render(<Popover {...defaultProps}>{mockTriggerElement}</Popover>);
};

describe('Popover Component', () => {
	test('Should render the trigger element correctly', () => {
		const { getByText } = renderPopover();
		const triggerElement = getByText('Click Me');

		expect(triggerElement).toBeInTheDocument();
	});

	test('Should render the popover content when opened is true', () => {
		const { getByText } = renderPopover({ isOpen: true });
		const popoverContent = getByText('Popover Content');

		expect(popoverContent).toBeInTheDocument();
	});

	test('Should not render the popover content when opened is false', () => {
		const { queryByText } = renderPopover();
		const popoverContent = queryByText('Popover Content');

		expect(popoverContent).toBeNull();
	});

	test('Should call the onClick function when trigger element is clicked', () => {
		const onClickMock = jest.fn();
		const { getByText } = renderPopover({ onIsOpenChange: onClickMock, persistOnClick: true });
		const triggerElement = getByText('Click Me');

		fireEvent.click(triggerElement);
		expect(onClickMock).toHaveBeenCalledTimes(1);
	});

	test('Should match snapshot', () => {
		const { asFragment } = renderPopover();

		expect(asFragment()).toMatchSnapshot();
	});
});
