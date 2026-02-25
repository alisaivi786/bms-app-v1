import { useState } from 'react';
import { useReactForm } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-vite';
import { Counter as CounterComponent, ICounterProps } from '../../../src/components/Counter';

type ComponentType = (args: ICounterProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [count, setCount] = useState<number>();
	const form = useReactForm<{ count: number }>({ initialValues: { count: args.value ?? 0 } });

	return (
		<div className="flex flex-col flex-start gap-8">
			<div className="flex flex-col gap-2 items-start">
				<p className="text-lg font-semibold">Controlled Counter</p>
				<CounterComponent {...args} value={count} onChange={setCount} />
			</div>
			<div className="flex flex-col gap-2 items-start">
				<p className="text-lg font-semibold">Uncontrolled Counter</p>
				<CounterComponent {...args} form={form} field="count" />
			</div>
		</div>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Forms/Counter',
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
	},
};

export default StoryMeta;

export const Counter = {
	args: {
		disabled: false,
	},
};
