import LottieViewImport from 'lottie-react-native';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { AgUploadIcon, FileIcon, SfTrashFillIcon } from '@devkit/icons/native';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { File } from './types';
import uploadLoaderAnimation from './upload-loader.json';

// Handle both CommonJS (with .default) and direct require for LottieView
const LottieView =
	(LottieViewImport as typeof LottieViewImport & { default?: typeof LottieViewImport }).default || LottieViewImport;

interface UploadButtonProps {
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	disabled?: boolean;
	image?: File;
	uploadButtonText?: string;
	onUploadPress: () => void;
	onRemove: () => void;
}

export const UploadButton = ({
	isLoading,
	isError,
	isSuccess,
	disabled = false,
	image,
	uploadButtonText,
	onUploadPress,
	onRemove,
}: UploadButtonProps) => {
	const { tw } = useMobileUIConfigOptions();
	const [errorLoadingImage, setErrorLoadingImage] = useState(false);

	if (isSuccess) {
		// Success state - show thumbnail with delete button
		return (
			<View style={tw`h-[60px] w-[60px] relative`}>
				<View
					style={tw`bg-green-50 border border-green-500 border-dashed rounded-2 p-2 h-full w-full items-center justify-center`}
				>
					{image?.uri && !errorLoadingImage ? (
						<Image
							style={tw`h-[42px] w-[42px]`}
							source={{ uri: image.uri }}
							resizeMode="contain"
							onError={() => setErrorLoadingImage(true)}
						/>
					) : (
						<FileIcon width={30} height={30} style={tw`text-green-500`} />
					)}
				</View>
				<TouchableOpacity
					style={tw`absolute -right-1 -bottom-1 bg-white rounded-full shadow-md h-6 w-6 items-center justify-center`}
					onPress={onRemove}
				>
					<SfTrashFillIcon width={12} height={12} style={tw`text-red-500`} />
				</TouchableOpacity>
			</View>
		);
	}

	if (isLoading) {
		// Loading state - show loading indicator
		return (
			<View
				style={tw`bg-gray-50 border border-brand-400 border-dashed rounded-2 px-4 py-2 h-[60px] w-[60px] items-center justify-center`}
			>
				<LottieView source={uploadLoaderAnimation} autoPlay loop style={tw`w-14 h-14`} />
			</View>
		);
	}

	// Default or Error state - show upload button
	const buttonBorderStyle = isError ? tw`border border-red-500 border-dashed` : tw``;
	const disabledStyle = disabled ? tw`opacity-40` : tw``;

	return (
		<TouchableOpacity
			style={[
				tw`bg-gray-50 rounded-2 p-2 h-15 w-15 items-center justify-center gap-2`,
				buttonBorderStyle,
				disabledStyle,
			]}
			onPress={onUploadPress}
			disabled={disabled}
		>
			<AgUploadIcon width={16} height={16} style={tw`text-black`} />
			<Text style={tw`font-main-bold text-legal text-gray-700`}>{uploadButtonText}</Text>
		</TouchableOpacity>
	);
};
