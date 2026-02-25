import React from 'react';
import { Preview } from '@storybook/react-vite';

/** @type { import('@storybook/react').Preview } */
const preview: Preview = {
	parameters: {
		actions: {
			// argTypesRegex: '^on[A-Z].*',
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
	globalTypes: {
		locale: {
			description: 'Internationalization',
			defaultValue: 'en',
			toolbar: {
				title: 'Locale',
				icon: 'globe',
				items: [
					{ value: 'en', right: '🇺🇸', title: 'English' },
					{ value: 'ar', right: '🇦🇪', title: 'Arabic' },
				],
				// Change title based on selected value
				dynamicTitle: true,
			},
		},
		theme: {
			description: 'Theme',
			defaultValue: 'default',
			toolbar: {
				title: 'Theme',
				icon: 'box',
				items: [
					{ value: 'default', title: 'Theme: Default' },
					{ value: 'aber', title: 'Theme: Aber' },
					{ value: 'secureData', title: 'Theme: secureData' },
					{ value: 'adib', title: 'Theme: ADIB' },
					{ value: 'molo', title: 'Theme: Molo' },
					{ value: 'wio', title: 'Theme: Wio' },
					{ value: 'live-aldar', title: 'Theme: Live Aldar' },
					{ value: 'ejar', title: 'Theme: Ejar' },
					{ value: 'pcfc', title: 'Theme: PCFC' },
					{ value: 'mulem1', title: 'Theme: Mulem1' },
				],
				// Change title based on selected value
				dynamicTitle: true,
			},
		},
		timeZone: {
			description: 'Time Zone',
			defaultValue: 'UserSystem',
			toolbar: {
				title: 'Website TimeZone: User System',
				icon: 'time',
				items: [
					{ value: 'UserSystem', title: 'Website TimeZone: User System' },
					{ value: 'Asia_Dubai', title: 'Website TimeZone: UAE' },
					{ value: 'Africa_Cairo', title: 'Website TimeZone: Egypt' },
					{ value: 'America_New_York', title: 'Website TimeZone: US/Eastern' },
					{ value: 'Asia_Manila', title: 'Website TimeZone: Philippines' },
				],
				// Change title based on selected value
				dynamicTitle: true,
			},
		},
		dateFormat: {
			description: 'Date Format',
			defaultValue: 'default',
			toolbar: {
				title: 'Date Format: 24 HR',
				icon: 'calendar',
				items: [
					{ value: 'default', title: 'Date Format: 24 HR' },
					{ value: '12hr', title: 'Date Format: 12 HR' },
				],
				// Change title based on selected value
				dynamicTitle: true,
			},
		},
		isoFormat: {
			description: 'Iso Format',
			defaultValue: 'utc',
			toolbar: {
				title: 'Date Format: UTC',
				icon: 'calendar',
				items: [
					{ value: 'utc', title: 'Iso Format: UTC' },
					{ value: 'iso-tz-offset', title: 'Iso Format: Timezone Offset' },
				],
				// Change title based on selected value
				dynamicTitle: true,
			},
		},
	},
};

export default preview;
