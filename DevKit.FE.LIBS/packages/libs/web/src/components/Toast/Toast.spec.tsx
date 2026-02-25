import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { CloseIcon } from '../../test-utils/mockdevkitIcons';
import { Toast } from './Toast';

jest.useFakeTimers();

const ToastContext = React.createContext({
	showToast: jest.fn(),
	hideToast: jest.fn(),
});

describe('Toast Component', () => {
	test('Should render Snapshot for the toast component', async () => {
		const closeToast = jest.fn();
		const props = {
			title: 'Test Toast',
			description: 'Test description',
			duration: 3000,
			width: 501,
			closeToast,
			isShown: true,
			icon: CloseIcon,
			isClosable: false,
			className: '',
		};

		let container: HTMLElement | null = null;

		await act(() => {
			const dom = render(
				<ToastContext.Provider value={{ showToast: jest.fn(), hideToast: jest.fn() }}>
					<Toast severity="success" position="top-center" {...props} />
				</ToastContext.Provider>
			);

			container = dom.container;
		});
		expect(container).toMatchSnapshot();
	});

	test('should render correctly with required props', async () => {
		const closeToast = jest.fn();
		const props = {
			title: 'Test Toast',
			description: 'Test description',
			duration: 3000,
			width: 501,
			closeToast,
			isShown: true,
			icon: CloseIcon,
			isClosable: false,
			className: '',
		};

		await act(async () => {
			render(
				<ToastContext.Provider value={{ showToast: jest.fn(), hideToast: jest.fn() }}>
					<Toast severity="success" position="top-center" {...props} />
				</ToastContext.Provider>
			);
		});

		expect(screen.getByText('Test Toast')).toBeInTheDocument();
		expect(screen.getByText('Test description')).toBeInTheDocument();
	});

	test('should call closeToast after the specified duration', async () => {
		const closeToast = jest.fn();
		const props = {
			title: 'Test Toast',
			description: 'Test description',
			duration: 3000,
			width: 501,
			closeToast,
			isShown: true,
			icon: CloseIcon,
			isClosable: false,
			className: '',
		};

		await act(async () => {
			render(
				<ToastContext.Provider value={{ showToast: jest.fn(), hideToast: jest.fn() }}>
					<Toast severity="success" position="top-center" {...props} />
				</ToastContext.Provider>
			);
		});

		await act(async () => {
			jest.advanceTimersByTime(3000);
		});

		expect(closeToast).toHaveBeenCalled();
	});
});
