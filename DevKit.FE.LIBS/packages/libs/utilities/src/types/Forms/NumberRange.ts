import { FieldValues } from 'react-hook-form';
import { ICommonFieldProps } from './Common';

export interface INumberRangeFieldProps<TForm extends FieldValues, TValue extends string>
	extends ICommonFieldProps<TValue, TForm> {
	extraLabels?: { to: string };
	maxLength?: number;
	/** If true, the field will take 2 column width */
	twoColumns?: boolean;
	toPlaceholder?: string;
	fromPlaceholder?: string;
	fromDecimalPoints?: 0 | 2 | 4;
	toDecimalPoints?: 0 | 2 | 4;
}
