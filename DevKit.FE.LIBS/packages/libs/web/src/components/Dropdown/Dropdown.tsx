import { ForwardedRef, Ref, forwardRef, useImperativeHandle, useRef } from 'react';
import {
	DropdownProps,
	FieldValues,
	PrimitiveKeys,
	StringAndNumberKeys,
	useReactFormController,
} from '@devkit/utilities';
import { IFormFieldErrorsProps } from '../FormFieldErrors/FormFieldErrors';
import { TextFieldRef } from '../TextField/TextField';
import { DropdownProvider } from './common/DropdownContext';
import { DropdownInputComponent } from './common/DropdownInputComponent';
import { DropdownMenu } from './common/DropdownMenu';

type DropdownBaseType = <
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined = undefined
>(
	props: DropdownProps<TValue, TKey, TForm, TGroupKey> & IFormFieldErrorsProps & { ref?: Ref<TextFieldRef> }
) => JSX.Element;

const DropdownBase = <
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined = undefined
>(
	props: DropdownProps<TValue, TKey, TForm, TGroupKey> & IFormFieldErrorsProps,
	ref: ForwardedRef<TextFieldRef>
) => {
	const inputRef = useRef<TextFieldRef>(null);

	useImperativeHandle(ref, () => inputRef.current as TextFieldRef, []);

	const reactFormControllerProps = useReactFormController({
		...props,
		onBlur: () => {
			props?.onBlur?.();
			inputRef?.current?.blur();
		},
	});

	const { valueKey, onClearValue } = props;

	const onOptionSelected = (selectedOption: TValue) => {
		reactFormControllerProps.onChange(selectedOption[valueKey]);
		inputRef.current?.blur();
	};

	const onClear = () => {
		reactFormControllerProps.onChange(undefined);
		onClearValue?.();
	};

	return (
		<DropdownProvider
			dropDownType="single"
			applyFloatingMinWidth={!!props.renderItem}
			inputRef={inputRef}
			onClear={onClear}
			onOptionSelected={onOptionSelected}
			{...{ ...props, ...reactFormControllerProps }}
		>
			<DropdownInputComponent />
			<DropdownMenu />
		</DropdownProvider>
	);
};

const DropdownWithRef = forwardRef(DropdownBase) as unknown as DropdownBaseType;

export const Dropdown = forwardRef(function Dropdown(props, ref?) {
	return <DropdownWithRef {...props} ref={ref} />;
}) as DropdownBaseType;
