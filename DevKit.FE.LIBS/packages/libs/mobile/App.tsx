import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaProvider>
				<View style={styles.container}>
					<Text>Open up App.tsx to start working on your app!</Text>
				</View>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
}

let AppEntryPoint = App;

if (process.env.STORYBOOK_ENABLED) {
	AppEntryPoint = require('./.ondevice').default;
}

export default AppEntryPoint;
