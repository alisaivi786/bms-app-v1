import { Meta, StoryFn } from '@storybook/react-vite';
import { ISimpleStepperProps, SimpleStepper as SimpleStepperComp } from '../../../src/components/Stepper';

const items = ['Quota', 'Summary', 'KYC', 'Payment', 'Complete'];

type ComponentType = (args: ISimpleStepperProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => (
	<div className="my-5">
		<SimpleStepperComp {...args} />
	</div>
);

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/SimpleStepperComp',
	component: SimpleStepperComp,
	render: Template,
};

export default StoryMeta;
/** Use SimpleStepper for a horizontally aligned timeline component to show a series of data in a chronological order. */

export const SimpleStepper = {
	args: {
		items: items,
		current: 2,
	},
};

export const SimpleStepperVertical = {
	args: {
		items: items,
		current: 2,
		direction: 'vertical',
	},
};

export const SimpleStepperWithLabelDescription = {
	args: {
		items: [
			{
				title: 'STEP 1',
				description: 'Policy Details',
			},
			{
				title: 'STEP 2',
				description: 'Vessel Details',
			},
			{
				title: 'STEP 3',
				description: 'Owner Details',
			},
		],
		current: 2,
	},
};

export const VerticalSimpleStepperWithLabelDescription = {
	args: {
		items: [
			{
				title: 'STEP 1',
				description: 'Policy Details',
			},
			{
				title: 'STEP 2',
				description: 'Vessel Details',
			},
			{
				title: 'STEP 3',
				description: 'Owner Details',
			},
		],
		direction: 'vertical',
		current: 2,
	},
};

export const SimpleStepperBlackVariant = {
	args: {
		items: items,
		current: 3,
		showNumbers: true,
		variant: 'black',
		circleStyle: 'border',
	},
};
