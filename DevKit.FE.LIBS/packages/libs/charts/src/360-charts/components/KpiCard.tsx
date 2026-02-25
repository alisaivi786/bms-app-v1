import { TrendingDown, TrendingUp } from 'lucide-react';
import { FC, SVGProps } from 'react';
import { ChartIcon } from '@devkit/icons/web';
import { Card, CardContent } from './ChartDisplayCard/ui/card';

// Dedicated KPI card theme tokens (not shared with ChartDisplayCard)
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

export interface KpiCardProps {
	theme?: Theme;
	gradient?: string; // Tailwind gradient classes e.g. "from-emerald-500 to-teal-600"
	icon?: FC<SVGProps<SVGSVGElement>>;
	label: string;
	subLabel: string;
	value: string | number;
	change: number; // e.g. 2.3
	trend?: 'up' | 'down';
	className?: string;
	units?: string;
	unitsPosition?: 'prefix' | 'suffix';
	variant?: 'default' | 'compact';
}

const variantStyles = {
	default: {
		contentPadding: 'p-4 md:p-3 lg:p-4',
		containerLayout: 'grid grid-cols-3 items-center gap-4 md:gap-2 lg:gap-4',
		iconContainerSpacing: 'space-x-3 md:space-x-2',
		iconContainer: 'p-3 md:p-2.5 lg:p-3 rounded-lg',
		iconSize: 'w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5',
		labelsContainer: 'space-y-1',
		labelText: 'text-sm md:text-xs lg:text-sm',
		subLabelText: 'text-xs md:text-[11px] lg:text-xs',
		valueContainer: 'flex justify-center items-end',
		valueText: 'text-md md:text-xl lg:text-3xl',
		unitsText: 'text-md md:text-md lg:text-xl text-base',
		trendContainer: 'flex justify-end',
		trendBadge: 'space-x-2 px-3 py-2 md:px-2.5 md:py-1.5',
		trendIcon: 'w-4 h-4',
		trendText: 'text-sm md:text-xs lg:text-sm',
		bottomAccent: 'h-1 group-hover:h-1.5',
	},
	compact: {
		contentPadding: 'p-2 md:p-2 lg:p-2.5',
		containerLayout: 'flex items-center justify-between gap-2',
		iconContainerSpacing: 'space-x-1.5 md:space-x-1',
		iconContainer: 'w-6 h-6 md:w-6 md:h-6 lg:w-7 lg:h-7 flex-shrink-0',
		iconSize: 'w-3.5 h-3.5 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4',
		labelsContainer: 'space-y-0',
		labelText: 'text-xs md:text-[11px] lg:text-xs truncate',
		subLabelText: 'text-[9px] md:text-[8px] lg:text-[9px] truncate',
		valueContainer: 'flex items-center justify-center',
		valueText: 'text-lg md:text-xl lg:text-2xl',
		unitsText: 'text-sm md:text-base lg:text-lg',
		trendContainer: 'flex-shrink-0',
		trendBadge: 'space-x-0.5 px-1.5 py-0.5',
		trendIcon: 'w-2.5 h-2.5',
		trendText: 'text-[10px] md:text-[9px] lg:text-[10px]',
		bottomAccent: 'h-0.5 group-hover:h-0.5',
	},
} as const;

export const KpiCard = ({
	theme = 'blue-card',
	gradient,
	icon,
	label,
	subLabel,
	value,
	change,
	trend = 'down',
	className = '',
	units,
	unitsPosition = 'prefix',
	variant = 'default',
}: KpiCardProps): JSX.Element => {
	const { headerGradient, iconGradient } = (() => {
		const base = generateThemeClasses(theme);

		if (gradient) {
			return { headerGradient: gradient, iconGradient: gradient };
		}

		return base;
	})();
	const IconComp = icon ?? ChartIcon;
	const TrendIcon = trend === 'down' ? TrendingDown : TrendingUp;
	const styles = variantStyles[variant];

	const UnitsComponent = ({ units }: { units: string }) => {
		if (!units) return null;

		return (
			<span className={`mr-1 font-bold text-slate-900 tracking-tight group-hover:text-slate-800 transition-colors duration-300 whitespace-nowrap ${styles.unitsText}`}>
				{units}
			</span>
		);
	};

	return (
		<Card
			className={`group relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${className}`}
		>
			<div
				className={`absolute inset-0 bg-gradient-to-br ${headerGradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
			/>
			<CardContent className={`relative z-10 ${styles.contentPadding}`}>
				<div className={styles.containerLayout}>
					{/* Left - Icon and Labels */}
					<div className={`flex items-center flex-shrink-0 ${styles.iconContainerSpacing}`}>
						<div
							className={`relative rounded-md bg-gradient-to-br ${iconGradient} shadow-md group-hover:shadow-lg transition-all duration-300 flex items-center justify-center ${styles.iconContainer}`}
						>
							<IconComp className={`text-white ${styles.iconSize}`} />
						</div>
						<div className={`min-w-0 ${styles.labelsContainer}`}>
							<p className={`font-bold text-slate-700 group-hover:text-slate-600 transition-colors duration-300 whitespace-nowrap ${styles.labelText}`}>
								{label}
							</p>
							<p className={`text-slate-500 font-semibold whitespace-nowrap ${styles.subLabelText}`}>
								{subLabel}
							</p>
						</div>
					</div>

					{/* Center - Main Value */}
					<div className={`min-w-0 flex-grow ${styles.valueContainer}`}>
						{units && unitsPosition === 'prefix' && <UnitsComponent units={units} />}
						<p className={`font-bold text-slate-900 tracking-tight group-hover:text-slate-800 transition-colors duration-300 whitespace-nowrap ${styles.valueText}`}>
							{value}
						</p>
						{units && unitsPosition === 'suffix' && <UnitsComponent units={units} />}
					</div>

					{/* Right - Trend Badge */}
					<div className={styles.trendContainer}>
						<div
							className={`flex items-center rounded-md font-bold shadow-sm transition-all duration-300 ${
								trend === 'down'
									? 'text-red-700 bg-gradient-to-r from-red-50 to-red-100 border border-red-200'
									: 'text-emerald-700 bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200'
							} ${styles.trendBadge}`}
						>
							<TrendIcon className={styles.trendIcon} />
							<span className={`font-bold ${styles.trendText}`}>
								{change > 0 ? '+' : ''}
								{change || 0}%
							</span>
						</div>
					</div>
				</div>

				{/* Bottom Accent */}
				<div
					className={`absolute bottom-0 left-0 right-0 bg-gradient-to-r ${iconGradient} transition-all duration-300 ${styles.bottomAccent}`}
				/>
			</CardContent>
		</Card>
	);
};
