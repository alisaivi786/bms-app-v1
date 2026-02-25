import clsx from 'clsx';
import { SwitchSize } from './ToggleSwitch';

const switchContainer = (size: SwitchSize, checked?: boolean, disabled?: boolean, isRtlLocale?: boolean) =>
	clsx(
		checked ? 'nj-bg-brand' : 'bg-gray-600',
		disabled && 'opacity-50',
		'relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ',
		isRtlLocale ? 'flex-row-reverse' : 'flex-row',
		size === 'small' && 'h-6 w-10',
		size === 'medium' && 'h-8 w-14',
		size === 'large' && 'h-10 w-18',
		isRtlLocale ? '-rotate-180' : 'rotate-0'
	);

const switchSpanContainer = (checked?: boolean) =>
	clsx(
		checked ? 'translate-x-full' : 'translate-x-0',
		'pointer-events-none inline-block h-full w-1/2 rounded-full bg-white ring-0 transition-transform duration-200 ease-in-out'
	);

export default { switchContainer, switchSpanContainer };
