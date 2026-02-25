import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import {
	BottomSheetBackdrop,
	BottomSheetBackdropProps,
	BottomSheetFlatList,
	BottomSheetFooter,
	BottomSheetFooterProps,
	BottomSheetModal,
	BottomSheetScrollView,
	BottomSheetView,
} from '@gorhom/bottom-sheet';
import type { FlashListProps } from '@shopify/flash-list';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import styles from './BottomSheet.styles';
import BottomSheetContent from './BottomSheetContent';
import { BottomSheetFlashList } from './components/BottomSheetFlashList';

type BaseBottomSheetProps = {
	isOpen: boolean;
	snapPoints?: Array<string>;
	title?: string;
	subTitle?: string;
	description?: ReactNode;
	header?: ReactNode;
	footer?: ReactNode;
	onClose?: () => void;
	titlePosition?: 'start' | 'end' | 'center';
	enableDynamicSizing?: boolean;
	maxDynamicContentSize?: number;
	hideCloseButton?: boolean;
	preventOutsideClose?: boolean;
};

type BottomSheetWithChildrenProps = BaseBottomSheetProps & {
	children?: ReactNode;
	nonScrollable?: boolean;
	// List props should not be used when children is provided
	flashListProps?: never;
};

type BottomSheetWithListProps<T = unknown> = BaseBottomSheetProps & {
	children?: never;
	nonScrollable?: never;
	// FlashList props
	flashListProps: {
		data: readonly T[];
		renderItem: FlashListProps<T>['renderItem'];
		keyExtractor?: (item: T, index: number) => string;
		onEndReached?: () => void;
		onEndReachedThreshold?: number;
		ListFooterComponent?: React.ComponentType<Record<string, never>> | React.ReactElement | null;
		ListHeaderComponent?: React.ComponentType<Record<string, never>> | React.ReactElement | null;
		estimatedItemSize?: number;
	};
};

export type BottomSheetProps<T = unknown> = BottomSheetWithChildrenProps | BottomSheetWithListProps<T>;

const BottomSheet = <T,>(props: BottomSheetProps<T>) => {
	const {
		isOpen,
		snapPoints,
		title,
		subTitle,
		description,
		children,
		header,
		footer,
		onClose,
		titlePosition,
		enableDynamicSizing,
		maxDynamicContentSize,
		nonScrollable,
		hideCloseButton = false,
		preventOutsideClose = false,
		flashListProps,
	} = props;

	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const { tw } = useMobileUIConfigOptions();
	const modalStyles = styles.modal(titlePosition);

	const [footerHeight, setFooterHeight] = useState(0);

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

	const onFooterLayout = (e: LayoutChangeEvent) => {
		const h = e.nativeEvent.layout.height;

		setFooterHeight(h);
	};

	const renderBackdropComponent = useCallback(
		(props: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				pressBehavior={preventOutsideClose ? 'none' : 'close'}
				appearsOnIndex={0}
				disappearsOnIndex={-1}
				{...props}
			/>
		),
		[preventOutsideClose]
	);

	const renderFooter = useCallback(
		(props: BottomSheetFooterProps) => (
			<BottomSheetFooter {...props}>
				<View onLayout={onFooterLayout}>{footer}</View>
			</BottomSheetFooter>
		),
		[footer]
	);

	return (
		<BottomSheetModal
			enablePanDownToClose={!preventOutsideClose}
			enableContentPanningGesture={!preventOutsideClose}
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
			footerComponent={footer ? renderFooter : undefined}
		>
			{flashListProps && flashListProps.data && flashListProps.renderItem ? (
				<>
					{!!header && header}
					<BottomSheetContent
						title={header ? undefined : title}
						subTitle={header ? undefined : subTitle}
						description={description}
						hideCloseButton={hideCloseButton}
						onClose={onBottomSheetModalDismiss}
						titlePosition={titlePosition}
					/>
					<BottomSheetFlashList
						data={flashListProps.data}
						renderItem={flashListProps.renderItem}
						keyExtractor={flashListProps.keyExtractor}
						onEndReached={flashListProps.onEndReached}
						onEndReachedThreshold={flashListProps.onEndReachedThreshold}
						ListFooterComponent={flashListProps.ListFooterComponent}
						estimatedItemSize={flashListProps.estimatedItemSize ?? 50}
						contentContainerStyle={tw`${modalStyles.listContent} ${footerHeight > 0 ? `pb-[${footerHeight}px]` : ''}`}
					/>
				</>
			) : nonScrollable ? (
				<BottomSheetView>
					{!!header && header}
					<BottomSheetContent
						title={header ? undefined : title}
						subTitle={header ? undefined : subTitle}
						description={description}
						hideCloseButton={hideCloseButton}
						onClose={onBottomSheetModalDismiss}
						titlePosition={titlePosition}
					>
						{children}
					</BottomSheetContent>
				</BottomSheetView>
			) : (
				<BottomSheetScrollView
					stickyHeaderIndices={header ? [0] : undefined}
					style={tw`${modalStyles.body}`}
					contentContainerStyle={footerHeight > 0 && { paddingBottom: footerHeight }}
				>
					{!!header && header}
					<BottomSheetContent
						title={header ? undefined : title}
						subTitle={header ? undefined : subTitle}
						description={description}
						hideCloseButton={hideCloseButton}
						onClose={onBottomSheetModalDismiss}
						titlePosition={titlePosition}
					>
						{children}
					</BottomSheetContent>
				</BottomSheetScrollView>
			)}
		</BottomSheetModal>
	);
};

export { BottomSheetFlatList };

export default BottomSheet;
