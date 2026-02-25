import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
export default {
	stories: ['../stories/**/*.stories.@(ts|tsx)', '../stories/**/*.@(mdx)', '../src/**/*.mdx'],
	addons: [
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook/addon-essentials'),
		getAbsolutePath('@storybook/addon-interactions'),
		getAbsolutePath('@storybook/preset-scss'),
		getAbsolutePath('@storybook/addon-docs'),
	],
	staticDirs: ['../public'],
	framework: {
		name: getAbsolutePath('@storybook/react-vite'),
		options: {},
	},
	docs: { defaultName: 'Docs', autodocs: true },
	viteFinal: function (config) {
		if (!config.resolve) config.resolve = {};
		if (!config.resolve.alias) config.resolve.alias = {};
		config.resolve.alias['path'] = 'path-browserify';
		return config;
	},
	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},
};
function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, 'package.json')));
}
