import React, { useMemo } from 'react';
import { ResponsiveContainer } from 'recharts';

export interface MeterChartProps {
	totalCount?: number;
	totalLabel?: string;
	legendTitle?: string;
	name: string;
	showPercentage?: boolean;
	data: MeterChartData;
}

export type MeterChartDatum = { label: string; value: number };

export type MeterChartData = readonly [MeterChartDatum] | readonly [MeterChartDatum, MeterChartDatum];

export const MeterChart: React.FC<MeterChartProps> = ({
	name,
	data,
	totalCount,
	totalLabel,
	legendTitle,
	showPercentage = false,
}) => {
	// Static IDs for SVG defs

	// Normalize and scale incoming data
	const {
		completedLabel,
		remainingLabel,
		completedValue,
		remainingValue,
		total,
		completedPercentage,
		remainingPercentage,
	} = useMemo(() => {
		const first = data[0];
		const second = data[1];

		const firstLabel = first?.label ?? 'Item A';
		const secondLabel = second?.label ?? 'Item B';
		const firstValue = typeof first?.value === 'number' ? first.value : 0;
		const secondValue = typeof second?.value === 'number' ? second.value : 0;

		const totalValue = firstValue + secondValue;
		const denom = totalValue > 0 ? totalValue : 1; // prevent divide-by-zero

		return {
			completedLabel: firstLabel,
			remainingLabel: secondLabel,
			completedValue: firstValue,
			remainingValue: secondValue,
			total: totalValue,
			completedPercentage: Math.round((firstValue / denom) * 100),
			remainingPercentage: Math.round((secondValue / denom) * 100),
		};
	}, [data]);

	// Gauge chart calculations - responsive sizing
	const gaugeWidth = 280;
	const gaugeHeight = 200;
	const centerX = gaugeWidth / 2;
	const centerY = gaugeHeight - 60;
	const radius = 85;
	const startAngle = -180; // Start from left
	const endAngle = 0; // End at right
	const totalAngle = endAngle - startAngle;
	const needleAngle = startAngle + (completedPercentage / 100) * totalAngle;

	// Convert degrees to radians
	const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

	// Create gauge arc path
	const createArcPath = (startA: number, endA: number, r: number) => {
		const start = toRadians(startA);
		const end = toRadians(endA);
		const largeArcFlag = endA - startA <= 180 ? '0' : '1';

		const x1 = centerX + r * Math.cos(start);
		const y1 = centerY + r * Math.sin(start);
		const x2 = centerX + r * Math.cos(end);
		const y2 = centerY + r * Math.sin(end);

		return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
	};

	// Create needle path - adjust angle slightly at boundaries to ensure visibility
	const adjustedAngle =
		completedPercentage === 0 ? needleAngle + 0.01 : completedPercentage === 100 ? needleAngle - 0.01 : needleAngle;
	const needleRad = toRadians(adjustedAngle);
	const needleX = centerX + (radius - 15) * Math.cos(needleRad);
	const needleY = centerY + (radius - 15) * Math.sin(needleRad);

	const summaryTotalCount = typeof totalCount === 'number' ? totalCount : total;

	return (
		<div className="w-full">
			<div className="flex items-center justify-center">
				<div className="flex flex-col md:flex-row items-center justify-center w-full p-3 sm:p-4 bg-gradient-to-r from-slate-50/80 to-gray-50/60 rounded-xl border border-slate-200/50 hover:shadow-md transition-all duration-300 gap-4 md:gap-6">
					{/* Left: Gauge Chart */}
					<div className="flex items-center justify-center w-full md:w-auto md:flex-shrink-0">
						<div className="relative w-full max-w-[280px] mx-auto">
							<ResponsiveContainer width="100%" height={gaugeHeight} aspect={gaugeWidth / gaugeHeight}>
								<svg
									width="100%"
									height="100%"
									viewBox={`0 0 ${gaugeWidth} ${gaugeHeight}`}
									preserveAspectRatio="xMidYMid meet"
									className="drop-shadow-lg"
								>
									<defs>
										{/* Gradient for completed (green) */}
										<linearGradient id="forwardedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
											<stop offset="0%" stopColor="#22c55e" />
											<stop offset="100%" stopColor="#16a34a" />
										</linearGradient>

										{/* Drop shadow filter */}
										<filter id="gaugeShadow" x="-20%" y="-20%" width="140%" height="140%">
											<feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.3" />
										</filter>
									</defs>

									{/* Background gauge arc */}
									<path
										d={createArcPath(startAngle, endAngle, radius)}
										stroke="#fee2e2"
										strokeWidth="12"
										fill="none"
										strokeLinecap="round"
									/>

									{/* Active gauge arc (forwarded percentage) */}
									<path
										d={createArcPath(startAngle, needleAngle, radius)}
										stroke="url(#forwardedGradient)"
										strokeWidth="12"
										fill="none"
										strokeLinecap="round"
										filter="url(#gaugeShadow)"
										className="transition-all duration-[1500ms] ease-out"
									/>

									{/* Gauge tick marks and labels */}
									{[0, 25, 50, 75, 100].map((value) => {
										const angle = startAngle + (value / 100) * totalAngle;
										const tickRad = toRadians(angle);
										const tickStart = radius - 8;
										const tickEnd = radius + 3;
										const labelRadius = radius + 18;

										const tickX1 = centerX + tickStart * Math.cos(tickRad);
										const tickY1 = centerY + tickStart * Math.sin(tickRad);
										const tickX2 = centerX + tickEnd * Math.cos(tickRad);
										const tickY2 = centerY + tickEnd * Math.sin(tickRad);

										const labelX = centerX + labelRadius * Math.cos(tickRad);
										const labelY = centerY + labelRadius * Math.sin(tickRad);

										return (
											<g key={value}>
												{/* Tick mark */}
												<line
													x1={tickX1}
													y1={tickY1}
													x2={tickX2}
													y2={tickY2}
													stroke="#64748b"
													strokeWidth={value % 50 === 0 ? '2' : '1.5'}
												/>
												{/* Label */}
												{value % 25 === 0 && (
													<text
														x={labelX}
														y={labelY}
														textAnchor="middle"
														dominantBaseline="middle"
														className="text-xs font-semibold fill-slate-700"
													>
														{value}%
													</text>
												)}
											</g>
										);
									})}

									{/* Gauge needle */}
									<g className="transition-all duration-1000 ease-out">
										{/* Needle line */}
										<line
											x1={centerX}
											y1={centerY}
											x2={needleX}
											y2={needleY}
											stroke="#1e293b"
											strokeWidth="3"
											strokeLinecap="round"
										/>
										{/* Center dot */}
										<circle cx={centerX} cy={centerY} r="6" fill="#1e293b" filter="url(#gaugeShadow)" />
										{/* Needle tip */}
										<circle cx={needleX} cy={needleY} r="3" fill="#22c55e" />
									</g>

									{/* Center value display */}
									<text
										x={centerX}
										y={centerY + 25}
										textAnchor="middle"
										fontSize="18"
										className="font-bold fill-slate-900"
									>
										{completedPercentage}%
									</text>
									<text x={centerX} y={centerY + 40} textAnchor="middle" fontSize="11" className="fill-slate-600">
										{name}
									</text>
								</svg>
							</ResponsiveContainer>
						</div>
					</div>

					{/* Right: Total (Top) + Breakdown (Bottom) */}
					<div className="flex flex-col space-y-3 sm:space-y-4 w-full md:w-auto md:min-w-[200px] lg:min-w-[240px]">
						{/* Total Summary */}
						<div className="text-center p-2 sm:p-3 bg-white/60 rounded-lg border border-slate-200/50">
							<div className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
								{(summaryTotalCount || 0).toLocaleString()}
							</div>
							<div className="text-xs sm:text-sm text-slate-600 font-medium">{totalLabel}</div>
						</div>

						{/* Breakdown */}
						<div className="space-y-2 sm:space-y-3 p-2 sm:p-3 bg-white/40 rounded-lg border border-slate-200/30 overflow-hidden">
							<div className="text-xs sm:text-sm font-bold text-slate-800 text-center mb-2 sm:mb-3">{legendTitle}</div>

							<div className="space-y-2">
								<div className="flex items-center justify-between gap-2">
									<div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1" title={completedLabel}>
										<div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-sm flex-shrink-0"></div>
										<span className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-700 truncate">
											{completedLabel}
										</span>
									</div>
									<div
										className="text-[10px] sm:text-xs md:text-sm font-bold text-right flex-shrink-0"
										title={completedLabel}
										aria-label={completedLabel}
									>
										{completedValue.toLocaleString()}
										{showPercentage ? ` (${completedPercentage}%)` : ''}
									</div>
								</div>

								<div className="flex items-center justify-between gap-2">
									<div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
										<div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-red-300 to-red-400 shadow-sm flex-shrink-0"></div>
										<span
											className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-700 truncate"
											title={remainingLabel}
										>
											{remainingLabel}
										</span>
									</div>
									<div
										className="text-[10px] sm:text-xs md:text-sm font-bold text-right flex-shrink-0"
										title={remainingLabel}
										aria-label={remainingLabel}
									>
										{remainingValue.toLocaleString()}
										{showPercentage ? ` (${remainingPercentage}%)` : ''}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
