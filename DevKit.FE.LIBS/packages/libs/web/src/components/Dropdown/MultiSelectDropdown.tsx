import isEqual from 'lodash/isEqual';
import { ForwardedRef, Ref, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import {
	FieldValues,
	MultipleSelectDropdownProps,
	PrimitiveKeys,
	StringAndNumberKeys,
	useReactFormController,
} from '@devkit/utilities';
import { TextFieldRef } from '../TextField/TextField';
import { DropdownProvider } from './common/DropdownContext';
import { DropdownInputComponent } from './common/DropdownInputComponent';
import { DropdownMenu } from './common/DropdownMenu';

type MultiSelectDropdownBaseType = <
	TValue extends object,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues = never,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined = undefined
>(
	props: MultipleSelectDropdownProps<TValue, TKey, TForm, TGroupKey> & { ref?: Ref<TextFieldRef> }
) => JSX.Element;

const MultiSelectDropdownBase = <
	TValue extends object,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues = never,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined = undefined
>(
	props: MultipleSelectDropdownProps<TValue, TKey, TForm, TGroupKey>,
	ref: ForwardedRef<TextFieldRef>
) => {
	const { valueKey, directChange, onClearValue, options, selectAllText, getIsItemDisabled } = props;
	const reactFormControllerProps = useReactFormController(props);
	const { value, onChange } = reactFormControllerProps;
	const [checkedOptions, setCheckedOptions] = useState<TValue[TKey][]>(props.directChange || !value ? [] : value);
	const inputRef = useRef<TextFieldRef>(null);

	useImperativeHandle(ref, () => inputRef.current as TextFieldRef, []);

	const isDirty = !isEqual(checkedOptions, value ?? []);

	const isAllSelected = props.directChange
		? value?.length === options?.length
		: checkedOptions?.length === options?.length;

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

		if (props.directChange) {
			onChange?.(result);
		} else {
			setCheckedOptions(result);
		}
	};
	const onOptionSelected = (option: TValue, checked: boolean) => {
		let result: TValue[TKey][] = [];

		const currentValue = (props.directChange ? value : checkedOptions) ?? [];

		if (checked) {
			result = [...currentValue, option[valueKey]];
		} else {
			result = currentValue?.filter((item) => item !== option[valueKey]) ?? [];
		}

		if (props.directChange) {
			onChange?.(result);
		} else {
			setCheckedOptions(result);
		}
	};

	const onApplyClick = () => {
		onChange?.(checkedOptions);
	};

	const onClear = () => {
		onChange([]);
		setCheckedOptions([]);
		onClearValue?.();
	};

	return (
		<DropdownProvider
			dropDownType="multiple"
			applyFloatingMinWidth={false}
			inputRef={inputRef}
			checkedOptions={checkedOptions}
			onOptionSelected={onOptionSelected}
			onClear={onClear}
			{...{ ...props, ...reactFormControllerProps }}
			onApplyClick={onApplyClick}
			isDirty={isDirty}
			onFocus={() => {
				if (!directChange) setCheckedOptions(value ?? []);

				props.onFocus?.();
			}}
			isAllSelected={isAllSelected}
			selectAllText={selectAllText ?? isAllSelected ? 'Unselect All' : 'Select All'}
			showCount={props.showCount ?? false}
			onSelectAll={onSelectAll}
		>
			<DropdownInputComponent />
			<DropdownMenu />
		</DropdownProvider>
	);
};

const MultiSelectDropdownWithRef = forwardRef(MultiSelectDropdownBase) as unknown as MultiSelectDropdownBaseType;

export const MultiSelectDropdown = forwardRef(function MultiSelectDropdown(props, ref?) {
	return <MultiSelectDropdownWithRef {...props} ref={ref} />;
}) as MultiSelectDropdownBaseType;
