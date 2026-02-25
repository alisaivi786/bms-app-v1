import NextLink from 'next/link';
import React, { Ref, forwardRef } from 'react';
import type { RoutePermissions } from './devkitNextNavigationFactory';

type RoutesAndQueries<IWebRoutesParams> = {
	[K in keyof IWebRoutesParams]: IWebRoutesParams[K] extends Partial<IWebRoutesParams[K]>
		? { route: K; query?: never } | { route: K; query: IWebRoutesParams[K] }
		: IWebRoutesParams[K] extends undefined
		? {
				route: K;
				query?: never;
		  }
		: {
				route: K;
				query: IWebRoutesParams[K];
		  };
}[keyof IWebRoutesParams];

export const LinkFactory = <TAction extends string, IWebRoutesParams>(
	routesPermissions: {
		[key in keyof IWebRoutesParams]: { path: string; permissions: RoutePermissions<TAction, IWebRoutesParams[key]> };
	},
) => {
	const getPathForRoute = (route: keyof IWebRoutesParams) => {
		return routesPermissions[route].path;
	};

	const devkitNextLink = forwardRef(
		(
			{
				route,
				query,
				children,
				...rest
			}: RoutesAndQueries<IWebRoutesParams> & { children: React.ReactNode } & Omit<
					Parameters<typeof NextLink>[0],
					'children' | 'href' | 'query'
				>,
			ref: Ref<HTMLAnchorElement> | undefined
		) => {
			const urlQuery = query ? `?${new URLSearchParams(query as Record<string, string>).toString()}` : '';
			const url = getPathForRoute(route) + urlQuery;

			return (
				<NextLink href={url} ref={ref} {...rest}>
					{children}
				</NextLink>
			);
		}
	);

	devkitNextLink.displayName = 'devkitNextLink';

	return devkitNextLink;
};
