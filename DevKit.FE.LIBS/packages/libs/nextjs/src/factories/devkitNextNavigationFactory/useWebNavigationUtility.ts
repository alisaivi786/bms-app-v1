'use client';

import some from 'lodash/some';
import { useCallback } from 'react';
import {
	IBasePermissionLevels,
	INavigationContextProps,
	NavigationTransitionOptions,
	RoutePermissions,
} from '../../factories/devkitNextNavigationFactory/devkitNextNavigationFactory';
import { PagesRouter, Routers, useRouter } from '../../hooks/useRouter';

export const useWebNavigationUtility = <TAction extends string, IWebRoutesParams>(
	{ currentUserActions, isLoggedInUser }: INavigationContextProps<TAction>,
	routesPermissions: {
		[key in keyof IWebRoutesParams]: {
			path: string;
			permissions: RoutePermissions<TAction, IWebRoutesParams[key]>;
		};
	},
	basePermissionLevels: IBasePermissionLevels<TAction>,
	isNavigationInProgressUrl: undefined | string,
	router: Routers,
	prefix = ''
): WebNavigationUtilityReturn<IWebRoutesParams> => {
	const { replace, push, query, back, pathname, locale } = useRouter(router);

	type RoutesKeys = keyof IWebRoutesParams;

	const getNavigatingRouteState = useCallback(
		(...routes: RoutesKeys[]) => {
			const isNavigatingState: boolean[] = [];
			const navigatingRoute = isNavigationInProgressUrl ? getRouteForPath(isNavigationInProgressUrl) : undefined;

			routes.forEach((route) => {
				isNavigatingState.push(navigatingRoute === route);
			});

			return isNavigatingState;
		},
		[isNavigationInProgressUrl]
	);

	const getPathForRoute = useCallback(
		<Route extends RoutesKeys>(route: Route) => {
			return routesPermissions[route].path;
		},
		[routesPermissions]
	);

	const getNormalizedPathname = useCallback(
		(path: string) => {
			if (router === 'app' && path.startsWith(`/${locale}/`)) {
				return path.replace(`/${locale}`, '');
			}

			return path;
		},
		[router, locale]
	);

	const getRouteParamsFromPath = useCallback((template: string, path: string) => {
		const templateArray = template.split('/');
		const pathArray = path.split('/');

		if (templateArray.length !== pathArray.length) return {} as Record<string, string>;

		return templateArray.reduce<Record<string, string>>((acc, templatePart, index) => {
			if (templatePart.startsWith('[') && templatePart.endsWith(']')) {
				const key = templatePart.slice(1, -1);
				const value = pathArray[index];

				if (value) acc[key] = value;
			}

			return acc;
		}, {});
	}, []);

	const getNormalizedQueryParams = useCallback(() => {
		const queryValue = query ?? {};
		const normalizedParams: Record<string, string> = {};

		Object.keys(queryValue).forEach((key) => {
			const paramValue = queryValue[key];

			if (Array.isArray(paramValue)) {
				normalizedParams[key] = paramValue[0] ?? '';
			} else if (paramValue !== undefined) {
				normalizedParams[key] = String(paramValue);
			}
		});

		return normalizedParams;
	}, [query]);

	const getRouteForPath = useCallback(
		(path: string, prefix?: string) => {
			if (router === 'app') {
				// remove lng from the url
				path = getNormalizedPathname(path);
			}
			const comparePaths = (template: string, path: string) => {
				const templateArray = template.split('/');
				const pathArray = path.split('/');

				if (templateArray.length !== pathArray.length) return false;

				return templateArray.every((templateRoute, i) => {
					if (templateRoute.startsWith('[') && templateRoute.endsWith(']')) return true;

					return templateRoute === pathArray[i];
				});
			};
			const pagesKeys = Object.keys(routesPermissions);
			const pageKeyIndex =
				router === 'app'
					? pagesKeys.findIndex((pageKey) =>
							comparePaths(routesPermissions[pageKey as keyof typeof routesPermissions].path, prefix + path)
					  )
					: pagesKeys.findIndex(
							(pageKey) => routesPermissions[pageKey as keyof typeof routesPermissions].path === prefix + path
					  );

			if (pageKeyIndex > -1) {
				return pagesKeys[pageKeyIndex] as keyof typeof routesPermissions;
			}

			return undefined;
		},
		[routesPermissions, getNormalizedPathname, router]
	);

	const resolveRoutePermissions = useCallback(
		<Route extends RoutesKeys>(route: Route, params?: IWebRoutesParams[Route], path?: string) => {
			const permissions = routesPermissions[route].permissions;

			if (typeof permissions === 'function') {
				return permissions({ route: route as string, params, path });
			}

			return permissions;
		},
		[routesPermissions]
	);

	const getCurrentRouteParams = useCallback(
		<Route extends RoutesKeys>(route: Route) => {
			if (router === 'app') {
				const pathWithPrefix = `${prefix}${getNormalizedPathname(pathname)}`;
				const template = routesPermissions[route].path;

				return getRouteParamsFromPath(template, pathWithPrefix) as IWebRoutesParams[Route];
			}

			return getNormalizedQueryParams() as IWebRoutesParams[Route];
		},
		[
			pathname,
			prefix,
			router,
			getNormalizedPathname,
			getRouteParamsFromPath,
			getNormalizedQueryParams,
			routesPermissions,
		]
	);

	const userHasPermissionOnScreen = useCallback(
		<Route extends RoutesKeys>(
			...args: [
				route: Route,
				currentUserPermissions: TAction[] | undefined,
				isLoggedIn: boolean,
				params?: IWebRoutesParams[Route],
				path?: string
			]
		) => {
			const [route, currentUserPermissions, isLoggedIn, params, path] = args;
			const requiredScreenPermissions = resolveRoutePermissions(route, params, path);

			return some(
				requiredScreenPermissions,
				(permissionLevel) =>
					currentUserPermissions?.includes(basePermissionLevels.superAdmin) ||
					currentUserPermissions?.includes(permissionLevel) ||
					(isLoggedIn && permissionLevel === basePermissionLevels.allLoggedInUser) ||
					(!isLoggedIn && permissionLevel === basePermissionLevels.notLoggedInUser) ||
					permissionLevel === basePermissionLevels.anonymousUser
			);
		},
		[resolveRoutePermissions]
	);

	const navigateToInPageRouter = useCallback(
		async <Route extends RoutesKeys>(
			...args: [
				route: Route,
				query: IWebRoutesParams[Route] | undefined,
				isReplace?: boolean,
				options?: NavigationTransitionOptions
			]
		) => {
			const [route, query, isReplace, options] = args;
			const routerNavigate = isReplace ? (replace as PagesRouter['replace']) : (push as PagesRouter['push']);

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const filteredQuery = Object.fromEntries(Object.entries(query || {}).filter(([_, value]) => value !== undefined));

			const url = getPathForRoute(route);

			return await routerNavigate(
				{
					pathname: url ?? '',
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					...(Object.keys(filteredQuery).length > 0 ? ({ query: filteredQuery } as any) : {}),
				},
				options?.asPath,
				{ shallow: options?.shallow }
			);
		},
		[getPathForRoute]
	);

	const navigateToInAppRouter = useCallback(
		async <Route extends RoutesKeys>(
			...args: [
				route: Route,
				query: IWebRoutesParams[Route] | undefined,
				isReplace?: boolean,
				options?: NavigationTransitionOptions
			]
		) => {
			const [route, query, isReplace, options] = args;
			const routerNavigate = isReplace ? replace : push;

			const newRoute = getPathForRoute(route);
			const _query: Record<string, string> = { ...query };
			let _path = newRoute;

			newRoute
				.split('/')
				.filter((r) => r.startsWith('[') && r.endsWith(']'))
				.map((r) => r.replace('[', '').replace(']', ''))
				.forEach((r) => {
					if (_query[r]) {
						_path = _path.replace(`[${r}]`, _query[r]);
						delete _query[r];
					}
				});

			const UrlQuery = new URLSearchParams(_query);
			const url = `${locale !== 'en' ? `/${locale}` : ''}${_path}${
				UrlQuery.toString() ? `?${UrlQuery.toString()}` : ''
			}`;

			return await routerNavigate(url, options?.asPath, { shallow: options?.shallow });
		},
		[getPathForRoute]
	);

	const navigationPush = useCallback(
		async <Route extends RoutesKeys>(
			...args: undefined extends IWebRoutesParams[Route]
				? [route: Route] | [route: Route, query: IWebRoutesParams[Route], options?: NavigationTransitionOptions]
				: [route: Route, query: IWebRoutesParams[Route], options?: NavigationTransitionOptions]
		) => {
			const [route, query, options] = args;

			return router === 'app'
				? await navigateToInAppRouter(route, query, false, options)
				: await navigateToInPageRouter(route, query, false, options);
		},
		[]
	);

	const navigationReplace = useCallback(
		async <Route extends RoutesKeys>(
			...args: undefined extends IWebRoutesParams[Route]
				? [route: Route] | [route: Route, query: IWebRoutesParams[Route], options?: NavigationTransitionOptions]
				: [route: Route, query: IWebRoutesParams[Route], options?: NavigationTransitionOptions]
		) => {
			const [route, query, options] = args;

			return router === 'app'
				? await navigateToInAppRouter(route, query, true, options)
				: await navigateToInPageRouter(route, query, true, options);
		},
		[]
	);

	const routerQuery = useCallback(
		<Route extends RoutesKeys>(
			/** args parameter is required to define the output type  */
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			route: Route
		) => {
			const queryValue = query ?? {};

			Object.keys(queryValue).forEach((key) => {
				const paramValue = queryValue[key];

				queryValue[key] = paramValue;
			});

			type TResult = Exclude<IWebRoutesParams[Route], undefined>;

			return queryValue as Partial<{
				[key in keyof TResult]: string;
			}>;
		},
		[query]
	);

	const navigationGoBack = useCallback((pageNum = -1) => {
		if (pageNum && pageNum < -1) {
			window.history.go(pageNum);
		} else back();
	}, []);

	const CheckIfUserHasPermissionToScreen = useCallback(
		<Route extends RoutesKeys>(route: Route, params?: IWebRoutesParams[Route]) => {
			return userHasPermissionOnScreen(route, currentUserActions, isLoggedInUser, params);
		},
		[userHasPermissionOnScreen]
	);

	const getCurrentPage = useCallback(() => {
		return getRouteForPath(pathname, prefix);
	}, [getRouteForPath, pathname, prefix]);

	const CheckIfUserHasPermissionOnCurrentPage = useCallback(() => {
		const currentScreen = getCurrentPage();

		if (currentScreen) {
			const params = getCurrentRouteParams(currentScreen);
			const pathWithPrefix = `${prefix}${getNormalizedPathname(pathname)}`;

			return userHasPermissionOnScreen(currentScreen, currentUserActions, isLoggedInUser, params, pathWithPrefix);
		}

		return false;
	}, [
		userHasPermissionOnScreen,
		getCurrentPage,
		isLoggedInUser,
		currentUserActions,
		getCurrentRouteParams,
		pathname,
		prefix,
		getNormalizedPathname,
	]);

	const CheckIfUserHasAccessOnCurrentPage = useCallback(() => {
		const currentScreen = getCurrentPage();

		if (!currentScreen) return false;
		const params = getCurrentRouteParams(currentScreen);
		const pathWithPrefix = `${prefix}${getNormalizedPathname(pathname)}`;
		const permissions = resolveRoutePermissions(currentScreen, params, pathWithPrefix);

		return permissions.length !== 0;
	}, [getCurrentPage, getCurrentRouteParams, getNormalizedPathname, pathname, prefix, resolveRoutePermissions]);

	const CheckIfCurrentPageIsNotLoggedInOnly = useCallback(() => {
		const currentScreen = getCurrentPage();

		if (!currentScreen) return false;
		const params = getCurrentRouteParams(currentScreen);
		const pathWithPrefix = `${prefix}${getNormalizedPathname(pathname)}`;
		const requiredScreenPermissions = resolveRoutePermissions(currentScreen, params, pathWithPrefix);

		return (
			isLoggedInUser &&
			some(requiredScreenPermissions, (permissionLevel) => permissionLevel === basePermissionLevels.notLoggedInUser)
		);
	}, [
		getCurrentPage,
		getCurrentRouteParams,
		getNormalizedPathname,
		isLoggedInUser,
		pathname,
		prefix,
		resolveRoutePermissions,
	]);

	return {
		navigationPush,
		navigationReplace,
		navigationGoBack,
		routerQuery,
		getPathForRoute,
		CheckIfUserHasPermissionToScreen,
		CheckIfUserHasPermissionOnCurrentPage,
		CheckIfUserHasAccessOnCurrentPage,
		CheckIfCurrentPageIsNotLoggedInOnly,
		getCurrentPage,
		getNavigatingRouteState,
	};
};

