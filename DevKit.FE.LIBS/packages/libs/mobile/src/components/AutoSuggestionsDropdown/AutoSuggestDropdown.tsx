import { ScrollView, Text, View } from 'react-native';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { PrimitiveTypeKeys } from './AutoSuggestionsDropdown';
import { useAutoSuggestionsDropdownOptions } from './AutoSuggestionsDropdownContext';
import { AutoSuggestionsDropdownOption } from './AutoSuggestionsDropdownOption';

type AutoSuggestDropdownProps<TValue, TKey extends keyof TValue> = {
	inputValue: string;
	isFocus: boolean;
	options: TValue[];
	selectedValue?: TValue[TKey];
	onSelect: (item?: TValue) => void;
	minChars: number;
};

export const AutoSuggestDropdown = <TValue extends object, TKey extends PrimitiveTypeKeys<TValue>>({
	inputValue,
	options,
	onSelect,
	selectedValue,
	minChars,
}: AutoSuggestDropdownProps<TValue, TKey>) => {
	const { labelKey, valueKey } = useAutoSuggestionsDropdownOptions<TValue>();
	const { isRtlLocale, tw } = useMobileUIConfigOptions();
	const message = isRtlLocale ? 'لم يتم العثور علي نتائج' : 'No results found';

	return (
		<ScrollView contentContainerStyle={tw`py-1`}>
			{options.map((item) => (
				<View key={`${item[labelKey ?? valueKey]}`}>
					<AutoSuggestionsDropdownOption
						inputValue={inputValue}
						item={item}
						onSelect={onSelect}
						selectedValue={selectedValue}
					/>
				</View>
			))}
			{inputValue?.length > minChars && options.length === 0 && (
				<View style={tw`px-5 py-2.5`}>
					<Text style={tw`text-paragraph text-gray-400`}>{message}</Text>
				</View>
			)}
		</ScrollView>
	);
};
