import { Session } from 'inspector';

declare module 'next-auth' {
	interface Session {
		tpToken: string;
		tpExpiry: number;
		sessionID: string;
		user: {
			userId: string;
			name: string;
			email: string;
			phone: string;
			phoneCountryCode: string;
			lastLoggedIn: string | null;
			isReseller: boolean;
			emailConfirmed: boolean;
		};
	}
}

declare module 'next-auth' {
	type SavedSessionInfo = Omit<Session, 'expires'> & {
		tpRefreshToken: string;
	};
}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			REDIS_URL: string;
			AUTH_SECRET: string;
		}
	}
}
