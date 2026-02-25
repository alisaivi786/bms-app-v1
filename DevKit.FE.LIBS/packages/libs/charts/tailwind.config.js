/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-var-requires */
import defaultTheme from 'tailwindcss/defaultTheme';

const tailwindConfig = require('@devkit/web/dist/tailwind/tailwind.config.cjs');

/** @type {import('tailwindcss').Config} */
export default {
	...tailwindConfig,
	theme: {
		extend: {
			...tailwindConfig.theme,
			fontSize: {
				...tailwindConfig.theme.fontSize,
				title1: '1rem',
			},
			colors: {
				...tailwindConfig.theme.colors,
				gray: {
					...tailwindConfig.theme.colors.gray,
					550: '#808080',
				},
			},
		},
	},
	content: {
		files: ['./src/**/*.{ts,tsx}', './stories/**/*.{ts,tsx}', '../web/src/**/*.{ts,tsx}'],
	},
};
