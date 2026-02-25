import clsx from 'clsx';
import { GRID_EXPAND_COLUMN_NAME, GRID_SELECTION_COLUMN_NAME } from '../../constants';
import { IColumn, IDataGridBaseProps } from '../../types';

type headerColumnProps<T, TAction extends string, TKey extends keyof T> = {
	tableVariant: IDataGridBaseProps<T, TKey>['tableVariant'];
	headerColor: IDataGridBaseProps<T, TKey>['headerColor'];
	sortable?: boolean;
	className?: string;
	pinned: IColumn<T, TAction>['pinned'];
	name: IColumn<T, TAction>['name'];
	lastColumn: boolean;
	lastLeftFrozen?: boolean;
	lastRightFrozen?: boolean;
	lastUnfrozen?: boolean;
};

export const headerColumn = <T, TAction extends string, TKey extends keyof T>(
	props: headerColumnProps<T, TAction, TKey>
) => {
	const {
		tableVariant,
		headerColor,
		sortable,
		className,
		pinned,
		name,
		lastColumn,
		lastLeftFrozen,
		lastRightFrozen,
		lastUnfrozen,
	} = props;

	return clsx(
		'table-cell whitespace-nowrap border border-s-0 border-gray-300 py-2.5 text-start align-middle',
		'dg_HeaderColumn',
		className,
		{
			'border-t-0': tableVariant !== 'flat',
			'border-e-0': tableVariant === 'flat' || tableVariant === 'outlined-border',
			'dg_Header_Top_Border dg_Header_Bottom_Border': tableVariant === 'flat',
			'!bg-brand-50': headerColor === 'brand-50',
			'!bg-white': headerColor === 'white',
			'cursor-pointer hover:nj-text-brand': sortable,
			'!border-e-0':
				((name === GRID_SELECTION_COLUMN_NAME || name === GRID_EXPAND_COLUMN_NAME) && !lastLeftFrozen) ||
				lastColumn ||
				lastUnfrozen,
			'px-0 !border-e-0': pinned,
			'!border-s': lastRightFrozen && tableVariant !== 'flat' && tableVariant !== 'outlined-border',
		}
	);
};
