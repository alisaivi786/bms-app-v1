'use client';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer } from '../shared/Chart';

const chartConfig = {} satisfies ChartConfig;

type ChartData = {
	name: string;
	value: number;
}[];

type HorizontalBarsChartProps = {
	data: ChartData;
	height?: number;
	valueFormatter?: (value: number) => string;
	tickFormatter?: (value: number) => string;
	yAxisWidth?: number;
};

export function HorizontalBarsChart({
	data,
	height,
	valueFormatter,
	tickFormatter,
	yAxisWidth,
}: HorizontalBarsChartProps) {
	const calculateNiceStep = (min: number, max: number) => {
		const range = max - min;

		if (range === 0) return { step: 1, niceMax: max + 1 };

		const roughStep = range / 5;

		const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));

		const normalizedStep = roughStep / magnitude;

		let niceStep;

		if (normalizedStep <= 1) niceStep = 1;
		else if (normalizedStep <= 2) niceStep = 2;
		else if (normalizedStep <= 5) niceStep = 5;
		else niceStep = 10;

		const step = niceStep * magnitude;

		const niceMax = Math.ceil(max / step) * step + step;

		return { step, niceMax: Math.ceil(niceMax) };
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const formatToK = (value: any) => {
		if (Number.isNaN(value)) return value;

		const num = Math.round(Number(value));

		if (num >= 1000000) return `${Math.round(num / 1000000)}M`;

		if (num >= 1000) return `${Math.round(num / 1000)}k`;

		return num.toString();
	};

	return (
		<ChartContainer config={chartConfig} style={{ height }}>
			<BarChart
				accessibilityLayer
				barCategoryGap={8}
				data={data}
				layout="vertical"
				margin={{
					left: 0,
					right: 36,
				}}
			>
				<CartesianGrid horizontal={false} stroke="#e4e9f2" />

				<XAxis
					type="number"
					dataKey="value"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					allowDecimals={false}
					domain={([min, max]) => {
						const { niceMax } = calculateNiceStep(min, max);

						return [0, niceMax]; // Always start from 0 for better visual reference
					}}
					tick={{
						fill: '#a4a9b6',
					}}
					tickFormatter={tickFormatter || formatToK}
				/>
				<YAxis
					dataKey="name"
					type="category"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					width={yAxisWidth || 200}
					tick={{
						fill: '#727785',
					}}
				/>
				<Bar dataKey="value" fill="#15377D" radius={[0, 4, 4, 0]} barSize={16}>
					<LabelList
						dataKey="value"
						position="right"
						fill="#15377D"
						style={{ fontSize: 12 }}
						formatter={valueFormatter || ((value: number) => value.toLocaleString())}
					/>
				</Bar>
			</BarChart>
		</ChartContainer>
	);
}
