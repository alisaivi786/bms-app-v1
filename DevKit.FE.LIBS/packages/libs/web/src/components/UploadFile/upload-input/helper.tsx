import { TUploadFileStages } from '../common/types';

interface IBorderBasedOnStage {
	hasError?: boolean;
	isDragActive?: boolean;
	currentStage: TUploadFileStages;
	existFile?: string;
}

export const borderBasedOnStage = ({ currentStage, isDragActive, existFile, hasError }: IBorderBasedOnStage) => {
	if (hasError) {
		return 'border border-red-500 bg-white';
	} else if (isDragActive) {
		return 'border border-gray-300 bg-brand-50';
	} else if (existFile) {
		return 'border border-green-500 bg-white';
	} else {
		return {
			'select-file': 'border-gray-300 bg-white',
			'uploading-progress': 'border-gray-300 bg-brand-50',
			'upload-confirmation': 'border border-green-500 bg-white',
		}[currentStage];
	}
};
