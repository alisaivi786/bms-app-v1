import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { IMenuType, MenuComponent } from '../../../src/components/Menu';

type ComponentType = (args: IMenuType) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [selectedOption, setSelectedOption] = useState('2');

	const option = [
		{ label: 'Price  ( low to high )', id: '1' },
		{ label: 'Price ( high to low )', id: '2' },
		{ label: 'Popular', id: '3' },
		{ label: 'Annual Limit ( low to high )', id: '4' },
		{ label: 'Annual Limit ( high to low   )', id: '5' },
	];

	return (
		<>
			<div className="flex gap-6 lg:gap-16 mx-24 flex-wrap">
				<div className="flex ">
					<MenuComponent
						{...args}
						onClick={(data) => {
							data && setSelectedOption(data?.id);
						}}
						selectedOption={selectedOption}
						items={option}
					/>
				</div>
			</div>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto, illum, tenetur nisi, unde aliquid officiis
			id doloribus placeat voluptates odit voluptas perspiciatis sint quibusdam rerum eligendi quia? A, obcaecati illum!
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/Menu',
	component: MenuComponent,
	render: Template,
};

export default StoryMeta;

export const Menu = {
	args: {
		disabled: false,
	},
};
