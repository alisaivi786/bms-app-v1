import React from 'react';
import { Text, View } from 'react-native';
import { ComponentPopoverVariantType } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { Popover } from '../Popover';
import styles from './FormLabel.styles';

export interface IFormLabelProps {
	/** The form field Text */
	children: string;
	/** If true, the input element is required.*/
	isRequired?: boolean;
	/** Add a popover to your label, you can pass a component or simply add an object with the header and description */
	popover?: { header: string; description: string } | React.ReactNode;
	/**Variant for the popover */
	popoverVariant?: ComponentPopoverVariantType;
}

/** Add labels to your Form elements by placing text within the label, and pass the form component as a child. The different between this component and the FormInputGroup is that you can add a popover to the label*/

export const FormLabel = ({ children, isRequired, popover, popoverVariant }: IFormLabelProps) => {
	const { tw, isRtlLocale } = useMobileUIConfigOptions();

	return (
		<View style={tw`${styles.labelContainer}`}>
			<Text style={tw`${styles.labelText(isRtlLocale)}`}>{children}</Text>
			{isRequired && <Text style={tw`${styles.isRequiredClassNames}`}>*</Text>}
			{popover && <Popover content={popover} popoverVariant={popoverVariant} />}
		</View>
	);
};
