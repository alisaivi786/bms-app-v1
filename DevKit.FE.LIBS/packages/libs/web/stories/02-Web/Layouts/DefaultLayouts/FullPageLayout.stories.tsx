import { useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon, HomeIcon, KsaFlagIcon, Send2Icon, UaeFlagIcon, UserIcon } from '@devkit/icons/web';
import { IMarketPlace } from '@devkit/shared-types';
import { SystemLocale } from '@devkit/utilities';
import { Meta, StoryObj } from '@storybook/react-vite';
import { StoryBookThemeProvider } from '../../../../.storybook/decorator/sbThemeProvider';
import { Button } from '../../../../src/components/Buttons';
import { Collapsible, CollapsibleButton, CollapsiblePanel } from '../../../../src/components/Collapsible';
import { Dropdown } from '../../../../src/components/Dropdown/Dropdown';
import { useToast } from '../../../../src/components/Toast';
import { FullPageLayout, IFullPageLayoutProps } from '../../../../src/layouts/FullPageLayout/FullPageLayout';
import { useMockLayoutSettings } from '../../../../src/test-utils/useMockLayoutSettings';

type ComponentType = (
	args: IFullPageLayoutProps & {
		content: string;
		showUserMenu?: boolean;
		showUserMenuNoDrawer?: boolean;
		showUserAvatar: boolean;
		onChatIconClick?: () => void;
		onNotificationIconClick?: () => void;
		onLanguageSwitchClick?: (locale: SystemLocale) => void;
		marketSwitcher?: boolean;
		showSwitchLangOnMobile?: boolean;
	}
) => JSX.Element;

const Footer = (
	<div className="flex flex-col justify-between w-full text-gray-600 text-caption1 sm:flex-row">
		<div className="flex flex-col-reverse sm:h-full sm:flex-col">
			<div className="flex gap-1 nj-text-brand sm:gap-2.5">
				<a>Terms</a>
				<a>Privacy</a>
			</div>
			<p className="text-gray-600 ">
				devkit Insurance Brokers LLC is authorized, regulated and licensed broker by the UAE Central Bank with
				<span className="nj-text-brand ">devkit license number 287.</span>© 2022 devkit.
			</p>
		</div>
		<div className=" flex h-full items-center justify-start gap-4 sm:justify-between sm:gap-0.5">
			<div className="flex items-center justify-center h-12 text-white bg-black w-11">LOGO</div>
			<p className="w-24 text-caption2">Licensed by Central Bank of UAE Licence Number 287</p>
		</div>
	</div>
);

const HeaderWrapper = ({ title, body }: { title: string; body: string }) => {
	return (
		<div className="flex flex-col gap-2 sm:gap-1">
			<p className="font-normal text-gray-600 text-caption1">{title}</p>
			<p className="font-medium text-black text-paragraph">{body}</p>
		</div>
	);
};

const SubHeader = () => {
	const [collapse, setCollapse] = useState<boolean>(false);

	return (
		<>
			<div className="w-full py-1 bg-white border-b border-gray-200 border-solid md:flex-row">
				<div className="flex justify-between px-16 mx-auto">
					<div className="flex flex-col items-center text-center lg:flex-row">
						<p className="font-bold text-h1">Plans</p>
						<span className="mx-4 border-l border-gray-200 border-solid h-2/3" />
						<div className="flex items-center gap-2 hover:cursor-pointer" onClick={() => setCollapse(!collapse)}>
							<p className={`text-title ${collapse ? 'nj-text-brand' : 'text-black'} `}>National Properties LLC</p>
							<span className={`text-caption1 ${collapse ? 'nj-text-brand' : ''}`}>
								{collapse ? <ArrowUpIcon /> : <ArrowDownIcon />}
							</span>
						</div>
					</div>
					<div className="flex flex-col items-center justify-center text-center text-gray-700 text-paragraph sm:flex-row">
						Quote List ID:
						<div className="flex gap-2 ">
							<p className="font-medium text-black">CQL2300001</p>
							<Send2Icon className=" nj-text-brand hover:cursor-pointer" />
						</div>
					</div>
				</div>
			</div>
			{collapse && (
				<div className="flex flex-wrap w-full gap-12 p-4 transition-all bg-gray-200">
					<HeaderWrapper title="Company Name" body="National Properties LLC" />
					<HeaderWrapper title="Trade License Number" body="720256" />
					<HeaderWrapper title="Registered Emirate" body="Abu Dubai" />
					<HeaderWrapper title="Number of Employees" body="526" />
				</div>
			)}
		</>
	);
};

