import { FieldValues, IUploadFile } from '@devkit/utilities';
import { AcceptedFilesType, UploadFileInputProps } from './UploadFileInput';

export interface ImageUploaderProps {
	/** The title of the image uploader */
	title: string;
	/** The subtitle of the image uploader */
	subtitle?: string;
	/** The list of file items */
	items: FileItem[];
	/** Callback function when an image is changed */
	onChange: (id: string, image: File) => void;
	/** Callback function when an image is deleted */
	onDelete: (id: string) => void;
	/** Callback function when an error occurs */
	onError: (id: string, errorMessage: string, errorCode: 'camera_unavailable' | 'permission' | 'others') => void;
}

export interface FileItem extends IUploadFile {
	/** The unique identifier for the file item */
	id: string;
	/** The label for the file item */
	label: string;
	/** The default thumbnail URL when there is no image uploaded or selected yet */
	defaultThumbnail?: string;
	/** The image model if an image has been uploaded already */
	image?: File;
	/** The pending state indicating if an image is being uploaded */
	pending?: boolean;
	/** If true, the upload button will be disabled */
	disabled?: boolean;
	messages?: Partial<UploadFileInputProps<FieldValues>['messages']>;
	isRequired?: boolean;
	/** MIME type to extensions mapping object for accepted file types (images and documents). Automatically determines which upload options to show. */
	acceptedFilesType?: AcceptedFilesType;

	allowImageProcessing?: UploadFileInputProps<FieldValues>['allowImageProcessing'];
	convertImageFormat?: UploadFileInputProps<FieldValues>['convertImageFormat'];
	imageProcessingOptions?: UploadFileInputProps<FieldValues>['imageProcessingOptions'];
}

export interface File {
	/** The URI of the image */
	uri?: string;
	/** The filename of the image */
	filename?: string;
	/** The file name */
	name?: string;
	/** The file MIME type */
	type?: string;
	/** The file size in bytes */
	size?: number;
}
