import { ComponentType, useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Button } from '../../../src/components/Buttons';
import { IModalProps, Modal, BottomSheet as ModalBottomSheet } from '../../../src/components/DialogModal';

const Template: StoryFn<ComponentType> = (args) => {
	const [open, setOpen] = useState(false);

	const toggleHandler = () => {
		setOpen(!open);
	};

	return (
		<>
			<ModalBottomSheet {...args} isOpen={open} onClose={toggleHandler}>
				<div className="flex flex-col h-full max-h-full">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat mauris vitae ante tempor consequat.
					Maecenas sed risus vitae velit gravida mattis ut eu ligula. Curabitur in ipsum non sem pharetra fringilla.
					Nulla consectetur rutrum nulla, vel malesuada mi venenatis ac. Curabitur a magna tristique, semper erat vel,
					venenatis erat. Maecenas porttitor tristique risus, id mattis lacus dignissim condimentum. Phasellus nibh
					risus, euismod finibus lobortis eget, dictum id enim. Vestibulum condimentum sapien eu viverra hendrerit. Duis
					at augue in ex feugiat fermentum vitae vehicula elit. Nunc lectus tellus, congue eget ligula quis, bibendum
					accumsan libero. In mattis lacus enim, sit amet volutpat ipsum placerat eu. Aliquam neque ligula, facilisis ut
					velit nec, euismod placerat velit. Duis ac magna lectus. Suspendisse maximus tempus porta.Lorem ipsum dolor
					sit amet, consectetur adipiscing elit. Nulla volutpat mauris vitae ante tempor consequat. Maecenas sed risus
					vitae velit gravida mattis ut eu ligula. Curabitur in ipsum non sem pharetra fringilla. Nulla consectetur
					rutrum nulla, vel malesuada mi venenatis ac. Curabitur a magna tristique, semper erat vel, venenatis erat.
					Maecenas porttitor tristique risus, id mattis lacus dignissim condimentum. Phasellus nibh risus, euismod
					finibus lobortis eget, dictum id enim. Vestibulum condimentum sapien eu viverra hendrerit. Duis at augue in ex
					feugiat fermentum vitae vehicula elit. Nunc lectus tellus, congue eget ligula quis, bibendum accumsan libero.
					In mattis lacus enim, sit amet volutpat ipsum placerat eu. Aliquam neque ligula, facilisis ut velit nec,
					euismod placerat velit. Duis ac magna lectus. Suspendisse maximus tempus porta.Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Nulla volutpat mauris vitae ante tempor consequat. Maecenas sed risus vitae velit
					gravida mattis ut eu ligula. Curabitur in ipsum non sem pharetra fringilla. Nulla consectetur rutrum nulla,
					vel malesuada mi venenatis ac. Curabitur a magna tristique, semper erat vel, venenatis erat. Maecenas
					porttitor tristique risus, id mattis lacus dignissim condimentum. Phasellus nibh risus, euismod finibus
					lobortis eget, dictum id enim. Vestibulum condimentum sapien eu viverra hendrerit. Duis at augue in ex feugiat
					fermentum vitae vehicula elit. Nunc lectus tellus, congue eget ligula quis, bibendum accumsan libero. In
					mattis lacus enim, sit amet volutpat ipsum placerat eu. Aliquam neque ligula, facilisis ut velit nec, euismod
					placerat velit. Duis ac magna lectus. Suspendisse maximus tempus porta.Lorem ipsum dolor sit amet, consectetur
					adipiscing elit. Nulla volutpat mauris vitae ante tempor consequat. Maecenas sed risus vitae velit gravida
					mattis ut eu ligula. Curabitur in ipsum non sem pharetra fringilla. Nulla consectetur rutrum nulla, vel
					malesuada mi venenatis ac.
				</div>
			</ModalBottomSheet>

			<Button onClick={toggleHandler}>Open Modal</Button>
		</>
	);
};

export const BottomSheet: StoryObj<ComponentType> = {
	render: Template,

	args: {
		title: 'Plan Details',
		variant: 'large',
		subTitle: <p>sub title </p>,
		hasCloseICon: true,
		hasDivider: true,
		height: '50rem',
		description: 'description',
		hideBottomSheetContentScroll: true,
	},
};

const StoryMeta: Meta<IModalProps> = {
	title: 'Web/Components/BottomSheet',
	component: Modal,
	argTypes: {
		position: {
			control: 'select',
			options: ['top', 'center'],
			defaultValue: 'top',
		},
		variant: {
			control: 'select',
			options: ['tiny', 'small', 'medium', 'large', 'extraLarge', 'fullScreen'],
			defaultValue: 'tiny',
		},
	},
};

export default StoryMeta;
