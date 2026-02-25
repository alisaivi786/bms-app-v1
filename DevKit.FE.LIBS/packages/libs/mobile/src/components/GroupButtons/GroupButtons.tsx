import { FlatList, Text, TouchableOpacity } from 'react-native';
import { StringAndNumberKeys } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts';
import styles from './GroupButtons.styles';

export type GroupButtonSize = 'xSmall' | 'small' | 'medium' | 'large';

export type GroupButtonVariants = 'light' | 'dark' | 'black';

export type GroupSelectedButtonVariants = 'gray' | 'brand';

export type GroupButtonDirection = 'vertical' | 'horizontal';

export type GroupButtonsProps<TValue, TKey extends StringAndNumberKeys<TValue>> = {
	options: TValue[];
	valueKey: keyof Pick<TValue, TKey>;
	labelKey: StringAndNumberKeys<TValue>;
	selected?: TValue[TKey] | undefined;
	onChange: (selectedButtonValueKey: TValue[TKey] | undefined) => void;
	btnSize?: GroupButtonSize;
	variant?: GroupButtonVariants;
	selectedVariant?: GroupSelectedButtonVariants;
	direction?: GroupButtonDirection;
};

export const GroupButtons = <TValue, TKey extends StringAndNumberKeys<TValue>>({
	options,
	selected,
	onChange,
	labelKey,
	valueKey,
	btnSize = 'small',
	variant = 'light',
	selectedVariant = 'gray',
	direction = 'horizontal',
}: GroupButtonsProps<TValue, TKey>) => {
	const { tw } = useMobileUIConfigOptions();

	const renderItem = ({ item: option }: { item: TValue }) => {
		const isSelected = selected === option[valueKey];

		return (
			<TouchableOpacity
				style={tw`${styles.getButtonStyles(isSelected, btnSize, variant, direction, selectedVariant)}`}
				onPress={() => onChange(option[valueKey])}
				accessibilityRole="button"
				accessibilityState={{ selected: isSelected }}
				activeOpacity={0.7}
			>
				{['string', 'number', 'boolean'].includes(typeof option[labelKey]) ? (
					<Text
						style={tw`${styles.getTextStyles(btnSize, isSelected, variant, selectedVariant)}`}
					>{`${option[labelKey]}`}</Text>
				) : (
					(option[labelKey] as React.ReactElement)
				)}
			</TouchableOpacity>
		);
	};

	return (
		<FlatList
			data={options}
			renderItem={renderItem}
			keyExtractor={(item) => `${item[valueKey]}`}
			horizontal={direction === 'horizontal'}
			contentContainerStyle={tw`${styles.getContainerStyles(direction)}`}
			style={tw`${styles.getFlatListStyles(direction)}}`}
			showsHorizontalScrollIndicator={false}
		/>
	);
};
