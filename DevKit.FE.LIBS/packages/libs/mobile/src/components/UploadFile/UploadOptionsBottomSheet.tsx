import { View } from 'react-native';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import BottomSheet from '../BottomSheet/BottomSheet';
import { OptionButton } from './OptionButton';

interface UploadOptionsBottomSheetProps {
	isOpen: boolean;
	title?: string;
	fromPhoneText?: string;
	takePhotoText?: string;
	pickDocumentText?: string;
	showDocumentPicker?: boolean;
	onClose: () => void;
	onSelectFromPhone: () => void;
	onSelectTakePhoto: () => void;
	onSelectPickDocument: () => void;
}

export const UploadOptionsBottomSheet = ({
	isOpen,
	title,
	fromPhoneText,
	takePhotoText,
	pickDocumentText,
	showDocumentPicker = false,
	onClose,
	onSelectFromPhone,
	onSelectTakePhoto,
	onSelectPickDocument,
}: UploadOptionsBottomSheetProps) => {
	const { tw } = useMobileUIConfigOptions();

	return (
		<BottomSheet isOpen={isOpen} onClose={onClose} title={title} nonScrollable enableDynamicSizing>
			<View style={tw`gap-4 mb-12`}>
				<OptionButton text={fromPhoneText} onPress={onSelectFromPhone} />
				<OptionButton text={takePhotoText} onPress={onSelectTakePhoto} />
				{showDocumentPicker && <OptionButton text={pickDocumentText} onPress={onSelectPickDocument} />}
			</View>

		</BottomSheet>
	);
};
