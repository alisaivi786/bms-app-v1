'use client';
import { ReactNode } from 'react';
import { DirectionDownCaretFilledIcon, MenuBurgerIcon } from '@devkit/icons/web';
import LogoHeader from '../../common/LogoHeader';
import UserAvatar from '../../common/UserAvatar';
import { LayoutHeaderMenu, MenuItem } from '../../components/LayoutHeaderMenu';
import { useHTMLElementObserver } from '../../hooks/useHTMLElementObserver';
import { useWebUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';

export interface IAdminHeaderProps {
	onMenuToggle: () => void;
	disabled?: boolean;
	onHeaderHeightChange: (height: number) => void;
}

const UserMenu = () => {
	return (
		<div className="flex justify-center items-center gap-2 cursor-pointer">
			<UserAvatar variant="light" />
			<DirectionDownCaretFilledIcon className="w-4 text-white" />
		</div>
	);
};

export const AdminHeader = ({ onMenuToggle, disabled = false, onHeaderHeightChange }: IAdminHeaderProps) => {
	const { contentRef } = useHTMLElementObserver<HTMLDivElement>({
		onChange: (element) => {
			onHeaderHeightChange(element.getBoundingClientRect().height);
		},
	});
	const { currentUser } = useWebUIConfigOptions();

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
		<div className="shadow flex w-full items-center nj-bg-header py-4 nj-admin-header-px" ref={contentRef}>
			<div className="pe-5">
				<MenuBurgerIcon className="text-white w-4 cursor-pointer" onClick={onMenuToggle} />
			</div>
			<div className="select-none">
				<LogoHeader disabled={disabled} logoColorMode="white" />
			</div>
			<div className="flex-1" />
			{userMenuItems && (
				<LayoutHeaderMenu
					triggerComponent={UserMenu}
					menuItems={userMenuItems}
					menuFooterItems={userFooterItems}
					disabled={disabled}
					showBehavior="hover"
				/>
			)}
			{!userMenuItems && <UserMenu />}
		</div>
	);
};
