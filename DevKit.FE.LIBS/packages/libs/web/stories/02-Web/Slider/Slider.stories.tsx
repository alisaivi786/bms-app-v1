import { Meta } from '@storybook/react-vite';
import { ISliderProps, Slider as SliderComponent } from '../../../src/components/Slider';
import SlideItem from './SlideItem';
import logo2 from './img2.svg';
import logo from './img.svg';

const items: React.ReactNode[] = [
	<SlideItem
		key={0}
		title="devkit Wallet"
		description="Please confirm your company details to continue to get the right health cover. If you would like to send a current application for another person to proceed toggle-on and press continue or if you would like to continue by yourself, please keep the toggle-off state."
		img={<img src={logo} alt="e-wallet" width={263} />}
	/>,
	<SlideItem
		key={1}
		title="Visit Visa"
		description="A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company."
		img={<img src={logo2} alt="e-wallet" width={263} />}
	/>,
	<SlideItem
		key={3}
		title="Visit Visa 545"
		description="A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company."
		img={<img src={logo2} alt="e-wallet" width={263} />}
	/>,
];
/** The Slider is a slideshow for cycling through a series of content, built with react-responsive-carousel. */

const StoryMeta: Meta<ISliderProps> = {
	title: 'Web/Forms/Slider',
	component: SliderComponent,
	args: {
		items: items,
	},
};

export default StoryMeta;

export const Slider = {};
