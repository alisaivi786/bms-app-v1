import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { StorybookConfig } from '@storybook/react-webpack5';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
	stories: ['../stories/**/*.stories.?(ts|tsx|js|jsx)'],

	addons: [
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
		getAbsolutePath('@storybook/addon-react-native-web'),
		getAbsolutePath('@storybook/addon-docs'),
	],

	framework: {
		name: getAbsolutePath('@storybook/react-webpack5'),
		options: {},
	},

	docs: {},
	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},
	webpackFinal: async (config) => {
		if (!config.module) config.module = {};
		if (!config.module.rules) config.module.rules = [];
		if (!config.resolve) config.resolve = {};
		if (!config.resolve.extensions) config.resolve.extensions = [];

		config.module.rules.push({
			test: /\.(js|jsx|ts|tsx)$/,
			use: [
				{
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							['@babel/preset-react', { runtime: 'automatic' }],
							'@babel/preset-typescript',
						],
						plugins: [
							['@babel/plugin-transform-private-methods', { loose: true }],
							['@babel/plugin-transform-class-properties', { loose: true }],
							['@babel/plugin-transform-private-property-in-object', { loose: true }],
						],
					},
				},
			],
		});

		config.resolve.extensions.push('.js', '.jsx', '.ts', '.tsx');

		config.resolve.fallback = {
			...(config.resolve.fallback || {}),
			tty: require.resolve('tty-browserify'),
		};

		// Alias VibrancyView to mock for Storybook build
		config.resolve.alias = {
			...(config.resolve.alias || {}),
			'./components/VibrancyView': require.resolve(join(__dirname, '__mocks__/VibrancyView.js')),
			'./components/BlurView': require.resolve(join(__dirname, '__mocks__/BlurView.js')),
			'@lottiefiles/dotlottie-react': require.resolve(join(__dirname, '__mocks__/dotlottie-react.js')),
		};
		return config;
	},
};

function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, 'package.json')));
}

export default config;
