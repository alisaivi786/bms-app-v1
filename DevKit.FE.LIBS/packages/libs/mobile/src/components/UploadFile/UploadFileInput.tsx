import { forwardRef, useImperativeHandle, useRef } from 'react';
import { FieldValues, IUploadFile, Path, ReactForm, useReactFormController } from '@devkit/utilities';
import { FormInputGroup } from '../FormInputGroup';
import { UploadFileInputCard, UploadFileInputCardRef } from './UploadFileInputCard';
import { UploadFileInputDefault } from './UploadFileInputDefault';
import { File } from './types';
import { useUploadFileLogic } from './useUploadFileLogic';

export type UploadFileInputVariant = 'default' | 'card';

export type MimeTypes =
	| 'image/jpeg'
	| 'image/jpg'
	| 'image/png'
	| 'image/heic'
	| 'image/heif'
	| 'application/pdf'
	| 'application/pdf'
	| 'application/msword'
	| 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
	| 'application/vnd.ms-excel'
	| 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	| 'application/vnd.ms-powerpoint'
	| 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
	| 'text/plain'
	| 'text/csv'
	| 'text/comma-separated-values'
	| 'application/json'
	| 'application/zip'
	| 'audio/*'
	| 'video/*'
	| 'image/*';

export type AcceptedFilesType = MimeTypes[];

export type ConvertImageFormat = 'JPEG' | 'PNG';

export interface UploadFileInputRef {
	uploadButtonPress: () => void;
	onBrowseFile: () => void;
	onTakePhoto: () => void;
	onPickDocument: () => void;
}

/** Base messages shared across all variants */
export interface BaseMessages {
	takePhotoText: string;
	browseText: string;
	cameraUnavailable: string;
	permissionError: string;
	otherError: string;
	uploadFailed: string;
	cameraPermissionTitle: string;
	cameraPermissionMessage: string;
	cameraPermissionNeutralButton: string;
	cameraPermissionNegativeButton: string;
	cameraPermissionPositiveButton: string;
	unsupportedMediaError?: string;
}

/** Messages specific to the default variant */
export interface DefaultVariantMessages extends BaseMessages {
	closeModalText: string;
	continueModalText: string;
}

/** Messages specific to the card variant */
export interface CardVariantMessages extends BaseMessages {
	documentTitle: string;
	viewDetailsText?: string;
	fileInfoText: string;
	uploadButtonText: string;
	uploadOptionsTitle?: string;
	cancelText?: string;
	pickDocumentText: string;
}

/** Error object returned by the onError callback */
export interface UploadFileError {
	code: 'permission' | 'camera_unavailable' | 'other';
	message: string;
}

/** Base props shared across all variants */
interface BaseUploadFileInputProps<TForm extends FieldValues> extends IUploadFile {
	/** The initial image model */
	initialImage?: File;
	/** The default thumbnail URL */
	defaultThumbnail?: string;
	/** Callback function when an image is changed */
	onSaveFile: (file: File, progressCallback: (loaded: number, total: number) => void) => Promise<void>;
	/** Callback function when an image is deleted */
	onDelete: () => void;
	/** The form object's property(paths) that the data would be rendered for,
	 * for `example` {
	 *			users: [
	 *				{
	 *					name: '',
	 *				}
	 *			]
	 *  }
	 * to edit the first user name you have to pass the following path: users.[0].name
	 */
	field?: Path<TForm>;
	/** Used to pass the form object to handle the field `values`, `validation`, and `onFormSubmit` function
	 *  and more internally by the provided form value, you should be aware if the form was added the field value and
	 *  the onChange function would be ignored */
	form?: ReactForm<TForm>;
	/** If true, the input element is required.*/
	isRequired?: boolean;
	/** If true, the upload button will be disabled */
	disabled?: boolean;
	/** Error message to display */
	errorMessage?: string;
	/** Callback when an error occurs (permission denied, camera unavailable, upload failed) */
	onError?: (error: UploadFileError) => void;
	allowImageProcessing?: boolean;
	/** Converts selected images to given format before uploading. */
	convertImageFormat?: ConvertImageFormat;
	imageProcessingOptions?: {
		maxSizeInMb?: number | null;
		maxWidthOrHeight?: number | null;
		initialQuality?: number | null;
		maxIterations?: number | null;
	} | null;
	/** MIME type to extensions mapping object for accepted file types (images and documents).
	 * Automatically determines which upload options to show based on the MIME types provided.
	 * Example: { 'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'], 'application/pdf': ['.pdf'] }
	 */
	acceptedFilesType?: AcceptedFilesType;
}

/** Props for default variant */
interface DefaultVariantProps<TForm extends FieldValues> extends BaseUploadFileInputProps<TForm> {
	/** The variant of the upload file input */
	variant?: 'default';
	/** Messages object for default variant */
	messages: DefaultVariantMessages;
}

