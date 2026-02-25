import { Fragment } from 'react';
import { useDataGridContext } from '../../Context/DataGridContext';
import { IColumn, IDataGridProps } from '../../types';
import MobileResponsiveCell from './MobileResponsiveCell';

const MobileRowComponent = <T, TAction extends string, TKey extends keyof T>({
	row,
	orderedColumns,
	gridProps,
	mobileResponsiveOnClick,
}: {
	row: T;
	orderedColumns: IColumn<T, TAction>[];
	gridProps: IDataGridProps<T, TKey, TAction>;
	mobileResponsiveOnClick?: ({ item }: { item: T }) => void;
}) => {
	const { expandedRows } = useDataGridContext<T>();
	const { subRowDataKey, keyField } = gridProps;

	const isSubRow = subRowDataKey && row[subRowDataKey] && (row[subRowDataKey] as [])?.length > 0;
	const subRowArray = isSubRow ? (row[subRowDataKey] as T[]) : [];
	const isExpanded = expandedRows.includes(String(row[keyField]));

	return (
		<Fragment>
			{/* Main row */}
			<MobileResponsiveCell
				orderedColumns={orderedColumns}
				row={row}
				gridProps={gridProps}
				mobileResponsiveOnClick={mobileResponsiveOnClick}
			/>
			{/* Subrows - rendered inline */}
			{isSubRow &&
				isExpanded &&
				subRowArray.map((subRow, subIndex) => (
					<div key={`${row[keyField]}-sub-${subIndex}`} className="">
						<MobileResponsiveCell
							orderedColumns={orderedColumns}
							row={subRow}
							gridProps={gridProps}
							mobileResponsiveOnClick={mobileResponsiveOnClick}
							isSubRow={true}
						/>
					</div>
				))}
		</Fragment>
	);
};

export default MobileRowComponent;
