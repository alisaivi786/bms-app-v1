import React from 'react';

export type CarouselProps = {
	/** The  items to be rendered within the Carousel. */

	items: React.ReactNode[];
};

export const Carousel = ({ items }: CarouselProps) => {
	return (
		<div className="flex w-full overflow-auto gap-x-9 lg:gap-x-6 px-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] snap-mandatory snap-x lg:px-5">
			{items.map((item, index) => (
				<div key={index} className="shrink-0 snap-center">
					{item}
				</div>
			))}
		</div>
	);
};
