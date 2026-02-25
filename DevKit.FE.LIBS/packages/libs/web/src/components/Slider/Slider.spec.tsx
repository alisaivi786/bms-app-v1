import { render, screen } from '@testing-library/react';
import { Slider } from './Slider';

jest.mock('./Slider-original.min.css', () => jest.fn());
jest.mock('./Slider.css', () => jest.fn());
describe('Slider component', () => {
	const items = ['Slide 1', 'Slide 2', 'Slide 3'];

	test('Should render correctly', () => {
		const { asFragment } = render(
			<Slider
				interval={1500}
				items={items.map((item, index) => (
					<div key={index}>{item}</div>
				))}
			/>
		);

		expect(asFragment()).toMatchSnapshot();
	});

	test('should render the Slider with the correct number of slides', async () => {
		const items = ['Slide 1', 'Slide 2', 'Slide 3'];

		render(
			<Slider
				items={items.map((item, index) => (
					<div key={index}>{item}</div>
				))}
			/>
		);

		const slides = screen.getAllByText(/Slide /i);

		expect(slides).toHaveLength(5);
	});

	test('should render the Slider with the correct indicators', () => {
		const items = ['Slide 1', 'Slide 2', 'Slide 3'];
		const { container } = render(
			<Slider
				items={items.map((item, index) => (
					<div key={index}>{item}</div>
				))}
			/>
		);

		const indicators = container.querySelectorAll('.ml-2.inline-flex.h-2.w-2');

		expect(indicators).toHaveLength(3);
	});

	test('should render the Slider with the correct active indicator', () => {
		const items = ['Slide 1', 'Slide 2', 'Slide 3'];
		const { container } = render(
			<Slider
				items={items.map((item, index) => (
					<div key={index}>{item}</div>
				))}
			/>
		);

		const activeIndicator = container.querySelector('.selected');

		expect(activeIndicator).toBeTruthy();
	});
});
