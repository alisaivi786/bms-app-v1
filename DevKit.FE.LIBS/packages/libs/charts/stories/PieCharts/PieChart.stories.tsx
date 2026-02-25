import { ChartShell, PieChart, PieDonutChartData } from '../../src/default';

const data = [
	{ name: 'Ras Al Khaimah', value: 10.4, count: 206, stats: 'increase' },
	{ name: 'Dubai', value: 10.4, count: 194, stats: 'increase' },
	{ name: 'Abu Dhabi', value: 10.4, count: 196, stats: 'decrease' },
	{ name: 'Sharjah', value: 48, count: 205, stats: 'increase' },
	{ name: 'Umm Al Quwain', value: 0, count: 199, stats: 'decrease' },
	{ name: 'Umm Al Quwain', value: 19.8, count: 199, stats: 'decrease' },
	{ name: 'Umm Al Quwain', value: 1, count: 199, stats: 'decrease' },
] as PieDonutChartData;


const StoryMeta = {
	title: 'Charts/PieChart',
	component: PieChart,
};

export default StoryMeta;

export const Default = {
	render: () => (
		<ChartShell header="Pie Chart - Donut" footer="Footer" sidebar={<div className="w-64">Sidebar</div>}>
			<PieChart data={data} height={350} />
		</ChartShell>
	),
};

export const Cards = {
	render: () => (
		<ChartShell header="Pie Chart - Donut" footer="Footer">
			<PieChart data={data} legendVariant="cards" height={300} />
		</ChartShell>
	),
};

export const Ring = {
	render: () => (
		<ChartShell header="Pie Chart - Ring" footer="Footer">
			<PieChart data={data} variant="ring" height={300} />
		</ChartShell>
	),
};

export const RingInside = {
	render: () => (
		<ChartShell header="Pie Chart - Ring" footer="Footer">
			<PieChart data={data} variant="ring" height={300} labelsPosition="inside" />
		</ChartShell>
	),
};
