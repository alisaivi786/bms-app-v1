import React, { ReactNode } from 'react';
import { FieldValues } from 'react-hook-form';
import { ICommonFieldProps } from './Common';

export type TextFieldAutoFillTypes = 'current-password' | 'username' | 'email' | 'new-password';

export interface IBaseTextFieldProps<TValue, TForm extends FieldValues> extends ICommonFieldProps<TValue, TForm> {
	/** The textField max input characters */
	maxLength?: number;
	/**The fixed value added before the textField input, for example: mobile number +962 */
	returnKeyType?: 'done' | 'next' | 'search' | 'send' | 'go';
	/**The type of the keyboard's action button */
	onSubmitEditing?: () => void;
	/**The action when the keyboard's action button is pressed */
	suffix?: ReactNode;
	/**The fixed React node element added before the suffix */
	prefix?: ReactNode;
	/**The fixed React node element added before the textField input */
	suffixNode?: ReactNode;
	/**The fixed React node element added after the end icon */
	postfixNode?: ReactNode;
	/** The writing direction of the textField */
	directionForInput?: 'ltr' | 'rtl';
	/** The placeholder direction of the textField */
	placeholderDir?: 'ltr' | 'rtl';
	/**	This prop helps users to fill forms faster. It is used to fill email, passwords, and userName */
	autoFill?: TextFieldAutoFillTypes;
	/** The count of the textField input characters*/
	showCharactersCounter?: boolean;
	/** The format of the input field, ex: '99/99/9999' to handel number inputs for date, or a mask to add a productNumber 'AAA-000' to accept 3 capital letters and 3 numbers  */
	mask?: string;
	/** Applies mask from the end, if true. Default behavior (or if set to false) is to apply mask from the beginning **/
	maskReverse?: boolean;
	/** If true, it will prevent the copy from the component */
	noCopy?: boolean;
	/** Callback function while pasting text to field */
	onPaste?: (value: string) => string;
	/** If true, it will prevent the paste to the component */
	noPaste?: boolean;
	/** The regex to compare the test textField value */
	regex?: RegExp;
	/** If true, a clear button  will be added to the field */
	isClearable?: boolean;
	/** The debounce time before calling the onSearch function, the interval is in milliseconds */
	debounceTimeInMilliseconds?: number;
	onClearValue?: () => void;
	/** If true, The end icon will be rotated on focus */
	rotateEndIconOnFocus?: boolean;
	readOnly?: boolean;
	/** If true, Clear icon will always be displayed */
	alwaysShowClearIcon?: boolean;
	startIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
	endIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
	onIconClick?: (iconType: 'start' | 'end') => void;
	keepFocus?: boolean;
	/** A flag that changes the background to highlight a change in values. */
	highlighted?: boolean;
	/** virtual keyboard type, keyboard that appears in mobile browsers */
	inputMode?: 'search' | 'email' | 'none' | 'tel' | 'text' | 'url' | 'numeric' | 'decimal';
	variant?: 'default' | 'search';
	convertArabicDigitsToEnglish?: boolean;
}

export interface ITextFieldProps<TForm extends FieldValues = never> extends IBaseTextFieldProps<string, TForm> {
	type?: 'text' | 'text-area' | 'password';
}

export type RelatedTargetType = undefined | React.RefObject<HTMLElement> | React.MutableRefObject<HTMLElement>;

export interface INumberFieldProps<TForm extends FieldValues = never> extends IBaseTextFieldProps<number, TForm> {
	type?: 'number';
	decimalPlaces?: 0 | 2 | 4;
}
