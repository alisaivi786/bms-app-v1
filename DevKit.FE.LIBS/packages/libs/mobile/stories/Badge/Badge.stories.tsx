import React from 'react';
import { Text, View } from 'react-native';
import { SfArrowLeftIcon } from '@devkit/icons/native';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Badge } from '../../src/components/Badge';

const ButtonMeta: Meta<typeof Badge> = {
	title: 'Badge',
	component: Badge,
	argTypes: {
		title: { defaultValue: 'Hello world' },
		status: {
			name: 'Status',
			control: 'select',
			options: ['Success', 'Neutral', 'Warning', 'Critical', 'Info', 'NeutralGrey', 'NeutralLightGray'],
		},
		variant: {
			name: 'Variant',
			control: 'select',
			options: ['Default', 'Accent', 'Outline', 'AccentRounded', 'DefaultRounded', 'OutlineRounded'],
		},
		size: {
			name: 'Size',
			control: 'select',
			options: ['Small', 'Large'],
		},
		showIcon: { type: 'boolean', defaultValue: true },
	},
	args: {
		title: 'Hello world',
		status: 'Success',
		showIcon: true,
		variant: 'Default',
		size: 'Large',
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

export default ButtonMeta;

export const _1Default: StoryObj<typeof Badge> = {
	args: {},
};

export const _2CustomIcon: StoryObj<typeof Badge> = {
	args: { icon: SfArrowLeftIcon },
};

export const _3ReactNode: StoryObj<typeof Badge> = {
	args: {
		title: (
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<SfArrowLeftIcon />
				<Text>Hello world</Text>
			</View>
		),
	},
};
