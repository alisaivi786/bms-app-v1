import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { Button } from '../../src/components/Buttons';
import Modal from '../../src/components/DialogModal/Modal';
import { TextField } from '../../src/components/TextField';

const Template: StoryFn = (args) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Button
				onPress={() => {
					setIsOpen(true);
				}}
			>
				Open Modal
			</Button>
			<Modal
				isOpen={isOpen}
				snapPoints={args.snapPoints}
				title={args.title}
				subTitle={args.subTitle}
				description={args.description}
				content={args.content}
				footer={args.footer ? args.footer(setIsOpen) : null}
				onClose={() => setIsOpen(false)}
			/>
		</View>
	);
};

const StoryMeta: Meta = {
	title: 'Mobile/Components/DialogModal',
	component: Template,
	args: {
		snapPoints: ['40%'],
		title: 'Confirmation',
		subTitle: 'Please confirm your action',
		description: (
			<Text style={{ fontSize: 14, color: 'gray', textAlign: 'center' }}>
				This action cannot be undone. Make sure you have saved your work before proceeding.
			</Text>
		),
		content: (
			<Text style={{ fontSize: 16, padding: 10, textAlign: 'center' }}>
				This is the main content area of the modal. You can put any content here.
			</Text>
		),
		footer: (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => (
			<Button
				onPress={() => {
					setIsOpen(false);
				}}
			>
				OK
			</Button>
		),
	},
};

export default StoryMeta;

export const Default: StoryObj = {};

export const Confirmation: StoryObj = {
	render: Template,
	args: {
		title: 'Are you sure you want to download?',
		subTitle: null,
		description: (
			<Text style={{ fontSize: 14, color: 'gray', textAlign: 'center' }}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat mauris vitae ante tempor consequat.
				Maecenas sed risus vitae velit gravida mattis ut eu ligula. Curabitur in ipsum non sem pharetra fringilla. Nulla
				consectetur rutrum nulla, vel malesuada mi venenatis ac. Curabitur a magna tristique, semper erat vel, venenatis
				erat. Maecenas porttitor tristique risus, id mattis lacus dignissim condimentum. Phasellus nibh risus, euismod
				finibus lobortis eget, dictum id enim. Vestibulum condimentum sapien eu viverra hendrerit. Duis at augue in ex
				feugiat fermentum vitae vehicula elit. Nunc lectus tellus, congue eget ligula quis, bibendum accumsan libero. In
				mattis lacus enim, sit amet volutpat ipsum placerat eu. Aliquam neque ligula, facilisis ut velit nec, euismod
				placerat velit. Duis ac magna lectus. Suspendisse maximus tempus porta. Lorem ipsum dolor sit amet, consectetur
				adipiscing elit. Nulla volutpat mauris vitae ante tempor consequat. Maecenas sed risus vitae velit gravida
				mattis ut eu ligula. Curabitur in ipsum non sem pharetra fringilla. Nulla consectetur rutrum nulla, vel
				malesuada mi venenatis ac. Curabitur a magna tristique, semper erat vel, venenatis erat. Maecenas porttitor
				tristique risus, id mattis lacus dignissim condimentum. Phasellus nibh risus, euismod finibus lobortis eget,
			</Text>
		),
		content: <Text style={{ fontSize: 16, padding: 10, textAlign: 'center' }}>Testing content here</Text>,
		footer: (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => (
			<View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
				<Button onPress={() => setIsOpen(false)}>Yes</Button>
				<Button onPress={() => setIsOpen(false)}>No</Button>
			</View>
		),
	},
};

export const ConfirmationDialogWithoutFooter: StoryObj = {
	render: Template,
	args: {
		title: 'Are you sure you want to download?',
		subTitle: null,
		description: (
			<Text style={{ fontSize: 14, color: 'gray', textAlign: 'center' }}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat mauris vitae ante tempor consequat.
				Maecenas sed risus vitae velit gravida mattis ut eu ligula. Curabitur in ipsum non sem pharetra fringilla. Nulla
				consectetur rutrum nulla, vel malesuada mi venenatis ac. Curabitur a magna tristique, semper erat vel, venenatis
				erat. Maecenas porttitor tristique risus, id mattis lacus dignissim condimentum. Phasellus nibh risus, euismod
				finibus lobortis eget, dictum id enim. Vestibulum condimentum sapien eu viverra hendrerit. Duis at augue in ex
				feugiat fermentum vitae vehicula elit. Nunc lectus tellus, congue eget ligula quis, bibendum accumsan libero. In
				mattis lacus enim, sit amet volutpat ipsum placerat eu. Aliquam neque ligula, facilisis ut velit nec, euismod
				placerat velit. Duis ac magna lectus. Suspendisse maximus tempus porta. Lorem ipsum dolor sit amet, consectetur
				adipiscing elit. Nulla volutpat mauris vitae ante tempor consequat. Maecenas sed risus vitae velit gravida
				mattis ut eu ligula. Curabitur in ipsum non sem pharetra fringilla. Nulla consectetur rutrum nulla, vel
				malesuada mi venenatis ac. Curabitur a magna tristique, semper erat vel, venenatis erat. Maecenas porttitor
				tristique risus, id mattis lacus dignissim condimentum. Phasellus nibh risus, euismod finibus lobortis eget,
			</Text>
		),
		content: <Text style={{ fontSize: 16, padding: 10, textAlign: 'center' }}>Testing content here</Text>,
		footer: null,
	},
};

export const Information: StoryObj = {
	render: Template,
	args: {
		title: 'Please read the information carefully',
		subTitle: null,
		description: (
			<Text>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat mauris vitae ante tempor consequat.
				Maecenas sed risus vitae velit gravida mattis ut eu ligula. Curabitur in ipsum non sem pharetra fringilla. Nulla
				consectetur rutrum nulla, vel malesuada mi venenatis ac. Curabitur a magna tristique, semper erat vel, venenatis
				erat. Maecenas porttitor tristique risus, id mattis lacus dignissim condimentum. Phasellus nibh risus, euismod
				finibus lobortis eget, dictum id enim. Vestibulum condimentum sapien eu viverra hendrerit. Duis at augue in ex
				feugiat fermentum vitae vehicula elit. Nunc lectus tellus, congue eget ligula quis, bibendum accumsan libero. In
				mattis lacus enim, sit amet volutpat ipsum placerat eu. Aliquam neque ligula, facilisis ut velit nec, euismod
				placerat velit. Duis ac magna lectus. Suspendisse maximus tempus porta.
			</Text>
		),
		content: null,
	},
};

export const Input: StoryObj = {
	render: Template,
	args: {
		title: 'What is your age?',
		subTitle: null,
		description: null,
		content: (
			<View style={{ minHeight: 120 }}>
				<Text>Max age is 99</Text>
				<TextField />
			</View>
		),
		footer: (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => (
			<Button onPress={() => setIsOpen(false)}>Submit</Button>
		),
	},
};
