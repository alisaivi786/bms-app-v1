import clsx from 'clsx';
import { ReactNode, useEffect, useId, useRef } from 'react';
import { BottomSheet as ModalBottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { CloseIcon } from '@devkit/icons/web';
import { Divider } from '../Divider';
import { IModalProps } from './Modal';
import './bottom-sheet.css';

interface IBottomSheetContentProps {
	description?: ReactNode;
	onScrollEndReach?: Pick<IModalProps, 'onScrollEndReach'>['onScrollEndReach'];
	children: ReactNode;
}

const BottomSheetContent = ({ children, description, onScrollEndReach }: IBottomSheetContentProps) => {
	const onScrollEndReachRef = useRef(onScrollEndReach);
	const scrollElementRef = useRef<HTMLElement | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		onScrollEndReachRef.current = onScrollEndReach;
	}, [onScrollEndReach]);

	useEffect(() => {
		const handleScroll = (event: Event) => {
			const element = (scrollElementRef.current || event.target) as HTMLElement;

			if (!element || typeof onScrollEndReachRef.current !== 'function') return;

			const EPSILON = 4;
			const scrollTop = element.scrollTop;
			const clientHeight = element.clientHeight;
			const scrollHeight = element.scrollHeight;
			const isEndReached = scrollTop + clientHeight >= scrollHeight - EPSILON;

			if (isEndReached) {
				onScrollEndReachRef.current();
			}
		};

		const attachScrollListener = () => {
			if (scrollElementRef.current) return;

			const elem = containerRef.current?.closest('[data-rsbs-scroll]') as HTMLElement;

			if (elem) {
				scrollElementRef.current = elem;
				elem.addEventListener('scroll', handleScroll, { passive: true });
			}
		};

		attachScrollListener();

		return () => {
			if (scrollElementRef.current) {
				scrollElementRef.current.removeEventListener('scroll', handleScroll);
				scrollElementRef.current = null;
			}
		};
	}, []);

	return (
		<div ref={containerRef}>
			{description && <div className="text-paragraph">{description}</div>}
			{children}
		</div>
	);
};

const BottomSheetHeader = ({ title, hasDivider = true, hasCloseICon = false, onClose }: IModalProps) => {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-start justify-between gap-5">
				{title ? <div className="font-bold text-title"> {title}</div> : null}
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
		</div>
	);
};

type BottomSheetProps = Omit<IModalProps, 'heigh'>;

export const BottomSheet = (props: BottomSheetProps) => {
	const bottomSheetRef = useRef(null);
	const {
		isOpen,
		onClose,
		title,
		subTitle,
		footer,
		description,
		children,
		preventOutsideClick = false,
		onScrollEndReach,
		hideBottomSheetContentScroll,
	} = props;

	const id = useId();

	return (
		<ModalBottomSheet
			id={id}
			className={clsx(
				'fixed z-modal top-0 left-0 right-0 bottom-0 bottom-sheet-container data-[rsbs-state=closing]:pointer-events-auto',
				{ 'disable-click-outside': preventOutsideClick },
				{ 'hide-content-scroll': hideBottomSheetContentScroll }
			)}
			open={isOpen}
			onDismiss={onClose}
			initialFocusRef={false}
			ref={bottomSheetRef}
			header={(title || subTitle) && <BottomSheetHeader {...props} />}
			footer={!!footer && <div>{footer}</div>}
			snapPoints={({ minHeight, maxHeight }) => [Math.min(minHeight, maxHeight / 1.18)]}
		>
			<div className="p-4 py-2">
				<BottomSheetContent description={description} onScrollEndReach={onScrollEndReach}>
					{children}
				</BottomSheetContent>
			</div>
			{footer && (
				<div className="px-4">
					<Divider className="bg-gray-200" />
				</div>
			)}
		</ModalBottomSheet>
	);
};