/** Props for card variant */
interface CardVariantProps<TForm extends FieldValues> extends BaseUploadFileInputProps<TForm> {
	/** The variant of the upload file input */
	variant: 'card';
	/** Messages object for card variant */
	messages: CardVariantMessages;
	/** Callback function when "View details" is clicked */
	onViewDetails?: () => void;
}

/** Discriminated union of all variant props */
export type UploadFileInputProps<TForm extends FieldValues> = DefaultVariantProps<TForm> | CardVariantProps<TForm>;

export const UploadFileInput = forwardRef(
	<TForm extends FieldValues>(props: UploadFileInputProps<TForm>, ref: React.Ref<UploadFileInputRef>) => {
		const {
			label,
			defaultThumbnail,
			initialImage,
			onSaveFile,
			onDelete,
			messages,
			field,
			showFileUpload = true,
			showTakePicture = true,
			isRequired = false,
			disabled = false,
			variant = 'default' as const,
			form,
			errorMessage,
			onError,
			allowImageProcessing,
			convertImageFormat,
			imageProcessingOptions,
			acceptedFilesType,
		} = props;

		const { onChange, hasErrors = false, formId } = useReactFormController({ field, form });

		// Create ref for the card variant component
		const cardRef = useRef<UploadFileInputCardRef>(null);

		// Expose the uploadButtonPress function via ref
		useImperativeHandle(ref, () => ({
			uploadButtonPress: () => {
				if (variant === 'card') {
					cardRef.current?.uploadButtonPress();
				} else {
					// For default variant, trigger camera or library directly
					if (showTakePicture && showFileUpload) {
						// If both are available, default to camera
						launchCameraWithPermission();
					} else if (showFileUpload) {
						launchLibrary();
					} else if (showTakePicture) {
						launchCameraWithPermission();
					}
				}
			},
			onBrowseFile: () => {
				launchLibrary();
			},
			onTakePhoto: () => {
				launchCameraWithPermission();
			},
			onPickDocument: () => {
				launchDocumentPicker();
			},
		}));

		// Use the custom hook to extract all shared logic
		const {
			image,
			editModeImage,
			mode,
			pending,
			hasImageSelected,
			launchCameraWithPermission,
			launchCameraForEdit,
			launchLibrary,
			launchLibraryForEdit,
			removeImage,
			confirmEditing,
			resetEditMode,
			launchDocumentPicker,
		} = useUploadFileLogic({
			initialImage,
			defaultThumbnail,
			variant,
			onSaveFile,
			onDelete,
			onChange,
			messages,
			acceptedFilesType,
			onError,
			allowImageProcessing,
			convertImageFormat,
			imageProcessingOptions,
		});

		// Determine which upload options to show based on acceptedFilesType prop (for card variant only)
		let finalShowTakePicture = showTakePicture;
		let finalShowFileUpload = showFileUpload;
		let finalShowDocumentPicker = false;

		if (variant === 'card' && acceptedFilesType) {
			// If acceptedFilesType prop is provided, derive the flags from parsed file types
			finalShowTakePicture = acceptedFilesType.some((type) => type.startsWith('image/'));
			finalShowFileUpload = acceptedFilesType.some((type) => type.startsWith('image/'));
			finalShowDocumentPicker = acceptedFilesType.some((type) => !type.startsWith('image/'));
		}

		// Render the appropriate variant component using Strategy Pattern
		const variantProps = {
			label,
			isRequired,
			showFileUpload: finalShowFileUpload,
			showTakePicture: finalShowTakePicture,
			messages,
			onTakePhoto: launchCameraWithPermission,
			onBrowseFile: launchLibrary,
		};

		return (
			<FormInputGroup formId={formId} hasErrors={hasErrors}>
				{variant === 'card' ? (
					<UploadFileInputCard
						ref={cardRef}
						{...variantProps}
						image={image}
						defaultThumbnail={defaultThumbnail}
						uploadError={errorMessage}
						pending={pending}
						hasImageSelected={hasImageSelected}
						disabled={disabled}
						showDocumentPicker={finalShowDocumentPicker}
						onViewDetails={props.variant === 'card' ? props.onViewDetails : undefined}
						onRemoveImage={removeImage}
						onPickDocument={launchDocumentPicker}
					/>
				) : (
					<UploadFileInputDefault
						{...variantProps}
						image={image}
						editModeImage={editModeImage}
						mode={mode}
						pending={pending}
						hasErrors={!!hasErrors}
						onEditTakePhoto={launchCameraForEdit}
						onEditBrowseFile={launchLibraryForEdit}
						onRemoveImage={removeImage}
						onConfirmEditing={confirmEditing}
						onResetEditMode={resetEditMode}
					/>
				)}
			</FormInputGroup>
		);
	}
);

UploadFileInput.displayName = 'UploadFileInput';
