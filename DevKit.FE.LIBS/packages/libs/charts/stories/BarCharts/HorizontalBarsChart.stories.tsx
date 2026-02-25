import { ChartShell, HorizontalBarsChart } from '../../src/default';

const data = [
	{ name: 'New mortgage', value: 39779 },
	{ name: 'Release mortgage', value: 56635 },
	{ name: 'Cancel', value: 76331 },
	{ name: 'Transfer Ownership', value: 43887 },
	{ name: 'Transfer mortgage', value: 19027 },
	{ name: 'Tour Certificate', value: 8142 },
	{ name: 'Transfer Vehicle Emirate', value: 4918 },
];

const StoryMeta = {
	title: 'Charts/HorizontalBarsChart',
	component: HorizontalBarsChart,
};

export default StoryMeta;

export const Default = {
	render: () => (
		<ChartShell header="Bar Chart" footer="Footer">
			<HorizontalBarsChart data={data} height={250} />
		</ChartShell>
	),
};
