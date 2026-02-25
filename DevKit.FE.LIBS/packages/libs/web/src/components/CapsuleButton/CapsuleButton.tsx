import { StringAndNumberKeys , ComponentSize } from '@devkit/utilities';
import classNames from './CapsuleButton.styles';

export type CapsuleButtonProps<TValue, TKey extends StringAndNumberKeys<TValue>> = {
	options: TValue[];
	valueKey: keyof Pick<TValue, TKey>;
	labelKey: StringAndNumberKeys<TValue>;
	selected?: TValue[TKey] | undefined;
	onChange: (selectedButtonValueKey: TValue[TKey] | undefined) => void;
	size?: ComponentSize;
};

const CapsuleButton = <TValue, TKey extends StringAndNumberKeys<TValue>>({
	onChange,
	options,
	selected,
	valueKey,
	labelKey,
	size = 'small',
}: CapsuleButtonProps<TValue, TKey>) => {
	const onClick = (optionValueKey: TValue[TKey]) => {
		selected === optionValueKey ? onChange(undefined) : onChange(optionValueKey);
	};

	return (
		<div className={classNames.container}>
			{options.map((option) => (
				<div
					key={`${option[valueKey]}`}
					className={classNames.button(size, selected === option[valueKey])}
					onClick={() => onClick(option[valueKey])}
				>
					<p className={classNames.label}>{`${option[labelKey]}`}</p>
				</div>
			))}
		</div>
	);
};

export default CapsuleButton;
