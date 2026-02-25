import { ReactNode } from 'react';
import { FieldValues } from 'react-hook-form';
import { ICommonFieldProps } from './Common';

export type RadioBoxSize = 'x-small' | 'small' | 'medium' | 'large';

export interface RadioButtonOption<TValue extends number | string> {
	/**If true, the component is disabled. */
	disabled?: boolean;

	/** React node to be rendered*/
	label: ReactNode;

	/** Unique id of radio button. */
	id: TValue;
	/** A flag that changes the background to highlight a change in values. */
	highlighted?: boolean;
	widthFull?: boolean;
}

export type RadioButtonFieldProps<TForm extends FieldValues, TValue extends number | string> = Omit<
	ICommonFieldProps<TValue, TForm>,
	'size'
> & {
	/** a prop to select the component size */
	size?: RadioBoxSize;

	/** Array of radio buttons */
	options: RadioButtonOption<TValue>[];

	/** Defines the number of columns to render in each horizontal line and this value will be passed to FormContainer */
	columnsCount: number;
};
