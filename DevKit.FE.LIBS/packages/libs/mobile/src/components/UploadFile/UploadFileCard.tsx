import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { UploadButton } from './UploadButton';
import { File } from './types';

interface UploadFileCardProps {
	image?: File;
	thumbnail?: string;
	documentTitle?: string;
	viewDetailsText?: string;
	fileInfoText?: string;
	uploadError?: string;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	disabled?: boolean;
	onViewDetails?: () => void;
	onUploadPress: () => void;
	onRemove: () => void;
	uploadButtonText?: string;
}

export const UploadFileCard = ({
	image,
	thumbnail,
	documentTitle,
	viewDetailsText,
	fileInfoText,
	uploadError,
	isLoading,
	isError,
	isSuccess,
	disabled = false,
	onViewDetails,
	onUploadPress,
	onRemove,
	uploadButtonText,
}: UploadFileCardProps) => {
	const { tw } = useMobileUIConfigOptions();
	const cardBorderStyle = isError ? tw`border border-red-500` : tw``;

	return (
		<View style={[tw`bg-white rounded-3 p-3 flex-row gap-3 items-center`, cardBorderStyle]}>
			{/* Thumbnail - Only show if thumbnail prop is provided */}
			{thumbnail && (
				<View style={tw`h-[60px] w-[60px] bg-white rounded-2 p-1 items-center justify-center`}>
					<Image style={tw`h-full w-full`} source={{ uri: thumbnail }} resizeMode="contain" />
				</View>
			)}

			{/* Content */}
			<View style={tw`flex-1 gap-2`}>
				<View style={tw`gap-2`}>
					<Text style={tw`font-main-bold text-paragraph text-black text-left`}>{documentTitle}</Text>
					{viewDetailsText && (
						<TouchableOpacity onPress={onViewDetails} disabled={!onViewDetails}>
							<Text style={tw`font-main-bold text-caption2 text-brand-600 text-left`}>{viewDetailsText}</Text>
						</TouchableOpacity>
					)}
				</View>
				{isError && uploadError && uploadError?.trim() !== '' ? (
					<Text style={tw`font-main-regular text-legal text-red-500 text-left`}>{uploadError}</Text>
				) : (
					<Text style={tw`font-main-regular text-legal text-gray-700 text-left`}>{fileInfoText}</Text>
				)}
			</View>

			{/* Upload Button / Status */}
			<UploadButton
				isLoading={isLoading}
				isError={isError}
				isSuccess={isSuccess}
				disabled={disabled}
				image={image}
				uploadButtonText={uploadButtonText}
				onUploadPress={onUploadPress}
				onRemove={onRemove}
			/>
		</View>
	);
};
