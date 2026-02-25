'use client';

import { useEffect, useState } from 'react';
import { Document, Page, Thumbnail, pdfjs } from 'react-pdf';
import { DocumentCallback } from 'react-pdf/dist/cjs/shared/types';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { logger } from '@devkit/utilities';
import { Spinner } from '../../Spinner';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const setPdfPreviewWorkerSrc = (newUrl: string) => {
	pdfjs.GlobalWorkerOptions.workerSrc = newUrl;
};

export const PdfPreview = ({
	fileUrl,
	width,
	height,
	pageNumber = 1,
	onPdfLoaded,
	isThumbnail,
}: {
	fileUrl: File | undefined | string;
	width: number;
	height: number;
	pageNumber?: number;
	onPdfLoaded?: () => void;
	isThumbnail?: boolean;
}) => {
	const [pdfPageSize, setPdfPageSize] = useState<{
		width: number;
		height: number;
	}>();

	useEffect(() => {
		logger.log('[PdfPreview] pdfPageSize change', pdfPageSize);
	}, [pdfPageSize]);

	async function onDocumentLoadSuccess(pdf: DocumentCallback): Promise<void> {
		logger.log('[PdfPreview] Document onLoadSuccess', pdf, pdf?.numPages);

		const { getPage } = pdf;

		if (pdf.numPages > 0) {
			try {
				const pdfPage = await getPage.call(pdf, pageNumber);
				const { width: pdfWidth, height: pdfHeight } = pdfPage.getViewport();

				logger.log('[PdfPreview] Document getViewport', pdfWidth, pdfHeight);

				if (!isNaN(pdfWidth) && !isNaN(pdfHeight)) {
					logger.log('[PdfPreview] Document getViewport is valid', pdfWidth, pdfHeight);

					if (width > height) {
						setPdfPageSize({
							width,
							height: (height * pdfHeight) / pdfWidth,
						});
					} else {
						setPdfPageSize({
							height,
							width: (width * pdfWidth) / pdfHeight,
						});
					}
				}
			} catch (e) {
				logger.log('[PdfPreview] catch error while getting page', e);
			}

			onPdfLoaded?.();
		}
	}

	return (
		<Document
			loading={
				<div className="flex w-full items-center justify-center ">
					<Spinner borderWidth={2} size={17.5} />
				</div>
			}
			error={<div>An error occurred!</div>}
			onLoadProgress={() => setPdfPageSize(undefined)}
			onLoadError={() => {
				logger.log('[PdfPreview] Document onLoadError');
			}}
			onSourceError={() => {
				logger.log('[PdfPreview] Document onSourceError');
			}}
			onSourceSuccess={() => {
				logger.log('[PdfPreview] Document onSourceSuccess');
			}}
			noData={<div>No Data.</div>}
			file={fileUrl}
			onLoadSuccess={onDocumentLoadSuccess}
		>
			{isThumbnail ? (
				<Thumbnail
					pageNumber={pageNumber}
					width={pdfPageSize?.width ?? width}
					height={pdfPageSize?.height ?? height}
					error={<div>Thumbnail Error occurred!</div>}
					noData={<div>Thumbnail No Data!</div>}
					onLoadError={(err: Error) => {
						logger.log(['[PdfPreview] Thumbnail onLoadError', err]);
					}}
					onError={(err: Error) => {
						logger.log(['[PdfPreview] Thumbnail onError', err]);
					}}
					onRenderError={(err: Error) => {
						logger.log(['[PdfPreview] Thumbnail onRenderError', err]);
					}}
					onGetStructTreeError={(err: Error) => {
						logger.log(['[PdfPreview] Thumbnail onGetStructTreeError', err]);
					}}
					scale={1}
				/>
			) : (
				<>
					<Page
						key={`page_${pageNumber}`}
						className="!h-fit"
						pageNumber={pageNumber}
						width={pdfPageSize?.width ?? width}
						height={pdfPageSize?.height ?? height}
						error={<div>Page Error occurred!</div>}
						noData={<div>Page No Data!</div>}
						onLoadError={(err: Error) => {
							logger.log(['[PdfPreview] Page onLoadError', err]);
						}}
						onError={(err: Error) => {
							logger.log(['[PdfPreview] Page onError', err]);
						}}
						onRenderError={(err: Error) => {
							logger.log(['[PdfPreview] Page onRenderError', err]);
						}}
						onGetStructTreeError={(err: Error) => {
							logger.log(['[PdfPreview] Page onGetStructTreeError', err]);
						}}
						onGetTextError={(err: Error) => {
							logger.log(['[PdfPreview] Page onGetTextError', err]);
						}}
						renderAnnotationLayer={false}
						renderTextLayer={false}
						scale={1}
					/>
				</>
			)}
		</Document>
	);
};
