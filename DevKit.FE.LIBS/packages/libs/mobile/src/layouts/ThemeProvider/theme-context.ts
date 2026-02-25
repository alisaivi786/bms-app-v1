import { createContext, useContext } from 'react';
import { I18nManager } from 'react-native';
import { create } from 'twrnc';
import { defaultTheme } from '../../themes';
import { createTailWindConfig } from '../../themes/tailwind-config';
import { InternalIdevkitThemeProvider } from './types';

const devkitThemeContext = createContext<InternalIdevkitThemeProvider>({
	locale: 'en',
	theme: createTailWindConfig(defaultTheme),
	tw: create({}),
});

devkitThemeContext.displayName = 'devkitThemeContext';

export const InternaldevkitThemeContextProvider = devkitThemeContext.Provider;

export const useMobileUIConfigOptions = () => {
	const options = useContext(devkitThemeContext);
	const reverseLayout = !I18nManager.isRTL && options.locale === 'ar';

	return {
		...options,
		isRtlLocale: options.locale === 'ar',
		reverseLayout,
	};
};
