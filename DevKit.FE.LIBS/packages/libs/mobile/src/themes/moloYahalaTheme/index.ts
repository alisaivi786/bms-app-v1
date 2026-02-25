import { dimensionFunctions, scaleFontSizes } from '../../utils/dimensions';
import { colors, customColors, darkColors, grayColors, redColors, secondaryColors } from './colors';
import { fontSizes } from './fontSizes';
import { fonts } from './fonts';
import { globalUtils as utilities } from './global';

const YAHALA_THEME_GUIDELINE_BASE_WIDTH = 430;

const YAHALA_THEME_GUIDELINE_BASE_HEIGHT = 932;

const { FS, RM } = dimensionFunctions(YAHALA_THEME_GUIDELINE_BASE_HEIGHT, YAHALA_THEME_GUIDELINE_BASE_WIDTH);


export const moloYahalaTheme = {
	colors: {
		brand: colors,
		dark: darkColors,
		gray: grayColors,
		secondary: secondaryColors,
		red: redColors,
	},
	customColors: customColors,
	gradientConfigs: {},
	fontFamily: fonts,
	fontSize: scaleFontSizes(fontSizes, FS),
	guidelineBaseWidth: YAHALA_THEME_GUIDELINE_BASE_WIDTH,
	guidelineBaseHeight: YAHALA_THEME_GUIDELINE_BASE_HEIGHT,
	utilities,
	FS,
	RM,
};
