'use client';

import { useEffect, useState } from 'react';
import { FileRejection } from 'react-dropzone';
import { ComponentPopoverVariantType, IErrorMessage, IFile, IUploadFile } from '@devkit/utilities';
import { TextVariantProps } from '../../Buttons/types';
import { FormFieldErrors } from '../../FormFieldErrors/FormFieldErrors';
import { FormLabel } from '../../FormLabel';
import useUploadFile from '../common/useUploadFile';
import CurrentStageComponent from './CurrentStageComponent';
import { EditModal } from './EditModal';
import styles from './UploadFileInput.styles';
import { UploadInputContextProvider } from './upload-input-context';

export const UploadFileVariant = {
	Section: 'section',
	FormInput: 'form-input',
	Thumbnail: 'thumbnail',
	ImageCard: 'image-card',
} as const;

export type TUploadFileVariant = (typeof UploadFileVariant)[keyof typeof UploadFileVariant];

export type TMessages = {
	buttonText: string;
	dragAreaText: string;
	uploadProgressTitle: string;
	uploadProgressLabel: string;
	maxFileSize?: string;
	supportedFileTypes?: string | React.ReactNode;
	takePictureButtonText?: string;
	editModalTitle?: string;
	editModalDescription?: string;
	editModalButtonText?: string;
	editModalTakePictureButtonText?: string;
	editModalConfirm?: string;
	useCamera?: string;
	cameraPermissions?: string;
	permissionDenied?: string;
	allowAccess?: string;
	browse?: string;
	browsePrefixText?: string;
	editModalBrowse?: string;
	editModalBrowsePrefixText?: string;
};

export type TFilePreview = {
	filePath?: string | File;
	thumbnailPath?: string | File;
};

export interface IUploadFileInput extends IUploadFile, IFile {
	/** If true, the input element is required.*/
	isRequired?: boolean;
	/** Add a popover to your label, you can pass a component or simply add an object with the header and description */
	popover?: React.ReactNode | { header: string; description: string };
	popoverVariant?: ComponentPopoverVariantType;

	/** The UploadFileInput error/errors text */
	errorMessage?: string | string[] | IErrorMessage | IErrorMessage[];
	/** The UploadFileInput edited file error/errors text */
	editingErrorMessage?: string | string[] | IErrorMessage | IErrorMessage[];
	/** Is an object to add the text content of the UploadFileInput.  */
	messages: TMessages;
	/** A temporary file name, if the file is successfully loaded it will
	 *  be replaced by the loaded file name*/
	existFile?: string;
	/** Is a `callback` function to handle file submission immediately after it's uploaded,
	 *  it takes the uploaded file and a callback to handle the upload progress */
	onSaveFile: (file: File, progressCallback: (loaded: number, total: number) => void) => Promise<void>;
	/** Is a `callback` function used to close the UploadFile modal */
	onClose?: () => void;
	/**
	 * Callback function to handle validation,
	 * Return string to reject the change and display the error, and undefined to accept the change
	 */

	getValidateError?: (
		acceptedFile?: File,
		rejectedFile?: FileRejection,
		isEdit?: boolean
	) => Promise<string | undefined> | string | undefined;
	/** The form variant of the UploadFileInput */
	variant?: TUploadFileVariant;
	/** an object contains both thumbnail path of the file, and file path to be used as a preview in case "Edit" file is required*/
	previewFile?: TFilePreview;
	/** If true, a clear icon and functionality will be added */
	isClearable?: boolean;
	/** If true, an edit icon and functionality will be added */
	isEditable?: boolean;
	/** If true, show thumbnail of uploaded file */
	showThumbnail?: boolean;
	/** Button variant (primary or outline)*/
	buttonVariant?: TextVariantProps['variant'];
	/** If true, set the file thumbnail, name and close icon as centered in Success state */
	centerItems?: boolean;
	/** file description icon to show in Camera view */
	cameraFileIcon?: string | React.FC<React.SVGProps<SVGSVGElement>>;

	/** Disable Upload */
	disabled?: boolean;

