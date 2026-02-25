import { render } from '@testing-library/react';
import { ISimpleActionMenuItem, SimpleActionsMenu } from '.';

const items: ISimpleActionMenuItem[] = [{ label: 'Label 1' }, { label: 'Label 2' }, { label: 'Label 3' }];

// eslint-disable-next-line @typescript-eslint/ban-types
const RenderComponent = (props: {}) =>
	render(
		<SimpleActionsMenu {...props} items={items}>
			Menu
		</SimpleActionsMenu>
	);

describe('SimpleActionsMenu', () => {
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
