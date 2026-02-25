import { dimensionFunctions, scaleFontSizes } from '../../utils/dimensions';
import { colors, customColors, darkColors, grayColors, redColors, secondaryColors } from './colors';
import { fontSizes } from './fontSizes';
import { fonts } from './fonts';
import { globalUtils as utilities } from './global';

const YAHALA_THEME_GUIDELINE_BASE_WIDTH = 430;

const YAHALA_THEME_GUIDELINE_BASE_HEIGHT = 932;

const { FS, RM } = dimensionFunctions(YAHALA_THEME_GUIDELINE_BASE_HEIGHT, YAHALA_THEME_GUIDELINE_BASE_WIDTH);

const mainGradient = {
	start: { x: 0, y: 0 },
	end: { x: 1, y: 1 },
	useAngle: true,
	angle: 145,
	locations: [0, 1],
	colors: ['#B41F70', '#2239BC'],
};

const secondaryGradient = {
	start: { x: 0, y: 0 },
	end: { x: 1, y: 1 },
	locations: [0, 1],
	colors: ['#2F0245', '#650097'],
};

export const yahalaTheme = {
	colors: {
		brand: colors,
		dark: darkColors,
		gray: grayColors,
		secondary: secondaryColors,
		red: redColors,
	},
	customColors: customColors,
	gradientConfigs: {
		['main']: mainGradient,
		['li']: secondaryGradient,
		['primary']: mainGradient,
		['secondary']: mainGradient,
		['disabled']: {
			start: { x: 0, y: 0 },
			end: { x: 1, y: 1 },
			locations: [0, 1],
			colors: ['#00000004', '#00000004'],
			style: { borderRadius: 32, padding: 2, width: '100%' },
		},
		['iconPrimary']: mainGradient,
		['iconSecondary']: mainGradient,
		['iconText']: {
			start: { x: 0, y: 0 },
			end: { x: 1, y: 1 },
			locations: [0, 1],
			colors: ['#fff', '#fff'],
		},
		['chipPrimary']: {
			start: { x: 1, y: 0 },
			end: { x: 0, y: 0 },
			locations: [0, 1],
			colors: ['#2F0245', '#650097'],
		},
		['card']: mainGradient,
	},
	fontFamily: fonts,
	fontSize: scaleFontSizes(fontSizes, FS),
	guidelineBaseWidth: YAHALA_THEME_GUIDELINE_BASE_WIDTH,
	guidelineBaseHeight: YAHALA_THEME_GUIDELINE_BASE_HEIGHT,
	utilities,
	FS,
	RM,
};
