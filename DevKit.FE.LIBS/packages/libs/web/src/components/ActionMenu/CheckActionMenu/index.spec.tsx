import { render } from '@testing-library/react';
import { CheckActionMenu } from '.';

const items = [
	{ id: 0, label: 'Label 1' },
	{ id: 1, label: 'Label 2' },
	{ id: 2, label: 'Label 3' },
];

const mockedOnChange = jest.fn();

// eslint-disable-next-line @typescript-eslint/ban-types
const RenderComponent = (props: {}) =>
	render(
		<CheckActionMenu {...props} items={items} onChange={mockedOnChange} value={0}>
			Menu
		</CheckActionMenu>
	);

describe('CheckActionMenu', () => {
	test('Should match the snapshot when disabled prop equal to true', () => {
		const { container } = RenderComponent({
			disabled: true,
		});

		expect(container).toMatchSnapshot();
	});

	test('Should match the snapshot when disabled prop equal to false', () => {
		const { container } = RenderComponent({
			disabled: false,
		});

		expect(container).toMatchSnapshot();
	});

	test('Should match secondary variant', () => {
		const { container } = RenderComponent({
			variant: 'secondary',
		});

		expect(container).toMatchSnapshot();
	});

	test('Should match text variant', () => {
		const { container } = RenderComponent({
			variant: 'text',
		});

		expect(container).toMatchSnapshot();
	});

	test('Should match large textSize variant', () => {
		const { container } = RenderComponent({
			textSize: 'large',
		});

		expect(container).toMatchSnapshot();
	});

	test('Should match medium textSize variant', () => {
		const { container } = RenderComponent({
			textSize: 'medium',
		});

		expect(container).toMatchSnapshot();
	});
});
