import fs from 'fs';
import path from 'path';
import analyze from 'rollup-plugin-analyzer';
import dts from 'rollup-plugin-dts';
import {
	createIndexFile,
	createMainIndexFile,
	getBuildItems,
	loadPackageJson,
	postBuild,
	preBuild,
} from '@devkit/rollup-config';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const buildItems = getBuildItems(['./src/components', './src/layouts', './src/utils', './src/themes', './src/hooks']);
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
		},
		external: [
			...Object.keys(packageJson.dependencies || {}),
			...Object.keys(packageJson.devDependencies || {}),
			...Object.keys(packageJson.peerDependencies || {}),
			'react/jsx-runtime',
			'react-is',
			'react-native',
			'tslib',
			/react-native-raw-bottom-sheet*/,
			/react-native-indicators*/,
			/react-native*/,
			/lodash.*/,
			/@devkit.*/,
		],
		onwarn: (warnInfo, warn) => {
			if (warnInfo.pluginCode === 'TS2322' || warnInfo.pluginCode === 'TS6053') {
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
			resolve(),
			commonjs(),
			json(),
			image(),
			typescript({
				tsconfig: './tsconfig.json',
				exclude: ['*.stories.*'],
			}),
			//terser(),
		],
	},
	{
		input: ['index.ts', ...buildItems.map((i) => i.entry)],
		output: {
			entryFileNames: (entryFile) => {
				const directoryName = path.dirname(entryFile.facadeModuleId).split(path.sep).pop();

				if (entryFile.facadeModuleId === path.resolve('.', './index.ts')) {
					return 'index.js';
				}

				return `${directoryName}.js`;
			},
			dir: 'dist/cjs',
			sourcemap: false,
			format: 'cjs',
		},
		external: [
			...Object.keys(packageJson.dependencies || {}),
			...Object.keys(packageJson.devDependencies || {}),
			...Object.keys(packageJson.peerDependencies || {}),
			'react/jsx-runtime',
			'react-is',
			'react-native',
			'tslib',
			/react-native-raw-bottom-sheet*/,
			/react-native-indicators*/,
			/react-native*/,
			/lodash.*/,
			/@devkit.*/,
		],
		onwarn: (warnInfo, warn) => {
			if (warnInfo.pluginCode === 'TS2322' || warnInfo.pluginCode === 'TS6053') {
				return;
			} else {
				warn(warnInfo);
			}
		},
		plugins: [
			resolve(),
			commonjs(),
			json(),
			image(),
			typescript({
				tsconfig: './tsconfig.json',
				declaration: false,
				declarationDir: undefined,
				exclude: ['*.stories.*'],
			}),
			//terser(),
		],
	},
	{
		input: 'dist/types/index.d.ts',
		output: [{ file: 'dist/index.d.ts', format: 'esm' }],
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
		plugins: [
			analyze({
				writeTo: (text) => fs.appendFileSync('./pack-analyze.txt', text),
			}),
			dts(),
			createIndexFile(buildItems.map((i) => i.name)),
		],
	},
];

export default config;
