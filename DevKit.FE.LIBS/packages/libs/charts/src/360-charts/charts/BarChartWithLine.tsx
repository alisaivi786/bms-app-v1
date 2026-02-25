import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { LEGEND_STYLES, TOOLTIP_CLASSES } from '../utils/chartColors';
import { defaultValueFormatter, formatNumberWithCommas } from '../utils/numberFormatters';

export interface IBarChartWithLineProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any[];
	chartDataKey: string;
	barDataKey: string;
	lineDataKey: string;
	barLabel: string;
	lineLabel: string;
	height?: number;
	margin?: { top: number; right: number; left: number; bottom: number };
	barColor?: string;
	barGradientStart?: string;
	barGradientEnd?: string;
	lineColor?: string;
	gridColor?: string;
	gridOpacity?: number;
	xAxisStroke?: string;
	xAxisFontSize?: number;
	xAxisFontWeight?: number;
	yAxisLeftStroke?: string;
	yAxisLeftFontSize?: number;
	yAxisLeftFontWeight?: number;
	yAxisRightStroke?: string;
	yAxisRightFontSize?: number;
	yAxisRightFontWeight?: number;
	leftAxisFormatter?: (value: number) => string;
	rightAxisFormatter?: (value: number) => string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	tooltipFormatter?: (value: any, name: string) => string;
}

export const BarChartWithLine = ({
	data,
	barLabel,
	lineLabel,
	chartDataKey,
	barDataKey,
	lineDataKey,
	height = 200,
	margin = { top: 10, right: 30, left: 10, bottom: 5 },
	barColor = '#3b82f6',
	barGradientStart = '#3b82f6',
	barGradientEnd = '#0891b2',
	lineColor = '#1d4ed8',
	gridColor = '#e2e8f0',
	gridOpacity = 0.4,
	xAxisStroke = '#64748b',
	xAxisFontSize = 11,
	xAxisFontWeight = 500,
	yAxisLeftStroke = '#3b82f6',
	yAxisLeftFontSize = 11,
	yAxisLeftFontWeight = 500,
	yAxisRightStroke = '#1d4ed8',
	yAxisRightFontSize = 11,
	yAxisRightFontWeight = 500,
	leftAxisFormatter = defaultValueFormatter,
	rightAxisFormatter = defaultValueFormatter,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	tooltipFormatter = (value: any) => formatNumberWithCommas(value),
}: IBarChartWithLineProps) => {
	return (
		<div>
			<ResponsiveContainer width="100%" height={height}>
				<ComposedChart data={data} margin={margin}>
					<defs>
						<linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor={barGradientStart} stopOpacity={0.8} />
							<stop offset="100%" stopColor={barGradientEnd} stopOpacity={0.6} />
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray="3 3" stroke={gridColor} strokeOpacity={gridOpacity} vertical={false} />
					<XAxis
						dataKey={chartDataKey}
						stroke={xAxisStroke}
						fontSize={xAxisFontSize}
						fontWeight={xAxisFontWeight}
						tickLine={false}
						axisLine={false}
					/>
					<YAxis
						yAxisId={barDataKey}
						orientation="left"
						stroke={yAxisLeftStroke}
						fontSize={yAxisLeftFontSize}
						fontWeight={yAxisLeftFontWeight}
						tickLine={false}
						axisLine={false}
						tickFormatter={leftAxisFormatter}
					/>
					<YAxis
						yAxisId={lineDataKey}
						orientation="right"
						stroke={yAxisRightStroke}
						fontSize={yAxisRightFontSize}
						fontWeight={yAxisRightFontWeight}
						tickLine={false}
						axisLine={false}
						tickFormatter={rightAxisFormatter}
					/>
					<Tooltip
						content={({ active, payload, label }) => {
							if (active && payload && payload.length) {
								return (
									<div className={TOOLTIP_CLASSES.container}>
										<div className="flex items-center gap-2 mb-2">
											<div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: barColor }}></div>
											<p className={TOOLTIP_CLASSES.titleText}>{label}</p>
										</div>
										{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
										{payload.map((entry: any, index: number) => (
											<div key={index} className="flex items-center justify-between gap-3 py-0.5">
												<div className="flex items-center gap-2">
													<div
														className="w-2.5 h-2.5 rounded-full"
														style={{
															backgroundColor: entry.name === lineLabel ? lineColor : entry.color || barColor,
															boxShadow: '0 0 4px rgba(0, 0, 0, 0.5)',
														}}
													></div>
													<span className={TOOLTIP_CLASSES.itemLabel}>{entry.name}</span>
												</div>
												<span className={TOOLTIP_CLASSES.itemValue}>{tooltipFormatter(entry.value, entry.name)}</span>
											</div>
										))}
									</div>
								);
							}

							return null;
						}}
					/>
					<Bar
						yAxisId={barDataKey}
						dataKey={barDataKey}
						fill="url(#gradient)"
						name={barLabel}
						radius={[2, 2, 0, 0]}
						className="transition-all duration-300"
					/>
					<Line
						yAxisId={lineDataKey}
						type="monotone"
						dataKey={lineDataKey}
						stroke={lineColor}
						strokeWidth={3}
						name={lineLabel}
						dot={{ fill: lineColor, strokeWidth: 2, r: 4 }}
						activeDot={{ r: 6, stroke: lineColor, strokeWidth: 2, fill: '#f1f5f9' }}
					/>
				</ComposedChart>
			</ResponsiveContainer>

			{/* Simplified Legend */}
			<div className={`${LEGEND_STYLES.container} mt-2`}>
				<div className={LEGEND_STYLES.item}>
					<div className="w-3 h-2 rounded-sm" style={{ backgroundColor: barColor }}></div>
					<span className={LEGEND_STYLES.text}>{barLabel}</span>
				</div>
				<div className={LEGEND_STYLES.item}>
					<div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: lineColor }}></div>
					<span className={LEGEND_STYLES.text}>{lineLabel}</span>
				</div>
			</div>
		</div>
	);
};
