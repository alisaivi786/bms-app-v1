import { useState } from 'react';
import {
	ArchivePolicyIcon,
	CertificateLongIcon,
	ChatIcon,
	CompaniesIcon,
	HomeIcon,
	SettingsIcon,
	UserIcon,
	WalletIcon,
} from '@devkit/icons/web';
import { IdevkitThemeProvider } from '@devkit/shared-types';
import { useResponsiveView } from '../../../../src/hooks/useResponsiveView';

export const useFullHeaderLayoutSettings = (
	props:
		| {
				withMenu?: boolean;
				hamburgerPosition?: 'left' | 'right';
		  }
		| undefined
): IdevkitThemeProvider => {
	const { withMenu = false } = props ?? {};
	const [isExpanded, setIsExpanded] = useState<boolean>(true);
	const { sm } = useResponsiveView();

	return {
		locale: 'ar',
		renderLink: ({ href, title }) => <a href={href}>{title}</a>,
		headerOptions: {
			headerMenuRender: ({ isDisabled }) => (
				<>
					{!sm && (
						<>
							<div className="justify-center ">
								<p className="text-body">Car Insurance</p>
							</div>
							<div className="justify-center ">
								<p className="text-body">Support</p>
							</div>
						</>
					)}

					<div className="w-5 text-black">
						<ChatIcon
							className="!h-5 !w-5"
							onClick={() => {
								if (!isDisabled) {
									//	onOpen();
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
					className="h-6 md:h-7 w-32"
					src={logoColorMode === 'white' ? '/devkit-logo2.png' : '/devkit-logo2.png'}
					alt="devkit logo"
				/>
			</a>
		),
		sideBarItems: withMenu
			? {
					isExpanded,
					onExpandedStateChange: (isExpanded) => {
						setIsExpanded(isExpanded);
					},
					items: [
						{
							label: 'Dashboard',
							icon: HomeIcon,
							isActive: true,
							onClick: () => {
								alert('Dashboard clicked');
							},
						},
						{
							label: 'Quotas',
							icon: CertificateLongIcon,
							isDisabled: true,
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
							label: 'Policies',
							icon: ArchivePolicyIcon,
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
							label: 'Companies',
							icon: CompaniesIcon,
						},
						{
							label: 'Wallet',
							icon: WalletIcon,
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
							label: 'Account Settings',
							icon: SettingsIcon,
						},
					],
					// footer: <p className="text-paragraph text-gray-800 capitalize">last login: 4-May-2023</p>,
			  }
			: undefined,
		currentUser: withMenu
			? {
					displayName: 'John Doe',
					isLoggedIn: true,
					showAvatarAndDisplayName: true,
					userMenuItems: [
						{
							label: 'Account settings',
							className: 'hover:nj-bg-brand hover:!text-black',
							icon: UserIcon,
							onClick: () => {
								alert('Change Password clicked');
							},
							testId: 'user-menu-item-account-settings',
						},
						{
							label: 'Logout',
							className: '!text-red-500 hover:nj-bg-brand',
							onClick: () => {
								alert('ChanUser Profile clicked');
							},
							testId: 'user-menu-item-logout',
						},
					],
			  }
			: undefined,
		currentUserPermissions: ['PermissionLevelViewTitle', 'PermissionLevelViewName', 'PermissionLevelViewID'],
	};
};
