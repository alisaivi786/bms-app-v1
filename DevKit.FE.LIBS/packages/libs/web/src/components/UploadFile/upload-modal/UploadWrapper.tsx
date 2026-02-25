import { ReactNode } from 'react';
import { Alert } from '../../Alert';
import Button from '../../Buttons/Button';
import { Modal } from '../../DialogModal';
import { IButton } from '../common/types';

interface IUploadWrapper {
	isOpen?: boolean;
	onClose?: () => void;
	title: string;
	modalBody?: ReactNode;
	error: string | undefined;
	children: ReactNode;
	cancelButton: IButton;
	uploadButton: IButton;
	warningMessage?: string;
	hasCloseICon?: boolean;
}

const UploadWrapper = ({
	children,
	isOpen,
	onClose,
	title,
	modalBody,
	error,
	uploadButton,
	cancelButton,
	warningMessage,
	hasCloseICon = true,
}: IUploadWrapper) => {
	const isAlertHidden = !error && !warningMessage;

	return (
		<Modal
			isOpen={!!isOpen}
			onClose={() => onClose?.()}
			variant="small"
			hasCloseICon={hasCloseICon}
			hasDivider={false}
			title={title}
		>
			<section className="flex flex-col h-full gap-4 overflow-y-auto">
				<div className={`flex flex-col gap-y-2 ${isAlertHidden ? 'hidden' : ''}`} hidden={isAlertHidden}>
					<Alert severity="warning" isShown={!!warningMessage}>
						<div className="text-paragraph"> {warningMessage}</div>
					</Alert>

					<Alert severity="error" isShown={!!error}>
						<div className="text-paragraph">{error}</div>
					</Alert>
				</div>
				<div className="font-normal leading-5 text-paragraph">{modalBody}</div>
				{children}
				<div className="flex justify-end gap-x-4">
					<Button
						variant="secondary"
						disabled={cancelButton.disabled}
						layoutClassName="w-full"
						onClick={cancelButton.onClick}
						size="medium"
					>
						{cancelButton.label}
					</Button>
					<Button
						disabled={uploadButton.disabled}
						isLoading={uploadButton.isLoading}
						layoutClassName="w-full"
						onClick={uploadButton.onClick}
						size="medium"
					>
						{uploadButton.label}
					</Button>
				</div>
			</section>
		</Modal>
	);
};

export default UploadWrapper;
