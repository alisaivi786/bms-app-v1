import { CSSProperties } from 'react';
import colors from 'tailwindcss/colors';

export interface GradientInfo {
	className: string;
	stops: string[];
	custom?: string;
}

const rawColors = colors as unknown as Record<string, string | Record<string, string>>;

const colorLookup = Object.keys(rawColors).reduce<Record<string, string | Record<string, string>>>((acc, key) => {
	const value = rawColors[key];
	const normalized = key.toLowerCase();

	acc[normalized] = value;
	acc[normalized.replace(/[-_]/g, '')] = value;

	return acc;
}, {});

const toLookupKey = (name: string): string => name.toLowerCase().replace(/[-_]/g, '');

const resolvePalette = (name: string): string | Record<string, string> | undefined => {
	const normalized = name.toLowerCase();

	return colorLookup[normalized] ?? colorLookup[toLookupKey(name)] ?? colorLookup[normalized.replace(/-/g, '')];
};

const resolveTailwindColorHex = (colorName: string, shade: string): string | undefined => {
	const palette = resolvePalette(colorName);

	if (!palette) return undefined;

	if (typeof palette === 'string') {
		return palette;
	}

	if (palette[shade]) {
		return palette[shade];
	}

	// Some palettes use numeric keys instead of strings
	const numericShade = Number(shade);

	if (!Number.isNaN(numericShade) && palette[numericShade]) {
		return palette[numericShade];
	}

	if (shade.toUpperCase() === 'DEFAULT' && palette.DEFAULT) {
		return palette.DEFAULT;
	}

	return undefined;
};

const gradientCache = new Map<string, GradientInfo>();

export const buildGradientInfo = (gradient?: string): GradientInfo => {
	const key = gradient?.trim() ?? '';

	if (!key) {
		return { className: '', stops: [] };
	}

	const cached = gradientCache.get(key);

	if (cached) return cached;

	if (/gradient\(/i.test(key)) {
		const customInfo = { className: '', stops: [], custom: key } satisfies GradientInfo;

		gradientCache.set(key, customInfo);

		return customInfo;
	}

	let fromColor: string | undefined;
	const viaColors: string[] = [];
	let toColor: string | undefined;

	key.split(/\s+/).forEach((token) => {
		const match = token.match(/^(from|via|to)-([a-zA-Z-]+)-(\d{1,3}|DEFAULT)$/i);

		if (!match) return;
		const position = match[1].toLowerCase();
		const colorName = match[2];
		const shade = match[3].toUpperCase() === 'DEFAULT' ? 'DEFAULT' : match[3];
		const hex = resolveTailwindColorHex(colorName, shade);

		if (!hex) return;

		if (position === 'from') {
			fromColor = hex;
		} else if (position === 'to') {
			toColor = hex;
		} else {
			viaColors.push(hex);
		}
	});

	const stops = [fromColor, ...viaColors, toColor].filter((color): color is string => Boolean(color));

	const info = { className: key, stops } satisfies GradientInfo;

	gradientCache.set(key, info);

	return info;
};

export const createGradientStyle = (info: GradientInfo, angle = '90deg'): CSSProperties | undefined => {
	if (info.custom) {
		return { backgroundImage: info.custom };
	}

	if (!info.stops.length) {
		return undefined;
	}

	const stops = info.stops.length === 1 ? [...info.stops, info.stops[0]] : [...info.stops];

	return {
		backgroundImage: `linear-gradient(${angle}, ${stops.join(', ')})`,
	};
};
