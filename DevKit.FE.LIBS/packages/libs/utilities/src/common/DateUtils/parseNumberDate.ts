export const parseNumberDate = (date: number | undefined) => {
	if (!date) return undefined;

	return new Date(date);
};
