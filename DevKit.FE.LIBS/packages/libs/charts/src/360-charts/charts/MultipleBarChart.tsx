import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { defaultTooltipValueFormatter, defaultValueFormatter } from '../utils/numberFormatters';

type BarConfig = {
	dataKey: string;
	name: string;
	color: {
		primary: string;
		secondary: string;
	};
};

export interface MultipleBarChartProps {
	chartDataKey: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any[];
	bars: BarConfig[];
	height?: number;
	margin?: { top: number; right: number; left: number; bottom: number };
	valueFormatter?: (value: number) => string;
	tooltipValueFormatter?: (value: number) => string;
	gridColor?: string;
	gridOpacity?: number;
	xAxisStroke?: string;
	xAxisFontSize?: number;
	xAxisFontWeight?: number;
	yAxisStroke?: string;
	yAxisFontSize?: number;
	yAxisFontWeight?: number;
	tooltipBorderColor?: string;
	tooltipBackgroundColor?: string;
	showTotal?: boolean;
	barRadius?: [number, number, number, number];
	legendVerticalAlign?: 'top' | 'bottom' | 'middle';
	legendHeight?: number;
	legendFontSize?: string;
}

export const MultipleBarChart = ({
	chartDataKey,
	data,
	bars,
	height = 280,
	margin = { top: 20, right: 30, left: 20, bottom: 5 },
	valueFormatter = defaultValueFormatter,
	tooltipValueFormatter = defaultTooltipValueFormatter,
	gridColor = '#e2e8f0',
	gridOpacity = 0.6,
	xAxisStroke = '#64748b',
	xAxisFontSize = 12,
	xAxisFontWeight = 500,
	yAxisStroke = '#64748b',
	yAxisFontSize = 12,
	yAxisFontWeight = 500,
	tooltipBorderColor = '#e2e8f0',
	tooltipBackgroundColor = 'rgba(255, 255, 255, 0.95)',
	showTotal = true,
	barRadius = [4, 4, 0, 0],
	legendVerticalAlign = 'top',
	legendHeight = 24,
	legendFontSize = '11px',
}: MultipleBarChartProps) => {
	const colorMap = bars.reduce((acc, bar) => {
		acc[bar.name] = bar.color.primary;

		return acc;
	}, {} as Record<string, string>);

	return (
		<ResponsiveContainer width="100%" height={height}>
			<BarChart data={data} margin={margin}>
				<defs>
					{bars.map((bar) => (
						<linearGradient key={bar.dataKey} id={`${bar.dataKey}Gradient`} x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor={bar.color.primary} stopOpacity={0.8} />
							<stop offset="100%" stopColor={bar.color.secondary} stopOpacity={0.6} />
						</linearGradient>
					))}
				</defs>
				<CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={gridOpacity} />
				<XAxis dataKey={chartDataKey} stroke={xAxisStroke} fontSize={xAxisFontSize} fontWeight={xAxisFontWeight} />
				<YAxis
					stroke={yAxisStroke}
					fontSize={yAxisFontSize}
					fontWeight={yAxisFontWeight}
					tickFormatter={valueFormatter}
				/>
				<Tooltip
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					content={({ active, payload, label }: any) => {
						if (active && payload && payload.length) {
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							const total = payload.reduce((sum: number, entry: any) => {
								return sum + (entry.value || 0);
							}, 0);

							return (
								<div
									className="backdrop-blur-sm border rounded-xl shadow-2xl p-3 min-w-[180px]"
									style={{
										backgroundColor: tooltipBackgroundColor,
										borderColor: tooltipBorderColor,
									}}
								>
									<div className="flex items-center gap-2 mb-2">
										<div
											className="w-2.5 h-2.5 rounded-full"
											style={{
												background: `linear-gradient(to right, ${bars[0]?.color.primary}, ${bars[0]?.color.secondary})`,
											}}
										></div>
										<p className="font-semibold text-slate-800 text-sm">{label}</p>
									</div>
									{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
									{payload.map((entry: any, index: number) => (
										<div key={index} className="flex items-center justify-between gap-3 py-0.5">
											<div className="flex items-center gap-2">
												<div
													className="w-2.5 h-2.5 rounded-full shadow-sm"
													style={{
														backgroundColor: colorMap[entry.name] || entry.color,
													}}
												></div>
												<span className="text-slate-600 font-medium text-sm">{entry.name}</span>
											</div>
											<span className="font-bold text-slate-900 text-sm">
												{tooltipValueFormatter(entry.value || 0)}
											</span>
										</div>
									))}
									{showTotal && (
										<div className="border-t border-slate-200 mt-2 pt-2">
											<div className="flex items-center justify-between gap-3">
												<div className="flex items-center gap-2">
													<div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-slate-300 to-slate-400"></div>
													<span className="text-slate-800 font-semibold text-sm">Total</span>
												</div>
												<span className="font-bold text-slate-900 text-sm">{tooltipValueFormatter(total)}</span>
											</div>
										</div>
									)}
								</div>
							);
						}

						return null;
					}}
				/>
				<Legend
					verticalAlign={legendVerticalAlign}
					height={legendHeight}
					wrapperStyle={{ fontSize: legendFontSize, paddingBottom: '8px' }}
					formatter={(value) => <span className="text-xs font-medium text-slate-700">{value}</span>}
				/>
				{bars.map((bar) => (
					<Bar
						key={bar.dataKey}
						dataKey={bar.dataKey}
						fill={`url(#${bar.dataKey}Gradient)`}
						name={bar.name}
						radius={barRadius}
						className="drop-shadow-sm"
					/>
				))}
			</BarChart>
		</ResponsiveContainer>
	);
};
