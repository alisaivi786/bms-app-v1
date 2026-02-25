import { BarChart, ChartShell } from '../../src/default';

interface InteractiveArgs {
	layout: 'horizontal' | 'vertical' | 'stacked';
	height: number;
}

// Grouped data for complex charts
const data = [
	{
		name: 'New',
		values: [
			{ name: 'Jan', value: 37000 },
			{ name: 'Feb', value: 23000 },
			{ name: 'Mar', value: 31500 },
			{ name: 'Apr', value: 34500 },
		],
	},
	{
		name: 'Release',
		values: [
			{ name: 'Jan', value: 22000 },
			{ name: 'Feb', value: 14000 },
			{ name: 'Mar', value: 19000 },
			{ name: 'Apr', value: 20500 },
		],
	},
];

// Simple data for basic bar charts
const simpleData = [
	{ name: 'January', value: 45000 },
	{ name: 'February', value: 32000 },
	{ name: 'March', value: 51000 },
	{ name: 'April', value: 38000 },
	{ name: 'May', value: 47000 },
	{ name: 'June', value: 42000 },
];

const stackedData = [
	{
		name: 'Desktop Sales',
		values: [
			{ name: 'Q1', value: 80000 },
			{ name: 'Q2', value: 25000 },
			{ name: 'Q3', value: 40000 },
			{ name: 'Q4', value: 65000 },
		],
	},
	{
		name: 'Mobile Sales',
		values: [
			{ name: 'Q1', value: 20000 },
			{ name: 'Q2', value: 75000 },
			{ name: 'Q3', value: 60000 },
			{ name: 'Q4', value: 35000 },
		],
	},
];


const StoryMeta = {
	title: 'Charts/BarChart',
	component: BarChart,
	argTypes: {
		layout: {
			control: { type: 'select' },
			options: ['horizontal', 'vertical', 'stacked'],
			description: 'Chart orientation',
		},
		height: {
			control: { type: 'number' },
			description: 'Chart height in pixels',
		},
	},
};

export default StoryMeta;

export const Interactive = {
	render: (args: InteractiveArgs) => (
		<ChartShell
			header={`${
				args.layout === 'horizontal' ? 'Horizontal' : args.layout === 'vertical' ? 'Vertical' : 'Stacked'
			} Bar Chart`}
			footer="Interactive example with grouped data by month"
		>
			<BarChart data={data} height={args.height || 300} layout={args.layout || 'horizontal'} />
		</ChartShell>
	),
	args: {
		layout: 'horizontal',
		height: 300,
	},
	parameters: {
		docs: {
			description: {
				story:
					'Interactive story where you can change the layout and height using controls. Shows grouped data with multiple values per category.',
			},
		},
	},
};

export const Horizontal = {
	render: () => (
		<ChartShell header="Horizontal Bar Chart" footer="Data showing quarterly mortgage types by month">
			<BarChart data={data} height={250} layout="horizontal" />
		</ChartShell>
	),
	parameters: {
		docs: {
			description: {
				story: 'Horizontal bar chart with bars extending from left to right, showing grouped monthly data.',
			},
		},
	},
};

export const Vertical = {
	render: () => (
		<ChartShell header="Vertical Bar Chart" footer="Data showing quarterly mortgage types by month">
			<BarChart data={data} height={400} layout="vertical" />
		</ChartShell>
	),
	parameters: {
		docs: {
			description: {
				story: 'Vertical bar chart with bars extending from bottom to top, showing grouped monthly data.',
			},
		},
	},
};

export const Simple = {
	render: () => (
		<ChartShell header="Simple Bar Chart" footer="Basic bar chart with single values">
			<BarChart data={simpleData} height={300} layout="horizontal" />
		</ChartShell>
	),
	parameters: {
		docs: {
			description: {
				story: 'Simple bar chart with single values per category. Perfect for basic data visualization needs.',
			},
		},
	},
};

export const Grouped = {
	render: () => (
		<ChartShell header="Grouped Bar Chart" footer="Grouped bars by category">
			<BarChart data={data} height={300} layout="horizontal" />
		</ChartShell>
	),
	parameters: {
		docs: {
			description: {
				story: 'Grouped bar chart with bars side by side for each category.',
			},
		},
	},
};

export const Stacked = {
	render: () => (
		<ChartShell header="Stacked Bar Chart" footer="Stacked bars by category">
			<BarChart data={stackedData} height={300} layout="stacked" />
		</ChartShell>
	),
	parameters: {
		docs: {
			description: {
				story: 'Stacked bar chart with bars stacked on top of each other with decreasing width and opacity.',
			},
		},
	},
};
