'use client';
import { CloseIcon } from '@devkit/icons/web';
import { Button } from '../../Buttons';
import { Modal } from '../../DialogModal';
import { FormFieldErrors } from '../../FormFieldErrors';
import { Actions } from './Actions';
import { PdfPreview } from './PdfPreview';
import { borderBasedOnStage } from './helper';
import { useUploadInputContext } from './upload-input-context';

export const EditModal = ({
	isOpen,
	onClose,
	onContinueClick,
	isPdf,
	setIsEditModalOpen,
}: {
	isOpen: boolean;
	onClose: () => void;
	onContinueClick: () => void;
	isPdf: boolean;
	setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const {
		messages,
		editingErrorMessage,
		currentEditStage,
		editingFile,
		isEditingDragActive,
		editingFilePreview,
		editModalRootProps,
	} = useUploadInputContext();
	const borderColor = borderBasedOnStage({
		currentStage: currentEditStage,
		hasError: Boolean(editingErrorMessage),
		isDragActive: isEditingDragActive,
		existFile: editingFile?.name ?? '',
	});

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="flex flex-col">
				<div className="flex justify-between items-center">
					<div>{editingFilePreview?.filePath && <label className="text-title">{messages?.editModalTitle}</label>}</div>
					<div className="cursor-pointer" onClick={onClose}>
						<CloseIcon className="text-caption1 " />
					</div>
				</div>

				{editingFilePreview?.filePath && (
					<div className="p-8 border-2 rounded-lg border-gray-200 mt-8">
						{isPdf ? (
							<div className="flex items-center justify-center w-full max-h-96 overflow-hidden object-contain p-0 ">
								<PdfPreview fileUrl={editingFilePreview?.filePath} width={200} height={120} />
							</div>
						) : (
							typeof editingFilePreview?.filePath == 'string' && (
								<img src={editingFilePreview?.filePath} className="w-full max-h-96 object-contain p-0" />
							)
						)}
					</div>
				)}

				<div className="py-8">
					<div>
						<label className="text-gray-700 text-caption1">{messages?.editModalDescription}</label>
					</div>
					<section
						className={`rounded-lg lg:rounded-xl border-2 border-dashed bg-gray-50 px-2 py-3 ${borderColor} `}
						{...editModalRootProps()}
					>
						{isEditingDragActive}
						<div className="flex items-center justify-center w-full h-full">
							<div className="flex h-full w-full items-center justify-center flex-col gap-y-4">
								<Actions isEdit={true} setIsEditModalOpen={setIsEditModalOpen} />
							</div>
						</div>
					</section>
					<FormFieldErrors errors={editingErrorMessage} />
				</div>

				<Button variant="primary" onClick={onContinueClick}>
					{messages?.editModalConfirm}
				</Button>
			</div>
		</Modal>
	);
};
