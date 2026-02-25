// Default palette for multi-line charts.
// Ordered to match common usage: primary navy, secondary light blue,
// neutral gray, then a few accents as fallbacks.
const LINE_COLORS = [
	'#0B2F6A', // navy (primary)
	'#40BFFF', // light blue (secondary)
	'#9CA3AF', // gray (neutral)
	'#22C55E', // green
	'#F59E0B', // amber
	'#EF4444', // red
	'#8B5CF6', // violet
	'#10B981', // emerald
];

const COMMON_FALLBACK = [
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

export const getLineColorByIndex = (index: number): string => {
    const colors = [...LINE_COLORS, ...COMMON_FALLBACK];

    return colors[index % colors.length];
};
