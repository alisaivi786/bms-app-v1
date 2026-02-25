import React from 'react';
import { CartesianGrid, Line, LineChart as RechartsLineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer } from '../shared/Chart';
import { getLineColorByIndex } from './colors';

// New data model: each entry represents a line (series) with a name and
// an array of x-axis points (name) with values.
export type LCMPoint = { name: string; value: number };

export type LineChartMultipleData = { name: string; series: LCMPoint[] };

export type LineChartMultipleProps = {
	data: LineChartMultipleData[];
	height?: number;
	showGrid?: boolean;
	tooltipPrefix?: string; // e.g., 'AED'
	tooltipOffset?: number; // vertical distance from point to bubble
};

const chartConfig = {} satisfies ChartConfig;

export function LineChartMultiple({
	data,
	height,
	showGrid = false,
	tooltipPrefix,
	tooltipOffset = 28,
}: LineChartMultipleProps) {
	// Currently selected series key under the cursor (e.g., 's0', 's1').
	const [activeSeriesKey, setActiveSeriesKey] = React.useState<string | null>(null);
	// Screen coordinates and style for the tooltip; updated by the active dot.
	const [tooltipAnchor, setTooltipAnchor] = React.useState<{
		x: number;
		y: number;
		value: number;
		color: string;
	} | null>(null);

	// Derive series keys and color map
	// One line (series) per item in data; assign index-based keys s0, s1, ...
	const seriesKeys = React.useMemo(() => Array.from({ length: data.length }, (_, i) => `s${i}`), [data]);
	const seriesColorMap = React.useMemo(() => {
		const map: Record<string, string> = {};

		for (let i = 0; i < data.length; i++) {
			map[`s${i}`] = getLineColorByIndex(i);
		}

		return map;
	}, [data]);

	// Flatten into Recharts-friendly rows
	// Create ordered x-axis labels from all series (preserve first-seen order)
	const xLabels = React.useMemo(() => {
		const seen = new Set<string>();
		const labels: string[] = [];

		data.forEach((line) => {
			line.series.forEach((p) => {
				if (!seen.has(p.name)) {
					seen.add(p.name);
					labels.push(p.name);
				}
			});
		});

		return labels;
	}, [data]);

	// Flatten into Recharts-friendly rows: { name: 'SEP', s0: 42, s1: 20, ... }
	const normalizedRows = React.useMemo(() => {
		return xLabels.map((label) => {
			const row: Record<string, number | string | null> = { name: label };

			data.forEach((line, idx) => {
				const key = `s${idx}`;
				const found = line.series.find((p) => p.name === label);

				row[key] = found ? found.value : null;
			});

			return row;
		});
	}, [xLabels, data]);

	const allValuesAcrossSeries: number[] = React.useMemo(() => {
		const vals: number[] = [];

		for (const line of data) {
			for (const point of line.series) {
				vals.push(point.value);
			}
		}

		return vals;
	}, [data]);
	const yMax = allValuesAcrossSeries.length ? Math.max(...allValuesAcrossSeries) : 0;
	const yMin = allValuesAcrossSeries.length ? Math.min(...allValuesAcrossSeries) : 0;

	const formatValue = (v: number) => {
		const formatted = v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

		return tooltipPrefix ? `${tooltipPrefix} ${formatted}` : formatted;
	};

	return (
		<ChartContainer config={chartConfig} style={{ height }}>
			<RechartsLineChart
				accessibilityLayer
				data={normalizedRows}
				margin={{ top: 24, right: 16, left: 16, bottom: 24 }}
				onMouseLeave={() => {
					setActiveSeriesKey(null);
					setTooltipAnchor(null);
				}}
			>
				{showGrid && <CartesianGrid vertical={false} stroke="#EAECF0" strokeDasharray="6 6" />}

				<XAxis
					dataKey="name"
					tickLine={false}
					axisLine={false}
					tickMargin={12}
					interval={0}
					padding={{ left: 16, right: 16 }}
				/>
				<YAxis hide domain={[Math.min(0, yMin), yMax]} />

				{/* HTML overlay tooltip positioned above all layers using absolute positioning */}
				<Tooltip
					cursor={false}
					// Position above the ring with a reduced minimum clearance for closer look
					position={
						tooltipAnchor ? { x: tooltipAnchor.x, y: tooltipAnchor.y - Math.max(tooltipOffset, 20) } : undefined
					}
					wrapperStyle={{ zIndex: 9999, pointerEvents: 'none' }}
					content={
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						() =>
							tooltipAnchor ? (
								<div
									style={{
										background: tooltipAnchor.color,
										color: '#fff',
										padding: '8px 14px',
										borderRadius: 12,
										fontSize: 14,
										fontWeight: 800,
										lineHeight: 1.2,
										position: 'relative',
										whiteSpace: 'nowrap',
										transform: 'translate(-50%, -100%)',
									}}
								>
									{formatValue(tooltipAnchor.value)}
									<svg
										width={18}
										height={10}
										viewBox="0 0 18 10"
										style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: -10 }}
									>
										<polygon points="0,0 18,0 9,10" fill={tooltipAnchor.color} />
									</svg>
								</div>
							) : null
					}
				/>

				{seriesKeys.map((seriesKey) => (
					<Line
						key={seriesKey}
						type="monotone"
						dataKey={seriesKey}
						stroke={seriesColorMap[seriesKey]}
						strokeWidth={4}
						dot={false}
						onMouseEnter={() => setActiveSeriesKey(seriesKey)}
						onMouseMove={() => setActiveSeriesKey(seriesKey)}
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						activeDot={(props: any) => {
							if (activeSeriesKey !== seriesKey) return <g />;
							const ringStrokeWidth = 4;

							const ActiveHoverRing: React.FC<{
								cx: number;
								cy: number;
								value: number;
								color: string;
								strokeW: number;
							}> = ({ cx, cy, value, color, strokeW }) => {
								React.useEffect(() => {
									setTooltipAnchor({ x: cx, y: cy, value: Number(value) || 0, color });
								}, [cx, cy, value, color]);

								return <circle cx={cx} cy={cy} r={7} fill="#fff" stroke={color} strokeWidth={strokeW} />;
							};

							return (
								<ActiveHoverRing
									cx={props.cx}
									cy={props.cy}
									value={props.value}
									color={seriesColorMap[seriesKey]}
									strokeW={ringStrokeWidth}
								/>
							);
						}}
					/>
				))}
			</RechartsLineChart>
		</ChartContainer>
	);
}

export default LineChartMultiple;
