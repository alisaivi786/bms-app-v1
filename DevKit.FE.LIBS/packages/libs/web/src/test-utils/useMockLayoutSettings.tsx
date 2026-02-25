import { ChatIcon, HomeIcon, UserIcon } from '@devkit/icons/web';
import { IdevkitThemeProviderWithMarketSwitcher } from '@devkit/shared-types';

export const useMockLayoutSettings = (
	props:
		| {
				withMenu?: boolean;
				isExpanded: boolean;
				onExpandedStateChange: () => void;
		  }
		| undefined
): IdevkitThemeProviderWithMarketSwitcher => {
	const { withMenu = false, isExpanded, onExpandedStateChange } = props ?? {};

	return {
		onSideMenuLogout: () => {
			alert('Logout clicked (from sidebar)');
		},
		currentPagePath: 'Enquiry Service',
		onLanguageSwitchClick: () => {
			alert('Language switch clicked');
		},
		locale: 'ar',
		renderLink: ({ href, title }) => <a href={href}>{title}</a>,
		headerOptions: {
			headerMenuRender: ({ isDisabled }) => (
				<>
					<div className="flex flex-col justify-center ">
						<p className="text-body">Support</p>
					</div>

					<div className="w-5 text-black">
						<ChatIcon
							className="!h-5 !w-5"
							onClick={() => {
								if (!isDisabled) {
									open();
								}
							}}
						/>
					</div>
				</>
			),
		},

		logoRender: ({ logoColorMode, isDisabled }) => (
			<a
				onClick={(e) => {
					if (isDisabled) {
						e.stopPropagation();
						e.preventDefault();
					}
				}}
			>
				<img
					className="h-6"
					src={logoColorMode === 'white' ? '/devkit-logo2.png' : '/devkit-logo2.png'}
					alt="devkit logo"
				/>
			</a>
		),

		sideBarItems: withMenu
			? {
					isExpanded,
					onExpandedStateChange,
					items: [
						{
							type: 'group',
							label: 'MENU',
						},
						{
							label: 'Home',
							icon: HomeIcon,
							isActive: true,
							onClick: () => {
								alert('Home clicked');
							},
							badge: 'New',
						},
						{
							label: 'User Management',
							icon: UserIcon,
							badge: 'New',
							items: [
								{
									label: 'Add user',
									icon: UserIcon,
								},
								{
									label: 'User Roles',
									icon: UserIcon,
									items: [
										{
											label: 'Home',
											icon: HomeIcon,
										},
										{
											label: 'Home',
											icon: UserIcon,
										},
									],
								},
							],
						},
						{
							label: 'User Management Long Long Long Long Long Long Long Title',
							icon: UserIcon,
							items: [
								{
									label: 'Add user  Long Long Long Long Long Long Long Title',
									icon: UserIcon,
								},
								{
									label: 'User Roles Long Long Long Long Long Long Long Title',
									icon: UserIcon,
									items: [
										{
											label: 'Home  Long Long Long Long Long Long Long Title',
											icon: HomeIcon,
										},
										{
											label: 'Home Long Long Long Long Long Long Long Title',
											icon: UserIcon,
										},
									],
								},
							],
						},
						{
							type: 'group',
							label: 'SUPPORT',
						},
						{
							label: 'Home',
							icon: UserIcon,
						},
						{
							label: 'User Management',
							icon: UserIcon,
							items: [
								{
									label: 'Add user',
									icon: UserIcon,
								},
								{
									label: 'Add Role',
									icon: UserIcon,
								},
							],
						},
						{
							label: 'Home',
							icon: HomeIcon,
							isHidden: true,
						},
						{
							label: 'Insurance Companies Management',
							icon: UserIcon,
							isActive: true,
							items: [
								{
									label: 'Add user',
									icon: UserIcon,
									isActive: true,
								},
								{
									label: 'Add Role',
									icon: UserIcon,
								},
							],
						},
						{
							label: 'Insurance Companies Management',
							icon: UserIcon,
							isActive: true,
						},
					],
			  }
			: undefined,
		currentUser: withMenu
			? {
					displayName: 'John Doe',
					isLoggedIn: false,
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
			  }
			: undefined,
		currentUserPermissions: ['PermissionLevelViewTitle', 'PermissionLevelViewName', 'PermissionLevelViewID'],
	};
};
