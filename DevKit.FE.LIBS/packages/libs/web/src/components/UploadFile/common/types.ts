import { FileRejection } from 'react-dropzone';
import { IFile } from '@devkit/utilities';

export type TUploadFileStages = 'select-file' | 'uploading-progress' | 'upload-confirmation';

export type TConfirmationContent =
	| {
			variant: 'uploaded' | 'uploaded-with-error';
			title: string;
			description?: string;
	  }
	| {
			variant: 'unsuccessful';
			message: string;
	  };

export interface IFileUploaded extends IFile {
	value: File | undefined;

	chooseFileButtonText: string;

	uploadAreaLabel?: React.ReactNode;

	onChange: (acceptedFiles: File | undefined, rejectedFiles: FileRejection | undefined) => Promise<void> | void;
	onClear: () => void;
}

export interface IButton {
	isLoading?: boolean;
	disabled?: boolean;
	onClick?: () => Promise<void> | void;
	label?: string;
}
