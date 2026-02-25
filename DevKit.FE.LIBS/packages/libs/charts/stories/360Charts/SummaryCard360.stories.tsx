import type { Meta } from '@storybook/react';
import { SummaryCard } from '../../src/360-charts/components/SummaryCard';

interface InteractiveArgs {
	name: string;
	icon: string;
	gradient: string;
	value: number;
	unit: string;
	label: string;
}

const StoryMeta: Meta<typeof SummaryCard> = {
	title: '360 Charts/SummaryCard',
	component: SummaryCard,
	argTypes: {
		name: {
			control: 'text',
			description: 'Card name/title',
		},
		icon: {
			control: 'text',
			description: 'Emoji icon',
		},
		gradient: {
			control: 'text',
			description: 'Tailwind gradient classes (e.g., "from-blue-100 to-blue-200")',
		},
		value: {
			control: 'number',
			description: 'Numeric value',
		},
		unit: {
			control: 'text',
			description: 'Unit of measurement (e.g., "AED")',
		},
		label: {
			control: 'text',
			description: 'Descriptive label',
		},
	},
};

export default StoryMeta;

export const Interactive = {
	render: (args: InteractiveArgs) => (
		<div className="p-6 bg-slate-50">
			<SummaryCard
				name={args.name}
				icon={args.icon}
				gradient={args.gradient}
				value={args.value}
				unit={args.unit}
				label={args.label}
			/>
		</div>
	),
	args: {
		name: 'Mortgages',
		icon: '🏠',
		gradient: 'from-blue-100 to-blue-200',
		value: 15800000,
		unit: 'AED',
		label: 'Total Loan Value',
	},
	parameters: {
		docs: {
			description: {
				story:
					'Interactive summary card where you can adjust all properties using controls. Values are automatically formatted.',
			},
		},
	},
};

export const Simple = {
	render: () => (
		<div className="p-6 bg-slate-50 space-y-4">
			<SummaryCard
				name="Mortgages"
				icon="🏠"
				gradient="from-blue-100 to-blue-200"
				value={15800000}
				unit="AED"
				label="Total Loan Value"
			/>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Compact summary card with gradient background showing formatted currency values (millions).',
			},
		},
	},
};

export const MultipleCards = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<SummaryCard
					name="Mortgages"
					icon="🏠"
					gradient="from-blue-100 to-blue-200"
					value={15800000}
					unit="AED"
					label="Total Value"
				/>
				<SummaryCard
					name="Auto Loans"
					icon="🚗"
					gradient="from-green-100 to-green-200"
					value={12400000}
					unit="AED"
					label="Total Value"
				/>
				<SummaryCard
					name="Personal Loans"
					icon="💳"
					gradient="from-purple-100 to-purple-200"
					value={9600000}
					unit="AED"
					label="Total Value"
				/>
				<SummaryCard
					name="Business Loans"
					icon="💼"
					gradient="from-orange-100 to-orange-200"
					value={6500000}
					unit="AED"
					label="Total Value"
				/>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Grid of summary cards showing different product categories with various gradient themes.',
			},
		},
	},
};

export const Counts = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<SummaryCard
					name="Applications"
					icon="📋"
					gradient="from-cyan-100 to-cyan-200"
					value={5400}
					unit=""
					label="Total Count"
				/>
				<SummaryCard
					name="Approved"
					icon="✅"
					gradient="from-emerald-100 to-emerald-200"
					value={4200}
					unit=""
					label="Approved Apps"
				/>
				<SummaryCard
					name="Pending"
					icon="⏳"
					gradient="from-amber-100 to-amber-200"
					value={1200}
					unit=""
					label="In Review"
				/>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Summary cards displaying count values without currency units, formatted as K for thousands.',
			},
		},
	},
};

export const VariousGradients = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<SummaryCard
					name="Revenue"
					icon="💰"
					gradient="from-rose-100 to-pink-200"
					value={24500000}
					unit="AED"
					label="Total Revenue"
				/>
				<SummaryCard
					name="Profit"
					icon="📈"
					gradient="from-violet-100 to-purple-200"
					value={8900000}
					unit="AED"
					label="Net Profit"
				/>
				<SummaryCard
					name="Growth"
					icon="🚀"
					gradient="from-indigo-100 to-blue-200"
					value={3200000}
					unit="AED"
					label="Year Growth"
				/>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Showcase of various gradient color combinations for different visual themes.',
			},
		},
	},
};

export const LargeNumbers = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<SummaryCard
					name="Total Portfolio"
					icon="💎"
					gradient="from-blue-100 to-indigo-200"
					value={125000000}
					unit="AED"
					label="All Products"
				/>
				<SummaryCard
					name="Active Users"
					icon="👥"
					gradient="from-green-100 to-teal-200"
					value={45600}
					unit=""
					label="Registered"
				/>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Summary cards handling large numbers (over 100M) with automatic formatting to millions (M).',
			},
		},
	},
};

export const CustomIcons = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<SummaryCard
					name="Credit Cards"
					icon="💳"
					gradient="from-red-100 to-red-200"
					value={8200000}
					unit="AED"
					label="Outstanding"
				/>
				<SummaryCard
					name="Savings"
					icon="🏦"
					gradient="from-teal-100 to-teal-200"
					value={28500000}
					unit="AED"
					label="Deposits"
				/>
				<SummaryCard
					name="Investments"
					icon="📊"
					gradient="from-purple-100 to-purple-200"
					value={15700000}
					unit="AED"
					label="Portfolio Value"
				/>
				<SummaryCard
					name="Insurance"
					icon="🛡️"
					gradient="from-cyan-100 to-cyan-200"
					value={4300000}
					unit="AED"
					label="Premiums"
				/>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Various emoji icons used for different financial product categories.',
			},
		},
	},
};

export const DashboardLayout = {
	render: () => (
		<div className="p-6 bg-slate-50 space-y-4">
			<h2 className="text-2xl font-bold text-slate-900 mb-4">Product Overview</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
				<SummaryCard
					name="Mortgages"
					icon="🏠"
					gradient="from-blue-100 to-blue-200"
					value={15800000}
					unit="AED"
					label="Total"
				/>
				<SummaryCard
					name="Auto"
					icon="🚗"
					gradient="from-green-100 to-green-200"
					value={12400000}
					unit="AED"
					label="Total"
				/>
				<SummaryCard
					name="Personal"
					icon="💳"
					gradient="from-purple-100 to-purple-200"
					value={9600000}
					unit="AED"
					label="Total"
				/>
				<SummaryCard
					name="Business"
					icon="💼"
					gradient="from-orange-100 to-orange-200"
					value={6500000}
					unit="AED"
					label="Total"
				/>
				<SummaryCard
					name="Credit"
					icon="💎"
					gradient="from-pink-100 to-pink-200"
					value={8200000}
					unit="AED"
					label="Total"
				/>
				<SummaryCard
					name="Other"
					icon="📋"
					gradient="from-slate-100 to-slate-200"
					value={3100000}
					unit="AED"
					label="Total"
				/>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Complete dashboard layout with multiple summary cards in a compact grid format.',
			},
		},
	},
};
