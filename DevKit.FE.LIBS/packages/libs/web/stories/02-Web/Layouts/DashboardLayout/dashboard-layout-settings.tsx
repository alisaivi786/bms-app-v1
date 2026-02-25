import { useState } from 'react';
import {
	ArchivePolicyIcon,
	CertificateLongIcon,
	CompaniesIcon,
	HomeIcon,
	KsaFlagIcon,
	LogoutIcon,
	SettingsIcon,
	UaeFlagIcon,
	UserIcon,
	WalletIcon,
} from '@devkit/icons/web';
import { IMarketPlace, IdevkitThemeProviderWithMarketSwitcher } from '@devkit/shared-types';
import { useWebUIConfigOptions } from '../../../../src/layouts/ThemeProvider/theme-context';

const dummyText = {
	en: {
		Support: 'Support',
		Dashboard: 'Dashboard',
		Quotas: 'Quotas',
		Policies: 'Policies',
		Wallet: 'Wallet',
		AccountSettings: 'Account Settings',
		lastLogin: 'last login: 4-May-2023',
		Logout: 'Logout',
	},
	ar: {
		Support: 'الدعم',
		Dashboard: 'لوحة القيادة',
		Quotas: 'الحصص',
		Policies: 'سياسات',
		Wallet: 'محفظة',
		AccountSettings: 'إعدادت الحساب',
		lastLogin: 'آخر تسجيل دخول: 4 مايو 2023',
		Logout: 'تسجيل خروج',
	},
};

