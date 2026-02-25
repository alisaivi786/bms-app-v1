const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');
const withStorybook = require('@storybook/react-native/metro/withStorybook');

const defaultConfig = getDefaultConfig(__dirname);
const {
	resolver: { sourceExts, assetExts },
} = defaultConfig;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
	watchFolders: [path.resolve(__dirname, '../../..')],
	resolver: {
		resolveRequest: (context, moduleName, platform) => {
			const defaultResolveResult = context.resolveRequest(context, moduleName, platform);

			if (process.env.STORYBOOK_ENABLED !== 'true' && defaultResolveResult?.filePath?.includes?.('.ondevice/')) {
				return {
					type: 'empty',
				};
			}

			return defaultResolveResult;
		},
		unstable_enableSymlinks: true,
		unstable_enablePackageExports: true,
		unstable_conditionNames: ['browser', 'require', 'react-native'],
		assetExts: assetExts.filter((ext) => ext !== 'svg'),
		sourceExts: ['mjs', 'cjs', ...sourceExts, 'json', 'svg'],
	},
};

const finalConfig = mergeConfig(defaultConfig, config);

module.exports = withStorybook(finalConfig, {
	enabled: process.env.STORYBOOK_ENABLED === 'true',
	configPath: path.resolve(__dirname, './.ondevice'),
});
