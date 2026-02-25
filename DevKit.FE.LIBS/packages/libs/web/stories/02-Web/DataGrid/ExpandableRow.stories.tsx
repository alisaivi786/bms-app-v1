import { useEffect, useRef, useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@devkit/icons/web';
import { formatDate } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Button } from '../../../src/components/Buttons';
import { DataGrid, IDataGridProps, IDataGridRef, SortOrder } from '../../../src/components/DataGrid';

type ColumnsType = {
	icName?: string;
	lastDate?: string;
	policyType?: string;
	groupPeriod?: string;
	totalUpload?: number;
	accepted?: number;
	pendingByICP?: number;
	acceptedByIcp?: number;
	rejectedByIcp?: number;
	field?: keyof ColumnsType;
	frozen?: string;
	permissions?: string[];
	hidden?: boolean;
	keyField?: string;
	expandable?: boolean;
	lastColumnFixed?: boolean;
	width?: string;
	subGroup?: ColumnsType[];
};

type ComponentType = (
	args: IDataGridProps<ColumnsType, 'icName', string> & {
		columns: ColumnsType;
	}
) => JSX.Element;

// Component to render the insurance company name with dependent link
const InsuranceCompanyCell = ({
	row,
	onExpandRow,
	onCollapseRow,
	isExpanded,
}: {
	row: ColumnsType;
	onExpandRow: (row: ColumnsType) => void;
	onCollapseRow: (row: ColumnsType) => void;
	isExpanded: boolean;
}) => {
	const dependentCount = row.subGroup?.length || 0;

	if (!dependentCount) {
		return <div>{row.icName}</div>;
	}

	return (
		<div className="flex flex-col">
			<div>{row.icName}</div>
			<button
				className="text-left text-sm text-brand-500 hover:text-brand-600 underline"
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();

					if (isExpanded) {
						onCollapseRow(row);
					} else {
						onExpandRow(row);
					}
				}}
			>
				{isExpanded ? 'Hide Dependent' : `+${dependentCount} Dependent`}
			</button>
		</div>
	);
};

