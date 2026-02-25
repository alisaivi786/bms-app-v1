'use client';

import { flatten } from 'lodash';
import { ReactNode, createContext, useContext, useState } from 'react';
import { DropzoneInputProps, DropzoneRootProps, FileError, FileRejection, useDropzone } from 'react-dropzone';
import { TUploadFileStages } from '../common/types';
import { IUploadFileInput, TFilePreview } from './UploadFileInput';

type UseDropZoneInputProps = <T extends DropzoneInputProps>(props?: T | undefined) => Partial<T>;
type UseDropZoneRootProps = <T extends DropzoneRootProps>(props?: T | undefined) => Partial<T>;

export type UploadInputContextProps = Omit<IUploadFileInput, 'onSaveFile'> & {
	currentStage: TUploadFileStages;
	onCancelFile: () => void;
	progress: number;
	currentEditStage: TUploadFileStages;
	setEditingFilePreview: React.Dispatch<React.SetStateAction<TFilePreview>>;
	onEditModalClose: () => void;
	onChange: (
		acceptedFile?: File | undefined,
		rejectedFile?: FileRejection | undefined,
		isAutoSave?: boolean | undefined
	) => Promise<void> | void;
	onEditingFileChange: (
		acceptedFile?: File | undefined,
		rejectedFile?: FileRejection | undefined,
		isAutoSave?: boolean | undefined
	) => Promise<void> | void;
	showCamera?: boolean;
	setShowCamera: React.Dispatch<React.SetStateAction<boolean>>;
	file?: File;
	editingFile?: File;
	currentFilePreview?: TFilePreview;
	editingFilePreview?: TFilePreview;
};

const UploadInputContext = createContext<
	UploadInputContextProps & {
		isDragActive?: boolean;
		isEditingDragActive?: boolean;
		editModalRootProps: UseDropZoneRootProps;
		editModalGetInputProps: UseDropZoneInputProps;
		getInputProps: UseDropZoneInputProps;
		getRootProps: UseDropZoneRootProps;
		isEdit: boolean;
		setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
	}
>({
	currentStage: 'select-file',
	onCancelFile: () => undefined,
	progress: 0,
	messages: { buttonText: '', dragAreaText: '', uploadProgressTitle: '', uploadProgressLabel: '' },
	currentEditStage: 'select-file',
	setEditingFilePreview: () => undefined,
	errorMessage: '',
	editingErrorMessage: '',
	onEditModalClose: () => undefined,
	onChange: () => undefined,
	onEditingFileChange: () => undefined,
	setShowCamera: () => undefined,
	accept: {},
	maxSize: 1,
	showFileUpload: true,
	showTakePicture: false,
	editModalRootProps: () => ({}),
	editModalGetInputProps: () => ({}),
	getInputProps: () => ({}),
	getRootProps: () => ({}),
	isEdit: false,
	setIsEdit: () => undefined,
});

export const UploadInputContextProvider = ({
	children,
	props,
}: {
	children: ReactNode;
	props: UploadInputContextProps;
}) => {
	const [isEdit, setIsEdit] = useState(false);

	const { accept, onEditingFileChange, onChange, setShowCamera, maxSize, showFileUpload, showTakePicture, disabled } =
		props;

	/**
	 * Determine if the component should be disabled
	 * - Explicitly disabled via prop
	 * - Both upload options are disabled (no actions available)
	 */
	const isDisabled = disabled || (showFileUpload === false && showTakePicture === false);
	const isDropzoneDisabled = isDisabled || showFileUpload === false;

	const fileExtensionValidator: (file: File) => FileError | FileError[] | null = (file) => {
		const nameSplit = file?.name?.split('.');
		const extension = nameSplit?.[nameSplit?.length - 1].toLowerCase();
		const lowerCaseAcceptValues = flatten(Object.values(accept)).map((v) => v.toLowerCase());

		if (!accept || !lowerCaseAcceptValues.includes(`.${extension}`)) {
			return {
				code: 'extension-not-supported',
				message: 'Please Upload valid file extension',
			};
		}

		return null;
	};

	const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
		if (isEdit) onEditingFileChange(acceptedFiles[0], rejectedFiles[0]);
		else onChange(acceptedFiles[0], rejectedFiles[0], true);

		// if the file picker of camera modal is opened, close it on drop
		setShowCamera(false);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		noClick: true,
		onDrop,
		accept: accept,
		maxSize: (maxSize ?? 1) * 1048576,
		multiple: false,
		validator: fileExtensionValidator,
		disabled: isDropzoneDisabled,
		noDrag: isDropzoneDisabled,
		noKeyboard: isDropzoneDisabled,
	});

	const {
		getRootProps: editModalRootProps,
		getInputProps: editModalGetInputProps,
		isDragActive: isEditingDragActive,
	} = useDropzone({
		noClick: true,
		onDrop,
		accept: accept,
		maxSize: (maxSize ?? 1) * 1048576,
		multiple: false,
		validator: fileExtensionValidator,
		disabled: isDropzoneDisabled,
		noDrag: isDropzoneDisabled,
		noKeyboard: isDropzoneDisabled,
	});

	return (
		<UploadInputContext.Provider
			value={{
				...props,
				disabled: isDisabled,
				isDragActive,
				isEditingDragActive,
				editModalRootProps,
				editModalGetInputProps,
				getInputProps,
				getRootProps,
				isEdit,
				setIsEdit,
			}}
		>
			{children}
		</UploadInputContext.Provider>
	);
};

export const useUploadInputContext = () => useContext(UploadInputContext);
