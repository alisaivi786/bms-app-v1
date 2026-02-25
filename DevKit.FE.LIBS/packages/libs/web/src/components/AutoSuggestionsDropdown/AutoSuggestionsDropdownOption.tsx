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

	return (
		<div
			onClick={() => {
				onSelect(item);
			}}
			className={` px-5 py-2.5 cursor-pointer  text-body md:text-paragraph  ${
				selectedValue === item[valueKey] && 'nj-bg-brand text-white'
			} ${selectedValue !== item[valueKey] && 'hover:bg-brand-50'}`}
		>
			{renderItem ? renderItem(inputValue, item) : <>{item[labelKey ?? valueKey]}</>}
		</div>
	);
};
