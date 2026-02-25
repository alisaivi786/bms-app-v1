import clsx from 'clsx';
import { useState } from 'react';
import { useHTMLElementObserver } from '../../../hooks/useHTMLElementObserver';
import { useDataGridContext } from '../Context/DataGridContext';
import useColumnOffset from '../hooks/useColumnOffset';
import useGetOrderedTableColumns from '../hooks/useGetOrderedTableColumns';
import useGetRows from '../hooks/useGetRows';
import { IDataGridProps } from '../types';
import MobileRowComponent from './Cell/MobileRowComponent';
import { ColumnHeader } from './ColumnHeader';
import HeaderPopup from './ColumnHeader/HeaderPopup';
import EmptyDataMessage from './EmptyDataMessage';
import RowComponent from './RowComponent';

export const FROZEN_CLASS_NAMES = {
	left: 'dg_frozenLeft',
	right: 'dg_frozenRight',
	'': undefined,
};

export const DataGridTable = <T, TAction extends string, TKey extends keyof T>({
	gridProps,
	tabletWidth,
	tableHeight,
}: {
	gridProps: IDataGridProps<T, TKey, TAction>;
	tabletWidth: number;
	tableHeight: number;
}) => {
	const {
		columns = [],
		enableSelection,
		serverSideHandling,
		emptyDataMessage,
		hidePaging,
		keyField,
		onMobileResponsiveRender,
		onMobileResponsiveHeaderRender,
		mobileResponsiveOnClick,
		subRowDataKey,
		hideExpandColumn,
		headerColor = 'default',
		tableVariant = 'default',
		getSelectAllText,
		getSelectPageText,
		getUnitText,
	} = gridProps;

	const { setColumnsWidth, columnsWidth, fetchedDataState, visibleColumns } = useDataGridContext<T>();
	const dataToRender = fetchedDataState.filteredData;

	const [headerHeight, setHeaderHeight] = useState(0);
	const { contentRef } = useHTMLElementObserver<HTMLDivElement>({
		onChange: (elem) => {
			if (elem) {
				setHeaderHeight(elem.getBoundingClientRect().height);
			}
		},
	});

	const { rows } = useGetRows({
		data: dataToRender,
		hidePaging,
		serverSideHandling,
		ssr: gridProps.ssr,
	});

	const { getLeftOffset, getRightOffset } = useColumnOffset();

	const { orderedColumns } = useGetOrderedTableColumns({
		columns,
		enableSelection,
		subRowDataKey,
		hideExpandColumn,
	});

	const columnsToRender = orderedColumns.filter((c) => c.isAction || c.hidden || visibleColumns.includes(c.name));

	const frozenLeftCount = orderedColumns.filter((c) => c.frozen === 'left').length;

	const frozenRightCount = orderedColumns.filter((c) => c.frozen === 'right').length;

	return (
		<>
			{onMobileResponsiveRender && (
				<div className="sm:hidden">
					{onMobileResponsiveHeaderRender && (
						<div
							className={clsx('px-4 py-3 flex items-center gap-2 bg-gray-100', {
								'border-b border-gray-300': tableVariant === 'outlined-border' || tableVariant === 'default',
								'!bg-brand-50': headerColor === 'brand-50',
								'!bg-white': headerColor === 'white',
							})}
						>
							{enableSelection && (
								<div className="pe-2 flex items-center">
									<HeaderPopup
										rows={dataToRender}
										pageRows={rows}
										serverSideHandling={serverSideHandling}
										orderedColumns={orderedColumns}
										pinned={true}
										keyField={keyField}
										getSelectAllText={getSelectAllText}
										getSelectPageText={getSelectPageText}
										getUnitText={getUnitText}
									/>
								</div>
							)}
							{onMobileResponsiveHeaderRender()}
						</div>
					)}
					<div className="flex flex-col">
						{rows.map((row) => (
							<MobileRowComponent
								key={`${row[keyField]}`}
								row={row}
								orderedColumns={columnsToRender}
								gridProps={gridProps}
								mobileResponsiveOnClick={mobileResponsiveOnClick}
							/>
						))}
					</div>
				</div>
			)}
			<div
				className={clsx('w-full', onMobileResponsiveRender ? 'hidden sm:table' : 'table')}
				style={{ borderCollapse: 'separate' }}
			>
				<div className="table-row " ref={contentRef}>
					{columnsToRender.map((c, index) => {
						const originalIndex = orderedColumns.findIndex((col) => col.name === c.name);

						return (
							<ColumnHeader
								className={FROZEN_CLASS_NAMES[c.frozen ?? '']}
								onWidthChange={(columnWidth) => {
									setColumnsWidth(index, columnWidth);
								}}
								key={`${index}`}
								columnIndex={index}
								gridProps={gridProps}
								column={c}
								pinned={columnsToRender.some((c) => c.pinned)}
								orderedColumns={columnsToRender}
								firstColumn={index === 0}
								lastRightFrozen={columnsToRender.length - frozenRightCount === index}
								lastUnfrozen={columnsToRender.length - frozenRightCount - 1 === index}
								lastColumn={index === columnsToRender.length - 1}
								lastLeftFrozen={frozenLeftCount - 1 === index}
								left={getLeftOffset(originalIndex, columnsWidth, c.frozen)}
								right={getRightOffset(originalIndex, columnsWidth, c.frozen)}
								rows={dataToRender}
								pageRows={rows}
							/>
						);
					})}
				</div>

				{dataToRender.length === 0 ? (
					<EmptyDataMessage
						emptyDataMessage={emptyDataMessage}
						width={tabletWidth}
						height={tableHeight - headerHeight - 20}
					/>
				) : (
					rows.map((_row, rowIndex) => (
						<RowComponent
							key={`${rowIndex}`}
							rows={rows}
							rowIndex={rowIndex}
							orderedColumns={orderedColumns}
							gridProps={gridProps}
							frozenLeftCount={frozenLeftCount}
							frozenRightCount={frozenRightCount}
							columnsWidth={columnsWidth}
						/>
					))
				)}
			</div>
		</>
	);
};
