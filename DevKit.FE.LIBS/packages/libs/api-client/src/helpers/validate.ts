import { ZodError, z } from 'zod';
import { logger } from '@devkit/utilities/dist/Debug';
import { APIDefinitionsErrors, ValidationMode } from '../types';

export type ValidationParams<TData extends Zod.ZodTypeAny> = {
	requestId: string;
	validationMode: ValidationMode;
	url: string;
	validationSchema?: TData;
	code: APIDefinitionsErrors;
	data: z.TypeOf<TData>;
	transformedData?: z.TypeOf<TData>;
	status?: number;
};

export function validate<TData extends Zod.ZodTypeAny>(params: ValidationParams<TData>) {
	try {
		if (params.code === 'InvalidResponseSchema') {
			params.validationSchema?.parse(params.transformedData);
		} else {
			params.validationSchema?.parse(params.data);
		}
	} catch (ex) {
		const zodError = ex as ZodError;
		const logMethod = params.validationMode === 'Warning' ? logger.warn : logger.error;

		logMethod(params.requestId, '[devkit][API-Client][Schema-Validation]', {
			url: params.url,
			errors: zodError.format(),
			...{
				originalResponse: logger.level === 'production' ? undefined : params.data,
			},
		});
	}
}
