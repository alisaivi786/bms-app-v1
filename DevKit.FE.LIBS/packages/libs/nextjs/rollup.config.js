import fs from 'fs';
import path from 'path';
import analyze from 'rollup-plugin-analyzer';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import preserveDirectives from 'rollup-plugin-preserve-directives';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
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

const buildItems = getBuildItems(['./src/components', './src/factories', './src/hooks']);
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
			'next/link',
			'next/navigation',
			'next/router',
			'next/compat/router',
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
			preBuild(['./pack-analyze-server.txt', './server.js', '.server.d.ts']),
			createMainIndexFile(buildItems, ['export * from "./src/shared-types";']),
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
			createIndexFile(buildItems.map((i) => i.name)),
		],
	},
	{
		input: './src/server/ServerTranslationsKeys/index.ts',
		output: [
			{
				file: 'server.js',
				format: 'esm',
				sourcemap: false,
			},
		],
		external: [
			...Object.keys(packageJson.dependencies || {}),
			...Object.keys(packageJson.devDependencies || {}),
			...Object.keys(packageJson.peerDependencies || {}),
			'react/jsx-runtime',
			'react-is',
			'tslib',
			'next/router',
			/lodash.*/,
			/@devkit.*/,
			/next-i18next.*/,
		],
		plugins: [
			analyze({
				writeTo: (text) => fs.appendFileSync('./pack-analyze-server.txt', text),
			}),
			resolve(),
			commonjs(),
			typescript({
				tsconfig: './tsconfig.json',
			}),
		],
	},
	{
		input: 'dist/types/src/server/ServerTranslationsKeys/index.d.ts',
		output: [{ file: 'server.d.ts', format: 'esm' }],
		plugins: [dts(), postBuild()],
	},
];

export default config;
