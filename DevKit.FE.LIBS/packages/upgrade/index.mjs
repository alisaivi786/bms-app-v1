import { main as codeMapping } from './patches/code-mapping.mjs';
import { main as fixColors } from './patches/fix-colors.mjs';
import { main as fixFonts } from './patches/fix-fonts.mjs';

const logger = console;

export const main = async (basePath) => {
	let currentStep = '';
	const steps = [
		{
			name: 'colors',
			exe: fixColors,
		},
		{
			name: 'colors',
			exe: fixFonts,
		},
		{
			name: 'code',
			exe: codeMapping,
		},
	];

	try {
		for (let index = 0; index < steps.length; index++) {
			currentStep = steps[index];
			logger.log(`Fixing ${currentStep.name} ...`);

			await currentStep.exe(basePath);
		}

		logger.log('Fixing completed successfully');
	} catch (error) {
		logger.error(`Error occurred on ${currentStep.name}:`, error);
	}
};

logger.log(`\nRunning upgrade on folder: ${process.cwd()}\n`);

main(process.cwd());
