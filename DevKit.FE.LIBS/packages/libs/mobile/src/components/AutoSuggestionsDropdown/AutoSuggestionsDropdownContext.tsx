import { createContext, useContext } from 'react';

type AutoSuggestionsDropdownValue<TValue extends object, TKey extends keyof TValue> = {
	placeholder?: string;
	labelKey?: keyof TValue;
	disabled?: boolean;
	renderItem?: (searchText: string, item?: TValue) => React.ReactNode;
	valueKey: TKey;
	onSearch?: (searchText: string) => TValue[] | Promise<TValue[]>;
	value?: TValue;
	onValueChange?: (val?: TValue[TKey]) => void;
	debounceTimeInMilliseconds?: number;
	minChars?: number;
	loadingMassage?: string;
	isFocused: boolean;
	x: number;
	y: number;
	width: number;
};

interface IAutoSuggestionsDropdownProvider {
	children: JSX.Element;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const autoSuggestionsDropdownContext = createContext<AutoSuggestionsDropdownValue<any, any>>({
	valueKey: '',
	labelKey: undefined,
	value: undefined,
	renderItem: undefined,
	placeholder: undefined,
	onValueChange: undefined,
	disabled: false,
	onSearch: undefined,
	debounceTimeInMilliseconds: undefined,
	minChars: undefined,
	loadingMassage: undefined,
	isFocused: false,
	x: 0,
	y: 0,
	width: 0,
});

export const AutoSuggestionsDropdownProvider = <TValue extends object, TKey extends keyof TValue>({
	children,
	...contextValues
}: IAutoSuggestionsDropdownProvider & AutoSuggestionsDropdownValue<TValue, TKey>) => {
	return (
		<autoSuggestionsDropdownContext.Provider value={contextValues}>{children}</autoSuggestionsDropdownContext.Provider>
	);
};

export const useAutoSuggestionsDropdownOptions: <TValue extends object>() => AutoSuggestionsDropdownValue<
	TValue,
	keyof TValue
> = () => useContext(autoSuggestionsDropdownContext);
