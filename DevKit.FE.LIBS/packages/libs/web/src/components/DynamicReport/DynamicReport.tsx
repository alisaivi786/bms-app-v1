'use client';

import { ForwardedRef, Ref, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { FieldValues, FormFieldsSchema, useReactForm } from '@devkit/utilities';
import { useResponsiveView } from '../../hooks/useResponsiveView';
import { Button } from '../Buttons';
import { CollapsibleForm } from '../CollapsibleForm';
import { DataGrid, IColumn, IDataGridRef, IPagingAndSorting, SortOrder } from '../DataGrid';
import { DynamicForm } from '../DynamicForm';
import { Skeleton } from '../Skeleton';
import { TabNavigation } from '../TabNavigation';
import { DynamicReportProps, DynamicReportRef } from './types';

export function DynamicReport(
	{
		formOptions,
		dataGridOptions,
		tabs,
		tabsOptions,
		fetchDataApi,
		fetchFiltersApi,
		topContent,
		bottomContent,
	}: DynamicReportProps,
	ref: Ref<DynamicReportRef>
) {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
	const [columns, setColumns] = useState<IColumn<Record<string, unknown>, string>[]>([]);
	const [fields, setFields] = useState<FormFieldsSchema<FieldValues>>();
	const [submittedFormValues, setSubmittedFormValues] = useState<FieldValues>({});
	const [filtersLoading, setFiltersLoading] = useState<boolean>(false);

	const defaultPagingAndSorting = dataGridOptions?.defaultPagingAndSortingState ?? {
		paging: { pageNumber: 1, pageSize: 10 },
		sorting: {
			sortOrder: SortOrder.Descending,
			columnName: dataGridOptions?.keyField || '',
		},
	};

	const { sm } = useResponsiveView();

	const reportRef = ref ?? useRef<DynamicReportRef>(null);

	const dataGridRef = useRef<IDataGridRef>(null);

	useImperativeHandle(reportRef, () => ({
		refetchData: async (options) => dataGridRef?.current?.refetchData(options),
	}));

	useEffect(() => {
		handleDataGridFetchFilters(tabs?.[selectedTabIndex]?.id);
	}, []);

	const form = useReactForm<FieldValues>({
		initialValues: formOptions?.initialValues || {},
		currentValues: formOptions?.currentValues || {},
		onFormSubmit: (values) => {
			if (formOptions?.onFormSubmit) formOptions.onFormSubmit(values);

			setSubmittedFormValues(values);
			refetchData();
		},
		onFormReset: () => {
			if (formOptions?.onFormReset) formOptions.onFormReset();

			setSubmittedFormValues({});
			refetchData();
		},
		validateBehavior: 'on-submit',
		...formOptions?.validationSchema,
	});

	const values = form.watchValues();

	useEffect(() => {
		formOptions?.onValueChange?.(values);
	}, [JSON.stringify(values)]);

	const handleDataGridFetchData = async (pagingAndSorting: IPagingAndSorting) => {
		const {
			data: apiData,
			totalItemsCount,
			columns: apiColumns,
		} = await fetchDataApi({
			searchData: form?.getValues(),
			tab: tabs?.[selectedTabIndex]?.id,
			pagingAndSorting,
		});

		setColumns(apiColumns);

		return { data: apiData, totalItemsCount };
	};

	const handleDataGridFetchFilters = async (tab?: string | number) => {
		setFiltersLoading(true);

		const { fields: apiFields } = await fetchFiltersApi(tab);

		setFiltersLoading(false);

		setFields(apiFields);
	};

	const refetchData = () => dataGridRef?.current?.refetchData();

	const actionFields = (
		<div className="flex flex-row items-center justify-center gap-3 mb-4 mx-1 overflow-x-auto mt-6">
			{!filtersLoading && (
				<>
					{formOptions?.showShowAllButton && (
						<Button
							onClick={() => {
								form?.resetForm();
							}}
							variant="primary"
							disabled={formOptions?.isShowAllDisabled}
						>
							Show All
						</Button>
					)}
					<Button onClick={form.submitForm} variant="primary" disabled={formOptions?.isSearchDisabled}>
						Search
					</Button>
					<Button
						onClick={() => {
							form?.resetForm();
						}}
						variant="secondary"
						disabled={formOptions?.isClearDisabled}
					>
						Clear
					</Button>
				</>
			)}
		</div>
	);

	const searchForm = (
		<>
			{filtersLoading ? (
				<div
					className="grid w-full gap-5"
					style={{
						gridTemplateColumns: `repeat(${
							sm ? formOptions?.columnsCountForMobile || 1 : formOptions?.columnsCount || 2
						}, minmax(0, 1fr))`,
					}}
				>
					{[
						...Array(
							!formOptions?.isCollapsable || isExpanded
								? fields?.length
								: sm
								? formOptions?.columnsCountForMobile || 1
								: formOptions?.columnsCount || 2
						).keys(),
					].map((i) => (
						<Skeleton key={i} />
					))}
				</div>
			) : (
				<DynamicForm
					columnsCount={formOptions?.columnsCount}
					form={form}
					columnsCountForMobile={formOptions?.columnsCountForMobile}
					fieldsStructure={
						(formOptions?.isCollapsable
							? fields?.slice(
									0,
									isExpanded
										? fields?.length
										: sm
										? formOptions?.columnsCountForMobile || 1
										: formOptions?.columnsCount || 2
							  )
							: fields) || []
					}
				/>
			)}
			{actionFields}
		</>
	);

	const dataGridColumns = [
		...((dataGridOptions?.additionalColumnMapping ? dataGridOptions?.additionalColumnMapping(columns) : columns) || []),
		...(dataGridOptions?.actions ?? []),
	];

	const Report = (
		<>
			<div className="mb-6">
				{formOptions?.isCollapsable ? (
					<CollapsibleForm
						renderCollapse={searchForm}
						isExpanded={isExpanded}
						onExpandChange={(isExpanded) => setIsExpanded(isExpanded)}
					>
						{searchForm}
					</CollapsibleForm>
				) : (
					searchForm
				)}
			</div>

			{topContent && topContent}

			{dataGridOptions && (
				<DataGrid
					{...dataGridOptions}
					ssr={false}
					serverSideHandling={true}
					columns={dataGridColumns?.length > 0 ? dataGridColumns : []}
					onFetchData={handleDataGridFetchData}
					ref={dataGridRef}
					defaultPagingAndSortingState={defaultPagingAndSorting}
					onExport={
						dataGridOptions.onExport
							? async () => {
									dataGridOptions.onExport && (await dataGridOptions.onExport(submittedFormValues));
							  }
							: undefined
					}
				/>
			)}
			{bottomContent && bottomContent}
		</>
	);

	return (
		<>
			{tabs?.length ? (
				<TabNavigation
					tabs={tabs?.map((tab) => ({
						title: tab?.title,
						tabPanel: () => <>{Report}</>,
					}))}
					onSelectedTabIndexChanged={(index) => {
						setSelectedTabIndex(index);
						form?.resetForm();
						tabsOptions?.onSelectedTabIndexChanged && tabsOptions?.onSelectedTabIndexChanged(index);
						//refetch filters
						handleDataGridFetchFilters(tabs?.[index]?.id);
					}}
					variant={tabsOptions?.variant || 'filled'}
					selectedTabIndex={selectedTabIndex}
					titleContainerWidth={tabsOptions?.titleContainerWidth || '100%'}
				/>
			) : (
				<>{Report}</>
			)}
		</>
	);
}

export default forwardRef(DynamicReport) as (
	props: DynamicReportProps & {
		ref?: ForwardedRef<DynamicReportRef>;
	}
) => ReturnType<typeof DataGrid>;
