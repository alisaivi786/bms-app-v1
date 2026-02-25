import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import { JourneyStepper } from './JourneyStepper';

jest.mock('../../layouts', () => ({
	useMobileUIConfigOptions: () => ({
		tw: () => ({}),
	}),
}));

jest.mock('@devkit/icons/native', () => ({
	SfChevronDownIcon: () => <></>,
	SfChevronUpIcon: () => <></>,
	SfCheckmarkIcon: () => <></>,
}));

const steps = [
	{ title: 'Step 1', content: 'Content 1' },
	{ title: 'Step 2', content: 'Content 2' },
	{ title: 'Step 3', content: 'Content 3' },
];

describe('JourneyStepper', () => {
	it('renders header and progress bar', () => {
		const { getByText } = render(<JourneyStepper steps={steps} currentStepIndex={0} />);

		expect(getByText('Step 1')).toBeTruthy();
	});

	it('renders all steps in modal when opened', () => {
		const { getByText, queryByText } = render(<JourneyStepper steps={steps} currentStepIndex={1} />);

		expect(getByText('Step 2')).toBeTruthy();

		expect(queryByText('Content 1')).toBeNull();

		act(() => {
			fireEvent.press(getByText('Step 2'));
		});
		expect(getByText('Content 1')).toBeTruthy();

		expect(getByText('Content 2')).toBeTruthy();

		expect(getByText('Content 3')).toBeTruthy();
	});

	it('calls onStepPress when a step is pressed', () => {
		const onStepPress = jest.fn();

		const { getByText } = render(<JourneyStepper steps={steps} currentStepIndex={0} onStepPress={onStepPress} />);

		act(() => {
			fireEvent.press(getByText('Step 1'));
		});

		act(() => {
			fireEvent.press(getByText('Step 2'));
		});

		expect(onStepPress).toHaveBeenCalledWith(1);
	});

	it('closes modal when background is touched', () => {
		const { getByText, queryByText, getByLabelText } = render(<JourneyStepper steps={steps} currentStepIndex={0} />);

		act(() => {
			fireEvent.press(getByText('Step 1'));
		});

		expect(getByText('Content 1')).toBeTruthy();

		const modalOverlay = getByLabelText('Close modal by touching background');

		act(() => {
			fireEvent.press(modalOverlay);
		});

		expect(queryByText('Content 1')).toBeNull();
	});

	it('closes modal when close icon is pressed', () => {
		const { getByText, queryByText, getByLabelText } = render(<JourneyStepper steps={steps} currentStepIndex={0} />);

		act(() => {
			fireEvent.press(getByText('Step 1'));
		});

		expect(getByText('Content 1')).toBeTruthy();

		const closeIcon = getByLabelText('Close step modal');

		act(() => {
			fireEvent.press(closeIcon);
		});

		expect(queryByText('Content 1')).toBeNull();
	});

	it('renders completed, active, and future steps correctly', () => {
		const { getByText, getAllByText } = render(<JourneyStepper steps={steps} currentStepIndex={1} />);

		act(() => {
			fireEvent.press(getByText('Step 2'));
		});

		expect(getAllByText('Step 1').length).toBeGreaterThan(0);

		expect(getAllByText('Step 2').length).toBeGreaterThan(0);

		expect(getAllByText('Step 3').length).toBeGreaterThan(0);
	});

	it('renders with only one step', () => {
		const { getByText } = render(<JourneyStepper steps={[{ title: 'Only Step' }]} currentStepIndex={0} />);

		expect(getByText('Only Step')).toBeTruthy();
	});

	it('does not crash with empty steps', () => {
		const { toJSON } = render(<JourneyStepper steps={[]} currentStepIndex={0} />);

		expect(toJSON()).toBeTruthy();
	});

	it('does not allow currentStepIndex out of bounds', () => {
		const { getByText } = render(<JourneyStepper steps={steps} currentStepIndex={100} />);

		expect(getByText('Step 3')).toBeTruthy();

		const { getByText: getByText2 } = render(<JourneyStepper steps={steps} currentStepIndex={-5} />);

		expect(getByText2('Step 1')).toBeTruthy();
	});

	it('renders step with missing content', () => {
		const stepsWithMissingContent = [{ title: 'Step 1' }, { title: 'Step 2', content: 'Content 2' }];
		const { getByText } = render(<JourneyStepper steps={stepsWithMissingContent} currentStepIndex={0} />);

		expect(getByText('Step 1')).toBeTruthy();
		// Open modal to see all steps
		act(() => {
			fireEvent.press(getByText('Step 1'));
		});

		expect(getByText('Step 2')).toBeTruthy();
	});

	it('matches snapshot', () => {
		const { toJSON } = render(<JourneyStepper steps={steps} currentStepIndex={1} />);

		expect(toJSON()).toMatchSnapshot();
	});
});
