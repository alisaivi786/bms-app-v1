import { render, screen } from '@testing-library/react';
import { IStepperProps, Stepper } from './Stepper';

const createComponent = (props: IStepperProps) => render(<Stepper {...props} />);

const generateItems = () => [
	{
		title: 'Step 1',
		description: 'Description for Step 1',
	},
	{
		title: 'Step 2',
		description: 'Description for Step 2',
	},
	{
		title: 'Step 3',
		description: 'Description for Step 3',
	},
];

describe('Stepper Component', () => {
	test('should render correctly', () => {
		const items = generateItems();
		const { container } = createComponent({ items: items, current: 2 });

		expect(container).toMatchSnapshot();
	});

	test('Should render the correct number of steps', () => {
		const items = generateItems();

		render(<Stepper items={items} />);

		const steps = screen.getAllByRole('listitem');

		expect(steps).toHaveLength(items.length);
	});

	test('Should render the correct step titles', () => {
		const items = generateItems();

		render(<Stepper items={items} />);

		items.forEach((step) => {
			const titleElement = screen.getByText(step.title);

			expect(titleElement).toBeInTheDocument();
		});
	});

	test('Should render the correct step descriptions', () => {
		const items = generateItems();

		render(<Stepper items={items} />);

		items.forEach((step) => {
			const descriptionElement = screen.getByText(step.description);

			expect(descriptionElement).toBeInTheDocument();
		});
	});

	test('Should highlight the current step', () => {
		const items = generateItems();
		const currentStep = 2;

		render(<Stepper items={items} current={currentStep} />);

		const currentStepElement = screen.getByText(`Step ${currentStep}`);

		expect(currentStepElement).toHaveClass('font-bold');
	});

	test('Should display a completed step', () => {
		const items = generateItems();
		const completedStep = 1;

		render(<Stepper items={items} current={completedStep} />);

		const completedStepElement = screen.getByText(`Step ${completedStep}`);

		expect(completedStepElement).toHaveClass('text-title font-bold');
	});
});
