import { createContext, createElement } from 'react';
import { IdevkitThemeProvider } from '@devkit/shared-types';

declare global {
	// eslint-disable-next-line no-var
	var njThemeContext: React.Context<Omit<IdevkitThemeProvider, 'children'>>;
}

globalThis.njThemeContext = createContext<Omit<IdevkitThemeProvider, 'children'>>({
	locale: 'en',
	renderLink: () => createElement('a'),
});
