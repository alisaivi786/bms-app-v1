import { useRef } from 'react';
import { ArrowDownIcon } from '@devkit/icons/web';
import { FieldValues, PrimitiveKeys, StringAndNumberKeys } from '@devkit/utilities';
import { useWebUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import { FormInputGroup } from '../../FormInputGroup/FormInputGroup';
import { InternalTextField } from '../../TextField/TextField';
import styles from '../Dropdown.styles';
import { useCommonDropdownContextOptions } from './DropdownContext';

export const DropdownInputComponent = <
	TValue extends object,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
>() => {
	const contextValues = useCommonDropdownContextOptions<TValue, TKey, TForm, TGroupKey>();
	const { isRtlLocale } = useWebUIConfigOptions();

	const {
		label,
		isRequired,
		popover,
		popoverVariant,
		valueKey,
		disabled,
		onBlur,
		value,
		isFocused,
		refs,
		getReferenceProps,
		inputRef,
		labelKey,
		size,
		placeholder,
		isClearable,
		hasErrors,
		isSearchable,
		options,
		onClear,
		onFocus,
		searchText,
		setSearchText,
		errors,
		isBottomSheet,
		description,
		layoutClassName,
		reserveLabelSpacing,
		formId,
		highlighted,
		hideValueLabel,
		directionForInput,
		placeholderDir,
		testId,
		status,
		showCount,
	} = contextValues;

	const labelRef = useRef<HTMLDivElement>(null);

	// For display purposes, compute isAllSelected here from the applied value, not pending state
	const innerIsAllSelected =
		Array.isArray(value) && value.length > 0 && options?.length > 0 && value.length === options.length;

	const appliedOptionLabels = (() => {
		if (hideValueLabel) return false;

		if (showCount && Array.isArray(value) && value.length > 0) {
			if (innerIsAllSelected) return 'All Selected';

			return `${value.length} Selected`;
		}

		const selectedOptions = options?.filter((option) =>
			Array.isArray(value) ? value.includes(option[valueKey]) : option[valueKey] === value
		);

		return selectedOptions?.map((option) => option[labelKey ?? (valueKey as keyof typeof option)]).join(',');
	})();

	const isClearableVisible = isClearable && appliedOptionLabels ? true : false;
	const inputDir = directionForInput ?? (isRtlLocale ? 'rtl' : 'ltr');
	const placeholderDirection = placeholderDir ?? (isRtlLocale ? 'rtl' : 'ltr');

	return (
		<FormInputGroup
			label={label}
			isRequired={isRequired}
			popover={popover}
			popoverVariant={popoverVariant}
			layoutClassName={layoutClassName}
			reserveLabelSpacing={reserveLabelSpacing}
			formId={formId}
			hasErrors={hasErrors}
			highlighted={highlighted}
		>
			<InternalTextField
				testId={testId}
				ref={inputRef}
				status={status}
				onFocus={() => {
					onFocus?.();
				}}
				onBlur={() => {
					if (!isBottomSheet) onBlur?.();
				}}
				description={description}
				placeholder={appliedOptionLabels ? '' : placeholder}
				value={isFocused && !isBottomSheet && searchText ? searchText : appliedOptionLabels ? undefined : ''}
				isClearable={isClearableVisible}
				type="text"
				disabled={disabled}
				size={size}
				hasErrors={hasErrors}
				onChange={(searchTextVal) => {
					setSearchText(searchTextVal ?? '');
				}}
				onClearValue={() => {
					onClear();
				}}
				readOnly={!isSearchable || isBottomSheet}
				endIcon={ArrowDownIcon}
				rotateEndIconOnFocus
				keepFocus={isBottomSheet && isFocused}
				alwaysShowClearIcon={
					isClearable && appliedOptionLabels && (isBottomSheet || (!isBottomSheet && !searchText)) ? true : false
				}
				onIconClick={() => {
					if (isFocused) {
						setTimeout(() => {
							inputRef?.current?.blur();
						});
					} else {
						inputRef?.current?.focus();
					}
				}}
				errors={errors}
				floatingDivRef={refs.setReference}
				getFloatingReferenceProps={getReferenceProps}
				directionForInput={inputDir}
				placeholderDir={placeholderDirection}
			>
				{(!isFocused || (searchText === undefined && !isBottomSheet) || isBottomSheet) && appliedOptionLabels && (
					<div
						className={styles.valueStyles(disabled, hasErrors, size)}
						style={{
							width: isClearableVisible ? 'calc(100% - 50px)' : 'calc(100% - 25px)',
							height: 'calc(100% - 2px)',
						}}
						onClick={() => {
							inputRef?.current?.focus();
						}}
						ref={labelRef}
						dir={inputDir}
					>
						<div className="truncate text-ellipsis">
							{contextValues.renderSelectedItem
								? contextValues.dropDownType === 'single'
									? contextValues.renderSelectedItem(options.find((option) => option[valueKey] == contextValues.value))
									: contextValues.renderSelectedItem(
											options.filter((option) => contextValues.value?.includes(option[valueKey]))
									  )
								: appliedOptionLabels}
						</div>
					</div>
				)}
			</InternalTextField>
		</FormInputGroup>
	);
};
