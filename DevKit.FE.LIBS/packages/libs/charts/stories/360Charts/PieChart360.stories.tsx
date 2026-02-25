import { PieChartIcon } from 'lucide-react';
import { PieChart } from '../../src/360-charts/charts/PieChart';
import { ChartDisplayCard } from '../../src/360-charts/components/ChartDisplayCard';

interface InteractiveArgs {
	variant: 'donut' | 'pie';
	legendVariant: 'default' | 'compact' | 'cards';
	hideLegend: boolean;
}

// Sample data for pie/donut charts
const mortgageTypeData = [
	{
		name: 'Conventional',
		value: 45,
		count: 1250,
		color: 'teal' as const,
		tooltipAdditionalInfo: [
			{ label: 'Percentage', value: '45%' },
			{ label: 'Count', value: '1,250' },
		],
		legendAdditionalInfo: [{ label: '', value: '45%' }],
	},
	{
		name: 'FHA',
		value: 30,
		count: 830,
		color: 'blue_gray' as const,
		tooltipAdditionalInfo: [
			{ label: 'Percentage', value: '30%' },
			{ label: 'Count', value: '830' },
		],
		legendAdditionalInfo: [{ label: '', value: '30%' }],
	},
	{
		name: 'VA',
		value: 15,
		count: 415,
		color: 'lavender' as const,
		tooltipAdditionalInfo: [
			{ label: 'Percentage', value: '15%' },
			{ label: 'Count', value: '415' },
		],
		legendAdditionalInfo: [{ label: '', value: '15%' }],
	},
	{
		name: 'USDA',
		value: 10,
		count: 280,
		color: 'pink' as const,
		tooltipAdditionalInfo: [
			{ label: 'Percentage', value: '10%' },
			{ label: 'Count', value: '280' },
		],
		legendAdditionalInfo: [{ label: '', value: '10%' }],
	},
];

const categoryData = [
	{
		name: 'Electronics',
		value: 35,
		count: 450,
		color: 'sky_blue' as const,
		tooltipAdditionalInfo: [
			{ label: 'Sales', value: '$125,000' },
			{ label: 'Count', value: '450 items' },
		],
		legendAdditionalInfo: [{ label: '', value: '$125k' }],
	},
	{
		name: 'Clothing',
		value: 25,
		count: 320,
		color: 'gold' as const,
		tooltipAdditionalInfo: [
			{ label: 'Sales', value: '$89,000' },
			{ label: 'Count', value: '320 items' },
		],
		legendAdditionalInfo: [{ label: '', value: '$89k' }],
	},
	{
		name: 'Home & Garden',
		value: 20,
		count: 260,
		color: 'mint_teal' as const,
		tooltipAdditionalInfo: [
			{ label: 'Sales', value: '$71,000' },
			{ label: 'Count', value: '260 items' },
		],
		legendAdditionalInfo: [{ label: '', value: '$71k' }],
	},
	{
		name: 'Sports',
		value: 12,
		count: 155,
		color: 'light_coral' as const,
		tooltipAdditionalInfo: [
			{ label: 'Sales', value: '$43,000' },
			{ label: 'Count', value: '155 items' },
		],
		legendAdditionalInfo: [{ label: '', value: '$43k' }],
	},
	{
		name: 'Books',
		value: 8,
		count: 105,
		color: 'slate_blue' as const,
		tooltipAdditionalInfo: [
			{ label: 'Sales', value: '$29,000' },
			{ label: 'Count', value: '105 items' },
		],
		legendAdditionalInfo: [{ label: '', value: '$29k' }],
	},
];

const StoryMeta = {
	title: '360 Charts/PieChart',
	component: PieChart,
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['donut', 'pie'],
			description: 'Chart variant - donut or pie',
		},
		legendVariant: {
			control: { type: 'select' },
			options: ['default', 'compact', 'cards'],
			description: 'Legend style',
		},
		hideLegend: {
			control: { type: 'boolean' },
			description: 'Hide legend',
		},
	},
};

export default StoryMeta;

export const Interactive = {
	render: (args: InteractiveArgs) => (
		<div className="p-6 bg-slate-50">
			<ChartDisplayCard
				title="Mortgage Type Distribution"
				subtitle="Interactive example with controls"
				badgeText="2024"
				theme="teal"
				icon={PieChartIcon}
			>
				<PieChart
					variant={args.variant}
					data={mortgageTypeData}
					legendVariant={args.legendVariant}
					hideLegend={args.hideLegend}
				/>
			</ChartDisplayCard>
		</div>
	),
	args: {
		variant: 'donut',
		legendVariant: 'default',
		hideLegend: false,
	},
	parameters: {
		docs: {
			description: {
				story: 'Interactive story where you can change the chart variant, legend style, and toggle legend visibility.',
			},
		},
	},
};

export const Donut = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<ChartDisplayCard
				title="Mortgage Type Distribution"
				subtitle="By type and percentage"
				badgeText="2024"
				theme="teal"
				icon={PieChartIcon}
			>
				<PieChart variant="donut" data={mortgageTypeData} legendVariant="default" />
			</ChartDisplayCard>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Donut chart showing mortgage type distribution with default legend.',
			},
		},
	},
};

export const Pie = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<ChartDisplayCard
				title="Sales by Category"
				subtitle="Distribution breakdown"
				badgeText="Q4 2024"
				theme="sky-blue"
				icon={PieChartIcon}
			>
				<PieChart variant="pie" data={categoryData} legendVariant="default" />
			</ChartDisplayCard>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Pie chart showing sales distribution by category.',
			},
		},
	},
};

export const CompactLegend = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<ChartDisplayCard
				title="Mortgage Type Distribution"
				subtitle="With compact legend"
				badgeText="2024"
				theme="lavender"
				icon={PieChartIcon}
			>
				<PieChart variant="donut" data={mortgageTypeData} legendVariant="compact" />
			</ChartDisplayCard>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Donut chart with compact legend variant for space-efficient display.',
			},
		},
	},
};

export const CardsLegend = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<ChartDisplayCard
				title="Mortgage Type Distribution"
				subtitle="With card-style legend"
				badgeText="2024"
				theme="gold"
				icon={PieChartIcon}
			>
				<PieChart variant="donut" data={mortgageTypeData} legendVariant="cards" />
			</ChartDisplayCard>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Donut chart with card-style legend showing detailed information.',
			},
		},
	},
};

export const NoLegend = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<ChartDisplayCard
				title="Mortgage Type Distribution"
				subtitle="Without legend"
				badgeText="2024"
				theme="pink"
				icon={PieChartIcon}
			>
				<PieChart variant="donut" data={mortgageTypeData} hideLegend={true} />
			</ChartDisplayCard>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Donut chart with legend hidden - useful when legend is displayed separately.',
			},
		},
	},
};
