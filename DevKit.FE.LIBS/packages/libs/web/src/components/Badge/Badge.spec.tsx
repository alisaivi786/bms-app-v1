import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge, ITagProps } from '.';

const createComponent = (props: ITagProps) => render(<Badge {...props} />);

describe('Badge Component', () => {
	test('should render correctly', () => {
		const { container } = createComponent({
			title: 'Badge test title',
			variant: 'Default',
			status: 'Neutral',
			showIcon: false,
		});

		expect(container).toMatchSnapshot();

		const badgeVariant = screen.getByTestId('badge').className.includes('bg-white');

		expect(badgeVariant).toBeTruthy();

		const title = screen.getByText(/Badge test title/i);

		expect(title).toBeInTheDocument();
	});

	test('should render Default Info status correctly', () => {
		createComponent({
			title: 'Badge test title',
			variant: 'Default',
			status: 'Info',
			showIcon: false,
		});
		const badgeVariant = screen.getByTestId('badge').className.includes('bg-brand-100');

		expect(badgeVariant).toBeTruthy();
	});

	test('should render Accent Info status correctly', () => {
		createComponent({
			title: 'Badge test title',
			variant: 'Accent',
			status: 'Info',
			showIcon: false,
		});
		const badgeVariant = screen.getByTestId('badge').className.includes('nj-bg-brand');

		expect(badgeVariant).toBeTruthy();
	});

	test('should render AccentRounded Info status correctly', () => {
		createComponent({
			title: 'Badge test title',
			variant: 'AccentRounded',
			status: 'Info',
			showIcon: false,
		});
		const badgeVariant = screen.getByTestId('badge').className.includes('nj-bg-brand');

		expect(badgeVariant).toBeTruthy();
	});

	test('should render Default Neutral status correctly', () => {
		createComponent({
			title: 'Badge test title',
			variant: 'Default',
			status: 'Neutral',
			showIcon: false,
		});
		const badgeVariant = screen.getByTestId('badge').className.includes('bg-white border-gray-200');

		expect(badgeVariant).toBeTruthy();
	});

	test('should render Accent Neutral status correctly', () => {
		createComponent({
			title: 'Badge test title',
			variant: 'Accent',
			status: 'Neutral',
			showIcon: false,
		});
		const badgeVariant = screen.getByTestId('badge').className.includes('bg-white !text-black border-gray-200');

		expect(badgeVariant).toBeTruthy();
	});
});
