'use client';
import { ReactNode } from 'react';
import { ComponentPopoverVariantType, TwLayoutClassName } from '@devkit/utilities';
import { getdevkitComponentAttributes } from '../../common/devkitUtilities';
import { FormLabel } from '../FormLabel';
import styles from './FormInputGroup.styles';

export interface IFormInputGroupProps {
	/** The form label text */
	label?: string;
	/** if true the space for the label will be reserved even if the label is empty  */
	reserveLabelSpacing?: boolean;
	/** If true, the input element is required.*/
	isRequired?: boolean;
	/** The form field component */
	children: ReactNode;
	/** If provided, a popover component will be added to the field next to the label */
	popover?: { header: string; description: string } | React.ReactNode;
	/**Variant for the popover */
	popoverVariant?: ComponentPopoverVariantType;
	/**	Override or extend the styles applied to the component container */
	layoutClassName?: TwLayoutClassName;
	formId?: string;
	hasErrors?: boolean;
	/** A flag that changes the background to highlight a change in values. */
	highlighted?: boolean;
}

export const FormInputGroup = ({
	label,
	isRequired,
	children,
	popover,
	popoverVariant,
	layoutClassName,
	reserveLabelSpacing,
	formId,
	hasErrors,
	highlighted,
}: IFormInputGroupProps) => {
	const hasWidth = layoutClassName
		? Array.isArray(layoutClassName)
			? layoutClassName.some((c) => c.includes('w-'))
			: layoutClassName.includes('w-')
		: false;

	const hasFlex = layoutClassName
		? Array.isArray(layoutClassName)
			? layoutClassName.some((c) => c.includes('flex-'))
			: layoutClassName.includes('flex-')
		: false;

	const labelValue = label ? label : reserveLabelSpacing ? '⁣' : undefined;

	return (
		<div
			className={styles.formInputWrapper(hasWidth, hasFlex, layoutClassName, highlighted)}
			{...getdevkitComponentAttributes(formId, hasErrors)}
		>
			{labelValue && (
				<div className={styles.labelWrapper}>
					<FormLabel isRequired={isRequired} popover={popover} popoverVariant={popoverVariant}>
						{labelValue}
					</FormLabel>
				</div>
			)}
			{children}
		</div>
	);
};

export default FormInputGroup;
