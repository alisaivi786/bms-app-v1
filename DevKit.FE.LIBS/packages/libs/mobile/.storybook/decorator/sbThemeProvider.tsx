'use strict';

import React from 'react';
import { Platform, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppContextFactory } from '@devkit/utilities';
import { makeDecorator } from '@storybook/addons';
import { devkitThemeProvider } from '../../src';
import { aberTheme, defaultTheme, moloTheme, moloYahalaTheme, yahalaTheme } from '../../src/themes';
import { createTailWindConfig } from '../../src/themes/tailwind-config';

const { AppPlatformContextProvider } = new AppContextFactory();

const selectTheme = (theme: string) => {
	switch (theme) {
		case 'aber':
			return aberTheme;
		case 'molo':
			return moloTheme;
		case 'moloYahala':
			return moloYahalaTheme;
		case 'yahalaTheme':
			return yahalaTheme;
		default:
			return defaultTheme;
	}
};

export const withdevkitTheme = makeDecorator({
	name: 'withdevkitTheme',
	parameterName: 'themeOptions',
	skipIfNoParametersOrOptions: false,
	wrapper: (getStory, context) => {
		const locale = context.globals.locale;
		const theme = context.globals.theme;

		return (
			<SafeAreaProvider>
				<AppPlatformContextProvider
					locale={locale}
					translate={(t) => t}
					platform={Platform.OS === 'ios' ? 'ios' : 'android'}
				>
					<devkitThemeProvider locale={locale} theme={createTailWindConfig(selectTheme(theme))}>
						<View
							style={{
								padding: 10,
								height: '100%',
							}}
						>
							{getStory(context) as React.ReactNode}
						</View>
					</devkitThemeProvider>
				</AppPlatformContextProvider>
			</SafeAreaProvider>
		);
	},
});
