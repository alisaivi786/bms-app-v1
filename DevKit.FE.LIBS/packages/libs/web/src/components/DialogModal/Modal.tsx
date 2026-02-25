'use client';

import clsx from 'clsx';
import { Fragment, ReactNode, useRef } from 'react';
import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { CloseIcon } from '@devkit/icons/web';
import { DevkitSimpleBar } from '../../common/devkitSimpleBar';
import { useResponsiveView } from '../../hooks/useResponsiveView';
import { BottomSheet } from './BottomSheet';

export type TModalVariant = 'tiny' | 'small' | 'medium' | 'large' | 'extraLarge' | 'fullScreen';

const WIDTH_VARIANT: Record<TModalVariant, string> = {
	tiny: 'w-[28.75rem]',
	small: 'w-130',
	medium: 'w-[45.7rem]',
	large: 'w-250',
	extraLarge: 'w-full',
	fullScreen: 'w-full',
};

export interface IModalProps {
	/** Title of the Modal */
	title?: ReactNode;
	/** React elements to be rendered beside the title*/
	subTitle?: ReactNode;
	titlePosition?: 'start' | 'end' | 'center';
	/**  If true, the close icon will be shown.  */
	hasCloseICon?: boolean;
	/**  If true, the divider in the header will be shown.  */
	hasDivider?: boolean;
	/** Description of the Modal*/
	description?: ReactNode;
	/** If true, the Modal will be shown. */
	isOpen: boolean;
	/**React elements to be rendered  */

	children?: ReactNode;
	/**  callback function that implements closing/hiding the modal within another action   */
	onClose?: () => Promise<void> | void;
	/** Override or extend the styles applied to the component */
	className?: string;
	/** Variant (tiny, small, medium, or large)*/
	variant?: TModalVariant;
	/** Footer of the Modal*/
	footer?: ReactNode;
	/**  The position of the Modal will be either in the center or at the top. */
	position?: 'center' | 'top';
	/** height of the Modal.*/
	height?: string;
	/** If true, click outside of the modal is enabled; otherwise false */
	preventOutsideClick?: boolean;
	/**To Load more options in ase of lazy load*/
	onScrollEndReach?: () => void;
	/** The unique key to re render */
	contentKey?: string;
	/** If true, the BottomSheet scroll bar in content will be hidden. */
	hideBottomSheetContentScroll?: boolean;
}

const BASE_CLASS = 'flex flex-row flex-grow items-center gap-4';

const TITLE_CLASS = {
	['start']: clsx(BASE_CLASS, 'justify-start'),
	['end']: clsx(BASE_CLASS, 'justify-end'),
	['center']: clsx(BASE_CLASS, 'justify-center'),
};

const ModalHeader = ({
	title,
	subTitle,
	hasCloseICon = false,
	hasDivider = true,
	onClose,
	titlePosition = 'start',
}: IModalProps) => {
	return (
		<>
			<div className="flex items-start justify-between gap-5">
				<div className={TITLE_CLASS[titlePosition]}>
					<h1 className="font-bold text-title">{title}</h1>
					{subTitle && <div className="h-5 rotate-180 bg-gray-200 border-l" />}
					{subTitle}
				</div>
				{hasCloseICon && (
					<div
						className="flex items-center justify-center p-2 text-gray-600 bg-gray-100 rounded-md cursor-pointer h-7 w-7 hover:text-gray-500"
						onClick={onClose}
					>
						<CloseIcon className="text-title3" />
					</div>
				)}
			</div>
			{hasDivider && <div className="flex justify-end border-t border-t-gray-200" />}
		</>
	);
};

const ModalContent = ({ children, description }: { description?: ReactNode; children: ReactNode }) => {
	return (
		<>
			{description && <Dialog.Description className="text-paragraph">{description}</Dialog.Description>}
			{children}
		</>
	);
};

export const DialogPanel = (props: IModalProps) => {
	const { description, footer, children, className, title, subTitle, variant, hasCloseICon } = props;

	return (
		<div className={`flex max-h-full flex-1 flex-col gap-4 ${className}`}>
			{(title || subTitle || hasCloseICon) && <ModalHeader {...props} />}
			<div className={`flex-auto max-h-full ${variant == 'fullScreen' ? '' : 'p-2 -m-2'}  overflow-hidden`}>
				<ModalContent description={description}>{children}</ModalContent>
			</div>
			{!!footer && <div>{footer}</div>}
		</div>
	);
};

export const Modal = (props: IModalProps) => {
	const { isOpen, onClose, position = 'center', variant = 'tiny', height, preventOutsideClick = false } = props;
	const { sm: isMobile } = useResponsiveView();
	const containerRef = useRef(null);

	if (isMobile && variant !== 'fullScreen') return <BottomSheet {...props} />;

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-modal"
				onClose={!preventOutsideClick && onClose ? onClose : () => undefined}
				initialFocus={containerRef}
			>
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/25" />
				</TransitionChild>

				<div className="fixed inset-0 justify-center w-full h-full overflow-hidden no-radius-scrollbar">
					<DevkitSimpleBar className="h-full">
						<TransitionChild
							enter="transition ease-in-out duration-300 transform"
							enterFrom="translate-y-full md:transform-none md:opacity-0"
							enterTo="translate-y-0 md:transform-none"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-y-0 md:transform-none md:opacity-100 md:scale-100"
							leaveTo="translate-y-full md:transform-none md:opacity-0 md:scale-9"
						>
							<div
								className={`flex min-h-[100dvH] ${
									variant != 'fullScreen' ? 'md:py-24 md:px-16 ' : ''
								} md:justify-center translate ${position === 'top' ? '' : 'items-end md:items-center'}`}
							>
								<div ref={containerRef} />
								<div className={`${WIDTH_VARIANT[variant]} max-w-full`}>
									<Dialog.Panel
										as="div"
										style={{
											height: height,
											maxHeight: variant == 'fullScreen' ? '100dvH' : height ? 'calc(100vh - 12rem)' : undefined,
										}}
										className={clsx(
											'flex flex-col w-full gap-4 bg-white text-start',
											variant === 'tiny' && 'p-3',
											variant !== 'fullScreen' && variant !== 'tiny' && 'p-4 lg:p-6',
											variant !== 'fullScreen' && 'rounded-tl-2xl rounded-tr-2xl md:rounded-2xl shadow-default'
										)}
									>
										<DialogPanel {...props} />
									</Dialog.Panel>
								</div>
							</div>
						</TransitionChild>
					</DevkitSimpleBar>
				</div>
			</Dialog>
		</Transition>
	);
};
