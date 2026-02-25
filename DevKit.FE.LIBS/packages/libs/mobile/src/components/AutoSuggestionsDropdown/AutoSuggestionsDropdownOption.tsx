import { Pressable, Text } from 'react-native';
import { useMobileUIConfigOptions } from '../../layouts';
import { PrimitiveTypeKeys } from './AutoSuggestionsDropdown';
import { useAutoSuggestionsDropdownOptions } from './AutoSuggestionsDropdownContext';

interface IAutoSuggestionsDropdownOptionProps<TValue, TKey extends PrimitiveTypeKeys<TValue>> {
	onSelect: (item: TValue) => void;
	item: TValue;
	selectedValue?: TValue[TKey];
	inputValue: string;
}

export const AutoSuggestionsDropdownOption = <TValue extends object, TKey extends PrimitiveTypeKeys<TValue>>({
	onSelect,
	item,
	selectedValue,
	inputValue,
}: IAutoSuggestionsDropdownOptionProps<TValue, TKey>) => {
	const { labelKey, valueKey, renderItem } = useAutoSuggestionsDropdownOptions<TValue>();
	const { tw } = useMobileUIConfigOptions();

	const content = renderItem ? (
		renderItem(inputValue, item)
	) : (
		<Text style={tw`text-paragraph ${selectedValue === item[valueKey] ? 'text-white' : ''}`}>
			{item[labelKey ?? valueKey] as string}
		</Text>
	);

	return (
		<Pressable
			onPress={() => {
				onSelect(item);
			}}
			style={tw` px-5 py-2.5 ${selectedValue === item[valueKey] ? 'nj-bg-brand' : ''}`}
		>
			{content}
		</Pressable>
	);
};
