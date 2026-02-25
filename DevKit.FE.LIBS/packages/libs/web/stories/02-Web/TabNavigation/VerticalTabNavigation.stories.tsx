import { useState } from 'react';
import { ErrorIcon, RecycleIcon, WarningIcon } from '@devkit/icons/web';
import { Meta, StoryFn } from '@storybook/react-vite';
import {
	IVerticalTabNavigation,
	IVerticalTabProps,
	VerticalTabNavigation as VerticalTabNavigationComponent,
} from '../../../src/components/TabNavigation';

type ComponentType = (args: IVerticalTabNavigation) => JSX.Element;

const MyCustomComponent = ({ tabName }: { tabName: string }) => {
	return (
		<div>
			<p>{tabName}</p>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quo quisquam ex iusto enim odio laboriosam
				quaerat ducimus quidem ad.
			</p>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quo quisquam ex iusto enim odio laboriosam
				quaerat ducimus quidem ad.
			</p>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quo quisquam ex iusto enim odio laboriosam
				quaerat ducimus quidem ad.
			</p>
		</div>
	);
};

const tabs: IVerticalTabProps[] = [
	{
		title: 'Personal',
		disabled: true,
		tabPanel: () => <MyCustomComponent tabName="Quote List Tab" />,
	},
	{
		title: 'Policy Category',
		icon: <ErrorIcon className="text-red-500" />,
		tabPanel: () => <MyCustomComponent tabName="Compare Categories Tab" />,
	},
	{
		title: 'Health Declaration',
		icon: <WarningIcon className="text-yellow-500" />,
		tabPanel: () => <MyCustomComponent tabName="Compare Categories Tab" />,
	},
];

const Template: StoryFn<ComponentType> = (args) => {
	const [selectedTab, setSelectedTab] = useState(0);

	return (
		<div className="h-full">
			<VerticalTabNavigationComponent
				{...args}
				selectedTabIndex={selectedTab}
				onSelectedTabIndexChanged={(index) => {
					setSelectedTab(index);
				}}
			/>
		</div>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/VerticalTabNavigationComponent',
	component: VerticalTabNavigationComponent,
	render: Template,
};

export default StoryMeta;

export const VerticalTabNavigation = {
	args: {
		tabs,
		footer: (
			<div className="flex flex-row items-center justify-center rounded-b-md border-t py-2">
				<div className="flex flex-row items-center gap-3">
					<RecycleIcon className="text-red-500 opacity-80" />
					<p>Delete member</p>
				</div>
			</div>
		),
	},
};
