import { Meta, StoryFn } from '@storybook/react-vite';
import Button from '../../../src/components/Buttons/Button';
import { IStepperProps, Stepper } from '../../../src/components/Stepper';

const ChildComponentExample = () => (
	<div className="flex w-full flex-row items-start justify-between rounded-xl border border-gray-200 bg-gray-50 py-4 px-5">
		<div className="flex flex-col">
			<p className="text-paragraph capitalize text-gray-700">Company name</p>
			<p className="pt-1 text-caption1 font-normal	capitalize">National Properties LLC</p>
		</div>

		<div className="flex flex-col">
			<p className="text-paragraph capitalize text-gray-700">Trade License Number</p>
			<p className="pt-1 text-caption1 capitalize">12345687</p>
		</div>

		<p className="text-paragraph capitalize nj-text-brand">Edit</p>
	</div>
);

const items = [
	{
		title: 'Step1',
		child: <ChildComponentExample />,
	},
	{
		title: 'Step 2',
		child: <Button>get started</Button>,
	},
	{
		title: 'Step 3 with some long title Step 3 with some long title',
		description:
			'Some desc text 2 Some desc text 2 Some desc text 2Some desc text 2Some desc text 2Some desc text 2Some desc text 2',
	},
	{
		title: 'Step 4',
		description:
			'Some desc text 2 Some desc text 2 Some desc text 2Some desc text 2Some desc text 2Some desc text 2Some desc text 2',
	},
	{
		title: 'Step 5',
	},
];

type ComponentType = (args: IStepperProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => <Stepper {...args} />;

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/Stepper',
	component: Stepper,
	render: Template,
};

export default StoryMeta;

/** Use Stepper component used to show a series of data entries with a title, description as a text,
 * and add any child element, with a vertical line and dots on the left side of the wrapper element */
export const StepperDefault = {
	args: {
		items: items,
		current: 2,
	},
};
