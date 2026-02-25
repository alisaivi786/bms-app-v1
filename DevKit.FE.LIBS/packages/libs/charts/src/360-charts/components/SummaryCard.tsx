import React from 'react';
import { buildGradientInfo, createGradientStyle } from './gradientUtils';

export interface SummaryCardProps {
	name: string;
	icon: string;
	gradient: string;
	value: number;
	unit: string;
	label: string;
	className?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
	name,
	icon,
	gradient,
	value,
	unit,
	label,
	className = '',
}) => {
	const gradientInfo = buildGradientInfo(gradient);
	const gradientStyle = createGradientStyle(gradientInfo, '90deg');

	const formatValue = (value: number, unit: string): string => {
		if (unit === 'AED') {
			return `${unit} ${(value / 1000000).toFixed(1)}M`;
		}

		if (value >= 1000000) {
			return `${(value / 1000000).toFixed(1)}M`;
		}

		return `${(value / 1000).toFixed(0)}K`;
	};

	return (
		<div
			className={`bg-gradient-to-r ${gradient} p-1.5 rounded-xl text-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center ${className}`}
			style={gradientStyle}
		>
			<div className="flex items-center justify-between mb-0.5">
				<div className="font-semibold text-sm opacity-90">{name}</div>
				<div className="text-xl opacity-80">{icon}</div>
			</div>
			<div className="text-2xl font-bold leading-tight">{formatValue(value, unit)}</div>
			<div className="text-xs opacity-75 mb-0.5">{label}</div>
		</div>
	);
};
