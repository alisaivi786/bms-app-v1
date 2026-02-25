import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import useFetchDataOperations from '../hooks/useFetchDataOperations';
import {
	IColumn,
	IColumnsWidth,
	IDataGridContext,
	IDataGridProps,
	IDataGridTableProps,
	IExpandableCell,
	IPaging,
	ISorting,
	SortOrder,
	TSelectAllVariant,
} from '../types';

const initialState: IDataGridContext<unknown> = {
	paging: { pageNumber: 1, pageSize: 10 },
	sorting: { columnName: '', sortOrder: 2 },
	columnsWidth: [],
	selectedRows: [],
	expandableCell: {},
	freezeColumnsWidth: false,
	allRowsSelected: false,
	setPaging: () => undefined,
	setSorting: () => undefined,
	resetData: () => undefined,
	setColumnsWidth: () => undefined,
	setSelectedRows: () => undefined,
	selectPageRows: () => undefined,
	selectAllRows: () => undefined,
	setExpandableCell: () => undefined,
	setFreezeColumnsWidth: () => undefined,
	refreshServerSideData: async () => undefined,
	resetServerSideData: async () => undefined,
	fetchedDataState: {
		data: [],
		filteredData: [],
		isError: false,
		isLoading: false,
		serverDataIsFetched: false,
		totalItemsCount: 0,
	},
	collapseAllSubRows: () => undefined,
	expandAllSubRows: () => undefined,
	expandRow: () => undefined,
	collapseRow: () => undefined,
	expandedRows: [],
	setExpandedRow: () => undefined,
	visibleColumns: [],
	setVisibleColumns: () => undefined,
	availableColumns: [],
};

const dataGridContext = createContext(initialState);

type DataGridProviderProps<T, TKey extends keyof T, TAction extends string> = IDataGridProps<T, TKey, TAction> & {
	children: ReactNode;
	selectAllVariant?: TSelectAllVariant;
};

