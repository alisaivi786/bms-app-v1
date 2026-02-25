'use client';

import { useEffect } from 'react';
import { APIResponsePromise, TypeOfAPIError, TypeOfAPIResponse } from './types';
import useLazyApi from './useLazyApi';

type DefReturnType<Type> = Type extends (...args: infer _Args) => infer Return ? Return : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useApiOnMount<TDef extends (...args: never) => APIResponsePromise<unknown, unknown>>(
	apiDefinition: TDef,
	request: []
): {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	result: TypeOfAPIResponse<(...args: any[]) => DefReturnType<TDef>> | undefined;
	isLoading: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: TypeOfAPIError<(...args: any[]) => DefReturnType<TDef>> | undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useApiOnMount<TDef extends (...args: any) => APIResponsePromise<unknown, unknown>>(
	apiDefinition: TDef,
	request: Parameters<TDef>
): {
	result: TypeOfAPIResponse<TDef> | undefined;
	isLoading: boolean;
	errors: TypeOfAPIError<TDef> | undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useApiOnMount<TDef extends (...args: any) => any>(apiDefinition: TDef, request: Parameters<TDef>) {
	const { callApi, result, errors, isLoading } = useLazyApi(apiDefinition);

	useEffect(() => {
		callApi(...request);
	}, []);

	return {
		result,
		isLoading,
		errors,
		callApi,
	};
}

export default useApiOnMount;
