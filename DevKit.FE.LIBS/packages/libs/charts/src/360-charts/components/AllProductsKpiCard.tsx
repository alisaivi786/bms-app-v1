import { ChartLineIcon, type LucideIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { FC, SVGProps } from 'react';
import { Card, CardContent } from './ChartDisplayCard/ui/card';

// Keep the same props shape as KpiCard for easy swap
type Theme = 'green-card' | 'blue-card' | 'purple-card';

const generateThemeClasses = (theme: Theme) => {
	switch (theme) {
		case 'green-card':
			return {
				headerGradient: 'from-emerald-500 to-teal-600',
				iconGradient: 'from-emerald-500 to-teal-600',
			};
		case 'blue-card':
			return {
				headerGradient: 'from-blue-500 to-cyan-600',
				iconGradient: 'from-blue-500 to-cyan-600',
			};
		case 'purple-card':
			return {
				headerGradient: 'from-purple-500 to-indigo-600',
				iconGradient: 'from-purple-500 to-indigo-600',
			};
		default:
			return {
				headerGradient: 'from-blue-500 to-cyan-600',
				iconGradient: 'from-blue-500 to-cyan-600',
			};
	}
};

export interface AllProductsKpiCardProps {
	theme?: Theme;
	gradient?: string; // Tailwind gradient classes e.g. "from-emerald-500 to-teal-600"
	icon?: LucideIcon | FC<SVGProps<SVGSVGElement>>;
	label: string;
	subLabel: string;
	value: string | number;
	change: string; // e.g. "+2.3%"
	trend?: 'up' | 'down';
	blink?: boolean;
	className?: string;
}

export const AllProductsKpiCard: FC<AllProductsKpiCardProps> = ({
	theme = 'blue-card',
	gradient,
	icon,
	label,
	subLabel,
	value,
	change,
	trend = 'down',
	blink = false,
	className = '',
}) => {
	const { headerGradient, iconGradient } = (() => {
		const base = generateThemeClasses(theme);

		if (gradient) {
			return { headerGradient: gradient, iconGradient: gradient };
		}

		return base;
	})();

	const IconComp = icon ?? ChartLineIcon;
	const TrendIcon = trend === 'up' ? TrendingUpIcon : TrendingDownIcon;

	return (
		<Card
			className={`group/card relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${className}`}
		>
			{/* Animated background gradient */}
			<div
				className={`absolute inset-0 bg-gradient-to-br ${headerGradient} opacity-0 group-hover/card:opacity-10 transition-opacity duration-500`}
			/>

			{/* Subtle border glow */}
			<div
				className={`absolute inset-0 rounded-lg bg-gradient-to-br ${headerGradient} opacity-0 group-hover/card:opacity-20 blur-xl transition-opacity duration-500`}
			/>

			<CardContent className="px-4 pt-4 pb-4 relative z-10">
				<div className="grid grid-cols-3 items-center gap-4">
					{/* Left side - Icon and Details */}
					<div className="flex items-center space-x-3">
						<div
							className={`relative p-3 rounded-xl bg-gradient-to-br ${iconGradient} shadow-lg group-hover/card:shadow-xl transition-all duration-300 group-hover/card:scale-110`}
						>
							<IconComp className="w-5 h-5 text-white" />
							<div
								className={`absolute inset-0 rounded-xl bg-gradient-to-br ${iconGradient} opacity-0 group-hover/card:opacity-30 blur-lg transition-opacity duration-300`}
							/>
						</div>

						<div className="space-y-1 min-w-fit">
							<p className="text-lg font-bold text-slate-700 group-hover/card:text-slate-600 transition-colors duration-300">
								{label}
							</p>
							<p className="text-sm text-slate-500 font-semibold uppercase tracking-wider whitespace-nowrap">
								{subLabel}
							</p>
						</div>
					</div>

					{/* Center - Main Value */}
					<div className="flex justify-center">
						<p
							className={`text-4xl font-bold text-slate-900 tracking-tight group-hover/card:text-slate-800 transition-colors duration-300 whitespace-nowrap ${
								blink ? 'animate-pulse' : ''
							}`}
						>
							{value}
						</p>
					</div>

					{/* Right side - Percentage */}
					<div className="flex justify-end">
						<div
							className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-bold shadow-md transition-all duration-300 ${
								trend === 'up'
									? 'text-emerald-700 bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 group-hover/card:shadow-emerald-200/50'
									: 'text-red-700 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 group-hover/card:shadow-red-200/50'
							}`}
						>
							<TrendIcon className="w-4 h-4" />
							<span className="text-sm font-bold">{change}</span>
						</div>
					</div>
				</div>

				{/* Enhanced accent elements */}
				<div
					className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${iconGradient} group-hover/card:h-2 transition-all duration-300`}
				/>
				<div
					className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${iconGradient} opacity-0 group-hover/card:opacity-50 transition-all duration-300`}
				/>

				{/* Subtle pattern overlay */}
				<div
					className="absolute inset-0 opacity-0 group-hover/card:opacity-10 transition-opacity duration-500"
					style={{
						backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)',
						backgroundSize: '20px 20px',
					}}
				/>
			</CardContent>
		</Card>
	);
};
