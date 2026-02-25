import { useWebUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import { Dropdown } from '../../Dropdown';
import { useDataGridContext } from '../Context/DataGridContext';
import { IDataGridProps } from '../types';

export const PageSizeOptions = <T, TAction extends string, TKey extends keyof T>({
	gridProps,
}: {
	gridProps: IDataGridProps<T, TKey, TAction>;
}) => {
	const { hidePaging } = gridProps;

	const { isRtlLocale } = useWebUIConfigOptions();

	const { fetchedDataState } = useDataGridContext();
	const dataToRender = fetchedDataState?.filteredData;

	const shouldHidePaging = dataToRender.length === 0 || hidePaging;

	const { setPaging, paging } = useDataGridContext();

	const pageSizeOptions = gridProps.pageSizeOptions ?? [10, 50, 100];
	const pageSizeDropdownArray = pageSizeOptions.map((size) => ({ name: String(size), value: size }));

	return (
		<div
			className={`hidden sm:flex items-center gap-2 dg-paging-content ${
				shouldHidePaging ? 'pointer-events-none opacity-75' : 'visible'
			}`}
		>
			<div>{isRtlLocale ? 'عرض' : 'Show'}</div>
			<div className="w-20">
				<Dropdown
					size="small"
					options={pageSizeDropdownArray}
					valueKey="value"
					labelKey="name"
					onChange={(value) => {
						setPaging({
							pageNumber: 1,
							pageSize: (value as 10 | 50 | 100) ?? 10,
						});
					}}
					value={paging.pageSize}
					isSearchable={false}
					isClearable={false}
				/>
			</div>
			<div>{isRtlLocale ? 'مدخلات' : 'entries'}</div>
		</div>
	);
};
