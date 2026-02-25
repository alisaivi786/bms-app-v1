import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { Text, View } from 'react-native';
import { SfExclamationmarkCircleFillIcon } from '@devkit/icons/native';
import { EmptyValidationMessage, type IErrorMessage } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import styles from './FormFieldErrors.styles';

export interface IFormFieldErrorsProps {
	errors?: string | string[] | IErrorMessage[] | IErrorMessage;
}

export const FormFieldErrors = ({ errors }: IFormFieldErrorsProps) => {
	const { tw, isRtlLocale, reverseLayout } = useMobileUIConfigOptions();

	const hasErrors = !isEmpty(errors);

	if (!hasErrors) {
		return null;
	}

	let displayError: string | undefined;

	if (typeof errors === 'string') {
		displayError = errors;
	} else if (Array.isArray(errors)) {
		displayError = typeof errors[0] === 'string' ? errors[0] : errors[0].errorMessage;
	} else if (typeof errors === 'object' && errors !== null) {
		displayError = errors.errorMessage;
	}

	if (typeof displayError === 'string' && displayError === EmptyValidationMessage) {
		displayError = undefined;
	}

	return (
		displayError && (
			<View style={tw`${styles.container(isRtlLocale)}`}>
				<SfExclamationmarkCircleFillIcon height={15} width={15} style={tw`${styles.icon}`} />
				<Text style={tw`${styles.errorText(reverseLayout)}`}>{displayError}</Text>
			</View>
		)
	);
};

export default FormFieldErrors;
