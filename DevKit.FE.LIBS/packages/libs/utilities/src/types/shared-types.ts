type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
	? Acc[number]
	: Enumerate<N, [...Acc, Acc['length']]>;

// IntRange from first param to second-1
type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

// IntRange from first param to second-1 and empty string
type IntRangeAndEmpty<F extends number, T extends number> = IntRange<F, T> | '';

export interface ITFunctionOption {
	[key: string]: string | number;
}

export type ITFunction = (key: string, options?: ITFunctionOption) => string;

export interface IResponseErrors {
	status?: string;
	data?: { errors: IResponseError[] };
}

export interface IResponseErrorsArray {
	status?: string;
	data?: IResponseError[];
}

export interface IRTKQuerySerializedError {
	name?: string;
	message?: string;
	stack?: string;
	code?: string;
}

export interface IErrorMessages {
	source: 'client' | 'server';
	message: string;
	code?: string;
	field?: string;
}

export interface IResponseError {
	code: string;
	field?: string;
	message?: string;
}

export interface IErrorMessage {
	errorCode: string;
	errorMessage: string;
}

/**
 * used only for old backend response approach which is as following
 * {
 *  isSuccess: boolean,
 *  data:T,
 *  errors:IResponses
 * }
 * Newer project should return the response data directly as the error will be identified by the HTTP status
 */
export interface IBaseResponse<T> {
	data: T;
	errors: IResponseError[];
}

export type APIResponseError = IResponseErrors | IResponseErrorsArray | IRTKQuerySerializedError;

type Primitives = string | number | boolean | undefined;

type StringAndNumberPrimitives = string | number | undefined;

export type PrimitiveKeys<T> = {
	[K in keyof T]-?: T[K] extends Primitives ? K : never;
}[keyof T];

export type StringAndNumberKeys<T> = {
	[K in keyof T]-?: T[K] extends StringAndNumberPrimitives ? K : never;
}[keyof T];

export type TwWidth = 'w-full' | 'w-auto' | 'w-fit' | `w-${number}` | `w-${number}/${number}`;

export type TwMinMaxSize<T extends string> = T | `min-${T}` | `max-${T}`;

export type TwResponsive<T extends string> = T | `md:${T}` | `lg:${T}` | `xl:${T}` | `2xl:${T}` | `3xl:${T}`;

export type TwLocale<T extends string> = T | `rtl:${T}` | `ltr:${T}`;

export type TwFlex = 'flex-none' | 'flex-auto' | 'flex-1';

export type TwGridLayoutSpan = `col-span-${number}` | `row-span-${number}`;

export type TwMargin =
	| `m-${number}`
	| `my-${number}`
	| `mx-${number}`
	| `me-${number}`
	| `ms-${number}`
	| `mt-${number}`
	| `mb-${number}`;

export type TwPosition = 'block' | 'hidden';

export type TwVisibility = 'visible' | 'invisible';

type TwCommonMinMax<T extends 'min' | 'max'> = `${T}-w-full` | `${T}-w-min` | `${T}-w-max` | `${T}-w-fit`;

export type TwMinWidth = 'min-w-px' | `min-w-${number}` | TwCommonMinMax<'min'>;

export type TwMaxWidth =
	| 'max-w-0'
	| 'max-w-none'
	| 'max-w-xs'
	| 'max-w-sm'
	| 'max-w-md'
	| 'max-w-lg'
	| `max-w-${IntRangeAndEmpty<2, 8>}xl`
	| 'max-w-prose'
	| 'max-w-screen-sm'
	| 'max-w-screen-md'
	| 'max-w-screen-lg'
	| `max-w-screen-${IntRangeAndEmpty<2, 4>}xl`
	| TwCommonMinMax<'max'>;

export type TwLayout =
	| TwMaxWidth
	| TwMinWidth
	| TwWidth
	| TwFlex
	| TwMargin
	| TwVisibility
	| TwGridLayoutSpan
	| TwPosition;

export type TwLayoutResponsive = TwResponsive<TwLayout>;

export type TwLayoutClassName = TwLayoutResponsive | TwLayoutResponsive[];

export type TwFontSize =
	| `text-display${IntRange<1, 4>}`
	| `text-h${IntRange<1, 4>}`
	| 'text-title'
	| 'text-body'
	| 'text-paragraph'
	| `text-caption${IntRange<1, 3>}`
	| 'text-legal'
	| 'font-normal'
	| 'font-medium'
	| 'font-bold'
	| 'underline';

export type TwLinkClassName = TwLocale<TwResponsive<TwLayout | TwFontSize>> | TwLocale<TwResponsive<TwLayout | TwFontSize>>[];
