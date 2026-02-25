import React from 'react';
import { render } from '@testing-library/react';
import { FormContainer, IFormContainerProps } from '.';

const createComponent = (props: IFormContainerProps) => render(<FormContainer {...props} />);

describe('FormContainer Component', () => {
	test('should render correctly with children', () => {
		const { container } = createComponent({
			children: 'hello world',
		});

		expect(container).toMatchSnapshot();
	});

	test('should render correctly with children and columnsCount', () => {
		const { container } = createComponent({
			children: <div>hello world</div>,
			columnsCount: 2,
		});

		expect(container).toMatchSnapshot();
	});
});
