'use client';

import React from 'react';
import { Cell, Label, Pie, PieChart as RechartsPieChart } from 'recharts';
import { cn } from '../../utils/cn';
import { ChartConfig, ChartContainer } from '../shared/Chart';
import { REMAINDER_COLOR, getColorByIndex } from './colors';

export type MeterChartData = {
	name: string;
	// Expected as percentage of 0–100.
	value: number;
}[];

const chartConfig = {} satisfies ChartConfig;

export type MeterChartProps = {
	data: MeterChartData; // values are treated as percentages
	height?: number;
	label?: string; // override center label
	labelClassName?: string;
};

export function MeterChart({ data, height = 300, label, labelClassName }: MeterChartProps) {
	// Sum of provided values (0–100), clamped to valid range
	const totalPercent = Math.max(
		0,
		Math.min(
			100,
			data.reduce((acc, item) => acc + (Number(item.value) || 0), 0)
		)
	);
	// Remainder to complete the semi-circle to 100%
	const remainingPercent = Math.max(0, 100 - totalPercent);

	// Color palette resolver (always from colors.ts)
	const colorForIndex = (i: number) => getColorByIndex(i);

	// Build slices for the meter (segments + remainder)
	const slices = [
		...data.map((segment, idx) => ({ ...segment, fill: colorForIndex(idx) })),
		{ name: 'Remainder', value: remainingPercent, fill: REMAINDER_COLOR },
	];

	// Radius calculations to keep the arc within the square container
	const outerArcRadius = Math.max(40, Math.floor(height / 2 - 8)); // max allowed radius
	const ARC_THICKNESS = 48; // visual thickness of the arc (px)
	const innerArcRadius = Math.max(10, outerArcRadius - ARC_THICKNESS);
	const semiCircleCenterY = Math.floor(height - 24); // push arc downward so top half is visible

	// Final center label
	const centerText = label ?? `${Math.round(totalPercent)}%`;

	// Legend layout based on number of data points
	const legendJustifyClass =
		data.length <= 1 ? 'justify-center' : data.length === 2 ? 'justify-between' : 'justify-evenly';

	return (
		<div className="flex w-full flex-col items-center justify-center">
			<ChartContainer config={chartConfig} className="mx-auto aspect-square" style={{ height }}>
				<RechartsPieChart>
					{/* Base ring */}
					<Pie
						data={slices}
						dataKey="value"
						nameKey="name"
						startAngle={180}
						endAngle={0}
						cx="50%"
						cy={semiCircleCenterY}
						innerRadius={innerArcRadius}
						outerRadius={outerArcRadius}
						cornerRadius={0}
						stroke="#fff"
						strokeWidth={4}
						isAnimationActive
					>
						{slices.map((slice, index) => (
							<Cell key={`cell-${index}`} fill={slice.fill as string} />
						))}
						<Label
							position="center"
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							content={({ viewBox }: any) => {
								if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) return null;

								return (
									<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
										<tspan className={cn('text-h3 font-bold', labelClassName)}>{centerText}</tspan>
									</text>
								);
							}}
						/>
					</Pie>
				</RechartsPieChart>
			</ChartContainer>

			{/* Legend */}
			<div className="w-full pt-4">
				<div
					className={cn('flex mx-auto flex-row flex-nowrap items-center gap-x-6', legendJustifyClass)}
					style={{ width: height }}
				>
					{data.map((item, index) => (
						<div key={item.name} className="flex flex-col items-center gap-2">
							<div className="flex items-center gap-2">
								<span
									className="inline-block rounded-full"
									style={{ width: 14, height: 14, backgroundColor: colorForIndex(index) }}
								/>
								<span className="text-gray-500 text-caption1 font-medium">{item.name}</span>
							</div>
							<span className="text-h5 font-bold text-gray-900">{Math.round(item.value)}%</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default MeterChart;
