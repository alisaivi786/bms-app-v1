import React, { ReactElement, ReactNode } from 'react';

export type ToastPositions = 'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right';

export interface IDrawerProps {
	/**
	 *React elements to be rendered within the Drawer component
	 */
	children?: ReactNode;
	/**The position of the drawer at the screen @default position: 'left' */
	position?: 'start' | 'end';
	/**If true, then the Close icon will be shown default is true*/
	showCloseIcon?: boolean;
	/**Callback function for hiding the Drawer*/
	onClose?: () => void;
	/**If true, will prevent closing of Drawer when clicked outside*/
	preventAutoClose?: boolean;
	/** Title of the Drawer */
	title?: ReactNode | string;
}

export interface IToastProps {
	/**The toast title */
	title: string | ReactElement | null | undefined;
	/**The position of the toast at the screen @default position: 'top-center' */
	position?: ToastPositions;
	/**Override the icon displayed before the children, the icon is mapped to the value of the severity prop. Unless provided, */
	icon?: React.FC<React.SVGProps<SVGSVGElement>>;
	/**the duration before hiding the toast */
	duration?: number;
	/**The toast description text */
	description?: string;
	/**The width of the toast container */
	width?: number;
	/** If provided a close button will be provided*/
	isClosable?: boolean;
	/**	Override or extend the styles applied to the component. */
	className?: string;
}

export type ISupportedLocales = 'en' | 'ar';

export interface ILink {
	href?: string;
	title?: string;
	children?: ReactNode;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
	download?: boolean;
	target?: React.HTMLAttributeAnchorTarget;
	isDisabled?: boolean;
}

export interface ISideBarItem {
	label: string;
	icon?: React.FC<React.SVGProps<SVGSVGElement>>;
	className?: string;
	activeClassName?: string;
	onClick?: () => void;
	items?: ISideBarItem[];
	isDisabled?: boolean;
	isHidden?: boolean;
	isActive?: boolean;
	dir?: 'ltr' | 'rtl';
	type?: 'group';
	badge?: string;
}

export interface IUserMenuItem {
	label: ReactNode;
	onClick?: () => void;
	icon?: React.FC<React.SVGProps<SVGSVGElement>> | ReactNode;
	className?: string;
	link?: {
		href: string;
		isExternal?: boolean;
	};
	testId?: string;
}

export interface ICurrentUser {
	displayName?: string;
	isLoggedIn?: boolean;
	userMenuItems?: IUserMenuItem[] | ReactNode;
	userMenuFooterItems?: IUserMenuItem[] | ReactNode;
	showAvatarAndDisplayName?: boolean;
	avatarInitials?: string;
	menuMinWidth?: number;
	noDrawerForUserMenu?: boolean | 'responsiveHide';
	lastLoggedIn?: string | Date | null;
}

export interface IWebUILibraryDictionary {
	errorText?: string;
	errorButtonText?: string;
	backButtonText?: string;
	continueButtonText?: string;
}

export type SystemLocale = 'ar' | 'en';

export interface IMarketPlace {
	isActive?: boolean;
	label: string;
	icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface IdevkitThemeProviderWithMarketSwitcher extends IdevkitThemeProvider {
	marketSwitcher?: IMarketSwitcher;
	/** Side bar items to be rendered , you need to pass this props
	 * (items, isExpanded, onExpandedStateChange and footer)
	 */
}

export interface IMarketSwitcher {
	/** List of marketplaces rendered inside the header switcher */
	marketPlaces: IMarketPlace[];
	/** Called when a marketplace is selected */
	onMarketPlaceChange?: (marketPlace: IMarketLocaleSwitcher) => Promise<void>;
	/** Called when the locale/language is changed */
	onLocaleChange?: (locale: ISupportedLocales) => Promise<void>;
}

export interface IMarketLocaleSwitcher extends IMarketPlace {
	locale: ISupportedLocales;
}

export interface IdevkitThemeProvider {
	/** The Link to be rendered. */
	renderLink?: (props: ILink) => JSX.Element;
	/** The localization to be used (en and ar) */
	locale: ISupportedLocales;
	/** The text that represent current page name */
	currentPagePath?: string;
	cdn?: string;
	/** Market/language switcher configuration shown in the header */

	sideBarItems?: {
		items: ISideBarItem[];
		isExpanded?: boolean;
		onExpandedStateChange?: (isExpanded: boolean) => void;
		footer?: ReactNode;
	};

	/** Header menu to be rendered */
	headerOptions?: {
		onChatIconClick?: () => void;
		onNotificationIconClick?: () => void;
		headerMenuRender?: (props: { isDisabled: boolean }) => JSX.Element;
	};

	onLanguageSwitchClick?: (locale: SystemLocale) => void;
	onSideMenuLogout?: () => void | Promise<void>;

	/** The Logo to be rendered, you need to pass these props ( logoColorMode and isDisabled) */
	logoRender?: (props: { logoColorMode: 'white' | 'dark'; isDisabled: boolean }) => JSX.Element;
	currentUser?: ICurrentUser;
	/** A confirmed toast icons property */
	toastDefaults?: Omit<IToastProps, 'title' | 'icon'> & {
		defaultsIcons?: {
			success?: React.FC<React.SVGProps<SVGSVGElement>>;
			error?: React.FC<React.SVGProps<SVGSVGElement>>;
			warning?: React.FC<React.SVGProps<SVGSVGElement>>;
			info?: React.FC<React.SVGProps<SVGSVGElement>>;
		};
	};
	tabNavigation?: (Omit<ISideBarItem, 'items' | 'label'> & { label?: string })[];
	drawer?: {
		drawerDefaults?: IDrawerProps;
		sections?: {
			sectionTitle?: string;
			items: ({ type: 'languageSwitch' } | ({ type?: undefined } & Omit<ISideBarItem, 'items'>))[];
		}[];
	};

	/** The localization to be used */
	localization?: IWebUILibraryDictionary;
	superAdminPermissionLevel?: string;
	/** List of User Permissions  */
	currentUserPermissions?: string[];

	screens?: { sm: number; md: number; lg: number; xl: number; '2xl': number; '3xl': number };
}
