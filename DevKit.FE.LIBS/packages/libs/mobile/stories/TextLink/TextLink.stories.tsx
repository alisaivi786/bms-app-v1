import { View } from 'react-native';
import { ArrowLongRightIcon } from '@devkit/icons/native';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
// import { ToggleSwitch, ToggleSwitchProps } from '../../src/components//ToggleSwitch';
import { TextLink, TextLinkProps } from '../../src/components/TextLink/TextLink';

type ComponentType = (args: TextLinkProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	return (
		<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, gap: 6 }}>
			<TextLink {...args}>Text Link</TextLink>
		</View>
	);
};

const ToggleSwitchMeta: Meta<ComponentType> = {
	title: 'Mobile/Components/TextLink',
	component: TextLink,
	render: Template,
};

export default ToggleSwitchMeta;

export const _1Default: StoryObj<typeof TextLink> = {
	args: {},
};

export const _2WithIcon: StoryObj<typeof TextLink> = {
	args: { icon: <ArrowLongRightIcon />, iconPosition: 'right' },
};
