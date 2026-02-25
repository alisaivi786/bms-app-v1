import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import Button from '../../../src/components/Buttons/Button';
import { IModalProps, Modal } from '../../../src/components/DialogModal/Modal';
import { ITabProps, TabNavigation } from '../../../src/components/TabNavigation/TabNavigation';

type ComponentType = (args: IModalProps) => JSX.Element;

const MyCustomComponent = ({ tabName }: { tabName: string }) => {
	return (
		<div>
			<p>{tabName}</p>
			<div>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat mauris vitae ante tempor consequat.
				Maecenas sed risus vitae velit gravida mattis ut eu ligula. Curabitur in ipsum non sem pharetra fringilla. Nulla
				consectetur rutrum nulla, vel malesuada mi venenatis ac. Curabitur a magna tristique, semper erat vel, venenatis
				erat. Maecenas porttitor tristique risus, id mattis lacus dignissim condimentum. Phasellus nibh risus, euismod
				finibus lobortis eget, dictum id enim. Vestibulum condimentum sapien eu viverra hendrerit. Duis at augue in ex
				feugiat fermentum vitae vehicula elit. Nunc lectus tellus, congue eget ligula quis, bibendum accumsan libero. In
				mattis lacus enim, sit amet volutpat ipsum placerat eu. Aliquam neque ligula, facilisis ut velit nec, euismod
				placerat velit. Duis ac magna lectus. Suspendisse maximus tempus porta.Lorem ipsum dolor sit amet, consectetur
				adipiscing elit. Nulla volutpat mauris vitae ante tempor consequat. Maecenas sed risus vitae velit gravida
				mattis ut eu ligula. Curabitur in ipsum non sem pharetra fringilla. Nulla consectetur rutrum nulla, vel
				malesuada mi venenatis ac. Curabitur a magna tristique, semper erat vel, venenatis erat. Maecenas porttitor
				tristique risus, id mattis lacus dignissim condimentum. Phasellus nibh risus, euismod finibus lobortis eget,
				dictum id enim. Vestibulum condimentum sapien eu viverra hendrerit. Duis at augue in ex feugiat fermentum vitae
				vehicula elit. Nunc lectus tellus, congue eget ligula quis, bibendum accumsan libero. In mattis lacus enim, sit
				amet volutpat ipsum placerat eu. Aliquam neque ligula, facilisis ut velit nec, euismod placerat velit. Duis ac
				magna lectus. Suspendisse maximus tempus porta.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
				volutpat mauris vitae ante tempor consequat. Maecenas sed risus vitae velit gravida mattis ut eu ligula.
				Curabitur in ipsum non sem pharetra fringilla. Nulla consectetur rutrum nulla, vel malesuada mi venenatis ac.
				Curabitur a magna tristique, semper erat vel, venenatis erat. Maecenas porttitor tristique risus, id mattis
				lacus dignissim condimentum. Phasellus nibh risus, euismod finibus lobortis eget, dictum id enim. Vestibulum
				condimentum sapien eu viverra hendrerit. Duis at augue in ex feugiat fermentum vitae vehicula elit. Nunc lectus
				tellus, congue eget ligula quis, bibendum accumsan libero. In mattis lacus enim, sit amet volutpat ipsum
				placerat eu. Aliquam neque ligula, facilisis ut velit nec, euismod placerat velit. Duis ac magna lectus.
				Suspendisse maximus tempus porta.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat mauris
				vitae ante tempor consequat. Maecenas sed risus vitae velit gravida mattis ut eu ligula. Curabitur in ipsum non
				sem pharetra fringilla. Nulla consectetur rutrum nulla, vel malesuada mi venenatis ac. Curabitur a magna
				tristique, semper erat vel, venenatis erat. Maecenas porttitor tristique risus, id mattis lacus dignissim
				condimentum. Phasellus nibh risus, euismod finibus lobortis eget, dictum id enim. Vestibulum condimentum sapien
				eu viverra hendrerit. Duis at augue in ex feugiat fermentum vitae vehicula elit. Nunc lectus tellus, congue eget
				ligula quis, bibendum accumsan libero. In mattis lacus enim, sit amet volutpat ipsum placerat eu. Aliquam neque
				ligula, facilisis ut velit nec, euismod placerat velit. Duis ac magna lectus. Suspendisse maximus tempus
				porta.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat mauris vitae ante tempor
				consequat. Maecenas sed risus vitae velit gravida mattis ut eu ligula. Curabitur in ipsum non sem pharetra
				fringilla. Nulla consectetur rutrum nulla, vel malesuada mi venenatis ac. Curabitur a magna tristique, semper
				erat vel, venenatis erat. Maecenas porttitor tristique risus, id mattis lacus dignissim condimentum. Phasellus
				nibh risus, euismod finibus lobortis eget, dictum id enim. Vestibulum condimentum sapien eu viverra hendrerit.
				Duis at augue in ex feugiat fermentum vitae vehicula elit. Nunc lectus tellus, congue eget ligula quis, bibendum
				accumsan libero. In mattis lacus enim, sit amet volutpat ipsum placerat eu. Aliquam neque ligula, facilisis ut
				velit nec, euismod placerat velit. Duis ac magna lectus. Suspendisse maximus tempus porta.Lorem ipsum dolor sit
				amet, consectetur adipiscing elit. Nulla volutpat mauris vitae ante tempor consequat. Maecenas sed risus vitae
				velit gravida mattis ut eu ligula. Curabitur in ipsum non sem pharetra fringilla. Nulla consectetur rutrum
				nulla, vel malesuada mi venenatis ac. Curabitur a magna tristique, semper erat vel, venenatis erat. Maecenas
				porttitor tristique risus, id mattis lacus dignissim condimentum. Phasellus nibh risus, euismod finibus lobortis
				eget, dictum id enim. Vestibulum condimentum sapien eu viverra hendrerit. Duis at augue in ex feugiat fermentum
				vitae vehicula elit. Nunc lectus tellus, congue eget ligula quis, bibendum accumsan libero. In mattis lacus
				enim, sit amet volutpat ipsum placerat eu. Aliquam neque ligula, facilisis ut velit nec, euismod placerat velit.
				Duis ac magna lectus. Suspendisse maximus tempus porta.
			</div>
		</div>
	);
};

