import { Pressable, Text, View } from 'react-native';
import { SfMinusIcon, SfPlusIcon } from '@devkit/icons/native';
import { FieldValues, ICommonFieldProps, useReactFormController } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts';
import styles from './Counter.Style';

type CounterOptions = {
	/** Minimum value for the counter */
	min?: number;
	/** Maximum value for the counter */
	max?: number;
	/** Custom icon for the minus button */
	minusIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
	/** Custom icon for the plus button */
	plusIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
};

export type ICounterProps<TForm extends FieldValues = never> = Omit<ICommonFieldProps<number, TForm>, 'placeholder'> &
	CounterOptions;

const Counter = <TForm extends FieldValues = never>(props: ICounterProps<TForm>) => {
	const { size = 'small', disabled, min = 0, max, minusIcon, plusIcon } = props;

	const { onChange, value = 0 } = useReactFormController(props);

	const { isRtlLocale, tw } = useMobileUIConfigOptions();
	const canDecrement = !disabled && (min === undefined || value - 1 >= min);
	const canIncrement = !disabled && (max === undefined || value + 1 <= max);

	const increment = () => {
		if (canIncrement) onChange(value + 1);
	};
	const decrement = () => {
		if (canDecrement) onChange(value - 1);
	};

	const Minus = minusIcon || SfMinusIcon;
	const Plus = plusIcon || SfPlusIcon;

	return (
		<View style={tw`flex-row`}>
			<View style={tw`${styles.CounterContainer(size, isRtlLocale)}`}>
				<Pressable style={tw`${styles.iconContainer(size)}`} onPress={decrement} disabled={disabled || !canDecrement}>
					<Minus style={tw`${styles.icon(disabled || !canDecrement)}`} width={12} height={12} color="black" />
				</Pressable>
				<View style={tw`${styles.valueContainer(size)}`}>
					<Text style={tw`${styles.valueLabel(size)}`}>{value}</Text>
				</View>
				<Pressable style={tw`${styles.iconContainer(size)}`} onPress={increment} disabled={disabled || !canIncrement}>
					<Plus color="black" style={tw`${styles.icon(disabled || !canIncrement)}`} height={12} width={12} />
				</Pressable>
			</View>
		</View>
	);
};

export default Counter;
