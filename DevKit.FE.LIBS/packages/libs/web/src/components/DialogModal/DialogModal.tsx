import { ReactNode, useEffect, useState } from 'react';
import Button from '../Buttons/Button';
import { TextField } from '../TextField/TextField';
import { Modal } from './Modal';

export interface IDialogModalBaseProps {
	/** Title of the Dialog Modal */
	title?: string;
	/** Description of the Dialog Modal */
	description?: string;
	/** If true, the Dialog Modal will be shown. */
	isOpen: boolean;
	/** React elements to be rendered  */
	children?: ReactNode;
	/** Callback fired when the component requests to be closed.*/
	onClose: () => Promise<void> | void;
	/** Callback fired when the component requests to be canceled.*/
	onCancel?: () => Promise<void> | void;
	/**  Text to be rendered in the confirm's button */
	confirmBtnLabel?: string;
	/** Text to be rendered in the cancel button */
	cancelBtnLabel?: string;
}

export interface IDialogModalProps {
	/** Callback fired when the component requests to be confirmed.*/
	onConfirm?: () => Promise<void> | void;
	/** The input to be rendered within the content of the Dialog modal and you can pass these prop
	 * (enable, isRequired, label, errorMessage, maxLength, showCounter, and onLoading)
	 */
	confirmationInput?: {
		/** If true, the input element is enabled.*/
		enable?: false;
		/** If true, the input element is required.*/

		isRequired?: undefined;
		/**  Text to be rendered in the confirm's button */
		label?: undefined;
		/**  Text to be rendered in the error case */
		errorMessage?: undefined;
		/**	Maximum number of characters. */
		maxLength?: undefined;
		/** If true, the count of characters will be shown (count  countOfCharacters/maxLength).*/
		showCounter?: undefined;
		/** React elements to be rendered in the loading case */
		onLoading?: undefined;
	};
}

export interface IDialogModalWithInputProps {
	/** Callback fired when the component requests to be confirmed.*/
	onConfirm?: (inputMessage: string) => Promise<void> | void;
	/** The input to be rendered within the content of the Dialog modal and you can pass these prop
	 * (enable, isRequired, label, errorMessage, maxLength, showCounter, and onLoading)
	 */
	confirmationInput?: {
		/** If true, the input element is enabled.*/
		enable?: true;
		/** If true, the input element is required.*/
		isRequired?: boolean;
		/**  Text to be rendered in the confirm's button */
		label?: string;
		/**  Text to be rendered in the error case */
		errorMessage?: string;
		/**	Maximum number of characters. */
		maxLength?: number;
		/** If true, the count of characters will be shown (count  countOfCharacters/maxLength).*/
		showCounter?: boolean;
		/** React elements to be rendered in the loading case */
		onLoading?: ReactNode;
	};
}

export const DialogModal = ({
	title,
	description,
	isOpen,
	onClose,
	onCancel,
	onConfirm,
	confirmBtnLabel,
	cancelBtnLabel,
	confirmationInput: {
		enable: showConfirmationInput,
		isRequired: confirmationInputIsRequired,
		label: confirmationInputLabel,
		errorMessage: confirmationInputRequiredErrorMessage = 'This field is required',
		showCounter: confirmationInputShowCounter = true,
		maxLength: confirmationInputMaxLength = 200,
		onLoading: confirmationInputOnLoading,
	} = {},
	children,
}: IDialogModalBaseProps & (IDialogModalWithInputProps | IDialogModalProps)) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isCancelLoading, setIsCancelLoading] = useState(false);
	const [inputText, setInputText] = useState('');
	const [showError, setShowError] = useState(false);

	useEffect(() => {
		setShowError(false);
		setInputText('');
	}, [isOpen]);

	const onConfirmCall = async () => {
		if (isLoading || isCancelLoading) return;

		if (showConfirmationInput && !inputText) {
			setShowError(true);

			return;
		}

		try {
			setIsLoading(true);

			if (onConfirm) await onConfirm(inputText);
			setIsLoading(false);
			onClose();
		} catch {
			setIsLoading(false);
		}
	};

	const onCancelCall = async () => {
		if (isLoading || isCancelLoading) return;
		try {
			setIsCancelLoading(true);

			if (onCancel) await onCancel();
			setIsCancelLoading(false);
			onClose();
		} catch {
			setIsCancelLoading(false);
		}
	};

	const showCustomInputLoader = !!confirmationInputOnLoading && isLoading && showConfirmationInput;

	const showCustomChild = !!children;

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={title}
			description={description}
			footer={
				<>
					{!showCustomChild && (
						<div className="flex justify-center gap-5">
							<Button onClick={onConfirmCall} disabled={isLoading || isCancelLoading} isLoading={isLoading}>
								{confirmBtnLabel ?? 'Yes'}
							</Button>
							<Button
								variant="secondary"
								onClick={onCancelCall}
								disabled={isLoading || isCancelLoading}
								isLoading={isCancelLoading}
							>
								{cancelBtnLabel ?? 'Cancel'}
							</Button>
						</div>
					)}
				</>
			}
		>
			<>
				{showCustomInputLoader && confirmationInputOnLoading}
				{!showCustomInputLoader && showCustomChild && children}
				{!showCustomInputLoader && !showCustomChild && showConfirmationInput && (
					<TextField
						type="text-area"
						value={inputText}
						onChange={(value) => {
							setShowError(false);
							setInputText(value ?? '');
						}}
						label={confirmationInputLabel}
						isRequired={confirmationInputIsRequired}
						errors={showError ? confirmationInputRequiredErrorMessage : undefined}
						showCharactersCounter={confirmationInputShowCounter}
						maxLength={confirmationInputMaxLength}
					/>
				)}
			</>
		</Modal>
	);
};
