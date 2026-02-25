import fs from 'fs';
import path from 'path';
import analyze from 'rollup-plugin-analyzer';
import dts from 'rollup-plugin-dts';
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

const buildItems = getBuildItems(['./src']);
const packageJson = loadPackageJson();
const indexFileItems = buildItems.filter((a) => a.name !== 'enhanced-logger');

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
			/@devkit.*/,
		],
		onwarn: (warnInfo, warn) => {
			if (warnInfo?.pluginCode === 'TS2322' || warnInfo?.pluginCode === 'TS6053') {
				return;
			} else {
				warn(warnInfo);
			}
		},
		plugins: [
			preBuild(),
			createMainIndexFile(indexFileItems),
			analyze({
				writeTo: (text) => fs.appendFileSync('./pack-analyze.txt', text),
			}),
			resolve(),
			commonjs(),
			typescript({
				tsconfig: './tsconfig.json',
			}),
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
			/@devkit.*/,
		],
		onwarn: (warnInfo, warn) => {
			if (warnInfo?.pluginCode === 'TS2322' || warnInfo?.pluginCode === 'TS6053') {
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
				declarationDir: undefined,
				declaration: false,
			}),
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
			postBuild(),
			createIndexFile(indexFileItems.map((i) => i.name)),
		],
	},
];

export default config;