	/** Has Form Error */
	hasError?: boolean;
	/** A flag that changes the background to highlight a change in values. */
	highlighted?: boolean;
}

export const UploadFileInput = ({
	accept,
	maxSize,
	label = '',
	isRequired,
	popover,
	popoverVariant,
	errorMessage,
	editingErrorMessage,
	messages,
	existFile,
	variant = UploadFileVariant.FormInput,
	showFileUpload = true,
	showTakePicture = false,
	previewFile,
	isClearable = true,
	isEditable = false,
	showThumbnail = false,
	buttonVariant,
	centerItems = true,
	cameraFileIcon,
	disabled = false,
	hasError,
	highlighted,
	...rest
}: IUploadFileInput) => {
	const [currentFilePreview, setCurrentFilePreview] = useState<TFilePreview>(
		previewFile ?? { filePath: '', thumbnailPath: '' }
	);
	const [editingFilePreview, setEditingFilePreview] = useState<TFilePreview>(
		previewFile ?? { filePath: '', thumbnailPath: '' }
	);

	const [showCamera, setShowCamera] = useState<boolean>(false);

	const {
		onChange,
		file,
		currentStage,
		progress,
		onCancelFile,
		currentEditStage,
		editingFile,
		onEditingFileChange,
		fileError,
		onEditModalClose,
	} = useUploadFile({
		accept,
		maxSize,
		label,
		errorMessage,
		messages,
		existFile,
		variant,
		setEditingFilePreview,
		setCurrentFilePreview,
		buttonVariant,
		hasError,
		previewFile,
		...rest,
	});
	const showError = Boolean(fileError) || hasError;
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const editingFileExt = (editingFile?.name || file?.name || existFile)?.split('.').pop();
	const isEditingFilePdf = editingFileExt?.toLowerCase() == 'pdf';

	useEffect(() => {
		if (showThumbnail && previewFile) {
			setCurrentFilePreview(previewFile);
			setEditingFilePreview(previewFile);
		}
	}, [previewFile]);

	useEffect(() => {
		if (showThumbnail && currentFilePreview) {
			setEditingFilePreview(currentFilePreview);
		}
	}, [currentFilePreview]);

	return (
		<UploadInputContextProvider
			props={{
				currentStage,
				onCancelFile,
				progress,
				file,
				messages,
				existFile,
				variant,
				showFileUpload,
				showTakePicture,
				currentFilePreview,
				isClearable,
				isEditable,
				currentEditStage,
				editingFile,
				editingFilePreview,
				showThumbnail,
				setEditingFilePreview,
				errorMessage,
				editingErrorMessage,
				onEditModalClose,
				isRequired,
				popover,
				popoverVariant,
				buttonVariant,
				centerItems,
				label,
				onChange,
				onEditingFileChange,
				showCamera,
				setShowCamera,
				cameraFileIcon,
				disabled,
				accept,
				maxSize,
			}}
		>
			<div className={styles.container(highlighted)}>
				<EditModal
					isOpen={isEditModalOpen}
					onClose={() => {
						setIsEditModalOpen(false);
						currentFilePreview && setEditingFilePreview(currentFilePreview);
						onEditModalClose();
					}}
					onContinueClick={async () => {
						if (editingFile) {
							await onChange(editingFile, undefined, true);
						}

						setIsEditModalOpen(false);
					}}
					isPdf={isEditingFilePdf}
					setIsEditModalOpen={setIsEditModalOpen}
				/>
				{variant !== UploadFileVariant.Thumbnail && variant !== UploadFileVariant.ImageCard && (
					<FormLabel isRequired={isRequired} popover={popover} popoverVariant={popoverVariant}>
						{label}
					</FormLabel>
				)}
				<CurrentStageComponent showError={showError} setIsEditModalOpen={setIsEditModalOpen} />
				{showError && variant !== UploadFileVariant.ImageCard && <FormFieldErrors errors={errorMessage} />}
			</div>
		</UploadInputContextProvider>
	);
};
