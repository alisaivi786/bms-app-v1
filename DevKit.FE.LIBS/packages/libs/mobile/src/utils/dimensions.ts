import { Dimensions, PixelRatio } from 'react-native';
import defaultTheme from 'tailwindcss/defaultTheme';
import { devkitConfigFontSizes } from '../themes/types';

const TAILWIND_DEFAULT_MULTIPLIER = 4;

export const spacingKeys = [
	'height',
	'minHeight',
	'maxHeight',
	'lineHeight',
	'width',
	'minWidth',
	'maxWidth',
	'letterSpacing',
];

const twDeclaredValues = ['full', 'none', 'min', 'max', 'fit'];

export type ScaleFunction = (value: number) => number;

export function dimensionFunctions(screenHeight: number, screenWidth: number) {
	const { height: SCREEN_HEIGHT = 0, width: SCREEN_WIDTH = 0 } = Dimensions.get('screen');
	const RatioW = SCREEN_WIDTH / screenWidth;
	const RatioH = SCREEN_HEIGHT / screenHeight;

	const normalizePixel = (size: number) => {
		const newSize = size * RatioW;

		return Math.round(PixelRatio.roundToNearestPixel(newSize));
	};

	return {
		RM: (value: number) => ((RatioW + RatioH) / 2) * value,
		FS: (value: number) => normalizePixel(value),
	};
}

const isWithoutScaling = (key: string) => twDeclaredValues.includes(key);

const extractValue = (value: string) => {
	const match = value.match(/(\d+\.?\d*)/);

	return match?.length ? parseFloat(match[1]) : null;
};

/**
 * Creates font-scale-aware spacing values for accessibility
 * This should be used specifically for height-related properties that need to scale with system font settings
 */
export const getFontScaleAwareSpacingValues = (RM: ScaleFunction) => {
	const fontScale = PixelRatio.getFontScale();
	const shouldApplyFontScale = fontScale > 1.1;
	const fontScaleMultiplier = shouldApplyFontScale ? Math.min(fontScale, 2.5) : 1; // Cap at 2.5x

	return Object.entries(defaultTheme.spacing).reduce((acc, [key, value]) => {
		if (!isWithoutScaling(key) && !isNaN(Number(key))) {
			let scaledValue = RM(Number(key) * TAILWIND_DEFAULT_MULTIPLIER);

			// Apply font scale multiplier for accessibility
			if (shouldApplyFontScale) {
				scaledValue = Math.round(scaledValue * fontScaleMultiplier);
			}

			return { ...acc, [key]: scaledValue + 'px' };
		}

		return { ...acc, [key]: value };
	}, {});
};

/**
 * Applies font scale to a given pixel value for accessibility
 * @param basePixelValue - The base pixel value to scale
 * @param maxScale - Maximum scale multiplier (default: 2.5)
 * @returns Scaled pixel value
 */
export const applyFontScaleToPixelValue = (basePixelValue: number, maxScale = 2.5): number => {
	const fontScale = PixelRatio.getFontScale();

	if (fontScale <= 1.1) {
		return basePixelValue; // No scaling needed
	}

	const fontScaleMultiplier = Math.min(fontScale, maxScale);

	return Math.round(basePixelValue * fontScaleMultiplier);
};

export const scaleFontSizes = (data: Partial<devkitConfigFontSizes>, FS: ScaleFunction) =>
	Object.entries(data).reduce((acc, [key, value]) => {
		const numericValue = extractValue(value);

		return { ...acc, [key]: numericValue ? FS(numericValue) + 'px' : value };
	}, {});
