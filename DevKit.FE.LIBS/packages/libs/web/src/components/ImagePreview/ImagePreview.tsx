import { useEffect, useRef, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@devkit/icons/web';
import { logger } from '@devkit/utilities';
import { useHTMLElementObserver } from '../../hooks/useHTMLElementObserver';
import { Button } from '../Buttons';
import { Modal } from '../DialogModal';
import { PdfPreview } from '../UploadFile/upload-input/PdfPreview';
import { ImageFeatures } from './ImageFeatures';
import imagePreviewStyles from './image-preview.styles';
import { ImageFeatureRef, ImagePreviewProps } from './types';

const isPdf = (imageUrl: string): boolean => {
	try {
		const url = new URL(imageUrl);

		return typeof url.pathname === 'string' && url.pathname.split('.')?.pop()?.toLowerCase() == 'pdf';
	} catch (ex) {
		logger.log(ex);

		return false;
	}
};

const getImageUrl = (image: Exclude<ImagePreviewProps['imageUrl'], string[]>[number]): string =>
	typeof image === 'string' ? image : image.url;

const getPageNumber = (image: Exclude<ImagePreviewProps['imageUrl'], string[]>[number]): number =>
	typeof image === 'string' ? 1 : image.pageNumber ?? 1;

export const ImagePreview = ({
	imageUrl,
	title,
	isOpen,
	activeImageIndex = 0,
	onClose,
	onlyFullScreen = false,
	showThumbnails = false,
	showControls = false,
	customActions,
	onActiveImageChange,
	height,
}: ImagePreviewProps) => {
	const ImageFeatureRef = useRef<ImageFeatureRef>(null);
	const [isFullScreen, setIsFullScreen] = useState(onlyFullScreen);
	const [titleHeight, setTitleHeight] = useState(0);
	const [activeIndex, setActiveIndex] = useState(activeImageIndex);
	const imageUrlArray = Array.isArray(imageUrl) ? imageUrl : [imageUrl];
	const changeActiveImage = (newActiveIndex: number) => {
		setActiveIndex(newActiveIndex);
		onActiveImageChange?.(newActiveIndex);
	};
	const closeModal = () => {
		onClose();
	};

	useEffect(() => {
		changeActiveImage(0);
	}, [isOpen]);

	const { contentRef } = useHTMLElementObserver<HTMLDivElement>({
		onChange: (elem) => {
			setTitleHeight(elem.getBoundingClientRect().height);
		},
	});

	const imageFeaturesHeight = isFullScreen
		? `${
				showThumbnails ? `calc(100vh - 220px - ${titleHeight ?? 0}px)` : `calc(100vh - 120px - ${titleHeight ?? 0}px)`
		  }`
		: height ?? '100%';

	return (
		<Modal isOpen={isOpen} onClose={closeModal} variant={isFullScreen ? 'fullScreen' : 'small'}>
			<div className={imagePreviewStyles.contentWrapper(isFullScreen, !!title)}>
				<div ref={contentRef}>{title}</div>
				<div className={imagePreviewStyles.imageSliderContainer}>
					{imageUrlArray.length > 1 && (
						<ArrowLeftIcon
							className={imagePreviewStyles.imageSliderArrow(activeIndex === 0)}
							onClick={() => {
								if (activeIndex > 0) {
									changeActiveImage(activeIndex - 1);
								}
							}}
						/>
					)}
					<ImageFeatures
						height={imageFeaturesHeight}
						showControls={showControls}
						image={getImageUrl(imageUrlArray[activeIndex])}
						isFullScreen={isFullScreen}
						ref={ImageFeatureRef}
						pageNumber={getPageNumber(imageUrlArray[activeIndex])}
					/>
					{imageUrlArray.length > 1 && (
						<ArrowRightIcon
							className={imagePreviewStyles.imageSliderArrow(activeIndex === imageUrlArray.length - 1)}
							onClick={() => {
								if (activeIndex < imageUrlArray.length - 1) {
									changeActiveImage(activeIndex + 1);
								}
							}}
						/>
					)}
				</div>

				{showThumbnails && (
					<div className={imagePreviewStyles.thumbnailsContentWrapper}>
						<div className={imagePreviewStyles.thumbnailsContainer}>
							{imageUrlArray?.map((img, index) => {
								const imageUrl = getImageUrl(img);

								return isPdf(imageUrl) ? (
									<div
										className={imagePreviewStyles.thumbnailPdf(activeIndex === index)}
										key={`${img}${index}`}
										onClick={() => changeActiveImage(index)}
									>
										<PdfPreview fileUrl={imageUrl} width={60} height={60} pageNumber={getPageNumber(img)} />
									</div>
								) : (
									<img
										className={imagePreviewStyles.thumbnailImage(activeIndex === index)}
										key={`${imageUrl}${index}`}
										src={imageUrl}
										onClick={() => {
											changeActiveImage(index);
											ImageFeatureRef.current?.onReset();
										}}
									/>
								);
							})}
						</div>
					</div>
				)}

				<div className={imagePreviewStyles.customActionsContentWrapper}>
					<div className={imagePreviewStyles.customActionsContainer}>
						{customActions && <div>{customActions}</div>}

						<Button onClick={closeModal}>Close</Button>

						{!onlyFullScreen && (
							<Button
								onClick={() => {
									setIsFullScreen(!isFullScreen);
								}}
								isLoading={false}
							>
								{isFullScreen ? 'Close Full Screen' : 'Full Screen'}
							</Button>
						)}
					</div>
				</div>
			</div>
		</Modal>
	);
};
