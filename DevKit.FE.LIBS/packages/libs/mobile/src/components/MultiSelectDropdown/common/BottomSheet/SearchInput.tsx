import { View } from 'react-native';
import { TailwindFn } from 'twrnc';
import { TextField } from '../../../TextField';
import { DefaultSearchPlaceHolder } from '../MultiSelectDropdownBottomSheet';

export const SearchInput = ({
	isSearchable,
	searchQuery,
	setSearchQuery,
	onClear,
	locale,
	tw,
	bottomSheetStyles,
}: {
	isSearchable?: boolean;
	searchQuery: string;
	setSearchQuery: (value: string) => void;
	onClear: () => void;
	locale: keyof typeof DefaultSearchPlaceHolder;
	tw: TailwindFn;
	bottomSheetStyles: {
		searchableTextField: string;
	};
}) => {
	if (!isSearchable) return null;

	return (
		<View style={tw`${bottomSheetStyles.searchableTextField}`}>
			<TextField
				placeholder={DefaultSearchPlaceHolder[locale] || DefaultSearchPlaceHolder.en}
				onClearValue={onClear}
				isClearable={true}
				value={searchQuery}
				onChange={(val: string | undefined) => setSearchQuery(val ?? '')}
			/>
		</View>
	);
};
