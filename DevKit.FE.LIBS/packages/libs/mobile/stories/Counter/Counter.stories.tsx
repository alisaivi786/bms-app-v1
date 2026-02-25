import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import { Counter as CounterComponent, ICounterProps } from '../../src/components/Counter';

type ComponentType = (args: ICounterProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [count, setCount] = useState<number>();

	return <CounterComponent {...args} value={count} onChange={setCount} />;
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Components/Counter',
	component: CounterComponent,
	render: Template,
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
			defaultValue: 'small',
			description: 'Size of the counter',
		},
		min: {
			control: 'number',
			defaultValue: 0,
			description: 'Minimum value for the counter',
		},
		max: {
			control: 'number',
			defaultValue: 10,
			description: 'Maximum value for the counter',
		},
		disabled: {
			control: 'boolean',
			defaultValue: false,
			description: 'Disabled state of the counter',
		},
	},
};

export default StoryMeta;

export const Counter = {
	args: {
		disabled: false,
	},
};
