export interface IFile {
	/** The max size of the accepted file, the size is in MB */
	maxSize: number;
	/** The accepted files type */
	accept: { [key: string]: string[] };
}

export interface IUploadFile {
	/** The label for the uploader item */
	label?: string;
	/** Is a `callback` function used to close the UploadFile modal */
	onClose?: () => void;
	/** Whether the upload and take photo buttons are shown (default=true) */
	showFileUpload?: boolean;
	/** Whether the take photo button is shown (default=true) */
	showTakePicture?: boolean;
}
