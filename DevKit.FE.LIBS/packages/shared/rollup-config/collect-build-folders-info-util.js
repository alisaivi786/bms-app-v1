import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

/**
 * get all children items in a folder
 * @param {string[] | string} itemsPaths
 * @returns
 */
export const getBuildItems = (itemsPaths) => {
	const paths = Array.isArray(itemsPaths) ? [...itemsPaths] : [itemsPaths];
	const result = [];
	paths.forEach((folderPath) => {
		fs.readdirSync(folderPath, { withFileTypes: true })
			.filter((folder) => folder.isDirectory())
			.map((folder) => ({
				name: folder.name,
				path: path.resolve(folderPath, folder.name),
				entry: `${folderPath}/${folder.name}/index.ts`,
				typesFile: path.join('dist/types', `${folderPath}/${folder.name}/index.d.ts`),
			}))
			.forEach((item) => {
				result.push(item);
			});
	});

	console.log(chalk.green(`\n📂 [devkit-collect-build-folders-info-util] Build Items \n`));
	console.log(result.map((r) => `|- ${r.entry}`).join('\n'));

	return result;
};
