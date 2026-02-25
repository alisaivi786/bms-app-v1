import { ElementRef, ForwardedRef, Ref, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ArrowDownIcon, ArrowUpIcon } from '@devkit/icons/native';
import {
	FieldValues,
	MultipleSelectDropdownProps,
	PrimitiveKeys,
	StringAndNumberKeys,
	useReactFormController,
} from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts';
import { FormInputGroup } from '../FormInputGroup';
import { InternalTextField } from '../TextField/TextField';
import styles from './Dropdown.styles';
import MultiSelectDropdownBottomSheet from './common/MultiSelectDropdownBottomSheet';

type MultiSelectDropdownRef = ElementRef<typeof Pressable> & {
	open?: () => void;
	close?: () => void;
	toggle?: () => void;
	press?: () => void;
};

export type MultiSelectDropdownMobileProps<
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
> = MultipleSelectDropdownProps<TValue, TKey, TForm, TGroupKey> & {
	snapPoints?: Array<string>;
	bottomSheetTitle?: string;
	bottomSheetCloseButton?: boolean;
	withModal?: boolean;
};

type MultiSelectDropdownBaseType = <
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined = undefined
>(
	props: MultiSelectDropdownMobileProps<TValue, TKey, TForm, TGroupKey> & { ref?: Ref<MultiSelectDropdownRef> }
) => JSX.Element;

