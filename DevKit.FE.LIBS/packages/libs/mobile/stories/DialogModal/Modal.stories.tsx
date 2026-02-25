import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { Button } from '../../src/components/Buttons';
import Modal from '../../src/components/DialogModal/Modal';

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
			<Modal isOpen={isOpen} snapPoints={args.snapPoints} onClose={() => setIsOpen(false)}>
				<Text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat mauris vitae ante tempor consequat.
					Maecenas sed risus vitae velit gravida mattis ut eu ligula. Curabitur in ipsum non sem pharetra fringilla.
					Nulla consectetur rutrum nulla, vel malesuada mi venenatis ac. Curabitur a magna tristique, semper erat vel,
					venenatis erat. Maecenas porttitor tristique risus, id mattis lacus dignissim condimentum. Phasellus nibh
					risus, euismod finibus lobortis eget, dictum id enim. Vestibulum condimentum sapien eu viverra hendrerit. Duis
					at augue in ex feugiat fermentum vitae vehicula elit. Nunc lectus tellus, congue eget ligula quis, bibendum
					accumsan libero. In mattis lacus enim, sit amet volutpat ipsum placerat eu. Aliquam neque ligula, facilisis ut
					velit nec, euismod placerat velit. Duis ac magna lectus. Suspendisse maximus tempus porta.
				</Text>
			</Modal>
		</View>
	);
};

const StoryMeta: Meta = {
	title: 'Mobile/Components/DialogModal',
	component: Template,
	args: {},
};

export default StoryMeta;

export const devkitModal: StoryObj = {};
