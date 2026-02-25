import { ResponsiveContainer } from 'recharts';

export interface HorizontalSingleBarChartProps {
	data: {
		label: string;
		value: number;
	}[];
	/**
	 * If provided, shows the top N items after sorting by value desc.
	 * If omitted, shows all items sorted by value desc.
	 */
	limit?: number;
	noDataMessage?: string;
	preserveOrder?: boolean;
}

export const HorizontalSingleBarChart = ({
	data,
	limit,
	noDataMessage = 'No data available for the selected period. Please select a different date range.',
	preserveOrder = false,
}: HorizontalSingleBarChartProps) => {
	// Layout constants
	const totalWidth = 280;
	const barHeight = 26;
	const spacing = 32; // vertical step per item
	const startX = 180;
	const startY = 20;
	const bottomPadding = 20;

	// Prepare data: sort by value desc unless preserveOrder is true; optionally limit to top N
	const items = Array.isArray(data) ? data : [];
	const base = preserveOrder ? items : [...items].sort((a, b) => b.value - a.value);
	const chartData = typeof limit === 'number' ? base.slice(0, limit) : base;

	// Compute dynamic height to fit all rows
	const rows = chartData.length;
	const svgHeight = rows > 0 ? startY + (rows - 1) * spacing + barHeight + bottomPadding : 80;

	if (data.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-72">
				<p className="text-sm text-slate-500">{noDataMessage}</p>
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center pt-7">
			<div className="flex-1">
				<ResponsiveContainer width="100%" height={svgHeight}>
					<svg width="100%" height="100%" viewBox={`0 0 500 ${svgHeight}`}>
						<defs>
							<linearGradient id="mortgageGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" style={{ stopColor: '#137393', stopOpacity: 0.9 }} />
								<stop offset="100%" style={{ stopColor: '#0f5f7a', stopOpacity: 1 }} />
							</linearGradient>
							<linearGradient id="mortgageGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" style={{ stopColor: '#1a8bb3', stopOpacity: 0.8 }} />
								<stop offset="100%" style={{ stopColor: '#137393', stopOpacity: 0.9 }} />
							</linearGradient>
							<linearGradient id="mortgageGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" style={{ stopColor: '#4ba3c7', stopOpacity: 0.7 }} />
								<stop offset="100%" style={{ stopColor: '#1a8bb3', stopOpacity: 0.8 }} />
							</linearGradient>
							<linearGradient id="mortgageGradient4" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" style={{ stopColor: '#7bbbd7', stopOpacity: 0.6 }} />
								<stop offset="100%" style={{ stopColor: '#4ba3c7', stopOpacity: 0.7 }} />
							</linearGradient>
							<linearGradient id="mortgageGradient5" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" style={{ stopColor: '#abd3e7', stopOpacity: 0.5 }} />
								<stop offset="100%" style={{ stopColor: '#7bbbd7', stopOpacity: 0.6 }} />
							</linearGradient>
							<filter id="mortgageDropShadow" x="-20%" y="-20%" width="140%" height="140%">
								<feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
							</filter>
						</defs>

						{(() => {
							const gradients = [
								'mortgageGradient1',
								'mortgageGradient2',
								'mortgageGradient3',
								'mortgageGradient4',
								'mortgageGradient5',
							];

							const maxValue = chartData.length > 0 ? Math.max(...chartData.map((d) => d.value)) : 0;

							return (
								<>
									{chartData.map((entry, index) => {
										const calculatedWidth = maxValue > 0 ? (entry.value / maxValue) * totalWidth : 0;
										// Set minimum width to ensure visibility for small values
										const minWidth = 5; // Minimum 5px width for visibility
										const barWidth = Math.max(calculatedWidth, minWidth);
										const yPos = startY + index * spacing;

										return (
											<g key={entry.label || index}>
												{/* Background bar */}
												<rect
													x={startX}
													y={yPos}
													width={totalWidth}
													height={barHeight}
													fill="#f1f5f9"
													rx="13"
													ry="13"
												/>
												{/* Value bar */}
												<rect
													x={startX}
													y={yPos}
													width={barWidth}
													height={barHeight}
													fill={`url(#${gradients[index % gradients.length]})`}
													rx="13"
													ry="13"
													filter="url(#mortgageDropShadow)"
													className="transition-all duration-700 ease-out"
												/>
												{/* UAE Bank name label on left */}
												<text
													x={startX - 16}
													y={yPos + barHeight / 2}
													textAnchor="end"
													className="text-sm font-bold fill-slate-800"
													dominantBaseline="middle"
												>
													{entry.label}
												</text>
												{/* Transaction count */}
												<text
													x={startX + barWidth + 16}
													y={yPos + barHeight / 2}
													className="text-xs font-bold fill-slate-900"
													dominantBaseline="middle"
												>
													{entry.value.toLocaleString()}
												</text>
											</g>
										);
									})}
								</>
							);
						})()}
					</svg>
				</ResponsiveContainer>
			</div>
		</div>
	);
};
