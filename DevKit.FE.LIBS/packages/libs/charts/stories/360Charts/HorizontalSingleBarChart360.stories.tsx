import { BarChart3Icon } from 'lucide-react';
import { HorizontalSingleBarChart } from '../../src/360-charts/charts/HorizontalSingleBarChart';
import { ChartDisplayCard } from '../../src/360-charts/components/ChartDisplayCard';

interface InteractiveArgs {
	limit?: number;
}

const bankTransactionData = [
	{ label: 'Emirates NBD', value: 45230 },
	{ label: 'First Abu Dhabi Bank', value: 38950 },
	{ label: 'Dubai Islamic Bank', value: 32100 },
	{ label: 'Abu Dhabi Commercial Bank', value: 28750 },
	{ label: 'Mashreq Bank', value: 24600 },
	{ label: 'Commercial Bank of Dubai', value: 19800 },
	{ label: 'Union National Bank', value: 15420 },
	{ label: 'National Bank of Fujairah', value: 12350 },
];

const StoryMeta = {
	title: '360 Charts/HorizontalSingleBarChart',
	component: HorizontalSingleBarChart,
	argTypes: {
		limit: {
			control: { type: 'number', min: 1, max: 10, step: 1 },
			description: 'Limit the number of bars shown (top N)',
		},
	},
};

export default StoryMeta;

export const Interactive = {
	render: (args: InteractiveArgs) => (
		<div className="p-6 bg-slate-50">
			<ChartDisplayCard
				title="Top Banks by Transaction Volume"
				subtitle="Interactive example with limit control"
				badgeText="2024"
				theme="blue"
				icon={BarChart3Icon}
			>
				<HorizontalSingleBarChart data={bankTransactionData} limit={args.limit} />
			</ChartDisplayCard>
		</div>
	),
	args: {
		limit: 5,
	},
	parameters: {
		docs: {
			description: {
				story: 'Interactive story where you can control the number of bars shown using the limit control.',
			},
		},
	},
};

export const Simple = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<ChartDisplayCard
				title="Top Banks by Transaction Volume"
				subtitle="Transaction count across all products"
				badgeText="2024"
				theme="blue"
				icon={BarChart3Icon}
			>
				<HorizontalSingleBarChart data={bankTransactionData} />
			</ChartDisplayCard>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Horizontal bar chart showing all banks sorted by transaction volume with gradient fills and dynamic sizing.',
			},
		},
	},
};

export const TopFive = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<ChartDisplayCard
				title="Top 5 Banks"
				subtitle="Limited to top 5 performers"
				badgeText="2024"
				theme="emerald"
				icon={BarChart3Icon}
			>
				<HorizontalSingleBarChart data={bankTransactionData} limit={5} />
			</ChartDisplayCard>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Horizontal bar chart limited to showing only the top 5 banks by transaction volume.',
			},
		},
	},
};
