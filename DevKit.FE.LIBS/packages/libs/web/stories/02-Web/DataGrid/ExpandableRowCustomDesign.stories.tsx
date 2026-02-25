import { useEffect, useRef, useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@devkit/icons/web';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Button } from '../../../src/components/Buttons';
import { DataGrid, IColumn, IDataGridProps, IDataGridRef, SortOrder } from '../../../src/components/DataGrid';

type ColumnsType = {
	memberID?: string;
	memberFullName?: string;
	genderId?: string;
	dateOfBirth?: string;
	relationshipId?: string;
	memberTypeId?: string;
	nationalityId?: string;
	maritalStatusId?: string;
	insuranceCategory?: string;
	visaFileNumber?: string;
	visaIssueDate?: string;
	passportNumber?: string;
	salaryBandId?: string;
	emailAddress?: string;
	mobileNumber?: string;
	visaTypeId?: string;
	field?: keyof ColumnsType;
	frozen?: string;
	permissions?: string[];
	hidden?: boolean;
	keyField?: string;
	expandable?: boolean;
	lastColumnFixed?: boolean;
	width?: string;
	dependents?: ColumnsType[];
};

type ComponentType = (
	args: IDataGridProps<ColumnsType, 'memberID', string> & {
		columns: IColumn<ColumnsType, string>[];
	}
) => JSX.Element;

// Component to render the member name with dependent link
const MemberNameCell = ({
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
	const dependentCount = row.dependents?.length || 0;

	if (!dependentCount) {
		return <div>{row.memberFullName}</div>;
	}

	return (
		<div className="flex flex-col">
			<div>{row.memberFullName}</div>
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
	const columnsWithCustomCell =
		args.hideExpandColumn && args.columns
			? args.columns.map((col: IColumn<ColumnsType, string>) => {
					if (col.field === 'memberFullName') {
						return {
							...col,
							cellRender: (row: ColumnsType) => {
								const expandedRows = gridRef.current?.getExpandedRows() || [];
								const isRowExpanded = expandedRows.includes(String(row.memberID));

								return (
									<MemberNameCell
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
			: args.columns || [];

	useEffect(() => {
		if (!isExpanded) {
			gridRef?.current?.expandAllSubRows();
		} else {
			gridRef?.current?.collapseAllSubRows();
		}
	}, [isExpanded]);

	const mobileResponsiveRender = ({ item, isExpanded }: { item: ColumnsType; isExpanded: boolean }) => {
		return (
			<div className="w-full flex flex-col gap-2">
				<div className="w-full flex items-center gap-2 text-paragraph">
					<div className="flex-1 truncate">
						{item.memberFullName}
						{!!item.memberFullName && item.dependents?.length && (
							<div className="flex items-center gap-2 justify-start">
								<button
									className="text-paragraph text-gray-600"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();

										if (isExpanded) {
											handleCollapseRow(item);
										} else {
											handleExpandRow(item);
										}
									}}
								>
									{isExpanded ? 'Hide Dependents' : `+${item.dependents?.length} Dependents`}
								</button>
							</div>
						)}
					</div>
					<div className="flex-1 truncate">{item.memberTypeId}</div>
				</div>
			</div>
		);
	};

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
				onMobileResponsiveRender={mobileResponsiveRender}
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
		memberID: 'EMP001',
		memberFullName: 'Ahmad Al Mahmoud',
		genderId: 'Male',
		dateOfBirth: '1985-05-15T00:00:00.000Z',
		relationshipId: 'Self',
		memberTypeId: 'Employee',
		nationalityId: 'UAE',
		maritalStatusId: 'Married',
		insuranceCategory: 'Premium',
		visaFileNumber: 'VF001234',
		visaIssueDate: '2023-01-15T00:00:00.000Z',
		passportNumber: 'A12345678',
		salaryBandId: 'Band_A',
		emailAddress: 'ahmad.mahmoud@company.com',
		mobileNumber: '+971501234567',
		visaTypeId: 'Employment',
		dependents: [
			{
				memberID: 'DEP001',
				memberFullName: 'Fatima Al Mahmoud',
				genderId: 'Female',
				dateOfBirth: '1990-03-20T00:00:00.000Z',
				relationshipId: 'Spouse',
				memberTypeId: 'Dependent',
				nationalityId: 'UAE',
				maritalStatusId: 'Married',
				insuranceCategory: 'Premium',
				emailAddress: 'fatima.mahmoud@email.com',
				mobileNumber: '+971509876543',
			},
			{
				memberID: 'DEP002',
				memberFullName: 'Omar Al Mahmoud',
				genderId: 'Male',
				dateOfBirth: '2015-08-10T00:00:00.000Z',
				relationshipId: 'Child',
				memberTypeId: 'Dependent',
				nationalityId: 'UAE',
				insuranceCategory: 'Premium',
			},
		],
	},
	{
		memberID: 'EMP002',
		memberFullName: 'Sarah Johnson',
		genderId: 'Female',
		dateOfBirth: '1988-12-03T00:00:00.000Z',
		relationshipId: 'Self',
		memberTypeId: 'Employee',
		nationalityId: 'USA',
		maritalStatusId: 'Single',
		insuranceCategory: 'Standard',
		visaFileNumber: 'VF002345',
		visaIssueDate: '2023-03-10T00:00:00.000Z',
		passportNumber: 'B87654321',
		salaryBandId: 'Band_B',
		emailAddress: 'sarah.johnson@company.com',
		mobileNumber: '+971502345678',
		visaTypeId: 'Employment',
		dependents: [
			{
				memberID: 'DEP003',
				memberFullName: 'Emily Johnson',
				genderId: 'Female',
				dateOfBirth: '2018-06-15T00:00:00.000Z',
				relationshipId: 'Child',
				memberTypeId: 'Dependent',
				nationalityId: 'USA',
				insuranceCategory: 'Standard',
			},
		],
	},
	{
		memberID: 'EMP003',
		memberFullName: 'Mohamed Al Rashid',
		genderId: 'Male',
		dateOfBirth: '1982-07-22T00:00:00.000Z',
		relationshipId: 'Self',
		memberTypeId: 'Employee',
		nationalityId: 'UAE',
		maritalStatusId: 'Married',
		insuranceCategory: 'Basic',
		visaFileNumber: 'VF003456',
		visaIssueDate: '2023-02-20T00:00:00.000Z',
		passportNumber: 'C13579246',
		salaryBandId: 'Band_C',
		emailAddress: 'mohamed.rashid@company.com',
		mobileNumber: '+971503456789',
		visaTypeId: 'Employment',
	},
	{
		memberID: 'EMP004',
		memberFullName: 'Jennifer Smith',
		genderId: 'Female',
		dateOfBirth: '1991-11-08T00:00:00.000Z',
		relationshipId: 'Self',
		memberTypeId: 'Employee',
		nationalityId: 'UK',
		maritalStatusId: 'Single',
		insuranceCategory: 'Standard',
		visaFileNumber: 'VF004567',
		visaIssueDate: '2023-04-05T00:00:00.000Z',
		passportNumber: 'D24681357',
		salaryBandId: 'Band_B',
		emailAddress: 'jennifer.smith@company.com',
		mobileNumber: '+971504567890',
		visaTypeId: 'Employment',
	},
	{
		memberID: 'EMP005',
		memberFullName: 'Ali Hassan',
		genderId: 'Male',
		dateOfBirth: '1987-09-14T00:00:00.000Z',
		relationshipId: 'Self',
		memberTypeId: 'Employee',
		nationalityId: 'UAE',
		maritalStatusId: 'Married',
		insuranceCategory: 'Premium',
		visaFileNumber: 'VF005678',
		visaIssueDate: '2023-01-30T00:00:00.000Z',
		passportNumber: 'E97531864',
		salaryBandId: 'Band_A',
		emailAddress: 'ali.hassan@company.com',
		mobileNumber: '+971505678901',
		visaTypeId: 'Employment',
	},
];

export const ExpandableRowCustomDesign: StoryObj<ComponentType> = {
	args: {
		keyField: 'memberID',
		columns: [
			{
				field: 'memberFullName',
				name: 'Member Name',
				sortable: true,
				hideWhenSubRow: true,
			},
			{
				field: 'genderId',
				name: 'Gender',
				width: '100px',
			},
			{
				field: 'dateOfBirth',
				sortable: true,
				name: 'Date of Birth',
			},
			{
				field: 'relationshipId',
				name: 'Relationship',
				sortable: true,
			},
			{
				field: 'memberTypeId',
				name: 'Member Type',
				sortable: true,
			},
			{
				field: 'nationalityId',
				name: 'Nationality',
				sortable: true,
			},
			{
				field: 'emailAddress',
				name: 'Email',
				sortable: true,
			},
			{
				field: 'mobileNumber',
				name: 'Mobile',
				sortable: true,
			},
			{
				field: 'insuranceCategory',
				name: 'Category',
				sortable: true,
			},
		],

		onFetchData: async () => useCaseData,
		subRowDataKey: 'dependents',
		enableSelection: true,
		hideExpandColumn: true,
	},
};
