import { CreditCardIcon, DollarSignIcon, FileTextIcon, PercentIcon, TrendingUpIcon, UserCheckIcon } from 'lucide-react';
import { KpiCard } from '../../src/360-charts/components/KpiCard';
import { FC, SVGProps } from 'react';

interface InteractiveArgs {
	label: string;
	subLabel: string;
	value: string | number;
	change: number;
	trend: 'up' | 'down';
	theme: 'green-card' | 'blue-card' | 'purple-card';
	variant: 'default' | 'compact';
}

const StoryMeta = {
	title: '360 Charts/KpiCard',
	component: KpiCard,
	argTypes: {
		theme: {
			control: { type: 'select' },
			options: ['green-card', 'blue-card', 'purple-card'],
			description: 'Card theme color',
		},
		label: {
			control: 'text',
			description: 'Main label text',
		},
		subLabel: {
			control: 'text',
			description: 'Subtitle text',
		},
		value: {
			control: 'text',
			description: 'Main value to display',
		},
		change: {
			control: { type: 'number', step: 0.1 },
			description: 'Percentage change value',
		},
		trend: {
			control: { type: 'select' },
			options: ['up', 'down'],
			description: 'Trend direction',
		},
		variant: {
			control: { type: 'select' },
			options: ['default', 'compact'],
			description: 'Card variant - default shows full-sized card, compact shows smaller card optimized for tighter layouts',
		},
	},
};

export default StoryMeta;

export const Interactive = {
	render: (args: InteractiveArgs) => (
		<div className="p-6 bg-slate-50">
			<KpiCard
				theme={args.theme}
				icon={DollarSignIcon as FC<SVGProps<SVGSVGElement>>}
				label={args.label}
				subLabel={args.subLabel}
				value={args.value}
				change={args.change}
				trend={args.trend}
				variant={args.variant}
			/>
		</div>
	),
	args: {
		theme: 'blue-card',
		label: 'Total Revenue',
		subLabel: 'This Month',
		value: '2.4M',
		change: 12.5,
		trend: 'up',
		variant: 'default',
	},
	parameters: {
		docs: {
			description: {
				story: 'Interactive KPI card where you can adjust all the main properties using controls.',
			},
		},
	},
};

export const Simple = {
	render: () => (
		<div className="p-6 bg-slate-50 space-y-4">
			<KpiCard
				theme="blue-card"
				icon={DollarSignIcon as FC<SVGProps<SVGSVGElement>>}
				label="Total Revenue"
				subLabel="Monthly"
				value="2.4M"
				change={12.5}
				trend="up"
				units="AED"
				unitsPosition="prefix"
			/>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Simple KPI card showing revenue with an upward trend and AED currency prefix.',
			},
		},
	},
};

export const MultipleCards = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<KpiCard
					theme="green-card"
					icon={UserCheckIcon as FC<SVGProps<SVGSVGElement>>}
					label="Applications"
					subLabel="This Month"
					value="1,234"
					change={8.2}
					trend="up"
				/>
				<KpiCard
					theme="blue-card"
					icon={DollarSignIcon as FC<SVGProps<SVGSVGElement>>}
					label="Revenue"
					subLabel="This Quarter"
					value="3.2M"
					change={15.7}
					trend="up"
					units="AED"
					unitsPosition="prefix"
				/>
				<KpiCard
					theme="purple-card"
					icon={PercentIcon as FC<SVGProps<SVGSVGElement>>}
					label="Conversion Rate"
					subLabel="Last 30 Days"
					value="68.5"
					change={-2.3}
					trend="down"
					units="%"
					unitsPosition="suffix"
				/>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Grid of KPI cards showing different metrics with various themes and trend directions.',
			},
		},
	},
};

export const TrendDown = {
	render: () => (
		<div className="p-6 bg-slate-50 space-y-4">
			<KpiCard
				theme="purple-card"
				icon={FileTextIcon as FC<SVGProps<SVGSVGElement>>}
				label="Pending Tasks"
				subLabel="This Week"
				value="142"
				change={-5.8}
				trend="down"
			/>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'KPI card showing a metric with downward trend, displayed with red styling.',
			},
		},
	},
};

