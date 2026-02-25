import React from 'react';
import { Meta } from '@storybook/react-vite';
import { Carousel as CarouselComponent } from '../../../src/components/Carousel/Carousel';
import logo2 from '../Slider/img2.svg';
import logo from '../Slider/img.svg';

export type IListItemProps = {
	title: string;
	description: string;
	img: React.ReactNode;
};

const ListItem = ({ title, description, img }: IListItemProps) => {
	return (
		<div className="z-10 flex flex-col h-full gap-2 p-10 bg-white w-72 rounded-2xl shadow-card">
			<p className="p-2 font-bold text-title3">{title}</p>
			<div className="flex flex-col gap-2 p-2">
				{description
					?.split('.')
					.filter((m) => !!m.trim())
					.map((item, index) => (
						<p className="text-caption1 text-gray-600" key={index}>
							{item}
						</p>
					))}
			</div>
			<div className="flex flex-row justify-end px-12">{img}</div>
		</div>
	);
};

const items: React.ReactNode[] = [
	<ListItem
		key={0}
		title="devkit Wallet"
		description="Please confirm your company details to continue to get the right health cover. If you would like to send a current application for another person to proceed toggle-on and press continue or if you would like to continue by yourself, please keep the toggle-off state."
		img={<img src={logo} alt="e-wallet" width={263} />}
	/>,
	<ListItem
		key={1}
		title="Visit Visa"
		description="A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company."
		img={<img src={logo2} alt="e-wallet" width={263} />}
	/>,
	<ListItem
		key={3}
		title="Visit Visa 545"
		description="A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company."
		img={<img src={logo2} alt="e-wallet" width={263} />}
	/>,
	<ListItem
		key={1}
		title="Visit Visa"
		description="A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company."
		img={<img src={logo2} alt="e-wallet" width={263} />}
	/>,
	<ListItem
		key={3}
		title="Visit Visa 545"
		description="A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company."
		img={<img src={logo2} alt="e-wallet" width={263} />}
	/>,
	<ListItem
		key={1}
		title="Visit Visa"
		description="A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company."
		img={<img src={logo2} alt="e-wallet" width={263} />}
	/>,
	<ListItem
		key={3}
		title="Visit Visa 545"
		description="A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company."
		img={<img src={logo2} alt="e-wallet" width={263} />}
	/>,
	<ListItem
		key={1}
		title="Visit Visa"
		description="A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company."
		img={<img src={logo2} alt="e-wallet" width={263} />}
	/>,
	<ListItem
		key={3}
		title="Visit Visa 545"
		description="A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company."
		img={<img src={logo2} alt="e-wallet" width={263} />}
	/>,
	<ListItem
		key={1}
		title="Visit Visa"
		description="A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company."
		img={<img src={logo2} alt="e-wallet" width={263} />}
	/>,
	<ListItem
		key={3}
		title="Visit Visa 545"
		description="A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company."
		img={<img src={logo2} alt="e-wallet" width={263} />}
	/>,
];
const StoryMeta: Meta = {
	title: 'Web/Components/Carousel',
	component: CarouselComponent,
};

export default StoryMeta;

export const Carousel = {
	args: {
		items,
	},
};
