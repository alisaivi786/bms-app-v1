'use client';

import { useAppPlatformContextOptions } from '../../factories/AppContextFactory/context-factory';
import { APIResponseError, IResponseError, IResponseErrors, IResponseErrorsArray } from '../../types/shared-types';

export const useErrorsResponseTransform = (
	translationSuffix?: string,
	useWholeTranslationSuffix?: boolean,
	defaultErrorCode?: string
) => {
	const { translate } = useAppPlatformContextOptions();

	const getErrorMessages = (responseError?: APIResponseError) => {
		let result: IResponseError[] = [];

		if (responseError) {
			const fetchErrors = responseError as IResponseErrors | IResponseErrorsArray | undefined;
			const errorsData = fetchErrors?.data;

			let serverSideErrors: IResponseError[] | undefined;

			if (Array.isArray(errorsData)) {
				serverSideErrors = errorsData;
			} else {
				serverSideErrors = errorsData?.errors;
			}

			if (!fetchErrors && !!serverSideErrors?.length && defaultErrorCode) {
				// add the default error code if no error returned
				serverSideErrors = mapUIError([defaultErrorCode]).data?.errors;
			}

			if (serverSideErrors && Array.isArray(serverSideErrors)) {
				result = serverSideErrors.map((error) => ({
					code: error.code,
					field: error.field,
					message: error.message
						? error.message
						: translate(
								`${useWholeTranslationSuffix ? '' : 'common:shared.error-messages.'}${
									translationSuffix ? `${translationSuffix}.` : ''
								}${error.code}`
						  ),
				}));
			} else if (fetchErrors) {
				let status = `${fetchErrors.status}`;

				switch (status) {
					case '401':
						status = 'Unauthorized';
						break;
					case 'FETCH_ERROR':
						status = 'FETCH_ERROR';
						break;
					default:
						status = 'Server500';
						break;
				}

				result = [
					{
						code: status,
						message: fetchErrors.status ? translate(`common:shared.error-messages.${status}`) : '',
						field: '',
					},
				];
			}
		}

		return result;
	};

	const mapUIError = (codes: string[]) => {
		return {
			status: '',
			data: {
				errors: codes.map((code) => ({
					code,
					field: '',
					message: '',
				})),
			},
		} as IResponseErrors;
	};

	return {
		getErrorMessages,
		mapUIError,
	};
};
