'use client';

import { Cell, LabelList, Pie, PieChart as RechartsPieChart } from 'recharts';
import { cn } from '../../utils/cn';
import { roundTo100 } from '../../utils/round-percentages';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../shared/Chart';
import { ChartIcon } from './ChartIcon';
import { getColorByIndex } from './colors';

export type PieDonutChartData = {
	name: string;
	value: number;
	count: number;
	stats?: 'increase' | 'decrease';
}[];

const chartConfig = {} satisfies ChartConfig;

type Variant = 'donut' | 'ring';

type BasePieChartProps = {
	legendVariant?: 'default' | 'cards';
	height?: number;
	variant?: Variant;
	data: PieDonutChartData;
	legendItemClassName?: string;
};

type PieDonutChartProps = BasePieChartProps & {
	variant?: 'donut';
	labelsPosition?: undefined;
};

type PieRingChartProps = BasePieChartProps & {
	variant: 'ring';
	labelsPosition?: 'inside' | 'outside';
};

type PieChartProps = PieDonutChartProps | PieRingChartProps;

type Theme = {
	innerRadius: number | string;
	cornerRadius: number;
	paddingAngle: number;
	label: {
		position: 'inside' | 'outside';
		color: string;
		size: number;
		offset: number;
	};
};

const themes: Record<Variant, Theme> = {
	donut: {
		innerRadius: '60%',
		cornerRadius: 8,
		paddingAngle: 2,
		label: {
			position: 'inside',
			color: '#fff',
			size: 12,
			offset: 0,
		},
	},
	ring: {
		innerRadius: '78%',
		cornerRadius: 0,
		paddingAngle: 1,
		label: {
			position: 'outside',
			color: '#9899AA',
			size: 12,
			offset: 12,
		},
	},
};

