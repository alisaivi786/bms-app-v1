import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Form, FormProps } from '.';
import mockForm from '../../test-utils/mockForm';

interface IForm {
	name: string;
	age: number;
}

const form = mockForm<IForm>();

const createComponent = (props: FormProps<IForm>) => render(<Form {...props} />);

const createComponentHelper = (props: FormProps<IForm>) => {
	const component = createComponent({ ...props }).container;
	const element = component.firstChild as Node;

	return { component, element };
};

describe('Form Component', () => {
	test('should render correctly with children', () => {
		const { component } = createComponentHelper({
			children: 'hello world',
		});

		expect(component).toMatchSnapshot();
	});

	test('should render correctly with children and onReset', () => {
		const onReset = jest.fn();

		const { element } = createComponentHelper({
			children: 'hello world',
			onReset,
		});

		fireEvent.reset(element);

		expect(onReset).toHaveBeenCalledTimes(1);
	});

	test('should render correctly with children and onSubmit', () => {
		const onSubmit = jest.fn();

		const { element } = createComponentHelper({
			children: 'hello world',
			onSubmit,
		});

		fireEvent.submit(element);

		expect(onSubmit).toHaveBeenCalledTimes(1);
	});

	test('should render correctly with form and call (onSubmit,onReset) from the props', () => {
		const onSubmit = jest.fn();
		const onReset = jest.fn();

		const { element } = createComponentHelper({
			children: 'hello world',
			onSubmit,
			onReset,
			form,
		});

		fireEvent.submit(element);

		fireEvent.reset(element);

		expect(onReset).toHaveBeenCalledTimes(1);
		expect(onSubmit).toHaveBeenCalledTimes(1);
	});

	test('should render correctly with form and call submitForm and resetForm', () => {
		const { element } = createComponentHelper({
			children: 'hello world',
			form,
		});

		fireEvent.submit(element);

		fireEvent.reset(element);

		expect(form.submitForm).toHaveBeenCalledTimes(1);
		expect(form.resetForm).toHaveBeenCalledTimes(1);
	});
});
