import { fireEvent, render, screen } from '@testing-library/react';
import { Alert, IAlertProps } from '../../../src/components/Alert';

const createComponent = (props: IAlertProps) => render(<Alert {...props}>Alert test component</Alert>);

describe('Alert Component', () => {
	it('should render correctly with warning severity', () => {
		const onCloseStub = jest.fn();

		const { container } = createComponent({
			severity: 'warning',
			isShown: true,
			isClosable: true,
			onClose: onCloseStub,
		});

		expect(container).toMatchSnapshot();
		const heading = screen.getByText(/Alert test component/i);

		expect(heading).toBeInTheDocument();

		const closeIcon = screen.getByTestId('close-icon');

		expect(closeIcon).toBeInTheDocument();

		fireEvent.click(closeIcon);

		expect(onCloseStub).toHaveBeenCalledTimes(1);
	});
});
