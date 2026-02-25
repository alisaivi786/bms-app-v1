import fs from 'fs';

/**
 *
 * @param {string[]} itemsPathsToClean
 * @returns
 */
export const postBuild = (itemsPathsToClean) => {
	return {
		buildEnd: () => {
			if (fs.existsSync('./dist/types')) {
				fs.rmSync('./dist/types', { recursive: true, force: true });
			}

			itemsPathsToClean?.forEach((item) => {
				console.log(`|- Delete '${item}'`);

				if (fs.existsSync(item)) {
					const isDir = fs.lstatSync(item).isDirectory();

					if (isDir) fs.rmSync(item, { recursive: true, force: true });
					else fs.rmSync(item);
				}
			});
			console.log('\n');
		},
	};
};
