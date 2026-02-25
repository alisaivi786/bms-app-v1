/* eslint-disable no-console */
import { useState } from 'react';
import { ArrowLongRightIcon, PlusIcon } from '@devkit/icons/web';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { LinkButton } from '../../../src/components/Buttons';
import Button from '../../../src/components/Buttons/Button';
import { ConfirmDialog, IConfirmDialogProps } from '../../../src/components/DialogModal/ConfirmDialog';

type ComponentType = (args: IConfirmDialogProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<ConfirmDialog {...args} isOpen={open} onClose={() => setOpen(false)} />
			<Button onClick={() => setOpen(true)}>Open Modal</Button>
		</>
	);
};

const StoryMeta: Meta<IConfirmDialogProps> = {
	title: 'Web/Components/Confirm Dialog Modal',
	component: ConfirmDialog,
	args: {
		isOpen: false,
	},
};

export default StoryMeta;

export const ConfirmDialogWithWarning: StoryObj<ComponentType> = {
	render: Template,
	args: {
		variant: 'warning',
		title: 'Do you want to keep the changes you made?',
		hasCancelBtn: true,
		orientation: 'vertical',
		hasCloseIcon: true,
		buttonGroup: [
			{
				label: 'Continue with changes',
				onClick: () => console.log('confirm'),
				variant: 'primary',
			},
			{
				label: 'Continue without changes',
				onClick: () => console.log('confirm'),
			},
		],
		cancelButton: {
			label: 'cancel',
			onClick: () => console.log('confirm'),
		},
	},
};

export const ConfirmDialogWithError: StoryObj<ComponentType> = {
	render: Template,
	args: {
		variant: 'error',
		title: 'Type you text',
		subTitle: 'Type your text',
		description: 'Type your main information here, short paragraph is better for user.',
		hasCancelBtn: false,
		hasCloseIcon: true,
		orientation: 'vertical',
		helperText: 'Edit',
		subHelperText: 'Please select the member name and edit any information',
		footer: (
			<div className="flex gap-2 w-full">
				<p className="text-gray-600 text-caption1 font-bold uppercase">Already have an account? </p>
				<LinkButton
					text="login"
					iconPosition="end"
					icon={ArrowLongRightIcon}
					className="font-bold text-caption1 uppercase"
				/>
			</div>
		),
		buttonGroup: [
			{
				label: 'Button label',
				onClick: () => console.log('confirm'),
				variant: 'primary',
				iconStart: PlusIcon,
			},
			{
				label: 'Button label',
				onClick: () => console.log('confirm'),
				iconStart: PlusIcon,
				iconEnd: PlusIcon,
			},
		],
	},
};

export const ConfirmDialogWithSuccess: StoryObj<ComponentType> = {
	render: Template,
	args: {
		variant: 'success',
		title: 'Member validated. Do you want to validate next members?',
		description: '2 members required editing',
		hasCancelBtn: true,
		buttonGroup: [
			{
				label: 'Edit Next',
				onClick: () => console.log('confirm'),
				variant: 'primary',
				layoutClassName: 'w-44',
			},
		],
		cancelButton: {
			label: 'Cancel',
			onClick: () => console.log('confirm'),
			layoutClassName: 'w-44',
		},
	},
};

export const ConfirmDialogWithSuccessWithOneButton: StoryObj<ComponentType> = {
	render: Template,
	args: {
		variant: 'success',
		description: (
			<p className="text-body">
				We sent email instructions on how to reset your mobile number to
				<span className="font-bold text-body">test@devkit.local</span>
			</p>
		),
		hasCancelBtn: false,
		buttonGroup: [
			{
				label: 'Done',
				onClick: () => console.log('confirm'),
				variant: 'primary',
			},
		],
	},
};

export const SendNewCode: StoryObj<ComponentType> = {
	render: Template,
	args: {
		variant: 'mobileError',
		title: 'Didn’t get a code?',
		description: 'It usually takes 1-2 minutes. If you still haven’t received the code, we’ll send you a new one.',
		hasCancelBtn: false,
		orientation: 'vertical',
		buttonGroup: [
			{
				label: 'Send New Code',
				onClick: () => console.log('confirm'),
				variant: 'primary',
			},
		],

		footer: (
			<p className="flex flex-row items-center justify-center gap-1 py-1 font-medium text-paragraph text-gray-600">
				Changed Your Mobile Number?{' '}
				<span className="font-medium cursor-pointer text-paragraph nj-text-brand">Reset</span>
			</p>
		),
	},
};
