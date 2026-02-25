// Centralized chart color configuration for consistent theming across all dashboards
// Uses CSS custom properties defined in globals.css for chart colors

export const CHART_COLORS = {
	// CSS custom property colors (preferred)
	chart1: 'hsl(var(--chart-1))', // Orange family - for Wtheeq
	chart2: 'hsl(var(--chart-2))', // Cyan/Blue family - for Rhoon
	chart3: 'hsl(var(--chart-3))', // Dark blue - for combined/total
	chart4: 'hsl(var(--chart-4))', // Yellow/Green - for secondary metrics
	chart5: 'hsl(var(--chart-5))', // Orange variant - for additional metrics

	// Hex equivalents for gradients and complex styling (fallback)
	rhoon: {
		primary: '#0ea5e9', // Sky blue
		secondary: '#0284c7',
		gradient: 'from-sky-400 to-sky-600',
		light: '#7dd3fc',
		dark: '#0c4a6e',
	},
	wtheeq: {
		primary: '#f97316', // Orange
		secondary: '#ea580c',
		gradient: 'from-orange-400 to-orange-600',
		light: '#fed7aa',
		dark: '#9a3412',
	},
	combined: {
		primary: '#1e40af', // Blue
		secondary: '#1d4ed8',
		gradient: 'from-blue-600 to-blue-700',
		light: '#93c5fd',
		dark: '#1e3a8a',
	},
	success: {
		primary: '#10b981', // Emerald
		secondary: '#059669',
		gradient: 'from-emerald-500 to-emerald-600',
		light: '#6ee7b7',
		dark: '#047857',
	},
	warning: {
		primary: '#f59e0b', // Amber
		secondary: '#d97706',
		gradient: 'from-amber-500 to-amber-600',
		light: '#fde68a',
		dark: '#92400e',
	},
	danger: {
		primary: '#ef4444', // Red
		secondary: '#dc2626',
		gradient: 'from-red-500 to-red-600',
		light: '#fca5a5',
		dark: '#b91c1c',
	},
};

// Product-specific color mapping
export const PRODUCT_COLORS = {
	rhoon: CHART_COLORS.rhoon,
	wtheeq: CHART_COLORS.wtheeq,
	combined: CHART_COLORS.combined,
	total: CHART_COLORS.combined,
};

// Chart type specific colors
export const CHART_TYPE_COLORS = [
	CHART_COLORS.chart1, // Orange - Primary
	CHART_COLORS.chart2, // Blue - Secondary
	CHART_COLORS.chart3, // Dark Blue - Tertiary
	CHART_COLORS.chart4, // Yellow/Green - Quaternary
	CHART_COLORS.chart5, // Orange variant - Quinary
];

// Status colors for transaction types
export const STATUS_COLORS = {
	forwarded: CHART_COLORS.success,
	unregistered: CHART_COLORS.warning,
	registered: CHART_COLORS.rhoon,
	pending: CHART_COLORS.warning,
	completed: CHART_COLORS.success,
	cancelled: CHART_COLORS.danger,
};

// Mortgage type colors for Rhoon mortgage chart
export const MORTGAGE_TYPE_COLORS = {
	'New Mortgage': {
		primary: '#b19bfb', // Pale Purple
		gradient: 'linear-gradient(135deg, #b19bfb, #a588f0)',
		gradientId: 'newMortgageGradient',
	},
	'Release Mortgage': {
		primary: '#f2a1c7', // Pale Pink
		gradient: 'linear-gradient(135deg, #f2a1c7, #e895b8)',
		gradientId: 'releaseMortgageGradient',
	},
	'Transfer Mortgage Ownership': {
		primary: '#86d9c0', // Pale Mint Green
		gradient: 'linear-gradient(135deg, #86d9c0, #6fcfa0)',
		gradientId: 'transferOwnershipGradient',
	},
	'Transfer Ownership': {
		primary: '#86d9c0', // Pale Mint Green
		gradient: 'linear-gradient(135deg, #86d9c0, #6fcfa0)',
		gradientId: 'transferOwnershipGradient',
	},
	'Transfer Mortgage to Different Company': {
		primary: '#f7c77a', // Pale Peach
		gradient: 'linear-gradient(135deg, #f7c77a, #f5be6b)',
		gradientId: 'transferCompanyGradient',
	},
	'Transfer Company': {
		primary: '#f7c77a', // Pale Peach
		gradient: 'linear-gradient(135deg, #f7c77a, #f5be6b)',
		gradientId: 'transferCompanyGradient',
	},
	'Issue Tourism No Objection Certificate': {
		primary: '#7bc3f0', // Pale Sky Blue
		gradient: 'linear-gradient(135deg, #7bc3f0, #6bb5ed)',
		gradientId: 'tourismCertificateGradient',
	},
	'Tourism Certificate': {
		primary: '#7bc3f0', // Pale Sky Blue
		gradient: 'linear-gradient(135deg, #7bc3f0, #6bb5ed)',
		gradientId: 'tourismCertificateGradient',
	},
	'Transfer Vehicle to Another Emirate': {
		primary: '#f4a5a5', // Pale Coral
		gradient: 'linear-gradient(135deg, #f4a5a5, #e89999)',
		gradientId: 'vehicleTransferGradient',
	},
	'Vehicle Transfer': {
		primary: '#f4a5a5', // Pale Coral
		gradient: 'linear-gradient(135deg, #f4a5a5, #e89999)',
		gradientId: 'vehicleTransferGradient',
	},
};