export const MultiSelectDropdownBase = <
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
>(
	{
		options,
		placeholder,
		disabled = false,
		isSearchable = false,
		labelKey,
		valueKey,
		renderItem,
		renderSelectedItem,
		bottomSheetTitle,
		bottomSheetCloseButton = false,
		withModal,
		variant,
		label,
		isRequired,
		popover,
		popoverVariant,
		layoutClassName,
		reserveLabelSpacing,
		form,
		field,
		groupKey,
		value: propsValue,
		onChange: propsOnChange,
		selectAllText,
		directChange = false,
		onClearValue,
		getIsItemDisabled,
		cancelButtonText,
		applyButtonText,
		size,
	}: MultiSelectDropdownMobileProps<TValue, TKey, TForm, TGroupKey>,
	ref: ForwardedRef<MultiSelectDropdownRef>
) => {
	const [isOpen, setIsOpen] = useState(false);
	const [checkedOptions, setCheckedOptions] = useState<TValue[TKey][]>(propsValue || []);
	const { tw, isRtlLocale } = useMobileUIConfigOptions();
	const menuStyles = styles.menu();
	const Icon = isOpen ? ArrowUpIcon : ArrowDownIcon;

	const {
		onChange: formOnChange,
		value: formValue,
		hasErrors,
		formId,
		errors,
	} = useReactFormController({
		form,
		field,
		value: propsValue,
		onChange: propsOnChange,
	});

	const isReactForm = form && field;
	const value = isReactForm ? formValue : propsValue;
	const onChange = isReactForm ? formOnChange : propsOnChange;
	const isDirty = !directChange && JSON.stringify(checkedOptions) !== JSON.stringify(value || []);
	const inputRef = useRef<MultiSelectDropdownRef | null>(null);

	const isAllSelected = directChange ? value?.length === options?.length : checkedOptions?.length === options?.length;

	const open = () => setIsOpen(true);
	const close = () => setIsOpen(false);
	const toggle = () => setIsOpen((v) => !v);

	useImperativeHandle(
		ref,
		() =>
			({
				...(inputRef.current as MultiSelectDropdownRef),
				open,
				close,
				toggle,
				press: toggle,
			} as MultiSelectDropdownRef),
		[inputRef]
	);

	const appliedOptionLabels = options
		?.filter((option) => (value || []).includes(option[valueKey]))
		.map((option) => option[labelKey ?? (valueKey as keyof typeof option)])
		.join(', ');

	const onSelectAll = (val: boolean) => {
		const result: TValue[TKey][] = [];

		if (val) {
			options?.forEach((item) => {
				if (getIsItemDisabled) {
					if (!getIsItemDisabled(item)) {
						result.push(item[valueKey]);
					}
				} else {
					result.push(item[valueKey]);
				}
			});
		}

		if (directChange) {
			onChange?.(result);
		} else {
			setCheckedOptions(result);
		}
	};

	const onOptionSelected = (option: TValue, checked: boolean) => {
		let result: TValue[TKey][] = [];

		const currentValue = (directChange ? value : checkedOptions) ?? [];

		if (checked) {
			result = [...currentValue, option[valueKey]];
		} else {
			result = currentValue?.filter((item) => item !== option[valueKey]) ?? [];
		}

		if (directChange) {
			onChange?.(result);
		} else {
			setCheckedOptions(result);
		}
	};

	const onClear = () => {
		onChange?.([]);
		setCheckedOptions([]);
		onClearValue?.();
	};

	const renderMenuVariant = () => (
		<View style={tw`${menuStyles.container(isRtlLocale)}`}>
			{renderSelectedItem ? (
				renderSelectedItem(
					options?.filter((option) => (value || []).includes(option[valueKey])),
					isOpen,
					hasErrors
				)
			) : (
				<Text style={tw`${menuStyles.label}`}>{appliedOptionLabels || placeholder}</Text>
			)}
			<Icon height={8} width={16} style={tw`${menuStyles.icon}`} />
		</View>
	);

	const renderDefaultVariant = () =>
		renderSelectedItem ? (
			renderSelectedItem(
				options?.filter((option) => (value || []).includes(option[valueKey])),
				isOpen,
				hasErrors
			)
		) : (
			<Pressable
				onPress={() => {
					setIsOpen(!isOpen);

					if (!directChange) setCheckedOptions(value || []);
				}}
			>
				<InternalTextField
					placeholder={placeholder}
					ref={inputRef}
					value={appliedOptionLabels}
					endIcon={isOpen ? ArrowUpIcon : ArrowDownIcon}
					readOnly={false}
					hasErrors={hasErrors}
					disabled={disabled}
					onClearValue={onClear}
					size={size}
					keepFocus={isOpen}
					// isClearable={!!appliedOptionLabels}
					isClearable={false}
					showSoftInputOnFocus={false}
					errors={errors}
				/>
			</Pressable>
		);

	const onApplyClick = () => {
		inputRef.current?.blur();
		onChange?.(checkedOptions);
		setIsOpen(false);
		inputRef.current?.blur();
	};

	const onBottomSheetClose = () => {
		setIsOpen(false);

		if (inputRef.current) {
			inputRef.current.blur();
		}
	};

	return (
		<>
			<Pressable
				onPress={() => {
					setIsOpen(!isOpen);

					if (!directChange) setCheckedOptions(value || []);
				}}
				hitSlop={variant === 'menu' ? 20 : undefined}
			>
				<FormInputGroup
					label={label}
					isRequired={isRequired}
					popover={popover}
					popoverVariant={popoverVariant}
					layoutClassName={layoutClassName}
					reserveLabelSpacing={reserveLabelSpacing}
					formId={formId}
					hasErrors={hasErrors}
				>
					{variant === 'menu' ? (
						<View pointerEvents="none">{renderMenuVariant()}</View>
					) : (
						<View pointerEvents="none">{renderDefaultVariant()}</View>
					)}
				</FormInputGroup>
			</Pressable>
			<MultiSelectDropdownBottomSheet
				isOpen={isOpen}
				options={options}
				isSearchable={isSearchable}
				onOptionSelected={onOptionSelected}
				onSelectAll={onSelectAll}
				onApplyClick={onApplyClick}
				onClear={onClear}
				renderItem={renderItem}
				labelKey={labelKey}
				valueKey={valueKey}
				bottomSheetTitle={bottomSheetTitle}
				bottomSheetCloseButton={bottomSheetCloseButton}
				checkedOptions={directChange ? value : checkedOptions}
				selectAllText={selectAllText ?? isAllSelected ? 'Unselect All' : 'Select All'}
				isAllSelected={isAllSelected}
				directChange={directChange}
				isDirty={isDirty}
				groupKey={groupKey}
				getIsItemDisabled={getIsItemDisabled}
				onBottomSheetClose={onBottomSheetClose}
				cancelButtonText={cancelButtonText}
				applyButtonText={applyButtonText}
				withModal={withModal}
			/>
		</>
	);
};

const MultiSelectDropdownWithRef = forwardRef(MultiSelectDropdownBase) as unknown as MultiSelectDropdownBaseType;

const MultiSelectDropdown = forwardRef(function MultiSelectDropdown(props, ref?) {
	return <MultiSelectDropdownWithRef {...props} ref={ref} />;
}) as MultiSelectDropdownBaseType;

export { MultiSelectDropdown };
