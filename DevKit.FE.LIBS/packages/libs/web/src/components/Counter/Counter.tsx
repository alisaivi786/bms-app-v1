import { SfMinusIcon, SfPlusIcon } from '@devkit/icons/web';
import { FieldValues, ICommonFieldProps, useReactFormController } from '@devkit/utilities';
import { useWebUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
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

	const { isRtlLocale } = useWebUIConfigOptions();
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
		<div className={styles.CounterContainer(size, isRtlLocale)}>
			<button
				type="button"
				className={styles.iconContainer(size, disabled || !canDecrement)}
				onClick={decrement}
				disabled={disabled || !canDecrement}
				aria-label="Decrement"
			>
				<Minus
					aria-disabled={disabled || !canDecrement}
					role="img"
					className={styles.icon(disabled || !canDecrement)}
					aria-hidden="true"
				/>
			</button>
			<div className={styles.valueContainer(size, disabled)}>{value}</div>
			<button
				type="button"
				className={styles.iconContainer(size, disabled || !canIncrement)}
				onClick={increment}
				disabled={disabled || !canIncrement}
				aria-label="Increment"
			>
				<Plus
					aria-disabled={disabled || !canIncrement}
					className={styles.icon(disabled || !canIncrement)}
					aria-hidden="true"
				/>
			</button>
		</div>
	);
};

export default Counter;
