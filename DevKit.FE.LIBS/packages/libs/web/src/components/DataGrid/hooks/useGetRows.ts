import drop from 'lodash/drop';
import orderBy from 'lodash/orderBy';
import take from 'lodash/take';
import { useMemo } from 'react';
import { useDataGridContext } from '../Context/DataGridContext';
import { SortOrder } from '../types';

interface Props<T> {
	data: T[];
	serverSideHandling?: boolean;
	hidePaging?: boolean | 'show-count-only';
	ssr?: boolean;
}

function useGetRows<T>(props: Props<T>) {
	const { data, hidePaging, serverSideHandling } = props;
	const { paging, sorting } = useDataGridContext<T>();

	const rows = useMemo(() => {
		if (serverSideHandling || hidePaging || props.ssr) return data;

		return take(
			drop(
				orderBy(
					data,
					[
						(row) => {
							if (typeof row[sorting.columnName as keyof T] === 'string') {
								if (!row[sorting.columnName as keyof T]) return undefined;

								return row[sorting.columnName as keyof T]?.toString().toLowerCase();
							}

							return row[sorting.columnName as keyof T];
						},
					],
					[sorting.sortOrder === SortOrder.Ascending ? 'asc' : 'desc']
				),
				(paging.pageNumber - 1) * paging.pageSize
			),
			paging.pageSize
		);
	}, [paging, sorting, data, serverSideHandling, hidePaging]);

	return { rows };
}

export default useGetRows;
