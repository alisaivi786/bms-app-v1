import React from 'react';
import { Pressable, Text } from 'react-native';
import { DropdownProps, FieldValues, PrimitiveKeys, StringAndNumberKeys } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import styles from '../Dropdown.styles';

type DropdownItemProps<
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
> = DropdownProps<TValue, TKey, TForm, TGroupKey> & {
	onDropdownItemSelect: (item: TValue) => void;
	item: TValue;
};

const DropdownItem = <
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
>(
	props: DropdownItemProps<TValue, TKey, TForm, TGroupKey>
) => {
	const { renderItem, labelKey, item, onDropdownItemSelect, getIsItemDisabled } = props;
	const { tw, reverseLayout } = useMobileUIConfigOptions();
	const bottomSheetStyles = styles.bottomSheet();
	const isDisabled = getIsItemDisabled?.(item);

	return (
		<Pressable
			style={tw`${bottomSheetStyles.itemContainer(isDisabled)}`}
			disabled={isDisabled}
			onPress={() => onDropdownItemSelect(item)}
		>
			{renderItem ? (
				renderItem(item, 0)
			) : (
				<Text style={tw`${!reverseLayout ? 'text-left' : ''}`}>
					{typeof item === 'string' ? item : (item[labelKey as keyof TValue] as string)}
				</Text>
			)}
		</Pressable>
	);
};

export default DropdownItem;
