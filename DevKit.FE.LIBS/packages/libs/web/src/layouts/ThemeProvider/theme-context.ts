import { createContext, createElement, useContext } from 'react';
import { IdevkitThemeProvider, IWebUILibraryDictionary } from '@devkit/shared-types';

declare global {
	// eslint-disable-next-line no-var
	var njThemeContext: React.Context<IdevkitThemeProvider>;
}

if (!globalThis.njThemeContext) {
	globalThis.njThemeContext = createContext<IdevkitThemeProvider>({
		locale: 'en',
		renderLink: () => createElement('a'),
	});
}

const devkitThemeContext = globalThis.njThemeContext;

devkitThemeContext.displayName = 'devkitThemeContext';

export const InternaldevkitThemeContextProvider = devkitThemeContext.Provider;

export const useWebUIConfigOptions = (): IdevkitThemeProvider & {
	isRtlLocale: boolean;
} => {
	const options = useContext(devkitThemeContext);

	return {
		...options,
		isRtlLocale: options.locale === 'ar',
	};
};

export const useWebUILocalization = () => {
	const { localization } = useContext(devkitThemeContext);

	return {
		getLibTranslation: (key: keyof IWebUILibraryDictionary) => {
			if (localization && localization[key]) {
				return localization[key];
			}

			switch (key) {
				case 'backButtonText':
					return 'Back';
				case 'continueButtonText':
					return 'Continue';
				case 'errorButtonText':
					return 'Error';
				case 'errorText':
					return 'Error';
				default:
					return '';
			}
		},
	};
};
