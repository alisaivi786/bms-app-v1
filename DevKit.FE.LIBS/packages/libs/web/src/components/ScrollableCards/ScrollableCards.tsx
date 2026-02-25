import { ReactNode, useRef } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { ArrowLeftIcon, ArrowRightIcon } from '@devkit/icons/web';
import { LinkButton } from '../Buttons';
import { Card } from '../Card';

export interface IScrollableCardsProps<TOption> {
	/** An array of items to be rendered as cards. */
	items: TOption[];
	/**
	 * The callback function to render each item as a card.
	 * @param item - The item to be rendered.
	 * @returns The ReactNode representing the card for the given item.
	 */
	onItemRender: (item: TOption) => ReactNode;
	/** Indicates whether the navigation arrows should be hidden. (Optional) */

	hideArrows?: boolean;
}

export const ScrollableCards = <TOption extends object>({
	hideArrows,
	items,
	onItemRender,
}: IScrollableCardsProps<TOption>) => {
	const ref = useRef<HTMLElement>(null);
	const elementRefs = useRef<(HTMLElement | null)[]>([]);
	const startMargin = hideArrows ? 1 : 60;
	const startMarginClass = hideArrows ? 'pl-[1px]' : 'pl-[1px] md:pl-[60px]';
	const scrollRight = () => {
		const currentOffset = ref.current?.scrollLeft ?? 0;
		let nextOffset = currentOffset;

		elementRefs.current?.every((elementRef) => {
			if ((elementRef?.offsetLeft ?? 0) > currentOffset + startMargin) {
				nextOffset = elementRef?.offsetLeft ?? 0;
				ref.current?.scrollTo({ left: nextOffset - startMargin });

				return false;
			}

			return true;
		});
	};

	const scrollLeft = () => {
		const currentOffset = ref.current?.scrollLeft ?? 0;
		const childElementsRefs = elementRefs.current ?? [];
		let nextOffset = currentOffset;

		for (let i = childElementsRefs.length - 1; i >= 0; i--) {
			const elementRef = childElementsRefs[i];

			if ((elementRef?.offsetLeft ?? 0) < currentOffset) {
				nextOffset = elementRef?.offsetLeft ?? 0;
				ref.current?.scrollTo({ left: nextOffset - startMargin });

				break;
			}
		}
	};

	return (
		<div className="flex w-full justify-center items-center relative ">
			{!hideArrows && (
				<div className="hidden md:flex absolute left-0 bg-brand-50 rounded-full h-9 w-9 justify-center items-center">
					<LinkButton className="pe-0.5" onClick={scrollLeft} text={<ArrowLeftIcon className="h-6 w-6" />} />
				</div>
			)}
			<ScrollContainer innerRef={ref}>
				<div className="flex gap-5 my-5">
					<div className={startMarginClass}></div>
					{items?.map((item, index) => {
						return (
							<div
								key={index}
								ref={(elementRef) => {
									const elementRefsNext = [...elementRefs.current];

									elementRefsNext[index] = elementRef;
									elementRefs.current = elementRefsNext;
								}}
							>
								<Card className="h-full">{onItemRender(item)}</Card>
							</div>
						);
					})}
					<div className={startMarginClass}></div>
				</div>
			</ScrollContainer>
			{!hideArrows && (
				<div className="hidden md:flex absolute right-0 bg-brand-50 rounded-full h-9 w-9 justify-center items-center">
					<LinkButton className="ps-0.5" onClick={scrollRight} text={<ArrowRightIcon className="h-6 w-6" />} />
				</div>
			)}
		</div>
	);
};
