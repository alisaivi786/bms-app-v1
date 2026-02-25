import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('<Button/>', () => {
	it('should render properly', () => {
		const testText = 'test text';

		render(<Button>{testText}</Button>);
		expect(screen.getByText(testText)).toBeInTheDocument();
	});

	it('should respond to an onClick', async () => {
		const user = userEvent.setup();
		const onClick = jest.fn();
		const testText = 'test text';

		render(<Button onClick={onClick}>{testText}</Button>);

		await act(async () => {
			await user.click(screen.getByRole('button'));
		});

		expect(onClick).toHaveBeenCalled();
	});
});
