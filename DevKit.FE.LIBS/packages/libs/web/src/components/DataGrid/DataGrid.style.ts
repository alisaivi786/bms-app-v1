import clsx from 'clsx';
import { IDataGridBaseProps } from './types';

type headerColumnProps<T, TKey extends keyof T> = {
	tableVariant: IDataGridBaseProps<T, TKey>['tableVariant'];
};

export const dataGridStyle = <T, TKey extends keyof T>(props: headerColumnProps<T, TKey>) => {
	const { tableVariant } = props;

	return clsx('grey-x-scrollbar scrollbar-round-bottom', {
		'overflow-hidden rounded-md border border-gray-300':
			tableVariant === 'default' || tableVariant === 'outlined-border',
		'rounded-none border-0': tableVariant === 'flat' || tableVariant === 'flat-striped',
	});
};
