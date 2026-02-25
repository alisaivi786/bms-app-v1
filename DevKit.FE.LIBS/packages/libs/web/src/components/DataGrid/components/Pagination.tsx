import { NextPageIcon, PreviousPageIcon } from '@devkit/icons/web';
import { useResponsiveView } from '../../../hooks/useResponsiveView';
import { useWebUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import { useDataGridContext } from '../Context/DataGridContext';
import '../datatable-react.css';
import { usePagination } from '../hooks/usePagination';

interface Props {
	hidePaging?: boolean | 'show-count-only';
	rowCount: number;
	controlsPadding?: boolean;
	pagingDisclaimer?: React.ReactNode;
}

function Pagination(props: Props) {
	const { hidePaging, rowCount, controlsPadding, pagingDisclaimer } = props;
	const { paging, setPaging } = useDataGridContext();
	const { isRtlLocale } = useWebUIConfigOptions();
	const { pageNumber, pageSize } = paging;
	const pageStart = (pageNumber - 1) * pageSize + 1;
	const pageEnd = pageStart + pageSize <= rowCount ? pageStart + pageSize - 1 : rowCount;

	let nextLabel = <NextPageIcon className="h-2.5 w-2.5" />;
	let previousLabel = <PreviousPageIcon className="h-2.5 w-2.5" />;

	if (isRtlLocale) {
		[nextLabel, previousLabel] = [previousLabel, nextLabel];
	}

	if (hidePaging === 'show-count-only') {
		return <div className="flex-1 py-3">Showing 1 to {rowCount} entries</div>;
	}

	if (hidePaging === true) {
		return <></>;
	}
	const emptyGridSettings =
		rowCount === 0
			? {
					showing: 'opacity-0',
					pageCount: 1,
			  }
			: {
					showing: '',
					pageCount: Math.ceil(rowCount / pageSize),
			  };

	const emptyGridPaginationSitting =
		Math.ceil(rowCount / pageSize) <= 1 ? 'dg-pagination dg-disabled-pagination' : 'dg-pagination';
	const pagesCount = Math.ceil(rowCount / pageSize);

	const onPageChange = (newPageNumber: number) => {
		setPaging({
			pageNumber: newPageNumber,
			pageSize: paging.pageSize,
		});
	};

	const { sm: isMobile } = useResponsiveView();

	const paginationRange = usePagination({
		pageNumber,
		rowCount,
		pageSize,
		siblingCount: isMobile ? 1 : 2,
		isMobile,
	});

	const paginationLabel = `${isRtlLocale ? 'عرض' : 'Showing'} ${pageStart}-${pageEnd} ${
		isRtlLocale ? 'من' : 'of'
	} ${rowCount}`;

	return (
		<div className={`flex w-full items-center gap-4 ${controlsPadding ? 'px-16' : ''}`}>
			<div className={`flex-1 dg-paging-content ${emptyGridSettings.showing} ${isMobile ? 'w-1/2' : ''}`}>
				<div className="flex items-center gap-2">
					{paginationLabel}
					{pagingDisclaimer && <div>{pagingDisclaimer}</div>}
				</div>
			</div>

			{/* Paging */}
			<ul className={emptyGridPaginationSitting}>
				{/* Previous Button */}
				<li
					className={pageNumber == 1 ? 'previous disabled cursor-not-allowed' : 'previous cursor-pointer'}
					onClick={() => {
						pageNumber !== 1 && onPageChange(pageNumber - 1);
					}}
				>
					<a role="button" className={pageNumber == 1 ? ' text-gray-500' : ' nj-text-brand'}>
						{previousLabel}
					</a>
				</li>
				{/* Page numbers */}
				{paginationRange?.map((a, i) => {
					if (a === '...') {
						return (
							<li className=" nj-text-brand" key={i}>
								{a}
							</li>
						);
					}

					return (
						<li key={i} className={pageNumber == a ? 'selected ' : ' nj-text-brand'}>
							<a
								role="button"
								onClick={() => {
									onPageChange(a as number);
								}}
							>
								{a}
							</a>
						</li>
					);
				})}

				{/* Next Button */}
				<li
					className={pageNumber == pagesCount ? 'next disabled cursor-not-allowed' : 'next cursor-pointer'}
					onClick={() => {
						pageNumber !== pagesCount && onPageChange(pageNumber + 1);
					}}
				>
					<a role="button">{nextLabel}</a>
				</li>
			</ul>
			{/* Paging */}
		</div>
	);
}

export default Pagination;
