import { useEffect, useState } from 'react';

/**
 * a React hook to detect if the window is online
 * @param {function} props.onOnline - optional function to run when online
 * @param {function} props.onOffline - optional function to run when offline
 */
export const useIsOnline = (props?: { onOnline?: () => void; onOffline?: () => void }) => {
	const [isOnline, setIsOnline] = useState(true);

	useEffect(() => {
		const onIsOnline = () => {
			setIsOnline(true);
			props?.onOnline?.();
		};
		const onIsOffline = () => {
			setIsOnline(false);
			props?.onOffline?.();
		};

		window.addEventListener('online', onIsOnline);
		window.addEventListener('offline', onIsOffline);

		return () => {
			window.removeEventListener('online', onIsOnline);
			window.removeEventListener('offline', onIsOffline);
		};
	}, []);

	return isOnline;
};