// Company colors for bubble charts (UAE Banks for Rhoon, UAE Insurance for Wtheeq)
export const COMPANY_COLORS = {
	// UAE Banks (Rhoon)
	banks: {
		'Emirates NBD': {
			primary: '#0ea5e9',
			gradient: 'from-sky-500 to-sky-600',
		},
		'First Abu Dhabi Bank': {
			primary: '#06b6d4',
			gradient: 'from-cyan-500 to-cyan-600',
		},
		'Abu Dhabi Commercial Bank': {
			primary: '#10b981',
			gradient: 'from-emerald-500 to-emerald-600',
		},
		'Dubai Islamic Bank': {
			primary: '#f59e0b',
			gradient: 'from-amber-500 to-amber-600',
		},
		'Commercial Bank of Dubai': {
			primary: '#ef4444',
			gradient: 'from-red-500 to-red-600',
		},
	},
	// UAE Insurance Companies (Wtheeq)
	insurance: {
		'Al Dhafra Insurance': {
			primary: '#f97316',
			gradient: 'from-orange-500 to-orange-600',
		},
		'Emirates Insurance Company': {
			primary: '#0ea5e9',
			gradient: 'from-sky-500 to-sky-600',
		},
		'National General Insurance': {
			primary: '#10b981',
			gradient: 'from-emerald-500 to-emerald-600',
		},
		'Oman Insurance Company': {
			primary: '#f59e0b',
			gradient: 'from-amber-500 to-amber-600',
		},
		'Orient Insurance': {
			primary: '#ef4444',
			gradient: 'from-red-500 to-red-600',
		},
	},
};

// Tooltip styling configuration for inline styles (contentStyle prop)
export const TOOLTIP_STYLES = {
	backgroundColor: 'rgba(255, 255, 255, 0.95)',
	backdropFilter: 'blur(8px)',
	border: '1px solid rgba(148, 163, 184, 0.6)',
	borderRadius: '12px',
	boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5)',
	padding: '12px',
	minWidth: '220px',
	fontSize: '12px',
	fontWeight: '500',
};

// Tooltip class-based styling for custom content components
export const TOOLTIP_CLASSES = {
	container: 'bg-white/95 backdrop-blur-sm border border-slate-200/60 rounded-xl shadow-2xl p-3 min-w-[220px]',
	titleDot: 'w-3 h-3 rounded-full',
	itemDot: 'w-2.5 h-2.5 rounded-full shadow-sm',
	titleText: 'font-semibold text-slate-800 text-sm',
	itemLabel: 'text-slate-600 font-medium text-sm',
	itemValue: 'font-bold text-slate-900 text-sm',
};

// Legend styling configuration
export const LEGEND_STYLES = {
	container: 'flex items-center justify-center gap-6 mt-3 flex-wrap',
	item: 'flex items-center gap-2',
	dot: 'w-3 h-3 rounded-full shadow-sm',
	text: 'text-xs font-medium text-slate-600',
};

// Gradient definitions for SVG charts
export const CHART_GRADIENTS = {
	rhoon: {
		id: 'rhoonGradient',
		stops: [
			{ offset: '0%', color: CHART_COLORS.rhoon.primary, opacity: 0.8 },
			{ offset: '100%', color: CHART_COLORS.rhoon.secondary, opacity: 0.6 },
		],
	},
	wtheeq: {
		id: 'wtheeqGradient',
		stops: [
			{ offset: '0%', color: CHART_COLORS.wtheeq.primary, opacity: 0.8 },
			{ offset: '100%', color: CHART_COLORS.wtheeq.secondary, opacity: 0.6 },
		],
	},
	combined: {
		id: 'combinedGradient',
		stops: [
			{ offset: '0%', color: CHART_COLORS.combined.primary, opacity: 0.8 },
			{ offset: '100%', color: CHART_COLORS.combined.secondary, opacity: 0.6 },
		],
	},
	success: {
		id: 'successGradient',
		stops: [
			{ offset: '0%', color: CHART_COLORS.success.primary, opacity: 0.8 },
			{ offset: '100%', color: CHART_COLORS.success.secondary, opacity: 0.6 },
		],
	},
	warning: {
		id: 'warningGradient',
		stops: [
			{ offset: '0%', color: CHART_COLORS.warning.primary, opacity: 0.8 },
			{ offset: '100%', color: CHART_COLORS.warning.secondary, opacity: 0.6 },
		],
	},
	danger: {
		id: 'dangerGradient',
		stops: [
			{ offset: '0%', color: CHART_COLORS.danger.primary, opacity: 0.8 },
			{ offset: '100%', color: CHART_COLORS.danger.secondary, opacity: 0.6 },
		],
	},
};
