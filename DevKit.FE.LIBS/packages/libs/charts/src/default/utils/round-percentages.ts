function errorGen(actual: number, rounded: number) {
	const divisor = Math.sqrt(actual < 1.0 ? 1.0 : actual);

	return Math.pow(Math.abs(rounded - actual), 2) / divisor;
}

export function roundTo100(percents: number[]) {
	// Check if sum is close to 100 (within floating point precision)
	const sum = percents.reduce((a, b) => a + b, 0);

	if (Math.abs(sum - 100) > 1e-2) {
		// if the sum is not close to 100, return the original percentages
		return percents;
	}

	const rounded = percents.map((x) => Math.floor(x));
	const upCount = 100 - rounded.reduce((a, b) => a + b, 0);

	const errors = percents.map((percent, i) => [errorGen(percent, rounded[i] + 1) - errorGen(percent, rounded[i]), i]);

	const rank = errors.sort((a, b) => a[0] - b[0]);

	for (let i = 0; i < upCount; i++) {
		rounded[rank[i][1]] += 1;
	}

	return rounded;
}
