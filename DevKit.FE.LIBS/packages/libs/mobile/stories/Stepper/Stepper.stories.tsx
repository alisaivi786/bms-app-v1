import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import Button from '../../src/components/Buttons/Button';
import { IStepperProps, Stepper } from '../../src/components/Stepper';
import { useMobileUIConfigOptions } from '../../src/layouts/ThemeProvider/theme-context';

const ChildComponentExample = () => {
	const { tw } = useMobileUIConfigOptions();

	return (
		<View
			style={tw`flex flex-col items-start justify-between rounded-xl border border-gray-200 bg-gray-50 py-4 px-5 gap-2`}
		>
			<View style={tw`flex flex-col`}>
				<Text style={tw`text-paragraph capitalize text-gray-700`}>Company name</Text>
				<Text style={tw`pt-1 text-caption1 font-main-regular capitalize`}>National Properties LLC</Text>
			</View>

			<View style={tw`flex flex-col mt-6`}>
				<Text style={tw`text-paragraph capitalize text-gray-700`}>Trade License Number</Text>
				<Text style={tw`pt-1 text-caption1 capitalize`}>123456879</Text>
			</View>
		</View>
	);
};

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

const Template: StoryFn<ComponentType> = (args) => (
	// eslint-disable-next-line react-native/no-inline-styles
	<ScrollView style={{ backgroundColor: '#fff', height: '100%' }}>
		<Stepper {...args} />
	</ScrollView>
);

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Components/Stepper',
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
