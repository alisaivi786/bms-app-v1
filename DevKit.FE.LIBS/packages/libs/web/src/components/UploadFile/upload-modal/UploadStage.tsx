'use client';
import { useCallback } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { CloseIcon, FileIcon, UploadIcon } from '@devkit/icons/web';
import { TwLayoutClassName } from '@devkit/utilities';
import useDeviceDetect from '../../../hooks/useDeviceDetect';
import { Button } from '../../Buttons';
import { IFileUploaded } from '../common/types';

const UploadStage = ({
	uploadAreaLabel,
	value,
	onChange,
	maxSize,
	accept,
	chooseFileButtonText,
	onClear,
}: IFileUploaded) => {
	const { isMobileOrTablet } = useDeviceDetect();
	const onDrop = useCallback(async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
		await onChange(acceptedFiles[0], rejectedFiles[0]);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		noClick: true,
		onDrop,
		accept: accept,
		maxSize: (maxSize ?? 1) * 1048576,
		multiple: false,
	});

	if (!value)
		return (
			<>
				<input type="file" hidden value={value ? '' : undefined} id="upload_file" {...getInputProps()} />
				<div
					className={`rounded-xl border ${isDragActive ? 'nj-border-brand bg-brand-50' : 'border-gray-200'} `}
					{...getRootProps()}
				>
					<label
						htmlFor="upload_file"
						className="flex items-center justify-center w-full h-full p-4 font-medium pointer-events-none text-paragraph"
					>
						<div className="flex flex-col items-center justify-start gap-4">
							{isMobileOrTablet ? undefined : (
								<>
									<div className="flex items-center gap-2">
										<UploadIcon className={`h-6 w-6 ${isDragActive ? 'nj-text-brand' : 'text-black'}`} />

										<p className={`text-caption1 font-bold ${isDragActive ? 'nj-text-brand' : 'text-black'}`}>
											Drag and Drop
										</p>
									</div>

									<p
										className={`text-caption1 font-normal text-center ${
											isDragActive ? 'nj-text-brand' : 'text-gray-700'
										}`}
									>
										{uploadAreaLabel ?? 'Please choose a file'}
									</p>
								</>
							)}

							<Button
								htmlFor="upload_file"
								layoutClassName={
									` pointer-events-auto cursor-pointer rounded-md  nj-bg-brand px-8 py-2 text-white ${
										isDragActive ? 'opacity-30' : ''
									}` as TwLayoutClassName
								}
								size="small"
							>
								{chooseFileButtonText}
							</Button>
						</div>
					</label>
				</div>
			</>
		);

	return (
		<div className="border border-gray-200 rounded-md h-44">
			<div className="flex items-center justify-between h-full px-8 py-4">
				<section className="flex items-center overflow-hidden">
					<div className="pr-4">
						<FileIcon fontSize={40} />
					</div>
					<div className="mt-1 font-medium truncate text-paragraph">{value?.name}</div>
				</section>
				<section className="pl-4 mt-1 cursor-pointer text-paragraph">
					<CloseIcon fontSize={20} onClick={onClear} />
				</section>
			</div>
		</div>
	);
};

export default UploadStage;
