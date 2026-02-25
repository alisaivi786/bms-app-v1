'use client';

import { useCallback, useState } from 'react';
import { APIResponsePromise, TypeOfAPIError, TypeOfAPIResponse } from './types';

type DefReturnType<Type> = Type extends (...args: infer _Args) => infer Return ? Return : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useLazyApi<TDef extends (...args: never) => APIResponsePromise<unknown, unknown>>(
	apiDefinition: TDef
): {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	result: TypeOfAPIResponse<(...args: any[]) => DefReturnType<TDef>> | undefined;
	isLoading: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: TypeOfAPIError<(...args: any[]) => DefReturnType<TDef>> | undefined;
	callApi: (...args: Parameters<TDef>) => DefReturnType<TDef>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useLazyApi<TDef extends (...args: any) => APIResponsePromise<unknown, unknown>>(
	apiDefinition: TDef
): {
	result: TypeOfAPIResponse<TDef> | undefined;
	isLoading: boolean;
	errors: TypeOfAPIError<TDef> | undefined;
	callApi: (ate: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useLazyApi<TDef extends (...args: any[]) => APIResponsePromise<unknown, unknown>>(apiDefinition: TDef) {
	const [result, setApiResult] = useState<TypeOfAPIResponse<TDef>>();
	const [isLoading, setIsApiLoading] = useState(false);
	const [errors, setApiError] = useState<TypeOfAPIError<TDef>>();

	const callApi = useCallback((...args: Parameters<typeof apiDefinition>) => {
		setIsApiLoading(true);
		apiDefinition(...args)
			.then((data) => {
				setApiResult(data as TypeOfAPIResponse<TDef>);
				setIsApiLoading(false);
			})
			.catch((error) => {
				setApiError(error as TypeOfAPIError<TDef>);
				setIsApiLoading(false);
			});
	}, []);

	return {
		result,
		isLoading,
		errors,
		callApi,
	};
}

export default useLazyApi;
