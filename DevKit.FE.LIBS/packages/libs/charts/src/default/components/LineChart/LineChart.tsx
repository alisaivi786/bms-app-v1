import { ReactElement } from 'react';
import { CartesianGrid, Line, LineChart as RechartsLineChart, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer } from '../shared/Chart';

const chartConfig = {} satisfies ChartConfig;

type ChartData = {
	name: string;
	value: number;
}[];

type LineChartProps = {
	data: ChartData;
	height?: number;
	step?: number;
};

const getTickStep = (maxValue: number) => {
	if (maxValue >= 1_000_000) return 1_000_000;

	if (maxValue >= 10_000) return 10_000;

	if (maxValue >= 1_000) return 1_000;

	if (maxValue >= 100) return 100;

	return 10;
};

const getTicks = (maxValue: number, step?: number) => {
	const _step = step ?? getTickStep(maxValue);
	const ticks = [];

	for (let i = 0; i <= maxValue + _step; i += _step) {
		ticks.push(i);
	}

	return ticks;
};

const formatToK = (value: number) => {
	if (value >= 1_000_000) return `${value / 1_000_000}M`;

	if (value >= 1_000) return `${value / 1_000}k`;

	return value.toString();
};

export function LineChart({ data, height, step }: LineChartProps) {
	const maxValue = Math.max(...data.map((d) => d.value));
	const ticks = getTicks(maxValue, step);

	return (
		<ChartContainer config={chartConfig} style={{ height }}>
			<RechartsLineChart accessibilityLayer data={data} margin={{ right: 10, bottom: 16 }}>
				<CartesianGrid vertical={false} stroke="#DDDDDD" strokeDasharray="10 10" />
				<XAxis
					dataKey="name"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tick={({ x, y, payload, index }): ReactElement<SVGElement> => {
						const align = index === 0 ? 'start' : index === ticks.length ? 'end' : 'middle';

						return (
							<text x={x} y={y + 16} textAnchor={align} fill="#666666" fontSize={18} fontWeight={500}>
								{payload.value}
							</text>
						);
					}}
				/>
				<YAxis
					dataKey="value"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					domain={[0, maxValue]}
					tick={{ fontSize: 18, fontWeight: 500, fill: '#666666' }}
					ticks={ticks}
					tickFormatter={(val) => formatToK(val)}
				/>
				<Line
					dataKey="value"
					type="linear"
					stroke="#00285E"
					strokeWidth={4}
					dot={{ fill: '#00285E', stroke: '#00285E', r: 4 }}
				/>
			</RechartsLineChart>
		</ChartContainer>
	);
}
