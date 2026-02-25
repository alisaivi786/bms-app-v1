import { useEffect, useMemo, useRef } from 'react';
import { useDataGridContext } from '../../Context/DataGridContext';
import { GRID_EXPAND_COLUMN_NAME, GRID_SELECTION_COLUMN_NAME } from '../../constants';
import { IColumn, IDataGridProps, SortOrder } from '../../types';
import HeaderArrow from './HeaderArrow';
import { headerColumn } from './HeaderColumn.style';
import HeaderContent from './HeaderContent';

interface Props<T, TAction extends string, TKey extends keyof T> {
	gridProps: IDataGridProps<T, TKey, TAction>;
	column: IColumn<T, TAction>;
	orderedColumns?: IColumn<T, TAction>[];
	firstColumn: boolean;
	lastColumn: boolean;
	className?: string;
	left?: number;
	right?: number;
	columnIndex: number;
	onWidthChange: (width: number) => void;
	rows: T[];
	pageRows: T[];
	pinned: boolean;
	lastRightFrozen?: boolean;
	lastLeftFrozen?: boolean;
	lastUnfrozen?: boolean;
}

export const ColumnHeader = <T, TAction extends string, TKey extends keyof T>(props: Props<T, TAction, TKey>) => {
	const {
		column,
		firstColumn,
		lastColumn,
		className,
		left,
		right,
		onWidthChange,
		columnIndex,
		gridProps,
		rows,
		pageRows,
		orderedColumns,
		pinned,
		lastRightFrozen,
		lastLeftFrozen,
		lastUnfrozen,
	} = props;
	const { field, width, name, sortable, sortIdentifier, headerRender, popover } = column;
	const boxRef = useRef<HTMLDivElement>(null);

	const { getSelectAllText, getSelectPageText, getUnitText, tableVariant, headerColor = 'default' } = gridProps;
	const { freezeColumnsWidth, columnsWidth, sorting, setFreezeColumnsWidth, setSorting } = useDataGridContext();

	const sortField = sortIdentifier ?? (field as string | undefined);

	const cellWidth = useMemo(() => {
		let cellWidth;

		if (typeof width !== 'undefined') {
			cellWidth = width;
		} else if (freezeColumnsWidth === true) {
			cellWidth = columnsWidth.find((i) => i.index === columnIndex)?.width;
		}

		if (typeof cellWidth === 'number') {
			cellWidth = `${cellWidth}px`;
		}

		return cellWidth;
	}, [freezeColumnsWidth, columnsWidth, columnIndex]);

	const onClick = () => {
		if (!sortable || !sortField) {
			return;
		}

		const sortDirection =
			sorting.columnName === sortField
				? sorting.sortOrder === SortOrder.Descending
					? SortOrder.Ascending
					: SortOrder.Descending
				: SortOrder.Ascending;

		setFreezeColumnsWidth(true);
		setSorting({
			columnName: sortField,
			sortOrder: sortDirection,
		});
	};

	useEffect(() => {
		if (!freezeColumnsWidth && boxRef.current?.clientWidth) {
			onWidthChange(boxRef.current.getBoundingClientRect().width - 32 - (firstColumn ? 0 : 1));
		}
	}, [boxRef.current?.clientWidth]);

	return (
		<div
			ref={boxRef}
			className={headerColumn({
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
			})}
			style={{ width: cellWidth, minWidth: cellWidth, insetInlineStart: left, insetInlineEnd: right }}
			onClick={onClick}
		>
			<div
				className={`flex items-center justify-center gap-2 px-4
				${name !== GRID_SELECTION_COLUMN_NAME && name !== GRID_EXPAND_COLUMN_NAME && !column.pinned ? 'justify-between' : ''} 
				`}
			>
				<HeaderContent
					orderedColumns={orderedColumns}
					name={name}
					serverSideHandling={gridProps.serverSideHandling}
					keyField={gridProps.keyField}
					pinned={pinned}
					isPinned={column.pinned}
					popover={popover}
					rows={rows}
					headerRender={headerRender}
					pageRows={pageRows}
					getSelectAllText={getSelectAllText}
					getSelectPageText={getSelectPageText}
					getUnitText={getUnitText}
				/>

				{sortable && <HeaderArrow sorting={sorting} sortField={sortField} />}
			</div>
		</div>
	);
};
