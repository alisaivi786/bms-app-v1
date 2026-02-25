import React, { ReactElement, ReactNode } from 'react';
import { ComponentPopoverVariantType } from '@devkit/utilities';

export enum SortOrder {
	Ascending = 2,
	Descending = 1,
}

export interface IPagingAndSorting {
	paging: {
		pageSize: number;
		pageNumber: number;
	};
	sorting: {
		columnName: string;
		sortOrder: SortOrder;
	};
}

export interface IColumn<T, TAction extends string> {
	/**
	 * @property field
	 * @default undefined
	 * @description it is used to show the field value automatically. Also it is used for primary sorting if sortIdentifier has no value
	 */
	field?: keyof T;
	name: string;
	headerRender?: () => ReactNode;
	sortable?: boolean;
	isAction?: boolean;
	format?: (row: T) => string;
	width?: string;
	pinned?: boolean;
	onCellClick?: (row: T) => void;
	cellRender?: (row: T) => ReactNode;
	permissions?: TAction[];
	hidden?: boolean;
	expandable?: boolean;
	frozen?: 'left' | 'right';
	popover?: { header: string; description: string; };
	popoverVariant?: ComponentPopoverVariantType;
	/**
	 * @property sortIdentifier
	 * @default undefined
	 * @description  it is used in case of sorting for column is complicated and can depend on the field.
	 * or it gives the sort column the name that is required by api instead of one of the row data type keys
	 * if it is used the sorting should be handled through onSort method for the grid
	 */
	sortIdentifier?: string;
	cellClassName?: (row: T) => string;

	/** Boolean to show/hide the column value in case of sub row */
	hideWhenSubRow?: boolean;

	/**Column Selector Grouping key */
	group?: string;

	/**Column Selector Section key used for separation*/
	section?: string;
}

export interface IGridState<TData> {
	sortingAndPaging: IPagingAndSorting;
	expandedColumn?: keyof TData;
	columnsWidth: { index: number; width: number; }[];
	selectedRows: TData[];
	expandableCell: { rowIndex: number; columnIndex: number; };
	/** used to avoid column flickering because of width change on sorting or change page */
	freezeColumnsWidth: boolean;
}

export interface IFetchedDataState<TData> {
	isError: boolean;
	isLoading: boolean;
	data: TData[];
	filteredData: TData[];
	totalItemsCount: number;
	serverDataIsFetched: boolean;
}

export interface IDataGridStateActions {
	refreshServerSideData: (props: {
		paging: IPaging;
		sorting: ISorting;
		clientHandlingDataServerRefetch: boolean;
		newSearch?: boolean;
	}) => Promise<void>;
	resetServerSideData: (props: {
		paging: IPaging;
		sorting: ISorting;
		clientHandlingDataServerRefetch: boolean;
	}) => void;
}

export interface IPaging {
	pageNumber: number;
	pageSize: number;
}

export interface ISorting {
	columnName: string;
	sortOrder: SortOrder;
}

export interface IColumnsWidth {
	index: number;
	width: number;
}

export interface IExpandableCell {
	rowIndex?: number;
	columnIndex?: number;
}

export interface ISelectedRow {
	[k: string]: string | number | undefined;
}

export interface IDataGridContext<T> {
	paging: IPaging;
	sorting: ISorting;
	columnsWidth: IColumnsWidth[];
	selectedRows: T[];
	expandableCell: IExpandableCell;
	freezeColumnsWidth: boolean;
	setPaging: (
		action: IPaging,
		clientHandlingDataServerRefetch?: boolean,
		resetSelection?: boolean,
		newSearch?: boolean
	) => void;
	resetData: (clientHandlingDataServerRefetch?: boolean) => void;
	setSorting: (action: ISorting, clientHandlingDataServerRefetch?: boolean) => void;
	setColumnsWidth: (index: number, columnWidth: number) => void;
	setSelectedRows: (currentRow: T, keyField: keyof T, checked?: boolean) => void;
	selectPageRows: (pageRows: T[], keyField: keyof T, checked: boolean) => void;
	selectAllRows: (checked: boolean, rows?: T[]) => void;
	setExpandableCell: (expandableCell: IExpandableCell) => void;
	setFreezeColumnsWidth: (action: boolean) => void;
	fetchedDataState: IFetchedDataState<T>;
	refreshServerSideData: (props: { clientHandlingDataServerRefetch: boolean; newSearch: boolean; }) => Promise<void>;
	allRowsSelected: boolean;
	resetServerSideData: (props: { clientHandlingDataServerRefetch: boolean; }) => void;
	selectAllVariant?: TSelectAllVariant;
	selectableRowDisabled?: (row: T) => boolean;
	collapseAllSubRows: () => void;
	setExpandedRow: (currentKeyField: string, checked?: boolean) => void;
	expandAllSubRows: (rowKeyFields: string[]) => void;
	expandRow: (row: T) => void;
	collapseRow: (row: T) => void;
	expandedRows: string[];
	visibleColumns: string[];
	setVisibleColumns: (columns: string[]) => void;
	availableColumns: IColumn<T, string>[];

}

