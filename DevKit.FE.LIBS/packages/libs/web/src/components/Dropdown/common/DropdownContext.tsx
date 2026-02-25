import groupBy from 'lodash/groupBy';
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
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
import { FieldValues, PrimitiveKeys, StringAndNumberKeys } from '@devkit/utilities';
import { useResponsiveView } from '../../../hooks/useResponsiveView';
import { useWebUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import styles from '../Dropdown.styles';
import { DropdownContextProps, DropdownContextValue, DropdownTypes } from './types';

const DefaultSearchPlaceHolder = {
	en: 'Search for an option...',
	ar: 'البحث	',
};

const DefaultNoOptionAvailableText = {
	en: 'No options',
	ar: 'لا يوجد خيارات',
};

const dropdownContext = createContext<DropdownContextValue<'single', Record<string, string>, '', never, undefined>>({
	options: [],
	dropDownType: 'single',
	valueKey: '',
	isFocused: false,
	inputRef: undefined,
	disabled: false,
	x: undefined,
	y: undefined,
	refs: {},
	strategy: 'absolute',
	isElementOutOfScope: false,
	isMounted: false,
	styles: {},
	getReferenceProps: () => ({}),
	getFloatingProps: () => ({}),
	searchText: undefined,
	setSearchText: () => undefined,
	size: 'small',
	onOptionSelected: () => undefined,
	groupedFilteredOptions: { type: 'options', data: [] },
	onClear: () => undefined,
	noOptionAvailableText: '',
	isBottomSheet: false,
	optionFocusIndex: -1,
	hasErrors: false,
	formId: '',
	applyFloatingMinWidth: false,
	hideValueLabel: false,
	onLoadMore: () => undefined,
	isLoadingMoreOptions: false,
	testId: '',
});

const DropdownContextProvider = dropdownContext.Provider as unknown as <
	TDropdownType extends DropdownTypes,
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
>(
	...args: Parameters<React.Provider<DropdownContextValue<TDropdownType, TValue, TKey, TForm, TGroupKey>>>
) => ReturnType<React.Provider<DropdownContextValue<TDropdownType, TValue, TKey, TForm, TGroupKey>>>;

export const DropdownProvider = <
	TDropdownType extends DropdownTypes,
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
>({
	isClearable = true,
	size: ComponentSize = 'medium',
	options = [],
	disabled = false,
	hasErrors = false,
	formId,
	hideValueLabel = false,
	initialOptionCount = 0,
	...props
}: PropsWithChildren<DropdownContextProps<TDropdownType, TValue, TKey, TForm, TGroupKey>>) => {
	const { children, onSearch, labelKey, groupKey, inputRef } = props;
	const { sm: isMobile } = useResponsiveView();
	const containerRef = useRef<HTMLDivElement>(null);

	const [isFocused, setIsFocused] = useState(false);
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const [searchText, setSearchText] = useState<string | undefined>(undefined);
	const { locale } = useWebUIConfigOptions();
	const keepFocus = isFocused && isMobile;
	const [sliceCount, setSliceCount] = useState(initialOptionCount);
	const [isLoadingMoreOptions, setIsLoadingMoreOptions] = useState(false);

	useEffect(() => {
		const onFocus = () => {
			setSearchText(undefined);
			setFocusedIndex(-1);
			setIsFocused(true);
			props.onFocus?.();
		};
		const onBlur = () => {
			if (keepFocus) {
				setIsFocused(false);
				setSearchText(undefined);
				setFocusedIndex(-1);
				props.onBlur?.();
			}
		};

		if (inputRef?.current) {
			inputRef.current.addEventListener('focus', onFocus);
			inputRef.current.addEventListener('blur', onBlur);
		}

		return () => {
			if (inputRef?.current) {
				inputRef.current.removeEventListener('focus', onFocus);
				inputRef.current.removeEventListener('blur', onBlur);
			}
		};
	}, [inputRef?.current]);

	const filterOption = (option: TValue) => {
		if (onSearch) {
			return onSearch?.(searchText ?? '', option);
		} else if (labelKey) {
			return (option[labelKey] as unknown)
				?.toString()
				.toLowerCase()
				.includes((searchText ?? '').toLowerCase());
		}

		return !!option;
	};

	const groupedFilteredOptions = useMemo(() => {
		const filteredOptions =
			sliceCount > 0
				? options.filter((option) => filterOption(option))?.slice(0, sliceCount)
				: options.filter((option) => filterOption(option));

		if (groupKey) {
			return {
				type: 'grouped' as const,
				data: Object.entries(groupBy(filteredOptions, groupKey)).map(([group, options]) => {
					return { label: group, options: options };
				}),
			};
		} else return { type: 'options' as const, data: filteredOptions };
	}, [sliceCount, options, searchText]);

	const onLoadMore = () => {
		if (sliceCount === 0 || sliceCount >= options.length) return;

		setIsLoadingMoreOptions(true);
		setTimeout(() => {
			setSliceCount((prev) => prev + initialOptionCount);
			setIsLoadingMoreOptions(false);
		}, 500);
	};

	useEffect(() => {
		const handleKeyDown = (event: Event) => {
			if (options.length === 0) return;
			const keyEvent = event as KeyboardEvent;

			if (keyEvent.key === 'ArrowDown') {
				keyEvent.preventDefault(); // Prevent page scrolling
				setFocusedIndex((prevIndex) => (prevIndex + 1) % options.length);
			} else if (keyEvent.key === 'ArrowUp') {
				keyEvent.preventDefault(); // Prevent page scrolling
				setFocusedIndex((prevIndex) => (prevIndex - 1 + options.length) % options.length);
			} else if (keyEvent.key === 'Enter') {
				keyEvent.preventDefault(); // Prevent form submission
				const selectedOption = groupedFilteredOptions.data[focusedIndex] as TValue;

				if (selectedOption) {
					props.onOptionSelected(selectedOption, true);
				}
			}
		};

		if (containerRef?.current && isFocused) {
			containerRef.current.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			if (containerRef?.current) {
				containerRef.current.removeEventListener('keydown', handleKeyDown);
			}
		};
	}, [containerRef?.current, isFocused, focusedIndex]);

	useEffect(() => {
		// to close the dropdown if changed from mobile bottom sheet to floating view
		if (!isMobile && isFocused) {
			setIsFocused(false);
		}
	}, [isMobile]);

	const { x, y, refs, strategy, context, middlewareData } = useFloating({
		open: isFocused,
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
					Object.assign(
						elements.floating.style,
						props.applyFloatingMinWidth
							? {
									minWidth: `${rects.reference.width}px`,
							  }
							: {
									width: `${rects.reference.width}px`,
							  }
					);
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
		<DropdownContextProvider<TDropdownType, TValue, TKey, TForm, TGroupKey>
			value={{
				x,
				y,
				refs,
				strategy,
				isElementOutOfScope,
				isMounted,
				styles: floatingStyles,
				getReferenceProps: () => {
					// removed onKeyDown from the reference props in order to make the space key work while searching
					return {
						...getReferenceProps(),
						onKeyDown: undefined,
					};
				},
				getFloatingProps,
				isFocused,
				searchText,
				setSearchText: (value: string | undefined) => {
					setFocusedIndex(-1);
					setSearchText(value);
				},
				size: ComponentSize,
				searchPlaceHolder: props.searchPlaceHolder ?? DefaultSearchPlaceHolder[locale],
				groupedFilteredOptions: groupedFilteredOptions,
				noOptionAvailableText: DefaultNoOptionAvailableText[locale],
				isBottomSheet: isMobile,
				isClearable,
				hideValueLabel,
				...props,
				disabled,
				hasErrors,
				formId,
				onBlur: () => {
					setIsFocused(false);
					setSearchText('');
					setFocusedIndex(-1);
					props.onBlur?.();

					if (!isMobile) {
						setTimeout(() => {
							inputRef?.current?.blur();
						});
					}
				},
				optionFocusIndex: focusedIndex,
				options,
				onLoadMore,
				isLoadingMoreOptions,
			}}
		>
			<div className={styles.mainContainer} ref={containerRef}>
				{children}
			</div>
		</DropdownContextProvider>
	);
};

const useDropdownContextOptions = <
	TDropdownType extends DropdownTypes,
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
>() => {
	const context = useContext(dropdownContext);

	return context as unknown as DropdownContextValue<TDropdownType, TValue, TKey, TForm, TGroupKey>;
};

export const useCommonDropdownContextOptions = <
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
>() => {
	return useDropdownContextOptions<'single' | 'multiple', TValue, TKey, TForm, TGroupKey>();
};

export const useSingleDropdownContextOptions = <
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
>() => {
	return useDropdownContextOptions<'single', TValue, TKey, TForm, TGroupKey>();
};

export const useMultiSelectDropdownContextOptions = <
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
>() => {
	return useDropdownContextOptions<'multiple', TValue, TKey, TForm, TGroupKey>();
};
