import { ArrowDownIcon, ArrowUpIcon } from '@devkit/icons/web';
import { SortOrder } from '../../types';

interface ArrowProps {
	sorting: {
		columnName: string;
		sortOrder: SortOrder;
	};
	sortField?: string;
}
function HeaderArrow(props: ArrowProps) {
	const { sorting, sortField } = props;
	const { columnName, sortOrder } = sorting;

	if (columnName !== sortField) {
		return (
			<div className="w-4">
				<ArrowUpIcon width="8px" height="8px" />
				<ArrowDownIcon width="8px" height="8px" />
			</div>
		);
	}

	return (
		<div className="w-4 justify-end">
			<ArrowUpIcon
				width="10px"
				className={`duration-500 ${sortOrder === SortOrder.Ascending ? 'rotate-0  ease-in' : 'rotate-180 ease-out'}`}
			/>
		</div>
	);
}

export default HeaderArrow;
