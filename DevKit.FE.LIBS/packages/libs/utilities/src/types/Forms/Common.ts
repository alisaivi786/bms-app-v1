import { FieldValues, Path } from 'react-hook-form';
import { ReactForm } from '../../hooks/useReactForm/types';
import type { IErrorMessage, TwLayoutClassName } from '../shared-types';

export type ComponentSize = 'small' | 'medium' | 'large';

export type TextAlignVertical = 'top' | 'auto' | 'center' | 'bottom' | undefined;

export type ComponentPopoverVariantType = 'light' | 'dark';

export type FieldStatusType = 'edited';

export interface ICommonFieldProps<TValue, TForm extends FieldValues> {
	/** The field label text */
	label?: string;
	/** If true, the component is disabled. */
	disabled?: boolean;
	/** The input field error/errors text */
	errors?: string | string[] | IErrorMessage[] | IErrorMessage;
	/** If true, it will add the error style for the component */
	hasErrors?: boolean;
	/** The short hint displayed in the input before the user enters a value. */
	placeholder?: string;
	/** `Callback` function to handel the input blur */
	onBlur?: (e?: object) => void;
	/** `Callback` function to handel the input focus */
	onFocus?: (e?: object) => void;
	/** If provided, a popover component will be added to the field next to the label */
	popover?: { header: string; description: string; } | React.ReactNode;
	/**Variant for the popover */
	popoverVariant?: ComponentPopoverVariantType;
	/** If true, it's required to select an option otherwise it will throw error */
	isRequired?: boolean;
	/** The form object's property(paths) that the data would be rendered for,
	 * for `example` {
	 *			users: [
	 *				{
	 *					name: '',
	 *				}
	 *			]
	 *  }
	 * to edit the first user name you have to pass the following path: users.[0].name
	 */
	field?: Path<TForm>;
	/** The field path to automatically focus when the user finishes editing the current field */
	nextField?: Path<TForm>;
	/** Used to pass the form object to handle the field `values`, `validation`, and `onFormSubmit` function
	 *  and more internally by the provided form value, you should be aware if the form was added the field value and
	 *  the onChange function would be ignored */
	form?: ReactForm<TForm>;
	/**  `Callback` function to handel field updates */
	onChange?: (value?: TValue) => void;
	/** The field value */
	value?: TValue;
	description?: string;
	size?: ComponentSize;
	layoutClassName?: TwLayoutClassName;
	/** if true the space for the label will be reserved even if the label is empty  */
	reserveLabelSpacing?: boolean;
	/** used to identity the component related to useReactForm for scroll on error functionality   */
	formId?: string;
	/** test id for automation testing   */
	testId?: string;
	/** used for highlighting the field   */
	status?: FieldStatusType;
}
