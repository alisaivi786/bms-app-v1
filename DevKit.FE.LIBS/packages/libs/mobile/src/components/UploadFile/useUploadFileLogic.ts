import { useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import {
	Asset,
	CameraOptions,
	ImageLibraryOptions,
	ImagePickerResponse,
	launchCamera,
	launchImageLibrary,
} from 'react-native-image-picker';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import { logger } from '@devkit/utilities';
import { errorCodes, isErrorWithCode, pick, types } from '@react-native-documents/picker';
import { ToastManager } from '../Toast/Toast';
import type { AcceptedFilesType, UploadFileError, UploadFileInputProps } from './UploadFileInput';
import {
	compressJpegToMaxSizeInMb,
	convertNativeImageToFormat,
	isSupportedImageType,
	resizeNativeImageDimensions,
} from './imageProcessing';
import { File } from './types';

// Maps MIME types to @react-native-documents/picker types constants
const mimeTypeToPickerType: Record<string, (typeof types)[keyof typeof types]> = {
	'application/pdf': types.pdf,
	'application/msword': types.doc,
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': types.docx,
	'application/vnd.ms-excel': types.xls,
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': types.xlsx,
	'application/vnd.ms-powerpoint': types.ppt,
	'application/vnd.openxmlformats-officedocument.presentationml.presentation': types.pptx,
	'text/plain': types.plainText,
	'text/csv': types.csv,
	'text/comma-separated-values': types.csv,
	'application/json': types.json,
	'application/zip': types.zip,
	'audio/*': types.audio,
	'video/*': types.video,
	'image/*': types.images,
};

const mapMimeTypesToPickerTypes = (mimeTypes: string[]): (string | readonly string[])[] => {
	return mimeTypes.map((mimeType) => mimeTypeToPickerType[mimeType] ?? mimeType);
};

interface UseUploadFileLogicProps {
	initialImage?: File;
	defaultThumbnail?: string;
	variant: 'default' | 'card';
	onSaveFile: (file: File, progressCallback: (loaded: number, total: number) => void) => Promise<void>;
	onDelete: () => void;
	onChange: (value: string | undefined) => void;
	messages: {
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
	};
	acceptedFilesType?: AcceptedFilesType;
	onError?: (error: UploadFileError) => void;
	allowImageProcessing?: UploadFileInputProps<object>['allowImageProcessing'];
	convertImageFormat?: UploadFileInputProps<object>['convertImageFormat'];
	imageProcessingOptions?: UploadFileInputProps<object>['imageProcessingOptions'];
}

const DEFAULT_ACCEPTED_FILES: AcceptedFilesType = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/heic',
	'image/heif',
	'application/pdf',
];

