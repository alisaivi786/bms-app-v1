import clsx from 'clsx';
import { Checkbox } from '../Checkbox';
import { ButtonDropdownOptionType } from './ButtonDropdown';
import styles from './ButtonDropdown.styles';

export const ButtonDropdownOption = ({
	isDisabled = false,
	isChecked,
	onOptionSelected,
	item,
	className,
}: {
	isDisabled?: boolean;
	isChecked?: boolean;
	onOptionSelected: (item: ButtonDropdownOptionType, checked: boolean) => void;
	item: ButtonDropdownOptionType;
	className?: string;
}) => {
	const onChange = (isChecked: boolean) => {
		!isDisabled && onOptionSelected?.(item, isChecked);
	};

	return (
		<div
			className={clsx(styles.multipleOptionStyle(isChecked, isDisabled), className)}
			onClick={() => {
				onChange(!isChecked);
			}}
		>
			<div
				onClick={(e) => {
					e.preventDefault();
				}}
			>
				<Checkbox isChecked={isChecked} onChange={onChange} disabled={isDisabled} label={<>{item.label}</>} />
			</div>
		</div>
	);
};
