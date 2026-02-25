import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { UploadFileInput } from '../../src/components/UploadFile/UploadFileInput';
import { File, FileItem } from '../../src/components/UploadFile/types';

type ComponentType = (args: {
	title: string;
	subtitle: string;
	items: FileItem[];
	onChange: (id: string, image: File, progressCallback: (loaded: number, total: number) => void) => Promise<void>;
	onDelete: (id: string) => void;
	onViewDetails?: (id: string) => void;
}) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [items, setItems] = useState(args.items);

	const handleChange = async (id: string, image: File, progressCallback: (loaded: number, total: number) => void) => {
		// Simulate API call
		setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, image } : item)));
		progressCallback(50, 100); // Simulate progress
		setTimeout(() => {
			progressCallback(100, 100); // Simulate completion
		}, 2000); // Simulate a 2-second API call
	};

	const handleDelete = (id: string) => {
		setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, image: undefined } : item)));
	};

	return (
		<ScrollView style={{ backgroundColor: '#F1F1F4', flex: 1 }}>
			<View style={{ padding: 16 }}>
				<Text style={{ fontSize: 24, fontWeight: 'bold' }}>{args.title}</Text>
				<Text style={{ fontSize: 16, color: '#666', marginBottom: 16 }}>{args.subtitle}</Text>
				{items.map((item) => (
					<UploadFileInput
						key={item.id}
						label={item.label}
						isRequired={item.isRequired}
						disabled={item.disabled}
						defaultThumbnail={item.defaultThumbnail}
						initialImage={item.image}
						onSaveFile={(image, progressCallback) => handleChange(item.id, image, progressCallback)}
						onDelete={() => handleDelete(item.id)}
						showFileUpload={item.showFileUpload}
						showTakePicture={item.showTakePicture}
						allowImageProcessing={item.allowImageProcessing}
						imageProcessingOptions={item.imageProcessingOptions}
						acceptedFilesType={item.acceptedFilesType}
						convertImageFormat={item.convertImageFormat}
						messages={{
							// Default variant specific messages
							closeModalText: 'Close',
							continueModalText: 'Continue',
							// Base messages (common to all variants)
							takePhotoText: 'Take a photo or ',
							browseText: 'Browse',
							cameraUnavailable: 'Camera is unavailable',
							permissionError: 'Permission denied',
							otherError: 'An error occurred',
							uploadFailed: 'Upload failed',
							cameraPermissionTitle: 'Camera Permission',
							cameraPermissionMessage: 'We need access to your camera to take photos.',
							cameraPermissionNeutralButton: 'Ask Me Later',
							cameraPermissionNegativeButton: 'Cancel',
							cameraPermissionPositiveButton: 'OK',
							...item.messages,
						}}
					/>
				))}
			</View>
		</ScrollView>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Components/UploadFileInput',
	render: Template,
};

export default StoryMeta;

export const Default: StoryObj<{
	title: string;
	subtitle: string;
	items: FileItem[];
	onChange: (id: string, image: File, progressCallback: (loaded: number, total: number) => void) => Promise<void>;
	onDelete: (id: string) => void;
	onViewDetails?: (id: string) => void;
}> = {
	args: {
		title: 'Photos of the Vehicle',
		subtitle: 'Accepted file types: JPG, JPEG, PNG, HEIC',
		items: [
			{
				id: '1',
				label: 'Front view',
				defaultThumbnail: 'https://services.shory.com/cdn/ksa-motor/images/car.png',
				isRequired: true,
				allowImageProcessing: true,
				convertImageFormat: 'JPEG',
				acceptedFilesType: ['image/jpeg', 'image/jpg', 'image/png'],
				imageProcessingOptions: {
					maxSizeInMb: 1,
					maxWidthOrHeight: 100,
					initialQuality: 10,
					maxIterations: 50,
				},
			},
			{
				id: '5',
				label: 'No thumbnail example',
			},
			{
				id: '6',
				label: "Can't upload",
				defaultThumbnail: 'https://services.shory.com/cdn/ksa-motor/images/car.png',
				showFileUpload: false,
				messages: {
					takePhotoText: 'Take a Photo',
				},
			},
			{
				id: '7',
				label: "Can't take picture",
				defaultThumbnail: 'https://services.shory.com/cdn/ksa-motor/images/car.png',
				showTakePicture: false,
				messages: {
					browseText: 'Browse files',
				},
			},
		],
	},
};
