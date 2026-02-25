import clsx from 'clsx';
import { ToastPositions } from '@devkit/shared-types';
import { ToastSeverity } from './ToastContext';

const toastIcon = 'h-5 w-5 text-white shrink-0';
const toastInnerContainer = 'flex flex-row items-start justify-start gap-2';
const toastTextContainer = 'flex flex-col gap-1';
const toastTitle = 'nj-toast-title';
const toastDescription = 'mx-8 text-caption1 font-normal text-white';
const toastCloseIcon = 'w-5 h-5 cursor-pointer text-white shrink-0';
const toastContainer = (variant: ToastSeverity) =>
	clsx(
		'flex items-start justify-between gap-2 rounded-md p-4 shadow-default',
		variant === 'warning' && 'bg-yellow-500',
		variant === 'error' && 'bg-red-500',
		variant === 'success' && 'bg-green-500',
		variant === 'info' && 'nj-bg-brand'
	);
const toastTransitionContainer = (position: ToastPositions, className: string) =>
	clsx(
		'lg:max-w-[800px] w-fit fixed z-toast px-2',
		position === 'top-center' && 'top-2 left-0 right-0 m-auto',
		position === 'top-left' && 'top-2 left-2',
		position === 'top-right' && 'top-2 right-2',
		position === 'bottom-center' && 'bottom-2 left-0 right-0 m-auto',
		position === 'bottom-left' && 'bottom-2 left-2',
		position === 'bottom-right' && 'bottom-2 right-2',
		className
	);

export default {
	toastIcon,
	toastInnerContainer,
	toastTextContainer,
	toastTitle,
	toastDescription,
	toastCloseIcon,
	toastTransitionContainer,
	toastContainer,
};