export const DataGridProvider = <T, TKey extends keyof T, TAction extends string>(
	props: DataGridProviderProps<T, TKey, TAction>
) => {
	const {
		children,
		onSelectedRowsChange,
		noFetchOnPageLoad,
		defaultPagingAndSortingState,
		onPagingAndSortingStateChanged,
		serverSideHandling,
		defaultSelectedRows,
		selectAllVariant = 'default',
		selectableRowDisabled,
		keyField,
		selectedColumns,
		onSelectedColumnsChange,
	} = props;
	const columns = (props as IDataGridTableProps<T, TKey, TAction>).columns ?? [];
	const availableColumns: IColumn<T, TAction>[] = columns.filter((col) => !col.hidden && !col.isAction);

	const [pagingState, setPagingState] = useState<IPaging>({
		...initialState.paging,
		...defaultPagingAndSortingState?.paging,
	});

	const paging = props.ssr ? props.defaultPagingAndSortingState?.paging ?? initialState.paging : pagingState;
	const setPaging = !props.ssr ? setPagingState : undefined;

	const [sortingState, setSortingState] = useState<ISorting>({
		...initialState.sorting,
		...defaultPagingAndSortingState?.sorting,
	});

	const sorting = props.ssr ? props.defaultPagingAndSortingState?.sorting ?? initialState.sorting : sortingState;
	const setSorting = !props.ssr ? setSortingState : undefined;

	const [freezeColumnsWidth, setFreezeColumnsWidth] = useState<boolean>(initialState.freezeColumnsWidth);
	const [expandableCell, setExpandableCell] = useState<IExpandableCell>(initialState.expandableCell);
	const [columnsWidth, setColumnsWidth] = useState<IColumnsWidth[] | []>(initialState.columnsWidth);
	const [selectedRows, setSelectedRows] = useState<T[]>(defaultSelectedRows ?? (initialState.selectedRows as T[]));
	const [allRowsSelected, setAllRowsSelected] = useState(false);
	const [expandedRows, setExpandedRows] = useState<string[]>([]);
	const [visibleColumns, setVisibleColumns] = useState<string[]>(selectedColumns ?? columns?.map((c) => c.name) ?? []);
	const { actions, fetchedDataState } = useFetchDataOperations(props);

	useEffect(() => {
		if (selectedColumns) {
			setVisibleColumns(selectedColumns);
		}
	}, [selectedColumns]);

	const values: IDataGridContext<T> = {
		paging,
		sorting,
		columnsWidth,
		selectedRows,
		expandableCell,
		freezeColumnsWidth,
		allRowsSelected,
		selectableRowDisabled,
		setSorting(newSorting, clientHandlingDataServerRefetch = false) {
			const newPaging = { ...paging, pageNumber: 1 };

			setPaging?.(newPaging);
			setSorting?.(newSorting);
			onPagingAndSortingStateChanged?.({
				sorting: newSorting,
				paging: newPaging,
			});
			actions.refreshServerSideData({
				paging: newPaging,
				sorting: newSorting,
				clientHandlingDataServerRefetch,
			});
		},
		setPaging(newPaging, clientHandlingDataServerRefetch = false, resetSelection = false, newSearch = false) {
			setPaging?.(newPaging);

			if (resetSelection) {
				setSelectedRows(defaultSelectedRows ?? []);
				setAllRowsSelected(false);
				onSelectedRowsChange?.([], false);
			}

			onPagingAndSortingStateChanged?.({ sorting, paging: newPaging });
			actions.refreshServerSideData({
				paging: newPaging,
				sorting,
				clientHandlingDataServerRefetch,
				newSearch,
			});
		},
		resetData(clientHandlingDataServerRefetch = false) {
			const newPaging = {
				pageNumber: 1,
				pageSize: paging.pageSize,
			};

			const newSorting = {
				columnName: '',
				sortOrder: SortOrder.Descending,
			};

			setPaging?.(newPaging);
			setSorting?.(newSorting);
			onPagingAndSortingStateChanged?.({
				sorting: newSorting,
				paging: newPaging,
			});
			setSelectedRows([]);
			setExpandedRows([]);
			setAllRowsSelected(false);
			onSelectedRowsChange?.([], false);

			actions.resetServerSideData({
				paging: newPaging,
				sorting: newSorting,
				clientHandlingDataServerRefetch,
			});
		},
		setColumnsWidth(index, columnWidth) {
			setColumnsWidth((columnsWidth) => {
				const columnsState = [...columnsWidth];
				const stateIndex = columnsState.findIndex((w) => w.index === index);

				if (stateIndex > -1) {
					columnsState[stateIndex] = {
						index: index,
						width: columnWidth,
					};
				} else {
					columnsState.push({ index: index, width: columnWidth });
				}

				return columnsState;
			});
		},
		setSelectedRows(currentRow, keyField, checked) {
			setSelectedRows((prev) => {
				let res;

				if (checked) {
					res = uniq([...prev, currentRow]);
				} else {
					res = prev.filter((r) => r[keyField] !== currentRow[keyField]);
				}

				const allRowsSelected = serverSideHandling
					? res.length + (fetchedDataState.filteredData.filter((el) => selectableRowDisabled?.(el)).length ?? 0) ===
					  fetchedDataState.totalItemsCount
					: res.length + (fetchedDataState.data.filter((el) => selectableRowDisabled?.(el)).length ?? 0) ===
					  fetchedDataState.data.length;

				onSelectedRowsChange?.(res, allRowsSelected);

				setAllRowsSelected(allRowsSelected);

				return res;
			});
		},
		selectPageRows(pageRows, keyField, checked) {
			setSelectedRows((prev) => {
				let res;

				if (checked) {
					res = uniqBy([...prev, ...pageRows], keyField);
				} else {
					res = selectedRows.filter((p) => !pageRows.find((sr) => sr[keyField] === p[keyField]));
				}

				if (selectableRowDisabled) {
					res = res.filter((el) => !selectableRowDisabled(el));
				}

				const allRowsSelected = serverSideHandling
					? res.length + (fetchedDataState.filteredData.filter((el) => selectableRowDisabled?.(el)).length ?? 0) ===
					  fetchedDataState.totalItemsCount
					: res.length + (fetchedDataState.data.filter((el) => selectableRowDisabled?.(el)).length ?? 0) ===
					  fetchedDataState.data.length;

				onSelectedRowsChange?.(res, allRowsSelected);

				setAllRowsSelected(allRowsSelected);

				return res;
			});
		},
		selectAllRows(checked, rows) {
			let res: T[] = [];

			if (checked && rows && !serverSideHandling) {
				res = [...(rows ?? [])].filter((el) => !selectableRowDisabled?.(el));
			} else {
				res = [];
			}

			onSelectedRowsChange?.(res, checked);
			setSelectedRows(res);
			setAllRowsSelected(checked);
		},
		setExpandableCell(expandableCell) {
			setExpandableCell(expandableCell);
		},
		setFreezeColumnsWidth,
		fetchedDataState,
		refreshServerSideData: (props) => actions.refreshServerSideData({ ...props, paging, sorting }),
		resetServerSideData: (props) => actions.resetServerSideData({ ...props, paging, sorting }),
		selectAllVariant,
		collapseAllSubRows() {
			setExpandedRows([]);
		},
		expandAllSubRows(rowKeyFields) {
			setExpandedRows(rowKeyFields);
		},
		expandRow(row) {
			setExpandedRows((prev) => [...prev, String(row[keyField])]);
		},
		collapseRow(row) {
			setExpandedRows((prev) => prev.filter((i) => i !== String(row[keyField])));
		},
		expandedRows,
		setExpandedRow(currentKeyField, checked) {
			setExpandedRows((prev) => {
				let res;

				if (checked) {
					res = uniq([...prev, currentKeyField]);
				} else {
					res = prev.filter((r) => r !== currentKeyField);
				}

				return res;
			});
		},
		visibleColumns,
		setVisibleColumns: (newColumns: string[]) => {
			const areEqual =
				newColumns.length === visibleColumns.length &&
				[...newColumns].sort().toString() === [...visibleColumns].sort().toString();

			if (!areEqual) {
				setVisibleColumns(newColumns);
				onSelectedColumnsChange?.(newColumns);
			}
		},
		availableColumns,
	};

	useEffect(() => {
		if (!noFetchOnPageLoad) {
			actions.refreshServerSideData({
				paging,
				sorting,
				clientHandlingDataServerRefetch: true,
				newSearch: true,
			});
		}
	}, []);

	return <dataGridContext.Provider value={values as IDataGridContext<unknown>}>{children}</dataGridContext.Provider>;
};

export const useDataGridContext = <T,>() => {
	return useContext(dataGridContext) as IDataGridContext<T>;
};
