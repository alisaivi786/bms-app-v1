import { useRef } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TailwindFn } from 'twrnc';
import { useMobileUIConfigOptions } from '../../../..';
import { Button } from '../../../Buttons';

type FooterProps = {
	directChange?: boolean;
	closeBottomSheet: () => void;
	onApplyClick: () => void;
	cancelButtonText?: string;
	applyButtonText?: string;
	isDirty?: boolean;
	tw: TailwindFn;
};

const BottomSheetFooter = ({
	directChange,
	closeBottomSheet,
	onApplyClick,
	cancelButtonText,
	applyButtonText,
	isDirty,
	tw,
}: FooterProps) => {
	const viewRef = useRef<View>(null);
	const { bottom } = useSafeAreaInsets();
	const { isRtlLocale } = useMobileUIConfigOptions();

	if (directChange) return null;

	return (
		<View
			ref={viewRef}
			style={tw`flex-row justify-between px-4 pt-3 border-t border-gray-200 gap-4 bg-white pb-[${bottom || 12}px]`}
		>
			<Button variant="secondary" onPress={closeBottomSheet} size="medium" layoutClassName="flex-1">
				{cancelButtonText || (isRtlLocale ? 'إلغاء' : 'Cancel')}
			</Button>
			<Button variant="primary" onPress={onApplyClick} size="medium" disabled={!isDirty} layoutClassName="flex-1">
				{applyButtonText || (isRtlLocale ? 'موافق' : 'Apply')}
			</Button>
		</View>
	);
};

export default BottomSheetFooter;
