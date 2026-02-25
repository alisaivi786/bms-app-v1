import { FieldValues } from 'react-hook-form';
import { StringAndNumberKeys } from '../shared-types';
import { ComponentSize, ICommonFieldProps } from './Common';

export type CapsuleButtonVariant = 'gray' | 'dark';

export type CapsuleButtonBaseProps<
	TValue,
	TKey extends StringAndNumberKeys<TValue>,
	TSelected,
	TForm extends FieldValues = never
> = ICommonFieldProps<TSelected, TForm> & {
	options: TValue[];
	valueKey: keyof Pick<TValue, TKey>;
	labelKey: keyof TValue;
	size?: ComponentSize;
	variant?: CapsuleButtonVariant;
	overflowWrap?: 'wrap' | 'no-wrap';
	selected?: TSelected | undefined;
	minWidth?: number;
};

export type CapsuleButtonSingleSelectProps<
	TValue,
	TKey extends StringAndNumberKeys<TValue>,
	TForm extends FieldValues = never
> = CapsuleButtonBaseProps<TValue, TKey, TValue[TKey], TForm> & {
	multiSelect?: false;
};

export type CapsuleButtonMultiSelectProps<
	TValue,
	TKey extends StringAndNumberKeys<TValue>,
	TForm extends FieldValues = never
> = CapsuleButtonBaseProps<TValue, TKey, TValue[TKey][], TForm> & {
	multiSelect: true;
};

export type CapsuleButtonFieldProps<
	TValue,
	TKey extends StringAndNumberKeys<TValue>,
	TForm extends FieldValues = never
> = CapsuleButtonSingleSelectProps<TValue, TKey, TForm> | CapsuleButtonMultiSelectProps<TValue, TKey, TForm>;
