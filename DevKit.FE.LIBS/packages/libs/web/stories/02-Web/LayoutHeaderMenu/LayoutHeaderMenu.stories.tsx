import { LogoutV2Icon, RoundedUserIcon, Sf2x2GridIcon, SfChevronDownIcon } from '@devkit/icons/web';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { LayoutHeaderMenuProps } from '../../../src/components/LayoutHeaderMenu';
import LayoutHeaderMenu from '../../../src/components/LayoutHeaderMenu/LayoutHeaderMenu';
import { PartnerUserAvatar } from '../../../src/layouts/PartnerPageLayout/components/PartnerUserAvatar';

type ComponentType = (args: LayoutHeaderMenuProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	return (
		<div className="flex justify-end m-5">
			<LayoutHeaderMenu {...args} />
		</div>
	);
};

const StoryMeta: Meta<LayoutHeaderMenuProps> = {
	title: 'Web/Components/LayoutHeaderMenu',
	component: LayoutHeaderMenu,
};

export const LayoutHeader: StoryObj<ComponentType> = {
	render: Template,
	args: {
		menuItems: [
			{
				content: 'menuItems header open in _self Link',
				link: {
					href: 'https://www.shory.com',
					target: '_self',
				},
			},
			{
				content: 'menuItems header open in _blank Link',
				link: {
					href: 'https://www.shory.com',
					target: '_blank',
				},
			},
		],
		menuFooterItems: [
			{
				content: 'menuItems Footer open in _blank Link',
				link: {
					href: 'https://www.shory.com',
					target: '_blank',
				},
			},
			{
				content: 'menuItems Footer open in _self Link',
				link: {
					href: 'https://www.shory.com',
					target: '_self',
				},
			},
		],
		minWidth: 200,
		triggerComponent: () => (
			<button className="gap-2 rounded-md border nj-border-brand py-1.5 px-4 text-paragraph nj-text-brand justify-end">
				open menu
			</button>
		),
	},
};

export const PartnerHeaderNewDesign: StoryObj<ComponentType> = {
	render: Template,
	args: {
		menuItems: [
			{
				content: (
					<div className="flex items-center">
						<PartnerUserAvatar />
						<div className="flex font-normal flex-col">
							<span className="nj-dark">Bahri@secureData.ae</span>
							<span className="font-normal nj-color-gray-700 text-legal">Last login :12-10-2024 02:32:33 AM</span>
						</div>
					</div>
				),
				className: 'bg-gray-50 rounded-md mb-2',
			},
			{
				content: 'My Account',
				icon: () => <RoundedUserIcon className="w-5 h-5" />,
				link: {
					href: '/',
				},
			},
			{
				content: 'Switch Product',
				icon: () => <Sf2x2GridIcon className="w-5 h-5" />,
				link: {
					href: '/',
				},
			},
			{
				content: 'Logout',
				icon: () => <LogoutV2Icon className="w-5 h-5" />,
				className: 'text-red-500',
				link: {
					href: '/',
				},
			},
		],
		minWidth: 250,
		triggerComponent: () => (
			<>
				<div className="flex justify-center items-center gap-2 cursor-pointer">
					<PartnerUserAvatar />
					<SfChevronDownIcon className="w-10 text-gray-700" />
				</div>
			</>
		),
	},
};

export default StoryMeta;
