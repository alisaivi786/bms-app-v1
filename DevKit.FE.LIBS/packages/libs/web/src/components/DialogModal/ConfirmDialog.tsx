import React from 'react';
import { CloseIcon, ErrorIcon, MobileWithErrorIcon, SfCheckmarkCircleFillIcon, WarningIcon } from '@devkit/icons/web';
import { TwLayoutClassName } from '@devkit/utilities';
import { useResponsiveView } from '../../hooks/useResponsiveView';
import { Button, ButtonSize } from '../Buttons';
import styles from './ConfirmDialog.styles';
import { Modal } from './Modal';

type TButton = {
	label: string;
	disabled?: boolean;
	loading?: boolean;
	layoutClassName?: TwLayoutClassName;
	size?: ButtonSize;
	onClick: () => Promise<void> | void;
	variant?: 'primary' | 'secondary';
	iconStart?: React.FC<React.SVGProps<SVGSVGElement>>;
	iconEnd?: React.FC<React.SVGProps<SVGSVGElement>>;
};

export type TConfirmDialogVariant = 'warning' | 'error' | 'success' | 'mobileError' | 'none';

export interface IConfirmDialogProps {
	/**
	 * Title of the Modal
	 */
	title?: string;
	/**
	 * React elements or text to be rendered beside the title
	 */
	description?: string | React.ReactNode;
	/**
	 * Footer of the Modal
	 */
	footer?: React.ReactNode;
	/** If true, the Modal will be shown. */
	isOpen: boolean;
	/**
	 * Variant (warning, error, success, mobileError or none)
	 */
	variant: TConfirmDialogVariant;
	/**  Callback function that implements closing/hiding the modal within another action   */
	onClose: () => void;
	/**  If true, cancel button will show.  */
	hasCancelBtn?: boolean;
	/**  If hasCancelBtn is true, the cancel button will be shown and you can pass these prop
	 *  label, disabled, loading, className, onClick, and variant
	 */
	cancelButton?: TButton;
	/**  Orientation of the buttonGroup and the footer and it will be shown either horizontal or vertical */
	orientation?: 'horizontal' | 'vertical';
	/** Group  of the buttons in the modal will show beside the footer*/
	buttonGroup: TButton[];
	/** If true, the cancel button will show. */
	hasCloseIcon?: boolean;
	subTitle?: string;
	helperText?: string;
	subHelperText?: string;
}

const iconsDependsOnVariant = {
	error: <ErrorIcon className={styles.errorVariant} />,
	warning: <WarningIcon className={styles.warningVariant} />,
	success: <SfCheckmarkCircleFillIcon className={styles.checkMarkCircleFillIcon} />,
	mobileError: <MobileWithErrorIcon className={styles.mobileIcon} />,
	none: '',
};

export const ConfirmDialog = ({
	isOpen,
	onClose,
	hasCloseIcon = false,
	variant,
	description,
	title,
	hasCancelBtn = false,
	buttonGroup,
	orientation = 'horizontal',
	cancelButton,
	footer,
	subTitle,
	helperText,
	subHelperText,
}: IConfirmDialogProps) => {
	const { sm: isMobile } = useResponsiveView();

	return (
		<Modal isOpen={isOpen} onClose={onClose} className={styles.modalClassName}>
			{hasCloseIcon && (
				<div className={styles.closeIconWrapper(isMobile)}>
					<div className={styles.closeIconContainerClassName} onClick={onClose}>
						<CloseIcon className={styles.closeIconClassName} />
					</div>
				</div>
			)}
			<div className={styles.dialogWrapper}>
				{iconsDependsOnVariant[variant]}
				<div className={styles.textWrapper}>
					{title && <h1 className={styles.titleClassNames(isMobile, variant)}>{title}</h1>}
					{(!!subTitle || !!description) && (
						<div className={styles.textContainer}>
							{subTitle && <span className={styles.subTitleClassName(isMobile)}>{subTitle}</span>}
							{description && <span className={styles.descriptionClassName(isMobile)}>{description}</span>}
						</div>
					)}
					{(!!helperText || !!subHelperText) && (
						<div className={styles.textContainer}>
							{helperText && <span className={styles.helperTextClassNames}>{helperText}</span>}
							{subHelperText && <span className={styles.subHelperTextClassNames}>{subHelperText}</span>}
						</div>
					)}
				</div>
				<div className={styles.buttonGroupWrapper(orientation, isMobile)}>
					{buttonGroup.map((button) => (
						<Button
							key={button.label}
							layoutClassName={isMobile ? 'w-full' : orientation === 'vertical' ? 'w-full' : 'w-32'}
							onClick={button.onClick}
							size={button.size ?? 'medium'}
							disabled={button.disabled}
							isLoading={button.loading}
							variant={button.variant ?? 'secondary'}
							iconEnd={button?.iconEnd}
							iconStart={button?.iconStart}
						>
							{button.label ?? 'OK'}
						</Button>
					))}
					{hasCancelBtn && (
						<Button
							layoutClassName={isMobile ? 'w-full' : orientation === 'vertical' ? 'w-full' : 'w-32'}
							onClick={cancelButton?.onClick}
							disabled={cancelButton?.disabled}
							isLoading={cancelButton?.loading}
							variant={cancelButton?.variant ?? 'secondary'}
						>
							{cancelButton?.label ?? 'Cancel'}
						</Button>
					)}
				</div>
				{footer}
			</div>
		</Modal>
	);
};
