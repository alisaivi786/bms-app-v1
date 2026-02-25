import { FieldValues } from 'react-hook-form';
import { ICommonFieldProps } from './Common';

export interface IMultiTextFieldProps<TForm extends FieldValues, TValue extends string>
	extends ICommonFieldProps<TValue, TForm> {
	extraLabels?: { to: string };
	regex?: RegExp;
	mask?: string;
}
