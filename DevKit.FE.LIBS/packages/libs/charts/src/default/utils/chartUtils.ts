/**
 * Chart utility functions for formatting and text manipulation
 */

/**
 * Formats numbers to compact notation (1000 -> 1k, 1000000 -> 1M)
 * @param value - The numeric value to format
 * @returns Formatted string representation
 */
export const formatToK = (value: number | string | unknown): string => {
	if (Number.isNaN(value)) return String(value);

	const num = Number(value);

	if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;

	if (num >= 1000) return `${(num / 1000).toFixed(0)}k`;

	return num.toString();
};

/**
 * Truncates long labels with ellipsis
 * @param label - The text label to truncate
 * @param maxLength - Maximum length before truncation (default: 20)
 * @returns Truncated label with ellipsis if needed
 */
export const truncateLabel = (label: string, maxLength = 20): string => {
	if (label.length <= maxLength) return label;

	return `${label.substring(0, maxLength - 3)}...`;
};

/**
 * Truncates labels for horizontal layout with shorter limit
 * @param label - The text label to truncate
 * @param maxLength - Maximum length before truncation (default: 10)
 * @returns Truncated label with ellipsis if needed
 */
export const truncateLabelHorizontal = (label: string, maxLength = 10): string => {
	if (label.length <= maxLength) return label;

	return `${label.substring(0, maxLength - 3)}...`;
};

/**
 * Calculates dynamic YAxis width based on label lengths for horizontal charts
 * @param chartData - Array of chart data objects with name property
 * @returns Width in pixels or undefined for vertical charts
 */
export const getYAxisWidth = (
	chartData: Record<string, string | number>[],
	isHorizontal: boolean
): number | undefined => {
	if (!isHorizontal) return undefined;

	const maxLabelLength = Math.max(...chartData.map((item) => item.name.toString().length));

	if (maxLabelLength <= 6) return 60; // Short labels like "Jan", "Feb"

	if (maxLabelLength <= 10) return 80; // Medium labels like "January"

	return 100; // Long labels
};
