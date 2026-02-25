// Default palette tuned to resemble the design reference, then extended
// with additional options (borrowed from the line chart palette and common fallbacks)
export const SEGMENT_COLORS = [
	'#1E6BB3', // primary blue
	'#6CADDf', // light blue
	'#10B981', // emerald
	'#9CA3AF', // gray
	// Extended options
	'#0B2F6A', // navy
	'#40BFFF', // light blue 2
	'#9CA3AF', // gray
	'#22C55E', // green
	'#F59E0B', // amber
	'#EF4444', // red
	'#8B5CF6', // violet
	'#10B981', // emerald
	// Common fallbacks
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

export const REMAINDER_COLOR = '#2F3254'; // dark navy remainder segment

export const getColorByIndex = (index: number): string => SEGMENT_COLORS[index % SEGMENT_COLORS.length];
