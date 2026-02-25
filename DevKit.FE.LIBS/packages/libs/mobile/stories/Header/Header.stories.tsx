import { Alert, View } from 'react-native';
import { NotificationIcon, PersonCircleFilledIcon, SfChevronBackwardIcon } from '@devkit/icons/native';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import { useMobileUIConfigOptions } from '../../src';
import { AppHeaderComponent } from '../../src/components/Header';
import { AppHeaderProps } from '../../src/components/Header/AppHeader.types';

const Template: StoryFn<AppHeaderProps> = (args) => {
	const { tw } = useMobileUIConfigOptions();
	return (
		<View style={tw`flex-1 bg-gray-100`}>
			<AppHeaderComponent {...args} />
		</View>
	);
};

const StoryMeta: Meta<AppHeaderProps> = {
	title: 'Mobile/Components/AppHeader',
	component: AppHeaderComponent,
	render: Template,
};

export default StoryMeta;

const handlePress = (label: string) => () => {
	Alert.alert(`${label} pressed`);
};

export const WelcomeBack = {
	args: {
		secondaryText: 'welcome back,',
		primaryText: 'Namelastname',
		leftIcon: <PersonCircleFilledIcon />,
		onLeftPress: handlePress('Left icon'),
		rightComponents: [
			{ icon: <NotificationIcon />, onPress: handlePress('Notification 1') },
			{ icon: <NotificationIcon />, onPress: handlePress('Notification 2') },
		],
	},
};

export const CenterTitle = {
	args: {
		title: 'Dashboard',
		rightComponents: [
			{ icon: <NotificationIcon />, onPress: handlePress('Notification 1') },
			{ icon: <NotificationIcon />, onPress: handlePress('Notification 2') },
		],
	},
};

export const WithCenterComponent = {
	args: {
		rightComponents: [
			{ icon: <NotificationIcon />, onPress: handlePress('Notification 1') },
			{ icon: <NotificationIcon />, onPress: handlePress('Notification 2') },
		],
		centerComponent: (
			<View style={{ alignItems: 'center', justifyContent: 'center' }}>
				{/* Replace with any custom header center element */}
				<View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
					<PersonCircleFilledIcon />
					{/* Using simple text to demonstrate center injection */}
				</View>
			</View>
		),
	},
};

export const BackWithTitle = {
	args: {
		title: 'Shory Wallet',
		leftIcon: <SfChevronBackwardIcon />,
		onLeftPress: handlePress('Back icon'),
		rightComponents: [
			{ icon: <NotificationIcon />, onPress: handlePress('Notification 1') },
			{ icon: <NotificationIcon />, onPress: handlePress('Notification 2') },
		],
	},
};
