import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { view } from './storybook.requires';

const StorybookUIRoot = view.getStorybookUI({
	storage: {
		getItem: AsyncStorage.getItem,
		setItem: AsyncStorage.setItem,
	},
});

export default function StorybookWithGestureRoot() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<StorybookUIRoot />
		</GestureHandlerRootView>
	);
}
