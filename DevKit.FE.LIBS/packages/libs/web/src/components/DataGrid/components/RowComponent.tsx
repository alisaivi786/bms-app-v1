import { useDataGridContext } from '../Context/DataGridContext';
import useColumnOffset from '../hooks/useColumnOffset';
import { IColumn, IColumnsWidth, IDataGridProps } from '../types';
import Cell from './Cell';
import { FROZEN_CLASS_NAMES } from './DataGridTable';

const RowComponent = <T, TAction extends string, TKey extends keyof T>({
	rows,
	rowIndex,
	orderedColumns,
	gridProps,
	frozenLeftCount,
	frozenRightCount,
	columnsWidth,
}: {
	rows: T[];
	rowIndex: number;
	frozenLeftCount: number;
	frozenRightCount: number;
	columnsWidth: IColumnsWidth[];
	gridProps: IDataGridProps<T, TKey, TAction>;
	orderedColumns: IColumn<T, TAction>[];
}) => {
	const { getLeftOffset, getRightOffset } = useColumnOffset();
	const row = rows[rowIndex];
	const { expandedRows, setExpandedRow, visibleColumns } = useDataGridContext<T>();
	const { subRowDataKey, keyField, tableVariant, isRowHasError } = gridProps;
	const isSubRow =
		subRowDataKey && rows[rowIndex]?.[subRowDataKey] && (rows[rowIndex]?.[subRowDataKey] as [])?.length > 0;
	const subRowArray = isSubRow ? (rows[rowIndex]?.[subRowDataKey] as T[]) : [];
	const hasSubRows = subRowArray?.length > 0;
	const isExpanded = expandedRows.includes(String(row[keyField])) || false;

	const bgClassName = isRowHasError?.({ item: row })
		? 'bg-red-50'
		: rowIndex % 2 && tableVariant !== 'flat'
		? 'dg_TableRowOdd'
		: 'dg_TableRowEven';
	const columnsToRender = orderedColumns.filter((c) => c.isAction || c.hidden || visibleColumns.includes(c.name));

	return (
		<>
			<div key={`row-${rowIndex}-${row[keyField]}`} className={`table-row ${bgClassName} `}>
				{columnsToRender.map((c, columnIndex) => {
					const originalIndex = orderedColumns.findIndex((col) => col.name === c.name);

					return (
						<Cell
							key={`${rowIndex}-${columnIndex}`}
							orderedColumns={columnsToRender}
							column={c}
							currentRow={row}
							gridProps={gridProps}
							rowIndex={rowIndex}
							columnIndex={columnIndex}
							lastLeftFrozen={frozenLeftCount - 1 === columnIndex}
							lastRightFrozen={orderedColumns.length - frozenRightCount === columnIndex}
							className={`${FROZEN_CLASS_NAMES[c.frozen ?? '']} ${bgClassName}`}
							left={getLeftOffset(originalIndex, columnsWidth, c.frozen)}
							right={getRightOffset(originalIndex, columnsWidth, c.frozen)}
							hasSubRows={hasSubRows}
							isExpanded={isExpanded}
							setIsExpanded={(val) => {
								setExpandedRow(String(row[keyField]), val);
							}}
						/>
					);
				})}
			</div>
			{isSubRow &&
				isExpanded &&
				subRowArray.map((subRow, subIndex) => (
					<div key={`row-${rowIndex}-${row[keyField]}-${subIndex}`} className={`table-row ${bgClassName}`}>
						{orderedColumns.map((c, columnIndex) => (
							<Cell
								key={`${rowIndex}-${columnIndex}-${subIndex}`}
								orderedColumns={orderedColumns}
								column={c}
								currentRow={subRow}
								gridProps={gridProps}
								rowIndex={rowIndex}
								columnIndex={columnIndex}
								lastLeftFrozen={frozenLeftCount - 1 === columnIndex}
								lastRightFrozen={orderedColumns.length - frozenRightCount === columnIndex}
								className={`${FROZEN_CLASS_NAMES[c.frozen ?? '']} ${bgClassName}`}
								left={getLeftOffset(columnIndex, columnsWidth, c.frozen)}
								right={getRightOffset(columnIndex, columnsWidth, c.frozen)}
								isSubRow
							/>
						))}
					</div>
				))}
		</>
	);
};

export default RowComponent;
