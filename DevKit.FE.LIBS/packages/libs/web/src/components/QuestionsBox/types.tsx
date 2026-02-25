export type TValue<T> = T[keyof T];

interface IBaseQuestion<T> {
	id: keyof T;
	question: string;
	isRequired?: boolean;
	parent?: keyof T;
	hidden?: boolean;
}

export interface IBooleanQuestion<T> extends IBaseQuestion<T> {
	type: 'boolean';
}

export interface IDateQuestion<T> extends IBaseQuestion<T> {
	type: 'date';
	label?: string;
}

export type IQuestion<T> = IBooleanQuestion<T> | IDateQuestion<T>;
