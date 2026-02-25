import React from 'react';
import { Bar, LabelList } from 'recharts';
import { formatToK } from '../../utils/chartUtils';

interface SimpleBarChartProps {
	isHorizontal: boolean;
	valueFormatter: (value: number) => string;
}

export const renderSimpleBarChart = ({ isHorizontal, valueFormatter }: SimpleBarChartProps) => (
	<Bar dataKey="value" fill="#15377D" radius={isHorizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]} barSize={16}>
		<LabelList
			dataKey="value"
			position={isHorizontal ? 'right' : 'top'}
			fill="#15377D"
			style={{ fontSize: 12 }}
			formatter={(value: number) => (isHorizontal ? valueFormatter(value) : formatToK(value))}
			offset={isHorizontal ? 8 : 0}
		/>
	</Bar>
);
