import React from 'react';
import { render, screen } from '@testing-library/react';
import { ISpinnerProps, Spinner } from './Spinner';

const createComponent = (props: ISpinnerProps) => render(<Spinner {...props}></Spinner>);

describe('Spinner Component', () => {
	test('should render correctly with border-2', () => {
		const { container } = createComponent({
			size: 20,
			borderWidth: 2,
		});
		const spinner = screen.getByTestId('spinner');
		const spinnerWidth = screen.getByTestId('spinner').style.width.includes('20');
		const spinnerHeight = screen.getByTestId('spinner').style.width.includes('20');

		expect(container).toMatchSnapshot();
		expect(spinner).toBeInTheDocument();
		expect(spinnerWidth).toBeTruthy();
		expect(spinnerHeight).toBeTruthy();
	});

	test('should render successfully with danger state', () => {
		const { container } = createComponent({
			size: 20,
			borderWidth: 2,
			state: 'danger',
		});
		const spinner = screen.getByTestId('spinner');

		expect(container).toMatchSnapshot();
		expect(spinner).toBeInTheDocument();
	});

	test('should render successfully with success state', () => {
		const { container } = createComponent({
			size: 20,
			borderWidth: 2,
			state: 'success',
		});
		const spinner = screen.getByTestId('spinner');

		expect(container).toMatchSnapshot();
		expect(spinner).toBeInTheDocument();
	});
});
