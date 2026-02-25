import fs from 'fs';
import path from 'path';
import analyze from 'rollup-plugin-analyzer';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import preserveDirectives from 'rollup-plugin-preserve-directives';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import nodeSass from 'sass';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
	copyTailwind,
	createIndexFile,
	createMainIndexFile,
	getBuildItems,
	loadPackageJson,
	postBuild,
	preBuild,
} from '@devkit/rollup-config';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const buildItems = getBuildItems(['./src/components', './src/layouts', './src/hooks']);
const packageJson = loadPackageJson();

/**
 * @type {import('rollup').RollupOptions[]}
 */
const config = [
	{
		input: buildItems.map((i) => i.entry),
		output: {
			entryFileNames: (entryFile) => {
				const directoryName = path.dirname(entryFile.facadeModuleId).split(path.sep).pop();

				return `${directoryName}.js`;
			},
			dir: 'dist',
			sourcemap: false,
			preserveModules: true,
		},
		external: [
			...Object.keys(packageJson.dependencies || {}),
			...Object.keys(packageJson.devDependencies || {}),
			...Object.keys(packageJson.peerDependencies || {}),
			'react/jsx-runtime',
			'react-is',
			'tslib',
			/lodash.*/,
			/@devkit.*/,
		],
		onwarn: (warnInfo, warn) => {
			if (
				warnInfo?.pluginCode === 'TS2322' ||
				warnInfo?.pluginCode === 'TS6053' ||
				(warnInfo.code === 'MODULE_LEVEL_DIRECTIVE' && warnInfo.message.includes('"use client"'))
			) {
				return;
			} else {
				warn(warnInfo);
			}
		},
		plugins: [
			preBuild(),
			createMainIndexFile(buildItems),
			analyze({
				writeTo: (text) => fs.appendFileSync('./pack-analyze.txt', text),
			}),
			copyTailwind([
				{ file: './src/layouts/ThemeProvider/theme/aber/index.scss', output: 'dist/tailwind/theme/aber.css' },
				{ file: './src/layouts/ThemeProvider/theme/default/index.scss', output: 'dist/tailwind/theme/default.css' },
				{ file: './src/layouts/ThemeProvider/theme/secureData/index.scss', output: 'dist/tailwind/theme/secureData.css' },
				{ file: './src/layouts/ThemeProvider/theme/adib/index.scss', output: 'dist/tailwind/theme/adib.css' },
				{ file: './src/layouts/ThemeProvider/theme/molo/index.scss', output: 'dist/tailwind/theme/molo.css' },
				{ file: './src/layouts/ThemeProvider/theme/wio/index.scss', output: 'dist/tailwind/theme/wio.css' },
				{
					file: './src/layouts/ThemeProvider/theme/live-aldar/index.scss',
					output: 'dist/tailwind/theme/live-aldar.css',
				},
				{ file: './src/layouts/ThemeProvider/theme/ejar/index.scss', output: 'dist/tailwind/theme/ejar.css' },
				{ file: './src/layouts/ThemeProvider/theme/pcfc/index.scss', output: 'dist/tailwind/theme/pcfc.css' },
				{ file: './src/layouts/ThemeProvider/theme/mulem1/index.scss', output: 'dist/tailwind/theme/mulem1.css' },
			]),
			resolve(),
			commonjs(),
			typescript({
				tsconfig: './tsconfig.json',
				exclude: ['*.stories.*'],
			}),
			// scss({
			// 	output: function (styles, styleNodes) {
			// 		console.log(styles);
			// 		Object.keys(styleNodes).forEach((nodeKey) => {
			// 			const fileName = path.basename(nodeKey);
			// 			const dirName = path.basename(path.dirname(nodeKey));
			// 			const result = nodeSass.renderSync({ file: nodeKey });
			// 			fs.writeFileSync(`dist/${dirName.toLocaleLowerCase()}_${fileName.toLocaleLowerCase()}`, result);
			// 		});
			// 	},
			// }),
			postcss({
				extract: 'css/main.css',
				minimize: true,
				modules: false,
			}),
			//terser(),
			preserveDirectives({ suppressPreserveModulesWarning: true }),
		],
	},
	{
		input: 'dist/types/index.d.ts',
		output: [{ file: 'dist/index.d.ts', format: 'esm' }],
		external: [/\.(css|scss)$/],
		plugins: [dts()],
	},
	{
		input: buildItems.map((i) => i.typesFile),
		output: [
			{
				entryFileNames: (entryFile) => {
					const directoryName = path.dirname(entryFile.facadeModuleId).split(path.sep).pop();

					return `${directoryName}.d.ts`;
				},
				dir: 'dist',
				sourcemap: false,
				format: 'esm',
			},
		],
		external: [/\.(css|scss)$/],
		plugins: [
			analyze({
				writeTo: (text) => fs.appendFileSync('./pack-analyze.txt', text),
			}),
			dts(),
			postBuild(['./dist/css', './dist/tailwind/theme/index.js']),
			createIndexFile(buildItems.map((i) => i.name)),
		],
	},
];

export default config;
