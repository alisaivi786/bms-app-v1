import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Button } from '../../../src/components/Buttons';
import { ImagePreview, ImagePreviewProps } from '../../../src/components/ImagePreview';

type ComponentType = (args: ImagePreviewProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [showImages, setShowImages] = useState(false);
	const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

	return (
		<>
			<div>
				<ImagePreview
					{...args}
					isOpen={showImages}
					onClose={() => {
						setShowImages(false);
					}}
					onlyFullScreen={args.onlyFullScreen}
					customActions={args.customActions}
					title={<h3>Image Title {activeImageIndex}</h3>}
					onActiveImageChange={setActiveImageIndex}
				/>
			</div>
			{!showImages && (
				<div>
					<Button
						onClick={() => {
							setShowImages(true);
						}}
					>
						Open Image Preview
					</Button>
				</div>
			)}
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/ImagePreview',
	render: Template,
	argTypes: {
		isOpen: { control: 'check', defaultValue: true },
	},
};

const imagesUrls = {
	main: 'https://images8.alphacoders.com/133/1337841.png',
	hero: 'https://www.shory.com/media/arucroqc/home-page_hero.webp',
	uaeLogo: 'https://business.shory.com/visit-visa-insurance/_next/static/media/UAE-logo.596652f7.svg',
	insuretech: 'https://www.shory.com/media/ao2kqvak/insuretech.webp',
	pdf: `${window.location.protocol}//${window.location.host}/784197250386485.pdf`,
};

export const Default: StoryObj<ComponentType> = {
	args: {
		isOpen: true,
		imageUrl: [
			imagesUrls.main,
			imagesUrls.hero,
			{ url: imagesUrls.pdf, pageNumber: 1 },
			{ url: imagesUrls.pdf, pageNumber: 2 },
			imagesUrls.uaeLogo,
			imagesUrls.insuretech,
			imagesUrls.pdf,
		],
		showThumbnails: true,
		height: 500,
	},
};

export const FullScreen: StoryObj<ComponentType> = {
	args: { onlyFullScreen: true, imageUrl: [imagesUrls.hero] },
};

export const WithCustomAction: StoryObj<ComponentType> = {
	args: {
		onlyFullScreen: true,
		showThumbnails: true,
		imageUrl: [
			{ url: imagesUrls.pdf, pageNumber: 1 },
			imagesUrls.main,
			imagesUrls.hero,
			imagesUrls.uaeLogo,
			{ url: imagesUrls.pdf, pageNumber: 2 },
		],
		customActions: <Button onClick={() => alert('Add custom action!')}>Edit</Button>,
	},
};

export const SingleImageWithZoomRotate: StoryObj<ComponentType> = {
	args: {
		onlyFullScreen: true,
		showControls: true,
		imageUrl: [imagesUrls.main],
	},
};

export const MultipleImageWithZoomRotate: StoryObj<ComponentType> = {
	args: {
		imageUrl: [
			{ url: imagesUrls.pdf, pageNumber: 1 },

			imagesUrls.main,
			imagesUrls.hero,
			imagesUrls.uaeLogo,
			{ url: imagesUrls.pdf, pageNumber: 2 },
		],
		showThumbnails: true,
		onlyFullScreen: true,
		showControls: true,
		customActions: <Button onClick={() => alert('Add custom action!')}>Edit</Button>,
	},
};

export default StoryMeta;
