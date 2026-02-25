jest.setTimeout(60000); // 60 seconds

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
	const View = require('react-native/Libraries/Components/View/View');
	return {
		GestureHandlerRootView: View,
		BaseButton: View,
		RectButton: View,
		BorderlessButton: View,
		State: {},
		TapGestureHandler: View,
		PanGestureHandler: View,
		LongPressGestureHandler: View,
		Directions: {},
	};
});

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
	const React = require('react');
	const { View } = require('react-native');
	return {
		SafeAreaProvider: ({ children }) => React.createElement(View, null, children),
		SafeAreaView: View,
		useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
	};
});

// Mock @gorhom/bottom-sheet
jest.mock('@gorhom/bottom-sheet', () => {
	const React = require('react');
	const { View } = require('react-native');
	return {
		BottomSheetModal: View,
		BottomSheetModalProvider: ({ children }) => React.createElement(View, null, children),
		BottomSheetScrollView: View,
		BottomSheetView: View,
	};
});

// Mock @gorhom/portal
jest.mock('@gorhom/portal', () => {
	const React = require('react');
	const { View } = require('react-native');
	return {
		PortalHost: View,
		PortalProvider: ({ children }) => React.createElement(View, null, children),
		Portal: ({ children }) => React.createElement(View, null, children),
	};
});

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
	const Reanimated = require('react-native-reanimated/mock');
	Reanimated.default.call = () => {};
	return Reanimated;
});