export type WebNavigationUtilityReturn<IWebRoutesParams> = {
	/**
	 * a function to push a new router entry
	 * @constructor
	 * @param {Route} route - The route to go to as defined in the routes and permissions.
	 * @param {IWebRoutesParams[Route]} query - The query to attach to the URL.
	 * @param {boolean} options.shallow=false - Update the path of the current page without rerunning getStaticProps, getServerSideProps or getInitialProps.
	 * @param {string} options.asPath=undefined - The path as shown in the browser including the search params
	 * @param {boolean} options.keepExisitingQuery=false - flag to keep the existing query
	 */
	navigationPush: <Route extends keyof IWebRoutesParams>(
		...args: undefined extends IWebRoutesParams[Route]
			? [route: Route] | [route: Route, query: IWebRoutesParams[Route], options?: NavigationTransitionOptions]
			: [route: Route, query: IWebRoutesParams[Route], options?: NavigationTransitionOptions]
	) => Promise<void | boolean>;
	/**
	 * a function to replace the existing router entry with a new one
	 * @constructor
	 * @param {Route} route - The route to go to as defined in the routes and permissions.
	 * @param {IWebRoutesParams[Route]} query - The query to attach to the URL.
	 * @param {NavigationTransitionOptions} options - an object options
	 * @param {boolean} options.shallow=false - Update the path of the current page without rerunning getStaticProps, getServerSideProps or getInitialProps.
	 * @param {string} options.asPath=undefined - The path as shown in the browser including the search params
	 * @param {boolean} options.keepExisitingQuery=false - flag to keep the existing query
	 */
	navigationReplace: <Route extends keyof IWebRoutesParams>(
		...args: undefined extends IWebRoutesParams[Route]
			? [route: Route] | [route: Route, query: IWebRoutesParams[Route], options?: NavigationTransitionOptions]
			: [route: Route, query: IWebRoutesParams[Route], options?: NavigationTransitionOptions]
	) => Promise<void | boolean>;
	/**
	 * a function to get back to the previous entry in the stack
	 * @constructor
	 * @param {number} pageNum=-1 - how many entries to go back. defaults to 1
	 */
	navigationGoBack: (pageNum?: number) => void;
	/**
	 * a function to get the query params of a route
	 * @constructor
	 * @param {string} route - The route to get it's params as defined in the routes and permissions
	 * @returns {object} - all the query params
	 */
	routerQuery: <Route extends keyof IWebRoutesParams>(
		/** args parameter is required to define the output type  */
		route: Route
	) => Partial<{
		[key in keyof Exclude<IWebRoutesParams[Route], undefined>]: string;
	}>;
	/**
	 * function to get the path of a route defined in the routes-and-permissions
	 * @constructor
	 * @param {keyof IWebRoutesParams} route - The route to get its path
	 * @returns {string} path
	 */
	getPathForRoute: (route: keyof IWebRoutesParams) => string;
	/**
	 * function to check if the user has the permission on the screen
	 * @constructor
	 * @param {keyof IWebRoutesParams} route - the route to check
	 * @param {IWebRoutesParams[Route]} params - optional params used for dynamic permissions
	 * @returns {boolean} - boolean repressing the permission
	 */
	CheckIfUserHasPermissionToScreen: <Route extends keyof IWebRoutesParams>(
		route: Route,
		params?: IWebRoutesParams[Route]
	) => boolean;
	/**
	 * function to check if the user has the permission on the current screen
	 * @constructor
	 * @returns {boolean} - boolean repressing the permission
	 */
	CheckIfUserHasPermissionOnCurrentPage: () => boolean;
	/**
	 * function to check if the user has the access on the current screen
	 * @constructor
	 * @returns {boolean} - boolean repressing the permission
	 */
	CheckIfUserHasAccessOnCurrentPage: () => boolean;
	/**
	 * function to check if the current screen is not logged in only
	 * @constructor
	 * @returns {boolean} - boolean repressing the permission
	 */
	CheckIfCurrentPageIsNotLoggedInOnly: () => boolean;
	/**
	 * function to get the current page route
	 * @constructor
	 * @returns {keyof IWebRoutesParams} route - the current route
	 */
	getCurrentPage: () => keyof IWebRoutesParams | undefined;
	/**
	 * function to get the routes navigating state
	 * @constructor
	 * @param {(keyof IWebRoutesParams)[]} routes - The routes
	 * @returns {boolean[]} the navigating state of every route
	 */
	getNavigatingRouteState: (...routes: (keyof IWebRoutesParams)[]) => boolean[];
};
