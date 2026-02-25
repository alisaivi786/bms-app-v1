import type { Config as TailWindConfig } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import { TwConfig } from 'twrnc';
import { applyFontScaleToPixelValue, getFontScaleAwareSpacingValues, spacingKeys } from '../../utils/dimensions';
import { devkitConfigOptions } from '../types';

export const createTailWindConfig = (
	theme: devkitConfigOptions,
	extendedConfigs?: Pick<TailWindConfig, 'theme' | 'plugins'>
) => {
	const { theme: extendedTheme, plugins } = extendedConfigs || {};
	const { RM } = theme;

	// Create font-scale-aware spacing values for accessibility
	const fontScaleAwareSpaceValues = {
		...getFontScaleAwareSpacingValues(RM),
		full: '100%',
		4.5: getFontScaleAwareValue(RM(4.5)),
		18: getFontScaleAwareValue(RM(18)),
		108: getFontScaleAwareValue(RM(108)),
		112: getFontScaleAwareValue(RM(112)),
		130: getFontScaleAwareValue(RM(130)),
		250: getFontScaleAwareValue(RM(250)),
	};

	// Helper function to apply font scale to individual values
	function getFontScaleAwareValue(baseValue: number): string {
		return applyFontScaleToPixelValue(baseValue) + 'px';
	}

	const config = {
		theme: {
			colors: {
				white: '#fff',
				black: '#000',
				'black-20': 'rgba(0,0,0,0.2)',
				transparent: 'transparent',
				brand: theme.colors.brand,
				dark: theme.colors.dark,
				gray: theme.colors.gray,
				secondary: theme.colors.secondary,
				red: theme.colors.red,
				green: {
					700: '#248F59',
					500: '#30C078',
					300: '#70DBA6',
					100: '#C2F0D9',
					50: '#EBFAF2',
				},
				yellow: {
					700: '#C08B0C',
					500: '#F3BF41',
					300: '#F6CF6F',
					100: '#FCEFCF',
					50: '#FDF7E7',
				},
				blue: {
					500: '#1D68FF',
					50: '#DBEAFE',
				},
			},
			boxShadow: {
				none: '0 0 #0000',
				default: '0px 0px 6px rgba(0, 0, 0 , 25%)',
				datePicker: '0px 0px 12px 0px rgba(0, 0, 0 , 30%)',
				card: '0px 0px 40px rgba(0, 0, 0, 0.07)',
				popover: '0px 2px 8px rgba(0, 0, 0, 0.3);',
				menu: '0px 2px 8px 0px rgba(0, 0, 0, 0.15);',
				elevation1: '0px 8px 40px 0px rgba(0, 0, 0, 0.10)',
				elevation2: '0px 2px 8px 0px rgba(0, 0, 0, 0.30)',
				elevation3: '0px 0px 40px 0px rgba(0, 0, 0, 0.07)',
			},
			dropShadow: {
				none: '0 0 #0000',
				tooltip: '0 2px 12px rgba(0, 0, 0, 0.3)',
				groupMenu: '0 2px 8px rgba(0,0,0,.3)',
			},

			fontFamily: {
				...theme.fontFamily,
			},
			fontWeight: {
				bold: '700',
				medium: '500',
				normal: '400',
			},
			space: fontScaleAwareSpaceValues,
			...spacingKeys.reduce(
				(acc, curr) => ({ ...acc, [curr]: { ...defaultTheme[curr], ...fontScaleAwareSpaceValues } }),
				{}
			),
			spacing: {
				...fontScaleAwareSpaceValues,
			},
			minWidth: {
				...defaultTheme.minWidth,
				...fontScaleAwareSpaceValues,
			},
			fontSize: {
				...theme.fontSize,
			},
			zIndex: {
				...defaultTheme.zIndex,
				layoutSticky: '200',
				layoutScrollTracks: '210',
				modal: '220',
				floating: '230',
				drawer: '240',
				toast: '250',
			},
			outlineWidth: {
				...defaultTheme.outlineWidth,
				3: '3px',
			},
			transitionProperty: {
				...defaultTheme.transitionProperty,
				'max-height': 'max-height',
			},
			animation: {
				...defaultTheme.animation,
				'ping-once': 'ping 1s cubic-bezier(0,0,.2,1) 1',
			},
			borderRadius: {
				...defaultTheme.borderRadius,
				'4xl': '2rem',
				'5xl': '2.5rem',
			},
			backgroundImage: {
				'half-left': 'linear-gradient(to right, rgba(0, 0, 0, 0) 50%, var(--nj-color-brand-100) 50%)',
				'half-right': 'linear-gradient(to right, var(--nj-color-brand-100) 50%, rgba(0, 0, 0, 0) 50%)',
			},
			extend: {
				...extendedTheme,
			},
		},
		plugins: [
			plugin(({ addUtilities }) => {
				addUtilities({
					'.text-y-center': { textAlignVertical: 'center' },
					'.invisible': { opacity: '0' },
					...theme.utilities,
				});
			}),
			...(plugins || []),
		],
	};

	return config as unknown as TwConfig;
};
