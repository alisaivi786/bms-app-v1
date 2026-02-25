import React from 'react';
import { Bar, LabelList } from 'recharts';
import { formatToK } from '../../utils/chartUtils';

interface GroupedBarChartProps {
	categoryKeys: string[];
	isHorizontal: boolean;
	valueFormatter: (value: number) => string;
	colors: string[];
}

export const renderGroupedBarChart = ({ categoryKeys, isHorizontal, valueFormatter, colors }: GroupedBarChartProps) => {
	return categoryKeys.map((category, index) => (
		<Bar
			key={category}
			dataKey={category}
			fill={colors[index % colors.length]}
			radius={isHorizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
			barSize={16}
		>
			<LabelList
				dataKey={category}
				position={isHorizontal ? 'right' : 'top'}
				fill={colors[index % colors.length]}
				style={{ fontSize: 11 }}
				formatter={isHorizontal ? valueFormatter : (value: number) => formatToK(value)}
				offset={isHorizontal ? 8 : 5 + index * 2}
			/>
		</Bar>
	));
};
