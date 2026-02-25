import React from 'react';
import { View } from 'react-native';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { Spinner as SpinnerComponent } from '../../src/components/Spinner/Spinner';

type ComponentType = typeof SpinnerComponent;

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Components/Spinner',
	component: SpinnerComponent,
	args: {
		size: 20,
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'secondary'],
		},
		state: {
			control: 'select',
			options: [undefined, 'danger', 'success'],
		},
	},
	decorators: [
		(Story) => (
			// eslint-disable-next-line react-native/no-inline-styles
			<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
				<Story />
			</View>
		),
	],
};

export default StoryMeta;

export const Default: StoryObj<ComponentType> = {
	args: {
		variant: 'primary',
	},
};
