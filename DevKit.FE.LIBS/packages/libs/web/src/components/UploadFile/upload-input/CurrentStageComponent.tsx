'use client';

import { FormFieldErrors } from '../../FormFieldErrors';
import { FormLabel } from '../../FormLabel';
import Success from './Success';
import { Thumbnail } from './Thumbnail';
import Upload from './Upload';
import UploadProgress from './UploadProgress';
import { borderBasedOnStage } from './helper';
import { useUploadInputContext } from './upload-input-context';

const CurrentStageComponent = ({
	showError,
	setIsEditModalOpen,
}: {
	showError?: boolean;
	setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const {
		variant,
		currentStage,
		existFile,
		progress,
		messages,
		isDragActive,
		getRootProps,
		label,
		isRequired,
		popover,
		popoverVariant,
		errorMessage,
	} = useUploadInputContext();
	const borderAndBgColor = borderBasedOnStage({
		currentStage,
		hasError: showError,
		isDragActive: isDragActive,
		existFile,
	});

	return (
		<section
			className={`${variant === 'section' ? 'h-24' : ''} rounded-lg lg:rounded-xl ${
				variant === 'thumbnail' ? '' : ' border-2 border-dashed '
			} ${variant != 'thumbnail' && borderAndBgColor}
				${variant === 'image-card' ? `${!showError && 'border-none'} bg-gray-50 p-4` : ''}
				`}
		>
			{variant === 'image-card' && label && (
				<div className="mb-2">
					<FormLabel isRequired={isRequired} popover={popover} popoverVariant={popoverVariant}>
						{label}
					</FormLabel>
				</div>
			)}

			<div className="flex items-center justify-center w-full h-full" {...getRootProps()}>
				{currentStage === 'upload-confirmation' || existFile ? (
					<Success setIsEditModalOpen={setIsEditModalOpen} />
				) : currentStage === 'select-file' ? (
					variant == 'thumbnail' ? (
						<Thumbnail setIsEditModalOpen={setIsEditModalOpen} />
					) : (
						<Upload setIsEditModalOpen={setIsEditModalOpen} />
					)
				) : currentStage === 'uploading-progress' ? (
					<UploadProgress
						progress={progress}
						uploadProgressLabel={messages.uploadProgressLabel}
						uploadProgressTitle={messages.uploadProgressTitle}
					/>
				) : (
					<></>
				)}
			</div>

			{variant === 'image-card' && showError && <FormFieldErrors errors={errorMessage} />}
		</section>
	);
};

export default CurrentStageComponent;