export interface IDataGridRef {
	removeSelection: () => void;
	refetchData: (options?: {
		clientHandlingDataServerRefetch?: boolean;
		resetSelection?: boolean;
		resetPaging?: boolean;
	}) => Promise<void>;
	refreshCurrentDataPage: (options?: { clientHandlingDataServerRefetch?: boolean; }) => Promise<void>;
	resetData: (options?: { clientHandlingDataServerRefetch?: boolean; }) => Promise<void>;
	collapseAllSubRows: () => void;
	expandAllSubRows: () => void;
	expandRow: <T>(row: T) => undefined;
	collapseRow: <T>(row: T) => undefined;
	getExpandedRows: () => string[];
}

export type IOnDataFetchServerHandlingCallBack<T> = (
	pagingAndSortingState: IPagingAndSorting,
	newSearch?: boolean
) => Promise<{ data: T[]; totalItemsCount: number; }>;

export type IOnDataFetchClientHandlingCallBack<T> = () => Promise<T[]>;

export type IOnDataFetchClientFilteringCallBack<T> = (data: T[], newSearch?: boolean) => Promise<T[]>;

export interface IDataGridBaseProps<T, TKey extends keyof T> {
	/** Unique field  */
	keyField: TKey;

	/** function to export the records of data table */
	onExport?: (columns?: string[]) => Promise<void>;

	/** If true, pagination on bottom of the table will be hidden,
	 * If show-count-only, only total record count will be shown.
	 */
	hidePaging?: boolean | 'show-count-only';

	/** variant to reduce the padding in all the table cells
	 * default: padding vertical is 4px
	 * compact: padding vertical is 12px */
	variant?: 'default' | 'compact';

	/** If without-border, table UI will be without border */
	tableVariant?: 'default' | 'flat' | 'outlined-border' | 'flat-striped';

	/** To change header color */
	headerColor?: 'default' | 'brand-50' | 'white';

	/** React node which can have actions to be taken on data records like download, export, mark etc.. */
	extraActions?: ({ isDataLoaded }: { isDataLoaded: boolean; }) => ReactNode;

	/** If true, checkbox for all rows will be enabled */
	enableSelection?: boolean;

	/** Default selected values to be enabled for rows */
	defaultSelectedRows?: T[];

	/** Function which will be called on selection of rows */
	onSelectedRowsChange?: (selectedRows: T[], allRowsSelected?: boolean) => void;

	/** If true, the row will be disabled for selection */
	selectableRowDisabled?: (row: T) => boolean;

	/** Default state of paging(page number and page size) and sorting(sort column, sort order)*/
	defaultPagingAndSortingState?: IPagingAndSorting;

	/** Function which will be called on the change of page and sort */
	onPagingAndSortingStateChanged?: (state: IPagingAndSorting) => void;

	/** Message to show if there is no record in data table
	 *  Can use react element to show in case of no record like an image..
	 */
	emptyDataMessage?: ReactElement | string;

	/** Error message if data is failed to be loaded  */
	loadingErrorMessage?: string;

	/** Message to be shown if there is no data on first load of data table */
	noDataLoadedMessage?: string;

	/** If true, onFetch method will not be called on page load */
	noFetchOnPageLoad?: boolean;

	/** It true, show refresh icon on data table to refresh records */
	enableRefresh?: boolean;

	/** If true, page size can be changed */
	allowPageSizeChange?: boolean;

	/** To control the position of page size selector
	 * default: top
	 * bottom: page size selector will be shown at the bottom of the table
	 */
	pageSizePosition?: 'top' | 'bottom';

