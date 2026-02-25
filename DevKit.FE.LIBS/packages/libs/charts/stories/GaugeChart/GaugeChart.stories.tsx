import { ChartShell, GaugeChart, GaugeChartData } from '../../src/default';

const data = [
	{ name: 'Approved', value: 422 },
	{ name: 'Rejected', value: 521 },
] as GaugeChartData;

const StoryMeta = {
	title: 'Charts/GaugeChart',
	component: GaugeChart,
};

export default StoryMeta;

export const Default = {
	render: () => (
		<ChartShell>
			<GaugeChart data={data} />
		</ChartShell>
	),
};
