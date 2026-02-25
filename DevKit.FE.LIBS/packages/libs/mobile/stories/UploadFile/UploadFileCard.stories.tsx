import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { AcceptedFilesType, UploadFileInput } from '../../src/components/UploadFile/UploadFileInput';
import { File, FileItem } from '../../src/components/UploadFile/types';

type ComponentType = (args: {
	title: string;
	subtitle: string;
	items: FileItem[];
	onChange: (id: string, image: File, progressCallback: (loaded: number, total: number) => void) => Promise<void>;
	onDelete: (id: string) => void;
	onViewDetails?: (id: string) => void;
}) => JSX.Element;

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Components/UploadFileInput/Card Variant',
};

export default StoryMeta;

export const CardVariant: StoryObj<{
	title: string;
	subtitle: string;
	items: FileItem[];
	onChange: (id: string, image: File, progressCallback: (loaded: number, total: number) => void) => Promise<void>;
	onDelete: (id: string) => void;
	onViewDetails?: (id: string) => void;
}> = {
	render: (args) => {
		const [items, setItems] = useState(args.items);

		const handleChange = async (id: string, image: File, progressCallback: (loaded: number, total: number) => void) => {
			setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, image } : item)));
			progressCallback(50, 100);
			setTimeout(() => {
				progressCallback(100, 100);
			}, 2000);
		};

		const handleDelete = (id: string) => {
			setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, image: undefined } : item)));
		};

		return (
			<ScrollView style={{ backgroundColor: '#F1F1F4', flex: 1 }}>
				<View style={{ padding: 16 }}>
					<Text style={{ fontSize: 24, fontWeight: 'bold' }}>{args.title}</Text>
					<Text style={{ fontSize: 16, color: '#666', marginBottom: 16 }}>{args.subtitle}</Text>
					<View style={{ gap: 16 }}>
						{items.map((item) => (
							<UploadFileInput
								key={item.id}
								label={item.id === '3' ? '' : item.label}
								variant="card"
								isRequired={item.isRequired}
								disabled={item.disabled}
								defaultThumbnail={item.defaultThumbnail}
								initialImage={item.image}
								errorMessage={item.id === '3' ? 'Upload failed. Please try again.' : undefined}
								onSaveFile={(image, progressCallback) => handleChange(item.id, image, progressCallback)}
								onDelete={() => handleDelete(item.id)}
								onViewDetails={args.onViewDetails ? () => args.onViewDetails?.(item.id) : undefined}
								showFileUpload={item.showFileUpload}
								showTakePicture={item.showTakePicture}
								acceptedFilesType={item.acceptedFilesType}
								messages={{
									// Card variant specific messages
									documentTitle: item.label,
									viewDetailsText: 'View details',
									fileInfoText: 'Max file size: 8Mb, File types .jpg, .png & .pdf',
									uploadButtonText: 'Upload',
									uploadOptionsTitle: "Select how you'd like to upload",
									cancelText: 'Cancel',
									pickDocumentText: 'Pick Document',
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
									...item.messages,
								}}
							/>
						))}
					</View>
				</View>
			</ScrollView>
		);
	},
	args: {
		title: 'Card Variant (New Design)',
		subtitle:
			'Modern card-based upload design with all states. Use the "acceptedFilesType" prop to dynamically control upload options based on MIME types for images and documents.',
		onViewDetails: (id: string) => {
			Alert.alert('View Details', `Viewing details for item: ${id}`);
		},
		items: [
			{
				id: '1',
				label: 'Default State',
				defaultThumbnail: 'https://services.shory.com/cdn/ksa-motor/images/car.png',
				isRequired: true,
			},
			{
				id: '2',
				label: 'Success State',
				defaultThumbnail: 'https://services.shory.com/cdn/ksa-motor/images/car.png',
				image: {
					uri: 'https://services.shory.com/cdn/ksa-motor/images/car.png',
					filename: 'car.png',
				},
			},
			{
				id: '3',
				label: 'Error State',
				defaultThumbnail: 'https://services.shory.com/cdn/ksa-motor/images/car.png',
			},
			{
				id: '4',
				label: 'Disabled State',
				defaultThumbnail: 'https://services.shory.com/cdn/ksa-motor/images/car.png',
				disabled: true,
			},
			{
				id: '5',
				label: 'No Thumbnail',
				isRequired: false,
			},
			{
				id: '6',
				label: 'With Document Picker (PDF only)',
				defaultThumbnail: 'https://services.shory.com/cdn/ksa-motor/images/car.png',
				isRequired: true,
				acceptedFilesType: ['application/pdf'],
			},
			{
				id: '7',
				label: 'Multiple Document Types (PDF, DOC, DOCX)',
				defaultThumbnail: 'https://services.shory.com/cdn/ksa-motor/images/car.png',
				isRequired: false,
				acceptedFilesType: [
					'application/pdf',
					'application/msword',
					'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				],
			},
			{
				id: '8',
				label: 'Images Only (JPEG, PNG, HEIC)',
				defaultThumbnail: 'https://services.shory.com/cdn/ksa-motor/images/car.png',
				isRequired: true,
				acceptedFilesType: ['image/jpeg', 'image/jpg', 'image/png', 'image/heic'],
			},
			{
				id: '9',
				label: 'PDF Only',
				defaultThumbnail: 'https://services.shory.com/cdn/ksa-motor/images/car.png',
				isRequired: true,
				acceptedFilesType: ['application/pdf'],
			},
			{
				id: '10',
				label: 'Images + PDF (All Options)',
				defaultThumbnail: 'https://services.shory.com/cdn/ksa-motor/images/car.png',
				isRequired: true,
				acceptedFilesType: ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'application/pdf'],
			},
		],
	},
};
