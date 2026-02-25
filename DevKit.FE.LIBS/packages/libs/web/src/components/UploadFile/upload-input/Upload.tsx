'use client';

import { UploadIcon } from '@devkit/icons/web';
import useDeviceDetect from '../../../hooks/useDeviceDetect';
import { Actions } from './Actions';
import { useUploadInputContext } from './upload-input-context';

const Upload = ({ setIsEditModalOpen }: { setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const { isMobileOrTablet } = useDeviceDetect();
	const { variant, messages, disabled, centerItems } = useUploadInputContext();
	
	const textColor = disabled ? 'text-gray-500' : 'text-black';
	const alignmentClass = variant === 'image-card' && !centerItems ? 'justify-start' : 'justify-center';

	return (
		<div
			className={`flex h-full w-full items-center ${alignmentClass} ${
				variant === 'form-input' ? 'flex-col gap-y-4' : 'flex-row gap-x-2 lg:gap-x-3'
			} ${variant === 'image-card' ? '' : 'p-5'}`}
		>
			{isMobileOrTablet || variant === 'image-card' ? undefined : (
				<div className="hidden lg:flex items-center gap-2">
					<div className={`text-h3 font-normal ${textColor}`}>
						<UploadIcon />
					</div>
					<div className={`text-caption1 font-medium ${textColor}`}>{messages?.dragAreaText}</div>
				</div>
			)}
			<Actions setIsEditModalOpen={setIsEditModalOpen} />
		</div>
	);
};

export default Upload;
