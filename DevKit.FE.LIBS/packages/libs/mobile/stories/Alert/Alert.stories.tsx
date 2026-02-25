import React, { useState } from 'react';
import { Text, View } from 'react-native';
import type { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { Button, useMobileUIConfigOptions } from '../../src';
import { Alert } from '../../src/components/Alert';

const Template: StoryFn = (args) => {
	const [isOpen, setIsOpen] = useState(true);

	const { isShown, severity, iconPosition, isClosable, children } = args;

	return (
		<View style={{ gap: 16 }}>
			<Alert
				isShown={isShown && isOpen}
				severity={severity}
				iconPosition={iconPosition}
				onClose={() => setIsOpen(false)}
				isClosable={isClosable}
			>
				{children}
			</Alert>

			<Button
				onPress={() => {
					setIsOpen(true);
				}}
			>
				Show Alert
			</Button>
		</View>
	);
};

const AlertMeta: Meta<typeof Alert> = {
	title: 'Mobile/Components/Alert',
	component: Template,
	argTypes: {
		severity: {
			name: 'Severity',
			control: 'select',
			options: ['warning', 'info', 'error', 'success'],
		},
		iconPosition: {
			name: 'Icon Position',
			control: 'select',
			options: ['center', 'start'],
		},
		isShown: { type: 'boolean', defaultValue: true },
		isClosable: { type: 'boolean', defaultValue: true },
	},
	args: {
		severity: 'success',
		isShown: true,
		isClosable: true,
		iconPosition: 'start',
	},
};

export default AlertMeta;

const AlertContent = ({ text }: { text: string }) => {
	const { tw } = useMobileUIConfigOptions();

	return (
		<View style={tw`shrink p-2`}>
			<Text style={tw`text-paragraph font-main-regular`}>{text}</Text>
		</View>
	);
};

export const _1Default: StoryObj<typeof Alert> = {
	args: {
		children: (
			<AlertContent
				text="You are currently not authorized. To save your progress, please login. You are currently not authorized. To
					save your progress, please login."
			/>
		),
		isClosable: true,
	},
};
export const _2WarningAlert: StoryObj<typeof Alert> = {
	args: {
		severity: 'warning',
		children: (
			<AlertContent text="You are currently not authorized. To save your progress, please login. You are currently not authorized. To save your progress, please login." />
		),
		iconPosition: 'center',
		isClosable: true,
	},
};

export const _3ErrorAlert: StoryObj<typeof Alert> = {
	args: {
		severity: 'error',
		children: (
			<AlertContent text="You are currently not authorized. To save your progress, please login. You are currently not authorized. To save your progress, please login." />
		),
		isClosable: false,
	},
};
