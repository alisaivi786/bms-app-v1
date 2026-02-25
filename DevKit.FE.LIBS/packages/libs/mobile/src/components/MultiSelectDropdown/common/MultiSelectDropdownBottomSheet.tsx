import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { FieldValues, PrimitiveKeys, StringAndNumberKeys } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import { BottomSheet } from '../../BottomSheet/index';
import styles from '../Dropdown.styles';
import { MultiSelectDropdownMobileProps } from '../MultiSelectDropdown';
import FooterContent from './BottomSheet/BottomSheetFooter';
import { OptionsList } from './BottomSheet/OptionsList';
import { SearchInput } from './BottomSheet/SearchInput';

const { height } = Dimensions.get('window');

export const DefaultSearchPlaceHolder = {
	en: 'Search for an option...',
	ar: 'البحث	',
};

export const DefaultNoOptionAvailableText = {
	en: 'No options',
	ar: 'لا يوجد خيارات',
};

type MultiSelectBottomSheetMobileProps<
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
> = {
	isOpen: boolean;
	isDirty?: boolean;
	onBottomSheetClose: () => void;
	bottomSheetTitle?: string;
	bottomSheetCloseButton?: boolean;
	renderItem?: (item: TValue | undefined, parentWidth: number) => React.ReactNode;
	onOptionSelected: (option: TValue, checked: boolean) => void;
	onSelectAll?: (isAllSelected: boolean) => void;
	onApplyClick: () => void;
	onClear: () => void;
	checkedOptions?: TValue[TKey][];
	isAllSelected: boolean;
	withModal?: boolean;
} & MultiSelectDropdownMobileProps<TValue, TKey, TForm, TGroupKey>;

const MultiSelectDropdownBottomSheet = <
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
>({
	isOpen,
	options,
	isSearchable,
	onBottomSheetClose,
	renderItem,
	onOptionSelected,
	onSelectAll,
	onApplyClick,
	onClear,
	labelKey,
	valueKey,
	bottomSheetTitle,
	bottomSheetCloseButton,
	checkedOptions,
	selectAllText,
	isAllSelected,
	directChange,
	isDirty,
	getIsItemDisabled,
	groupKey,
	enableSelectAll,
	cancelButtonText,
	applyButtonText,
	withModal,
}: MultiSelectBottomSheetMobileProps<TValue, TKey, TForm, TGroupKey>) => {
	const { tw, locale } = useMobileUIConfigOptions();
	const bottomSheetStyles = styles.bottomSheet();
	const [searchQuery, setSearchQuery] = useState('');
	const [filteredOptions, setFilteredOptions] = useState(options);
	const [isRNModalOpen, setIsRNModalOpen] = useState(isOpen);

	useEffect(() => {
		setFilteredOptions(
			options?.filter((option) => {
				const label = typeof option === 'string' ? option : option[labelKey as keyof TValue];

				return label?.toString().toLowerCase().includes(searchQuery.toLowerCase());
			})
		);
	}, [searchQuery, options, labelKey]);

	useEffect(() => {
		if (isOpen && withModal) {
			setIsRNModalOpen(true);
		}
	}, [isOpen, withModal]);

	const onDismiss = () => {
		setIsRNModalOpen(false);
		onBottomSheetClose();
	};

	const groupedOptions = groupKey
		? filteredOptions?.reduce((acc, item) => {
				const group = String(item[groupKey as keyof TValue] ?? 'Ungrouped');

				const existingSection = acc.find((section) => section.title === group);

				if (existingSection) {
					existingSection.data.push(item);
				} else {
					acc.push({ title: group, data: [item] });
				}

				return acc;
		  }, [] as { title: string; data: TValue[] }[])
		: [];

	const bottomSheetContent = (
		<BottomSheet
			title={bottomSheetTitle}
			hideCloseButton={!bottomSheetCloseButton}
			enableDynamicSizing
			maxDynamicContentSize={height * 0.8}
			onClose={onDismiss}
			isOpen={isOpen}
			header={
				<SearchInput
					isSearchable={isSearchable}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					onClear={onClear}
					locale={locale}
					tw={tw}
					bottomSheetStyles={bottomSheetStyles}
				/>
			}
			footer={
				<FooterContent
					directChange={directChange}
					onApplyClick={onApplyClick}
					cancelButtonText={cancelButtonText}
					applyButtonText={applyButtonText}
					isDirty={isDirty}
					tw={tw}
					closeBottomSheet={onBottomSheetClose}
				/>
			}
		>
			<View style={tw`flex-1`}>
				<OptionsList
					groupKey={groupKey}
					groupedOptions={groupedOptions}
					filteredOptions={filteredOptions}
					isAllSelected={isAllSelected}
					onSelectAll={onSelectAll}
					selectAllText={selectAllText}
					enableSelectAll={enableSelectAll}
					searchQuery={searchQuery}
					onOptionSelected={onOptionSelected}
					renderItem={renderItem}
					labelKey={labelKey}
					valueKey={valueKey}
					checkedOptions={checkedOptions}
					getIsItemDisabled={getIsItemDisabled}
					tw={tw}
					bottomSheetStyles={{
						flatListContainer: bottomSheetStyles.flatListContainer,
					}}
					locale={locale}
				/>
			</View>
		</BottomSheet>
	);

	if (!withModal) {
		return bottomSheetContent;
	}

	// We need to wrap BottomSheetModalProvider with GestureHandlerRootView in order
	// to fix gesture handling on Android (handle & outside tap).
	// https://github.com/gorhom/react-native-bottom-sheet/issues/1334
	// React Native Modal wrapper is also required to pass context correctly for some specific cases.
	return (
		<Modal visible={isRNModalOpen} transparent={true}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<BottomSheetModalProvider>{bottomSheetContent}</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</Modal>
	);
};

export default MultiSelectDropdownBottomSheet;
