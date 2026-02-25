import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import Button from '../../../src/components/Buttons/Button';
import {
	IMultiRangeSlider,
	MultiRangeSlider as MultiRangeSliderComponent,
} from '../../../src/components/MultiRangeSlider/MultiRangeSlider';

type ComponentType = (args: IMultiRangeSlider) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [state, setState] = useState({
		min: args.minValue,
		max: args.maxValue,
	});

	return (
		<div className="flex flex-col gap-20">
			<MultiRangeSliderComponent
				{...args}
				minValue={state.min}
				maxValue={state.max}
				onChange={(values) => {
					setState(values);
				}}
			/>
			<div>
				Current values: {state.min} - {state.max}
			</div>
			<div>
				<Button
					onClick={() => {
						setState({ min: args.minValue, max: args.maxValue });
					}}
				>
					Reset
				</Button>
			</div>
		</div>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/MultiRangeSlider',
	component: MultiRangeSliderComponent,
	render: Template,
};

export default StoryMeta;

export const MultiRangeSlider = {
	args: {
		min: 500000,
		max: 5000000,
		minRangeLimit: 500000,
		prefixData: 'AED',
		label: 'Annual Limit',
		minValue: 500000,
		maxValue: 5000000,
		throttleDuration: 500,
		disabled: false,
	},
};
