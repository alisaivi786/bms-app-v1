import { capitalize, isString } from 'lodash';
import sortBy from 'lodash/sortBy';
import { useEffect, useRef } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import tailwindConfig from '../../tailwind.config.js';

const colors = tailwindConfig.theme?.colors as Record<string, Record<string, string> | string>;
const colorsGroup: Record<string, Record<string, string>> = {
	essentials: {},
};

Object.entries(colors).forEach(([key, value]) => {
	if (isString(value)) {
		colorsGroup.essentials[key] = value;
	} else {
		colorsGroup[key] = value as Record<string, string>;
	}
});

const padNumber = (number: number | string, size: number) => {
	let num = number.toString();

	while (num.length < size) num = '0' + num;

	return num;
};

function RGBToHex(rgbColor: string) {
	const sep = rgbColor.indexOf(',') > -1 ? ',' : ' ';
	const rgb = rgbColor.substr(4).split(')')[0].split(sep);

	let r = (+rgb[0]).toString(16),
		g = (+rgb[1]).toString(16),
		b = (+rgb[2]).toString(16);

	if (r.length == 1) r = '0' + r;

	if (g.length == 1) g = '0' + g;

	if (b.length == 1) b = '0' + b;

	return '#' + r + g + b;
}

function RGBAToHexA(rgbaColor: string) {
	const sep = rgbaColor.indexOf(',') > -1 ? ',' : ' ';
	const rgba = rgbaColor.substr(5).split(')')[0].split(sep);

	// Strip the slash if using space-separated syntax
	if (rgba.indexOf('/') > -1) rgba.splice(3, 1);

	for (const R in rgba) {
		const r = rgba[R];

		if (r.indexOf('%') > -1) {
			const p = Number(r.substr(0, r.length - 1)) / 100;

			if (Number(R) < 3) {
				rgba[Number(R)] = Math.round(p * 255).toString();
			} else {
				rgba[Number(R)] = p.toString();
			}
		}
	}

	let r = (+rgba[0]).toString(16),
		g = (+rgba[1]).toString(16),
		b = (+rgba[2]).toString(16),
		a = Math.round(+rgba[3] * 255).toString(16);

	if (r.length == 1) r = '0' + r;

	if (g.length == 1) g = '0' + g;

	if (b.length == 1) b = '0' + b;

	if (a.length == 1) a = '0' + a;

	return '#' + r + g + b + a;
}

const ColorView = ({ colorKey, color }: { colorKey: string; color: string }) => {
	const elementRef = useRef<HTMLDivElement>(null);
	const colorDivRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (elementRef.current && colorDivRef.current) {
			const color = getComputedStyle(elementRef.current).backgroundColor;

			colorDivRef.current.innerText = color.includes('rgba') ? RGBAToHexA(color) : RGBToHex(color);
		}
	}, [elementRef.current, colorDivRef.current]);

	return (
		<div className="flex flex-col items-center gap-2 m-5">
			<div>{colorKey}</div>
			<div
				ref={elementRef}
				className="h-[50px] w-[50px] rounded-full border border-gray-50 p-2"
				style={{ background: color }}
			></div>

			<div ref={colorDivRef} className="text-xs"></div>
		</div>
	);
};

const InnerColor = ({ colorObj }: { colorObj: Record<string, string> }) => {
	return (
		<>
			{sortBy(Object.keys(colorObj), (key) => padNumber(key, 3)).map((colorKey, index) => {
				const color = colorObj[colorKey];

				if (typeof color !== 'object') {
					return <ColorView key={index} colorKey={colorKey} color={color} />;
				}
			})}
		</>
	);
};

const ColorScheme = ({ title, colorObj }: { title: string; colorObj: Record<string, string> }) => {
	return (
		<div className="p-5 shadow-default">
			<div className="text-sm font-bold">{title}</div>
			<div className="flex flex-wrap">
				<InnerColor colorObj={colorObj} />
			</div>
		</div>
	);
};

const StoryComponent: StoryFn = () => (
	<div className="flex flex-col gap-5">
		{Object.entries(colorsGroup).map(([key, value]) => (
			<ColorScheme key={key} title={capitalize(key)} colorObj={value} />
		))}
	</div>
);

const StoryMeta: Meta = {
	title: 'DLS/Colors',
	component: StoryComponent,
};

export default StoryMeta;

export const Colors: StoryObj = {};
