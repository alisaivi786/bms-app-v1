import { View } from 'react-native';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { Divider } from '../../src/components/Divider';

const Template: StoryFn = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
			<Divider />
		</View>
	);
};

const StoryMeta: Meta = {
	title: 'Mobile/Components/Divider',
	component: Divider,
};

export default StoryMeta;

export const Default: StoryObj = {
	render: Template,
};
