import { defaultTheme } from './defaultTheme';

export interface devkitConfigFontSizes {
	display1: string;
	display2: string;
	display3: string;
	h1: string;
	h2: string;
	h3: string;
	title: string;
	body: string;
	paragraph: string;
	caption1: string;
	caption2: string;
	legal: string;
}

export type devkitConfigOptions = typeof defaultTheme & { fontSize: Partial<devkitConfigFontSizes> };