export const useDashboardLayoutSettings = ({
	nonLoggedInUser,
	showUserAvatar,
	customHeaderMenu,
	marketSwitcher,
}: {
	nonLoggedInUser?: boolean;
	showUserAvatar?: boolean;
	customHeaderMenu?: boolean;
	marketSwitcher?: boolean;
}) => {
	const [isActive, setIsActive] = useState('Dashboard');
	const { locale } = useWebUIConfigOptions();
	const layoutSettings: IdevkitThemeProviderWithMarketSwitcher = { locale };

	layoutSettings.logoRender = ({ logoColorMode, isDisabled }) => (
		<a
			onClick={(e) => {
				if (isDisabled) {
					e.stopPropagation();
					e.preventDefault();
				}
			}}
		>
			<img
				className="h-9 w-32"
				src={logoColorMode === 'white' ? '/devkit-logo2.png' : '/devkit-logo2.png'}
				alt="devkit logo"
			/>
		</a>
	);

	if (customHeaderMenu) {
		layoutSettings.headerOptions = {
			headerMenuRender: () => {
				return <>Support</>;
			},
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

	layoutSettings.renderLink = ({ href, title, children, className }) => (
		<a href={href} className={className}>
			{title ?? children}
		</a>
	);

	layoutSettings.currentUser = {
		isLoggedIn: !nonLoggedInUser,
		avatarInitials: 'A',
		showAvatarAndDisplayName: showUserAvatar,
		displayName: 'John Doe',
		userMenuItems: [
			{
				label: 'Logout',
				icon: LogoutIcon,
				onClick: () => {
					alert('logout clicked');
				},
				testId: 'user-menu-item-logout',
			},
			{
				label: 'External Link',
				icon: LogoutIcon,
				link: {
					href: 'https://shory.com',
					isExternal: true,
				},
				testId: 'user-menu-item-external-link',
			},
			{
				label: 'Link',
				icon: LogoutIcon,
				link: {
					href: 'https://shory.com',
				},
				testId: 'user-menu-item-link',
			},
		],
	};

	layoutSettings.sideBarItems = {
		items: [
			{
				label: dummyText[locale].Dashboard,
				icon: HomeIcon,
				isActive: isActive === 'Dashboard',
				onClick: () => {
					setIsActive('Dashboard');
				},
			},
			{
				label: dummyText[locale].Quotas,
				icon: CertificateLongIcon,
				isActive: isActive === 'Quotas',
				onClick: () => {
					setIsActive('Quotas');
				},
				isDisabled: true,
				items: [
					{
						label: 'Add user',
						icon: UserIcon,
					},
				],
			},
			{
				label: dummyText[locale].Policies,
				icon: ArchivePolicyIcon,
				isActive: isActive === 'Policies',
				onClick: () => {
					setIsActive('Policies');
				},
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
								label: 'Home Long Long Long Long Long Long Long Title',
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
				isActive: isActive === 'Companies',
				onClick: () => {
					setIsActive('Companies');
				},
				isHidden: true,
			},
			{
				label: dummyText[locale].Wallet,
				icon: WalletIcon,
				isActive: isActive === 'Wallet',
				onClick: () => {
					setIsActive('Wallet');
				},
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
				label: dummyText[locale].AccountSettings,
				icon: SettingsIcon,
				isActive: isActive === 'Account Settings',
				onClick: () => {
					setIsActive('Account Settings');
				},
			},
			{
				label: 'Companies',
				icon: CompaniesIcon,
				isActive: isActive === 'Companies',
				onClick: () => {
					setIsActive('Companies');
				},
				isHidden: true,
			},
			{
				label: 'Companies',
				icon: CompaniesIcon,
				isActive: isActive === 'Companies',
				onClick: () => {
					setIsActive('Companies');
				},
				isHidden: true,
			},
			{
				label: 'Companies',
				icon: CompaniesIcon,
				isActive: isActive === 'Companies',
				onClick: () => {
					setIsActive('Companies');
				},
				isHidden: true,
			},
		],
		footer: <p className="text-paragraph text-gray-800 capitalize">{dummyText[locale].lastLogin}</p>,
	};

	layoutSettings.tabNavigation = [
		{
			icon: HomeIcon,
			isActive: isActive === 'Dashboard',
			onClick: () => {
				setIsActive('Dashboard');
			},
			label: 'Dashboard',
		},
		{
			icon: CertificateLongIcon,
			isActive: isActive === 'Quotas',
			onClick: () => {
				setIsActive('Quotas');
			},
			label: 'Quotas',
		},
		{
			icon: ArchivePolicyIcon,
			isActive: isActive === 'Policies',
			onClick: () => {
				setIsActive('Policies');
			},
			label: 'Policies',
		},
		{
			icon: CompaniesIcon,
			isActive: isActive === 'Companies',
			onClick: () => {
				setIsActive('Companies');
			},
			isHidden: true,
			label: 'Companies',
		},
		{
			icon: WalletIcon,
			isActive: isActive === 'Wallet',
			onClick: () => {
				setIsActive('Wallet');
			},
			isDisabled: true,
			label: 'Wallet',
		},
	];

	layoutSettings.drawer = {
		sections: [
			{
				items: [
					{
						label: 'Get Quote',
						icon: UserIcon,
					},
					{
						label: 'Get Quote',
						icon: UserIcon,
						isActive: true,
					},
				],
			},
			{
				sectionTitle: 'Car insurance',
				items: [
					{
						icon: UserIcon,
						label: 'None UAE Vehicles',
					},
					{
						icon: UserIcon,
						label: 'UAE Vehicles',
					},
				],
			},
			{
				sectionTitle: 'Car insurance',
				items: [
					{
						icon: UserIcon,
						label: 'None UAE Vehicles',
					},
					{
						icon: UserIcon,
						label: 'UAE Vehicles',
					},
				],
			},
			{
				sectionTitle: 'Car insurance',
				items: [
					{
						icon: UserIcon,
						label: 'None UAE Vehicles',
					},
					{
						icon: UserIcon,
						label: 'UAE Vehicles',
					},
				],
			},
			{
				items: [{ type: 'languageSwitch' }],
			},
			{
				items: [
					{
						icon: UserIcon,
						className: 'text-red-500',
						label: 'Logout',
					},
				],
			},
		],
	};

	layoutSettings.onLanguageSwitchClick = (locale) => alert(locale);

	return layoutSettings;
};