const OutlineTabList: ITabProps[] = [
	{
		title: 'Benefits',
		tabPanel: () => <MyCustomComponent tabName="Benefits Tab" />,
	},
	{
		title: 'Network',
		tabPanel: () => <MyCustomComponent tabName="Network Tab" />,
	},
	{
		title: 'Exclusions',
		tabPanel: () => <MyCustomComponent tabName="Exclusions Tab" />,
	},
];

const Template: StoryFn<ComponentType> = (args) => {
	const [open, setOpen] = useState(false);
	const [selectedTab, setSelectedTab] = useState(0);

	const toggleHandler = () => {
		setOpen(!open);
	};

	return (
		<>
			<Modal {...args} isOpen={open} onClose={toggleHandler}>
				<div className="flex flex-col h-full max-h-full">
					<TabNavigation
						variant="filled"
						selectedTabIndex={selectedTab}
						onSelectedTabIndexChanged={(index) => {
							setSelectedTab(index);
						}}
						tabs={OutlineTabList}
					/>
				</div>
			</Modal>

			<Button onClick={toggleHandler}>Open Modal</Button>
		</>
	);
};

const StoryMeta: Meta<IModalProps> = {
	title: 'Web/Components/Modals',
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

export const Default: StoryObj<ComponentType> = {
	render: Template,

	args: {
		title: 'Plan Details',
		variant: 'large',
		subTitle: <p>sub title </p>,
		hasCloseICon: true,
		hasDivider: true,
		height: '50rem',
		description: 'description',
		footer: (
			<div className="flex flex-row items-center justify-end">
				<Button
					variant="primary"
					onClick={() => {
						alert('Clicked!');
					}}
				>
					Ok
				</Button>
			</div>
		),
	},
};
