import { ChartLineIcon, EyeIcon, type LucideIcon } from 'lucide-react';
import { FC, SVGProps } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export type ChartDisplayCardTheme =
	// Product themes (Rhoon & Wtheeq)
	| 'rhoon' // Sky blue - for Rhoon product
	| 'wtheeq' // Orange - for Wtheeq product
	| 'combined' // Dark blue - for combined metrics

	// Status themes
	| 'success' // Emerald green - for positive metrics
	| 'emerald' // Alias for success
	| 'emerald-solid' // Custom emerald theme for TransactionInsights
	| 'warning' // Amber - for warnings/attention
	| 'amber' // Amber theme
	| 'danger' // Red - for critical/errors

	// Mortgage/Category themes (matching PieChart colors)
	| 'teal' // Mint green - for mortgage types
	| 'lavender' // Purple - for mortgage types
	| 'pink' // Pink - for mortgage types
	| 'gold' // Peach/Gold - for mortgage types
	| 'sky-blue' // Light blue - for mortgage types
	| 'coral' // Light coral - for mortgage types

	// General UI themes
	| 'blue' // Standard blue
	| 'deep-blue' // Indigo blue
	| 'light-purple' // Purple/Indigo
	| 'purple' // Purple variant
	| 'indigo' // Indigo variant
	| 'slate' // Neutral/Gray
	| 'cyan' // Cyan variant
	| 'green'; // Green to emerald - for transaction types

interface ThemeClasses {
	headerGradientClass: string;
	iconGradientClass: string;
	badgeGradientClass: string;
	badgeTextClass: string;
	badgeBorderClass: string;
}

