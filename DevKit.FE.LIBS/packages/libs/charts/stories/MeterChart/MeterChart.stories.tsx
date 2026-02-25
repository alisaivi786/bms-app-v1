import { ChartShell, MeterChart, MeterChartData } from '../../src/default';

const data: MeterChartData = [
	{ name: '2024', value: 55 },
	{ name: '2025', value: 20 },
];

const StoryMeta = {
	title: 'Charts/MeterChart',
	component: MeterChart,
};

export default StoryMeta;

export const Default = {
	render: () => (
		<ChartShell>
			<MeterChart data={data} height={340} />
		</ChartShell>
	),
};
