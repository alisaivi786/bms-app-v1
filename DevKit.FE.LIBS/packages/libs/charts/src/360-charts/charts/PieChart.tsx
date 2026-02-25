import { Cell, Pie, PieChart as PieChartRecharts, ResponsiveContainer, Tooltip } from 'recharts';

export type PieChartColors =
	| 'teal'
	| 'blue_gray'
	| 'lavender'
	| 'pink'
	| 'gold'
	| 'sky_blue'
	| 'light_coral'
	| 'slate_blue'
	| 'mint_teal';
type LegendVariant = 'default' | 'compact' | 'cards';

const COLORS: Record<PieChartColors, { gradient: { offset: string; hex: string }[]; hex: string }> = {
	teal: {
		hex: '#6fcfa0',
		gradient: [
			{ offset: '0%', hex: '#86d9c0' },
			{ offset: '100%', hex: '#6fcfa0' },
		],
	},
	blue_gray: {
		hex: '#94a3b8',
		gradient: [
			{ offset: '0%', hex: '#a8b3c3' },
			{ offset: '100%', hex: '#94a3b8' },
		],
	},
	lavender: {
		hex: '#a588f0',
		gradient: [
			{ offset: '0%', hex: '#b19bfb' },
			{ offset: '100%', hex: '#a588f0' },
		],
	},
	pink: {
		hex: '#e895b8',
		gradient: [
			{ offset: '0%', hex: '#f2a1c7' },
			{ offset: '100%', hex: '#e895b8' },
		],
	},
	gold: {
		hex: '#f5be6b',
		gradient: [
			{ offset: '0%', hex: '#f7c77a' },
			{ offset: '100%', hex: '#f5be6b' },
		],
	},
	sky_blue: {
		hex: '#6bb5ed',
		gradient: [
			{ offset: '0%', hex: '#7bc3f0' },
			{ offset: '100%', hex: '#6bb5ed' },
		],
	},
	light_coral: {
		hex: '#e89999',
		gradient: [
			{ offset: '0%', hex: '#f4a5a5' },
			{ offset: '100%', hex: '#e89999' },
		],
	},
	slate_blue: {
		hex: '#9facbe',
		gradient: [
			{ offset: '0%', hex: '#b0bed2' },
			{ offset: '100%', hex: '#9facbe' },
		],
	},
	mint_teal: {
		hex: '#7bd4b1',
		gradient: [
			{ offset: '0%', hex: '#8ddebf' },
			{ offset: '100%', hex: '#7bd4b1' },
		],
	},
};

// Utility function to get color based on index, cycling through available colors
const getColorByIndex = (index: number): PieChartColors => {
	const colorKeys = Object.keys(COLORS) as PieChartColors[];

	return colorKeys[index % colorKeys.length];
};

type PieDonutChartData = {
	//MORTGAGE_TYPE_COLORS pl use index for mapping colors
	name: string;
	legendName?: string;
	value: number; //should be renamed to percentage to avoid confusion, pl update
	valueLabel?: string; //make default 'Percentage'
	count: number;
	countLabel?: string; //make default 'Count'
	tooltipAdditionalInfo?: { label: string; value: string }[];
	legendAdditionalInfo?: { label: string; value: string }[];
	color?: PieChartColors;
};

interface LegendProps {
	data: PieDonutChartData[];
}

interface LegendComponent extends React.FC<LegendProps> {
	variant: LegendVariant;
}

