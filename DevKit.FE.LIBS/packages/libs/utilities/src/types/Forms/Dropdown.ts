import { FieldValues } from 'react-hook-form';
import { PrimitiveKeys, StringAndNumberKeys } from '../shared-types';
import { ICommonFieldProps } from './Common';

export type DropdownVariants = 'default' | 'menu' | undefined;

export type DropdownBaseProps<
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TSelectedValue,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
> = ICommonFieldProps<TSelectedValue, TForm> & {
	/** The options array of the dropDown */
	options?: TValue[];
	/** The selected option value key(the provided key for the options item) */
	valueKey: keyof Pick<TValue, TKey>;
	/** The initial field label*/
	label?: string;
	/**The short hint displayed in the input before the user enters a value. */
	placeholder?: string;
	/**If true, it will add the error style for the component */
	hasErrors?: boolean;
	/** If true, the component is disabled. */
	disabled?: boolean;
	/** Its needed to group the options based on its value */
	groupKey?: TGroupKey;
	/** The options item text of the Dropdown */
	labelKey?: StringAndNumberKeys<TValue>;
	/** If true, a clear icon and functionality will be added */
	isClearable?: boolean;
	onClearValue?: () => void;
	/** If true, then the search functionality will be added */
	isSearchable?: boolean;
	/**  `Callback` function to search through the provided options */
	onSearch?: (searchText: string, item?: TValue) => boolean | undefined;
	/** Pass an icon to change the dropdown expand icon */
	dropdownExpandIcon?: JSX.Element;
	/** If true, then it will hide selected value from dropdown options */
	hideValueLabel?: boolean;
	/** Search placeholder for searchField inside modal bottomSheet Mobile view */
	searchPlaceHolder?: string;
	/** If true, it's required to select an option otherwise it will show an error */
	isRequired?: boolean;
	/** Text to show in case no search found or the dropdown has empty options  */
	noOptionAvailableText?: string;
	/** Callback function to check if option is disabled */
	getIsItemDisabled?: (option: TValue) => boolean | undefined;
	/** A flag that changes the background to highlight a change in values. */
	highlighted?: boolean;
	/** The writing direction of the textField */
	directionForInput?: 'ltr' | 'rtl';
	/** The placeholder direction of the textField */
	placeholderDir?: 'ltr' | 'rtl';
	/** Initial patch of options to show if need to lazy load further options */
	initialOptionCount?: number;
	/** The variant to use (default or menu)*/
	variant?: DropdownVariants;
	/**  `Callback` function used to pass a reactNode to render a custom list item */
	renderItem?: (item: TValue | undefined, parentWidth: number) => React.ReactNode;
};

export type DropdownProps<
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
> = DropdownBaseProps<TValue, TKey, TForm, TValue[TKey], TGroupKey> & {
	/**  `Callback` function used to render a custom selected item component */
	renderSelectedItem?: (item?: TValue, isOpen?: boolean, hasErrors?: boolean) => React.ReactNode;
};

export type MultipleSelectDropdownProps<
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
> = DropdownBaseProps<TValue, TKey, TForm, TValue[TKey][], TGroupKey> & {
	/** The text of the cancel button, the default is 'Cancel' */
	cancelButtonText?: string;
	/** The text of the apply button, the default is 'Apply' */
	applyButtonText?: string;
	/** If true, then the selection will happen on the click of the checkbox */
	directChange?: boolean;
	/** If true, then all Items will get option to select all items */
	enableSelectAll?: boolean;
	/** The text of the Select all option, the default is 'Select All' */
	selectAllText?: string;
	/** If true, displays selection count as "1 Selected", "2 Selected", or "All Selected" instead of item labels */
	showCount?: boolean;
	/**  `Callback` function used to render a custom selected item component */
	renderSelectedItem?: (item?: TValue[], isOpen?: boolean, hasErrors?: boolean) => React.ReactNode;
};
