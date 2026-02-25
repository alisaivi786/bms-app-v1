import { StyleSheet, Text, View } from 'react-native';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { useMobileUIConfigOptions } from '../../src';
import Card from '../../src/components/Card/Card';

const Template: StoryFn = () => {
	const { tw } = useMobileUIConfigOptions();

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
			<Card>
				<Text>UAE Dirham</Text>
				<Text style={tw`text-lg font-currency-uae`}>{'\u00EA <- tw, does not work'}</Text>
				<Text style={styles.uae}>{'\u00EA <- Stylesheet, works correctly'}</Text>
				<Text style={tw`mt-3`}>Saudi Riyal</Text>
				<Text style={tw`text-lg font-currency-saudi`}>{'\uE900 <- tw, does not work'}</Text>
				<Text style={styles.saudi}>{'\uE900 <- Stylesheet, works correctly'}</Text>
			</Card>
		</View>
	);
};

const StoryMeta: Meta = {
	title: 'Mobile/Components/CurrencySymbols',
	component: Card,
};

export default StoryMeta;

export const Default: StoryObj = {
	render: Template,
};

const styles = StyleSheet.create({
	saudi: {
		fontFamily: 'saudi_riyal', // should match the name of the registered font
		fontSize: 16,
	},
	uae: {
		fontFamily: 'Untitled5', // should match the name of the registered font
		fontSize: 16,
	},
});
