import { ReactNode } from 'react';
import { Skeleton } from '../../Skeleton/Skeleton';

interface Props {
	noOfColumns: number;
	noOfRows?: number;
	onRenderItemLoading?: ReactNode;
}

function LoadingSkeleton(props: Props) {
	const { noOfColumns, noOfRows = 3, onRenderItemLoading } = props;
	const rows = [];

	// in case of data grid card
	if (onRenderItemLoading) {
		for (let i = 0; i < noOfRows; i++) {
			rows.push(<div key={`row-${i}`}>{onRenderItemLoading}</div>);
		}

		return <div className="flex flex-col gap-5">{rows}</div>;
	}

	// in case of data grid table
	const row = [];

	for (let i = 0; i < noOfColumns; i++) {
		row.push(
			<div className="table-cell px-3 py-2" key={i}>
				<Skeleton />
			</div>
		);
	}

	for (let i = 0; i < noOfRows; i++) {
		rows.push(
			<div className="table-row" key={`row-${i}`}>
				{row}
			</div>
		);
	}

	return (
		<div className="absolute left-0 top-0 h-full w-full bg-white">
			<div className="table w-full">{rows}</div>
		</div>
	);
}

export default LoadingSkeleton;
