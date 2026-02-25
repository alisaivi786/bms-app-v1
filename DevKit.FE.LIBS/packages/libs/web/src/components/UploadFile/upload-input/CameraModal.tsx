'use client';
import { ArrowLongLeftIcon } from '@devkit/icons/web';
import { useWebUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import { Modal } from '../../DialogModal';
import { Camera } from './Camera';
import { useUploadInputContext } from './upload-input-context';

export const CameraModal = ({
	isOpen,
	onClose,
	onSuccess,
	id,
}: {
	isOpen: boolean;
	onClose: () => void;
	onSuccess: (file: File) => void;
	id: string | undefined;
}) => {
	const { isRtlLocale } = useWebUIConfigOptions();
	const { label } = useUploadInputContext();

	return (
		<Modal isOpen={isOpen} onClose={onClose} variant="fullScreen">
			<div className="absolute h-full w-full flex flex-col top-0 left-0">
				<div className="flex w-full px-4 py-4 justify-start items-center bg-brand-50">
					<div className={`${isRtlLocale ? '-scale-x-100' : ''}`}>
						<ArrowLongLeftIcon fontSize={16} onClick={onClose} />
					</div>
					<label className="ml-2 w-full text-center">{label}</label>
				</div>
				<Camera onSuccess={onSuccess} id={id} />
			</div>
		</Modal>
	);
};
