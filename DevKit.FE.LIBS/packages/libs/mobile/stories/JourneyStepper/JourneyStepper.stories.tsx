import { SafeAreaView, Text } from 'react-native';
import { logger } from '@devkit/utilities';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import { JourneyStepper, JourneyStepperProps } from '../../src/components/JourneyStepper';

const sampleSteps = [
	{ title: 'Step 1', content: 'This is the first step' },
	{ title: 'Step 2', content: 'This is the second step' },
	{ title: 'Step 3', content: <Text style={{ color: 'blue' }}>Custom ReactNode description</Text> },
	{ title: 'Step 4' },
];

type ComponentType = (args: JourneyStepperProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => (
	// eslint-disable-next-line react-native/no-inline-styles
	<SafeAreaView style={{ backgroundColor: '#fff', height: '100%' }}>
		<JourneyStepper {...args} />
	</SafeAreaView>
);

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Components/JourneyStepper',
	component: JourneyStepper,
	render: Template,
};

export default StoryMeta;
/** Use VerticalStepper for a vertically aligned stepper component to show a series of steps with toggleable details. */

export const SimpleStepper = {
	args: {
		steps: sampleSteps,
		currentStepIndex: 2,
		onStepPress: (index: number) => logger.log(`Step ${index} pressed`),
	},
};

export const FirstStepActive = {
	args: {
		steps: sampleSteps,
		currentStepIndex: 0,
		onStepPress: (index: number) => logger.log(`Step ${index} pressed`),
	},
};

export const LastStepActive = {
	args: {
		steps: sampleSteps,
		currentStepIndex: 3,
		onStepPress: (index: number) => logger.log(`Step ${index} pressed`),
	},
};

export const SingleStep = {
	args: {
		steps: [{ title: 'Single Step', content: 'Only one step' }],
		currentStepIndex: 0,
		onStepPress: (index: number) => logger.log(`Step ${index} pressed`),
	},
};

export const NoDescriptions = {
	args: {
		steps: [{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }],
		currentStepIndex: 1,
		onStepPress: (index: number) => logger.log(`Step ${index} pressed`),
	},
};
