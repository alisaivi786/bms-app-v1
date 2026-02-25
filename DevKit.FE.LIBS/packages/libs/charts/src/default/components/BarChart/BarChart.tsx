'use client';

import { CartesianGrid, BarChart as RechartsBarChart, XAxis, YAxis } from 'recharts';
import { formatToK, getYAxisWidth, truncateLabel, truncateLabelHorizontal } from '../../utils/chartUtils';
import { ChartConfig, ChartContainer } from '../shared/Chart';
import { renderGroupedBarChart } from './GroupedBarChart';
import { renderSimpleBarChart } from './SimpleBarChart';
import { renderStackedBar, transformToStackedData } from './StackedBar';

const chartConfig = {} satisfies ChartConfig;

type SimpleChartData = {
	name: string;
	value: number;
}[];

type GroupedChartData = {
	name: string;
	values: {
		name: string;
		value: number;
	}[];
}[];

type ChartData = SimpleChartData | GroupedChartData;

type BarChartProps = {
	data: ChartData;
	height?: number;
	layout?: 'vertical' | 'horizontal' | 'stacked';
	maxTotal?: number;
	tickFormatter?: (value: string | number) => string;
	valueFormatter?: (value: number) => string;
};

export function BarChart({
	data,
	height,
	layout = 'horizontal',
	maxTotal,
	tickFormatter = formatToK,
	valueFormatter = (value: number) => value.toLocaleString(),
}: BarChartProps) {
	// Check if data is grouped (has 'values' property) or simple (has 'value' property)
	const isGroupedData = data.length > 0 && 'values' in data[0];

	// Layout checks
	const isHorizontal = layout === 'horizontal';
	const isStacked = layout === 'stacked';

	// Transform data based on type
	let chartData: Record<string, string | number>[];
	let categoryKeys: string[] = [];

	if (isGroupedData) {
		const groupedData = data as GroupedChartData;

		// Get all unique keys
		const allKeys = groupedData.reduce(
			(acc: string[], group: { name: string; values: { name: string; value: number }[] }) => {
				return acc.concat(group.values.map((v: { name: string; value: number }) => v.name));
			},
			[]
		);
		const keys = Array.from(new Set(allKeys));

		// Transform to recharts format: each key becomes a data point with all categories
		chartData = keys.map((key: string) => {
			const keyData: Record<string, string | number> = { name: key };

			groupedData.forEach((group: { name: string; values: { name: string; value: number }[] }) => {
				const value = group.values.find((v: { name: string; value: number }) => v.name === key)?.value || 0;

				keyData[group.name] = value;
			});

			return keyData;
		});

		categoryKeys = groupedData.map((group: { name: string; values: { name: string; value: number }[] }) => group.name);
	} else {
		chartData = data as SimpleChartData;
		categoryKeys = ['value']; // For simple data, we use 'value' as the key
	}

	// Transform data for stacked charts (same height bars with proportional segments)
	if (isStacked && isGroupedData) {
		chartData = transformToStackedData(chartData, categoryKeys, maxTotal);
	}

	// Check if any label is long enough to require rotation
	const hasLongLabels = !isHorizontal && chartData.some((item) => item.name.toString().length > 8);
	const labelAngle = isHorizontal ? 0 : hasLongLabels ? -45 : 0;
	const labelTextAnchor = isHorizontal ? 'middle' : hasLongLabels ? 'end' : 'middle';
	const bottomMargin = isHorizontal ? 10 : hasLongLabels ? 50 : 20;

	// Colors for different categories
	const colors = [
		'#15377D',
		'#3B82F6',
		'#60A5FA',
		'#93C5FD',
		'#BFDBFE',
		'#DBEAFE',
		'#EFF6FF',
		'#1E40AF',
		'#2563EB',
		'#3B82F6',
	];

	return (
		<ChartContainer config={chartConfig} style={{ height }}>
			<RechartsBarChart
				accessibilityLayer
				barCategoryGap={8}
				data={chartData}
				layout={isHorizontal ? 'vertical' : undefined}
				margin={{
					left: isHorizontal ? 0 : 10,
					right: isHorizontal ? 70 : 10,
					top: isStacked ? 40 : 10,
					bottom: bottomMargin,
				}}
			>
				<CartesianGrid horizontal={!isHorizontal} vertical={isHorizontal} stroke="#e4e9f2" />

				<XAxis
					type={isHorizontal ? 'number' : 'category'}
					dataKey={isHorizontal ? undefined : 'name'}
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					interval={isHorizontal ? undefined : 0}
					angle={labelAngle}
					textAnchor={labelTextAnchor}
					height={isHorizontal ? undefined : hasLongLabels ? 80 : 60}
					tick={{
						fill: '#a4a9b6',
						fontSize: 15,
					}}
					tickFormatter={isHorizontal ? tickFormatter : (value: string) => truncateLabel(value)}
				/>
				<YAxis
					dataKey={isHorizontal ? 'name' : undefined}
					type={isHorizontal ? 'category' : 'number'}
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					width={getYAxisWidth(chartData, isHorizontal)}
					tick={{
						fill: '#727785',
					}}
					tickFormatter={isHorizontal ? (value: string) => truncateLabelHorizontal(value) : tickFormatter}
				/>

				{(() => {
					if (!isGroupedData) {
						return renderSimpleBarChart({ isHorizontal, valueFormatter });
					}

					if (isStacked) {
						return renderStackedBar({
							isHorizontal,
							primaryColor: colors[0] || '#2563EB',
							secondaryColor: '#E2E8F0',
						});
					}

					return renderGroupedBarChart({
						categoryKeys,
						isHorizontal,
						valueFormatter,
						colors,
					});
				})()}
			</RechartsBarChart>
		</ChartContainer>
	);
}
