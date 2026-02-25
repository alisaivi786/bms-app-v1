import { useState } from 'react';
import { FileRejection } from 'react-dropzone';
import { IUploadFileInput } from '../upload-input';
import { TFilePreview } from '../upload-input/UploadFileInput';
import { IUploadFileComponent } from '../upload-modal';
import { TConfirmationContent, TUploadFileStages } from './types';

type TUseUploadFile = (IUploadFileComponent | IUploadFileInput) & {
	setEditingFilePreview?: React.Dispatch<React.SetStateAction<TFilePreview>>;
	setCurrentFilePreview?: React.Dispatch<React.SetStateAction<TFilePreview>>;
	previewFile?: TFilePreview;
};

const useUploadFile = (props: TUseUploadFile) => {
	const { onSaveFile, getValidateError, setEditingFilePreview, setCurrentFilePreview, previewFile } = props;

	const [currentStage, setCurrentStage] = useState<TUploadFileStages>('select-file');
	const [fileError, setFileError] = useState<string | undefined>();
	const [confirmationContent, setConfirmationContent] = useState<TConfirmationContent>();
	const [progress, setProgress] = useState(0);
	const [file, setFile] = useState<File | undefined>(undefined);
	const [loading, setLoading] = useState(false);

	/** edit file variables */
	const [currentEditStage] = useState<TUploadFileStages>('select-file'); // to be used later if other stages need to be handled
	const [editingFile, setEditingFile] = useState<File | undefined>(undefined);
	const [editingFileError, setEditingFileError] = useState<string | undefined>();

	const onCloseModalHandler = () => {
		setCurrentStage('select-file');
		onClearFile();
		props?.onClose?.();
	};

	const onEditModalClose = () => {
		setEditingFile(undefined);
		getValidateError?.(undefined, undefined, true); // calling this to reset editing error message
		setEditingFileError(undefined);
	};

	const onChange = async (acceptedFile?: File, rejectedFile?: FileRejection, isAutoSave?: boolean) => {
		const error = await getValidateError?.(acceptedFile, rejectedFile, false);

		if (error) {
			setFileError(error);
		} else if (acceptedFile) {
			setFileError(undefined);
			setFile(acceptedFile);

			if (isAutoSave) onSaveFileHandler?.(acceptedFile);
		}
	};

	const onEditingFileChange = async (acceptedFile?: File, rejectedFile?: FileRejection) => {
		const error = await getValidateError?.(acceptedFile, rejectedFile, true);

		if (error) {
			setEditingFileError(error);
		} else if (acceptedFile) {
			setEditingFileError(undefined);
			setEditingFile(acceptedFile);
			const blobURL = URL.createObjectURL(acceptedFile);

			setEditingFilePreview && setEditingFilePreview({ filePath: blobURL, thumbnailPath: blobURL });
		}
	};

	const onSaveFileHandler = async (acceptedFile?: File) => {
		const currentFile = acceptedFile?.name ? acceptedFile : file;

		if (currentFile) {
			setCurrentStage('uploading-progress');
			try {
				// set current thumbnail
				if (acceptedFile) {
					const blobURL = URL.createObjectURL(acceptedFile);

					const isPdf = acceptedFile.name?.split('.').pop()?.toLowerCase() == 'pdf';

					if (setCurrentFilePreview) {
						if (isPdf) {
							setCurrentFilePreview({ filePath: acceptedFile, thumbnailPath: acceptedFile });
						} else {
							setCurrentFilePreview({ filePath: blobURL, thumbnailPath: blobURL });
						}
					}
				}
				setLoading(true);

				const confirmation = await onSaveFile(currentFile, onUploadProgress);

				if (!confirmation) {
					return setCurrentStage('upload-confirmation');
				}

				if (confirmation.variant !== 'unsuccessful') {
					setConfirmationContent(confirmation);
					setCurrentStage('upload-confirmation');
				} else {
					setFileError(confirmation.message);
					setCurrentStage('select-file');
				}
			} catch (e) {
				setCurrentStage('select-file');
			} finally {
				setLoading(false);
				setProgress(0);

				// reset the edited file
				setEditingFile(undefined);
			}
		}
	};

	const onUploadProgress = (loaded: number, total: number) => {
		const progressLevel = Math.floor((loaded / total) * 100);

		setProgress(progressLevel);
	};
	const onClearFile = () => {
		setFile(undefined);
		setFileError(undefined);
		setCurrentFilePreview && setCurrentFilePreview({ filePath: '', thumbnailPath: previewFile?.thumbnailPath });
		setEditingFilePreview && setEditingFilePreview({ filePath: '', thumbnailPath: undefined });
	};

	const onCancelFile = () => {
		setCurrentStage('select-file');
		onClearFile();
		props?.onClose?.();
	};

	return {
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
		onCancelFile,
		currentEditStage,
		editingFile,
		onEditingFileChange,
		editingFileError,
		onEditModalClose,
	};
};

export default useUploadFile;
