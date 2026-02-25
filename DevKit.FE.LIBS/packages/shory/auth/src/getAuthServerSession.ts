import { IncomingHttpHeaders } from 'http';
import { SavedSessionInfo } from 'next-auth';

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAuthServerSession = async (reqHeaders: Headers | IncomingHttpHeaders) => {
	const headers = new Headers(reqHeaders as Record<string, string>);

	const cookieHeader = headers.get('Cookie');
	const newHeaders = new Headers();

	if (cookieHeader) newHeaders.set('Cookie', cookieHeader);

	const authCookies = ['next-auth.session-token', '__Secure-next-auth.session-token'];

	const authCookieExists = authCookies.map((c) => cookieHeader?.includes(c)).some((c) => c != undefined);

	if (!authCookieExists) {
		return undefined;
	}

	const session = await fetch(`${process.env.NEXTAUTH_URL}/session`, {
		headers: newHeaders,
	});

	const sessionData: SavedSessionInfo = await session.json();

	return Object.keys(sessionData).length === 0 ? undefined : sessionData;
};
