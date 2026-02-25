import { ChartShell, LineChartMultiple } from '../../src/default';

const data = [
	{
		name: 'New Mortgage',
		series: [
			{ name: 'SEP', value: 42 },
			{ name: 'OCT', value: 35 },
			{ name: 'NOV', value: 58 },
			{ name: 'DEC', value: 40 },
			{ name: 'JAN', value: 64 },
			{ name: 'FEB', value: 68 },
		],
	},
	{
		name: 'Release Mortgage',
		series: [
			{ name: 'SEP', value: 28 },
			{ name: 'OCT', value: 18 },
			{ name: 'NOV', value: 34 },
			{ name: 'DEC', value: 24 },
			{ name: 'JAN', value: 31 },
			{ name: 'FEB', value: 44 },
		],
	},
];

const StoryMeta = {
	title: 'Charts/LineChartMultiple',
	component: LineChartMultiple,
};

export default StoryMeta;

export const Default = {
	render: () => (
		<ChartShell>
			<LineChartMultiple data={data} tooltipPrefix="AED" height={420} />
		</ChartShell>
	),
};
