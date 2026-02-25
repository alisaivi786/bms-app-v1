import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RNAnimated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { AgCloseCrossCircleDeleteIcon, AgEditPencilIcon, SfCameraFillIcon } from '@devkit/icons/native';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import Button from '../Buttons/Button';
import Modal from '../DialogModal/Modal';
import { File } from './types';

const Animated = 'default' in RNAnimated ? (RNAnimated.default as typeof RNAnimated) : RNAnimated;

interface UploadFileInputDefaultProps {
	label?: string;
	isRequired: boolean;
	image?: File;
	editModeImage?: File;
	mode: 'default' | 'selected';
	pending: boolean;
	showFileUpload: boolean;
	showTakePicture: boolean;
	hasErrors: boolean;
	messages: {
		takePhotoText: string;
		browseText: string;
		closeModalText?: string;
		continueModalText?: string;
	};
	onTakePhoto: () => void;
	onBrowseFile: () => void;
	onEditTakePhoto: () => void;
	onEditBrowseFile: () => void;
	onRemoveImage: () => void;
	onConfirmEditing: () => Promise<void>;
	onResetEditMode: () => void;
}

const iconSize = 20;
const screenWidth = Dimensions.get('window').width;
const previewSize = screenWidth * 0.9;

// Image size constants
const DEFAULT_IMAGE_WIDTH = 75;
const DEFAULT_IMAGE_HEIGHT = 50;
const SELECTED_IMAGE_SIZE = 50;

const styles = StyleSheet.create({
	loadingOverlay: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
	},
	preview: {
		width: previewSize,
		height: previewSize,
	},
});

