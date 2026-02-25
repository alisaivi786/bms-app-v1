import replace from 'replace-in-file';
import logger from '../helpers/logger.js';

const dryRun = false;
// "oldFont": "newFont"
const colorsMap = {
	'text-xTiny': 'text-caption2',
	'text-tiny': 'text-caption1',
	'text-small': 'text-paragraph',
	'text-title4': 'text-title',
	'text-title2.5': 'text-h3',
	'text-title2': 'text-h2',
	'text-title1': 'text-h1',
	'text-large': 'text-h1',
	'text-xLarge': 'text-display3',
	'text-xxLarge': 'text-display3',
};

export const main = async (basePath) => {
	const options = {
		files: `${basePath}/**/*.{tsx,ts,json,css}`,
		from: Object.keys(colorsMap).map((c) => new RegExp(c, 'g')),
		to: Object.values(colorsMap),
		countMatches: true,
		dry: dryRun,
		ignore: ['**/node_modules/**/*.*', '**/dist/**/*.*', '**/.build/**/*.*'],
	};

	try {
		const results = await replace(options);

		logger.log(
			'Replacement results:',
			results.filter((r) => r.hasChanged)
		);
	} catch (error) {
		logger.error('Error occurred:', error);
	}
};
