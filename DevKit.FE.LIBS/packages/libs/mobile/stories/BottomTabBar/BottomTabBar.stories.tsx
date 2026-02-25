import { useState } from 'react';
import { Text, View } from 'react-native';
import { HomeIcon, SearchIcon, SettingsIcon, UploadIcon, UserIcon } from '@devkit/icons/native';
import { Meta, StoryObj } from '@storybook/react';
import { BottomTabBar } from '../../src/components/BottomTabBar';

const tabs = [
	{ label: 'Home', icon: <HomeIcon width={22} height={22} style={{ color: '#FFFFFF' }} /> },
	{ label: 'Profile', icon: <UserIcon width={22} height={22} style={{ color: '#FFFFFF' }} /> },
	{ label: 'Settings', icon: <SettingsIcon width={22} height={22} style={{ color: '#FFFFFF' }} /> },
	{ label: 'Upload', icon: <UploadIcon width={22} height={22} style={{ color: '#FFFFFF' }} /> },
	{ label: 'Search', icon: <SearchIcon width={22} height={22} style={{ color: '#FFFFFF' }} /> },
];

const meta: Meta<typeof BottomTabBar> = {
	title: 'Mobile/Components/BottomTabBar',
	component: BottomTabBar,
	args: {
		backgroundColor: '#000000',
		activePillColor: '#2563FF',
		labelColor: '#FFFFFF',
		tabs: tabs.map((tab) => ({
			...tab,
			isFocused: false,
			onPress: () => {},
		})),
	},
	argTypes: {
		backgroundColor: { control: 'color' },
		activePillColor: { control: 'color' },
		labelColor: { control: 'color' },
	},
};

export default meta;

type Story = StoryObj<typeof BottomTabBar>;

export const Default: Story = {
	render: (args) => {
		const [activeIndex, setActiveIndex] = useState(0);

		const tabs = args.tabs.map((tab, idx) => ({
			...tab,
			isFocused: idx === activeIndex,
			onPress: () => {
				setActiveIndex(idx);
			},
		}));

		return (
			<View style={{ flex: 1, justifyContent: 'flex-end' }}>
				<BottomTabBar {...args} tabs={tabs} bounce={true} />
			</View>
		);
	},
};

export const ThreeTabs: Story = {
	render: (args) => {
		const [activeIndex, setActiveIndex] = useState(0);
		const threeTabs = tabs.slice(0, 3).map((tab) => ({
			...tab,
			isFocused: false,
			onPress: () => {},
		}));

		const tabsWithState = threeTabs.map((tab, idx) => ({
			...tab,
			isFocused: idx === activeIndex,
			onPress: () => {
				setActiveIndex(idx);
			},
		}));

		return (
			<View style={{ flex: 1, justifyContent: 'flex-end' }}>
				<BottomTabBar {...args} tabs={tabsWithState} bounce={true} />
			</View>
		);
	},
};

export const FourTabs: Story = {
	render: (args) => {
		const [activeIndex, setActiveIndex] = useState(0);
		const fourTabs = tabs.slice(0, 4).map((tab) => ({
			...tab,
			isFocused: false,
			onPress: () => {},
		}));

		const tabsWithState = fourTabs.map((tab, idx) => ({
			...tab,
			isFocused: idx === activeIndex,
			onPress: () => {
				setActiveIndex(idx);
			},
		}));

		return (
			<View style={{ flex: 1, justifyContent: 'flex-end' }}>
				<BottomTabBar {...args} tabs={tabsWithState} bounce={true} />
			</View>
		);
	},
};

export const TwoTabs: Story = {
	render: (args) => {
		const [activeIndex, setActiveIndex] = useState(0);
		const twoTabs = tabs.slice(0, 2).map((tab) => ({
			...tab,
			isFocused: false,
			onPress: () => {},
		}));

		const tabsWithState = twoTabs.map((tab, idx) => ({
			...tab,
			isFocused: idx === activeIndex,
			onPress: () => {
				setActiveIndex(idx);
			},
		}));

		return (
			<View style={{ flex: 1, justifyContent: 'flex-end' }}>
				<BottomTabBar {...args} tabs={tabsWithState} bounce={true} />
			</View>
		);
	},
};

export const FiveTabs: Story = {
	render: (args) => {
		const [activeIndex, setActiveIndex] = useState(0);

		const tabsWithState = args.tabs.map((tab, idx) => ({
			...tab,
			isFocused: idx === activeIndex,
			onPress: () => {
				setActiveIndex(idx);
			},
		}));

		return (
			<View style={{ flex: 1, justifyContent: 'flex-end' }}>
				<BottomTabBar {...args} tabs={tabsWithState} bounce={true} />
			</View>
		);
	},
};

export const WithoutBounce: Story = {
	render: (args) => {
		const [activeIndex, setActiveIndex] = useState(0);

		const tabsWithState = args.tabs.map((tab, idx) => ({
			...tab,
			isFocused: idx === activeIndex,
			onPress: () => {
				setActiveIndex(idx);
			},
		}));

		return (
			<View style={{ flex: 1, justifyContent: 'flex-end' }}>
				<BottomTabBar {...args} tabs={tabsWithState} bounce={false} />
			</View>
		);
	},
};

export const ThreeTabsWithoutBounce: Story = {
	render: (args) => {
		const [activeIndex, setActiveIndex] = useState(0);
		const threeTabs = tabs.slice(0, 3).map((tab) => ({
			...tab,
			isFocused: false,
			onPress: () => {},
		}));

		const tabsWithState = threeTabs.map((tab, idx) => ({
			...tab,
			isFocused: idx === activeIndex,
			onPress: () => {
				setActiveIndex(idx);
			},
		}));

		return (
			<View style={{ flex: 1, justifyContent: 'flex-end' }}>
				<BottomTabBar {...args} tabs={tabsWithState} bounce={false} />
			</View>
		);
	},
};
