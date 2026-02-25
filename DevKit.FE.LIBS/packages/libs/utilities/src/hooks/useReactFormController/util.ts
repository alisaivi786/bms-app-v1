import { IErrorMessage, ITFunction } from '../../types';

type Errors = undefined | string | string[] | IErrorMessage[] | IErrorMessage;

const translateOrReturn = (s: string, translate: ITFunction): string => {
	const isTranslationKey = /^([a-zA-Z1-9]|-|_)*:([a-zA-Z1-9]|-|_)*(\.([a-zA-Z1-9]|-|_)*)+$/.test(s);

	if (isTranslationKey) {
		return translate(s);
	}

	return s;
};

export const translateErrors = (fieldErrors: Errors, translate: ITFunction): Errors => {
	if (!fieldErrors) return fieldErrors;

	if (typeof fieldErrors === 'string') {
		return translateOrReturn(fieldErrors, translate);
	}

	if (!Array.isArray(fieldErrors)) {
		const field = fieldErrors as IErrorMessage;

		return {
			errorCode: field.errorCode,
			errorMessage: translateOrReturn(field.errorMessage, translate),
		};
	}

	if (Array.isArray(fieldErrors) && typeof fieldErrors[0] === 'string') {
		return fieldErrors.map((e) => translateOrReturn(e as string, translate));
	}

	if (Array.isArray(fieldErrors) && typeof fieldErrors[0] !== 'string') {
		return fieldErrors.map((f) => {
			const field = f as IErrorMessage;

			return {
				errorCode: field.errorCode,
				errorMessage: translateOrReturn(field.errorMessage, translate),
			};
		});
	}

	return fieldErrors;
};