export const UploadFileInputDefault = ({
	label,
	isRequired,
	image,
	editModeImage,
	mode,
	pending,
	showFileUpload,
	showTakePicture,
	hasErrors,
	messages,
	onTakePhoto,
	onBrowseFile,
	onEditTakePhoto,
	onEditBrowseFile,
	onRemoveImage,
	onConfirmEditing,
	onResetEditMode,
}: UploadFileInputDefaultProps) => {
	const { tw } = useMobileUIConfigOptions();
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Calculate spacing values from tailwind classes
	const paddingStyle = tw`p-4`;
	const gapStyle = tw`gap-4`;
	const paddingSize = (paddingStyle as Record<string, number>).padding ?? 16;
	const gapSize = (gapStyle as Record<string, number>).gap ?? 16;

	// Shared values for animated background
	const backgroundHeight = useSharedValue(mode === 'selected' ? SELECTED_IMAGE_SIZE + paddingSize * 2 : 55); // Selected: image size + top and bottom padding
	const backgroundLeft = useSharedValue(mode === 'selected' ? 0 : image?.uri ? DEFAULT_IMAGE_WIDTH + gapSize : 0);
	const imageOpacity = useSharedValue(mode === 'default' && image?.uri ? 1 : 0);

	useEffect(() => {
		// Animate height and left position when mode changes
		backgroundHeight.value = withTiming(mode === 'selected' ? SELECTED_IMAGE_SIZE + paddingSize * 2 : 55, {
			duration: 300,
		});
		backgroundLeft.value = withTiming(mode === 'selected' ? 0 : image?.uri ? DEFAULT_IMAGE_WIDTH + gapSize : 0, {
			duration: 300,
		});
		imageOpacity.value = withTiming(mode === 'default' && image?.uri ? 1 : 0, { duration: 300 });
	}, [mode, backgroundHeight, backgroundLeft, imageOpacity, image?.uri, paddingSize, gapSize]);

	const animatedBackgroundStyle = useAnimatedStyle(() => {
		return {
			height: backgroundHeight.value,
			left: backgroundLeft.value,
		};
	});

	const animatedImageStyle = useAnimatedStyle(() => {
		return {
			opacity: imageOpacity.value,
		};
	});

	const handleEditImage = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		onResetEditMode();
	};

	const handleConfirm = async () => {
		await onConfirmEditing();
		setIsModalOpen(false);
	};

	const renderDefaultMode = () => {
		return (
			<View style={tw`gap-4 flex-row`}>
				{image?.uri && (
					<Animated.Image
						style={[{ height: DEFAULT_IMAGE_HEIGHT, width: DEFAULT_IMAGE_WIDTH }, animatedImageStyle]}
						source={image}
						resizeMode="contain"
					/>
				)}
				<View style={tw`flex-1 h-[55px] justify-center items-center flex-row bg-transparent rounded-2 p-1`}>
					{showTakePicture && (
						<View style={tw`justify-center items-center flex-row`}>
							<TouchableOpacity onPress={onTakePhoto}>
								<SfCameraFillIcon width={iconSize} height={iconSize} style={tw`text-brand-600`} />
							</TouchableOpacity>
							<Text style={tw`ml-2 mt-1 font-main-regular text-body text-left`}>{messages.takePhotoText}</Text>
						</View>
					)}
					{showFileUpload && (
						<TouchableOpacity onPress={onBrowseFile}>
							<Text style={tw`mt-1 font-main-regular text-brand-600 text-body text-left`}>{messages.browseText}</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
		);
	};

	const renderSelectedMode = (loading: boolean) => {
		return (
			<View style={tw`flex-row bg-transparent rounded-2 p-4`}>
				<View style={{ height: SELECTED_IMAGE_SIZE, width: SELECTED_IMAGE_SIZE }}>
					<Image
						style={[{ height: SELECTED_IMAGE_SIZE, width: SELECTED_IMAGE_SIZE }, tw`${loading ? 'opacity-80' : ''}`]}
						source={image}
						resizeMode="cover"
					/>
					{loading && (
						<View style={[tw`bg-gray-50/75`, styles.loadingOverlay]}>
							<ActivityIndicator size="small" color={tw.color('brand-600')} />
						</View>
					)}
				</View>
				<View style={tw`flex-1 flex-row items-center flex-row p-1`}>
					<Text
						numberOfLines={1}
						ellipsizeMode="head"
						style={tw`flex-1 mt-1 p-2 font-main-regular text-body text-left`}
					>
						{image?.filename ?? image?.uri ?? ''}
					</Text>
					<TouchableOpacity style={tw`p-1`} onPress={onRemoveImage}>
						<AgCloseCrossCircleDeleteIcon width={iconSize} height={iconSize} style={tw`text-red-500`} />
					</TouchableOpacity>
					<TouchableOpacity style={tw`p-1`} onPress={handleEditImage}>
						<AgEditPencilIcon width={iconSize} height={iconSize} style={tw`text-brand-500`} />
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	return (
		<Animated.View
			style={tw`bg-white rounded-2 my-2 mb-4 p-4 ${hasErrors && !pending ? 'border-red-500 border-2' : ''}  `}
		>
			<View style={tw`flex-row`}>
				<Text style={tw`font-main-medium text-body p-1 text-left`}>{label}</Text>
				{isRequired ? <Text style={tw`font-main-medium text-body text-red-500 p-1 text-left`}>*</Text> : null}
			</View>
			<View style={tw`py-2`}>
				{/* Animated background view */}
				<Animated.View style={[tw`absolute top-2 right-0 bg-gray-100 rounded-2`, animatedBackgroundStyle]} />
				{/* Content views */}
				{pending && renderSelectedMode(true)}
				{!pending && mode === 'default' && renderDefaultMode()}
				{!pending && mode === 'selected' && renderSelectedMode(false)}
			</View>
			<Modal isOpen={isModalOpen} onClose={handleModalClose} snapPoints={['80%']}>
				<View style={tw`gap-4 justify-center items-center`}>
					<View style={tw`h-[10] w-full`}>
						<TouchableOpacity style={tw`absolute right-5 top-0`} onPress={handleModalClose}>
							<Text style={tw`leading-[20px] text-paragraph text-brand-600 font-main-bold text-left`}>
								{messages.closeModalText}
							</Text>
						</TouchableOpacity>
					</View>
					<Image style={styles.preview} source={editModeImage} resizeMode="contain" />
					<View style={tw`h-[55px] w-[90] justify-center items-center flex-row bg-gray-100 rounded-2 py-1 px-8 m-5`}>
						{showTakePicture && (
							<View style={tw`justify-center items-center flex-row`}>
								<TouchableOpacity onPress={onEditTakePhoto}>
									<SfCameraFillIcon width={iconSize} height={iconSize} style={tw`text-brand-600`} />
								</TouchableOpacity>
								<Text style={tw`ml-2 mt-1 font-main-regular text-body text-left`}>{messages.takePhotoText}</Text>
							</View>
						)}
						{showFileUpload && (
							<TouchableOpacity onPress={onEditBrowseFile}>
								<Text style={tw`mt-1 font-main-regular text-brand-600 text-body text-left`}>{messages.browseText}</Text>
							</TouchableOpacity>
						)}
					</View>
					<View style={tw`w-[90] items-center mb-8 mx-4`}>
						<View style={tw`flex w-full bg-brand-600 rounded-2 overflow-hidden`}>
							<Button isLoading={false} onPress={handleConfirm} variant="primary">
								{messages.continueModalText}
							</Button>
						</View>
					</View>
				</View>
			</Modal>
		</Animated.View>
	);
};
