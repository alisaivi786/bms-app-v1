import { forwardRef, useImperativeHandle, useState } from 'react';
import { Text, View } from 'react-native';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { UploadFileCard } from './UploadFileCard';
import { UploadOptionsBottomSheet } from './UploadOptionsBottomSheet';
import { File } from './types';

export interface UploadFileInputCardRef {
	uploadButtonPress: () => void;
}

interface UploadFileInputCardProps {
	label?: string;
	isRequired: boolean;
	image?: File;
	defaultThumbnail?: string;
	uploadError?: string;
	pending: boolean;
	hasImageSelected: boolean;
	disabled: boolean;
	showFileUpload: boolean;
	showTakePicture: boolean;
	showDocumentPicker?: boolean;
	messages: {
		documentTitle?: string;
		viewDetailsText?: string;
		fileInfoText?: string;
		uploadButtonText?: string;
		uploadOptionsTitle?: string;
		takePhotoText: string;
		browseText: string;
		pickDocumentText?: string;
	};
	onViewDetails?: () => void;
	onTakePhoto: () => void;
	onBrowseFile: () => void;
	onRemoveImage: () => void;
	onPickDocument: () => void;
}

export const UploadFileInputCard = forwardRef<UploadFileInputCardRef, UploadFileInputCardProps>(
	(
		{
			label,
			isRequired,
			image,
			defaultThumbnail,
			uploadError,
			pending,
			hasImageSelected,
			disabled,
			showFileUpload,
			showTakePicture,
			showDocumentPicker = false,
			messages,
			onViewDetails,
			onTakePhoto,
			onBrowseFile,
			onRemoveImage,
			onPickDocument,
		},
		ref
	) => {
		const { tw } = useMobileUIConfigOptions();
		const [isUploadOptionsOpen, setIsUploadOptionsOpen] = useState(false);

		const handleUploadButtonPress = () => {
			// If multiple options are available, show the bottom sheet
			const availableOptionsCount = [showTakePicture, showFileUpload, showDocumentPicker].filter(Boolean).length;

			if (availableOptionsCount > 1) {
				setIsUploadOptionsOpen(true);
			}
			// If only one option is available, directly trigger it
			else if (showFileUpload) {
				onBrowseFile();
			} else if (showTakePicture) {
				onTakePhoto();
			} else if (showDocumentPicker) {
				onPickDocument();
			}
		};

		// Expose the handleUploadButtonPress function via ref
		useImperativeHandle(ref, () => ({
			uploadButtonPress: handleUploadButtonPress,
		}));

		const handleSelectFromPhone = () => {
			setIsUploadOptionsOpen(false);
			onBrowseFile();
		};

		const handleSelectTakePhoto = () => {
			setIsUploadOptionsOpen(false);
			onTakePhoto();
		};

		const handleCloseUploadOptions = () => {
			setIsUploadOptionsOpen(false);
		};

		const handleSelectPickDocument = () => {
			setIsUploadOptionsOpen(false);
			onPickDocument();
		};

		// Determine card state
		const isLoading = pending;
		const isError = !!uploadError;
		const isSuccess = !!(hasImageSelected && !pending && !uploadError);

		return (
			<View>
				{/* Label with required indicator */}
				{label && (
					<View style={tw`flex-row mb-2`}>
						<Text style={tw`font-main-medium text-body text-left`}>{label}</Text>
						{isRequired ? <Text style={tw`font-main-medium text-body text-red-500 ml-1 text-left`}>*</Text> : null}
					</View>
				)}

				{/* File Upload Card */}
				<UploadFileCard
					image={image}
					thumbnail={defaultThumbnail}
					documentTitle={messages.documentTitle}
					viewDetailsText={messages.viewDetailsText}
					fileInfoText={messages.fileInfoText}
					uploadError={uploadError}
					isLoading={isLoading}
					isError={isError}
					isSuccess={isSuccess}
					disabled={disabled}
					onViewDetails={onViewDetails}
					onUploadPress={handleUploadButtonPress}
					onRemove={onRemoveImage}
					uploadButtonText={messages.uploadButtonText}
				/>

				{/* Upload Options BottomSheet */}
				<UploadOptionsBottomSheet
					isOpen={isUploadOptionsOpen}
					title={messages.uploadOptionsTitle}
					fromPhoneText={messages.browseText}
					takePhotoText={messages.takePhotoText}
					pickDocumentText={messages.pickDocumentText}
					showDocumentPicker={showDocumentPicker}
					onClose={handleCloseUploadOptions}
					onSelectFromPhone={handleSelectFromPhone}
					onSelectTakePhoto={handleSelectTakePhoto}
					onSelectPickDocument={handleSelectPickDocument}
				/>
			</View>
		);
	}
);

UploadFileInputCard.displayName = 'UploadFileInputCard';
