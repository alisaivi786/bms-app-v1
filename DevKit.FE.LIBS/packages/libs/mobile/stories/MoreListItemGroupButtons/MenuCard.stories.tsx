import React from 'react';
import { Alert, Text } from 'react-native';
import {
	ChatIcon,
	GlobalIcon,
	NotificationIcon,
	QuestionMarkIcon,
	SfChevronForwardIcon,
	UserIcon,
} from '@devkit/icons/native';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import { MenuCard } from '../../src/components/MenuCard';
import { MenuCardProps } from '../../src/components/MenuCard/MenuCard.types';
import { Flexbox } from '../../src/layouts/Flexbox';

type ComponentType = (args: MenuCardProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => <MenuCard {...args} />;

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Components/MenuCard',
	component: MenuCard,
	render: Template,
};

export default StoryMeta;

export const Default = {
	args: {
		title: 'YOUR ACCOUNT & SETTINGS',
		items: [
			{ title: 'Notifications', icon: <NotificationIcon />, onPress: () => Alert.alert('Notifications pressed') },
			{ title: 'Country & Language', icon: <GlobalIcon />, onPress: () => Alert.alert('Country & Language pressed') },
			{ title: 'My Account', icon: <UserIcon />, onPress: () => Alert.alert('My Account pressed') },
		],
	},
};

export const Single = {
	args: {
		items: [
			{ title: 'Notifications', icon: <NotificationIcon />, onPress: () => Alert.alert('Notifications pressed') },
		],
	},
};

export const WithoutTitle = {
	args: {
		items: [
			{ title: 'Notifications', icon: <NotificationIcon />, onPress: () => Alert.alert('Notifications pressed') },
			{ title: 'Profile', icon: <UserIcon />, onPress: () => Alert.alert('Profile pressed') },
		],
	},
};

export const WithLeftAndRightComponents = {
	args: {
		items: [
			{ title: 'Profile', icon: <UserIcon />, onPress: () => Alert.alert('Profile pressed') },
			{
				startComponents: [
					{ component: <NotificationIcon /> },
					{
						component: (
							<Flexbox p={16}>
								<Text>Title</Text>
								<Text>Description</Text>
							</Flexbox>
						),
					},
				],
				endComponents: [{ component: <SfChevronForwardIcon /> }],
				onPress: () => Alert.alert('Notifications pressed'),
			},
			{ title: 'Profile', icon: <UserIcon />, onPress: () => Alert.alert('Profile pressed') },
		],
	},
};

export const MultipleGroups = {
	render: () => (
		<>
			<MenuCard
				title="YOUR ACCOUNT & SETTINGS"
				items={[
					{ title: 'Notifications', icon: <NotificationIcon />, onPress: () => Alert.alert('Notifications pressed') },
					{
						title: 'Country & Language',
						icon: <GlobalIcon />,
						onPress: () => Alert.alert('Country & Language pressed'),
					},
					{ title: 'My Account', icon: <UserIcon />, onPress: () => Alert.alert('My Account pressed') },
				]}
			/>
			<MenuCard
				title="Support"
				items={[
					{ title: 'FAQ', icon: <QuestionMarkIcon />, onPress: () => Alert.alert('Security pressed') },
					{ title: 'Chat with Us', icon: <ChatIcon />, onPress: () => Alert.alert('Payments pressed') },
				]}
			/>
		</>
	),
};
