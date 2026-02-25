import { dimensionFunctions, scaleFontSizes } from '../../utils/dimensions';
import { colors, darkColors, grayColors, redColors, secondaryColors } from './colors';
import { fontSizes } from './fontSizes';
import { fonts } from './fonts';
import { globalUtils as utilities } from './global';

const MOLO_THEME_GUIDELINE_BASE_WIDTH = 430;

const MOLO_THEME_GUIDELINE_BASE_HEIGHT = 932;

const { FS, RM } = dimensionFunctions(MOLO_THEME_GUIDELINE_BASE_HEIGHT, MOLO_THEME_GUIDELINE_BASE_WIDTH);

export const moloTheme = {
	colors: {
		brand: colors,
		dark: darkColors,
		gray: grayColors,
		secondary: secondaryColors,
		red: redColors,
	},
	customColors: {},
	gradientConfigs: {},
	fontFamily: fonts,
	fontSize: scaleFontSizes(fontSizes, FS),
	guidelineBaseWidth: MOLO_THEME_GUIDELINE_BASE_WIDTH,
	guidelineBaseHeight: MOLO_THEME_GUIDELINE_BASE_HEIGHT,
	utilities,
	FS,
	RM,
};
