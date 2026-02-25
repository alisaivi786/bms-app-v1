import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { Timeline as TimelineComponent, TimelineProps } from '../../../src/components/Timeline';

type ItemType = { id: number; label: string };

type ComponentType = (args: TimelineProps<ItemType>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [options, setOptions] = useState<ItemType[]>(args.options);

	const call = () => {
		return new Promise((resolve) =>
			setTimeout(
				() =>
					resolve([
						{ id: 1, label: 'Benefits' },
						{ id: 2, label: 'Network List' },
						{ id: 3, label: 'Member Prices' },
						{ id: 4, label: 'Co Payments' },
						{ id: 5, label: 'Exclusion' },
					]),
				2000
			)
		) as Promise<ItemType[]>;
	};
	const onLoadMore = async () => {
		const res = await call();
		const newOptions = [...options, ...res];

		setOptions(newOptions);
	};

	const renderItem = (_: ItemType, index: number) => {
		return (
			<div className="flex flex-col gap-2">
				<p className={`${index % 2 ? 'text-end' : 'text-start'} font-bold text-gray-500 text-caption1`}>
					06/04/2023-11:48
				</p>
				<p className="font-bold nj-text-brand text-body">06/04/2023-11:48</p>
				<div>
					<p className="flex gap-1 text-paragraph">
						<span className="font-bold">By:</span> user1@shory.com
					</p>
					<p className="flex gap-1 text-paragraph">
						<span className="font-bold">Request Status:</span> user1@shory.com
					</p>
					<p className="flex gap-1 text-paragraph">
						<span className="font-bold">Comments:</span> ...
					</p>
				</div>
			</div>
		);
	};

	return (
		<div className="flex flex-col w-full gap-5" style={{ height: 400 }}>
			<TimelineComponent onLoadMore={onLoadMore} options={options} renderItem={renderItem} />
		</div>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/Timeline',
	component: TimelineComponent,
	render: Template,
};

export default StoryMeta;

export const Timeline = {
	args: {
		options: [
			{ id: 1, label: 'Benefits' },
			{ id: 2, label: 'Network List' },
			{ id: 3, label: 'Member Prices' },
			{ id: 4, label: 'Co Payments' },
			{ id: 5, label: 'Exclusion' },
		],
	},
};
