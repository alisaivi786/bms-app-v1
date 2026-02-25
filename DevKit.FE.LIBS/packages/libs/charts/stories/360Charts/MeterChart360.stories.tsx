import { GaugeIcon } from 'lucide-react';
import { MeterChart, MeterChartData } from '../../src/360-charts/charts/MeterChart';
import { ChartDisplayCard } from '../../src/360-charts/components/ChartDisplayCard';

interface InteractiveArgs {
	completedValue: number;
	remainingValue: number;
}

const forwardedApplicationsData: MeterChartData = [
	{ label: 'Forwarded', value: 3450 },
	{ label: 'Not Forwarded', value: 1200 },
];


const StoryMeta = {
	title: '360 Charts/MeterChart',
	component: MeterChart,
	argTypes: {
		completedValue: {
			control: { type: 'number', min: 0, max: 5000, step: 100 },
			description: 'Value for completed/forwarded items',
		},
		remainingValue: {
			control: { type: 'number', min: 0, max: 5000, step: 100 },
			description: 'Value for remaining/pending items',
		},
	},
};

export default StoryMeta;

export const Interactive = {
	render: (args: InteractiveArgs) => {
		const interactiveData: MeterChartData = [
			{ label: 'Completed', value: args.completedValue },
			{ label: 'Remaining', value: args.remainingValue },
		];

		return (
			<div className="p-6 bg-slate-50">
				<ChartDisplayCard
					title="Interactive Meter Chart"
					subtitle="Adjust values using controls"
					badgeText="2024"
					theme="blue"
					icon={GaugeIcon}
				>
					<MeterChart
						name="Progress"
						data={interactiveData}
						totalLabel="Total Items"
						legendTitle="Status Breakdown"
						showPercentage={true}
					/>
				</ChartDisplayCard>
			</div>
		);
	},
	args: {
		completedValue: 3450,
		remainingValue: 1200,
	},
	parameters: {
		docs: {
			description: {
				story: 'Interactive meter chart where you can adjust the completed and remaining values using controls.',
			},
		},
	},
};

export const Simple = {
	render: () => (
		<div className="p-6 bg-slate-50">
			<ChartDisplayCard
				title="Application Forwarding Rate"
				subtitle="Total applications processed"
				badgeText="Q4 2024"
				theme="blue"
				icon={GaugeIcon}
			>
				<MeterChart
					name="Forwarded"
					data={forwardedApplicationsData}
					totalLabel="Total Applications"
					legendTitle="Status Breakdown"
				/>
			</ChartDisplayCard>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Gauge/meter chart showing application forwarding rate with animated needle and gradient arc visualization.',
			},
		},
	},
};
