import chalk from 'chalk';
import fs from 'fs';

/**
 *
 * @param {string[]} itemsPathsToClean
 * @returns
 */
export const preBuild = (itemsPathsToClean) => ({
	buildStart: () => {
		console.log(chalk.green('\n🧹 [devkit-pre-build-plugin] Clean'));
		const itemsToClean = ['./dist', './pack-analyze.txt', ...(itemsPathsToClean ?? [])];

		itemsToClean.forEach((item) => {
			console.log(`|- Delete '${item}'`);

			if (fs.existsSync(item)) {
				const isDir = fs.lstatSync(item).isDirectory();

				if (isDir) fs.rmSync(item, { recursive: true, force: true });
				else fs.rmSync(item);
			}
		});
		console.log('\n');
	},
});
