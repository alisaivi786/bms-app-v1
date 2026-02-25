import { FC, PropsWithChildren } from 'react';
import { IdevkitThemeProviderWithMarketSwitcher } from '@devkit/shared-types';
import { MarketSwitcherProvider } from '../../common/MarketSwitcherContext';
import { DrawerProvider } from '../../components/Drawer/DrawerContext';
import { ToastProvider } from '../../components/Toast/ToastContext';
import './main-style.scss';
import './nj-style.scss';
import { InternaldevkitThemeContextProvider } from './theme-context';

export const DevkitThemeProvider: FC<PropsWithChildren<IdevkitThemeProviderWithMarketSwitcher>> = ({
	children,
	marketSwitcher,
	...props
}) => {
	return (
		<InternaldevkitThemeContextProvider value={props}>
			<ToastProvider>
				<MarketSwitcherProvider marketSwitcher={marketSwitcher}>
					<DrawerProvider>{children}</DrawerProvider>
				</MarketSwitcherProvider>
			</ToastProvider>
		</InternaldevkitThemeContextProvider>
	);
};