const FullPageLayoutComponent = () => {
	const { showError } = useToast();

	return (
		<FullPageLayout
			footer={Footer}
			stickyHeader={true}
			isFooterSticky={true}
			isSubHeaderSticky={true}
			backToTop=""
			subHeader={<SubHeader />}
			contentContainerWidth="container"
		>
			<div className="flex flex-col gap-2">
				<Dropdown
					label="test"
					popover="test"
					options={[
						{ id: 1, text: 'item' },
						{ id: 2, text: 'item' },
						{ id: 3, text: 'item' },
						{ id: 4, text: 'item' },
					]}
					valueKey="id"
					labelKey="text"
				/>
				<Button
					onClick={() => {
						showError('Test Toast');
					}}
				>
					Test Toast
				</Button>
				<Collapsible>
					<CollapsibleButton>Test</CollapsibleButton>
					<CollapsiblePanel>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla, mauris eget cursus rhoncus,
							enim urna aliquam felis, in lobortis massa ligula at eros. Vestibulum et finibus mauris, et malesuada
							massa. Mauris efficitur porta mauris, eu tristique nisi efficitur id. Vivamus fringilla nunc et nunc
							consectetur, sed pharetra sapien cursus. Phasellus a tincidunt neque. Vestibulum posuere turpis ultrices
							arcu tincidunt, a auctor leo molestie. Vivamus pretium volutpat turpis a tempus. Vivamus facilisis diam
							elementum elit aliquet maximus. Proin ac sapien sed nisl consectetur venenatis molestie at nulla. Quisque
							bibendum, eros quis efficitur scelerisque, dui eros ornare dui, in luctus neque ipsum at arcu. Sed id
							consectetur arcu, non fringilla eros. Ut dignissim scelerisque sapien quis condimentum. Mauris ultrices
							arcu ac congue rhoncus. Fusce sodales, eros id finibus feugiat, sem augue viverra orci, sit amet eleifend
							lacus nunc eget tortor.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla, mauris eget cursus rhoncus,
							enim urna aliquam felis, in lobortis massa ligula at eros. Vestibulum et finibus mauris, et malesuada
							massa. Mauris efficitur porta mauris, eu tristique nisi efficitur id. Vivamus fringilla nunc et nunc
							consectetur, sed pharetra sapien cursus. Phasellus a tincidunt neque. Vestibulum posuere turpis ultrices
							arcu tincidunt, a auctor leo molestie. Vivamus pretium volutpat turpis a tempus. Vivamus facilisis diam
							elementum elit aliquet maximus. Proin ac sapien sed nisl consectetur venenatis molestie at nulla. Quisque
							bibendum, eros quis efficitur scelerisque, dui eros ornare dui, in luctus neque ipsum at arcu. Sed id
							consectetur arcu, non fringilla eros. Ut dignissim scelerisque sapien quis condimentum. Mauris ultrices
							arcu ac congue rhoncus. Fusce sodales, eros id finibus feugiat, sem augue viverra orci, sit amet eleifend
							lacus nunc eget tortor.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla, mauris eget cursus rhoncus,
							enim urna aliquam felis, in lobortis massa ligula at eros. Vestibulum et finibus mauris, et malesuada
							massa. Mauris efficitur porta mauris, eu tristique nisi efficitur id. Vivamus fringilla nunc et nunc
							consectetur, sed pharetra sapien cursus. Phasellus a tincidunt neque. Vestibulum posuere turpis ultrices
							arcu tincidunt, a auctor leo molestie. Vivamus pretium volutpat turpis a tempus. Vivamus facilisis diam
							elementum elit aliquet maximus. Proin ac sapien sed nisl consectetur venenatis molestie at nulla. Quisque
							bibendum, eros quis efficitur scelerisque, dui eros ornare dui, in luctus neque ipsum at arcu. Sed id
							consectetur arcu, non fringilla eros. Ut dignissim scelerisque sapien quis condimentum. Mauris ultrices
							arcu ac congue rhoncus. Fusce sodales, eros id finibus feugiat, sem augue viverra orci, sit amet eleifend
							lacus nunc eget tortor.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla, mauris eget cursus rhoncus,
							enim urna aliquam felis, in lobortis massa ligula at eros. Vestibulum et finibus mauris, et malesuada
							massa. Mauris efficitur porta mauris, eu tristique nisi efficitur id. Vivamus fringilla nunc et nunc
							consectetur, sed pharetra sapien cursus. Phasellus a tincidunt neque. Vestibulum posuere turpis ultrices
							arcu tincidunt, a auctor leo molestie. Vivamus pretium volutpat turpis a tempus. Vivamus facilisis diam
							elementum elit aliquet maximus. Proin ac sapien sed nisl consectetur venenatis molestie at nulla. Quisque
							bibendum, eros quis efficitur scelerisque, dui eros ornare dui, in luctus neque ipsum at arcu. Sed id
							consectetur arcu, non fringilla eros. Ut dignissim scelerisque sapien quis condimentum. Mauris ultrices
							arcu ac congue rhoncus. Fusce sodales, eros id finibus feugiat, sem augue viverra orci, sit amet eleifend
							lacus nunc eget tortor.
						</p>
					</CollapsiblePanel>
				</Collapsible>
			</div>
		</FullPageLayout>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Layouts/DefaultLayouts/FullPageLayout',
	component: FullPageLayout,
	render: FullPageLayoutComponent,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [
		(Story, Context) => {
			const layoutSettings = useMockLayoutSettings({
				withMenu: false,
				isExpanded: true,
				onExpandedStateChange() {
					alert('expanded changed');
				},
			});
			const {
				showUserAvatar,
				showUserMenuNoDrawer,
				showUserMenu,
				onChatIconClick,
				onLanguageSwitchClick,
				onNotificationIconClick,
				marketSwitcher,
				showSwitchLangOnMobile,
			} = Context.args;

			if (showUserMenu) {
				layoutSettings.currentUser = {
					...layoutSettings.currentUser,
					userMenuItems: [
						{
							label: 'Change Password',
							icon: HomeIcon,
							onClick: () => {
								alert('Change Password clicked');
							},
							testId: 'user-menu-item-change-password',
						},
						{
							label: 'User Profile',
							icon: UserIcon,
							onClick: () => {
								alert('ChanUser Profile clicked');
							},
							testId: 'user-menu-item-user-profile',
						},
					],
					userMenuFooterItems: [
						{
							label: 'Logout',
							onClick: () => {
								alert('ChanUser Profile clicked');
							},
							testId: 'user-menu-footer-item-logout',
						},
					],
				};
				layoutSettings.drawer = {
					sections: [
						{
							items: [
								{
									label: 'Change Password',
									icon: HomeIcon,
									onClick: () => {
										alert('Change Password clicked');
									},
								},
								{
									label: 'User Profile',
									icon: UserIcon,
									badge: 'Beta',
									onClick: () => {
										alert('ChanUser Profile clicked');
									},
								},
								...(showSwitchLangOnMobile ? [{ type: 'languageSwitch' as const }] : []),
							],
						},
					],
				};
			}

			if (showUserAvatar) {
				layoutSettings.currentUser = {
					...layoutSettings.currentUser,
					isLoggedIn: true,
					showAvatarAndDisplayName: true,
					displayName: 'John Doe',
					noDrawerForUserMenu: showUserMenuNoDrawer,
				};
			}

			if (marketSwitcher) {
				layoutSettings.marketSwitcher = {
					marketPlaces: [
						{ label: 'United Arab Emirates', icon: UaeFlagIcon, isActive: true },
						{ label: 'Kingdom of Saudi Arabia', icon: KsaFlagIcon },
					] satisfies IMarketPlace[],
					onMarketPlaceChange: async (marketPlace) => {
						alert(`Market changed: ${marketPlace.label} and lang: ${marketPlace.locale}`);
					},
					onLocaleChange: async (locale) => {
						alert(`Locale switched: ${locale}`);
					},
				};
			}

			layoutSettings.headerOptions = {
				onChatIconClick,
				onNotificationIconClick,
			};

			layoutSettings.onLanguageSwitchClick = onLanguageSwitchClick;

			return (
				<StoryBookThemeProvider sbContext={Context} settings={layoutSettings}>
					<Story />
				</StoryBookThemeProvider>
			);
		},
	],
};

export default StoryMeta;

export const FullPageAllProperties = {
	args: {
		showUserMenu: true,
		onChatIconClick: () => alert('chat'),
		onNotificationIconClick: () => alert('chat'),
		onLanguageSwitchClick: (locale: SystemLocale) => {
			alert(locale);
		},
		marketSwitcher: true,
		showSwitchLangOnMobile: true,
	},
};

export const FullPageAllPropertiesOff = {};

export const FullPageUserHiddenMenu: StoryObj<ComponentType> = {
	args: {
		showUserMenu: true,
	},
};

export const FullPageWithChat: StoryObj<ComponentType> = {
	args: {
		onChatIconClick: () => alert('chat'),
	},
};

export const FullPageWithNotification: StoryObj<ComponentType> = {
	args: {
		onNotificationIconClick: () => alert('chat'),
	},
};

export const FullPageWithLanguageSwitch: StoryObj<ComponentType> = {
	args: {
		onLanguageSwitchClick: (locale) => {
			alert(locale);
		},
		showUserMenu: true,
		showSwitchLangOnMobile: true,
	},
};

export const FullPageWithMarketSwitch: StoryObj<ComponentType> = {
	args: {
		showUserMenu: true,
		marketSwitcher: true,
		showSwitchLangOnMobile: true,
	},
};

export const FullPageWithLoggedInUserWithoutMenu: StoryObj<ComponentType> = {
	args: {
		showUserAvatar: true,
		onLanguageSwitchClick: (locale) => {
			alert(locale);
		},
		showSwitchLangOnMobile: true,
	},
};

export const FullPageWithLoggedInUserWithMenu: StoryObj<ComponentType> = {
	args: {
		showUserAvatar: true,
		showUserMenu: true,
		onLanguageSwitchClick: (locale) => {
			alert(locale);
		},
	},
};

export const FullPageWithLoggedInUserWithNoDrawer: StoryObj<ComponentType> = {
	args: {
		showUserAvatar: true,
		showUserMenu: true,
		showUserMenuNoDrawer: true,
		onLanguageSwitchClick: (locale) => {
			alert(locale);
		},
	},
};
