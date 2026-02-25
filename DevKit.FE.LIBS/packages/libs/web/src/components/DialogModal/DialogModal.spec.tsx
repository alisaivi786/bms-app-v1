import { act } from 'react-test-renderer';
import { RenderResult, fireEvent, queries, render, waitFor } from '@testing-library/react';
import { DialogModal, IDialogModalBaseProps, IDialogModalProps, IDialogModalWithInputProps } from './DialogModal';

jest.mock('react-spring-bottom-sheet/dist/style.css', () => jest.fn());
jest.mock('./bottom-sheet.css', () => jest.fn());

beforeAll(() => {
	window.ResizeObserver = jest.fn(() => ({
		observe: jest.fn(),
		unobserve: jest.fn(),
		disconnect: jest.fn(),
	}));
});

type CombinedDialogModalProps = IDialogModalBaseProps & (IDialogModalWithInputProps | IDialogModalProps);
const baseProps: CombinedDialogModalProps = {
	title: 'Test Modal',
	description: 'Test description',
	isOpen: true,
	onClose: jest.fn(),
	onConfirm: jest.fn(),
	onCancel: jest.fn(),
	confirmationInput: {
		enable: true,
		label: 'Input Label',
		isRequired: true,
		errorMessage: 'This field is required',
		maxLength: 200,
	},
};

type RenderComponent = RenderResult<typeof queries, HTMLElement, HTMLElement>;

const initialRenderComponent = {} as RenderResult;

describe('DialogModal Component', () => {
	test('should match the snapshot', async () => {
		let component: RenderComponent = initialRenderComponent;

		await act(() => {
			component = render(<DialogModal {...baseProps} />);
		});

		const { asFragment } = component;

		expect(asFragment()).toMatchSnapshot();
	});

	test('should render the DialogModal with the provided title and description', async () => {
		let component: RenderComponent = initialRenderComponent;

		await act(async () => {
			component = render(<DialogModal {...baseProps} />);
		});

		const { getByText } = component;

		expect(getByText('Test Modal')).toBeInTheDocument();
		expect(getByText('Test description')).toBeInTheDocument();
	});

	test('Should render DialogModal with custom confirm and cancel button labels', async () => {
		let component: RenderComponent = initialRenderComponent;

		await act(async () => {
			component = render(<DialogModal {...baseProps} />);
		});

		const { getByText } = component;

		expect(getByText('Yes')).toBeInTheDocument();
		expect(getByText('Cancel')).toBeInTheDocument();
	});

	test('Should call onConfirm when Confirm button is clicked', async () => {
		const onConfirmMock = jest.fn();

		let component: RenderComponent = initialRenderComponent;

		await act(async () => {
			component = render(
				<DialogModal
					isOpen={true}
					onClose={() => {
						jest.fn();
					}}
					onConfirm={onConfirmMock}
				/>
			);
		});

		const { getByText } = component;

		fireEvent.click(getByText('Yes'));

		await waitFor(() => {
			expect(onConfirmMock).toHaveBeenCalledTimes(1);
		});
	});

	test('Should call onCancel when Cancel button is clicked', async () => {
		const onCancelMock = jest.fn();

		let component: RenderComponent = initialRenderComponent;

		await act(async () => {
			component = render(
				<DialogModal
					isOpen={true}
					onClose={() => {
						jest.fn();
					}}
					onCancel={onCancelMock}
				/>
			);
		});

		const { getByText } = component;

		fireEvent.click(getByText('Cancel'));

		await waitFor(() => {
			expect(onCancelMock).toHaveBeenCalledTimes(1);
		});
	});
});
