import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, Keyboard, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	BottomSheetBackdrop,
	BottomSheetBackdropProps,
	BottomSheetFlatList,
	BottomSheetModal,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { DropdownProps, FieldValues, PrimitiveKeys, StringAndNumberKeys } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import { TextField } from '../../TextField';
import styles from '../Dropdown.styles';
import DropdownItem from './DropdownItem';

const DefaultSearchPlaceHolder = {
	en: 'Search for an option...',
	ar: 'البحث	',
};

const DefaultNoOptionAvailableText = {
	en: 'No options',
	ar: 'لا يوجد خيارات',
};

type BottomSheetMobileProps<
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
> = DropdownProps<TValue, TKey, TForm, TGroupKey> & {
	snapPoints?: Array<string>;
	isOpen: boolean;
	onBottomSheetClose: () => void;
	bottomSheetTitle?: string;
	bottomSheetCloseButton?: boolean;
	bottomSheetTitleNode?: ReactNode;
	withModal?: boolean;
};

const DropdownBottomSheet = <
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
>({
	isOpen,
	options,
	isSearchable,
	searchPlaceHolder,
	noOptionAvailableText,
	snapPoints,
	onBottomSheetClose,
	renderItem,
	onChange,
	labelKey,
	valueKey,
	bottomSheetTitle,
	bottomSheetTitleNode,
	bottomSheetCloseButton = false,
	getIsItemDisabled,
	withModal,
}: BottomSheetMobileProps<TValue, TKey, TForm, TGroupKey>) => {
	const { tw, locale } = useMobileUIConfigOptions();
	const { bottom } = useSafeAreaInsets();
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const bottomSheetStyles = styles.bottomSheet();
	const [searchQuery, setSearchQuery] = useState('');
	const [filteredOptions, setFilteredOptions] = useState(options);
	const [additionalPadding, setAdditionalPadding] = useState(0);
	const screenHeight = Dimensions.get('window').height;
	const maxHeight = screenHeight * 0.8;

	// Filter options based on the search query
	useEffect(() => {
		setFilteredOptions(
			options?.filter((option) => {
				const label = typeof option === 'string' ? option : option[labelKey as keyof TValue];

				return label?.toString().toLowerCase().includes(searchQuery.toLowerCase());
			})
		);
	}, [searchQuery, options, labelKey]);

	const showListenerRef = React.useRef<{ remove: () => void } | null>(null);
	const hideListenerRef = React.useRef<{ remove: () => void } | null>(null);

	useEffect(() => {
		showListenerRef.current = Keyboard.addListener('keyboardDidShow', (event) => {
			setAdditionalPadding(event.endCoordinates.height);
		});
		hideListenerRef.current = Keyboard.addListener('keyboardDidHide', () => {
			setAdditionalPadding(0);
		});

		return () => {
			if (showListenerRef.current) {
				showListenerRef.current.remove?.();
				showListenerRef.current = null;
			}

			if (hideListenerRef.current) {
				hideListenerRef.current.remove?.();
				hideListenerRef.current = null;
			}
			setAdditionalPadding(0);
		};
	}, []);

	useEffect(() => {
		if (isOpen) {
			bottomSheetRef.current?.present();
		} else {
			bottomSheetRef.current?.close();
		}
	}, [isOpen]);

	const handleDropdownItemSelect = (item: TValue) => {
		onChange?.(item[valueKey]);
		closeBottomSheet();
	};

	// we have to close BottomSheet first then dismiss Modal
	// once a BottomSheet's close animation is done
	// otherwise the animation is skipped
	const closeBottomSheet = () => {
		bottomSheetRef.current?.close();
	};

	const onBottomSheetModalDismiss = () => {
		bottomSheetRef.current?.dismiss();
		setSearchQuery('');
		onBottomSheetClose?.();
	};

	const renderHeader = () => {
		if (!bottomSheetTitle && !bottomSheetCloseButton && !bottomSheetTitleNode) return null;

		if (bottomSheetTitleNode) {
			return bottomSheetTitleNode;
		}

		return (
			<View style={tw`${bottomSheetStyles.titleContainer}`}>
				{bottomSheetTitle ? <Text style={tw`${bottomSheetStyles.titleComponent}`}>{bottomSheetTitle}</Text> : <View />}
				{bottomSheetCloseButton && (
					<TouchableOpacity onPress={closeBottomSheet}>
						<Text style={tw`text-paragraph text-brand-600 font-main-bold`}>Close</Text>
					</TouchableOpacity>
				)}
			</View>
		);
	};

	const renderBackdropComponent = useCallback(
		(props: BottomSheetBackdropProps) => {
			return (
				<BottomSheetBackdrop
					{...props}
					appearsOnIndex={0}
					disappearsOnIndex={-1}
					style={[props.style, tw`${withModal ? '' : bottomSheetStyles.backdrop}`]}
				/>
			);
		},
		[bottomSheetStyles.backdrop, tw, withModal]
	);

	const bottomSheetContent = (
		<BottomSheetModal
			style={tw`${bottomSheetStyles.contentContainer}`}
			ref={bottomSheetRef}
			// If snap points are provided, only use them
			enableDynamicSizing={!snapPoints?.length && !(isSearchable && Platform.OS === 'android')}
			detached={true}
			maxDynamicContentSize={maxHeight}
			onDismiss={onBottomSheetModalDismiss}
			backdropComponent={renderBackdropComponent}
			snapPoints={
        Platform.OS === 'android' && isSearchable ? ['80%'] : snapPoints ? snapPoints : undefined
      }
		>
			{renderHeader()}
			{isSearchable && (
				<View style={tw`${bottomSheetStyles.searchableTextField}`}>
					<TextField
						placeholder={searchPlaceHolder ?? DefaultSearchPlaceHolder[locale as keyof typeof DefaultSearchPlaceHolder]}
						value={searchQuery}
						onChange={(val: string | undefined) => setSearchQuery(val ?? '')}
						isClearable
					/>
				</View>
			)}
			<BottomSheetFlatList
				contentContainerStyle={tw`${bottomSheetStyles.flatListContainer(isSearchable, bottom, additionalPadding)}`}
				data={filteredOptions}
				keyExtractor={(item: TValue) => item[labelKey as keyof TValue] as string}
				renderItem={(obj) => (
					<DropdownItem
						key={obj.item[valueKey as keyof TValue] as string}
						item={obj.item}
						onDropdownItemSelect={handleDropdownItemSelect}
						renderItem={renderItem}
						labelKey={labelKey}
						valueKey={valueKey}
						getIsItemDisabled={getIsItemDisabled}
					/>
				)}
				ListEmptyComponent={
					<View style={tw`${bottomSheetStyles.emptyResultContainer}`}>
						<Text style={tw`${bottomSheetStyles.emptyResultText}`}>
							{noOptionAvailableText ?? (DefaultNoOptionAvailableText[locale] || DefaultNoOptionAvailableText.en)}
						</Text>
					</View>
				}
				showsVerticalScrollIndicator={true}
				bounces={false}
				keyboardShouldPersistTaps="handled"
			/>
		</BottomSheetModal>
	);

	if (!withModal) {
		return bottomSheetContent;
	}

	// We need to wrap BottomSheetModalProvider with GestureHandlerRootView in order
	// to fix gesture handling on Android (handle & outside tap).
	// https://github.com/gorhom/react-native-bottom-sheet/issues/1334
	// React Native Modal wrapper is also required to pass context correctly for some specific cases.
	return (
		<Modal onRequestClose={closeBottomSheet} visible={isOpen} transparent={true}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<BottomSheetModalProvider>{bottomSheetContent}</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</Modal>
	);
};

export default DropdownBottomSheet;
