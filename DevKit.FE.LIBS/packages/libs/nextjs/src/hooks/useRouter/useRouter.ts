import { useRouter as _usePagesRouter } from 'next/compat/router';
import { useRouter as _useAppRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { SystemLocale } from '@devkit/utilities';

export type Routers = 'app' | 'pages';

// Define the type for the observer callback function
type ObserverCallback = () => void;

const createRouteObserver = () => {
	let observer: ObserverCallback | null = null;

	const setObserver = (callback: ObserverCallback) => {
		observer = callback;
	};

	const notify = () => {
		if (observer) {
			observer();
		}
	};

	return { setObserver, notify };
};

const routeObserver = createRouteObserver();

export const usePagesRouter: typeof _usePagesRouter = () => {
	const pagesRouter = _usePagesRouter();

	if (!pagesRouter) {
		return null;
	}

	const { locale: lng, ...router } = pagesRouter;
	const locale: SystemLocale = lng === 'en' ? 'en' : 'ar';
	const isLoadingRouter = false;

	return { ...router, locale, isLoadingRouter };
};

export const useAppRouter = () => {
	const appRouter = _useAppRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const query = { ...Object.fromEntries(searchParams.entries()) };

	const [isPending, startTransition] = useTransition();

	const segments = pathname.split('/');
	const locale: SystemLocale = segments[1] === 'ar' ? 'ar' : 'en';

	const replace = async (url: string, asPath?: string, options?: { shallow?: boolean }) => {
		if (options?.shallow) {
			window.history.replaceState(window.history.state, '', url);

			return;
		}

		return new Promise<void>((resolve) => {
			startTransition(() => {
				appRouter.replace(url);
			});

			routeObserver.setObserver(() => {
				resolve();
			});
		});
	};

	const push = async (url: string, asPath?: string, options?: { shallow?: boolean }) => {
		if (options?.shallow) {
			window.history.pushState(window.history.state, '', url);

			return;
		}

		return new Promise<void>((resolve) => {
			startTransition(() => {
				appRouter.push(url);
			});

			routeObserver.setObserver(() => {
				resolve();
			});
		});
	};

	useEffect(() => {
		if (!isPending) {
			routeObserver.notify();
		}
	}, [isPending]);

	const router = {
		...appRouter,
		replace,
		push,
		pathname,
		query,
		locale,
		asPath: '',
	};

	return router;
};

export type PagesRouter = Exclude<ReturnType<typeof usePagesRouter>, null | undefined>;

export type AppRouter = ReturnType<typeof useAppRouter>;

export function useRouter(r?: Routers): PagesRouter | AppRouter {
	const pagesRouter = usePagesRouter();
	const appRouter = useAppRouter();

	const app = () => {
		if (!appRouter) {
			throw new Error('App router not mounted');
		}

		return appRouter;
	};

	const pages = () => {
		if (!pagesRouter) {
			throw new Error('Pages router not mounted');
		}

		return pagesRouter;
	};

	if (r === 'app') {
		return app();
	}

	if (r === 'pages') {
		return pages();
	}

	if (pagesRouter) {
		return pages();
	} else {
		return app();
	}
}
