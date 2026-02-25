import { Text, View } from 'react-native';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import Card from '../../src/components/Card/Card';

const Template: StoryFn = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
			<Card>
				<Text>Welcome to devkit Mobile</Text>
			</Card>
		</View>
	);
};

const StoryMeta: Meta = {
	title: 'Mobile/Components/Card',
	component: Card,
};

export default StoryMeta;

export const Default: StoryObj = {
	render: Template,
};
