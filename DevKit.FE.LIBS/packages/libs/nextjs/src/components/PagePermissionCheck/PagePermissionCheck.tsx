import { PropsWithChildren, ReactNode, useEffect } from 'react';
import { PersistorSuspense, logger } from '@devkit/utilities';
import { useRouter } from '../../hooks/useRouter';

export interface IPagePermissionCheck {
	noPermissionComponent: ReactNode;
	isLoggedInUser: boolean;
	isUserHasPermissionOnCurrentPage: boolean;
	noAccessComponent: ReactNode;
	isUserHasAccessOnCurrentPage: boolean;
	prefix?: string;
	onRedirectToLogin?: () => void;
	onRedirectLoggedInUser?: () => void;
	CheckIfCurrentPageIsNotLoggedInOnly: () => boolean;
}

export const PagePermissionCheck = ({
	children,
	isLoggedInUser,
	isUserHasPermissionOnCurrentPage,
	onRedirectToLogin,
	noPermissionComponent,
	noAccessComponent,
	isUserHasAccessOnCurrentPage,
	onRedirectLoggedInUser,
	CheckIfCurrentPageIsNotLoggedInOnly,
	prefix='',
}: PropsWithChildren<IPagePermissionCheck>) => {
	const { pathname, query } = useRouter();
	const noPermission = Object.keys(query).find((k) => k.toLowerCase() === 'unauthorized');
	const isCurrentPageIsNotLoggedInOnly = CheckIfCurrentPageIsNotLoggedInOnly();

	useEffect(() => {
		logger.log('[PagePermissionCheck][useEffect]', {
			pathname,
			isLoggedInUser,
			isUserHasPermissionOnCurrentPage,
			prefix,
		});

		if (isCurrentPageIsNotLoggedInOnly) {
			onRedirectLoggedInUser?.();
		} else if (
			typeof window !== 'undefined' &&
			!isLoggedInUser &&
			!isUserHasPermissionOnCurrentPage &&
			isUserHasAccessOnCurrentPage
		) {
			onRedirectToLogin?.();
		}
	}, [isLoggedInUser, isUserHasPermissionOnCurrentPage, pathname, isCurrentPageIsNotLoggedInOnly]);

	/** onRedirectLoggedInUser event should be in progress, then no UI needed  */
	if (isCurrentPageIsNotLoggedInOnly) return <></>;

	if (typeof window !== 'undefined' && !isUserHasAccessOnCurrentPage) {
		return <PersistorSuspense>{noAccessComponent}</PersistorSuspense>;
	}

	if (noPermission || (isLoggedInUser && !isUserHasPermissionOnCurrentPage)) return <>{noPermissionComponent}</>;
	else if (isUserHasPermissionOnCurrentPage) return <>{children}</>;

	return <></>;
};
