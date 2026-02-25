import { logger } from '@devkit/utilities';

declare global {
	interface Window {
		CardSDK: {
			Currencies?: { SAR: string };
			Locale: { AR: string; EN: string };
			Direction: { RTL: string; LTR: string };
			renderTapCard: (containerId: string, options: Record<string, unknown>) => { unmount: () => void };
			tokenize: () => void;
		};
		tapUnmount?: () => void;
	}
}
type IWindow = Window;

declare let window: IWindow & typeof globalThis;

export const initializeTapPayments = (onScriptLoad: () => void) => {
	if (typeof window !== 'undefined') {
		const existingScript = window.document.getElementById('tap-payments-js');

		// If script exists and SDK is already loaded, just call the callback
		if (existingScript && window?.CardSDK) {
			logger.log('[TapPayments] SDK already loaded, reusing existing instance');
			onScriptLoad();

			return;
		}

		// If script exists but SDK is not loaded, remove the old script
		if (existingScript) {
			logger.log('[TapPayments] Removing existing script without SDK');
			existingScript.parentNode?.removeChild(existingScript);
		}

		logger.log('[TapPayments] Loading new SDK script');

		const script = window.document.createElement('script');

		script.id = 'tap-payments-js';

		script.src = 'https://tap-sdks.b-cdn.net/card/1.0.2/index.js';

		script.onload = () => {
			logger.log('[TapPayments] SDK loaded successfully');
			onScriptLoad();
		};

		script.onerror = () => {
			logger.error('[TapPayments] Failed to load SDK script');
		};

		window.document.head.appendChild(script);
	}
};
