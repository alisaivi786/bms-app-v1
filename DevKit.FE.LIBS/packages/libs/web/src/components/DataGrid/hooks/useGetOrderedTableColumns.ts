import some from 'lodash/some';
import sortBy from 'lodash/sortBy';
import { useMemo } from 'react';
import { useWebUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import { GRID_EXPAND_COLUMN_NAME, GRID_SELECTION_COLUMN_NAME } from '../constants';
import { IColumn } from '../types';

interface Props<T, TAction extends string> {
	columns: IColumn<T, TAction>[];
	enableSelection?: boolean;
	subRowDataKey?: keyof T;
	hideExpandColumn?: boolean;
}

function useGetOrderedTableColumns<T, TAction extends string>(props: Props<T, TAction>) {
	const { columns, enableSelection, subRowDataKey, hideExpandColumn } = props;
	const { superAdminPermissionLevel, currentUserPermissions = [] } = useWebUIConfigOptions();

	const orderedColumns = useMemo(() => {
		const columnsWithSelect = [
			...columns
				.filter((col) => col.pinned)
				.map(
					(col) =>
						({
							...col,
							frozen: 'left',
							width: col.width ?? '64px',
						} as IColumn<T, TAction>)
				),
			...(subRowDataKey && !hideExpandColumn
				? [
						{
							name: GRID_EXPAND_COLUMN_NAME,
							frozen: 'left',
							width: '48px',
						} as IColumn<T, TAction>,
				  ]
				: []),
			...(enableSelection
				? [
						{
							name: GRID_SELECTION_COLUMN_NAME,
							frozen: 'left',
							width: '20px',
						} as IColumn<T, TAction>,
				  ]
				: []),
			...columns.filter((col) => !col.pinned),
		];

		const columnsWithoutHidden = columnsWithSelect.filter(
			(c) =>
				!c.hidden &&
				(!c.permissions ||
					c.permissions.length === 0 ||
					some(
						c.permissions,
						(permission) =>
							currentUserPermissions.includes(permission) ||
							(superAdminPermissionLevel && currentUserPermissions.includes(superAdminPermissionLevel))
					))
		);
		const orderedColumns = sortBy(columnsWithoutHidden, [
			(c) => c.frozen === 'right',
			(c) => !c.frozen,
			(c) => c.frozen === 'left',
		]);

		return orderedColumns;
	}, [columns, enableSelection, superAdminPermissionLevel, currentUserPermissions]);

	return { orderedColumns };
}

export default useGetOrderedTableColumns;
