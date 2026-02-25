'use client';

import clsx from 'clsx';
import { useEffect, useId } from 'react';
import { AgAddPlusCircleIcon, SfCameraFillIcon } from '@devkit/icons/web';
import { Button } from '../../Buttons';
import { CameraModal } from './CameraModal';
import { Thumbnail } from './Thumbnail';
import { UploadFileVariant } from './UploadFileInput';
import { useUploadInputContext } from './upload-input-context';

export const Actions = ({
	isEdit = false,
	setIsEditModalOpen,
}: {
	isEdit?: boolean;
	setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const {
		variant,
		messages,
		showCamera,
		setShowCamera,
		disabled,
		buttonVariant,
		onEditingFileChange,
		onChange,
		getInputProps,
		setIsEdit,
		editModalGetInputProps,
		showTakePicture,
		showFileUpload,
	} = useUploadInputContext();
	const textColor = disabled ? 'text-gray-500' : 'text-gray-600';
	const {
		maxFileSize,
		supportedFileTypes,
		buttonText,
		takePictureButtonText,
		editModalButtonText,
		editModalTakePictureButtonText,
		browse,
		browsePrefixText,
		editModalBrowse,
		editModalBrowsePrefixText,
	} = messages ?? {
		maxFileSize: undefined,
		supportedFileTypes: undefined,
		buttonText: undefined,
		takePictureButtonText: undefined,
		useCamera: undefined,
		cameraPermissions: undefined,
		permissionDenied: undefined,
		allowAccess: undefined,
		browse: undefined,
		browsePrefixText: undefined,
		editModalBrowse: undefined,
		editModalBrowsePrefixText: undefined,
	};
	const id = useId();

	useEffect(() => {
		setIsEdit(isEdit);
	}, [isEdit]);

	const canUpload = showFileUpload !== false;
	const canTakePicture = showTakePicture !== false;
	const noActionsConfigured = !canUpload && !canTakePicture;
	const isInactive = disabled || noActionsConfigured;
	const clickableId = isInactive ? undefined : id ?? 'upload_file';

	const prefixText = isEdit ? editModalBrowsePrefixText : browsePrefixText;
	const browseText = isEdit ? editModalBrowse : browse;

	return (
		<div className="flex flex-col gap-y-4">
			<input
				type="file"
				hidden
				value=""
				id={id}
				disabled={isInactive || !canUpload}
				{...(isEdit ? editModalGetInputProps() : getInputProps())}
			/>
			{(variant === UploadFileVariant.FormInput || variant === UploadFileVariant.Thumbnail || isEdit) && (
				<div className={clsx('text-caption1 text-center', textColor)}>
					<p>{maxFileSize}</p>
					<p>{supportedFileTypes}</p>
				</div>
			)}

			{variant === UploadFileVariant.ImageCard ? (
				<div className="flex flex-row gap-3 items-center">
					<Thumbnail setIsEditModalOpen={setIsEditModalOpen} />

					<div className="flex flex-row gap-2 items-center bg-gray-100 p-4 rounded-lg">
						{canTakePicture && (
							<SfCameraFillIcon
								className={
									isInactive
										? 'text-gray-400 cursor-not-allowed min-w-5 min-h-5'
										: 'text-brand-600 cursor-pointer min-w-5 min-h-5'
								}
								onClick={() => {
									if (!isInactive) setShowCamera?.(true);
								}}
							/>
						)}
						{canUpload && !canTakePicture && (
							<label htmlFor={clickableId}>
								<AgAddPlusCircleIcon
									className={
										isInactive
											? 'text-gray-400 cursor-not-allowed min-w-5 min-h-5'
											: 'text-brand-600 cursor-pointer min-w-5 min-h-5'
									}
								/>
							</label>
						)}
						<div className="flex flex-row items-center text-right">
							<label className="text-paragraph">
								{prefixText}{' '}
								{canUpload && !noActionsConfigured && (
									<label
										className={clsx(
											'text-paragraph',
											isInactive ? 'text-gray-400 cursor-not-allowed' : 'text-brand-600'
										)}
										htmlFor={clickableId}
									>
										{browseText}
									</label>
								)}
							</label>
						</div>
					</div>
				</div>
			) : (
				<div className="flex justify-center gap-4">
					{canUpload && (
						<Button size="small" variant={buttonVariant ?? 'primary'} disabled={isInactive} htmlFor={clickableId}>
							{isEdit ? editModalButtonText : buttonText}
						</Button>
					)}
					{canTakePicture && (
						<Button
							size="small"
							variant="secondary"
							onClick={() => {
								if (!isInactive) setShowCamera?.(true);
							}}
							disabled={isInactive}
						>
							{isEdit ? editModalTakePictureButtonText : takePictureButtonText}
						</Button>
					)}
				</div>
			)}
			<CameraModal
				isOpen={!!showCamera}
				onClose={() => {
					setShowCamera && setShowCamera(false);
				}}
				onSuccess={(file: File) => {
					if (isEdit) onEditingFileChange(file, undefined, true);
					else onChange(file, undefined, true);

					setShowCamera && setShowCamera(false);
				}}
				id={id}
			/>
		</div>
	);
};
