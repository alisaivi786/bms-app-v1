import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card, ICardProps } from '.';

const createComponent = (props: ICardProps) =>
	render(
		<Card {...props}>
			<div data-testid="children">Card test component</div>
		</Card>
	);

describe('Card Component', () => {
	test('should render correctly with default variant', () => {
		const { container } = createComponent({
			children: 'test children',
			variant: 'default',
			className: 'test-class-name',
		});

		expect(container).toMatchSnapshot();

		const heading = screen.getByText(/Card test component/i);

		expect(heading).toBeInTheDocument();

		const children = screen.getByTestId('children');

		expect(children).toBeInTheDocument();

		const card = screen.getByTestId('card');

		const colorClassName = card.className.includes('shadow-card');

		expect(colorClassName).toBeTruthy();

		const propClassName = card.className.includes('test-class-name');

		expect(propClassName).toBeTruthy();
	});

	test('should render correctly with responsive variant', () => {
		const { container } = createComponent({
			children: 'test children',
			variant: 'responsive',
			className: 'test-class-name',
		});

		expect(container).toMatchSnapshot();

		const heading = screen.getByText(/Card test component/i);

		expect(heading).toBeInTheDocument();

		const children = screen.getByTestId('children');

		expect(children).toBeInTheDocument();

		const card = screen.getByTestId('card');

		const borderClassName = card.className.includes('max-sm:p-0 max-sm:rounded-none max-sm:shadow-none');

		expect(borderClassName).toBeTruthy();

		const propClassName = card.className.includes('test-class-name');

		expect(propClassName).toBeTruthy();
	});
});
