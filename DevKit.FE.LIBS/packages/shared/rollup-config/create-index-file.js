import fs from 'fs';

export const createIndexFile = (componentsFoldersNames) => {
	return {
		buildEnd: () => {
			const exportNames = componentsFoldersNames.map((folder) => `./${folder}.js`);

			fs.writeFileSync('./dist/index.js', exportNames.map((f) => `export * from "${f}";`).join('\n'));
		},
	};
};
