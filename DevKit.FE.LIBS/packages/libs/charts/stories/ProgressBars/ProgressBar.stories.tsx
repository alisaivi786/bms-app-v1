import { ProgressBar } from '../../src/default';

const data = [
	{ label: 'Ajman', count: 1480, percentage: 60 },
	{ label: 'Ras Al Khaimah', count: 5480, percentage: 70 },
	{ label: 'Umm Al Quwain', count: 4807, percentage: 80 },
	{ label: 'Sharjah', count: 3678, percentage: 75 },
	{ label: 'Fujairah', count: 2645, percentage: 30 },
];

const StoryMeta = {
	title: 'Charts/ProgressBar',
	component: ProgressBar,
};

export default StoryMeta;

export const Default = {
	render: () => (
		<ProgressBar
			data={data}
			columns={[
				{ key: 'label', title: 'Emirates' },
				{ key: 'count', title: 'No. of Transactions' },
				{ key: 'percentage', title: '' },
			]}
		/>
	),
};
