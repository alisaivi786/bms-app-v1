import { RefObject } from 'react';
import { ExtendedRefs, ReferenceType, Strategy } from '@floating-ui/react';
import {
	DropdownProps,
	FieldValues,
	MultipleSelectDropdownProps,
	PrimitiveKeys,
	StringAndNumberKeys,
} from '@devkit/utilities';
import { ComponentSize } from '@devkit/utilities/src/types/Forms/Common';
import { TextFieldRef } from '../../TextField/TextField';

export type DropdownTypes = 'single' | 'multiple';

type BaseDropdownContextValue<TValue> = {
	isFocused: boolean;
	x: number | undefined;
	y: number | undefined;
	refs: Partial<ExtendedRefs<ReferenceType>>;
	strategy: Strategy;
	isElementOutOfScope: boolean;
	isMounted: boolean;
	styles: React.CSSProperties;
	getReferenceProps: (userProps?: React.HTMLProps<Element> | undefined) => Record<string, unknown>;
	getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
	size: ComponentSize;
	setSearchText: (searchText: string | undefined) => void;
	searchText: string | undefined;
	groupedFilteredOptions:
		| {
				type: 'grouped';
				data: {
					label: string;
					options: TValue[];
				}[];
		  }
		| {
				type: 'options';
				data: TValue[];
		  };
	noOptionAvailableText: string;
	isBottomSheet: boolean;
	optionFocusIndex: number;
	options: TValue[];
	disabled: boolean;
	hasErrors: boolean;
	formId: string | undefined;
	applyFloatingMinWidth: boolean;
	hideValueLabel: boolean;
	onLoadMore: () => void;
	isLoadingMoreOptions: boolean;
};

export type DropdownContextProps<
	TDropdownType extends DropdownTypes,
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
> = {
	dropDownType: TDropdownType;
	onClear: () => void;
	inputRef: RefObject<TextFieldRef> | undefined;
	applyFloatingMinWidth: boolean;

	isAllSelected?: boolean;
	selectAllText?: string;
	showCount?: boolean;
	onSelectAll?: (val: boolean) => void;
} & (
	| ({ dropDownType: 'single' } & DropdownProps<TValue, TKey, TForm, TGroupKey> & {
				onOptionSelected: (option: TValue) => void;
				renderSelectedItem?: (item?: TValue, isOpen?: boolean, hasErrors?: boolean) => React.ReactNode;
			})
	| (({ dropDownType: 'multiple' } & MultipleSelectDropdownProps<TValue, TKey, TForm, TGroupKey>) & {
			checkedOptions: TValue[TKey][];
			onOptionSelected: (option: TValue, checked: boolean) => void;
			onApplyClick: () => void;
			isDirty: boolean;
			renderSelectedItem?: (item?: TValue[], isOpen?: boolean, hasErrors?: boolean) => React.ReactNode;
	  })
);

export type DropdownContextValue<
	TDropdownType extends DropdownTypes,
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
> = BaseDropdownContextValue<TValue> & DropdownContextProps<TDropdownType, TValue, TKey, TForm, TGroupKey>;
