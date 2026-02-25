import { useCallback, useEffect } from 'react';
import { AuthorizationSource } from './AuthorizationSource';

const getClientIdParams = () => {
	const params = window && new URLSearchParams(window.location.search);
	const paramClientId = params?.get('client_id');

	return paramClientId;
};

type IAuthorizePageProps = {
	/**
	 * Logged in user uid to pass to the client website and detect if the user logged in or not
	 */
	loggedUserUid: string | undefined;
	/**
	 * To generate the authorization code that will be passed to to the client website and used to authorize it
	 *
	 * @param paramClientId - The client id fetched from the query param to generate the authorization code against
	 * @returns The authorization code
	 */
	authorizeUser: (paramClientId: string | null) => Promise<string> | string;
	/**
	 * The source of authorization
	 */
	authorizationSource: AuthorizationSource;
};

const AuthorizeSourcePage = (props: IAuthorizePageProps) => {
	const { loggedUserUid, authorizeUser, authorizationSource } = props;

	const redirectUser = useCallback(async () => {
		const paramClientId = getClientIdParams();

		if (!paramClientId) {
			return;
		}

		let payload = undefined;

		if (typeof loggedUserUid !== 'undefined') {
			const code = await authorizeUser(paramClientId);

			payload = { type: 'LOGIN', code, uid: loggedUserUid };
		} else {
			payload = { type: 'LOGOUT' };
		}

		window.parent.postMessage({ source: authorizationSource, payload }, '*');
	}, [loggedUserUid]);

	useEffect(() => {
		redirectUser();
	}, [redirectUser]);

	return <></>;
};

export default AuthorizeSourcePage;
