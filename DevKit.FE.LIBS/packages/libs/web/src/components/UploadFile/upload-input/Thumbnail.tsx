'use client';

import { EditPencilIcon, FileIcon } from '@devkit/icons/web';
import { PdfPreview } from './PdfPreview';
import { ThumbnailImage } from './ThumbnailImage';
import { useUploadInputContext } from './upload-input-context';

export const Thumbnail = ({
	setIsEditModalOpen,
}: {
	setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { showThumbnail, file, existFile, currentFilePreview, isEditable, disabled, variant } = useUploadInputContext();

	const fileName = file?.name || existFile;
	const fileExt = fileName?.split('.').pop();
	const isPdf = fileExt?.toLowerCase() == 'pdf';
	const hasThumbnail = currentFilePreview?.thumbnailPath && showThumbnail;
	const isImageCardVariant = variant === 'image-card';

	return (
		<>
			<div
				className={`${hasThumbnail || isEditable ? 'h-16 flex' : 'h-10'} 
			${hasThumbnail ? 'w-16' : isEditable ? 'w-12' : 'w-12'} items-center ${
					disabled ? 'cursor-not-allowed' : isEditable ? 'cursor-pointer' : ''
				}
				 ${isImageCardVariant ? 'flex h-18 w-18' : ''}`}
				onClick={
					!disabled && isEditable && !isImageCardVariant
						? () => {
								setIsEditModalOpen(true);
						  }
						: undefined
				}
			>
				<div className="relative ">
					{showThumbnail && currentFilePreview?.thumbnailPath ? (
						<div
							className={`rounded-lg border-2 overflow-hidden bg-gray-50 w-12 h-12 border-gray-200 ${
								isImageCardVariant ? 'w-18 h-18 border-none bg-transparent' : ''
							}`}
						>
							{isPdf ? (
								<PdfPreview isThumbnail={true} fileUrl={currentFilePreview?.thumbnailPath} width={50} height={50} />
							) : (
								<ThumbnailImage
									thumbnailPath={
										typeof currentFilePreview?.thumbnailPath == 'string'
											? currentFilePreview?.thumbnailPath
											: URL.createObjectURL(currentFilePreview?.thumbnailPath)
									}
									customCss={isImageCardVariant ? 'w-18 h-18' : ''}
								/>
							)}
						</div>
					) : isEditable ? (
						<div className={`${isEditable ? 'h-16 w-13 items-center justify-end flex' : ''}`}>
							<FileIcon height="2em" width="2em" />
						</div>
					) : (
						<FileIcon height="2em" width="2em" />
					)}

					{isEditable && !isImageCardVariant && (
						<div
							className={`absolute   ${hasThumbnail ? '-top-1 ' : 'top-1 '} -end-1
						 bg-black p-0.5 rounded-full`}
						>
							<EditPencilIcon height="0.75em" width="0.75em" className="text-white" />
						</div>
					)}
				</div>
			</div>
		</>
	);
};
