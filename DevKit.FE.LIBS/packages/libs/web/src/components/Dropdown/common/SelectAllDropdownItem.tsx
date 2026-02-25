import { FieldValues, PrimitiveKeys, StringAndNumberKeys } from '@devkit/utilities';
import { Checkbox } from '../../Checkbox/Checkbox';
import styles from '../Dropdown.styles';
import { useMultiSelectDropdownContextOptions } from './DropdownContext';

export const SelectAllDropdownItem = <
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
>() => {
	const { size, isAllSelected, selectAllText, onSelectAll, enableSelectAll, searchText } =
		useMultiSelectDropdownContextOptions<TValue, TKey, TForm, TGroupKey>();

	if (!enableSelectAll || searchText) return null;

	return (
		<div className={styles.multipleOptionStyle(size, false)} onClick={() => onSelectAll && onSelectAll(!isAllSelected)}>
			<div
				onClick={(e) => {
					e.preventDefault();
				}}
				className="text-title"
			>
				<Checkbox
					isChecked={isAllSelected}
					onChange={() => onSelectAll && onSelectAll(!isAllSelected)}
					label={<p className=" font-bold">{selectAllText}</p>}
				/>
			</div>
		</div>
	);
};
