import { Text, TouchableOpacity, View } from 'react-native';
import { TailwindFn } from 'twrnc';
import { CloseIcon } from '@devkit/icons/native';

export const BottomSheetHeader = ({
	bottomSheetTitle,
	bottomSheetCloseButton,
	closeBottomSheet,
	tw,
}: {
	bottomSheetTitle?: string;
	bottomSheetCloseButton?: boolean;
	closeBottomSheet: () => void;
	tw: TailwindFn;
}) => {
	if (!bottomSheetTitle && !bottomSheetCloseButton) return null;

	return (
		<View style={tw`flex-row justify-between items-center px-4 pb-5`}>
			{bottomSheetTitle ? (
				<Text style={tw` text-body text-gray-900 font-main-bold`}>{bottomSheetTitle}</Text>
			) : (
				<View />
			)}
			{bottomSheetCloseButton && (
				<TouchableOpacity onPress={closeBottomSheet}>
					<CloseIcon height={16} width={16} color="gray" />
				</TouchableOpacity>
			)}
		</View>
	);
};
