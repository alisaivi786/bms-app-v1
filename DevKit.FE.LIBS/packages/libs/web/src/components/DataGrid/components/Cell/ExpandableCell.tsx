import { useEffect, useRef, useState } from 'react';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@devkit/icons/web';
import { useDataGridContext } from '../../Context/DataGridContext';
import { IExpandableCell } from '../../types';

interface Props<T> {
	currentRow: T;
	expandableCell: IExpandableCell;
	cellWidth?: string;
	rowIndex: number;
	columnIndex: number;
	cellFormat: (row: T) => JSX.Element;
}

function ExpandableCell<T>(props: Props<T>) {
	const { currentRow, expandableCell, cellWidth, rowIndex, columnIndex, cellFormat } = props;
	const eleRef = useRef<HTMLDivElement>(null);
	const [showExpandIcon, setShowExpandIcon] = useState(false);
	const { setExpandableCell } = useDataGridContext<T>();

	const isCurrentExpanded = expandableCell.columnIndex === columnIndex && expandableCell.rowIndex === rowIndex;

	const onClickExpand = () => {
		if (isCurrentExpanded) {
			setExpandableCell({ columnIndex: -1, rowIndex: -1 });
		} else {
			setExpandableCell({ rowIndex, columnIndex });
		}
	};

	useEffect(() => {
		if (eleRef.current && eleRef.current.scrollWidth > eleRef.current.offsetWidth) {
			setShowExpandIcon(true);
		}
	}, [eleRef.current]);

	return (
		<div className="flex w-full items-start">
			<div
				ref={eleRef}
				className={`overflow-hidden text-ellipsis 
        ${isCurrentExpanded ? '' : ' whitespace-nowrap'} `}
				style={{ width: cellWidth }}
			>
				{cellFormat(currentRow)}
			</div>

			{showExpandIcon && (
				<div className="px-4 py-1.5 hover:cursor-pointer nj-text-brand" onClick={onClickExpand}>
					{isCurrentExpanded ? <ArrowLongLeftIcon /> : <ArrowLongRightIcon />}
				</div>
			)}
		</div>
	);
}

export default ExpandableCell;
