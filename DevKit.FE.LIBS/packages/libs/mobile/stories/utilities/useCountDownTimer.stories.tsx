import React from 'react';
import { Text, View } from 'react-native';
import { useCountDownTimer } from '@devkit/utilities';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const Template = () => {
	const { totalRemainingHours } = useCountDownTimer({ dueToDate: new Date('2025-01-01') });

	return (
		<View>
			<Text>Hours Remaining: {totalRemainingHours}</Text>
		</View>
	);
};

const UseCountDownTimerMeta: Meta<typeof Template> = {
	title: 'useCountDownTimer',
	component: Template,
};

export default UseCountDownTimerMeta;

export const UseCountDownTimer: StoryObj<typeof Template> = {};
