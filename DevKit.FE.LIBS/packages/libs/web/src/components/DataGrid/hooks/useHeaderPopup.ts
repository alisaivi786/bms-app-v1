import { useMemo, useState } from 'react';
import { useDataGridContext } from '../Context/DataGridContext';

interface IUseHeaderPopupProps<T> {
	pageRows: T[];
	keyField: keyof T;
	getSelectPageText: (count: number, isUnselect: boolean) => React.ReactNode;
	getSelectAllText: (count: number, isUnselect: boolean) => React.ReactNode;
	rows: T[];
	serverSideHandling?: boolean;
}
function useHeaderPopup<T>(props: IUseHeaderPopupProps<T>) {
	const { pageRows, keyField, getSelectPageText, getSelectAllText, serverSideHandling, rows } = props;

	const {
		selectedRows,
		selectPageRows,
		selectAllRows,
		fetchedDataState,
		allRowsSelected,
		paging,
		selectableRowDisabled,
	} = useDataGridContext<T>();

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const isOnePage = (fetchedDataState?.totalItemsCount ?? 0) <= (paging.pageSize ?? 0);

	const enabledRowsPerPage = useMemo(() => {
		const enabledRows = pageRows.filter((el) => !selectableRowDisabled?.(el));

		return enabledRows;
	}, [pageRows, selectableRowDisabled]);

	const pageSelected = useMemo(() => {
		if (!enabledRowsPerPage.length) {
			return false;
		}

		if (!!pageRows.length && selectableRowDisabled) {
			return enabledRowsPerPage?.every((r) => selectedRows?.some((sr) => sr[keyField] === r[keyField]));
		} else {
			return pageRows?.every((r) => selectedRows?.some((sr) => sr[keyField] === r[keyField]));
		}
	}, [pageRows, enabledRowsPerPage, selectedRows, selectableRowDisabled]);

	const selectPageText = getSelectPageText(enabledRowsPerPage.length, pageSelected);

	const selectAllText = getSelectAllText(
		serverSideHandling ? fetchedDataState?.totalItemsCount : fetchedDataState?.filteredData?.length,
		allRowsSelected
	);

	const onCheckAllForOnePage = () => {
		if (isOnePage) {
			if (serverSideHandling) selectPageRows(pageRows, keyField, !allRowsSelected);
			else {
				const enableRows = [...(rows ?? [])].filter((el) => !selectableRowDisabled?.(el));

				selectAllRows(selectedRows.length !== enableRows.length, rows);
			}

			return;
		}
		setIsMenuOpen(true);
	};

	const onCheckAllFromTooltip = () => {
		if (serverSideHandling) {
			selectAllRows(!allRowsSelected);
		} else {
			let checkedAllValue;

			if (selectableRowDisabled) {
				checkedAllValue = selectedRows.length !== [...(rows ?? [])].filter((el) => !selectableRowDisabled?.(el)).length;
			} else {
				checkedAllValue = selectedRows.length !== rows.length;
			}

			selectAllRows(checkedAllValue, rows);
			setIsMenuOpen(false);
		}
	};

	const onCheckAllForOnePageFromTooltip = () => {
		selectPageRows(pageRows, keyField, !pageSelected);
		setIsMenuOpen(false);
	};

	return {
		isOnePage,
		enabledRowsPerPage,
		pageSelected,
		selectPageText,
		selectAllText,
		isMenuOpen,
		setIsMenuOpen,
		onCheckAllForOnePage,
		onCheckAllFromTooltip,
		onCheckAllForOnePageFromTooltip,
	};
}

export default useHeaderPopup;
