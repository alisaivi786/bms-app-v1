import React from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { Button } from '../../src';
import { ToastManager } from '../../src/components/Toast';
import { ToastOptions } from '../../src/components/Toast/Toast.types';
import { NOTES } from './Toast.constants';

type ComponentType = (
	args: ToastOptions & {
		text: string;
		severity: 'Error' | 'Warning' | 'Info' | 'Success';
	}
) => JSX.Element;

const Template: StoryFn<ComponentType> = ({ severity, text, ...options }) => {
	const methodName = `show${severity}` as keyof typeof ToastManager;

	return (
		<Button
			layoutClassName="mt-25"
			onPress={() => {
				ToastManager[methodName](text, options);
			}}
		>
			Show Toast
		</Button>
	);
};

const ToastMeta: Meta<typeof Template> = {
	title: 'Mobile/Components/Toast',
	component: Template,
	argTypes: {
		severity: {
			control: 'select',
			options: ['Error', 'Warning', 'Info', 'Success'],
		},
		position: {
			control: 'select',
			options: ['top', 'bottom'],
		},
		topOffset: {
			control: 'number',
		},
		bottomOffset: {
			control: 'number',
		},
		props: {
			name: 'isClosable',
			control: 'boolean',
			mapping: { true: { isClosable: true }, false: { isClosable: false } },
		},
	},
	parameters: {
		notes: NOTES,
	},
};

export default ToastMeta;

export const Default: StoryObj<typeof Template> = {
	args: {
		severity: 'Success',
		text: 'Sample Message',
		position: 'top',
		visibilityTime: 4000,
		autoHide: true,
		swipeable: false,
	},
};
