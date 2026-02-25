import fs from 'fs';
import prettier from 'prettier';
import prettierConfig from '@devkit/prettier-config';

/**
 *
 * @param {string[]} buildItems
 * @param {string[]?} additionalExports
 * @returns
 */
export const createMainIndexFile = (buildItems, additionalExports) => {
	return {
		buildStart: () => {
			const exportsStatements = buildItems.map((f) => `export * from "${f.entry.replace('.ts', '')}";`);

			additionalExports?.forEach((additionalExport) => {
				exportsStatements.push(additionalExport);
			});

			const formattedText = prettier.format(exportsStatements.join('\n\n'), prettierConfig);

			fs.writeFileSync('./index.ts', formattedText);
		},
	};
};
