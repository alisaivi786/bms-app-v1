import { render, screen } from '@testing-library/react';
import { ISimpleStepperProps, SimpleStepper } from '.';

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useCallback: (callback: (arg1: number, arg2: string) => boolean) => callback,
}));

const createComponent = (props: ISimpleStepperProps) => render(<SimpleStepper {...props} />);

describe('SimpleStepper Component', () => {
	test('Should match the snapshot', () => {
		const items = ['Step 1', 'Step 2', 'Step 3'];
		const currentStep = 2;

		const { container } = createComponent({ items: items, current: currentStep });

		expect(container.firstChild).toMatchSnapshot();
	});

	test('Should render the correct number of steps', () => {
		const items = ['Step 1', 'Step 2', 'Step 3'];
		const currentStep = 2;

		render(<SimpleStepper items={items} current={currentStep} />);

		const stepElements = screen.getAllByRole('listitem');

		expect(stepElements).toHaveLength(items.length);
	});

	test('Should display the correct step text', () => {
		const items = ['Step 1', 'Step 2', 'Step 3'];
		const currentStep = 2;

		render(<SimpleStepper items={items} current={currentStep} />);

		items.forEach((stepText) => {
			const stepElement = screen.getByText(stepText);

			expect(stepElement).toBeInTheDocument();
		});
	});

	test('Should apply the correct styling to the current step', () => {
		const items = ['Step 1', 'Step 2', 'Step 3'];
		const currentStep = 2;

		render(<SimpleStepper items={items} current={currentStep} />);

		const currentStepElement = screen.getByText(items[currentStep - 1]);

		expect(currentStepElement).toHaveClass('nj-stepper-active md:nj-stepper-font-size-md');
	});
});
