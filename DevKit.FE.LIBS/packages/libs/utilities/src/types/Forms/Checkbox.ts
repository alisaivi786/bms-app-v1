import { FieldValues } from 'react-hook-form';
import { ICommonFieldProps } from './Common';

export type CheckBoxSize = 'x-small' | 'small' | 'medium' | 'large';

export type CheckBoxFieldProps<TForm extends FieldValues> = Omit<
	ICommonFieldProps<boolean, TForm>,
	'label' | 'onChange' | 'value' | 'size'
> & {
	/**If true, the component is checked.*/
	isChecked?: boolean;
	/** Callback fired when the state is changed. */
	onChange?: (value: boolean) => void;
	/** React elements or text to be rendered.*/
	label?: string | React.ReactNode;
	field?: string;
	/**If true, the component is disabled. */
	disabled?: boolean;
	/** disabled the box only or the box with label*/
	disableVariant?: 'box-only' | 'all';
	hasError?: boolean;
	size?: CheckBoxSize;
	highlighted?: boolean;
	isIndeterminate?: boolean;
	/** Apply the error color for box only or the box with label*/
	errorVariant?: 'box-only' | 'all';
};
