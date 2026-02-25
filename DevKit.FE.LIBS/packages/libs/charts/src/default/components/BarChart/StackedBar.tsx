import React from 'react';
import { Bar } from 'recharts';

interface StackedBarProps {
	isHorizontal: boolean;
	primaryColor?: string;
	secondaryColor?: string;
}

export const renderStackedBar = ({
	isHorizontal,
	primaryColor = '#2563EB',
	secondaryColor = '#E2E8F0',
}: StackedBarProps) => {
	return [
		<Bar
			key="total"
			dataKey="total_stacked"
			stackId="stacked"
			fill={primaryColor}
			radius={isHorizontal ? [0, 0, 0, 0] : [0, 0, 0, 0]}
			barSize={20}
		/>,
		<Bar
			key="remaining"
			dataKey="remaining_stacked"
			stackId="stacked"
			fill={secondaryColor}
			radius={isHorizontal ? [0, 6, 6, 0] : [6, 6, 0, 0]}
			barSize={20}
		/>,
	];
};

export const transformToStackedData = (
	data: Array<Record<string, string | number>>,
	categoryKeys: string[],
	maxTotal?: number
) => {
	return data.map((item) => {
		const transformedItem = { ...item };

		// Use the first category as the primary value
		const primaryKey = categoryKeys[0];
		const primaryValue = Number(item[primaryKey]) || 0;

		// Calculate total - either from maxTotal parameter or sum of all categories
		const total = maxTotal || categoryKeys.reduce((sum, key) => sum + (Number(item[key]) || 0), 0);

		// For example: if Monday=40 and total=200, percentage = 40/200 = 20%
		const primaryPercentage = total > 0 ? (primaryValue / total) * 100 : 0;

		transformedItem['total_stacked'] = primaryPercentage;
		transformedItem.remaining_stacked = Math.max(0, 100 - primaryPercentage);

		return transformedItem;
	});
};
