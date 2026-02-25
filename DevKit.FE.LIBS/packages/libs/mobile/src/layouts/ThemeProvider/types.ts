import type { TailwindFn, TwConfig } from 'twrnc';

export type ISupportedLocales = 'en' | 'ar';

type CustomColors = 'toggle-active' | 'toggle-inActive' | 'search-placeholder';

export type GradientConfigs = 'primary' | 'secondary' | 'disabled' | 'iconPrimary' | 'iconSecondary' | 'iconText' | 'chipPrimary' | 'main' | 'li' | 'card';

export type GradientConfig = {
	start: { x: number; y: number };
	end: { x: number; y: number };
	locations: number[];
	colors: (string | number)[];
};

export interface InternalIdevkitThemeProvider {
	tw: TailwindFn;
	/** tailwind configuration to support tailwind css.
	 * Expected:
	 * 		const tw = config(require('tailwind.config.js'));
	 **/
	theme?: TwConfig;
	/** The localization to be used (en and ar) */
	locale: ISupportedLocales;
	customColors?: Partial<Record<CustomColors, string>>;
	gradientConfigs?: Partial<Record<GradientConfigs, GradientConfig>>;
	utilities?: Record<string, string>;
}

export type IdevkitThemeProvider = Omit<InternalIdevkitThemeProvider, 'children' | 'tw'>;
