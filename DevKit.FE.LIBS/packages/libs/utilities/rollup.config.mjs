import fs from 'fs';
import path from 'path';
import analyze from 'rollup-plugin-analyzer';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import {
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

const buildItems = getBuildItems(['./src/common', './src/contexts', './src/factories', './src/hooks', './src/types']);
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
			/@devkit.*/,
			/lodash.*/,
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
			createMainIndexFile(buildItems, ['export * from "./src/types";']),
			analyze({
				writeTo: (text) => fs.appendFileSync('./pack-analyze.txt', text),
			}),
			resolve(),
			commonjs(),
			typescript({
				tsconfig: './tsconfig.json',
				exclude: ['*.stories.*'],
			}),
			postcss({
				extract: 'css/main.css',
				minimize: true,
				modules: false,
			}),
			preserveDirectives({ suppressPreserveModulesWarning: true }),
		],
	},
	{
		input: ['./index.ts', ...buildItems.map((i) => i.entry)],
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
			'tslib',
			/@devkit.*/,
			/lodash.*/,
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
			resolve(),
			commonjs(),
			typescript({
				tsconfig: './tsconfig.json',
				declaration: false,
				declarationDir: undefined,
				exclude: ['*.stories.*'],
			}),
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
			postBuild(),
			createIndexFile(buildItems.map((i) => i.name)),
		],
	},
];

export default config;
