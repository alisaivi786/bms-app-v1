import clsx from 'clsx';
import { PropsWithChildren, ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';
import { FullGestureState, useDrag, useGesture } from '@use-gesture/react';
import { useHTMLElementObserver } from '../hooks/useHTMLElementObserver';

export type DevkitSimpleBarRef = {
	scrollTop: (value: number) => void;
};

export const DevkitSimpleBar = forwardRef<
	DevkitSimpleBarRef,
	PropsWithChildren<{
		className?: string;
		tracksZIndex?: 'layout';
		id?: string;
		onScrollEndReach?: () => void;
		disable?: boolean;
		applyOutlinePadding?: boolean;
		scrollSnapType?: 'snap-y';
		onScroll?: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void;
		dragScroll?: boolean;
		fixedContent?: ReactNode;
	}>
>(
	(
		{
			children,
			className = '',
			tracksZIndex,
			id,
			onScrollEndReach,
			disable,
			applyOutlinePadding = false,
			scrollSnapType,
			onScroll,
			dragScroll = false,
			fixedContent,
		},
		ref
	) => {
		const xScrollRef = useRef<HTMLDivElement>(null);
		const yScrollRef = useRef<HTMLDivElement>(null);
		const yTrackRef = useRef<HTMLDivElement>(null);
		const xTrackRef = useRef<HTMLDivElement>(null);
		const trackClickPositionRef = useRef(0);
		const mouseDown = useRef(false);

		const isScrollEndAvailable = (() => {
			return typeof document !== 'undefined' && document.onscrollend !== undefined;
		})();

		const removeSnap = () => {
			if (contentRef.current) {
				contentRef.current.style.scrollSnapType = 'none';
				document.body.style.userSelect = 'none';
			}
		};

		const addSnap = () => {
			if (contentRef.current && contentRef.current.style.scrollSnapType !== '') {
				contentRef.current.style.scrollSnapType = '';
				document.body.style.userSelect = '';
			}
		};

		const startDragging: React.MouseEventHandler<HTMLDivElement> = () => {
			mouseDown.current = true;
		};

		const stopDragging: React.MouseEventHandler<HTMLDivElement> = () => {
			mouseDown.current = false;
		};

		const move: React.MouseEventHandler<HTMLDivElement> = (e) => {
			e.preventDefault();

			if (!mouseDown.current) {
				return;
			}

			if (contentRef.current && childContentRef.current) {
				removeSnap();
				const isFastMomentum = e.movementY > 15 || e.movementY < -15;
				const multiplierCount = isFastMomentum ? 30 : 1;
				const scrollBehavior = isFastMomentum ? 'smooth' : 'auto';
				const topOffset = contentRef.current.scrollTop - e.movementY * multiplierCount;

				contentRef.current.scrollTo({
					left: contentRef.current.scrollLeft - e.movementX,
					top: topOffset,
					behavior: scrollBehavior,
				});
			}
		};

		useImperativeHandle(ref, () => ({
			scrollTop: (value: number) => {
				if (contentRef.current) {
					contentRef.current.scrollTop = value;
				}
			},
		}));

		const yScrollAdjust = (element: HTMLDivElement) => {
			if (!yTrackRef.current || !yScrollRef.current) return;

			const trackHeight = (element.clientHeight * element.clientHeight) / element.scrollHeight;
			const scrollTop = (element.scrollTop * element.clientHeight) / element.scrollHeight;

			yTrackRef.current.style.top =
				scrollTop + trackHeight <= element.scrollHeight ? `${scrollTop}px` : `${element.scrollHeight - trackHeight}px`;
			yTrackRef.current.style.height = `${trackHeight}px`;

			if (element.scrollHeight <= element.clientHeight) {
				yScrollRef.current.style.display = 'none';
			} else {
				yScrollRef.current.style.display = '';
			}
		};

		const xScrollAdjust = (element: HTMLDivElement) => {
			if (!xTrackRef.current || !xScrollRef.current) return;

			const trackWidth = (element.clientWidth * element.clientWidth) / element.scrollWidth;
			const scrollLeft = (element.scrollLeft * element.clientWidth) / element.scrollWidth;

			xTrackRef.current.style.left =
				scrollLeft + trackWidth <= element.scrollWidth ? `${scrollLeft}px` : `${element.scrollWidth - trackWidth}px`;
			xTrackRef.current.style.width = `${trackWidth}px`;

			if (element.scrollWidth <= element.clientWidth) {
				xScrollRef.current.style.display = 'none';
			} else {
				xScrollRef.current.style.display = '';
			}
		};

		const { contentRef } = useHTMLElementObserver<HTMLDivElement>({
			onChange: (element) => {
				yScrollAdjust(element);
				xScrollAdjust(element);
			},
		});

		const { contentRef: childContentRef } = useHTMLElementObserver<HTMLDivElement>({
			onChange: () => {
				if (contentRef.current) {
					yScrollAdjust(contentRef.current);
					xScrollAdjust(contentRef.current);
				}
			},
		});

		const dragBindY = useDrag(({ movement: [, y], event }) => {
			if (!contentRef.current || !yTrackRef.current) return;

			if (event.type === 'pointerdown') {
				trackClickPositionRef.current = yTrackRef.current.offsetTop;
			}

			const scrollableHeight = contentRef.current.clientHeight - yTrackRef.current.clientHeight;
			const scrollHeight = contentRef.current.scrollHeight - contentRef.current.clientHeight;
			const step = scrollHeight / scrollableHeight;
			const newScroll = (trackClickPositionRef.current + y) * step;

			if (contentRef.current) contentRef.current.scrollTo({ top: newScroll });
		});

		const dragBindX = useDrag(({ movement: [x], event }) => {
			if (!contentRef.current || !xTrackRef.current) return;

			if (event.type === 'pointerdown') {
				trackClickPositionRef.current = xTrackRef.current.offsetLeft;
			}

			const scrollableWidth = contentRef.current.clientWidth - xTrackRef.current.clientWidth;
			const scrollWidth = contentRef.current.scrollWidth - contentRef.current.clientWidth;
			const step = scrollWidth / scrollableWidth;
			const newScroll = (trackClickPositionRef.current + x) * step;

			if (contentRef.current) contentRef.current.scrollTo({ left: newScroll });
		});

		const handleOnScrollEnd = () => {
			addSnap();
		};

		/**
		 * Handles the scroll event and checks if the scroll has reached the end.
		 * For browser compatibility like Safari, it checks if the `onscrollend` event is available.
		 * If not available, it uses the `onscroll` event to check if the scroll has reached the end.
		 * @param state The state object containing information about the scroll event.
		 */
		const handleOnScroll = (state: FullGestureState<'scroll'>) => {
			if (!state.scrolling) {
				addSnap();
			}
		};

		useGesture(
			{
				onScrollEnd: isScrollEndAvailable ? handleOnScrollEnd : () => undefined,
				onScroll: !isScrollEndAvailable ? handleOnScroll : () => undefined,
			},
			{
				target: contentRef,
				eventOptions: {
					passive: true,
					once: true,
					capture: true,
				},
				enabled: dragScroll,
			}
		);

		return (
			<div className={clsx(className, !disable && 'group relative w-full max-h-full overflow-hidden flex flex-col')}>
				<div
					ref={contentRef}
					className={clsx(
						'min-w-full h-full flex-auto max-h-full flex flex-col relative',
						applyOutlinePadding && 'p-2 -m-2',
						!disable && ['scrollbar-hide overflow-auto', scrollSnapType === 'snap-y' && 'snap-y snap-mandatory']
					)}
					onScroll={(e) => {
						if (disable) return;

						const element = e.currentTarget;

						yScrollAdjust(element);
						xScrollAdjust(element);

						if (onScrollEndReach) {
							const EPSILON = 4;
							const isEndReached = element.scrollTop + element.clientHeight >= element.scrollHeight - EPSILON;

							if (isEndReached) onScrollEndReach();
						}

						onScroll?.(e);
					}}
					onMouseMove={dragScroll ? move : undefined}
					onMouseDown={dragScroll ? startDragging : undefined}
					onMouseUp={dragScroll ? stopDragging : undefined}
					onMouseLeave={dragScroll ? stopDragging : undefined}
				>
					<div ref={childContentRef} className="flex flex-col flex-auto" id={id}>
						{children}
					</div>
				</div>
				{fixedContent && fixedContent}
				{!disable && (
					<>
						<div
							ref={xScrollRef}
							className={`absolute w-full h-1.5 bottom-1 cursor-pointer  ${tracksZIndex ? 'z-layoutScrollTracks' : ''}`}
							onClick={(e) => {
								if (!contentRef.current || !xTrackRef.current) return;

								const newOffset = e.clientX - e.currentTarget.getBoundingClientRect().x;

								const scrollableWidth = contentRef.current.clientWidth - xTrackRef.current.clientWidth;
								const scrollWidth = contentRef.current.scrollWidth - contentRef.current.clientWidth;
								const step = scrollWidth / scrollableWidth;
								const newScroll = (newOffset - 20) * step;

								if (contentRef.current) contentRef.current.scrollTo({ left: newScroll });
							}}
							style={{ display: 'none' }}
						>
							<div
								className="opacity-0 transition-opacity group-hover:opacity-100 ease-in-out duration-500 px-2 relative h-full"
								onClick={(e) => {
									trackClickPositionRef.current = e.clientX;
								}}
								ref={xTrackRef}
								{...dragBindX()}
							>
								<div className="cursor-pointer bg-gray-700 w-full h-full opacity-50 rounded-md" />
							</div>
						</div>
						<div
							ref={yScrollRef}
							className={`absolute h-full w-1.5 end-1 top-0 cursor-pointer  ${
								tracksZIndex ? 'z-layoutScrollTracks' : ''
							}`}
							onClick={(e) => {
								if (!contentRef.current || !yTrackRef.current) return;

								const newOffset = e.clientY - e.currentTarget.getBoundingClientRect().y;

								const scrollableHeight = contentRef.current.clientHeight - yTrackRef.current.clientHeight;
								const scrollHeight = contentRef.current.scrollHeight - contentRef.current.clientHeight;
								const step = scrollHeight / scrollableHeight;
								const newScroll = (newOffset - 20) * step;

								if (contentRef.current) contentRef.current.scrollTo({ top: newScroll });
							}}
							style={{ display: 'none' }}
						>
							<div
								onClick={(e) => {
									e.stopPropagation();
								}}
								className="opacity-0 transition-opacity group-hover:opacity-100 ease-in-out duration-500 py-2 relative w-full"
								ref={yTrackRef}
								{...dragBindY()}
							>
								<div className="cursor-pointer bg-gray-700 w-full h-full opacity-50 rounded-md" />
							</div>
						</div>
					</>
				)}
			</div>
		);
	}
);

DevkitSimpleBar.displayName = 'DevkitSimpleBar';
