import { forwardRef, useImperativeHandle, useState } from 'react';
import {
	FlipHorizontalIcon,
	FlipVerticalIcon,
	RefreshIcon,
	RotateLeftIcon,
	RotateRightIcon,
	ZoomInIcon,
	ZoomOutIcon,
} from '@devkit/icons/web';
import { logger } from '@devkit/utilities';
import { PdfPreview } from '../UploadFile';
import ReactPanZoom from './ReactPanZoom';
import imageFeaturesStyles from './image-features.styles';
import { ImageFeatureRef, ImageFeaturesProps } from './types';

export const ImageFeatures = forwardRef<ImageFeatureRef, ImageFeaturesProps>(
	({ image, alt, showControls, isFullScreen, height, pageNumber }, ref) => {
		const [dx, setDx] = useState(0);
		const [dy, setDy] = useState(0);
		const [zoom, setZoom] = useState(1);
		const [rotation, setRotation] = useState(0);
		const [flipX, setFlipX] = useState(false);
		const [flipY, setFlipY] = useState(false);

		const resetAll = () => {
			setDx(0);
			setDy(0);
			setZoom(1);
			setRotation(0);
			setFlipX(false);
			setFlipY(false);
		};
		const zoomIn = () => {
			setZoom(zoom + 0.2);
		};

		const zoomOut = () => {
			if (zoom >= 1) {
				setZoom(zoom - 0.2);
			}
		};

		const rotateLeft = () => {
			if (rotation === -3) {
				setRotation(0);
			} else {
				setRotation(rotation - 1);
			}
		};

		const rotateRight = () => {
			if (rotation === 3) {
				setRotation(0);
			} else {
				setRotation(rotation + 1);
			}
		};

		const flipImageHorizontal = () => {
			setFlipX(!flipX);
		};

		const flipImageVertical = () => {
			setFlipY(!flipY);
		};
		let isPdf = false;

		try {
			const url = new URL(image);

			isPdf = typeof url.pathname === 'string' ? url.pathname.split('.')?.pop()?.toLowerCase() == 'pdf' : false;
		} catch (ex) {
			logger.log(ex);
		}

		const pdfWidth = isFullScreen ? 500 : 350;

		useImperativeHandle(ref, () => ({
			onReset: () => {
				resetAll();
			},
		}));

		return (
			<div className={imageFeaturesStyles.contentWrapper} style={{ height }}>
				{showControls && (
					<div
						style={{
							position: 'absolute',
							right: 0,
							zIndex: 2,
							top: 0,
							userSelect: 'none',
							borderRadius: 2,
							background: '#fff',
							boxShadow: '0px 2px 6px rgba(53, 67, 93, 0.32)',
						}}
					>
						<div className={imageFeaturesStyles.controlsIcons} onClick={zoomIn}>
							<ZoomInIcon fill="black" />
						</div>
						<div className={imageFeaturesStyles.controlsIcons} onClick={zoomOut}>
							<ZoomOutIcon />
						</div>
						<div className={imageFeaturesStyles.controlsIcons} onClick={rotateLeft}>
							<RotateLeftIcon />
						</div>
						<div className={imageFeaturesStyles.controlsIcons} onClick={rotateRight}>
							<RotateRightIcon />
						</div>
						<div className={imageFeaturesStyles.controlsIcons} onClick={flipImageHorizontal}>
							<FlipVerticalIcon />
						</div>
						<div className={imageFeaturesStyles.controlsIcons} onClick={flipImageVertical}>
							<FlipHorizontalIcon />
						</div>
						<div className={imageFeaturesStyles.controlsResetIcons} onClick={resetAll}>
							<RefreshIcon fill="black" />
						</div>
					</div>
				)}
				<div className={imageFeaturesStyles.panViewerContentWrapper}>
					<ReactPanZoom
						className={imageFeaturesStyles.panViewer}
						zoom={zoom}
						setZoom={
							showControls
								? setZoom
								: () => {
										return 1;
								  }
						}
						pandx={dx}
						pandy={dy}
						rotation={rotation}
						key={dx}
					>
						<div
							className={imageFeaturesStyles.panViewerImageContainer}
							style={{ transform: `rotate(${rotation * 90}deg) scaleX(${flipX ? -1 : 1}) scaleY(${flipY ? -1 : 1})` }}
						>
							{isPdf ? (
								<div
									className={imageFeaturesStyles.panViewerPdf}
									style={{
										objectFit: 'contain',
									}}
								>
									<PdfPreview
										fileUrl={image}
										width={pdfWidth}
										height={200}
										key={`pdf_preview_${pdfWidth}`}
										pageNumber={pageNumber}
									/>
								</div>
							) : (
								<img
									style={{
										objectFit: 'contain',
										width: '100%',
										height: '100%',
									}}
									src={image}
									alt={alt}
								/>
							)}
						</div>
					</ReactPanZoom>
				</div>
			</div>
		);
	}
);

ImageFeatures.displayName = 'ImageFeatures';
