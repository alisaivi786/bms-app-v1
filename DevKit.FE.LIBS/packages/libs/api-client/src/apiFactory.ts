import { ZodRecord } from 'zod';
import { createAPIDefinition as InternalAPIRequestGlobalConfig } from './apiCreateDefinition';
import { APIMethods, APIParameterValueType, APIRequestGlobalConfig, TFuncCreateAPIDefinition } from './types';

export class APIFactory<TGlobalOriginalResponse extends Zod.ZodTypeAny, GlobalTErrorCodes extends string = never> {
	private apiGlobalConfig: APIRequestGlobalConfig<ZodRecord, TGlobalOriginalResponse, GlobalTErrorCodes> | undefined =
		undefined;

	constructor(apiGlobalConfig: APIRequestGlobalConfig<ZodRecord, TGlobalOriginalResponse, GlobalTErrorCodes>) {
		this.apiGlobalConfig = apiGlobalConfig;
		this.createAPIDefinition = this.createAPIDefinition.bind(this);
	}

	updateConfig(apiGlobalConfig: APIRequestGlobalConfig<ZodRecord, TGlobalOriginalResponse, GlobalTErrorCodes>) {
		this.apiGlobalConfig = { ...this.apiGlobalConfig, ...apiGlobalConfig };
	}

	createAPIDefinition<
		TResponse extends Zod.ZodTypeAny,
		TOriginalResponse extends Zod.ZodTypeAny,
		TErrorCodes extends string = never,
		TErrorFields extends string = never,
		TMethod extends APIMethods | undefined = undefined,
		TRequest extends Zod.ZodTypeAny | undefined = undefined,
		THeaders extends APIParameterValueType | undefined = undefined,
		TParameters extends APIParameterValueType | undefined = undefined
	>(
		...args: Parameters<
			TFuncCreateAPIDefinition<
				TResponse,
				TOriginalResponse,
				TMethod,
				TRequest,
				THeaders,
				TParameters,
				TErrorCodes | GlobalTErrorCodes,
				TErrorFields
			>
		>
	): ReturnType<
		TFuncCreateAPIDefinition<
			TResponse,
			TOriginalResponse,
			TMethod,
			TRequest,
			THeaders,
			TParameters,
			TErrorCodes | GlobalTErrorCodes,
			TErrorFields
		>
	> {
		const requestConfig = args[0];

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return (InternalAPIRequestGlobalConfig as any)(requestConfig, () => this.apiGlobalConfig);
	}
}
