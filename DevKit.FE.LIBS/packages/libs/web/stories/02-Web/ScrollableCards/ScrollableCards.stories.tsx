import React, { ComponentType } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { ScrollableCards } from '../../../src/components/ScrollableCards';
import logo2 from '../Slider/img2.svg';
import logo from '../Slider/img.svg';

export type IListItemProps = {
	title: string;
	description: string;
	img: React.ReactNode;
};

const onRenderItem = ({ title, description, img }: IListItemProps) => {
	return (
		<div className="flex flex-col h-full w-60 rounded-2xl hover:cursor-pointer">
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
const items: IListItemProps[] = [
	{
		title: 'devkit Wallet',
		description:
			'Please confirm your company details to continue to get the right health cover. If you would like to send a current application for another person to proceed toggle-on and press continue or if you would like to continue by yourself, please keep the toggle-off state.',
		img: <img src={logo} alt="e-wallet" width={263} />,
	},
	{
		title: 'Visit Visa',
		description:
			'A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company.',
		img: <img src={logo2} alt="e-wallet" width={263} />,
	},
	{
		title: 'Visit Visa-2',
		description:
			'A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company.',
		img: <img src={logo2} alt="e-wallet" width={263} />,
	},
	{
		title: 'Visit Visa-3',
		description:
			'A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company.',
		img: <img src={logo2} alt="e-wallet" width={263} />,
	},
	{
		title: 'Visit Visa-4',
		description:
			'A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company.',
		img: <img src={logo2} alt="e-wallet" width={263} />,
	},
	{
		title: 'Visit Visa-5',
		description:
			'A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company.',
		img: <img src={logo2} alt="e-wallet" width={263} />,
	},
	{
		title: 'Visit Visa-6',
		description:
			'A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company.',
		img: <img src={logo2} alt="e-wallet" width={263} />,
	},
	{
		title: 'Visit Visa-7',
		description:
			'A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company.',
		img: <img src={logo} alt="e-wallet" width={263} />,
	},
	{
		title: 'Visit Visa-8',
		description:
			'A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company.',
		img: <img src={logo} alt="e-wallet" width={263} />,
	},
	{
		title: 'Visit Visa-9',
		description:
			'A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company.',
		img: <img src={logo} alt="e-wallet" width={263} />,
	},
	{
		title: 'Visit Visa-10',
		description:
			'A visit visa to UAE allows tourists to enter the country for a specific period. It requires sponsorship from a resident or company.',
		img: <img src={logo} alt="e-wallet" width={263} />,
	},
];

const Template: StoryFn<ComponentType> = (args) => {
	return <ScrollableCards items={[]} onItemRender={onRenderItem} {...args} />;
};
const StoryMeta: Meta = {
	title: 'Web/Components/ScrollableCards',
	component: Template,
};

export default StoryMeta;

export const Scrollable = {
	args: {
		items,
		onRenderItem,
	},
};

export const HideArrows = {
	args: {
		items,
		onRenderItem,
		hideArrows: true,
	},
};
