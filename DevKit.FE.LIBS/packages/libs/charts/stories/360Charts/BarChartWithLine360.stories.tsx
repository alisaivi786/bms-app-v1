import { BarChart3Icon } from 'lucide-react';
import { BarChartWithLine } from '../../src/360-charts/charts/BarChartWithLine';
import { ChartDisplayCard } from '../../src/360-charts/components/ChartDisplayCard';

interface InteractiveArgs {
	height: number;
}

const monthlyMetrics = [
	{ month: 'Jan', transactions: 450, averageValue: 1200 },
	{ month: 'Feb', transactions: 520, averageValue: 1350 },
	{ month: 'Mar', transactions: 480, averageValue: 1280 },
	{ month: 'Apr', transactions: 600, averageValue: 1450 },
	{ month: 'May', transactions: 580, averageValue: 1380 },
	{ month: 'Jun', transactions: 650, averageValue: 1520 },
];

const quarterlyMetrics = [
	{ quarter: 'Q1 2024', volume: 12500, satisfaction: 4.2 },
	{ quarter: 'Q2 2024', volume: 15000, satisfaction: 4.5 },
	{ quarter: 'Q3 2024', volume: 14200, satisfaction: 4.3 },
	{ quarter: 'Q4 2024', volume: 17800, satisfaction: 4.7 },
];

const StoryMeta = {
	title: '360 Charts/BarChartWithLine',
	component: BarChartWithLine,
	argTypes: {
		height: {
			control: { type: 'number', min: 150, max: 500, step: 25 },
			description: 'Chart height in pixels',
		},
	},
};

export default StoryMeta;

export const Interactive = {
	render: (args: InteractiveArgs) => (
		<div className="p-6 bg-slate-50">
			<ChartDisplayCard
				title="Transaction Metrics"
				subtitle="Interactive example with height control"
				badgeText="2024"
				theme="blue"
				icon={BarChart3Icon}
			>
				<BarChartWithLine
					data={monthlyMetrics}
					chartDataKey="month"
					barDataKey="transactions"
					lineDataKey="averageValue"
					barLabel="Transactions"
					lineLabel="Avg Value"
					height={args.height}
				/>
			</ChartDisplayCard>
		</div>
	),
	args: {
		height: 200,
	},
	parameters: {
		docs: {
			description: {
				story: 'Interactive story where you can change the chart height using controls.',
			},
		},
	},
};

export const Simple = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<ChartDisplayCard
				title="Transaction Metrics"
				subtitle="Monthly transactions and average value"
				badgeText="2024"
				theme="blue"
				icon={BarChart3Icon}
			>
				<BarChartWithLine
					data={monthlyMetrics}
					chartDataKey="month"
					barDataKey="transactions"
					lineDataKey="averageValue"
					barLabel="Transactions"
					lineLabel="Avg Value"
				/>
			</ChartDisplayCard>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Bar chart with line overlay showing monthly transactions as bars and average transaction value as a line with dual Y-axes.',
			},
		},
	},
};

export const QuarterlyMetrics = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<ChartDisplayCard
				title="Business Metrics"
				subtitle="Quarterly volume and satisfaction"
				badgeText="2024"
				theme="emerald"
				icon={BarChart3Icon}
			>
				<BarChartWithLine
					data={quarterlyMetrics}
					chartDataKey="quarter"
					barDataKey="volume"
					lineDataKey="satisfaction"
					barLabel="Volume"
					lineLabel="Satisfaction Score"
				/>
			</ChartDisplayCard>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Quarterly business metrics combining volume (bars) and satisfaction scores (line).',
			},
		},
	},
};

export const CustomColors = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<ChartDisplayCard
				title="Transaction Metrics"
				subtitle="With custom colors"
				badgeText="2024"
				theme="purple"
				icon={BarChart3Icon}
			>
				<BarChartWithLine
					data={monthlyMetrics}
					chartDataKey="month"
					barDataKey="transactions"
					lineDataKey="averageValue"
					barLabel="Transactions"
					lineLabel="Avg Value"
					barColor="#8b5cf6"
					barGradientStart="#8b5cf6"
					barGradientEnd="#6366f1"
					lineColor="#ec4899"
					yAxisLeftStroke="#8b5cf6"
					yAxisRightStroke="#ec4899"
				/>
			</ChartDisplayCard>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Bar chart with line using custom colors for bars (purple) and line (pink).',
			},
		},
	},
};
