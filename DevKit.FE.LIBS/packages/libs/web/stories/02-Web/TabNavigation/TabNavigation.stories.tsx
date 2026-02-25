import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { ITabNavigation, ITabProps, TabNavigation } from '../../../src/components/TabNavigation';

type ComponentType = (args: ITabNavigation) => JSX.Element;

const MyCustomComponent = ({ tabName }: { tabName: string }) => {
	return (
		<div>
			<p>{tabName}</p>
			<div>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat mauris vitae ante tempor consequat.
				Maecenas sed risus vitae velit gravida mattis ut eu ligula. Curabitur in ipsum non sem pharetra fringilla. Nulla
				consectetur rutrum nulla, vel malesuada mi venenatis ac. Curabitur a magna tristique, semper erat vel, venenatis
				erat. Maecenas porttitor tristique risus, id mattis lacus dignissim condimentum. Phasellus nibh risus, euismod
				finibus lobortis eget, dictum id enim. Vestibulum condimentum sapien eu viverra hendrerit. Duis at augue in ex
				feugiat fermentum vitae vehicula elit. Nunc lectus tellus, congue eget ligula quis, bibendum accumsan libero. In
				mattis lacus enim, sit amet volutpat ipsum placerat eu. Aliquam neque ligula, facilisis ut velit nec, euismod
				placerat velit. Duis ac magna lectus. Suspendisse maximus tempus porta.Lorem ipsum dolor sit amet, consectetur
				adipiscing elit. Nulla volutpat mauris vitae ante tempor consequat. Maecenas sed risus vitae velit gravida
				mattis ut eu ligula. Curabitur in ipsum non sem pharetra fringilla. Nulla consectetur rutrum nulla, vel
				malesuada mi venenatis ac. Curabitur a magna tristique, semper erat vel, venenatis erat. Maecenas porttitor
				tristique risus, id mattis lacus dignissim condimentum. Phasellus nibh risus, euismod finibus lobortis eget,
				dictum id enim. Vestibulum condimentum sapien eu viverra hendrerit. Duis at augue in ex feugiat fermentum vitae
				vehicula elit. Nunc lectus tellus, congue eget ligula quis, bibendum accumsan libero. In mattis lacus enim, sit
				amet volutpat ipsum placerat eu. Aliquam neque ligula, facilisis ut velit nec, euismod placerat velit. Duis ac
				magna lectus. Suspendisse maximus tempus porta.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
				volutpat mauris vitae ante tempor consequat. Maecenas sed risus vitae velit gravida mattis ut eu ligula.
				Curabitur in ipsum non sem pharetra fringilla. Nulla consectetur rutrum nulla, vel malesuada mi venenatis ac.
				Curabitur a magna tristique, semper erat vel, venenatis erat. Maecenas porttitor tristique risus, id mattis
				lacus dignissim condimentum. Phasellus nibh risus, euismod finibus lobortis eget, dictum id enim. Vestibulum
				condimentum sapien eu viverra hendrerit. Duis at augue in ex feugiat fermentum vitae vehicula elit. Nunc lectus
				tellus, congue eget ligula quis, bibendum accumsan libero. In mattis lacus enim, sit amet volutpat ipsum
				placerat eu. Aliquam neque ligula, facilisis ut velit nec, euismod placerat velit. Duis ac magna lectus.
				Suspendisse maximus tempus porta.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat mauris
				vitae ante tempor consequat. Maecenas sed risus vitae velit gravida mattis ut eu ligula. Curabitur in ipsum non
				sem pharetra fringilla. Nulla consectetur rutrum nulla, vel malesuada mi venenatis ac. Curabitur a magna
				tristique, semper erat vel, venenatis erat. Maecenas porttitor tristique risus, id mattis lacus dignissim
				condimentum. Phasellus nibh risus, euismod finibus lobortis eget, dictum id enim. Vestibulum condimentum sapien
				eu viverra hendrerit. Duis at augue in ex feugiat fermentum vitae vehicula elit. Nunc lectus tellus, congue eget
				ligula quis, bibendum accumsan libero. In mattis lacus enim, sit amet volutpat ipsum placerat eu. Aliquam neque
				ligula, facilisis ut velit nec, euismod placerat velit. Duis ac magna lectus. Suspendisse maximus tempus
				porta.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat mauris vitae ante tempor
				consequat. Maecenas sed risus vitae velit gravida mattis ut eu ligula. Curabitur in ipsum non sem pharetra
				fringilla. Nulla consectetur rutrum nulla, vel malesuada mi venenatis ac. Curabitur a magna tristique, semper
				erat vel, venenatis erat. Maecenas porttitor tristique risus, id mattis lacus dignissim condimentum. Phasellus
				nibh risus, euismod finibus lobortis eget, dictum id enim. Vestibulum condimentum sapien eu viverra hendrerit.
				Duis at augue in ex feugiat fermentum vitae vehicula elit. Nunc lectus tellus, congue eget ligula quis, bibendum
				accumsan libero. In mattis lacus enim, sit amet volutpat ipsum placerat eu. Aliquam neque ligula, facilisis ut
				velit nec, euismod placerat velit. Duis ac magna lectus. Suspendisse maximus tempus porta.Lorem ipsum dolor sit
				amet, consectetur adipiscing elit. Nulla volutpat mauris vitae ante tempor consequat. Maecenas sed risus vitae
				velit gravida mattis ut eu ligula. Curabitur in ipsum non sem pharetra fringilla. Nulla consectetur rutrum
				nulla, vel malesuada mi venenatis ac. Curabitur a magna tristique, semper erat vel, venenatis erat. Maecenas
				porttitor tristique risus, id mattis lacus dignissim condimentum. Phasellus nibh risus, euismod finibus lobortis
				eget, dictum id enim. Vestibulum condimentum sapien eu viverra hendrerit. Duis at augue in ex feugiat fermentum
				vitae vehicula elit. Nunc lectus tellus, congue eget ligula quis, bibendum accumsan libero. In mattis lacus
				enim, sit amet volutpat ipsum placerat eu. Aliquam neque ligula, facilisis ut velit nec, euismod placerat velit.
				Duis ac magna lectus. Suspendisse maximus tempus porta.
			</div>
		</div>
	);
};

