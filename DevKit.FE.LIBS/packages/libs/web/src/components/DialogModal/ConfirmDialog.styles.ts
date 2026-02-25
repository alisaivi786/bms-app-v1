import clsx from 'clsx';
import { TConfirmDialogVariant } from './ConfirmDialog';

const isDesktopView = (isMobile: boolean) => clsx(isMobile ? 'text-start' : 'text-center');
const titleH = (variant: TConfirmDialogVariant) =>
	clsx(variant === 'none' || typeof variant === 'undefined' ? 'mt-2' : 'mt-0');
const modalClassName = 'relative';
const dialogWrapper = 'flex flex-col items-center justify-center gap-4 p-5';

const textWrapper = 'flex flex-col items-center gap-4';

const titleClassNames = (isMobile: boolean, variant: TConfirmDialogVariant) =>
	clsx('w-full font-bold text-title', isDesktopView(isMobile), titleH(variant));

const subTitleClassName = (isMobile: boolean) => clsx('font-bold text-paragraph', isDesktopView(isMobile));
const descriptionClassName = (isMobile: boolean) => clsx('text-paragraph', isDesktopView(isMobile));

const helperTextClassNames = 'text-caption2 font-bold text-start';
const subHelperTextClassNames = 'text-caption2 text-start';
const textContainer = 'flex flex-col w-full gap-1';
const closeIconWrapper = (isMobile: boolean) => clsx('absolute', isMobile ? 'right-4' : 'right-0');
const closeIconContainerClassName =
	'flex items-center justify-center p-2 rounded-md cursor-pointer h-7 w-7 bg-gray-100 text-gray-600 hover:text-gray-500';
const closeIconClassName = 'text-title3';
const errorVariant = 'w-16 h-14 text-red-500';
const warningVariant = 'w-16 h-14 text-yellow-500';
const mobileIcon = 'w-16  h-14 nj-text-brand';
const successIconWrapper = 'flex items-center justify-center w-16 h-16 rounded-full bg-green-500';
const checkMarkCircleFillIcon = 'w-16 h-14 text-green-500';
const buttonGroupWrapper = (orientation: 'horizontal' | 'vertical', isMobile?: boolean) =>
	clsx(
		'flex w-full justify-center gap-4',
		isMobile && 'flex-col',
		!isMobile && (orientation === 'horizontal' ? 'flex-row-reverse' : 'flex-col')
	);

export default {
	modalClassName,
	dialogWrapper,
	textWrapper,
	titleClassNames,
	subTitleClassName,
	descriptionClassName,
	helperTextClassNames,
	subHelperTextClassNames,
	textContainer,
	closeIconWrapper,
	closeIconContainerClassName,
	closeIconClassName,
	errorVariant,
	warningVariant,
	mobileIcon,
	successIconWrapper,
	checkMarkCircleFillIcon,
	buttonGroupWrapper,
};
