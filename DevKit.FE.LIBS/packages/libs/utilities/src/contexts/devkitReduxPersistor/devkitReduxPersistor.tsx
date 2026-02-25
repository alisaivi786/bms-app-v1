'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Persistor } from 'redux-persist';
import { logger } from '../../common/Debug';

interface IdevkitPersistContextProps {
	isHydrating: boolean;
}

const context = createContext<IdevkitPersistContextProps>({
	isHydrating: false,
});

context.displayName = 'devkitPersistor';

export const devkitPersistorProvider = ({ children, persistor }: { persistor: Persistor; children: ReactNode }) => {
	const [isBootStrapped, setIsBootStrapped] = useState(false);

	useEffect(() => {
		logger.log('[devkitPersistorProvider][useEffect[]]', {
			isHydrating: !isBootStrapped,
		});

		if (persistor.getState().bootstrapped) {
			setIsBootStrapped(true);
		} else {
			const unsubscribe = persistor.subscribe(() => {
				setIsBootStrapped(persistor.getState().bootstrapped);
			});

			return unsubscribe;
		}
	}, []);

	return <context.Provider value={{ isHydrating: !isBootStrapped }}>{children}</context.Provider>;
};

export const PersistorSuspense = ({ children, loading }: { children: ReactNode; loading?: JSX.Element }) => {
	const { isHydrating } = useContext(context);

	if (!isHydrating) return <>{children}</>;

	return <>{loading}</>;
};

export const usePersistorState = () => {
	const { isHydrating } = useContext(context);

	return {
		isHydrating,
	};
};