	/** To control the padding given to data table */
	controlsPadding?: boolean;

	/** Paging Disclaimer content to display between pagination label and paging controls */
	pagingDisclaimer?: React.ReactNode;

	/** If true, arrow will be hidden on mobile responsive render */
	hideMobileResponsiveDetailsArrow?: boolean;

	/** Key in which the sub row data array will be present */
	subRowDataKey?: keyof T;

	/** If true, the expand column (arrow) will be hidden even when there are sub rows */
	hideExpandColumn?: boolean;

	ssr?: boolean;

	/**
	 * Wrapper component for the table.
	 * Accepts children and returns them wrapped in a custom container
	 */
	container?: React.FC<React.PropsWithChildren>;

	/** If true, the column selection dropdown will be enabled in the actions bar
	 * @default false
	 */
	allowColumnSelection?: boolean;

	/** 
	 * Default selected columns to be visible. 
	 * The values should correspond to the column names.
	 * If not provided, all columns will be visible by default.
	 */
	selectedColumns?: string[];

	/**
	 * Callback function triggered when the selected columns Applied.
	 * Provides the updated list of selected column names.
	 * 
	 * @param columns - An array of column names that are currently selected.
	 */
	onSelectedColumnsChange?: (columns: string[]) => void;

	/**
	 * If true, export will be affected by selected columns
	 * @default false
	 */
	selectedColumnsEffectExport?: boolean;
}

export interface IDataGridClientBaseProps<T, TKey extends keyof T> extends IDataGridBaseProps<T, TKey> {
	ssr?: false;
	/** To handle the data on server side or client side
	 *  If true, data is handled on server otherwise client
	 */
	serverSideHandling?: false;

	/** Function to fetch data for client side handling @deprecated */
	onFetchData: IOnDataFetchClientHandlingCallBack<T>;

	data?: undefined;

	/** To Filter data on client side */
	onClientDataFilter?: IOnDataFetchClientFilteringCallBack<T>;
}

export interface IDataGridClientDataBaseProps<T, TKey extends keyof T> extends IDataGridBaseProps<T, TKey> {
	ssr?: false;
	/** To handle the data on server side or client side
	 *  If true, data is handled on server otherwise client
	 */
	serverSideHandling?: false;

	onFetchData?: undefined;

	/**
	 * Data to be shown in the data grid
	 */
	data: T[];

	/** To Filter data on client side */
	onClientDataFilter?: undefined;
}

export interface IDataGridServerBaseProps<T, TKey extends keyof T> extends IDataGridBaseProps<T, TKey> {
	ssr?: false;
	/** To handle the data on server side or client side
	 *  If true, data is handled on server otherwise client
	 */
	serverSideHandling: true;

	/** Function to fetch data for server side handling */
	onFetchData: IOnDataFetchServerHandlingCallBack<T>;

	/** To Filter data on server side */
	onClientDataFilter?: undefined;
}

export interface IDataGridSSRBaseProps<T, TKey extends keyof T> extends IDataGridBaseProps<T, TKey> {
	serverSideHandling?: false;
	/** To handle the data on server side or client side
	 *  If true, data is handled on server otherwise client
	 */
	ssr: true;

	/**
	 * Data to be shown in the data grid
	 */
	data: T[];
	totalCount: number;
}

export type IDataGridCombinedProps<T, TKey extends keyof T> =
	| IDataGridServerBaseProps<T, TKey>
	| IDataGridClientBaseProps<T, TKey>
	| IDataGridClientDataBaseProps<T, TKey>
	| IDataGridSSRBaseProps<T, TKey>;