export const useUploadFileLogic = ({
	initialImage,
	defaultThumbnail,
	variant,
	onSaveFile,
	onDelete,
	onChange,
	messages,
	acceptedFilesType = DEFAULT_ACCEPTED_FILES,
	onError,
	allowImageProcessing,
	convertImageFormat,
	imageProcessingOptions,
}: UseUploadFileLogicProps) => {
	const [image, setImage] = useState<File | undefined>(
		variant === 'default' ? initialImage || { uri: defaultThumbnail } : initialImage
	);
	const [editModeImage, setEditModeImage] = useState<File | undefined>(initialImage);
	const [mode, setMode] = useState<'default' | 'selected'>(initialImage ? 'selected' : 'default');
	const [pending, setPending] = useState(false);

	const hasImageSelected: boolean = variant === 'default' ? !!(image && image.uri !== defaultThumbnail) : !!image;

	const showUnsupportedMediaError = () => {
		const msg = messages.unsupportedMediaError ?? messages.otherError;

		ToastManager.showError(msg);
		onError?.({ code: 'other', message: msg });
	};

	const saveImage = async (newImage: Asset) => {
		try {
			if (allowImageProcessing && imageProcessingOptions) {
				if (imageProcessingOptions.maxWidthOrHeight) {
					newImage = await resizeNativeImageDimensions(newImage, imageProcessingOptions);
				}

				if (imageProcessingOptions.maxSizeInMb) {
					newImage = await compressJpegToMaxSizeInMb(newImage, imageProcessingOptions);
				}

				if (convertImageFormat) {
					newImage = await convertNativeImageToFormat(newImage, convertImageFormat);
				}

				if (__DEV__) {
					logger.log('[UploadFile]: Final image details after processing:', {
						uri: newImage.uri,
						type: newImage.type,
						fileName: newImage.fileName,
						fileSize: newImage.fileSize,
						width: newImage.width,
						height: newImage.height,
					});
				}
			}

			await onSaveFile(newImage, (loaded, total) => {
				if (loaded < total) {
					setPending(true);
				} else {
					setPending(false);
					onChange(newImage.uri);
				}
			});
		} catch (error) {
			setPending(false);

			ToastManager.showError(messages.uploadFailed);
		}
	};

	const handleResponse = async (response: ImagePickerResponse) => {
		if (response.didCancel) {
			if (variant === 'default') {
				setMode(hasImageSelected ? 'selected' : 'default');
			}
		} else if (response.errorMessage || response.errorCode) {
			if (variant === 'default') {
				setMode(hasImageSelected ? 'selected' : 'default');
			}
			const errorMsg =
				response.errorCode === 'camera_unavailable'
					? messages.cameraUnavailable
					: response.errorCode === 'permission'
					? messages.permissionError
					: messages.otherError;

			ToastManager.showError(errorMsg);
			onError?.({ code: response.errorCode as UploadFileError['code'], message: errorMsg });
		} else if (response.assets) {
			const newImage = response.assets[0];

			if (!isSupportedImageType(newImage, acceptedFilesType)) {
				if (variant === 'default') {
					setMode(hasImageSelected ? 'selected' : 'default');
				}
				showUnsupportedMediaError();

				return;
			}

			setImage(newImage);

			if (variant === 'default') {
				setEditModeImage(newImage);
				setMode('selected');
			}
			saveImage(newImage);
		} else {
			if (variant === 'default') {
				setMode(hasImageSelected ? 'selected' : 'default');
			}
		}
	};

	const handleEditResponse = async (response: ImagePickerResponse) => {
		if (response.errorMessage || response.errorCode) {
			const errorMsg =
				response.errorCode === 'camera_unavailable'
					? messages.cameraUnavailable
					: response.errorCode === 'permission'
					? messages.permissionError
					: messages.otherError;

			ToastManager.showError(errorMsg);
			onError?.({ code: response.errorCode as UploadFileError['code'], message: errorMsg });
		} else if (response.assets) {
			const newImage = response.assets[0];

			if (!isSupportedImageType(newImage, acceptedFilesType)) {
				showUnsupportedMediaError();

				return;
			}

			setEditModeImage(newImage);
		}
	};

	const requestCameraPermission = async (): Promise<boolean> => {
		if (Platform.OS === 'android') {
			try {
				const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
					title: messages.cameraPermissionTitle,
					message: messages.cameraPermissionMessage,
					buttonNeutral: messages.cameraPermissionNeutralButton,
					buttonNegative: messages.cameraPermissionNegativeButton,
					buttonPositive: messages.cameraPermissionPositiveButton,
				});

				return granted === PermissionsAndroid.RESULTS.GRANTED;
			} catch (err) {
				return false;
			}
		}

		if (Platform.OS === 'ios') {
			try {
				const status = await check(PERMISSIONS.IOS.CAMERA);

				if (status === RESULTS.GRANTED || status === RESULTS.LIMITED) {
					return true;
				}

				if (status === RESULTS.DENIED) {
					const requestResult = await request(PERMISSIONS.IOS.CAMERA);

					return requestResult === RESULTS.GRANTED || requestResult === RESULTS.LIMITED;
				}

				return false;
			} catch (err) {
				return false;
			}
		}

		return true;
	};

	const pickerOptions: CameraOptions | ImageLibraryOptions = {
		mediaType: 'photo',
		presentationStyle: 'fullScreen',
	};

	const launchCameraWithPermission = async () => {
		const hasPermission = await requestCameraPermission();

		if (hasPermission) {
			launchCamera(pickerOptions, handleResponse);
		} else {
			ToastManager.showError(messages.permissionError);
			onError?.({ code: 'permission', message: messages.permissionError });
		}
	};

	const launchCameraForEdit = async () => {
		const hasPermission = await requestCameraPermission();

		if (hasPermission) {
			launchCamera(pickerOptions, handleEditResponse);
		} else {
			ToastManager.showError(messages.permissionError);
			onError?.({ code: 'permission', message: messages.permissionError });
		}
	};

	const launchLibrary = () => {
		launchImageLibrary(pickerOptions, handleResponse);
	};

	const launchLibraryForEdit = () => {
		launchImageLibrary(pickerOptions, handleEditResponse);
	};

	const launchDocumentPicker = async () => {
		try {
			// Use the parsed MIME types from the acceptedFilesType prop, mapped to picker types
			const pickerTypes =
				acceptedFilesType.length > 0 ? mapMimeTypesToPickerTypes(acceptedFilesType).flat() : [types.allFiles];
			const result = await pick({
				presentationStyle: 'fullScreen',
				type: pickerTypes,
				allowMultiSelection: false,
			});

			if (result && result.length > 0) {
				const selectedDocument = result[0];

				// Create a File object compatible with our interface
				const file: File = {
					uri: selectedDocument.uri,
					name: selectedDocument.name || 'document',
					type: selectedDocument.type || 'application/octet-stream',
					size: selectedDocument.size || 0,
					filename: selectedDocument.name || undefined,
				};

				if (!isSupportedImageType(file, acceptedFilesType)) {
					showUnsupportedMediaError();

					return;
				}

				setImage(file);

				if (variant === 'default') {
					setEditModeImage(file);
					setMode('selected');
				}

				await saveImage(file as Asset);
			}
		} catch (err: unknown) {
			// Handle document picker errors
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			if (isErrorWithCode(err as any)) {
				// User cancelled the picker
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				if ((err as any).code === errorCodes.OPERATION_CANCELED) {
					if (variant === 'default') {
						setMode(hasImageSelected ? 'selected' : 'default');
					}

					return;
				}
				// Other errors
				const errorMsg = messages.otherError;

				ToastManager.showError(errorMsg);
			}

			if (variant === 'default') {
				setMode(hasImageSelected ? 'selected' : 'default');
			}
		}
	};

	const removeImage = () => {
		if (variant === 'default') {
			setImage({ uri: defaultThumbnail });
			setMode('default');
		} else {
			setImage(undefined);
		}
		setPending(false);
		onChange(undefined);
		onDelete();
	};

	const confirmEditing = async () => {
		if (editModeImage) {
			setImage(editModeImage);
			await saveImage(editModeImage);
		}
	};

	const resetEditMode = () => {
		setEditModeImage(image);
	};

	return {
		// State
		image,
		editModeImage,
		mode,
		pending,
		hasImageSelected,
		acceptedFilesType,

		// Actions
		launchCameraWithPermission,
		launchCameraForEdit,
		launchLibrary,
		launchLibraryForEdit,
		launchDocumentPicker,
		removeImage,
		confirmEditing,
		resetEditMode,
	};
};
