import { Session } from 'next-auth';
import { SessionProvider, getSession } from 'next-auth/react';
import { FC, PropsWithChildren } from 'react';
import { useIsOnline } from '@devkit/web';

type ShorySessionProviderProps = PropsWithChildren<{
	session: Session | null;
	basePath?: string;
}>;

export const ShorySessionProvider: FC<ShorySessionProviderProps> = ({
	children,
	session,
	basePath = '/accounts/api/auth',
}) => {
	const isOnline = useIsOnline({
		onOnline: getSession,
	});

	return (
		<SessionProvider basePath={basePath} session={session} refetchOnWindowFocus={isOnline}>
			{children}
		</SessionProvider>
	);
};
