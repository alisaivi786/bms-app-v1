'use client';

import { ReactNode } from 'react';
import { SfChevronDownIcon } from '@devkit/icons/web';
import { LayoutHeaderMenu, MenuItem } from '../../../components/LayoutHeaderMenu';
import { useWebUIConfigOptions } from '../../ThemeProvider/theme-context';
import { PartnerLanguageSwitch } from './PartnerLanguageSwitch';
import { PartnerUserAvatar } from './PartnerUserAvatar';

const UserMenu = () => {
	return (
		<div className="flex justify-center items-center gap-2 cursor-pointer">
			<PartnerUserAvatar />
			<SfChevronDownIcon className="w-3 text-gray-700" />
		</div>
	);
};

export const PartnerHeader = () => {
	const { currentPagePath, currentUser, onLanguageSwitchClick } = useWebUIConfigOptions();

	const userMenuItems: MenuItem[] | ReactNode = Array.isArray(currentUser?.userMenuItems)
		? currentUser?.userMenuItems.map((item) => ({
				content: item.label,
				className: item.className,
				icon: item.icon,
				link: item.link,
				onClick: item.onClick,
				testId: item.testId,
		  }))
		: currentUser?.userMenuItems;

	const userFooterItems: MenuItem[] | ReactNode = Array.isArray(currentUser?.userMenuFooterItems)
		? currentUser?.userMenuFooterItems.map((item) => ({
				content: item.label,
				className: item.className,
				icon: item.icon,
				link: item.link,
				onClick: item.onClick,
		  }))
		: currentUser?.userMenuFooterItems;

	return (
		<header className="nj-partner-header flex w-full items-center justify-between bg-white h-[77px] py-3 pl-[30px] pr-[30px] gap-4">
			{currentPagePath && <h1 className="text-paragraph font-medium nj-color-brand-900">{currentPagePath}</h1>}
			<div className="flex-1" />
			<div className="flex items-center gap-4">
				{onLanguageSwitchClick && (
					<div className="hidden md:block">
						<PartnerLanguageSwitch />
					</div>
				)}
				{userMenuItems && (
					<LayoutHeaderMenu triggerComponent={UserMenu} menuItems={userMenuItems} menuFooterItems={userFooterItems} />
				)}
				{!userMenuItems && <UserMenu />}
			</div>
		</header>
	);
};
