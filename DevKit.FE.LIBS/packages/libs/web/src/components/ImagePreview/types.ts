export interface ImagePreviewProps {
	imageUrl: string | (string | { url: string; pageNumber?: number })[];
	title?: React.ReactNode;
	activeImageIndex?: number;
	isOpen: boolean;
	onClose: () => void;
	onlyFullScreen?: boolean;
	showThumbnails?: boolean;
	showControls?: boolean;
	customActions?: React.ReactNode;
	onActiveImageChange?: (activeImageIndex: number) => void;
	height?: number | string;
}

export interface ImageFeaturesProps {
	image: string;
	showControls?: boolean;
	alt?: string;
	width?: number;
	isFullScreen?: boolean;
	height?: number | string;
	pageNumber?: number;
}

export type ImageFeatureRef = {
	/**
	 * Method to trigger the form with custom button using ref.
	 * Will return the onReset which will reset the ImageFeature change on click of Image change.
	 *
	 */
	onReset: () => void;
};
