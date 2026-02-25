import { clsx } from 'clsx';
import { isNil } from 'lodash';
import { ReactNode, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@devkit/icons/web';
import { useWebUIConfigOptions } from '../../../../layouts/ThemeProvider/theme-context';
import { Checkbox } from '../../../Checkbox';
import { BottomSheet } from '../../../DialogModal';
import { useDataGridContext } from '../../Context/DataGridContext';
import { GRID_EXPAND_COLUMN_NAME, GRID_SELECTION_COLUMN_NAME } from '../../constants';
import { IColumn, IDataGridProps } from '../../types';

const MobileResponsiveCell = <T, TAction extends string, TKey extends keyof T>({
	row,
	gridProps,
	orderedColumns,
	mobileResponsiveOnClick,
	isSubRow = false,
}: {
	row: T;
	gridProps: IDataGridProps<T, TKey, TAction>;
	orderedColumns: IColumn<T, TAction>[];
	mobileResponsiveOnClick?: ({ item }: { item: T }) => void;
	isSubRow?: boolean;
}) => {
	const { allRowsSelected, setSelectedRows, selectedRows, expandedRows } = useDataGridContext<T>();
	const {
		onMobileResponsiveRender,
		isMobileResponsiveCardHasError,
		keyField,
		selectableRowDisabled,
		mobileResponsiveModalTitle,
		enableSelection,
		hideMobileResponsiveDetailsArrow,
	} = gridProps;
	const checked = allRowsSelected || selectedRows.some((r) => r[keyField] === row[keyField]);
	const [isOpen, setIsOpen] = useState(false);
	const isDisabled = selectableRowDisabled?.(row);
	const { isRtlLocale } = useWebUIConfigOptions();
	const columns = orderedColumns?.filter(
		(c) => c.name !== GRID_SELECTION_COLUMN_NAME && c.name !== GRID_EXPAND_COLUMN_NAME && !c.isAction
	);
	const actionColumn = orderedColumns?.filter((c) => c.isAction)?.[0];
	const isRowExpanded = expandedRows.includes(String(row[keyField]));

	if (!onMobileResponsiveRender) return <></>;

	return (
		<div
			className={`flex items-center gap-2 p-4 ${
				isMobileResponsiveCardHasError && isMobileResponsiveCardHasError({ item: row }) ? 'bg-red-50' : 'dg_TableRow'
			}`}
		>
			{enableSelection && (
				<div className="pe-2">
					{isSubRow ? (
						<div className="w-4 h-4"></div>
					) : (
						<Checkbox
							isChecked={checked && !isDisabled}
							disabled={isDisabled}
							onChange={() => {
								setSelectedRows(row, keyField, !checked);
							}}
						/>
					)}
				</div>
			)}
			<div
				className={clsx(
					enableSelection && !isSubRow && hideMobileResponsiveDetailsArrow && 'w-[calc(100%-24px-8px)]',
					(!enableSelection || isSubRow) && !hideMobileResponsiveDetailsArrow && 'w-[calc(100%-16px-8px)]',
					enableSelection && !isSubRow && !hideMobileResponsiveDetailsArrow && 'w-[calc(100%-24px-16px-16px)]',
					(!enableSelection || isSubRow) && hideMobileResponsiveDetailsArrow && 'w-full'
				)}
			>
				{onMobileResponsiveRender({ item: row, isExpanded: isRowExpanded })}
			</div>
			{!hideMobileResponsiveDetailsArrow && (
				<div
					className="cursor-pointer"
					onClick={() => {
						mobileResponsiveOnClick ? mobileResponsiveOnClick({ item: row }) : setIsOpen(true);
					}}
				>
					{isRtlLocale ? <ArrowLeftIcon /> : <ArrowRightIcon />}
				</div>
			)}
			<BottomSheet
				isOpen={isOpen}
				onClose={() => {
					setIsOpen(false);
				}}
				variant="small"
				title={mobileResponsiveModalTitle}
			>
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-5">
						{columns.map((c) => {
							let value;

							if (!c.field && !c.cellRender) value = <></>;

							if (c.cellRender) {
								const cellComponent = c.cellRender(row);

								if (!cellComponent && !c.pinned) {
									value = <div className="w-10 mx-4 border-t border-gray-300 border-solid"></div>;
								}

								value = cellComponent;
							} else {
								value =
									c.field && (isNil(row[c.field]) || row[c.field] === '') ? (
										<div className="flex items-center h-full">
											<div className="w-10 border-t border-gray-300 border-solid" />
										</div>
									) : (
										<p className="font-medium text-end">{row[c.field as keyof T] as ReactNode}</p>
									);
							}

							return (
								<div key={`${c.name}-${String(c?.field)}`} className="flex justify-between text-paragraph">
									<div className="text-gray-600">{c.name}</div>
									<div className={`flex w-1/2 justify-end font-medium text-end ${c.cellClassName}`}>
										{c.format ? c.format(row) : value}
									</div>
								</div>
							);
						})}
					</div>
					<div className="flex flex-col">{actionColumn?.cellRender?.(row)}</div>
				</div>
			</BottomSheet>
		</div>
	);
};

export default MobileResponsiveCell;
