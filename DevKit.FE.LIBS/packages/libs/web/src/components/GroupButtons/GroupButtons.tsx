import { StringAndNumberKeys } from '@devkit/utilities';
import './GroupButtons.scss';
import styles from './GroupButtons.styles';

export type GroupButtonSize = 'xSmall' | 'small' | 'medium' | 'large';

type GroupButtonVariants = 'light' | 'dark' | 'black';

type GroupSelectedButtonVariants = 'gray' | 'brand';

type MobileGroupButtonDirection = 'vertical' | 'horizontal';

export type GroupButtonsProps<TValue, TKey extends StringAndNumberKeys<TValue>> = {
	options: TValue[];
	valueKey: keyof Pick<TValue, TKey>;
	labelKey: StringAndNumberKeys<TValue>;
	selected?: TValue[TKey] | undefined;
	onChange: (selectedButtonValueKey: TValue[TKey] | undefined) => void;
	btnSize: GroupButtonSize;
	variant?: GroupButtonVariants;
	selectedVariant?: GroupSelectedButtonVariants;
	mobileDirection?: MobileGroupButtonDirection;
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
	mobileDirection = 'horizontal',
}: GroupButtonsProps<TValue, TKey>) => {
	return (
		<div className={styles.container(mobileDirection)}>
			{options.map((option) => (
				<div
					key={`${option[valueKey]}`}
					className={styles.button(selected === option[valueKey], btnSize, variant, mobileDirection, selectedVariant)}
					dangerouslySetInnerHTML={{ __html: `${option[labelKey]}` }}
					onClick={() => onChange(option[valueKey])}
				/>
			))}
		</div>
	);
};