const Template: StoryFn<ComponentType> = (args) => {
	const gridRef = useRef<IDataGridRef>(null);

	const [isExpanded, setIsExpanded] = useState(true);

	const handleExpandRow = <T,>(row: T) => {
		gridRef?.current?.expandRow(row);
	};

	const handleCollapseRow = <T,>(row: T) => {
		gridRef?.current?.collapseRow(row);
	};

	// Create columns with handleExpandRow when hideExpandColumn is true
	const columnsWithCustomCell = args.hideExpandColumn
		? args.columns.map((col) => {
				if (col.field === 'icName') {
					return {
						...col,
						cellRender: (row: ColumnsType) => {
							const expandedRows = gridRef.current?.getExpandedRows() || [];
							const isRowExpanded = expandedRows.includes(String(row.icName));

							return (
								<InsuranceCompanyCell
									row={row}
									onExpandRow={handleExpandRow}
									onCollapseRow={handleCollapseRow}
									isExpanded={isRowExpanded}
								/>
							);
						},
					};
				}

				return col;
		  })
		: args.columns;

	useEffect(() => {
		if (!isExpanded) {
			gridRef?.current?.expandAllSubRows();
		} else {
			gridRef?.current?.collapseAllSubRows();
		}
	}, [isExpanded]);

	return (
		<div className="flex flex-col gap-24 p-5">
			<DataGrid
				defaultPagingAndSortingState={{
					paging: { pageSize: 10, pageNumber: 1 },
					sorting: { columnName: 'iCName', sortOrder: 1 },
				}}
				{...args}
				columns={columnsWithCustomCell}
				ref={gridRef}
				onSort={(column: string, sortOrder: SortOrder) => {
					alert(`'${column}' need sort with order ${sortOrder}`);
				}}
				extraActions={() => (
					<Button
						variant="secondary"
						iconStart={!isExpanded ? ArrowUpIcon : ArrowDownIcon}
						onClick={() => setIsExpanded(!isExpanded)}
					>
						{!isExpanded ? 'Collapse All' : 'Expand All'}
					</Button>
				)}
				onMobileResponsiveRender={({ item }) => (
					<div className="w-full h-full">Injected Custom component{item.icName}</div>
				)}
			/>
		</div>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Data Grid',
	component: Template,
	argTypes: {
		tableVariant: {
			control: 'select',
			options: ['default', 'without-border'],
			defaultValue: 'default',
		},
	},
};

export default StoryMeta;

const useCaseData = [
	{
		icName: 'Islamic Arab Insurance Co Salama',
		totalUpload: 400,
		accepted: 0,
		pendingByICP: 0,
		acceptedByIcp: 350,
		rejectedByIcp: 50,
		lastDate: '2024-08-12T20:00:00.000Z',
		subGroup: [
			{
				policyType: 'Company',
				groupPeriod: '2023',
				totalUpload: 100,
				accepted: 0,
				pendingByICP: 0,
				acceptedByIcp: 50,
				rejectedByIcp: 50,
				lastDate: '2024-08-12T20:00:00.000Z',
			},
			{
				policyType: 'Individuals / Family',
				groupPeriod: '2023',
				totalUpload: 100,
				accepted: 0,
				pendingByICP: 0,
				acceptedByIcp: 100,
				rejectedByIcp: 0,
				lastDate: '2024-08-12T20:00:00.000Z',
			},
			{
				policyType: 'Government',
				groupPeriod: '2022',
				totalUpload: 200,
				accepted: 0,
				pendingByICP: 0,
				acceptedByIcp: 200,
				rejectedByIcp: 0,
				lastDate: '2024-08-12T20:00:00.000Z',
			},
		],
	},
	{
		icName: 'Abu Dhabi National Insurance Co',
		groupPeriod: '2023',
		totalUpload: 64,
		accepted: 0,
		pendingByICP: 0,
		acceptedByIcp: 63,
		rejectedByIcp: 0,
		subGroup: [
			{
				policyType: 'Company',
				groupPeriod: '2023',
				totalUpload: 100,
				accepted: 0,
				pendingByICP: 0,
				acceptedByIcp: 100,
				rejectedByIcp: 0,
				lastDate: '2024-08-12T20:00:00.000Z',
			},
			{
				policyType: 'Government',
				groupPeriod: '2022',
				totalUpload: 200,
				accepted: 0,
				pendingByICP: 0,
				acceptedByIcp: 200,
				rejectedByIcp: 0,
				lastDate: '2024-08-12T20:00:00.000Z',
			},
		],
	},
	{
		icName: 'Abu Dhabi National Takaful Co PSC',
		groupPeriod: '2023',
		totalUpload: 20,
		accepted: 0,
		pendingByICP: 0,
		acceptedByIcp: 19,
		rejectedByIcp: 0,
		lastDate: '2024-08-12T20:00:00.000Z',
	},
	{
		icName: 'Adamjee Insurance Co Ltd',
		groupPeriod: '2023',
		totalUpload: 3,
		accepted: 0,
		pendingByICP: 0,
		acceptedByIcp: 3,
		rejectedByIcp: 0,
		lastDate: '2024-08-12T20:00:00.000Z',
	},

	{
		icName: 'Al Ain Al Ahlia Insurance',
		groupPeriod: '2023',
		totalUpload: 4,
		accepted: 0,
		pendingByICP: 0,
		acceptedByIcp: 4,
		rejectedByIcp: 0,
		lastDate: '2024-08-12T20:00:00.000Z',
	},
	{
		icName: 'Al Buhaira National Insurance',
		groupPeriod: '2023',
		totalUpload: 1,
		accepted: 0,
		pendingByICP: 0,
		acceptedByIcp: 1,
		rejectedByIcp: 0,
		lastDate: '2024-08-12T20:00:00.000Z',
	},
	{
		icName: 'Al Dhafra Insurance',
		groupPeriod: '2023',
		totalUpload: 2,
		accepted: 0,
		pendingByICP: 0,
		acceptedByIcp: 2,
		rejectedByIcp: 0,
		lastDate: '2024-08-12T20:00:00.000Z',
	},
	{
		icName: 'Al Fujairah National Insurance Co',
		groupPeriod: '2023',
		totalUpload: 2,
		accepted: 0,
		pendingByICP: 0,
		acceptedByIcp: 2,
		rejectedByIcp: 0,
	},
	{
		icName: 'Al Sagr National Insurance (ASNIC)',
		groupPeriod: '2023',
		totalUpload: 29,
		accepted: 0,
		pendingByICP: 0,
		acceptedByIcp: 29,
		rejectedByIcp: 0,
	},
	{
		icName: 'Al Wathba National Insurance Co',
		groupPeriod: '2023',
		totalUpload: 4,
		accepted: 0,
		pendingByICP: 0,
		acceptedByIcp: 4,
		rejectedByIcp: 0,
	},
	{
		icName: 'Islamic Arab Insurance Co Salama',
		totalUpload: 100,
		accepted: 0,
		pendingByICP: 0,
		acceptedByIcp: 100,
		rejectedByIcp: 0,
		lastDate: '2024-08-12T20:00:00.000Z',
		subGroup: [
			{
				policyType: 'Company',
				groupPeriod: '2023',
				totalUpload: 10,
				accepted: 0,
				pendingByICP: 0,
				acceptedByIcp: 10,
				rejectedByIcp: 0,
				lastDate: '2024-08-12T20:00:00.000Z',
			},
			{
				policyType: 'Individuals / Family',
				groupPeriod: '2023',
				totalUpload: 100,
				accepted: 0,
				pendingByICP: 0,
				acceptedByIcp: 100,
				rejectedByIcp: 0,
				lastDate: '2024-08-12T20:00:00.000Z',
			},
			{
				policyType: 'Government',
				groupPeriod: '2022',
				totalUpload: 200,
				accepted: 0,
				pendingByICP: 0,
				acceptedByIcp: 200,
				rejectedByIcp: 0,
				lastDate: '2024-08-12T20:00:00.000Z',
			},
		],
	},
];

export const ExpandableRow: StoryObj<ComponentType> = {
	args: {
		keyField: 'icName',
		columns: [
			{
				field: 'icName',
				name: 'Insurance Company',
				sortable: true,
				hideWhenSubRow: true,
			},
			{
				field: 'policyType',
				name: 'Policy Type',
				width: '180px',
			},
			{
				field: 'groupPeriod',
				sortable: true,
				name: 'Group Period',
			},
			{
				field: 'lastDate',
				name: 'Last Action Date',
				sortable: true,
				cellRender: (row) => {
					if (row.lastDate) return <div>{formatDate(row.lastDate)}</div>;

					return null;
				},
			},
			{
				field: 'totalUpload',
				name: 'Total Upload',
				sortable: true,
			},
			{
				field: 'accepted',
				name: 'Accepted',
				sortable: true,
			},
			{
				field: 'pendingByICP',
				name: 'Pending ICP Upload',
				sortable: true,
			},
			{
				field: 'acceptedByIcp',
				name: 'Accepted by ICP',
				sortable: true,
			},
			{
				field: 'rejectedByIcp',
				name: 'Rejected by ICP',
				sortable: true,
			},
		],

		onFetchData: async () => useCaseData,
		subRowDataKey: 'subGroup',
		enableSelection: true,
	},
};

export const ExpandableRowWithHiddenArrowAndPagingDisclaimer: StoryObj<ComponentType> = {
	args: {
		keyField: 'icName',
		columns: [
			{
				field: 'icName',
				name: 'Insurance Company',
				sortable: true,
				hideWhenSubRow: true,
			},
			{
				field: 'policyType',
				name: 'Policy Type',
				width: '180px',
			},
			{
				field: 'groupPeriod',
				sortable: true,
				name: 'Group Period',
			},
			{
				field: 'lastDate',
				name: 'Last Action Date',
				sortable: true,
				cellRender: (row) => {
					if (row.lastDate) return <div>{formatDate(row.lastDate)}</div>;

					return null;
				},
			},
			{
				field: 'totalUpload',
				name: 'Total Upload',
				sortable: true,
			},
			{
				field: 'accepted',
				name: 'Accepted',
				sortable: true,
			},
			{
				field: 'pendingByICP',
				name: 'Pending ICP Upload',
				sortable: true,
			},
			{
				field: 'acceptedByIcp',
				name: 'Accepted by ICP',
				sortable: true,
			},
			{
				field: 'rejectedByIcp',
				name: 'Rejected by ICP',
				sortable: true,
			},
		],

		onFetchData: async () => useCaseData,
		subRowDataKey: 'subGroup',
		enableSelection: true,
		hideExpandColumn: true, // Hide the expand column arrow
		pagingDisclaimer: (
			<div className="flex items-center gap-3">
				<span className="text-caption1 font-normal text-gray-600">|</span>
				<span className="text-caption1 font-normal text-gray-600">
					Expand rows programmatically using the buttons above
				</span>
			</div>
		),
		pageSizePosition: 'bottom',
	},
};
