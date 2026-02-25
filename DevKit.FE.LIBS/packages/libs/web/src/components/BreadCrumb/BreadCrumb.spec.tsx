import React from 'react';
import { render, screen } from '@testing-library/react';
import { BreadCrumb, IBreadCrumb } from '.';

const createComponent = (props: IBreadCrumb) => render(<BreadCrumb {...props} />);

describe('BreadCrumb Component', () => {
	test('should render correctly with empty links', () => {
		const { container } = createComponent({
			links: [],
		});

		expect(container).toMatchSnapshot();
		const elements = screen.queryAllByRole('listitem').length;

		expect(elements).toBe(0);
	});

	test('should render correctly with one link without arrow', () => {
		const fakeLinks = [{ title: 'google', href: 'www.google.com' }];

		const { container } = createComponent({
			links: fakeLinks,
		});

		expect(container).toMatchSnapshot();

		const icon = screen.queryByTestId('arrow-right-icon');
		const elements = screen.getAllByRole('listitem').length;

		expect(icon).not.toBeInTheDocument();
		expect(elements).toBe(1);
	});

	test('should render correctly with two links with arrow', () => {
		const fakeLinks = [
			{ title: 'google', href: 'www.google.com' },
			{ title: 'youtube', href: 'www.youtube.com' },
		];

		const { container } = createComponent({
			links: fakeLinks,
		});

		expect(container).toMatchSnapshot();

		const icon = screen.getByTestId('arrow-right-icon');
		const elements = screen.getAllByRole('listitem').length;

		expect(icon).toBeInTheDocument();
		expect(elements).toBe(2);
	});

	test('should render correct link color for one link', () => {
		const fakeLinks = [{ title: 'google', href: 'www.google.com' }];

		createComponent({
			links: fakeLinks,
		});

		const elementColor = screen.getByRole('listitem').children[0].className.includes('text-gray-700');

		expect(elementColor).toBeTruthy();
	});

	test('should render correct link color for two links', () => {
		const fakeLinks = [
			{ title: 'facebook', href: 'www.facebook.com', isDisabled: true },
			{ title: 'google', href: 'www.google.com' },
			{ title: 'youtube', href: 'www.youtube.com' },
		];

		createComponent({
			links: fakeLinks,
		});

		const elements = screen.getAllByRole('listitem');

		const firstElementColor = elements[0].children[0].className.includes('text-gray-700');
		const secondElementColor = elements[1].children[0].className.includes('nj-text-brand');
		const thirdElementColor = elements[2].children[0].className.includes('text-gray-700');

		expect(firstElementColor).toBeTruthy();
		expect(secondElementColor).toBeTruthy();
		expect(thirdElementColor).toBeTruthy();
	});
});
