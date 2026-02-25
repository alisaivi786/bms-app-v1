import React from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import useCountDownTimer from '../src/hooks/useCountDownTimer/index';

type ComponentType = (props: { dueToDate: Date }) => JSX.Element;

const Template: StoryFn<ComponentType> = ({ dueToDate }) => {
	const timeParts = useCountDownTimer({ dueToDate });

	return <div>{JSON.stringify(timeParts, null, 4)}</div>;
};

const StoryMeta: Meta = {
	title: 'Hooks/CountDownTimer',
	component: Template,
};

export default StoryMeta;

function getDefaultDate() {
	const date = new Date();

	date.setTime(date.getTime() + 10000);

	return date;
}

export const CountDownTimer: StoryObj<ComponentType> = {
	args: {
		dueToDate: getDefaultDate(),
	},
};
