import clsx from 'clsx';
import { Platform } from 'react-native';

const labelContainer = clsx('w-full flex gap-2 items-center flex-row');

const labelText = (isRtlLocale: boolean) =>
	clsx(
		'text-caption1 text-black font-main-medium leading-normal',
		isRtlLocale ? 'text-right' : 'text-left',
		Platform.OS === 'ios' && 'font-medium'
	);

const isRequiredClassNames = clsx('text-caption1 font-main-medium text-red-500');

export default {
	labelContainer,
	labelText,
	isRequiredClassNames,
};
