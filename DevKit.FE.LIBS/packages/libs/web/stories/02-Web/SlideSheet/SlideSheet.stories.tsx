import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import Button from '../../../src/components/Buttons/Button';
import { Divider } from '../../../src/components/Divider';
import { ISlideSheetProps, SlideSheet } from '../../../src/components/SlideSheet';
import { Spinner } from '../../../src/components/Spinner';

type ComponentType = (args: ISlideSheetProps) => JSX.Element;

const MyCustomComponent = () => {
	return (
		<div className="flex flex-col grow gap-6">
			<div className="flex flex-col gap-1">
				<div className="flex justify-between items-center">
					<h3 className="font-bold">Add Dependent</h3>
					<p className="text-caption1 font-bold bg-yellow-100 py-1 px-4 rounded-md">category C</p>
				</div>
				<div className="text-caption1 text-gray-600">
					Please provide the dependent details under this principal sponsor
				</div>
			</div>
			<div className="flex justify-between">
				<p className="font-bold text-paragraph text-gray-600">Principle Member Details</p>
				<p className="font-bold text-paragraph">(Yassir Ahmad)</p>
			</div>
			<Divider />
			<div id="centerDiv" className="grow flex flex-col items-center justify-center gap-12">
				<Spinner size={100} borderWidth={3} />
				<p className="text-body font-medium text-center">Processing Please Wait Do not close this page</p>
			</div>
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

const Template: StoryFn<ComponentType> = (args) => {
	const [open, setOpen] = useState(false);

	const toggleHandler = () => {
		setOpen(!open);
	};

	return (
		<>
			<SlideSheet
				hasCloseICon
				{...args}
				isOpen={open}
				onClose={toggleHandler}
				footer={
					<div className="flex justify-between">
						<Button variant="secondary" size="small">
							Cancel
						</Button>
						<Button variant="primary" size="small">
							Save
						</Button>
					</div>
				}
			>
				<MyCustomComponent />
			</SlideSheet>

			<Button onClick={toggleHandler}>Open SlideSheet</Button>
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
		</>
	);
};

const StoryMeta: Meta<ISlideSheetProps> = {
	title: 'Web/Components/SlideSheet',
	component: SlideSheet,
};

export default StoryMeta;

export const Default: StoryObj<ComponentType> = {
	render: Template,

	args: {
		hasCloseICon: true,
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
