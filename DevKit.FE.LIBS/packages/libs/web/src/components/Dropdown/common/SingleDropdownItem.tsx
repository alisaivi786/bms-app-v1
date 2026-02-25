import { FieldValues, PrimitiveKeys, StringAndNumberKeys } from '@devkit/utilities';
import styles from '../Dropdown.styles';
import { useSingleDropdownContextOptions } from './DropdownContext';

type SingleDropdownItemProps<TValue> = {
	option: TValue;
	index: number;
};

export const SingleDropdownItem = <
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
>({
	option,
	index,
}: SingleDropdownItemProps<TValue>) => {
	const {
		onOptionSelected,
		renderItem,
		labelKey,
		valueKey,
		value,
		onBlur,
		isBottomSheet,
		optionFocusIndex,
		size,
		getIsItemDisabled,
		refs,
	} = useSingleDropdownContextOptions<TValue, TKey, TForm, TGroupKey>();

	const selected = value === option[valueKey];
	const focused = optionFocusIndex === index;
	const isDisabled = getIsItemDisabled?.(option);

	return (
		<div
			className={styles.singleDropdownOptionStyles.container(selected, focused, size, isDisabled)}
			onClick={() => {
				if (!isDisabled) {
					onOptionSelected(option);

					if (isBottomSheet) onBlur?.();
				}
			}}
		>
			<div className={styles.singleDropdownOptionStyles.label}>
				<>
					{renderItem
						? renderItem(option, refs.reference?.current?.getBoundingClientRect().width ?? 0)
						: option[labelKey ?? valueKey]}
				</>
			</div>
		</div>
	);
};
