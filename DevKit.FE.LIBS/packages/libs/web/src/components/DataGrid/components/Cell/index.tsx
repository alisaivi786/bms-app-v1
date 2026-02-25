import { useMemo, useState } from 'react';
import { useDataGridContext } from '../../Context/DataGridContext';
import { GRID_SELECTION_COLUMN_NAME } from '../../constants';
import CellComponent, { CellProps } from './CellComponent';

interface Props<T, TAction extends string, TKey extends keyof T> extends CellProps<T, TAction, TKey> {
	className?: string;
	left?: number;
	right?: number;
	lastLeftFrozen?: boolean;
	lastRightFrozen?: boolean;
	isSubRow?: boolean;
	hasSubRows?: boolean;
	isExpanded?: boolean;
	setIsExpanded?: (val: boolean) => void;
}

function Cell<T, TAction extends string, TKey extends keyof T>(props: Props<T, TAction, TKey>) {
	const {
		column,
		currentRow,
		gridProps,
		rowIndex,
		columnIndex,
		className = '',
		left,
		right,
		orderedColumns,
		lastLeftFrozen,
		lastRightFrozen,
		isSubRow = false,
		hasSubRows = false,
		isExpanded = true,
		setIsExpanded,
	} = props;
	const { name, pinned, width, cellClassName = () => '', hideWhenSubRow } = column;
	const { variant = 'default', tableVariant } = gridProps;
	const { freezeColumnsWidth, columnsWidth } = useDataGridContext<T>();

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

	const [hovered, setHovered] = useState(false);

	return (
		<div
			className={`dg_TableCell table-cell border-gray-300 ${className} 
			${variant === 'compact' ? 'py-1' : 'py-3'}  
			${name === GRID_SELECTION_COLUMN_NAME ? '!border-0' : ''} 
			${pinned ? '!border-0 px-0' : ''} 
			${lastLeftFrozen && tableVariant !== 'outlined-border' ? '!border-e' : ''} 
			${lastRightFrozen && tableVariant !== 'outlined-border' ? '!border-s' : ''}
			${hovered && pinned ? 'z-50' : ''}
			${tableVariant === 'flat' ? 'border-b border-gray-100 !border-e-0 !border-s-0' : ''}
			${cellClassName(currentRow)}
			`}
			style={{ insetInlineStart: left, insetInlineEnd: right, width: cellWidth }}
			onMouseEnter={() => {
				setHovered(true);
			}}
			onMouseLeave={() => {
				setHovered(false);
			}}
		>
			{!(hideWhenSubRow && isSubRow) && (
				<div
					className={`${
						pinned || name === GRID_SELECTION_COLUMN_NAME
							? 'flex items-center justify-center gap-2 px-4'
							: 'mx-4 flex justify-between font-normal'
					}`}
				>
					<CellComponent
						orderedColumns={orderedColumns}
						column={column}
						currentRow={currentRow}
						gridProps={gridProps}
						rowIndex={rowIndex}
						columnIndex={columnIndex}
						cellWidth={cellWidth}
						isSubRow={isSubRow}
						hasSubRows={hasSubRows}
						isExpanded={isExpanded}
						setIsExpanded={setIsExpanded}
					/>
				</div>
			)}
		</div>
	);
}

export default Cell;
