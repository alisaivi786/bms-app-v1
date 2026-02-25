import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { GroupsMenu as GroupsMenuComponent, IGroupsMenuProps } from '../../../src/components/GroupMenu';

type itemType = {
	id: string;
	label: string;
	price: string;
	annualLimit: string;
};
type ComponentType = (args: IGroupsMenuProps<itemType, 'id'>) => JSX.Element;
type selectedItemInfoType = {
	groupName: string;
	imgSrc: string;
	item: { id: string; label: string };
};
const groupsMenu = [
	{
		id: '1',
		title: 'salama',
		imgSrc:
			'https://media.licdn.com/dms/image/C560BAQHN29IyiaFSUA/company-logo_200_200/0/1642585133462?e=2147483647&v=beta&t=Bu0aSWQ51kzKDpgTKwYk39lIh4VvJ4ViBreVdwj9YvU',
		items: [
			{
				id: '1',
				label: 'Plan 1',
				price: 'AED 500',
				annualLimit: 'AED 10000',
			},
			{
				id: '2',
				label: 'Plan 2, Category B',
				price: 'AED 500',
				annualLimit: 'AED 10000',
			},
			{
				id: '3',
				label: 'Plan 1, Category D',
				price: 'AED 500',
				annualLimit: 'AED 10000',
			},
			{
				id: '4',
				label: 'Plan 5, Category R',
				price: 'AED 500',
				annualLimit: 'AED 10000',
			},
			{
				id: '5',
				label: 'Plan 4, Category G',
				price: 'AED 500',
				annualLimit: 'AED 10000',
			},
			{
				id: '6',
				label: 'Plan 7, Category D',
				price: 'AED 500',
				annualLimit: 'AED 10000',
			},
		],
	},
	{
		id: '2',
		title: 'Emarat',
		imgSrc: '/',

		items: [
			{
				id: '19',
				label: 'Plan 1, Category C',
				price: 'AED 500',
				annualLimit: 'AED 10000',
			},
			{
				id: '88',
				label: 'Plan 3, Category A',
				price: 'AED 500',
				annualLimit: 'AED 10000',
			},
			{
				id: '12',
				label: 'Plan 1, Category F',
				price: 'AED 500',
				annualLimit: 'AED 10000',
			},
			{
				id: '10',
				label: 'Plan 4, Category D',
				price: 'AED 500',
				annualLimit: 'AED 10000',
			},
		],
	},
];
const SelectedItemComponent: IGroupsMenuProps<itemType, 'id'>['renderSelectedItem'] = (selectedOption) => {
	const selectedItemInfo = selectedOption
		? groupsMenu.reduce((prev, curr) => {
				const selectedItem = curr.items.find((item) => item.id === selectedOption);

				return selectedItem
					? {
							groupName: curr.title,
							id: curr.id,
							imgSrc: curr.imgSrc,
							item: selectedItem,
					  }
					: prev;
		  }, {} as selectedItemInfoType)
		: undefined;

	return (
		<>
			{selectedOption ? (
				<div className="flex items-center gap-1 py-2 ">
					<div className="h-11 w-14 overflow-hidden">
						<img
							src={selectedItemInfo?.imgSrc}
							alt={selectedItemInfo?.item?.label}
							className="h-full w-full object-contain"
						/>
					</div>
					<div className="flex flex-col text-start capitalize">
						<p className="text-paragraph font-bold text-black ">{selectedItemInfo?.item?.label}</p>
						<p className=" text-paragraph text-gray-700  ">{selectedItemInfo?.groupName}</p>
					</div>
				</div>
			) : (
				<p className="text-start text-paragraph  font-bold text-black ">Choose Your Plan</p>
			)}
		</>
	);
};

const Template: StoryFn<ComponentType> = (args) => {
	const [selectedGroupsMenuOption, setSelectedGroupsMenuOption] = useState<string | undefined>();

	return (
		<>
			<div className="mx-24 flex flex-wrap gap-6 lg:gap-16">
				<div className="flex flex-1">
					<GroupsMenuComponent
						{...args}
						valueKey="id"
						selectedOption={selectedGroupsMenuOption}
						groups={groupsMenu}
						onChange={(data) => {
							data && setSelectedGroupsMenuOption(data?.id);
						}}
						renderSelectedItem={SelectedItemComponent}
						renderItem={(item) => {
							return (
								<div className="flex flex-1 flex-col gap-0.5 py-2.5 pr-4 text-paragraph">
									<div className="flex justify-between gap-2.5 font-bold  ">
										<p className="w-52 whitespace-nowrap ">{item.label}</p>
										<p className="whitespace-nowrap">{item.price}</p>
									</div>
									<p className="font-normal text-gray-700 group-hover:text-white">Annual Limit {item.annualLimit}</p>
								</div>
							);
						}}
						onClear={() => {
							setSelectedGroupsMenuOption(undefined);
						}}
					/>
				</div>
			</div>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto, illum, tenetur nisi, unde aliquid officiis
			id doloribus placeat voluptates odit voluptas perspiciatis sint quibusdam rerum eligendi quia? A, obcaecati illum!
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/GroupMenu',
	component: GroupsMenuComponent,
	render: Template,
};

export default StoryMeta;

export const GroupsMenu = {
	args: {
		disabled: false,
	},
};
