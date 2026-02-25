import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import { ISimpleStepperProps, SimpleStepper as SimpleStepperComp } from '../../src/components/Stepper';

const items = ['Quota', 'Summary', 'KYC', 'Payment', 'Complete'];

type ComponentType = (args: ISimpleStepperProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => (
	// eslint-disable-next-line react-native/no-inline-styles
	<SafeAreaView style={{ backgroundColor: '#fff', height: '100%' }}>
		{/* eslint-disable-next-line react-native/no-inline-styles */}
		<View style={{ margin: 20 }}>
			<SimpleStepperComp {...args} />
		</View>
	</SafeAreaView>
);

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Components/SimpleStepper',
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
