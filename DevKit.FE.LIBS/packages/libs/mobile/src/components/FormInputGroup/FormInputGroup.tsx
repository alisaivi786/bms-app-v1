import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { ComponentPopoverVariantType, TwLayoutClassName } from '@devkit/utilities';
import { getdevkitComponentAttributes } from '../../common/devkitUtilities';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
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
}: IFormInputGroupProps) => {
	const { tw } = useMobileUIConfigOptions();

	const labelValue = label ? label : reserveLabelSpacing ? '⁣' : undefined;

	return (
		<View style={tw`${styles.formInputWrapper(layoutClassName)}`} {...getdevkitComponentAttributes(formId, hasErrors)}>
			{labelValue && (
				<View style={tw`${styles.labelWrapper}`}>
					<FormLabel isRequired={isRequired} popover={popover} popoverVariant={popoverVariant}>
						{labelValue}
					</FormLabel>
				</View>
			)}
			{children}
		</View>
	);
};

export default FormInputGroup;
