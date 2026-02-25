'use client';

import { ReactNode } from 'react';
import { FileRejection } from 'react-dropzone';
import { IFile, IUploadFile } from '@devkit/utilities';
import UploadProgressStage from '../common/UploadProgressStage';
import { TConfirmationContent } from '../common/types';
import useUploadFile from '../common/useUploadFile';
import UploadConfirmation from './UploadConfirmation';
import UploadStage from './UploadStage';
import UploadWrapper from './UploadWrapper';

export interface IUploadFileComponent extends IUploadFile, IFile {
	/** If true, the UploadFile modal will open */
	isOpen: boolean;
	/** Is used to pass a component as a modal body */
	modalBody?: ReactNode;
	/** If true, a loader will be added to the uploadButton*/
	isSubmitLoading?: boolean;
	/** Is an object to add the text content of the UploadFile modal.  */
	messages: {
		/** The UploadFile modal title */
		title?: string;
		selectFileDropArea?: React.ReactNode;
		selectFileButton: string;

		progressLabel?: string;
		progressDescription?: string;

		cancelButton?: string;
		uploadButton?: string;

		successModalButton?: string;
		errorModalButton?: string;
	};
	/** Is a `callback` function to handel file submission from the modal,
	 *it take the uploaded file and a callback to handel the upload progress */
	onSaveFile: (file: File, progressCallback: (loaded: number, total: number) => void) => Promise<TConfirmationContent>;
	getValidateError?: (
		acceptedFile?: File,
		rejectedFile?: FileRejection,
		isEdit?: boolean
	) => Promise<string | undefined> | string | undefined;
	/** The warning message text */
	warningMessage?: string;
	hasCloseICon?: boolean;
}
/** The UploadFile used to upload files by show upload file modal, you can control the file types */

export const UploadFile = ({
	modalBody,
	isOpen,
	accept,
	maxSize,
	messages,
	isSubmitLoading,
	warningMessage,
	hasCloseICon,
	...rest
}: IUploadFileComponent) => {
	const {
		title = 'Upload Data',
		cancelButton = 'Cancel',
		uploadButton = 'Upload',
		selectFileDropArea = 'Drag and Drop here',
		selectFileButton,
		progressLabel = 'Uploading',
		progressDescription = 'It may take few minutes to complete this process.',
		successModalButton = 'OK',
		errorModalButton = 'OK',
	} = messages;

	const {
		currentStage,
		fileError,
		confirmationContent,
		progress,
		file,
		loading,
		onCloseModalHandler,
		onChange,
		onSaveFileHandler,
		onClearFile,
	} = useUploadFile({ modalBody, isOpen, accept, maxSize, messages, isSubmitLoading, warningMessage, ...rest });

	if (currentStage === 'select-file' || currentStage === 'uploading-progress') {
		return (
			<UploadWrapper
				isOpen={isOpen}
				onClose={onCloseModalHandler}
				error={fileError}
				title={title}
				modalBody={modalBody}
				warningMessage={warningMessage}
				uploadButton={{
					disabled: !file || currentStage === 'uploading-progress' || loading,
					onClick: () => onSaveFileHandler(file),
					label: uploadButton,
					isLoading: isSubmitLoading,
				}}
				cancelButton={{
					disabled: loading,
					onClick: onCloseModalHandler,
					label: cancelButton,
				}}
				hasCloseICon={hasCloseICon}
			>
				{currentStage === 'uploading-progress' ? (
					<UploadProgressStage
						width={progress}
						uploadProgressLabel={progressLabel}
						uploadProgressTitle={progressDescription}
						className="flex flex-col justify-center flex-1 w-full my-8 border border-gray-200 rounded-md h-44 px-7"
					/>
				) : (
					<UploadStage
						value={file}
						onChange={onChange}
						accept={accept}
						maxSize={maxSize}
						uploadAreaLabel={selectFileDropArea}
						chooseFileButtonText={selectFileButton}
						onClear={onClearFile}
					/>
				)}
			</UploadWrapper>
		);
	}

	if (confirmationContent) {
		return (
			<UploadConfirmation
				isOpen={isOpen}
				onClose={onCloseModalHandler}
				confirmationContent={confirmationContent}
				successModalButton={successModalButton}
				errorModalButton={errorModalButton}
			/>
		);
	}

	return <></>;
};
