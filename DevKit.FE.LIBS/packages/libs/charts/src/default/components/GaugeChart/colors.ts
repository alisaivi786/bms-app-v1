export const COLORS = ['#15377D', '#E5E5E5'];

export const getColorByIndex = (index: number): string => {
	return COLORS[index % COLORS.length];
};