const filledTabList: ITabProps[] = [
	{
		title: 'Quote List',
		tabPanel: () => <MyCustomComponent tabName="Quote List Tab" />,
	},
	{
		title: 'Compare Categories',
		tabPanel: () => <MyCustomComponent tabName="Compare Categories Tab" />,
	},
];

const noTabsPanelList: ITabProps[] = [
	{
		title: 'Quote List',
	},
	{
		title: 'Compare Categories',
	},
	{
		title: 'Compare Plans',
	},
];

const longTabList: ITabProps[] = [
	{
		title: 'Quote List',
		tabPanel: () => <MyCustomComponent tabName="Quote List Tab" />,
	},
	{
		title: 'Compare Categories',
		tabPanel: () => <MyCustomComponent tabName="Compare Categories Tab" />,
	},
	{
		title: 'Compare Categories',
		tabPanel: () => <MyCustomComponent tabName="Compare Categories Tab" />,
	},
	{
		title: 'Compare Categories',
		tabPanel: () => <MyCustomComponent tabName="Compare Categories Tab" />,
	},
	{
		title: 'Compare Categories',
		tabPanel: () => <MyCustomComponent tabName="Compare Categories Tab" />,
	},
	{
		title: 'Compare Categories',
		tabPanel: () => <MyCustomComponent tabName="Compare Categories Tab" />,
	},
	{
		title: 'Compare Categories',
		tabPanel: () => <MyCustomComponent tabName="Compare Categories Tab" />,
	},
];

const Template: StoryFn<ComponentType> = (args) => {
	const [selectedTab, setSelectedTab] = useState(0);

	return (
		<div className="h-full">
			<TabNavigation
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
	title: 'Web/Components/TabNavigation',
	component: TabNavigation,
	render: Template,
	argTypes: {
		variant: {
			control: 'select',
			options: ['filled', 'filled-dark', 'gradient'],
			defaultValue: 'filled-dark',
		},
	},
};

export default StoryMeta;

export const Filled = {
	args: {
		tabs: longTabList,
		variant: 'filled',
		titleContainerWidth: 'fit-content',
	},
};

export const FilledDark = {
	args: {
		tabs: filledTabList,
		variant: 'filled-dark',
	},
};

export const Gradient = {
	args: {
		tabs: filledTabList,
		variant: 'gradient',
	},
};

export const TabNavigationWithActionComponent = {
	args: {
		tabs: longTabList,
		titleContainerWidth: 'fit-content',
		variant: 'filled',
		actionComponent: (
			<div className="flex flex-col items-start font-bold text-right text-paragraph">
				<div>Created On: ‎05/03/2024 05:36 PM</div>
				<div>Last Update On: ‎05/03/2024 10:36 PM</div>
			</div>
		),
	},
};

export const TabNavigationWitDisabledTransition = {
	args: {
		tabs: longTabList,
		titleContainerWidth: 'fit-content',
		variant: 'filled',
		disableTransition: true,
	},
};

export const TabNavigationWithTabsOnly = {
	args: {
		tabs: noTabsPanelList,
		titleContainerWidth: 'fit-content',
		variant: 'filled',
	},
};

const dateRangeTabsList = [
	{
		title: 'Today',
		tabPanel: () => <MyCustomComponent tabName="Today" />,
	},
	{
		title: 'Yesterday',
		tabPanel: () => <MyCustomComponent tabName="Yesterday" />,
	},
	{
		title: 'Last 7 Days',
		tabPanel: () => <MyCustomComponent tabName="Last 7 Days" />,
	},
	{
		title: 'Last 30 Days',
		tabPanel: () => <MyCustomComponent tabName="Last 30 Days" />,
	},
	{
		title: 'Custom Date',
		tabPanel: () => <MyCustomComponent tabName="Custom Date" />,
	},
];

export const TabNavigationDateRange = {
	args: {
		tabs: dateRangeTabsList,
		titleContainerWidth: 'fit-content',
		variant: 'gradient',
	},
};
