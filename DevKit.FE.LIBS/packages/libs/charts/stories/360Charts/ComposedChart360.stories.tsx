import { TrendingUpIcon } from 'lucide-react';
import { ComposedChart } from '../../src/360-charts/charts/ComposedChart';
import { ChartDisplayCard } from '../../src/360-charts/components/ChartDisplayCard';

interface InteractiveArgs {
	height: number;
	showTotalLine: boolean;
	legendVerticalAlign: 'top' | 'bottom' | 'middle';
}

const salesData = [
	{ month: 'Jan', product1: 4000, product2: 2400, product3: 2400, volume: 8800 },
	{ month: 'Feb', product1: 3000, product2: 1398, product3: 2210, volume: 6608 },
	{ month: 'Mar', product1: 2000, product2: 9800, product3: 2290, volume: 14090 },
	{ month: 'Apr', product1: 2780, product2: 3908, product3: 2000, volume: 8688 },
	{ month: 'May', product1: 1890, product2: 4800, product3: 2181, volume: 8871 },
	{ month: 'Jun', product1: 2390, product2: 3800, product3: 2500, volume: 8690 },
	{ month: 'Jul', product1: 3490, product2: 4300, product3: 2100, volume: 9890 },
];

const revenueData = [
	{ quarter: 'Q1 2024', software: 45000, hardware: 32000, services: 23000, volume: 100000 },
	{ quarter: 'Q2 2024', software: 52000, hardware: 35000, services: 28000, volume: 115000 },
	{ quarter: 'Q3 2024', software: 48000, hardware: 33000, services: 25000, volume: 106000 },
	{ quarter: 'Q4 2024', software: 58000, hardware: 38000, services: 32000, volume: 128000 },
];

const productSeries = [
	{ dataKey: 'product1', name: 'Product A', color: '#3b82f6', strokeWidth: 2 },
	{ dataKey: 'product2', name: 'Product B', color: '#10b981', strokeWidth: 2 },
	{ dataKey: 'product3', name: 'Product C', color: '#f59e0b', strokeWidth: 2 },
];

const revenueSeries = [
	{ dataKey: 'software', name: 'Software', color: '#8b5cf6', strokeWidth: 2 },
	{ dataKey: 'hardware', name: 'Hardware', color: '#ec4899', strokeWidth: 2 },
	{ dataKey: 'services', name: 'Services', color: '#14b8a6', strokeWidth: 2 },
];

const StoryMeta = {
	title: '360 Charts/ComposedChart',
	component: ComposedChart,
	argTypes: {
		height: {
			control: { type: 'number', min: 200, max: 600, step: 20 },
			description: 'Chart height in pixels',
		},
		showTotalLine: {
			control: { type: 'boolean' },
			description: 'Show total volume line',
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
				title="Product Sales Overview"
				subtitle="Interactive example with controls"
				badgeText="2024"
				theme="blue"
				icon={TrendingUpIcon}
			>
				<ComposedChart
					chartDataKey="month"
					data={salesData}
					series={productSeries}
					height={args.height}
					showTotalLine={args.showTotalLine}
					legendVerticalAlign={args.legendVerticalAlign}
				/>
			</ChartDisplayCard>
		</div>
	),
	args: {
		height: 300,
		showTotalLine: true,
		legendVerticalAlign: 'top',
	},
	parameters: {
		docs: {
			description: {
				story:
					'Interactive story where you can change the height, toggle total line, and adjust legend alignment using controls.',
			},
		},
	},
};

export const Simple = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<ChartDisplayCard
				title="Product Sales Overview"
				subtitle="Monthly sales by product"
				badgeText="2024"
				theme="blue"
				icon={TrendingUpIcon}
			>
				<ComposedChart chartDataKey="month" data={salesData} series={productSeries} />
			</ChartDisplayCard>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Composed chart combining area charts for multiple products with a total volume line overlay showing monthly sales trends.',
			},
		},
	},
};

export const RevenueBreakdown = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<ChartDisplayCard
				title="Revenue Breakdown"
				subtitle="Quarterly revenue streams"
				badgeText="2024"
				theme="purple"
				icon={TrendingUpIcon}
			>
				<ComposedChart chartDataKey="quarter" data={revenueData} series={revenueSeries} totalLineName="Total Revenue" />
			</ChartDisplayCard>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Quarterly revenue breakdown showing different revenue streams with total revenue trend line.',
			},
		},
	},
};

export const WithoutTotalLine = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<ChartDisplayCard
				title="Product Sales Overview"
				subtitle="Without total volume line"
				badgeText="2024"
				theme="emerald"
				icon={TrendingUpIcon}
			>
				<ComposedChart chartDataKey="month" data={salesData} series={productSeries} showTotalLine={false} />
			</ChartDisplayCard>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Composed chart without the total volume line, showing only the individual product areas.',
			},
		},
	},
};
