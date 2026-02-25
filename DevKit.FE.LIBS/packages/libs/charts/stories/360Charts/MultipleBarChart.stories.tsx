import { BarChart3Icon } from 'lucide-react';
import { MultipleBarChart } from '../../src/360-charts/charts/MultipleBarChart';
import { ChartDisplayCard } from '../../src/360-charts/components/ChartDisplayCard';

interface InteractiveArgs {
	height: number;
	showTotal: boolean;
	legendVerticalAlign: 'top' | 'bottom' | 'middle';
}

const monthlyData = [
	{ month: 'Jan', newApplications: 120, approvedApplications: 95, rejectedApplications: 25 },
	{ month: 'Feb', newApplications: 150, approvedApplications: 120, rejectedApplications: 30 },
	{ month: 'Mar', newApplications: 180, approvedApplications: 145, rejectedApplications: 35 },
	{ month: 'Apr', newApplications: 165, approvedApplications: 130, rejectedApplications: 35 },
	{ month: 'May', newApplications: 195, approvedApplications: 160, rejectedApplications: 35 },
	{ month: 'Jun', newApplications: 210, approvedApplications: 175, rejectedApplications: 35 },
];

const quarterlyData = [
	{ quarter: 'Q1 2024', revenue: 45000, expenses: 32000, profit: 13000 },
	{ quarter: 'Q2 2024', revenue: 52000, expenses: 35000, profit: 17000 },
	{ quarter: 'Q3 2024', revenue: 48000, expenses: 33000, profit: 15000 },
	{ quarter: 'Q4 2024', revenue: 58000, expenses: 38000, profit: 20000 },
];

const bars = [
	{
		dataKey: 'newApplications',
		name: 'New Applications',
		color: { primary: '#3b82f6', secondary: '#1d4ed8' },
	},
	{
		dataKey: 'approvedApplications',
		name: 'Approved',
		color: { primary: '#10b981', secondary: '#059669' },
	},
	{
		dataKey: 'rejectedApplications',
		name: 'Rejected',
		color: { primary: '#ef4444', secondary: '#dc2626' },
	},
];

const revenueBars = [
	{
		dataKey: 'revenue',
		name: 'Revenue',
		color: { primary: '#10b981', secondary: '#059669' },
	},
	{
		dataKey: 'expenses',
		name: 'Expenses',
		color: { primary: '#ef4444', secondary: '#dc2626' },
	},
	{
		dataKey: 'profit',
		name: 'Profit',
		color: { primary: '#3b82f6', secondary: '#1d4ed8' },
	},
];

const StoryMeta = {
	title: '360 Charts/MultipleBarChart',
	component: MultipleBarChart,
	argTypes: {
		height: {
			control: { type: 'number', min: 200, max: 600, step: 20 },
			description: 'Chart height in pixels',
		},
		showTotal: {
			control: { type: 'boolean' },
			description: 'Show total in tooltip',
		},
		legendVerticalAlign: {
			control: { type: 'select' },
			options: ['top', 'bottom', 'middle'],
			description: 'Legend vertical alignment',
		},
	},
};

export default StoryMeta;

export const Interactive = {
	render: (args: InteractiveArgs) => (
		<div className="p-6 bg-slate-50">
			<ChartDisplayCard
				title="Application Statistics"
				subtitle="Interactive example with controls"
				badgeText="2024"
				theme="blue"
				icon={BarChart3Icon}
			>
				<MultipleBarChart
					chartDataKey="month"
					data={monthlyData}
					bars={bars}
					height={args.height}
					showTotal={args.showTotal}
					legendVerticalAlign={args.legendVerticalAlign}
				/>
			</ChartDisplayCard>
		</div>
	),
	args: {
		height: 280,
		showTotal: true,
		legendVerticalAlign: 'top',
	},
	parameters: {
		docs: {
			description: {
				story:
					'Interactive story where you can change the height, toggle total display, and adjust legend alignment using controls.',
			},
		},
	},
};

export const Simple = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<ChartDisplayCard
				title="Application Statistics"
				subtitle="Monthly overview"
				badgeText="2024"
				theme="blue"
				icon={BarChart3Icon}
			>
				<MultipleBarChart chartDataKey="month" data={monthlyData} bars={bars} />
			</ChartDisplayCard>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Basic multiple bar chart showing application statistics with three different data series.',
			},
		},
	},
};

export const RevenueBreakdown = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<ChartDisplayCard
				title="Financial Performance"
				subtitle="Quarterly breakdown"
				badgeText="2024"
				theme="emerald"
				icon={BarChart3Icon}
			>
				<MultipleBarChart chartDataKey="quarter" data={quarterlyData} bars={revenueBars} />
			</ChartDisplayCard>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Financial performance chart showing revenue, expenses, and profit breakdown by quarter.',
			},
		},
	},
};

export const WithoutTotal = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<ChartDisplayCard
				title="Application Statistics"
				subtitle="Without total in tooltip"
				badgeText="2024"
				theme="purple"
				icon={BarChart3Icon}
			>
				<MultipleBarChart chartDataKey="month" data={monthlyData} bars={bars} showTotal={false} />
			</ChartDisplayCard>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Multiple bar chart with total disabled in the tooltip.',
			},
		},
	},
};
