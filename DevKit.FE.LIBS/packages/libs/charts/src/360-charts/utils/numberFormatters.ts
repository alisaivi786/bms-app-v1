/**
 * Formats a number with comma separators for thousands
 * Examples: 60000 -> "60,000", 10232000 -> "10,232,000"
 */
export const formatNumberWithCommas = (value: number): string => {
	return value.toLocaleString('en-US');
};

/**
 * Formats a number with comma separators for thousands, with optional currency prefix
 * Examples: 60000 -> "60,000", 10232000 -> "10,232,000"
 * With currency: 60000 -> "AED 60,000"
 */
export const formatCurrencyWithCommas = (value: number, currency = 'AED'): string => {
	return `${currency} ${formatNumberWithCommas(value)}`;
};

/**
 * Formats a number as currency with M (million) or K (thousand) units.
 * Examples: 1500000 -> "AED 1.5M", 1500 -> "AED 1.5K", 500 -> "AED 500"
 * Can customize the million/thousand unit labels for i18n.
 */
export const formatCurrencyKpiValue = (
	value: number,
	currency = 'AED',
	millionUnit = 'M',
	thousandUnit = 'K'
): string => {
	return `${currency} ${formatKpiValue({ value, millionUnit, thousandUnit })}`;
};

/**
 * Default value formatter for chart y-axis that uses comma-separated thousands
 * This replaces the previous K/M formatting with full comma-separated numbers
 */
export const defaultValueFormatter = (value: number): string => {
	return formatNumberWithCommas(value);
};

/**
 * Default tooltip value formatter for charts that uses comma-separated thousands
 */
export const defaultTooltipValueFormatter = (value: number): string => {
	return formatCurrencyWithCommas(value);
};

/**
 * Formats KPI values with appropriate units (M for millions, K for thousands)
 * Examples: 1500000 -> "1.5M", 1500 -> "1.5K", 500 -> "500"
 */
export const formatKpiValue = ({
	value,
	millionUnit = 'M',
	thousandUnit = 'K',
	disableK = true,
}: {
	value: number;
	millionUnit: string;
	thousandUnit?: string;
	disableK?: boolean;
}): string => {
	if (value >= 1_000_000) {
		return `${(value / 1_000_000).toFixed(1)}${millionUnit}`;
	}

	if (!disableK && value >= 1_000) {
		return `${(value / 1_000).toFixed(1)}${thousandUnit}`;
	}

	return formatNumberWithCommas(value);
};
