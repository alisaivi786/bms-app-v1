import { dimensionFunctions, scaleFontSizes } from '../../utils/dimensions';
import { devkitConfigOptions } from '../types';
import { colors, darkColors, grayColors, redColors, secondaryColors } from './colors';
import { fontSizes } from './fontSizes';
import { globalUtils as utilities } from './global';

const ABER_THEME_GUIDELINE_BASE_WIDTH = 430;

const ABER_THEME_GUIDELINE_BASE_HEIGHT = 932;

const { RM, FS } = dimensionFunctions(ABER_THEME_GUIDELINE_BASE_HEIGHT, ABER_THEME_GUIDELINE_BASE_WIDTH);

export const aberTheme: devkitConfigOptions = {
	colors: {
		brand: colors,
		dark: darkColors,
		gray: grayColors,
		secondary: secondaryColors,
		red: redColors,
	},
	customColors: {},
	fontFamily: {},
	gradientConfigs: {},
	fontSize: scaleFontSizes(fontSizes, FS),
	utilities,
	guidelineBaseWidth: ABER_THEME_GUIDELINE_BASE_WIDTH,
	guidelineBaseHeight: ABER_THEME_GUIDELINE_BASE_HEIGHT,
	RM,
	FS,
};
