import { useState } from 'react';
import { DownloadIcon, SfArrowTriangle2CirclepathIcon } from '@devkit/icons/web';
import { ButtonDropdown } from '../../ButtonDropdown';
import Button from '../../Buttons/Button';
import { useDataGridContext } from '../Context/DataGridContext';
import { IDataGridProps } from '../types';
import { PageSizeOptions } from './PageSizeOptions';

export const Actions = <T, TAction extends string, TKey extends keyof T>({
	gridProps,
}: {
	gridProps: IDataGridProps<T, TKey, TAction>;
}) => {
	const {
		columns,
		extraActions,
		hidePaging,
		onExport,
		enableRefresh,
		controlsPadding,
		allowPageSizeChange = true,
		pageSizePosition = 'top',
		allowColumnSelection,
		selectedColumnsEffectExport = false,
		tableVariant,
	} = gridProps;
	const [isExportLoading, setIsExportLoading] = useState(false);
	const { fetchedDataState, setPaging, paging, visibleColumns, setVisibleColumns, availableColumns } =
		useDataGridContext();

	const dataToRender = fetchedDataState?.filteredData;

	const showRefresh = enableRefresh;
	const showExport = dataToRender.length > 0 && onExport;
	const shouldHidePaging = dataToRender.length === 0 || hidePaging;
	const showPageSizeOptions = allowPageSizeChange && pageSizePosition === 'top';

	const downloadFile = async () => {
		try {
			setIsExportLoading(true);

			if (onExport) {
				selectedColumnsEffectExport ? await onExport(visibleColumns) : await onExport();
			}

			setIsExportLoading(false);
		} catch {
			setIsExportLoading(false);
		}
	};

	if (
		!extraActions &&
		!showRefresh &&
		!showExport &&
		(!showPageSizeOptions || shouldHidePaging) &&
		availableColumns.length === 0
	)
		return <></>;

	return (
		<div
			className={`flex items-center gap-2 !text-caption1 !font-normal text-gray-600 ${controlsPadding ? 'px-16' : ''} ${
				tableVariant === 'flat' && 'dg-paging-container-spacing'
			}`}
		>
			{showPageSizeOptions && <PageSizeOptions gridProps={gridProps} />}
			<div className="flex gap-2 flex-1 items-center justify-end w-full">
				<div
					className={`flex items-center gap-2 ${
						showRefresh || showExport ? 'flex-grow md:flex-grow-0 md:flex-shrink-0 ' : ''
					}`}
				>
					{showRefresh && (
						<div
							className="cursor-pointer text-h1 nj-text-brand hover:text-brand-400"
							onClick={async () => {
								setPaging({ pageNumber: 1, pageSize: paging.pageSize }, true);
							}}
						>
							<SfArrowTriangle2CirclepathIcon />
						</div>
					)}
					{allowColumnSelection && columns && columns?.length > 0 && (
						<div className="z-50">
							<ButtonDropdown
								options={
									columns?.map((col) => ({
										id: col.name as string,
										label: col.name,
										section: col.section,
										group: col.group,
									})) ?? []
								}
								value={visibleColumns}
								onApplyClick={(setCols) => setVisibleColumns(setCols)}
								label="Column Selector"
								validation="min-one"
							/>
						</div>
					)}
					{showExport && (
						<Button
							isLoading={isExportLoading}
							iconStart={DownloadIcon}
							onClick={() => downloadFile()}
							layoutClassName={['w-full', 'md:w-auto']}
							variant="secondary"
						>
							Export
						</Button>
					)}
				</div>
				<div className={`hidden sm:flex ${showRefresh || showExport ? '' : 'flex-grow justify-end'}`}>
					{extraActions?.({ isDataLoaded: fetchedDataState?.filteredData?.length > 0 })}
				</div>
			</div>
		</div>
	);
};
