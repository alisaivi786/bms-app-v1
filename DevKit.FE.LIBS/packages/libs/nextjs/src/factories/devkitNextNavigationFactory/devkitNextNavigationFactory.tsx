import { Context, ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { logger } from '@devkit/utilities';
import { PagePermissionCheck } from '../../components/PagePermissionCheck/PagePermissionCheck';
import { Routers, useRouter } from '../../hooks/useRouter';
import { LinkFactory } from './LinkFactory';
import { WebNavigationUtilityReturn, useWebNavigationUtility } from './useWebNavigationUtility';

export type NavigationTransitionOptions = {
	shallow?: boolean;
	asPath?: string;
};

export interface INavigationContextProps<TAction> {
	currentUserActions: TAction[];
	/**
	 * Is the user logged in
	 */
	isLoggedInUser: boolean;
	/**
	 * The component to render when the user doesn't have permission to a page
	 */
	noPermissionComponent?: ReactNode;
	/**
	 * The component to render if the access to a certain page is revoked ([])
	 */
	noAccessComponent?: ReactNode;
	/**
	 * Callback function when redirecting to login page
	 */
	onRedirectToLogin?: () => void;
	/**
	 * Callback function to redirect only logged in users
	 */
	onRedirectLoggedInUser?: () => void;
}

interface INavigationContextInternalProps {
	navigatingUrl: undefined | string;
}

export interface IBasePermissionLevels<TAction extends string> {
	anonymousUser: TAction;
	allLoggedInUser: TAction;
	superAdmin: TAction;
	notLoggedInUser: TAction;
}

export type RoutePermissionResolver<TAction extends string, TParams> = (args: {
	route: string;
	params?: TParams;
	path?: string;
}) => TAction[];

export type RoutePermissions<TAction extends string, TParams> = TAction[] | RoutePermissionResolver<TAction, TParams>;

interface IdevkitNextNavigationFactory<TAction extends string, TRoutes> {
	routesPermissions: {
		[key in keyof TRoutes]: {
			path: string;
			permissions: RoutePermissions<TAction, TRoutes[key]>;
		};
	};
	basePermissionLevels: IBasePermissionLevels<TAction>;
	router?: Routers;

	prefix?: string
}

export class devkitNextNavigationFactory<TAction extends string, TRoutes> {
	private context: Context<INavigationContextProps<TAction> & INavigationContextInternalProps>;

	private routesPermissions: {
		[key in keyof TRoutes]: {
			path: string;
			permissions: RoutePermissions<TAction, TRoutes[key]>;
		};
	};

	private basePermissionLevels: IBasePermissionLevels<TAction>;

	private router: Routers;

	private prefix: string;



	constructor(params: IdevkitNextNavigationFactory<TAction, TRoutes>) {
		const { routesPermissions, basePermissionLevels, router = 'pages', prefix='' } = params;

		this.routesPermissions = routesPermissions;
		this.basePermissionLevels = basePermissionLevels;
		this.context = createContext<INavigationContextProps<TAction> & INavigationContextInternalProps>({
			currentUserActions: [],
			isLoggedInUser: false,
			navigatingUrl: '',
		});
		this.context.displayName = 'devkitNavigationContext';
		this.router = router;
		this.prefix = prefix;
	}

	Provider = ({
		children,
		...props
	}: INavigationContextProps<TAction> & {
		children: ReactNode;
	}) => {
		const [navigatingUrl, setNavigatingUrl] = useState<string>();
		const router = useRouter(this.router);

		const routeInProgressHandler = (url: string) => {
			setNavigatingUrl(url);
		};

		const routeInProgressCompleted = () => {
			setNavigatingUrl(undefined);
		};

		useEffect(() => {
			logger.log('[devkitNextNavigationFactory][useEffect]');

			if ('events' in router) {
				router.events.on('routeChangeStart', routeInProgressHandler);
				router.events.on('routeChangeComplete', routeInProgressCompleted);
			}

			return () => {
				if ('events' in router) {
					router.events.off('routeChangeStart', routeInProgressHandler);
					router.events.off('routeChangeComplete', routeInProgressCompleted);
				}
			};
		}, []);

		return (
			<this.context.Provider
				value={{
					...props,
					navigatingUrl,
				}}
			>
				{children}
			</this.context.Provider>
		);
	};

	useWebNavigation = (): WebNavigationUtilityReturn<TRoutes> => {
		const contextData = useContext(this.context);

		return useWebNavigationUtility(
			contextData,
			this.routesPermissions,
			this.basePermissionLevels,
			contextData.navigatingUrl,
			this.router,
			this.prefix
		);
	};

	get devkitNextLink() {
		return LinkFactory(this.routesPermissions);
	}

	PagePermissionGate = ({ children }: { children: ReactNode }) => {
		const contextData = useContext(this.context);
		const noPermissionDefault = <>No Permission</>;
		const noAccessDefault = <>No Access</>;
		const {
			CheckIfUserHasPermissionOnCurrentPage,
			CheckIfCurrentPageIsNotLoggedInOnly,
			CheckIfUserHasAccessOnCurrentPage,
		} = useWebNavigationUtility(
			contextData,
			this.routesPermissions,
			this.basePermissionLevels,
			contextData.navigatingUrl,
			this.router,
			this.prefix
		);

		const { isLoggedInUser, noPermissionComponent, onRedirectToLogin, onRedirectLoggedInUser, noAccessComponent } =
			contextData;
		const isUserHasPermissionOnCurrentPage = CheckIfUserHasPermissionOnCurrentPage();
		const isUserHasAccessOnCurrentPage = CheckIfUserHasAccessOnCurrentPage();

		return (
			<PagePermissionCheck
				noPermissionComponent={noPermissionComponent ?? noPermissionDefault}
				isLoggedInUser={isLoggedInUser}
				isUserHasPermissionOnCurrentPage={isUserHasPermissionOnCurrentPage}
				isUserHasAccessOnCurrentPage={isUserHasAccessOnCurrentPage}
				noAccessComponent={noAccessComponent ?? noAccessDefault}
				onRedirectToLogin={onRedirectToLogin}
				onRedirectLoggedInUser={onRedirectLoggedInUser}
				CheckIfCurrentPageIsNotLoggedInOnly={CheckIfCurrentPageIsNotLoggedInOnly}
				prefix={this.prefix}
			>
				{children}
			</PagePermissionCheck>
		);
	};

	useCheckForPermission = () => {
		const { currentUserActions } = useContext(this.context);
		const superAdminPermissionLevel = this.basePermissionLevels.superAdmin;

		const isUserHasPermission = (actionName: TAction) =>
			currentUserActions?.findIndex((action) => action === superAdminPermissionLevel || action === actionName) !== -1;

		return { isUserHasPermission };
	};
}
