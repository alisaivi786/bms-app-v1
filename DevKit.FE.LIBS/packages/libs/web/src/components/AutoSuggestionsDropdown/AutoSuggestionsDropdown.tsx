import { useEffect, useRef, useState } from 'react';
import {
	autoUpdate,
	flip,
	limitShift,
	offset,
	safePolygon,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useHover,
	useInteractions,
	useTransitionStyles,
} from '@floating-ui/react';
import { hide, size } from '@floating-ui/react-dom';
import { SearchIcon } from '@devkit/icons/web';
import { DevkitSimpleBar } from '../../common/devkitSimpleBar';
import { useWebUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
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
}: IAutoSuggestionsDropdownProps<TValue, TKey>) => {
	const [inputValue, setInputValue] = useState(`${value?.[labelKey ?? valueKey] ?? ''}`);
	const [options, setOptions] = useState<TValue[]>([]);
	const [isFocus, setIsFocus] = useState(false);
	const selectRef = useRef<null | HTMLDivElement>(null);
	const [loading, setLoading] = useState(false);
	const inputRef = useRef<TextFieldRef>(null);
	const { isRtlLocale } = useWebUIConfigOptions();
	const loadingMassage = isRtlLocale ? 'جاري البحث ...' : 'Searching ...';

	const loadOptions = async (inputValue: string) => {
		setLoading(true);
		const res = await onSearch(inputValue);

		setOptions(res);

		setLoading(false);
	};

	useEffect(() => {
		const stringValue = `${value?.[labelKey ?? valueKey] ?? ''}`;

		if (inputValue !== stringValue || !isFocus) {
			setInputValue(stringValue);
		}
	}, [value, isFocus]);

	const onClear = () => {
		setInputValue('');
		setOptions([]);
		onSelect(undefined);
	};

	const onSelect = (item?: TValue) => {
		if (!onValueChange) return;

		const val = item as TValue | undefined;

		onValueChange(val ? val[valueKey] : undefined);
		setInputValue(`${item?.[labelKey ?? valueKey] ?? ''}`);

		if (val) {
			inputRef.current?.blur();
		}
	};

	const selectedValue = options.find((option) => option[valueKey] === value)?.[labelKey ?? valueKey];

	const { x, y, refs, strategy, context, middlewareData } = useFloating({
		open: isFocus,
		placement: 'bottom-start',

		middleware: [
			offset(),
			flip({
				padding: 20,
			}),
			shift({
				limiter: limitShift(),
			}),
			size({
				apply({ rects, elements }) {
					Object.assign(elements.floating.style, {
						width: `${rects.reference.width}px`,
					});
				},
			}),
			hide(),
		],
		whileElementsMounted: autoUpdate,
	});

	const isElementOutOfScope = middlewareData.hide?.referenceHidden || false;

	const { isMounted, styles: floatingStyles } = useTransitionStyles(context);

	const dismiss = useDismiss(context);

	const click = useClick(context, {
		event: 'mousedown',
	});
	const hover = useHover(context, {
		handleClose: safePolygon(),
	});
	const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, hover]);

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
			x={x}
			y={y}
			isFocused={isFocus}
			getFloatingProps={getFloatingProps}
			getReferenceProps={() => {
				// removed onKeyDown from the reference props in order to make the space key work while searching
				return {
					...getReferenceProps(),
					onKeyDown: undefined,
				};
			}}
			isElementOutOfScope={isElementOutOfScope}
			isMounted={isMounted}
			refs={refs}
			strategy={strategy}
			styles={floatingStyles}
		>
			<div className="relative flex flex-col" ref={selectRef}>
				<InternalTextField
					ref={inputRef}
					startIcon={SearchIcon}
					isClearable={true}
					debounceTimeInMilliseconds={300}
					onChange={(value) => {
						if (value) {
							setInputValue(value ?? '');

							if (value && value?.length > minChars) loadOptions(value);
						} else {
							onClear();
						}
					}}
					value={inputValue}
					disabled={disabled}
					placeholder={placeholder}
					onFocus={() => setIsFocus(true)}
					onBlur={() => setIsFocus(false)}
					floatingDivRef={refs.setReference}
					getFloatingReferenceProps={() => {
						// removed onKeyDown from the reference props in order to make the space key work while searching
						return {
							...getReferenceProps(),
							onKeyDown: undefined,
						};
					}}
				/>
				<DropdownMenuPortal hide={!(inputValue.length > minChars)}>
					<DevkitSimpleBar>
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
							<div className="p-4">{loadingMassage}</div>
						)}
					</DevkitSimpleBar>
				</DropdownMenuPortal>
			</div>
		</AutoSuggestionsDropdownProvider>
	);
};
