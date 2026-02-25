import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	BottomSheetBackdrop,
	BottomSheetBackdropProps,
	BottomSheetModal,
	BottomSheetScrollView,
	BottomSheetView,
	useBottomSheetInternal,
} from '@gorhom/bottom-sheet';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import styles from './Modal.styles';

export type ModalProps = {
	isOpen: boolean;
	snapPoints?: Array<string>;
	title?: string;
	subTitle?: string;
	description?: ReactNode;
	content?: ReactNode;
	header?: ReactNode;
	footer?: ReactNode;
	children?: ReactNode;
	onClose?: () => void;
	titlePosition?: 'start' | 'end' | 'center';
	enableDynamicSizing?: boolean;
	maxDynamicContentSize?: number;
};

const Modal = (props: ModalProps) => {
	const {
		isOpen,
		snapPoints,
		title,
		subTitle,
		description,
		content,
		header,
		footer,
		children,
		onClose,
		titlePosition,
		enableDynamicSizing,
		maxDynamicContentSize,
	} = props;
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const { tw } = useMobileUIConfigOptions();
	const { bottom } = useSafeAreaInsets();
	const modalStyles = styles.modal(titlePosition, bottom);

	useEffect(() => {
		if (isOpen) {
			bottomSheetModalRef.current?.present();
		} else {
			bottomSheetModalRef.current?.dismiss();
		}
	}, [isOpen]);

	const onBottomSheetModalDismiss = () => {
		bottomSheetModalRef.current?.dismiss();
		onClose?.();
	};

	const renderBackdropComponent = useCallback(
		(props: BottomSheetBackdropProps) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
		[]
	);

	return (
		<BottomSheetModal
			keyboardBehavior="interactive"
			keyboardBlurBehavior="restore"
			android_keyboardInputMode="adjustPan"
			ref={bottomSheetModalRef}
			snapPoints={snapPoints}
			onDismiss={onBottomSheetModalDismiss}
			enableDynamicSizing={enableDynamicSizing ?? true}
			maxDynamicContentSize={maxDynamicContentSize}
			backdropComponent={renderBackdropComponent}
			style={tw`${modalStyles.contentContainer}`}
		>
			<View style={tw`${modalStyles.contentWrapper}`}>
				{children ? (
					<BottomSheetView>
						{header && <View>{header}</View>}
						{children}
						{footer && <View style={tw`${modalStyles.footer}`}>{footer}</View>}
					</BottomSheetView>
				) : (
					<BottomSheetScrollView stickyHeaderIndices={header ? [0] : undefined} style={tw`${modalStyles.body}`}>
						{header && <View>{header}</View>}
						{(title || subTitle) && (
							<View style={tw`${modalStyles.header}`}>
								{title && <Text style={tw`${modalStyles.title}`}>{title}</Text>}
								{subTitle && <Text style={tw`${modalStyles.subTitle}`}>{subTitle}</Text>}
							</View>
						)}
						{description && <View style={tw`${modalStyles.description}`}>{description}</View>}
						{content && <View style={tw`${modalStyles.content}`}>{content}</View>}
					</BottomSheetScrollView>
				)}
				{footer && <View style={tw`${modalStyles.footer}`}>{footer}</View>}
				<KbHandler isOpen={isOpen} />
			</View>
		</BottomSheetModal>
	);
};

const KbHandler = (props: { isOpen: boolean }) => {
	const { shouldHandleKeyboardEvents } = useBottomSheetInternal();

	useEffect(() => {
		if (shouldHandleKeyboardEvents?.value !== undefined) shouldHandleKeyboardEvents.value = !!props?.isOpen;

		return () => {
			if (shouldHandleKeyboardEvents?.value) shouldHandleKeyboardEvents.value = false;
		};
	}, [props?.isOpen, shouldHandleKeyboardEvents]);

	return null;
};

export default Modal;
