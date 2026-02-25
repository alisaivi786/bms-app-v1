import { FieldValues, PrimitiveKeys, StringAndNumberKeys } from '@devkit/utilities';
import { Checkbox } from '../../Checkbox/Checkbox';
import styles from '../Dropdown.styles';
import { useMultiSelectDropdownContextOptions } from './DropdownContext';

export const MultiSelectDropdownItem = <
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
>({
	option,
}: {
	option: TValue;
}) => {
	const {
		value,
		valueKey,
		onOptionSelected,
		labelKey,
		checkedOptions,
		directChange,
		size,
		getIsItemDisabled,
		renderItem,
		refs,
	} = useMultiSelectDropdownContextOptions<TValue, TKey, TForm, TGroupKey>();

	const compareValue = directChange ? value : checkedOptions;
	const isDisabled = getIsItemDisabled?.(option);
	const isCheckedValue = compareValue?.includes(option[valueKey]) ?? false;
	const onChange = (isChecked: boolean) => {
		!isDisabled && onOptionSelected?.(option, isChecked);
	};

	return (
		<div
			className={styles.multipleOptionStyle(size, isDisabled)}
			onClick={() => {
				onChange(!isCheckedValue);
			}}
		>
			<div
				onClick={(e) => {
					e.preventDefault();
				}}
			>
				<Checkbox
					isChecked={compareValue?.includes(option[valueKey]) ?? false}
					onChange={onChange}
					disabled={isDisabled}
					label={
						<>
							{renderItem
								? renderItem(option, refs.reference?.current?.getBoundingClientRect().width ?? 0)
								: option[labelKey ?? valueKey]}
						</>
					}
				/>
			</div>
		</div>
	);
};