export type IDataGridTableProps<T, TKey extends keyof T, TAction extends string> = IDataGridCombinedProps<T, TKey> & {
	/** table title for mobile responsive modal */
	mobileResponsiveModalTitle?: ReactNode;
	/** Columns to be in data table */
	columns: IColumn<T, TAction>[];

	/** Number of columns to be in data table */
	numberOfColumns?: undefined;

	/** Function to be used to render UI of all items instead of table */
	onRenderItem?: undefined;

	/** Function to be used to render Error background color for invalid rows*/
	isRowHasError?: ({ item }: { item: T; }) => boolean;

	/** Function to be used to render UI of all items when mobile responsive */
	onMobileResponsiveRender?: ({ item, isExpanded }: { item: T; isExpanded: boolean; }) => ReactNode;

	/** Function to be used to render UI of header when mobile responsive */
	onMobileResponsiveHeaderRender?: () => ReactNode;

	/** Function to be used to render Error background color of item when mobile responsive */
	isMobileResponsiveCardHasError?: ({ item }: { item: T; }) => boolean;

	/** Function called on click of the mobile responsive arrow icon */
	mobileResponsiveOnClick?: ({ item }: { item: T; }) => void;

	/** Options to show the loader while data is loading
	 *  renderItem is react node element to be displayed loading is in progress
	 *  numberOfRows are the row count to be shown as loader
	 */
	loadingOptions?: { renderItem: React.ReactNode; numberOfRows?: number; };

	/** Function to be called when sorting applies on column */
	onSort?: (columnName: string, sortOrder: SortOrder) => void;

	/** Text or React node to be displayed when selecting all records on the current page
	 *  This will be used when selecting all records on current page or throughout the table
	 */
	getSelectPageText?: (count: number, isUnselect: boolean) => string | React.ReactNode;

	/** Text or React node to be displayed when selecting all records present in the data table
	 *  This will be used when selecting all records on current page or throughout the table
	 */
	getSelectAllText?: (count: number, isUnselect: boolean) => string | React.ReactNode;

	/** String to be append on count of selected rows like 1 record or 10 records
	 *  This will be used when selecting all records on current page or throughout the table
	 */
	getUnitText?: (count: number) => string;

	/** variant for checkbox to select all records
	 * default: checkbox will be displayed and selectable
	 * disabled: checkbox will be displayed but disabled
	 * hidden: checkbox will not be displayed
	 */

	selectAllVariant?: TSelectAllVariant;
	/** Array of numbers which will be shown as a dropdown for page size
 */

	pageSizeOptions?: number[];

};

export type IDataGridCardsProps<T, TKey extends keyof T> = IDataGridCombinedProps<T, TKey> & {
	/** table title for mobile responsive modal */
	mobileResponsiveModalTitle?: string;
	/** Columns to be in data table */
	columns?: undefined;

	/** Number of columns to be in data table */
	numberOfColumns: number;

	/** Function to be used to render UI of all items instead of table */
	onRenderItem: ({ item }: { item: T; }) => ReactNode;

	/** Function to be used to render Error background color for invalid rows*/
	isRowHasError?: ({ item }: { item: T; }) => boolean;

	/** Function to be used to render UI of all items when mobile responsive */
	onMobileResponsiveRender?: ({ item, isExpanded }: { item: T; isExpanded: boolean; }) => ReactNode;

	/** Function to be used to render UI of header when mobile responsive */
	onMobileResponsiveHeaderRender?: () => ReactNode;

	/** Function to be used to render Error background color of item when mobile responsive */
	isMobileResponsiveCardHasError?: ({ item }: { item: T; }) => boolean;

	/** Function called on click of the mobile responsive arrow icon */
	mobileResponsiveOnClick?: ({ item }: { item: T; }) => void;

	/** Options to show the loader while data is loading
	 *  renderItem is react node element to be displayed loading is in progress
	 *  numberOfRows are the row count to be shown as loader
	 */
	loadingOptions?: { renderItem: React.ReactNode; numberOfRows?: number; };

	/** Function to be called when sorting applies on column */
	onSort?: undefined;

	/** Text or React node to be displayed when selecting all records on the current page  */
	getSelectPageText?: (count: number, isUnselect: boolean) => string | React.ReactNode;

	/** Text or React node to be displayed when selecting all records present in the data table  */
	getSelectAllText?: (count: number, isUnselect: boolean) => string | React.ReactNode;

	/** String to be append on count of selected rows like 1 record or 10 records
	 *  This will be used when selecting all records on current page or throughout the table
	 */
	getUnitText?: (count: number) => string;

	/**
	 * Wrapper component for the table.
	 * Accepts children and returns them wrapped in a custom container
	 */
	container?: React.FC<React.PropsWithChildren>;

	/** Array of numbers which will be shown as a dropdown for page size
 */
	pageSizeOptions?: number[];

};

export type TSelectAllVariant = 'default' | 'disabled' | 'hidden';

export type IDataGridProps<T, TKey extends keyof T, TAction extends string> =
	| IDataGridTableProps<T, TKey, TAction>
	| IDataGridCardsProps<T, TKey>;
