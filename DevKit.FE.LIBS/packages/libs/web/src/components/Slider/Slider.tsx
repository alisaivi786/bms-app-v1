import { Carousel } from 'react-responsive-carousel';
import './Slider-original.min.css';
import './Slider.css';

export interface ISliderProps {
	/** The Slider items to be rendered(The slides) */
	items: React.ReactNode[];
	/** The time interval for each slide, the interval is in milliseconds */
	interval?: number;
}

/** The carousel is a slideshow for cycling through a series of content, built with react-responsive-carousel. */
export const Slider = ({ items, interval }: ISliderProps) => {
	return (
		<Carousel
			showArrows={false}
			className="h-full w-full"
			interval={interval ?? 1500}
			autoPlay={true}
			showIndicators={true}
			showThumbs={false}
			stopOnHover
			infiniteLoop={true}
			dynamicHeight={false}
			showStatus={false}
			animationHandler="fade"
			swipeable={false}
			renderIndicator={(onClickHandler, isSelected, index, label) => {
				return (
					<div
						className={`ml-2 inline-flex h-2 w-2 cursor-pointer rounded-lg ${
							isSelected ? 'selected nj-bg-brand !outline !outline-white' : 'bg-gray-200'
						}`}
						onClick={onClickHandler}
						onKeyDown={onClickHandler}
						key={index}
						role="button"
						tabIndex={index}
						aria-label={`${label} ${index + 1}`}
					/>
				);
			}}
		>
			{items.map((item, index) => (
				<div
					className="h-full w-full"
					key={index}
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					{item}
				</div>
			))}
		</Carousel>
	);
};
