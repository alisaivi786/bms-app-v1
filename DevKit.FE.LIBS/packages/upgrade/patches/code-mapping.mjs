import replace from 'replace-in-file';
import logger from '../helpers/logger.js';

const dryRun = false;
// "oldFont": "newFont"
const codeMapping = {
	IReactForm: 'ReactForm',
	IReactFormOptions: 'ReactFormOptions',
	TFormFieldsSchema: 'FormFieldsSchema',
	TFormFieldSchema: 'FormFieldSchema',
	IDynamicForm: 'DynamicFormProps',
};

export const main = async (basePath) => {
	const options = {
		files: `${basePath}/**/*.{tsx,ts,json,css}`,
		from: Object.keys(codeMapping).map((c) => new RegExp(c, 'g')),
		to: Object.values(codeMapping),
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
