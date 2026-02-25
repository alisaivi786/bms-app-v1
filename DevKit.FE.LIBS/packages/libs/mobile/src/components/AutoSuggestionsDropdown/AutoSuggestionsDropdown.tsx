import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { SearchIcon } from '@devkit/icons/native';
import { ComponentSize } from '@devkit/utilities';
//import { devkitSimpleBar } from '../../common/devkitSimpleBar';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { InternalTextField, TextFieldRef } from '../TextField/TextField';
import { AutoSuggestDropdown } from './AutoSuggestDropdown';
import { AutoSuggestionsDropdownProvider } from './AutoSuggestionsDropdownContext';
import { DropdownMenuPortal } from './AutoSuggestionsDropdownMenuPortal';

type Primitives = string | number | undefined;

export type PrimitiveTypeKeys<T> = {
	[K in keyof T]-?: T[K] extends Primitives ? K : never;
}[keyof T];

export interface IAutoSuggestionsDropdownProps<TValue, TKey extends keyof TValue> {
	/**The short hint displayed in the dropdown before the user enters a value. */
	placeholder?: string;
	/** If true, the component will be disabled. */
	disabled?: boolean;
	/** React element to be rendered for each item within the list*/
	renderItem?: (searchText: string, item?: TValue) => React.ReactNode;

	/** The dropdown item text */
	valueKey: keyof Pick<TValue, TKey>;
	/** The dropdown item key to be filtered with */
	labelKey?: PrimitiveTypeKeys<TValue>;
	/** `Callback` function for apply search functionality  */
	onSearch: (searchText: string) => TValue[] | Promise<TValue[]>;
	/** The text for the selected item */
	value?: TValue;
	/** `Callback` function to handle  dropdown selection */
	onValueChange?: (val?: TValue[TKey]) => void;
	/** The debounce time before calling the onSearch function, the interval is in milliseconds */
	debounceTimeInMilliseconds?: number;
	/** The minimum value counts for char to start the search */
	minChars?: number;
	onFocus?: () => void;
	size: ComponentSize;
}

export const AutoSuggestionsDropdown = <TValue extends object, TKey extends PrimitiveTypeKeys<TValue>>({
	valueKey,
	labelKey,
	value = undefined,
	renderItem,
	placeholder = 'Select...',
	onValueChange = undefined,
	disabled = false,
	onSearch,
	debounceTimeInMilliseconds = 0,
	minChars = 2,
	onFocus,
	size,
}: IAutoSuggestionsDropdownProps<TValue, TKey>) => {
	const [inputValue, setInputValue] = useState(`${value?.[labelKey ?? valueKey] ?? ''}`);
	const [options, setOptions] = useState<TValue[]>([]);
	const [dimensions, setDimensions] = useState<{
		x?: number;
		y?: number;
		width?: number;
	}>({});
	const [isFocus, setIsFocus] = useState(false);
	const selectRef = useRef<View>(null);
	const [loading, setLoading] = useState(false);
	const inputRef = useRef<TextFieldRef>(null);
	const { isRtlLocale, tw } = useMobileUIConfigOptions();
	const loadingMassage = isRtlLocale ? 'جاري البحث ...' : 'Searching ...';

	const loadOptions = async (inputValue: string) => {
		setLoading(true);
		const res = await onSearch(inputValue);

		setOptions(res);

		setLoading(false);
	};

	useEffect(() => {
		const stringValue = `${value?.[labelKey ?? valueKey] ?? ''}`;

		if (!!value && inputValue !== stringValue && !isFocus) {
			setInputValue(stringValue);
		}
	}, [value, isFocus, labelKey, valueKey, inputValue]);

	const updateDimensions = useCallback(() => {
		if (selectRef?.current) {
			selectRef.current?.measure((x, y, width, height, pageX, pageY) => {
				if (dimensions?.x === pageX && dimensions?.y === pageY + height) return;
				setDimensions({
					x: pageX,
					y: pageY + height,
					width,
				});
			});
		}
	}, [dimensions?.x, dimensions?.y]);

	useLayoutEffect(updateDimensions, [updateDimensions, isFocus]);

	const onClear = () => {
		setInputValue('');
		setOptions([]);
		onSelect(undefined);
	};

	const onSelect = (item?: TValue) => {
		setIsFocus(false);

		if (!onValueChange) return;

		const val = item as TValue | undefined;

		inputRef.current?.blur();
		onValueChange(val ? val[valueKey] : undefined);
		setInputValue(`${item?.[labelKey ?? valueKey] ?? ''}`);
	};

	const onDismiss = () => {
		setIsFocus(false);
		inputRef.current?.blur();
	};

	const selectedValue = options.find((option) => option[valueKey] === value)?.[labelKey ?? valueKey];

	return (
		<AutoSuggestionsDropdownProvider<TValue, TKey>
			valueKey={valueKey}
			debounceTimeInMilliseconds={debounceTimeInMilliseconds}
			disabled={disabled}
			labelKey={labelKey}
			onSearch={onSearch}
			onValueChange={onValueChange}
			placeholder={placeholder}
			renderItem={renderItem}
			minChars={minChars}
			loadingMassage={loadingMassage}
			value={value}
			isFocused={isFocus}
			x={dimensions?.x ?? 0}
			y={dimensions?.y ?? 0}
			width={dimensions?.width ?? 0}
		>
			<View style={tw`relative w-full flex-col`} ref={selectRef} onLayout={updateDimensions}>
				<InternalTextField
					ref={inputRef}
					startIcon={SearchIcon}
					isClearable={true}
					debounceTimeInMilliseconds={700}
					onChange={(newValue) => {
						setIsFocus(true);

						if (newValue) {
							setInputValue(newValue ?? '');

							if (newValue && newValue?.length > minChars) loadOptions(newValue);
						} else {
							onClear();
						}
					}}
					value={inputValue}
					disabled={disabled}
					placeholder={placeholder}
					onBlur={() => setIsFocus(false)}
					onFocus={() => onFocus?.()}
					size={size}
				/>
				<DropdownMenuPortal onDismiss={onDismiss} hide={!(inputValue.length > minChars) || !isFocus}>
					{!loading ? (
						<AutoSuggestDropdown
							inputValue={inputValue}
							isFocus={isFocus}
							options={options}
							onSelect={onSelect}
							selectedValue={selectedValue}
							minChars={minChars}
						/>
					) : (
						<View style={tw`p-4`}>
							<Text>{loadingMassage}</Text>
						</View>
					)}
				</DropdownMenuPortal>
			</View>
		</AutoSuggestionsDropdownProvider>
	);
};
