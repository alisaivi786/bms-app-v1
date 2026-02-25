import React from 'react';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import { ProgressBar } from '../../src/components/ProgressBar';
import { ProgressBarProps } from '../../src/components/ProgressBar/ProgressBar.types';

type ComponentType = (args: ProgressBarProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => <ProgressBar {...args} />;

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Components/ProgressBar',
	component: ProgressBar,
	render: Template,
};

export default StoryMeta;

export const Default = {
	args: {
		progress: 80,
		size: 'medium',
	},
};

export const Small = {
	args: {
		progress: 40,
		size: 'small',
	},
};

export const Large = {
	args: {
		progress: 65,
		size: 'large',
	},
};

export const ZeroProgress = {
	args: {
		progress: 0,
		size: 'medium',
	},
};
