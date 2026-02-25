import { ConfirmDialog } from '../../DialogModal';
import { TConfirmationContent } from '../common/types';

interface IUploadConfirmation {
	isOpen?: boolean;
	onClose?: () => void;
	confirmationContent: TConfirmationContent;
	successModalButton: string;
	errorModalButton: string;
}

const UploadConfirmation = (props: IUploadConfirmation) => {
	const { isOpen, onClose, successModalButton, errorModalButton, confirmationContent } = props;

	if (confirmationContent.variant === 'unsuccessful') {
		return <></>;
	}

	const title = confirmationContent.title;
	const isError = confirmationContent.variant === 'uploaded-with-error';

	return (
		<ConfirmDialog
			isOpen={!!isOpen}
			onClose={() => onClose?.()}
			variant={isError ? 'error' : 'success'}
			title={title}
			description={confirmationContent?.description}
			buttonGroup={[
				{
					label: isError ? errorModalButton : successModalButton,
					onClick: () => onClose?.(),
					variant: 'primary',
				},
			]}
		/>
	);
};

export default UploadConfirmation;
