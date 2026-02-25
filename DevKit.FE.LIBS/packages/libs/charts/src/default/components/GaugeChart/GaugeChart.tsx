import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { cn } from '../../utils/cn';
import { ChartConfig, ChartContainer } from '../shared/Chart';
import { getColorByIndex } from './colors';

const chartConfig = {} satisfies ChartConfig;

export type GaugeChartData = {
	name: string;
	value: number;
}[];

const SEGMENTS = 20;

const getTotalValue = (data: GaugeChartData) => {
	return data.reduce((acc, curr) => acc + curr.value, 0);
};

const generateSegments = ({ data }: { data: GaugeChartData }) => {
	const total = data.reduce((sum, d) => sum + d.value, 0);
	const _data = [...data];

	const segments = [];

	for (let i = 0; i < SEGMENTS; i++) {
		const segmentValueRatio = i / SEGMENTS;
		let segmentCategory = '';
		let segmentCategoryIndex = 0;
		let threshold = 0;

		for (const [index, d] of _data.entries()) {
			threshold += d.value / total;

			if (segmentValueRatio < threshold) {
				segmentCategory = d.name;
				segmentCategoryIndex = index;
				break;
			}
		}

		segments.push({
			name: segmentCategory,
			value: 1,
			fill: getColorByIndex(segmentCategoryIndex || 0),
		});
	}

	return segments;
};

export function GaugeChart({
	data,
	label,
	labelClassName,
	height = 200,
}: {
	data: GaugeChartData;
	label?: string;
	labelClassName?: string;
	height?: number;
}) {
	const totalValue = getTotalValue(data);
	const calculatedLabel = label || `${((data?.[0]?.value / totalValue) * 100).toFixed(0)}%`;

	const chartData = data.reduce((acc, item) => {
		acc[item.name] = 100;

		return acc;
	}, {} as Record<string, number>);

	const outerRadius = height;
	const innerRadius = outerRadius - outerRadius * 0.55;

	return (
		<div className="flex w-full flex-col items-center justify-center">
			<ChartContainer config={chartConfig} className="mx-auto aspect-square " style={{ height }}>
				<RadialBarChart
					data={[chartData]}
					endAngle={180}
					innerRadius={innerRadius}
					outerRadius={outerRadius}
					cy={height - 30}
				>
					<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
						<Label
							content={({ viewBox }) => {
								if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
									return (
										<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
											<tspan
												x={viewBox.cx}
												y={(viewBox.cy || 0) - 16}
												className={cn('text-h3 font-bold', labelClassName)}
											>
												{calculatedLabel}
											</tspan>
										</text>
									);
								}
							}}
						/>
					</PolarRadiusAxis>
					{generateSegments({ data })
						.reverse()
						.map((segment, i) => (
							<RadialBar
								key={i}
								dataKey={segment.name}
								stackId="a"
								cornerRadius={8}
								strokeWidth={4}
								stroke="white"
								fill={segment.fill}
							/>
						))}
				</RadialBarChart>
			</ChartContainer>
			<div className=" w-full">
				<div className="flex gap-10 justify-center">
					{data.map((item, index) => (
						<div key={item.name} className="flex items-center gap-3">
							<div className="w-5 h-2 rounded-2xl" style={{ backgroundColor: getColorByIndex(index) }} />
							<span className="text-gray-400 text-caption1 font-medium">{item.name}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