const generateClasses = (currentTheme: ChartDisplayCardTheme): ThemeClasses => {
	switch (currentTheme) {
		// ===== PRODUCT THEMES =====
		case 'rhoon':
			return {
				headerGradientClass: 'from-sky-50/50 to-cyan-50/30',
				iconGradientClass: 'from-sky-400 to-cyan-600',
				badgeGradientClass: 'from-sky-100 to-cyan-100',
				badgeTextClass: 'text-sky-700',
				badgeBorderClass: 'border-sky-200/50',
			};

		case 'wtheeq':
			return {
				headerGradientClass: 'from-orange-50/50 to-amber-50/30',
				iconGradientClass: 'from-orange-500 to-amber-600',
				badgeGradientClass: 'from-orange-100 to-amber-100',
				badgeTextClass: 'text-orange-700',
				badgeBorderClass: 'border-orange-200/50',
			};

		case 'combined':
			return {
				headerGradientClass: 'from-blue-50/50 to-blue-50/30',
				iconGradientClass: 'from-blue-600 to-blue-700',
				badgeGradientClass: 'from-blue-100 to-blue-200',
				badgeTextClass: 'text-blue-800',
				badgeBorderClass: 'border-blue-300/50',
			};

		// ===== STATUS THEMES =====
		case 'success':
		case 'emerald':
			return {
				headerGradientClass: 'from-emerald-50/50 to-blue-50/30',
				iconGradientClass: 'from-emerald-500 to-blue-600',
				badgeGradientClass: 'from-emerald-100 to-blue-100',
				badgeTextClass: 'text-emerald-700',
				badgeBorderClass: 'border-emerald-200/50',
			};

		case 'emerald-solid':
			return {
				headerGradientClass: 'from-green-50/50 to-emerald-50/30',
				iconGradientClass: 'from-green-500 to-emerald-600',
				badgeGradientClass: 'from-green-100 to-emerald-100',
				badgeTextClass: 'text-green-700',
				badgeBorderClass: 'border-green-200/50',
			};

		case 'warning':
			return {
				headerGradientClass: 'from-amber-50/50 to-yellow-50/30',
				iconGradientClass: 'from-amber-500 to-yellow-600',
				badgeGradientClass: 'from-amber-100 to-yellow-100',
				badgeTextClass: 'text-amber-700',
				badgeBorderClass: 'border-amber-200/50',
			};

		case 'danger':
			return {
				headerGradientClass: 'from-red-50/50 to-rose-50/30',
				iconGradientClass: 'from-red-500 to-rose-600',
				badgeGradientClass: 'from-red-100 to-rose-100',
				badgeTextClass: 'text-red-700',
				badgeBorderClass: 'border-red-200/50',
			};

		// ===== MORTGAGE/CATEGORY THEMES =====
		case 'teal':
			return {
				headerGradientClass: 'from-teal-50/50 to-cyan-50/30',
				iconGradientClass: 'from-teal-500 to-cyan-600',
				badgeGradientClass: 'from-teal-100 to-cyan-100',
				badgeTextClass: 'text-teal-700',
				badgeBorderClass: 'border-teal-200/50',
			};

		case 'lavender':
			return {
				headerGradientClass: 'from-purple-50/50 to-pink-50/30',
				iconGradientClass: 'from-purple-500 to-pink-600',
				badgeGradientClass: 'from-purple-100 to-pink-100',
				badgeTextClass: 'text-purple-700',
				badgeBorderClass: 'border-purple-200/50',
			};

		case 'pink':
			return {
				headerGradientClass: 'from-pink-50/50 to-rose-50/30',
				iconGradientClass: 'from-pink-500 to-rose-600',
				badgeGradientClass: 'from-pink-100 to-rose-100',
				badgeTextClass: 'text-pink-700',
				badgeBorderClass: 'border-pink-200/50',
			};

		case 'gold':
			return {
				headerGradientClass: 'from-yellow-50/50 to-amber-50/30',
				iconGradientClass: 'from-yellow-500 to-amber-600',
				badgeGradientClass: 'from-yellow-100 to-amber-100',
				badgeTextClass: 'text-yellow-700',
				badgeBorderClass: 'border-yellow-200/50',
			};

		case 'sky-blue':
			return {
				headerGradientClass: 'from-sky-50/50 to-blue-50/30',
				iconGradientClass: 'from-sky-500 to-blue-600',
				badgeGradientClass: 'from-sky-100 to-blue-100',
				badgeTextClass: 'text-sky-700',
				badgeBorderClass: 'border-sky-200/50',
			};

		case 'coral':
			return {
				headerGradientClass: 'from-red-50/50 to-orange-50/30',
				iconGradientClass: 'from-red-500 to-orange-600',
				badgeGradientClass: 'from-red-100 to-orange-100',
				badgeTextClass: 'text-red-700',
				badgeBorderClass: 'border-red-200/50',
			};

		// ===== GENERAL UI THEMES =====
		case 'blue':
			return {
				headerGradientClass: 'from-blue-50/50 to-indigo-50/30',
				iconGradientClass: 'from-blue-500 to-indigo-600',
				badgeGradientClass: 'from-blue-100 to-indigo-100',
				badgeTextClass: 'text-blue-700',
				badgeBorderClass: 'border-blue-200/50',
			};

		case 'deep-blue':
			return {
				headerGradientClass: 'from-blue-50/50 to-indigo-50/30',
				iconGradientClass: 'from-blue-600 to-indigo-700',
				badgeGradientClass: 'from-blue-100 to-indigo-100',
				badgeTextClass: 'text-blue-800',
				badgeBorderClass: 'border-blue-300/50',
			};

		case 'light-purple':
		case 'purple':
			return {
				headerGradientClass: 'from-purple-50/50 to-pink-50/30',
				iconGradientClass: 'from-purple-500 to-pink-600',
				badgeGradientClass: 'from-purple-100 to-pink-100',
				badgeTextClass: 'text-purple-700',
				badgeBorderClass: 'border-purple-200/50',
			};

		case 'indigo':
			return {
				headerGradientClass: 'from-indigo-50/50 to-purple-50/30',
				iconGradientClass: 'from-indigo-500 to-purple-600',
				badgeGradientClass: 'from-indigo-100 to-purple-100',
				badgeTextClass: 'text-indigo-700',
				badgeBorderClass: 'border-indigo-200/50',
			};

		case 'slate':
			return {
				headerGradientClass: 'from-slate-50/50 to-gray-50/30',
				iconGradientClass: 'from-slate-500 to-gray-600',
				badgeGradientClass: 'from-slate-100 to-gray-100',
				badgeTextClass: 'text-slate-700',
				badgeBorderClass: 'border-slate-200/50',
			};

		case 'cyan':
			return {
				headerGradientClass: 'from-cyan-50/50 to-teal-50/30',
				iconGradientClass: 'from-cyan-500 to-teal-600',
				badgeGradientClass: 'from-cyan-100 to-teal-100',
				badgeTextClass: 'text-cyan-700',
				badgeBorderClass: 'border-cyan-200/50',
			};

		case 'amber':
			return {
				headerGradientClass: 'from-amber-50/50 to-orange-50/30',
				iconGradientClass: 'from-amber-500 to-orange-600',
				badgeGradientClass: 'from-amber-100 to-orange-100',
				badgeTextClass: 'text-amber-700',
				badgeBorderClass: 'border-amber-200/50',
			};

		case 'green':
			return {
				headerGradientClass: 'from-green-50/50 to-emerald-50/30',
				iconGradientClass: 'from-green-500 to-emerald-600',
				badgeGradientClass: 'from-green-100 to-emerald-100',
				badgeTextClass: 'text-green-700',
				badgeBorderClass: 'border-green-200/50',
			};

		// ===== DEFAULT =====
		default:
			return {
				headerGradientClass: 'from-blue-50/50 to-indigo-50/30',
				iconGradientClass: 'from-blue-500 to-indigo-600',
				badgeGradientClass: 'from-blue-100 to-indigo-100',
				badgeTextClass: 'text-blue-700',
				badgeBorderClass: 'border-blue-200/50',
			};
	}
};

