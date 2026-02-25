import { FlatList, Text, View } from 'react-native';
import { TailwindFn } from 'twrnc';
import { BottomSheetSectionList } from '@gorhom/bottom-sheet';
import { PrimitiveKeys, StringAndNumberKeys } from '@devkit/utilities';
import { DefaultNoOptionAvailableText } from '../MultiSelectDropdownBottomSheet';
import MultiSelectDropdownItem from './MultiSelectDropdownItem';
import SelectAllDropdownItem from './SelectAllDropdownItem';

export const OptionsList = <
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
>({
	groupKey,
	groupedOptions,
	filteredOptions,
	isAllSelected,
	onSelectAll,
	selectAllText,
	enableSelectAll,
	searchQuery,
	onOptionSelected,
	renderItem,
	labelKey,
	valueKey,
	checkedOptions,
	getIsItemDisabled,
	tw,
	bottomSheetStyles,
	locale,
}: {
	groupKey?: TGroupKey;
	groupedOptions?:
		| {
				title: string;
				data: TValue[];
		  }[];
	filteredOptions?: TValue[];
	isAllSelected: boolean;
	onSelectAll?: (isAllSelected: boolean) => void;
	selectAllText?: string;
	enableSelectAll?: boolean;
	searchQuery: string;
	onOptionSelected: (option: TValue, checked: boolean) => void;
	renderItem?: (item: TValue | undefined, parentWidth: number) => React.ReactNode;
	labelKey?: StringAndNumberKeys<TValue>;
	valueKey: TKey;
	checkedOptions?: TValue[TKey][];
	getIsItemDisabled?: (option: TValue) => boolean | undefined;
	tw: TailwindFn;
	bottomSheetStyles: {
		flatListContainer: string;
	};
	locale: keyof typeof DefaultNoOptionAvailableText;
}) => {
	const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
		<View style={tw`px-4 py-2 bg-gray-100`}>
			<Text style={tw`text-body text-gray-900 font-main-bold`}>{title}</Text>
		</View>
	);

	if (groupKey && groupedOptions && groupedOptions.length > 0) {
		return (
			<BottomSheetSectionList
				contentContainerStyle={tw`${bottomSheetStyles.flatListContainer}`}
				sections={groupedOptions}
				keyExtractor={(item: TValue) => String(item[valueKey])}
				ListHeaderComponent={
					<SelectAllDropdownItem
						isAllSelected={isAllSelected}
						onSelectAll={onSelectAll}
						selectAllText={selectAllText}
						enableSelectAll={enableSelectAll}
						searchText={searchQuery}
					/>
				}
				ListEmptyComponent={
					<View style={tw`px-4 py-2`}>
						<Text style={tw`font-main-regular text-body text-gray-500`}>
							{DefaultNoOptionAvailableText[locale] || DefaultNoOptionAvailableText.en}
						</Text>
					</View>
				}
				renderItem={({ item, index, section }) => (
					<MultiSelectDropdownItem
						item={item}
						onOptionSelected={onOptionSelected}
						renderItem={renderItem}
						labelKey={labelKey}
						valueKey={valueKey}
						checked={checkedOptions?.includes(item[valueKey])}
						disabled={getIsItemDisabled?.(item)}
						isLastItem={index === section.data.length - 1}
					/>
				)}
				renderSectionHeader={renderSectionHeader}
				showsVerticalScrollIndicator={true}
				bounces={false}
			/>
		);
	}

	return (
		<FlatList
			contentContainerStyle={tw`${bottomSheetStyles.flatListContainer}`}
			data={filteredOptions}
			keyExtractor={(item: TValue) => String(item[valueKey])}
			ListHeaderComponent={
				<SelectAllDropdownItem
					isAllSelected={isAllSelected}
					onSelectAll={onSelectAll}
					selectAllText={selectAllText}
					enableSelectAll={enableSelectAll}
					searchText={searchQuery}
				/>
			}
			ListEmptyComponent={
				<View style={tw`px-4 py-2`}>
					<Text style={tw`font-main-regular text-body text-gray-500`}>
						{DefaultNoOptionAvailableText[locale] || DefaultNoOptionAvailableText.en}
					</Text>
				</View>
			}
			renderItem={({ item }) => (
				<MultiSelectDropdownItem
					item={item}
					onOptionSelected={onOptionSelected}
					renderItem={renderItem}
					labelKey={labelKey}
					valueKey={valueKey}
					checked={checkedOptions?.includes(item[valueKey])}
					disabled={getIsItemDisabled?.(item)}
					isLastItem={item === filteredOptions?.[filteredOptions.length - 1]}
				/>
			)}
			showsVerticalScrollIndicator={true}
			bounces={false}
		/>
	);
};
