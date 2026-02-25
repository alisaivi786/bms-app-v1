'use client';

import { Fragment, ReactNode } from 'react';
import { Transition, TransitionChild } from '@headlessui/react';
import { CloseIcon } from '@devkit/icons/web';
import { DevkitSimpleBar } from '../../common/devkitSimpleBar';
import { useResponsiveView } from '../../hooks/useResponsiveView';
import { useWebUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { BottomSheet } from '../DialogModal';

export interface ISlideSheetProps {
	/**  If true, the close icon will be shown.  */
	hasCloseICon?: boolean;
	/** If true, the Modal will be shown. */
	isOpen: boolean;
	/**React elements to be rendered  */
	children?: ReactNode;
	/**  callback function that implements closing/hiding the modal within another action   */
	onClose: () => Promise<void> | void;

	/** Variant (tiny, small, medium, or large)*/
	/** Footer of the Modal*/
	footer?: ReactNode;
	/** If true, click outside of the modal is enabled; otherwise false */
	preventOutsideClick?: boolean;
	/**To Load more options in ase of lazy load*/
	onScrollEndReach?: () => void;
	/** The unique key to re render */
	contentKey?: string;
}

const SlideSheetHeader = ({ hasCloseICon = false, onClose }: ISlideSheetProps) => {
	return (
		<>
			<div className="flex justify-end me-6">
				{hasCloseICon && (
					<div
						className="flex items-center justify-center p-2 text-gray-600 bg-gray-100 rounded-full cursor-pointer h-7 w-7 hover:text-gray-500"
						onClick={onClose}
					>
						<CloseIcon className="text-title3" />
					</div>
				)}
			</div>
		</>
	);
};

export const SlideSheet = (props: ISlideSheetProps) => {
	const { isOpen, onClose, preventOutsideClick = false, children, hasCloseICon, footer } = props;
	const { sm: isMobile } = useResponsiveView();

	const { isRtlLocale } = useWebUIConfigOptions();

	if (isMobile) return <BottomSheet {...props} />;

	return (
		<div
			className={`fixed top-0 z-modal w-screen h-screen ${isOpen ? '' : 'hidden'}`}
			onClick={() => {
				!preventOutsideClick && onClose();
			}}
		>
			<Transition show={isOpen} as={Fragment}>
				<TransitionChild
					enter="transition-opacity ease-linear duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/25" />
				</TransitionChild>

				<div className="fixed inset-0 justify-center w-full h-full overflow-hidden no-radius-scrollbar">
					<div className="h-full">
						<TransitionChild
							enter="transition ease-in-out duration-300 transform"
							enterFrom={isRtlLocale ? '-translate-x-full' : 'translate-x-full'}
							enterTo={isRtlLocale ? 'translate-x-0' : 'translate-x-100'}
							leave="transition ease-in-out duration-300 transform"
							leaveFrom={isRtlLocale ? 'translate-x-0' : 'translate-x-100'}
							leaveTo={isRtlLocale ? '-translate-x-full' : 'translate-x-full'}
						>
							<div className="flex h-full translate md:justify-end">
								<div className="w-[650px] h-full">
									<div className="flex flex-col w-full gap-6 pt-4 bg-white shadow-default text-start h-full">
										{hasCloseICon && <SlideSheetHeader {...props} />}
										<DevkitSimpleBar
											className="grow px-8"
											fixedContent={!!footer && <div className="py-8">{footer}</div>}
										>
											{children}
										</DevkitSimpleBar>
									</div>
								</div>
							</div>
						</TransitionChild>
					</div>
				</div>
			</Transition>
		</div>
	);
};
