import { FC, type ReactNode, memo, useCallback, useEffect, useRef, useState } from 'react';
import { Modal } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
	BottomSheetBackdrop,
	BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetModalProvider,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useMobileUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import { ModalProps } from '../../DialogModal';

type CalendarViewWrapperProps = {
	children: ReactNode;
	withModal: boolean;
	modalProps: ModalProps;
};

export const CalendarViewWrapper: FC<CalendarViewWrapperProps> = memo(({ children, withModal = true, modalProps }) => {
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const { tw } = useMobileUIConfigOptions();
	const [isRNModalOpen, setIsRNModalOpen] = useState(modalProps.isOpen);

	useEffect(() => {
		if (modalProps.isOpen) {
			setIsRNModalOpen(true);
		} else {
			bottomSheetRef.current?.close();
		}
	}, [modalProps.isOpen]);

	const renderBackdropComponent = useCallback(
		(props: BottomSheetBackdropProps) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
		[]
	);

	if (!withModal) return <>{children}</>;

	const onBottomSheetDismiss = () => {
		setIsRNModalOpen(false);
		modalProps.onClose?.();
	};

	// Modal open/close order is critical for proper functionality:
	// - On open: RN Modal opens first (via visible prop), then BottomSheetModal presents (via onShow)
	// - On close: BottomSheetModal closes first (via close), then RN Modal closes (via onDismiss)
	// This ensures modals are layered correctly and prevents race conditions that leads to stuck issues.

	// We need to wrap BottomSheetModalProvider with GestureHandlerRootView in order
	// to fix gesture handling on Android (handle & outside tap)
	// https://github.com/gorhom/react-native-bottom-sheet/issues/1334
	return (
		<Modal
			onRequestClose={() => bottomSheetRef.current?.close()}
			onShow={() => bottomSheetRef.current?.present()}
			visible={isRNModalOpen}
			transparent={true}
		>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<BottomSheetModalProvider>
					<BottomSheetModal
						style={[
							tw`w-full justify-start items-stretch bg-white rounded-2xl shadow-lg p-2 border border-gray-200`,
							{ flex: 1 },
						]}
						ref={bottomSheetRef}
						backdropComponent={renderBackdropComponent}
						onDismiss={onBottomSheetDismiss}
					>
						<BottomSheetView>{children}</BottomSheetView>
					</BottomSheetModal>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</Modal>
	);
});

CalendarViewWrapper.displayName = 'CalendarViewWrapper';
