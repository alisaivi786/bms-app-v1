const COMMON_COLORS = [
	'#DC143C',
	'#87CEEB',
	'#228B22',
	'#FFD700',
	'#673AB7',
	'#FF7F50',
	'#008080',
	'#191970',
	'#708090',
	'#FF69B4',
	'#FF8C00',
	'#00CED1',
	'#6A5ACD',
	'#A52A2A',
	'#2E8B57',
];

const COLORS_VARIANT_DONUT = ['#00285e', '#6caddf', '#fbc35b', '#D4A11E', '#c7def2'];

const COLORS_VARIANT_RING = ['#9D5AA7', '#647EC0', '#3DACDA', '#88C469', '#D8E463', '#FCB13F', '#ED5246'];

export const getColorByIndex = (index: number, variant: 'donut' | 'ring' = 'donut'): string => {
	const variantColors = variant === 'donut' ? COLORS_VARIANT_DONUT : COLORS_VARIANT_RING;
	const colors = [...variantColors, ...COMMON_COLORS];

	return colors[index % colors.length];
};
