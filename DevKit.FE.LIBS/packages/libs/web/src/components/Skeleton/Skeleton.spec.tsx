import React from 'react';
import { render, screen } from '@testing-library/react';
import { Skeleton } from '.';

const createComponent = (props: { className?: string }) => render(<Skeleton {...props} />);

describe('Skeleton Component', () => {
	test('should render correctly without className', () => {
		const { container } = createComponent({});

		expect(container).toMatchSnapshot();
	});

	test('should render correctly with className', () => {
		const { container } = createComponent({
			className: 'p-10',
		});

		const element = screen.getByTestId('skeleton-test-id');
		const elementClassName = element.className.includes('p-10');

		expect(container).toMatchSnapshot();
		expect(elementClassName).toBeTruthy();
	});
});
