import isEmpty from 'lodash/isEmpty';
import { FC, MouseEvent, ReactNode } from 'react';
import { GlobalIcon, MenuBurgerIcon, RoundedUserIcon } from '@devkit/icons/web';
import { ISideBarItem } from '@devkit/shared-types';
import { useDrawer } from '../components/Drawer';
import { LanguageSwitch } from '../components/LanguageSwitch/LanguageSwitch';
import { LayoutHeaderMenu, MenuItem } from '../components/LayoutHeaderMenu';
import { useWebUIConfigOptions } from '../layouts/ThemeProvider/theme-context';
import { enableTestId } from '../utils/lib-config';
import { Anchor } from './Anchor';
import { MarketSwitcherToggleButton } from './MarketSwitcher';
import { useMarketSwitcher } from './MarketSwitcherContext';
import UserAvatar from './UserAvatar';

const MenuTriggerComponent: FC<{ isOpen?: boolean }> = ({ isOpen }) => {
	const { currentUser } = useWebUIConfigOptions();
	const { isLoggedIn, showAvatarAndDisplayName } = currentUser ?? {};

	return (
		<>
			{!isLoggedIn && !isEmpty(currentUser?.userMenuItems) && <MenuBurgerIcon className="w-6 h-6" />}
			{isLoggedIn && !showAvatarAndDisplayName && (
				<RoundedUserIcon className={`h-6 w-6 py-0.5 text-black ${isOpen ? 'nj-text-brand' : ''}`} />
			)}
			{isLoggedIn && showAvatarAndDisplayName && <UserAvatar variant="dark" />}
		</>
	);
};

const HeaderUserMenu = ({ disabled = false }: { disabled?: boolean }) => {
	const { showDrawer, closeDrawer } = useDrawer();
	const { currentUser, drawer, onLanguageSwitchClick } = useWebUIConfigOptions();
	const { marketSwitcher } = useMarketSwitcher();
	const { sections } = drawer ?? {};

	/**
	 * Removes the 'overflow' property from the document body to enable the scrolling of the main page content
	 */
	const onCloseDrawer = () => {
		document.body.style.removeProperty('overflow');
	};

	const onDrawerItemClick = (item: { type?: undefined } & Omit<ISideBarItem, 'items'>, event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		item.onClick?.();
		closeDrawer();
		onCloseDrawer();
	};

	const onShowDrawer = () => {
		if (!drawer) return;

		document.body.style.setProperty('overflow', 'hidden', 'important');

		showDrawer({
			position: 'end',
			title: drawer.drawerDefaults?.title,
			onClose: onCloseDrawer,
			children: drawer.drawerDefaults?.children ?? (
				<div className="flex flex-col px-6">
					{sections?.map((a, sectionIndex) => {
						{
							return (
								<div
									className={`flex flex-col gap-4 py-4 ${sectionIndex > 0 ? 'border-t  border-t-gray-200' : ''}`}
									key={`drawer-section-${sectionIndex}`}
								>
									{a.sectionTitle && <div className="font-medium">{a.sectionTitle}</div>}
									{a.items.map((item, itemIndex) => {
										const { type } = item;

										if (type === 'languageSwitch')
											return (
												<>
													{onLanguageSwitchClick && !marketSwitcher && (
														<a
															href="#"
															className="flex items-center gap-4 hover:text-gray-700"
															key={`drawer-link-${sectionIndex}-${itemIndex}`}
															onClick={(e) => {
																e.preventDefault();
																e.stopPropagation();
															}}
														>
															<GlobalIcon className="w-4 h-4" />
															<LanguageSwitch
																onLanguageChanged={() => {
																	closeDrawer();
																	onCloseDrawer();
																}}
															/>
														</a>
													)}

													<div className="mt-2 flex lg:hidden">
														<MarketSwitcherToggleButton />
													</div>
												</>
											);

										return (
											<Anchor
												className={`flex ${item.className ?? ''} items-center justify-between gap-4 ${
													item.isActive ? item.activeClassName ?? 'nj-text-brand' : ''
												} ${item.isHidden ? 'hidden' : ''}
											${item.isDisabled ? 'text-gray-400 pointer-events-none' : 'hover:text-gray-700'}
											`}
												key={`drawer-link-${sectionIndex}-${itemIndex}`}
												onClick={(e) => {
													onDrawerItemClick(item, e);
												}}
												href="#"
											>
												<div className="flex gap-4 items-center ">
													{item.icon && <item.icon className="w-4 h-4" />}
													<span dir={item.dir}>{item.label}</span>
												</div>
												{item.badge && <ItemBadge badge={item.badge} />}
											</Anchor>
										);
									})}
								</div>
							);
						}
					})}
				</div>
			),
		});
	};

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
		<>
			{currentUser && (
				<div>
					{!currentUser.noDrawerForUserMenu && (
						<div
							className="cursor-pointer lg:hidden text-paragraph"
							onClick={onShowDrawer}
							data-testid={enableTestId ? 'web-responsive-sidebar-menu-button' : undefined}
						>
							<MenuTriggerComponent />
						</div>
					)}
					<div className="flex gap-4 flex-graw">
						<div
							className={`cursor-pointer ${
								currentUser.noDrawerForUserMenu &&
								currentUser.noDrawerForUserMenu !== 'responsiveHide' &&
								currentUser.isLoggedIn
									? ''
									: 'hidden lg:block'
							}`}
						>
							<LayoutHeaderMenu
								menuItems={userMenuItems}
								menuFooterItems={userFooterItems}
								minWidth={currentUser?.menuMinWidth}
								disabled={disabled || !currentUser?.userMenuItems}
								triggerComponent={MenuTriggerComponent}
								testId="account-dashboard-user-name"
							/>
						</div>
						{currentUser.noDrawerForUserMenu && drawer && (
							<MenuBurgerIcon className="w-6 h-6 lg:hidden" onClick={onShowDrawer} />
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default HeaderUserMenu;

const ItemBadge = ({ badge }: { badge: string }) => {
	return <span className="nj-bg-brand text-white text-caption1 px-2 pt-0.5 rounded-full">{badge}</span>;
};
