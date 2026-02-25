import {
	Area,
	CartesianGrid,
	Legend,
	Line,
	ComposedChart as RechartsComposedChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { PRODUCT_COLORS, TOOLTIP_CLASSES } from '../utils/chartColors';
import { defaultTooltipValueFormatter, defaultValueFormatter } from '../utils/numberFormatters';

type SeriesConfig = {
	dataKey: string;
	name: string;
	color: string;
	strokeWidth?: number;
};

type ComposedChartProps = {
	chartDataKey: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any[];
	series: SeriesConfig[];
	showTotalLine?: boolean;
	totalLineDataKey?: string;
	totalLineName?: string;
	totalLineColor?: string;
	totalLineStrokeWidth?: number;
	totalLineStrokeDasharray?: string;
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
	tooltipTitleGradient?: string;
	legendVerticalAlign?: 'top' | 'bottom' | 'middle';
	legendHeight?: number;
	legendFontSize?: string;
};

export const ComposedChart = ({
	chartDataKey,
	data,
	series,
	showTotalLine = true,
	totalLineDataKey = 'volume',
	totalLineName = 'Total Volume',
	totalLineColor = '#475569',
	totalLineStrokeWidth = 3,
	totalLineStrokeDasharray = '5 5',
	height = 300,
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
	tooltipBorderColor = TOOLTIP_CLASSES.container.split('border-')[1]?.split(' ')[0] || '#e2e8f0',
	tooltipBackgroundColor = 'rgba(255, 255, 255, 0.95)',
	tooltipTitleGradient = PRODUCT_COLORS.combined.gradient,
	legendVerticalAlign = 'top',
	legendHeight = 24,
	legendFontSize = '11px',
}: ComposedChartProps) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const CustomTooltip = ({ active, payload, label }: any) => {
		if (active && payload && payload.length) {
			return (
				<div
					className="backdrop-blur-sm border rounded-xl shadow-2xl p-3 min-w-[180px]"
					style={{
						backgroundColor: tooltipBackgroundColor,
						borderColor: tooltipBorderColor,
					}}
				>
					<div className="flex items-center gap-2 mb-2">
						<div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${tooltipTitleGradient}`}></div>
						<p className="font-semibold text-slate-800 text-sm">{label}</p>
					</div>
					{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
					{payload.map((entry: any, index: number) => (
						<div key={index} className="flex items-center justify-between gap-3 py-0.5">
							<div className="flex items-center gap-2">
								<div
									className="w-2.5 h-2.5 rounded-full shadow-sm"
									style={{
										background: `linear-gradient(135deg, ${entry.color}dd, ${entry.color})`,
									}}
								></div>
								<span className="text-slate-600 font-medium text-sm">{entry.name}</span>
							</div>
							<span className="font-bold text-slate-900 text-sm">{tooltipValueFormatter(entry.value)}</span>
						</div>
					))}
				</div>
			);
		}

		return null;
	};

	return (
		<ResponsiveContainer width="100%" height={height}>
			<RechartsComposedChart data={data} margin={margin}>
				<defs>
					{series.map((area) => (
						<linearGradient key={area.dataKey} id={`${area.dataKey}AreaGradient`} x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor={area.color} stopOpacity={0.8} />
							<stop offset="100%" stopColor={area.color} stopOpacity={0.1} />
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
				<Tooltip content={<CustomTooltip />} />
				<Legend
					verticalAlign={legendVerticalAlign}
					height={legendHeight}
					wrapperStyle={{ fontSize: legendFontSize, paddingBottom: '8px' }}
					formatter={(value) => <span className="text-xs font-medium text-slate-700">{value}</span>}
				/>
				{series.map((item) => {
					return (
						<Area
							key={item.dataKey}
							type="monotone"
							dataKey={item.dataKey}
							stackId={item.dataKey}
							stroke={item.color}
							fill={`url(#${item.dataKey}AreaGradient)`}
							strokeWidth={item.strokeWidth || 2}
							name={item.name}
							className="drop-shadow-sm"
						/>
					);
				})}
				{showTotalLine && (
					<Line
						type="monotone"
						dataKey={totalLineDataKey}
						stroke={totalLineColor}
						strokeWidth={totalLineStrokeWidth}
						strokeDasharray={totalLineStrokeDasharray}
						name={totalLineName}
						dot={{
							fill: totalLineColor,
							strokeWidth: 2,
							r: 4,
							className: 'drop-shadow-md',
						}}
						activeDot={{
							r: 6,
							fill: totalLineColor,
							stroke: '#ffffff',
							strokeWidth: 2,
							className: 'drop-shadow-lg',
						}}
					/>
				)}
			</RechartsComposedChart>
		</ResponsiveContainer>
	);
};
