import React, { useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { BottomSheet } from '../../src/components/BottomSheet';
import { Button } from '../../src/components/Buttons';
import { UploadFileInput, UploadFileInputRef } from '../../src/components/UploadFile/UploadFileInput';
import { File } from '../../src/components/UploadFile/types';
import { useMobileUIConfigOptions } from '../../src/layouts/ThemeProvider/theme-context';

type ComponentType = (args: { title: string; subtitle: string }) => JSX.Element;

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Components/UploadFileInput/Card with Ref Example',
};

export default StoryMeta;

export const CardWithRef: StoryObj<{
	title: string;
	subtitle: string;
}> = {
	render: (args) => {
		const { tw } = useMobileUIConfigOptions();
		const uploadRef = useRef<UploadFileInputRef>(null);
		const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
		const [image, setImage] = useState<File | undefined>(undefined);

		const handleSaveFile = async (file: File, progressCallback: (loaded: number, total: number) => void) => {
			setImage(file);
			progressCallback(50, 100);
			setTimeout(() => {
				progressCallback(100, 100);
			}, 2000);
		};

		const handleDelete = () => {
			setImage(undefined);
		};

		const handleViewDetails = () => {
			setIsBottomSheetOpen(true);
		};

		const handleCloseBottomSheet = () => {
			setIsBottomSheetOpen(false);
		};

		const handleUploadFromBottomSheet = () => {
			handleCloseBottomSheet();
			uploadRef.current?.uploadButtonPress();
		};

		return (
			<ScrollView style={{ backgroundColor: '#F1F1F4', flex: 1 }}>
				<View style={{ padding: 16 }}>
					<Text style={{ fontSize: 24, fontWeight: 'bold' }}>{args.title}</Text>
					<Text style={{ fontSize: 16, color: '#666', marginBottom: 16 }}>{args.subtitle}</Text>

					<UploadFileInput
						ref={uploadRef}
						label="Vehicle Registration"
						variant="card"
						isRequired={true}
						defaultThumbnail="https://services.shory.com/cdn/ksa-motor/images/car.png"
						initialImage={image}
						onSaveFile={handleSaveFile}
						onDelete={handleDelete}
						onViewDetails={handleViewDetails}
						messages={{
							// Card variant specific messages
							documentTitle: 'Vehicle Registration',
							viewDetailsText: 'View details',
							fileInfoText: 'Max file size: 8Mb, File types .jpg, .png & .pdf',
							uploadButtonText: 'Upload',
							uploadOptionsTitle: "Select how you'd like to upload",
							cancelText: 'Cancel',
							// Base messages (common to all variants)
							takePhotoText: 'Take a Photo',
							browseText: 'From your phone',
							cameraUnavailable: 'Camera is unavailable',
							permissionError: 'Permission denied',
							otherError: 'An error occurred',
							uploadFailed: 'Upload failed',
							cameraPermissionTitle: 'Camera Permission',
							cameraPermissionMessage: 'We need access to your camera to take photos.',
							cameraPermissionNeutralButton: 'Ask Me Later',
							cameraPermissionNegativeButton: 'Cancel',
							cameraPermissionPositiveButton: 'OK',
							pickDocumentText: 'Pick Document',
						}}
					/>

					{/* BottomSheet with Upload Button */}
					<BottomSheet
						isOpen={isBottomSheetOpen}
						onClose={handleCloseBottomSheet}
						title="Document Details"
						enableDynamicSizing={true}
					>
						<View style={tw`p-4`}>
							<Text style={tw`text-body mb-4 font-bold`}>Vehicle Registration Document</Text>
							<Text style={tw`text-paragraph mb-4`}>
								Please upload a clear image of your vehicle registration document. Make sure all text is readable and
								the entire document is visible.
							</Text>

							{image ? (
								<View style={tw`mb-4`}>
									<Text style={tw`text-paragraph font-bold mb-2 text-green-600`}>✓ Document uploaded successfully</Text>
									<Text style={tw`text-paragraph text-gray-600`}>Filename: {image.filename || 'Unknown'}</Text>
								</View>
							) : (
								<Text style={tw`text-paragraph mb-4 text-orange-600`}>
									No document uploaded yet. Click the button below to upload.
								</Text>
							)}

							<Button onPress={handleUploadFromBottomSheet}>{image ? 'Change Document' : 'Upload Document'}</Button>
						</View>
					</BottomSheet>
				</View>
			</ScrollView>
		);
	},
	args: {
		title: 'Card Variant with Ref',
		subtitle: 'Demonstrates using a ref to trigger upload from a BottomSheet. Click "View details" to see the example.',
	},
};
