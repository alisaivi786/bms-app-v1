import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { setDateUtilsConfig, updateDateUtilsConfig } from '@devkit/config';
import { setDebugEnvironment } from '@devkit/config';
import { IdevkitThemeProvider } from '@devkit/shared-types';
import { AppContextFactory } from '@devkit/utilities';
import { StoryContext } from '@storybook/react-vite';
import { DevkitThemeProvider } from '../../src/layouts/ThemeProvider';
// @ts-ignore
import aberTheme from '../../src/layouts/ThemeProvider/theme/aber/index.scss?inline';
// @ts-ignore
import adibTheme from '../../src/layouts/ThemeProvider/theme/adib/index.scss?inline';
// @ts-ignore
import defaultTheme from '../../src/layouts/ThemeProvider/theme/default/index.scss?inline';
// @ts-ignore
import ejarTheme from '../../src/layouts/ThemeProvider/theme/ejar/index.scss?inline';
// @ts-ignore
import liveAldarTheme from '../../src/layouts/ThemeProvider/theme/live-aldar/index.scss?inline';
// @ts-ignore
import moloTheme from '../../src/layouts/ThemeProvider/theme/molo/index.scss?inline';
// @ts-ignore
import mulem1Theme from '../../src/layouts/ThemeProvider/theme/mulem1/index.scss?inline';
// @ts-ignore
import pcfcTheme from '../../src/layouts/ThemeProvider/theme/pcfc/index.scss?inline';
// @ts-ignore
import secureDataTheme from '../../src/layouts/ThemeProvider/theme/secureData/index.scss?inline';
// @ts-ignore
import wioTheme from '../../src/layouts/ThemeProvider/theme/wio/index.scss?inline';

const AppContext = new AppContextFactory();

export const StoryBookThemeProvider: FC<
	PropsWithChildren<{
		settings: IdevkitThemeProvider;
		sbContext: StoryContext;
	}>
> = ({ settings, sbContext, children }) => {
	const locale = sbContext.globals.locale;
	setDebugEnvironment('develop');
	const [renderKey, setRenderKey] = useState(0);

	const setDateTimeConfig = () => {
		let timezone: string | undefined = Intl.DateTimeFormat().resolvedOptions().timeZone;

		if (sbContext.globals.timeZone !== 'UserSystem') {
			timezone = sbContext.globals.timeZone.replace('_', '/');
		}

		if (sbContext.globals.dateFormat === 'default') {
			setDateUtilsConfig({
				timezone,
				timeFormat: '24hr',
			});
		} else if (sbContext.globals.dateFormat === '12hr') {
			setDateUtilsConfig({
				timezone,
				timeFormat: '12hr',
			});
		}
		setRenderKey(new Date().getTime());
	};

	useEffect(() => {
		setDateTimeConfig();
	}, [sbContext.globals.timeZone, sbContext.globals.dateFormat]);

	useEffect(() => {
		if (sbContext.globals.locale === 'ar') document.dir = 'rtl';
		else document.dir = 'ltr';

		updateDateUtilsConfig({
			locale: sbContext.globals.locale ?? 'en',
		});
	}, [sbContext.globals.locale]);

	useEffect(() => {
		updateDateUtilsConfig({
			isoFormat: sbContext.globals.isoFormat,
		});
		setRenderKey(new Date().getTime());
	}, [sbContext.globals.isoFormat]);

	useEffect(() => {
		document.getElementById('devkit-theme-style')?.remove();
		const devkitThemeStyle = document.createElement('style');
		devkitThemeStyle.id = 'devkit-theme-style';
		switch (sbContext.globals.theme) {
			case 'aber':
				devkitThemeStyle.innerHTML = aberTheme;
				break;
			case 'secureData':
				devkitThemeStyle.innerHTML = secureDataTheme;
				break;
			case 'adib':
				devkitThemeStyle.innerHTML = adibTheme;
				break;
			case 'molo':
				devkitThemeStyle.innerHTML = moloTheme;
				break;
			case 'wio':
				devkitThemeStyle.innerHTML = wioTheme;
				break;
			case 'live-aldar':
				devkitThemeStyle.innerHTML = liveAldarTheme;
				break;
			case 'ejar':
				devkitThemeStyle.innerHTML = ejarTheme;
				break;
			case 'pcfc':
				devkitThemeStyle.innerHTML = pcfcTheme;
				break;
			case 'mulem1':
				devkitThemeStyle.innerHTML = mulem1Theme;
				break;
			default:
				devkitThemeStyle.innerHTML = defaultTheme;
				break;
		}

		document.head.appendChild(devkitThemeStyle);
	}, [sbContext.globals.theme]);

	return (
		<AppContext.AppPlatformContextProvider key={renderKey} translate={(a) => a} platform="web" locale={locale}>
			<DevkitThemeProvider {...settings} locale={locale}>
				{children}
			</DevkitThemeProvider>
		</AppContext.AppPlatformContextProvider>
	);
};

export const SbThemeDecorator = (Story: FC, context: StoryContext) => (
	<StoryBookThemeProvider
		settings={{
			renderLink: ({ href, title, onClick, children, className }) => (
				<a href={href ?? '#'} onClick={onClick} className={className}>
					{title ?? children}
				</a>
			),
			locale: context.globals.locale,
		}}
		sbContext={context}
	>
		<Story />
	</StoryBookThemeProvider>
);
