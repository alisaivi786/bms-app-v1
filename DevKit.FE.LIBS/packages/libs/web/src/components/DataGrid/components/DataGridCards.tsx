import { Fragment } from 'react';
import { useWebUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import { Card } from '../../Card';
import { useDataGridContext } from '../Context/DataGridContext';
import useGetRows from '../hooks/useGetRows';
import { IDataGridProps } from '../types';

export const DataGridCards = <T, TAction extends string, TKey extends keyof T>({
	gridProps,
}: {
	gridProps: IDataGridProps<T, TKey, TAction>;
}) => {
	const { serverSideHandling, onRenderItem, numberOfColumns, keyField, hidePaging, emptyDataMessage } = gridProps;
	const { fetchedDataState } = useDataGridContext<T>();

	const dataToRender = fetchedDataState.filteredData;
	const { isRtlLocale } = useWebUIConfigOptions();
	const { rows } = useGetRows({
		data: dataToRender,
		hidePaging,
		serverSideHandling,
		ssr: gridProps.ssr,
	});

	if (!onRenderItem) return <></>;

	if (rows.length === 0)
		return (
			<Card className="flex items-center justify-center h-80">
				{emptyDataMessage ?? (isRtlLocale ? 'لا توجد سجلات' : 'No Records Found')}
			</Card>
		);

	return (
		<div className="grid gap-5" style={{ gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)` }}>
			{rows.map((row) => (
				<Fragment key={`${row[keyField]}`}>{onRenderItem({ item: row })}</Fragment>
			))}
		</div>
	);
};