// Default Legend Component
const DefaultLegend: LegendComponent = ({ data }) => {
	return (
		<div className="flex flex-col min-w-[140px] space-y-2">
			{data.map((entry, index) => {
				const color = COLORS[entry.color || getColorByIndex(index)];
				const colorStart = color.gradient[0].hex;
				const colorEnd = color.gradient[color.gradient.length - 1].hex;

				return (
					<div key={index} className="flex items-center space-x-2">
						<div
							className="w-4 h-4 rounded shadow-sm flex-shrink-0"
							style={{
								background: `linear-gradient(135deg, ${colorStart}, ${colorEnd})`,
							}}
						></div>
						<div className="flex flex-col">
							<span className="text-xs font-semibold text-slate-800">{entry.legendName || entry.name}</span>
							{entry.legendAdditionalInfo && entry.legendAdditionalInfo.length > 0 && (
								<div className="flex flex-col text-xs text-slate-600">
									{entry.legendAdditionalInfo.map((info) => (
										<span key={info.label}>{info.value}</span>
									))}
								</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

DefaultLegend.variant = 'default';

// Compact Legend Component
const CompactLegend: LegendComponent = ({ data }) => {
	return (
		<div className="flex flex-col min-w-[140px] space-y-1">
			{data.map((entry, index) => {
				const color = COLORS[entry.color || getColorByIndex(index)];
				const colorStart = color.gradient[0].hex;
				const colorEnd = color.gradient[color.gradient.length - 1].hex;

				return (
					<div key={index} className="flex items-center space-x-2">
						<div
							className="w-2.5 h-2.5 rounded-full shadow-sm flex-shrink-0"
							style={{
								background: `linear-gradient(135deg, ${colorStart}, ${colorEnd})`,
							}}
						></div>
						<div className="flex gap-1">
							<span
								className="text-xs font-semibold text-slate-800 truncate max-w-48"
								title={entry.legendName || entry.name}
							>
								{entry.legendName || entry.name}
							</span>
							{entry.legendAdditionalInfo && entry.legendAdditionalInfo.length > 0 && (
								<div className="flex text-[10px] gap-1 text-xs text-slate-600">
									{entry.legendAdditionalInfo.map((info) => {
										return <span key={info.label}>{info.value}</span>;
									})}
								</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

CompactLegend.variant = 'compact';

const CardsLegend: LegendComponent = ({ data }) => {
	return (
		<div className="flex flex-col justify-center space-y-4">
			{data.map((entry, index) => {
				const color = COLORS[entry.color || getColorByIndex(index)];
				const colorStart = color.gradient[0].hex;
				const colorEnd = color.gradient[color.gradient.length - 1].hex;

				return (
					<div
						key={entry.name}
						className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-slate-200/50"
					>
						<div
							className="w-4 h-4 rounded-full shadow-sm"
							style={{ background: `linear-gradient(135deg, ${colorStart}, ${colorEnd})` }}
						></div>
						<div className="text-sm">
							<div className="font-semibold text-slate-800">{entry.legendName || entry.name}</div>
							<div className="text-xs text-slate-600">
								{entry.count} ({entry.value}%)
							</div>
							<div className="text-xs text-slate-500">
								{entry.legendAdditionalInfo?.map((info) => info.value).join(', ')}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

CardsLegend.variant = 'cards';

// Legend Factory
// To add new legend variants:
// 1. Add the variant to LegendVariant type
// 2. Create a new legend component implementing LegendComponent interface
// 3. Add it to the legendComponents record below
const legendComponents: Record<LegendVariant, LegendComponent> = {
	default: DefaultLegend,
	compact: CompactLegend,
	cards: CardsLegend,
};

const getLegendComponent = (variant: LegendVariant): LegendComponent => {
	return legendComponents[variant] || legendComponents.default;
};

export interface PieChartProps {
	variant?: 'donut' | 'pie';
	data: PieDonutChartData[];
	hideLegend?: boolean;
	innerRadius?: number;
	legendVariant?: LegendVariant;
	noDataMessage?: string;
}

export const PieChart = ({
	variant,
	data: dataProps,
	hideLegend,
	innerRadius,
	legendVariant = 'default',
	noDataMessage = 'No data available for the selected period. Please select a different date range.',
}: PieChartProps) => {
	const isNoData = !dataProps || dataProps.length === 0 || dataProps.every((item) => item.value === 0);
	const emptyData: PieDonutChartData[] = [
		{
			name: noDataMessage,
			value: 1,
			count: 0,
			color: 'blue_gray',
		},
	];
	const data = isNoData ? emptyData : dataProps.sort((a, b) => b.value - a.value);

	return (
		<div className="flex flex-col lg:flex-row lg:items-center lg:justify-start gap-4">
			<div className="flex-1 lg:max-w-[50%]">
				<ResponsiveContainer width="100%" height={200}>
					<PieChartRecharts>
						<defs>
							{Object.keys(COLORS).map((color) => (
								<linearGradient key={color} id={color} x1="0" y1="0" x2="1" y2="1">
									{COLORS[color as PieChartColors].gradient.map((stop, index) => (
										<stop key={index} offset={stop.offset} stopColor={stop.hex} />
									))}
								</linearGradient>
							))}
						</defs>
						<Pie
							data={data}
							cx="50%"
							cy="50%"
							outerRadius={91}
							innerRadius={variant === 'donut' ? innerRadius || 35 : 0}
							paddingAngle={3}
							dataKey="value"
							className="drop-shadow-sm"
						>
							{data?.map((entry, index) => {
								const color = entry.color || getColorByIndex(index);

								return (
									<Cell
										key={`cell-${index}`}
										fill={`url(#${color})`}
										className="hover:opacity-80 transition-opacity duration-300"
									/>
								);
							})}
						</Pie>
						{!isNoData && (
							<Tooltip
								content={({ active, payload }) => {
									if (active && payload && payload.length) {
										const dataItem: PieDonutChartData = payload[0].payload;
										const index = dataProps.findIndex((item) => item.name === dataItem.name);

										if (!dataItem) return null;

										return (
											<div className="bg-white/95 backdrop-blur-sm border border-slate-200/60 rounded-xl shadow-2xl p-3 min-w-[220px]">
												<div className="flex items-center gap-2 mb-2">
													<div
														className="w-3 h-3 rounded-full shadow-sm"
														style={{
															background: COLORS[dataItem.color || getColorByIndex(index)]?.hex,
														}}
													></div>
													<p className="font-semibold text-slate-800 text-sm">{dataItem.name}</p>
												</div>
												<div className="space-y-1">
													{dataItem.tooltipAdditionalInfo?.map((info, idx) => (
														<div key={idx} className="flex items-center justify-between">
															<span className="text-slate-600 font-medium text-sm text-wrap max-w-24">
																{info.label}:
															</span>
															<span className="font-bold text-slate-900 text-sm text-wrap">{info.value}</span>
														</div>
													))}
												</div>
											</div>
										);
									}

									return null;
								}}
							/>
						)}
					</PieChartRecharts>
				</ResponsiveContainer>
				{isNoData && <div className="text-caption1 text-center text-slate-500">{noDataMessage}</div>}
			</div>
			{/* Custom Legend - responsive positioning */}
			{!hideLegend &&
				(() => {
					const LegendComponent = getLegendComponent(legendVariant);

					return (
						<div className="lg:ml-2">
							<LegendComponent data={dataProps} />
						</div>
					);
				})()}
		</div>
	);
};
