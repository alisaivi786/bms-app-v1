import isNil from 'lodash/isNil';
import { useMemo, useRef } from 'react';
import { ArrowDownIcon } from '@devkit/icons/web';
import { Checkbox } from '../../../Checkbox';
import { Popover } from '../../../Popover';
import { useDataGridContext } from '../../Context/DataGridContext';
import { GRID_EXPAND_COLUMN_NAME, GRID_SELECTION_COLUMN_NAME } from '../../constants';
import { IColumn, IDataGridProps, IGridState } from '../../types';
import ExpandableCell from './ExpandableCell';

export interface CellProps<T, TAction extends string, TKey extends keyof T> {
	column: IColumn<T, TAction>;
	currentRow: T;
	gridProps: IDataGridProps<T, TKey, TAction>;
	gridState?: IGridState<T>;
	rowIndex: number;
	columnIndex: number;
	cellWidth?: string;
	orderedColumns?: IColumn<T, TAction>[];
	isSubRow?: boolean;
	hasSubRows?: boolean;
	isExpanded?: boolean;
	setIsExpanded?: (val: boolean) => void;
}

function CellContent<T>({ row, field, cellWidth }: { row: T; field: keyof T; cellWidth?: string }) {
	const divRef = useRef<HTMLDivElement>(null);

	const showOpenToolTip = useMemo(
		() => divRef.current && divRef.current.scrollWidth > divRef.current.offsetWidth,
		[divRef.current]
	);

	return (
		<Popover
			className={`!bg-black text-white ${showOpenToolTip ? '' : 'hidden'}`}
			direction="top-start"
			content={row[field] as string}
		>
			<p className="truncate" ref={divRef} style={{ width: cellWidth }}>
				{row[field] as string}
			</p>
		</Popover>
	);
}

function CellComponent<T, TAction extends string, TKey extends keyof T>(props: CellProps<T, TAction, TKey>) {
	const {
		column,
		currentRow,
		gridProps,
		rowIndex,
		columnIndex,
		cellWidth,
		orderedColumns,
		isSubRow,
		hasSubRows = false,
		isExpanded,
		setIsExpanded,
	} = props;
	const { onCellClick, name, field, format, cellRender, expandable, pinned } = column;
	const { selectableRowDisabled, keyField } = gridProps;
	const { allRowsSelected, setSelectedRows, selectedRows, expandableCell } = useDataGridContext<T>();

	const checked = allRowsSelected || selectedRows.some((r) => r[keyField] === currentRow[keyField]);

	const fieldSelector = (row: T) => {
		if (!field) {
			return null;
		}

		const formattedValue = format?.(row);

		if (isNil(row[field]) || row[field] === '' || formattedValue === '') {
			return <div className="w-10 border-t border-solid border-gray-300"></div>;
		}

		if (formattedValue) return formattedValue;

		return <CellContent row={row} field={field} cellWidth={cellWidth} />;
	};

	const cellFormat = (row: T) => <>{fieldSelector(row)}</>;

	if (cellRender) {
		const cellComponent = cellRender(currentRow);

		if (!cellComponent && !pinned) {
			return <div className="mx-4 w-10 border-t border-solid border-gray-300"></div>;
		}

		return <>{cellComponent}</>;
	}

	if (name === GRID_SELECTION_COLUMN_NAME) {
		const isDisabled = selectableRowDisabled?.(currentRow);

		return (
			<div className={`${orderedColumns?.some((c) => c.pinned) ? '' : 'pl-1'}`}>
				{!isSubRow && (
					<Checkbox
						isChecked={checked && !isDisabled}
						disabled={isDisabled}
						onChange={() => {
							setSelectedRows(currentRow, keyField, !checked);
						}}
					/>
				)}
			</div>
		);
	} else if (name === GRID_EXPAND_COLUMN_NAME) {
		return (
			<div className={`${orderedColumns?.some((c) => c.pinned) ? '' : 'pl-1'}`}>
				{hasSubRows && (
					<div
						onClick={() => setIsExpanded?.(!isExpanded)}
						className={`cursor-pointer text-brand-600 ring-0 transition-transform duration-200 ease-in-out text-center 
					${isExpanded ? '-rotate-180' : 'rotate-0'}
					`}
					>
						<ArrowDownIcon />
					</div>
				)}
			</div>
		);
	}

	if (onCellClick) {
		return (
			<a
				href="#"
				className="nj-text-brand"
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					onCellClick(currentRow);
				}}
			>
				{cellFormat(currentRow)}
			</a>
		);
	}

	if (expandable) {
		return (
			<ExpandableCell
				cellFormat={cellFormat}
				columnIndex={columnIndex}
				currentRow={currentRow}
				expandableCell={expandableCell}
				rowIndex={rowIndex}
				cellWidth={cellWidth}
			/>
		);
	}

	return <>{cellFormat(currentRow)}</>;
}

export default CellComponent;
