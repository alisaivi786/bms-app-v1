import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import Button from '../../../src/components/Buttons/Button';
import {
	DialogModal,
	IDialogModalBaseProps,
	IDialogModalProps,
	IDialogModalWithInputProps,
} from '../../../src/components/DialogModal/DialogModal';

type ComponentType = (args: IDialogModalBaseProps & (IDialogModalWithInputProps | IDialogModalProps)) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<DialogModal {...args} isOpen={open} onClose={() => setOpen(false)} />
			<Button onClick={() => setOpen(true)}>Open Modal</Button>
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/Dialog Modal',
	component: DialogModal,
};

export default StoryMeta;

export const Default: StoryObj<ComponentType> = {
	render: Template,
	args: {
		title: 'Are you sure you want to download?',
	},
};

export const Loader: StoryObj<ComponentType> = {
	render: Template,
	args: {
		title: 'Are you sure you want to download?',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat mauris vitae ante tempor consequat. Maecenas sed risus vitae velit gravida mattis ut eu ligula. Curabitur in ipsum non sem pharetra fringilla. Nulla consectetur rutrum nulla, vel malesuada mi venenatis ac. Curabitur a magna tristique, semper erat vel, venenatis erat. Maecenas porttitor tristique risus, id mattis lacus dignissim condimentum. Phasellus nibh risus, euismod finibus lobortis eget, dictum id enim. Vestibulum condimentum sapien eu viverra hendrerit. Duis at augue in ex feugiat fermentum vitae vehicula elit. Nunc lectus tellus, congue eget ligula quis, bibendum accumsan libero. In mattis lacus enim, sit amet volutpat ipsum placerat eu. Aliquam neque ligula, facilisis ut velit nec, euismod placerat velit. Duis ac magna lectus. Suspendisse maximus tempus porta.',
		onConfirm: async () => {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve();
				}, 1000);
			}) as Promise<void> | void;
		},
	},
};

export const AsyncCancel: StoryObj<ComponentType> = {
	render: Template,
	args: {
		title: 'Are you sure you want to download?',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat mauris vitae ante tempor consequat. Maecenas sed risus vitae velit gravida mattis ut eu ligula. Curabitur in ipsum non sem pharetra fringilla. Nulla consectetur rutrum nulla, vel malesuada mi venenatis ac. Curabitur a magna tristique, semper erat vel, venenatis erat. Maecenas porttitor tristique risus, id mattis lacus dignissim condimentum. Phasellus nibh risus, euismod finibus lobortis eget, dictum id enim. Vestibulum condimentum sapien eu viverra hendrerit. Duis at augue in ex feugiat fermentum vitae vehicula elit. Nunc lectus tellus, congue eget ligula quis, bibendum accumsan libero. In mattis lacus enim, sit amet volutpat ipsum placerat eu. Aliquam neque ligula, facilisis ut velit nec, euismod placerat velit. Duis ac magna lectus. Suspendisse maximus tempus porta.',
		onCancel: async () => {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve();
				}, 1000);
			});
		},
	},
};

export const Input: StoryObj<ComponentType> = {
	render: Template,
	args: {
		title: 'Are you sure you want to download?',
		onConfirm: async () => {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve();
				}, 1000);
			}) as Promise<void> | void;
		},
		confirmationInput: {
			enable: true,
			isRequired: true,
			label: 'Please enter a reason',
		},
	},
};

export const Children: StoryObj<ComponentType> = {
	render: Template,
	args: {
		title: 'Are you sure you want to download?',
		onConfirm: async () => {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve();
				}, 1000);
			}) as Promise<void> | void;
		},
		children: <div>Custom Text</div>,
	},
};
