import { useWebUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
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
	const { isRtlLocale } = useWebUIConfigOptions();
	const message = isRtlLocale ? 'لم يتم العثور علي نتائج' : 'No results found';

	return (
		<div>
			{options.map((item) => (
				<div key={`${item[labelKey ?? valueKey]}`}>
					<AutoSuggestionsDropdownOption
						inputValue={inputValue}
						item={item}
						onSelect={onSelect}
						selectedValue={selectedValue}
					/>
				</div>
			))}
			{inputValue?.length > minChars && options.length === 0 && (
				<div className="px-5 py-2.5 text-body md:text-paragraph text-gray-400">{message}</div>
			)}
		</div>
	);
};