export interface ChartDisplayCardProps {
	children: React.ReactNode;
	title: string;
	subtitle: string;
	icon?: LucideIcon | FC<SVGProps<SVGSVGElement>>;
	badgeText: string;
	theme: ChartDisplayCardTheme;
	hasView?: boolean;
	onViewAll?: () => void;
}

export const ChartDisplayCard = ({
	children,
	title,
	subtitle,
	icon,
	badgeText,
	theme,
	hasView,
	onViewAll,
}: ChartDisplayCardProps) => {
	const { headerGradientClass, iconGradientClass, badgeGradientClass, badgeTextClass, badgeBorderClass } =
		generateClasses(theme);
	const IconComp = icon ?? ChartLineIcon;

	return (
		<Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden h-full">
			<div
				className={`absolute inset-0 bg-gradient-to-br ${headerGradientClass} opacity-0 hover:opacity-100 transition-opacity duration-300`}
			></div>

			<CardHeader className="pb-1.5 relative z-10">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<div className="relative">
							<div className={`relative bg-gradient-to-r ${iconGradientClass} p-1.5 rounded-lg`}>
								<IconComp className="w-4 h-4 text-white" />
							</div>
						</div>
						<div>
							<CardTitle className="text-base font-bold text-slate-800">{title}</CardTitle>
							<p className="text-xs text-slate-600 font-medium">{subtitle}</p>
						</div>
					</div>
					<div className="flex items-center space-x-2">
						<div
							className={`bg-gradient-to-r ${badgeGradientClass} px-2 py-1 rounded-md border ${badgeBorderClass} flex items-center justify-center`}
						>
							<span className={`text-xs font-medium ${badgeTextClass} uppercase tracking-wider pt-1`}>{badgeText}</span>
						</div>
						{hasView && (
							<button
								type="button"
								onClick={onViewAll}
								className="h-7 px-3 bg-white/80 border border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 shadow-sm hover:shadow-md rounded-md inline-flex items-center shrink-0 whitespace-nowrap"
							>
								<EyeIcon className="w-3 h-3 mr-1" />
								<span className="text-xs font-semibold whitespace-nowrap">View All</span>
							</button>
						)}
					</div>
				</div>
			</CardHeader>
			<CardContent className="pt-1 relative z-10">{children}</CardContent>
		</Card>
	);
};
