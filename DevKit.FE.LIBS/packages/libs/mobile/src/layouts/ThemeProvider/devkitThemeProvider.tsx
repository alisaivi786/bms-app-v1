import { FC, PropsWithChildren, useMemo } from 'react';
import { create } from 'twrnc';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PortalHost, PortalProvider } from '@gorhom/portal';
import { Toast } from '../../components/Toast';
import { InternaldevkitThemeContextProvider } from './theme-context';
import { IdevkitThemeProvider } from './types';

export const devkitThemeProvider: FC<PropsWithChildren<IdevkitThemeProvider>> = ({
	children,
	theme,
	locale = 'en',
	...props
}) => {
	// Override theme fonts based on locale
	const localizedTheme = useMemo(() => {
		const modifiedTheme = { ...theme };

		if (modifiedTheme.theme?.fontFamily) {
			modifiedTheme.theme.fontFamily = {
				...modifiedTheme.theme.fontFamily,
				'main-regular': modifiedTheme.theme.fontFamily[`main-regular-${locale}`],
				'main-medium': modifiedTheme.theme.fontFamily[`main-medium-${locale}`],
				'main-semibold': modifiedTheme.theme.fontFamily[`main-semibold-${locale}`],
				'main-bold': modifiedTheme.theme.fontFamily[`main-bold-${locale}`],
			};
		}

		return modifiedTheme;
	}, [theme, locale]);

	const tw = create(localizedTheme);

	return (
		<InternaldevkitThemeContextProvider value={{ tw, locale, ...props }}>
			<PortalProvider>
				<BottomSheetModalProvider>
					{children}
					<Toast />
					<PortalHost name="modalPortal" />
				</BottomSheetModalProvider>
			</PortalProvider>
		</InternaldevkitThemeContextProvider>
	);
};