export const CustomColors = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<KpiCard
					gradient="from-orange-500 to-red-600"
					icon={CreditCardIcon as FC<SVGProps<SVGSVGElement>>}
					label="Credit Card Apps"
					subLabel="This Month"
					value="856"
					change={22.4}
					trend="up"
				/>
				<KpiCard
					gradient="from-pink-500 to-purple-600"
					icon={TrendingUpIcon as FC<SVGProps<SVGSVGElement>>}
					label="Growth Rate"
					subLabel="Year over Year"
					value="34.2"
					change={8.9}
					trend="up"
					units="%"
					unitsPosition="suffix"
				/>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'KPI cards using custom gradient colors instead of predefined themes.',
			},
		},
	},
};

export const ThemeVariations = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<KpiCard
					theme="green-card"
					icon={DollarSignIcon as FC<SVGProps<SVGSVGElement>>}
					label="Green Theme"
					subLabel="Positive Growth"
					value="1,523"
					change={18.5}
					trend="up"
				/>
				<KpiCard
					theme="blue-card"
					icon={UserCheckIcon as FC<SVGProps<SVGSVGElement>>}
					label="Blue Theme"
					subLabel="Neutral Metrics"
					value="3,245"
					change={5.2}
					trend="up"
				/>
				<KpiCard
					theme="purple-card"
					icon={PercentIcon as FC<SVGProps<SVGSVGElement>>}
					label="Purple Theme"
					subLabel="Premium Data"
					value="92.8"
					change={3.7}
					trend="up"
					units="%"
					unitsPosition="suffix"
				/>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Showcase of all three built-in theme variations: green, blue, and purple.',
			},
		},
	},
};

export const LargeNumbers = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<KpiCard
					theme="blue-card"
					icon={DollarSignIcon as FC<SVGProps<SVGSVGElement>>}
					label="Total Loan Value"
					subLabel="All Products"
					value="12.8B"
					change={7.3}
					trend="up"
					units="AED"
					unitsPosition="prefix"
				/>
				<KpiCard
					theme="green-card"
					icon={FileTextIcon as FC<SVGProps<SVGSVGElement>>}
					label="Total Applications"
					subLabel="Since Launch"
					value="1.2M"
					change={125.4}
					trend="up"
				/>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'KPI cards displaying large formatted numbers (billions and millions) with units.',
			},
		},
	},
};

export const CompactVariant = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
				<KpiCard
					theme="green-card"
					icon={UserCheckIcon as FC<SVGProps<SVGSVGElement>>}
					label="Applications"
					subLabel="This Month"
					value="1,234"
					change={8.2}
					trend="up"
					variant="compact"
				/>
				<KpiCard
					theme="blue-card"
					icon={DollarSignIcon as FC<SVGProps<SVGSVGElement>>}
					label="Revenue"
					subLabel="This Quarter"
					value="3.2M"
					change={15.7}
					trend="up"
					units="AED"
					unitsPosition="prefix"
					variant="compact"
				/>
				<KpiCard
					theme="purple-card"
					icon={PercentIcon as FC<SVGProps<SVGSVGElement>>}
					label="Conversion Rate"
					subLabel="Last 30 Days"
					value="68.5"
					change={-2.3}
					trend="down"
					units="%"
					unitsPosition="suffix"
					variant="compact"
				/>
				<KpiCard
					theme="green-card"
					icon={FileTextIcon as FC<SVGProps<SVGSVGElement>>}
					label="Pending Tasks"
					subLabel="This Week"
					value="142"
					change={-5.8}
					trend="down"
					variant="compact"
				/>
				<KpiCard
					theme="blue-card"
					icon={CreditCardIcon as FC<SVGProps<SVGSVGElement>>}
					label="Credit Cards"
					subLabel="Active Users"
					value="856"
					change={22.4}
					trend="up"
					variant="compact"
				/>
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Compact variant showcasing 5 KPI cards in a single row. The compact variant is optimized for tighter layouts and can be used flexibly for 1-6 cards per row.',
			},
		},
	},
};