export function PieChart({
	data,
	legendVariant = 'default',
	variant = 'donut',
	height,
	labelsPosition = 'outside',
	legendItemClassName,
}: PieChartProps) {
	const theme = themes[variant];
	const smallValueThreshold = 4;

	const roundedData = roundTo100(data.map((item) => item.value));

	const _data = data.map((item, index) => ({
		...item,
		originalValue: item.value,
		value: roundedData[index],
		stats: item.stats || 'increase',
	}));

	return (
		<div
			className={cn(
				'flex w-full',
				legendVariant === 'default' && 'flex-col',
				legendVariant === 'cards' && 'flex-row items-center justify-between'
			)}
		>
			<ChartContainer config={chartConfig} className="mx-auto aspect-square " style={{ height }}>
				<RechartsPieChart
					margin={{
						top: labelsPosition === 'outside' ? 40 : 0,
						right: 0,
						bottom: labelsPosition === 'outside' ? 40 : 0,
						left: 0,
					}}
				>
					<defs>
						<filter id="pieChartShadow" x="-50%" y="-50%" width="200%" height="200%">
							<feDropShadow dx="0" dy="2.13" stdDeviation="2" floodColor="rgb(31, 30, 30)" floodOpacity="0.12" />
						</filter>
					</defs>
					<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
					<Pie
						data={_data}
						cx="50%"
						cy="50%"
						innerRadius={theme.innerRadius}
						outerRadius="100%"
						paddingAngle={theme.paddingAngle}
						cornerRadius={theme.cornerRadius}
						dataKey="value"
						nameKey="name"
						startAngle={90}
						endAngle={-270}
						labelLine={false}
					>
						{_data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={getColorByIndex(index, variant)} stroke="none" />
						))}
						<LabelList
							dataKey="value"
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							content={({ viewBox, value, index }: any) => {
								const { innerRadius, outerRadius, cy, cx, startAngle, endAngle } = viewBox;
								const RADIAN = Math.PI / 180;
								const midAngle = (startAngle + endAngle) / 2;

								const ringWidth = outerRadius - innerRadius;

								const offset =
									variant === 'ring' ? (labelsPosition === 'outside' ? 1 : -1) * (ringWidth + theme.label.offset) : 0;

								const shouldShowLine = value < smallValueThreshold && value > 0;

								const factor = index % 2 === 0 ? -1 : 1;

								const radius = innerRadius + ringWidth * 0.5 + offset + (shouldShowLine ? 40 + factor * 6 : 0);
								const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
								const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

								// Calculate line points for small values
								const lineStartRadius = outerRadius + 15 + factor * 6;
								const lineEndRadius = outerRadius + theme.label.offset;
								const lineStartX = cx + lineStartRadius * Math.cos(-(midAngle ?? 0) * RADIAN);
								const lineStartY = cy + lineStartRadius * Math.sin(-(midAngle ?? 0) * RADIAN);
								const lineEndX = cx + lineEndRadius * Math.cos(-(midAngle ?? 0) * RADIAN);
								const lineEndY = cy + lineEndRadius * Math.sin(-(midAngle ?? 0) * RADIAN);
								const lineColor = getColorByIndex(index, 'donut');

								const labelElement = (
									<g>
										{shouldShowLine && (
											<line
												x1={lineStartX}
												y1={lineStartY}
												x2={lineEndX}
												y2={lineEndY}
												stroke={lineColor}
												strokeWidth={1}
											/>
										)}
										<text
											x={x}
											y={y}
											fill={value < smallValueThreshold ? lineColor : theme.label.color}
											fontSize={theme.label.size}
											fontWeight={500}
											textAnchor="middle"
											dominantBaseline="central"
										>
											{`${Math.round(value)}%`}
										</text>
									</g>
								);

								if (variant === 'donut') {
									return value > 0 ? labelElement : null;
								}

								const relativeToCenterPosition = {
									x: x - cx,
									y: y - cy,
								};

								const isInside = variant === 'ring' && labelsPosition === 'inside';
								const yNoRadius = isInside
									? relativeToCenterPosition.y > 0
										? 'bottom'
										: 'top'
									: relativeToCenterPosition.y > 0
									? 'top'
									: 'bottom';
								const xNoRadius = isInside
									? relativeToCenterPosition.x > 0
										? 'right'
										: 'left'
									: relativeToCenterPosition.x > 0
									? 'left'
									: 'right';

								const cornerRadii = {
									topLeft: yNoRadius === 'top' && xNoRadius === 'left' ? 0 : 8,
									topRight: yNoRadius === 'top' && xNoRadius === 'right' ? 0 : 8,
									bottomRight: yNoRadius === 'bottom' && xNoRadius === 'right' ? 0 : 8,
									bottomLeft: yNoRadius === 'bottom' && xNoRadius === 'left' ? 0 : 8,
								};

								return (
									<g>
										<path
											d={`
												M ${x - 20 + cornerRadii.topLeft} ${y - 12}
												h ${40 - cornerRadii.topLeft - cornerRadii.topRight}
												q ${cornerRadii.topRight} 0 ${cornerRadii.topRight} ${cornerRadii.topRight}
												v ${24 - cornerRadii.topRight - cornerRadii.bottomRight}
												q 0 ${cornerRadii.bottomRight} -${cornerRadii.bottomRight} ${cornerRadii.bottomRight}
												h -${40 - cornerRadii.bottomRight - cornerRadii.bottomLeft}
												q -${cornerRadii.bottomLeft} 0 -${cornerRadii.bottomLeft} -${cornerRadii.bottomLeft}
												v -${24 - cornerRadii.bottomLeft - cornerRadii.topLeft}
												q 0 -${cornerRadii.topLeft} ${cornerRadii.topLeft} -${cornerRadii.topLeft}
											`}
											fill="white"
											filter="url(#pieChartShadow)"
										/>
										{labelElement}
									</g>
								);
							}}
						/>
					</Pie>
				</RechartsPieChart>
			</ChartContainer>

			{legendVariant === 'default' && (
				<div className="p-4 w-full">
					<div className="flex flex-wrap gap-x-4 gap-y-2 w-full">
						{_data.map((item, index) => (
							<div key={item.name} className={cn('flex items-center gap-3 flex-none', legendItemClassName)}>
								<div
									style={{
										backgroundColor: getColorByIndex(index, variant),
										width: '1.25rem',
										minWidth: '1.25rem',
										height: '0.5rem',
										minHeight: '0.5rem',
										borderRadius: '1rem',
									}}
								/>
								<span className="text-gray-400 text-caption1 font-medium">
									{item.name} ({item.value}%)
								</span>
							</div>
						))}
					</div>
				</div>
			)}

			{legendVariant === 'cards' && (
				<div className="flex flex-col gap-4 float-end">
					{_data.map((item, index) => (
						<div
							key={item.name}
							className="w-full bg-white border-2 border-dashed border-gray-100 rounded-lg p-4 px-6 flex items-center justify-between"
						>
							{/* Chart Icon */}
							<div className="flex-shrink-0">
								<div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
									<ChartIcon color={getColorByIndex(index, variant)} />
								</div>
							</div>

							{/* Location Name */}
							<div className="flex-1 mx-4">
								<h2 className="text-body font-medium text-gray-800">{item.name}</h2>
							</div>

							{/* Main Metric */}
							<div className="flex-shrink-0 me-8">
								<span className="text-h3 font-bold text-gray-900">{item.count}</span>
							</div>

							{/* Percentage */}
							<div className="flex-shrink-0">
								<div
									className="rounded-lg  py-1 px-2"
									style={{ backgroundColor: getColorByIndex(index, variant) + '20' }}
								>
									<span className="text-4xl font-medium" style={{ color: getColorByIndex(index, variant) }}>
										{item.value}%
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
