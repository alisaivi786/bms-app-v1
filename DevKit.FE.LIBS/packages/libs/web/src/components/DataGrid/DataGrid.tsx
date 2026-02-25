import clsx from 'clsx';
import { ForwardedRef, Ref, forwardRef, useImperativeHandle, useState } from 'react';
import { useHTMLElementObserver } from '../../hooks/useHTMLElementObserver';
import { DataGridProvider, useDataGridContext } from './Context/DataGridContext';
import { dataGridStyle } from './DataGrid.style';
import { Actions } from './components/Actions';
import { DataGridCards } from './components/DataGridCards';
import { DataGridTable } from './components/DataGridTable';
import LoadingError from './components/LoadingError';
import LoadingSkeleton from './components/LoadingSkeleton';
import { PageSizeOptions } from './components/PageSizeOptions';
import Pagination from './components/Pagination';
import { IDataGridProps, IDataGridRef } from './types';

const DataGridWrapper = <T, TAction extends string, TKey extends keyof T>(
	props: IDataGridProps<T, TKey, TAction>,
	ref: Ref<IDataGridRef>
) => {
	const {
		hidePaging,
		onRenderItem,
		onMobileResponsiveRender,
		serverSideHandling,
		noDataLoadedMessage = 'Start By Searching',
		loadingErrorMessage,
		columns = [],
		numberOfColumns = 1,
		allowPageSizeChange = true,
		pageSizePosition = 'top',
		controlsPadding,
		pagingDisclaimer,
		loadingOptions,
		tableVariant = 'default',
		emptyDataMessage,
		extraActions,
		keyField,
		container: Container = DataGridDefaultContainer,
	} = props;

	const [tableDimensions, setTableDimensions] = useState<{
		width: number;
		height: number;
	}>({ width: 0, height: 0 });
	const { contentRef } = useHTMLElementObserver<HTMLDivElement>({
		onChange: (element) => {
			if (element) {
				const { width, height } = element.getBoundingClientRect();

				setTableDimensions({ width, height });
			}
		},
	});

	const {
		setPaging,
		selectAllRows,
		paging,
		fetchedDataState,
		refreshServerSideData,
		resetData,
		collapseAllSubRows,
		expandAllSubRows,
		expandRow,
		collapseRow,
		expandedRows,
	} = useDataGridContext();

	const { isError, isLoading, totalItemsCount, filteredData, serverDataIsFetched } = fetchedDataState;

	const rowCount = props.ssr ? props.totalCount : serverSideHandling ? totalItemsCount : filteredData.length;

	useImperativeHandle(
		ref,
		() => {
			return {
				removeSelection: () => {
					selectAllRows(false);
				},
				refetchData: async ({
					clientHandlingDataServerRefetch = false,
					resetSelection = true,
					resetPaging = true,
				} = {}) => {
					setPaging(
						{
							pageNumber: resetPaging ? 1 : paging.pageNumber,
							pageSize: paging.pageSize,
						},
						clientHandlingDataServerRefetch,
						resetSelection,
						true
					);
				},
				refreshCurrentDataPage: async ({ clientHandlingDataServerRefetch = false } = {}) => {
					await refreshServerSideData({
						clientHandlingDataServerRefetch,
						newSearch: true,
					});
				},
				resetData: async ({ clientHandlingDataServerRefetch = false } = {}) => {
					resetData(clientHandlingDataServerRefetch);
				},
				collapseAllSubRows: () => {
					collapseAllSubRows();
				},
				expandAllSubRows: () => {
					const keyFields = filteredData.map((data) => String((data as T)[keyField]));

					expandAllSubRows(keyFields);
				},
				expandRow: (row) => {
					expandRow(row);
				},
				collapseRow: (row) => {
					collapseRow(row);
				},
				getExpandedRows: () => {
					return expandedRows;
				},
			};
		},
		[selectAllRows, setPaging]
	);

	if (!serverDataIsFetched && serverSideHandling)
		return (
			<div className="flex items-center justify-center w-full h-64 p-5 font-medium text-gray-600 text-caption1">
				<div className="text-paragraph">{noDataLoadedMessage}</div>
			</div>
		);

	if (isError) {
		return <LoadingError loadingErrorMessage={loadingErrorMessage} />;
	}

	if (isLoading) {
		return (
			<div className={`relative w-full ${loadingOptions?.renderItem ? 'h-auto' : 'h-64'}`}>
				<LoadingSkeleton
					noOfColumns={onRenderItem ? numberOfColumns : columns.length}
					noOfRows={loadingOptions?.numberOfRows}
					onRenderItemLoading={loadingOptions?.renderItem}
				/>
			</div>
		);
	}

	if (typeof emptyDataMessage !== 'string' && typeof emptyDataMessage !== 'undefined' && rowCount === 0) {
		return <>{emptyDataMessage}</>;
	}

	return (
		<>
			{onMobileResponsiveRender && (
				<div className="relative flex sm:hidden flex-col gap-5 ">
					<Actions gridProps={props} />

					<Container>
						<div
							className={dataGridStyle({
								tableVariant,
							})}
						>
							<div ref={contentRef} className="overflow-x-auto">
								<DataGridTable
									gridProps={props}
									tabletWidth={tableDimensions.width}
									tableHeight={tableDimensions.height}
								/>
							</div>
						</div>
					</Container>

					{extraActions?.({ isDataLoaded: fetchedDataState?.filteredData?.length > 0 })}

					<Pagination
						hidePaging={hidePaging}
						rowCount={rowCount}
						controlsPadding={controlsPadding}
						pagingDisclaimer={pagingDisclaimer}
					/>
				</div>
			)}
			<div className={clsx('relative sm:flex flex-col gap-4', onMobileResponsiveRender ? 'hidden sm:block' : 'flex')}>
				<Actions gridProps={props} />

				<Container>
					{!onRenderItem && (
						<div
							className={dataGridStyle({
								tableVariant,
							})}
						>
							<div ref={contentRef} className="overflow-x-auto">
								<DataGridTable
									gridProps={props}
									tabletWidth={tableDimensions.width}
									tableHeight={tableDimensions.height}
								/>
							</div>
						</div>
					)}
					{onRenderItem && <DataGridCards gridProps={props} />}
				</Container>

				<div className={`flex items-center ${tableVariant === 'flat' && 'dg-paging-container-spacing'}`}>
					{allowPageSizeChange && pageSizePosition === 'bottom' && (
						<div className="me-auto hidden sm:block">
							<div className="flex items-center gap-2">
								<PageSizeOptions gridProps={props} />
								{pagingDisclaimer && <div>{pagingDisclaimer}</div>}
							</div>
						</div>
					)}

					<div className={`flex-1 ${allowPageSizeChange && pageSizePosition === 'bottom' ? 'sm:flex-none' : ''}`}>
						<Pagination
							hidePaging={hidePaging}
							rowCount={rowCount}
							controlsPadding={controlsPadding}
							pagingDisclaimer={pageSizePosition !== 'bottom' ? pagingDisclaimer : undefined}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

const DataGridWrapperWithRef = forwardRef(DataGridWrapper) as unknown as <
	T,
	TAction extends string,
	TKey extends keyof T
>(
	props: IDataGridProps<T, TKey, TAction> & {
		ref?: ForwardedRef<IDataGridRef>;
	}
) => ReturnType<typeof DataGridWrapper>;

export function DataGrid<T, TAction extends string, TKey extends keyof T>(
	props: IDataGridProps<T, TKey, TAction>,
	ref: Ref<IDataGridRef>
) {
	return (
		<DataGridProvider {...props}>
			<DataGridWrapperWithRef {...props} ref={ref} />
		</DataGridProvider>
	);
}

export default forwardRef(DataGrid) as unknown as <T, TAction extends string, TKey extends keyof T>(
	props: IDataGridProps<T, TKey, TAction> & {
		ref?: ForwardedRef<IDataGridRef>;
	}
) => ReturnType<typeof DataGrid>;

const DataGridDefaultContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
