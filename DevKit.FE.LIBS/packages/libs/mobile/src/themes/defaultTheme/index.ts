import { dimensionFunctions, scaleFontSizes } from '../../utils/dimensions';
import { colors, darkColors, grayColors, redColors, secondaryColors } from './colors';
import { fontSizes } from './fontSizes';
import { fonts } from './fonts';
import { globalUtils as utilities } from './global';
import { Platform } from 'react-native';

const DEFAULT_THEME_GUIDELINE_BASE_WIDTH = 430;

const DEFAULT_THEME_GUIDELINE_BASE_HEIGHT = 932;

const { RM, FS } = dimensionFunctions(DEFAULT_THEME_GUIDELINE_BASE_HEIGHT, DEFAULT_THEME_GUIDELINE_BASE_WIDTH);

export const defaultTheme = {
	colors: {
		brand: colors,
		dark: darkColors,
		gray: grayColors,
		secondary: secondaryColors,
		red: redColors,
	},
	customColors: {
		'toggle-active': colors[600],
		'toggle-inActive': grayColors[600],
	},
	gradientConfigs: {},
	fontFamily: fonts,
	fontSize: Platform.OS !== 'android' ? scaleFontSizes(fontSizes, FS) : fontSizes,
	guidelineBaseWidth: DEFAULT_THEME_GUIDELINE_BASE_WIDTH,
	guidelineBaseHeight: DEFAULT_THEME_GUIDELINE_BASE_HEIGHT,
	utilities: utilities,
	RM,
	FS,
};
