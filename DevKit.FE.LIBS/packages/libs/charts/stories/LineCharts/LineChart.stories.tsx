import { ChartShell, LineChart } from '../../src/default';

const data = [
	{ name: '08 May', value: 450 },
	{ name: '09 May', value: 310 },
	{ name: '10 May', value: 215 },
	{ name: '11 May', value: 50 },
	{ name: '12 May', value: 96 },
	{ name: '13 May', value: 160 },
	{ name: '14 May', value: 30 },
];

const StoryMeta = {
	title: 'Charts/LineChart',
	component: LineChart,
};

export default StoryMeta;

export const Default = {
	render: () => (
		<ChartShell header="Line Chart" footer="Footer">
			<LineChart data={data} height={500} />
		</ChartShell>
	),
};
