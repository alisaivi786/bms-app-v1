'use client';

import { AgCloseCrossCircleDeleteIcon, EditPencilIcon, ThinCloseIcon } from '@devkit/icons/web';
import { Thumbnail } from './Thumbnail';
import { useUploadInputContext } from './upload-input-context';

const Success = ({ setIsEditModalOpen }: { setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const { variant, disabled, file, onCancelFile, existFile, isClearable, centerItems } = useUploadInputContext();

	if (variant === 'image-card') {
		return (
			<div className="w-full max-w-full">
				<div
					className={`flex flex-row items-center justify-between bg-gray-100 p-4 rounded-lg w-full gap-1 ${
						centerItems ? 'gap-6' : ''
					}`}
				>
					<div className="flex flex-row items-center gap-2.5 min-w-0 flex-1">
						<Thumbnail setIsEditModalOpen={setIsEditModalOpen} />
						<span className="text-paragraph text-black truncate min-w-0">{file?.name || existFile}</span>
					</div>
					<div className="flex flex-row gap-3 flex-shrink-0">
						<AgCloseCrossCircleDeleteIcon
							className="text-red-500 w-5 h-5 cursor-pointer"
							onClick={() => {
								!disabled && onCancelFile();
							}}
						/>
						<EditPencilIcon
							className="text-brand-600 w-5 h-5 cursor-pointer"
							onClick={() => {
								!disabled && setIsEditModalOpen(true);
							}}
						/>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`flex max-w-full  items-center ${centerItems ? 'justify-center' : 'justify-between min-w-full'}  ${
				variant === 'thumbnail' ? '' : ' gap-x-4 px-6 py-6'
			} h-24`}
		>
			<div className="flex  items-center overflow-hidden">
				<div className="flex  items-center ">
					<Thumbnail setIsEditModalOpen={setIsEditModalOpen} />
				</div>
				{variant != 'thumbnail' && (
					<div className="max-w-sm truncate break-all text-paragraph font-medium">{file?.name || existFile}</div>
				)}
			</div>
			{variant != 'thumbnail' && isClearable && (
				<div className={`w-3 text-caption1 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
					<ThinCloseIcon
						onClick={() => {
							!disabled && onCancelFile();
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default Success;
