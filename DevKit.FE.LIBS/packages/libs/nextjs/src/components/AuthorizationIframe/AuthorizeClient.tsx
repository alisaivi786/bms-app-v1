import { useCallback, useEffect } from 'react';
import { logger } from '@devkit/utilities';
import { AuthorizationSource } from './AuthorizationSource';

type MessageData = {
	source?: string;
	payload?: {
		type?: string;
		code?: string;
		uid?: string;
	};
};

type ClientAuthorizationIFrameProps = {
	/**
	 * Logged in user uid to check against the new uid with the following conditions:
	 * 1. Same as new uid: Do nothing (Same user is already logged in)
	 * 2. Different uid: Re-login with the new credential
	 * 3. Undefined(User not logged in): Login
	 */
	loggedUserUid: string | undefined;
	/**
	 * Method that will executed on logout
	 */
	onLogout: () => void;
	/**
	 * Method that will executed on login
	 * @param code - new login code
	 */
	onLogin: (code: string) => void;
	/**
	 * Authorize url on the authorization source to be used as the iframe src
	 */
	authorizeUrl: string;
	/**
	 * Client Product id used to generate the authorization code
	 */
	productId: string;
	/**
	 * The source of authorization
	 */
	authorizationSource: AuthorizationSource;
};

function AuthorizeClient(props: ClientAuthorizationIFrameProps) {
	const { authorizationSource, loggedUserUid, onLogin, onLogout, authorizeUrl, productId } = props;

	const eventHandler = useCallback(
		(event: MessageEvent<MessageData>) => {
			const { source, payload } = event.data;

			if (source !== authorizationSource || !payload) return;

			logger.info('[AuthorizationIFrame][eventHandler] Message received from the child: ', event.data);
			const { type, code, uid } = payload || {};

			if (typeof loggedUserUid !== 'undefined' && type === 'LOGOUT') {
				logger.info('[AuthorizationIFrame][eventHandler] Logout');

				onLogout();
			} else if (
				type === 'LOGIN' &&
				typeof code === 'string' &&
				// No user logged in or different user logged in
				(typeof loggedUserUid === 'undefined' || loggedUserUid !== uid)
			) {
				logger.info('[AuthorizationIFrame][eventHandler] Login: ');

				onLogin(code);
			}
		},
		[loggedUserUid]
	);

	useEffect(() => {
		window.addEventListener('message', eventHandler);

		return () => {
			window.removeEventListener('message', eventHandler);
		};
	}, [eventHandler]);

	return <iframe src={`${authorizeUrl}?client_id=${productId}`} className="hidden" />;
}

export default AuthorizeClient;
