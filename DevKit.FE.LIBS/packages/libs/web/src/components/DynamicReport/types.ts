import { FieldValues, FormFieldsSchema, FormValidationModeYup, FormValidationModeZod } from '@devkit/utilities';
import { IColumn, IDataGridTableProps, IPagingAndSorting } from '../DataGrid';

export type DynamicReportProps = {
	/** Options that can be passed to the DynamicForm component */
	formOptions?: DynamicReportFormOptions;
	/** The DataGrid options that can be passed to DataGrid component */
	dataGridOptions: DynamicReportDataGridOptions;
	/** Tab List To Render Tabs For The Report */
	tabs?: DynamicReportTab[];
	/** Options that can be passed to the TabNavigation component */
	tabsOptions?: DynamicReportTabsOptions;
	/** The function or api that fetches dataGrid data */
	fetchDataApi: (payload: DynamicReportApiPayload) => Promise<DynamicReportDataApiResponse>;
	/** The function or api that fetches columns and fields */
	fetchFiltersApi: (tab?: number | string) => Promise<DynamicReportFiltersApiResponse>;

	topContent?: JSX.Element;

	bottomContent?: JSX.Element;
};

export type DynamicReportRef = {
	refetchData: (options?: { resetSelection?: boolean; resetPaging?: boolean; }) => Promise<void>;
};

export type DynamicReportApiPayload = {
	searchData?: FieldValues;
	tab?: number | string;
	pagingAndSorting: IPagingAndSorting;
	newSearch?: boolean;
};

export type DynamicReportTab = {
	title: string;
	id: string | number;
};

export type DynamicReportDataApiResponse = {
	/** Columns to be in data table */
	columns: IColumn<Record<string, unknown>, string>[];
	/** The row data for the DataGrid */
	data: Array<Record<string, unknown>>;
	totalItemsCount: number;
};

export type DynamicReportFiltersApiResponse = {
	/** The Dynamic form fields array could be any type of the available field's type a normal TextField, DatePicker, Dropdown, etc. */
	fields: FormFieldsSchema<FieldValues>;
};

export type DynamicReportDataGridOptions = {
	/**Column mapper that takes the columns and returns custom mapped columns and rows */
	additionalColumnMapping?: (
		columns: IColumn<Record<string, unknown>, string>[]
	) => IColumn<Record<string, unknown>, string>[];
	/**Action columns for the DataGrid */
	actions?: IColumn<Record<string, unknown>, string>[];
	/** Handles export and  */
	onExport?: (values: FieldValues) => Promise<void>;
} & Omit<
	IDataGridTableProps<Record<string, unknown>, string, string>,
	'columns' | 'onFetchData' | 'serverSideHandling' | 'onClientDataFilter' | 'onExport'
>;

export type DynamicReportFormOptions = {
	/**	Defines the number of columns to render in each horizontal line and this value will be passed to FormContainer*/
	columnsCount?: number;
	/**	Defines the number of columns to render in each horizontal line for mobile devices and this value will be passed to FormContainer*/
	columnsCountForMobile?: number;
	/** Option to make the form collapse and expand */
	isCollapsable?: boolean;
	/** The validation schema and mode (yup or zod) used to validate the DynamicForm */
	validationSchema?: FormValidationModeYup<FieldValues> | FormValidationModeZod<FieldValues>;
	/** Disables/Enables the search button */
	isSearchDisabled?: boolean;
	/** Disables/Enables the clear button */
	isClearDisabled?: boolean;
	/**Shows/Hides show all button */
	showShowAllButton?: boolean;
	/** Disables/Enables show all button */
	isShowAllDisabled?: boolean;
	/** Pass the current values to the form */
	currentValues?: unknown;
	/** Pass initial values to the form */
	initialValues?: unknown;
	/** Pass current values to the parent */
	onFormSubmit?: (values: FieldValues) => void;
	/** Pass custom function to form reset */
	onFormReset?: () => Promise<void> | void;
	/** Pass a custom function to be triggered when a field value changes */
	onValueChange?: (values: FieldValues) => void;
};

export type DynamicReportTabsOptions = {
	/** Callback function to run when the selected tab is changed */
	onSelectedTabIndexChanged?: (index: number) => void;
	/** Selects the tabs variant */
	variant?: 'filled' | 'filled-dark';
	/** Sets the width for the tab title container */
	titleContainerWidth?: string;
};
