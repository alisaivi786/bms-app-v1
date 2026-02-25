import { Pressable, Text, View } from 'react-native';
import { FieldValues, PrimitiveKeys, StringAndNumberKeys } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../../../layouts';
import { Checkbox } from '../../../Checkbox';
import styles from '../../Dropdown.styles';
import { MultiSelectDropdownMobileProps } from '../../MultiSelectDropdown';

type MultiSelectDropdownItemProps<
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
> = {
	item: TValue;
	onOptionSelected: (item: TValue, checked: boolean) => void;
	renderItem?: ((item: TValue, index: number) => React.ReactNode) | undefined;
	checked?: boolean;
	disabled?: boolean;
	isLastItem?: boolean;
} & Pick<
	MultiSelectDropdownMobileProps<TValue, TKey, TForm, TGroupKey>,
	| 'labelKey'
	| 'valueKey'
	| 'groupKey'
	| 'form'
	| 'field'
	| 'layoutClassName'
	| 'popover'
	| 'popoverVariant'
	| 'reserveLabelSpacing'
>;

const MultiSelectDropdownItem = <
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
>({
	item,
	onOptionSelected,
	renderItem,
	labelKey,
	valueKey,
	checked,
	disabled,
	isLastItem = false,
}: MultiSelectDropdownItemProps<TValue, TKey, TForm, TGroupKey>) => {
	const { tw } = useMobileUIConfigOptions();
	const bottomSheetStyles = styles.bottomSheet();

	const label = typeof item === 'string' ? item : item[labelKey ?? valueKey];

	const handleChange = (isChecked: boolean) => {
		if (!disabled) {
			onOptionSelected(item, isChecked);
		}
	};

	return (
		<Pressable
			style={tw`${bottomSheetStyles.dropdownItemContainer(isLastItem)}`}
			onPress={() => handleChange(!checked)}
			disabled={disabled}
		>
			<View>
				<Checkbox
					isChecked={checked}
					onChange={handleChange}
					disabled={disabled}
					label={
						renderItem ? (
							renderItem(item, 0)
						) : (
							<Text style={tw`text-paragraph font-main-regular ${disabled ? 'opacity-50' : ''}`}>{String(label)}</Text>
						)
					}
				/>
			</View>
		</Pressable>
	);
};

export default MultiSelectDropdownItem;
