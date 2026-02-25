import { ElementRef, ForwardedRef, ReactNode, Ref, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ArrowDownIcon, ArrowUpIcon } from '@devkit/icons/native';
import {
	DropdownProps,
	FieldValues,
	PrimitiveKeys,
	StringAndNumberKeys,
	useReactFormController,
} from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts';
import { FormFieldErrors } from '../FormFieldErrors';
import { FormInputGroup } from '../FormInputGroup';
import styles from './Dropdown.styles';
import DropdownBottomSheet from './common/DropdownBottomSheet';

export type DropdownMobileProps<
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
> = DropdownProps<TValue, TKey, TForm, TGroupKey> & {
	snapPoints?: Array<string>;
	bottomSheetTitle?: string;
	bottomSheetCloseButton?: boolean;
	bottomSheetTitleNode?: ReactNode;
	withModal?: boolean;
};

type DropdownMobileRef = ElementRef<typeof Pressable> & {
	open?: () => void;
	close?: () => void;
	toggle?: () => void;
	press?: () => void;
};

type DropdownBaseType = <
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined = undefined
>(
	props: DropdownMobileProps<TValue, TKey, TForm, TGroupKey> & { ref?: Ref<DropdownMobileRef> }
) => JSX.Element;

const DropdownBase = <
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
>(
	props: DropdownMobileProps<TValue, TKey, TForm, TGroupKey>,
	ref: ForwardedRef<DropdownMobileRef>
) => {
	const {
		options,
		placeholder,
		disabled = false,
		isSearchable = false,
		searchPlaceHolder,
		noOptionAvailableText,
		snapPoints,
		labelKey,
		valueKey,
		renderItem,
		renderSelectedItem,
		bottomSheetTitle,
		bottomSheetTitleNode,
		bottomSheetCloseButton = false,
		withModal,
		variant,
		label,
		isRequired,
		popover,
		popoverVariant,
		layoutClassName,
		reserveLabelSpacing,
		form,
		field,
		value: propsValue,
		onChange: propsOnChange,
		getIsItemDisabled,
		directionForInput,
	} = props;
	const [isOpen, setIsOpen] = useState(false);
	const inputRef = useRef<DropdownMobileRef | null>(null);

	const open = () => setIsOpen(true);
	const close = () => setIsOpen(false);
	const toggle = () => setIsOpen((v) => !v);

	useImperativeHandle(
		ref,
		() => ({ ...(inputRef.current as DropdownMobileRef), open, close, toggle, press: toggle } as DropdownMobileRef),
		[inputRef]
	);

	const { tw, isRtlLocale } = useMobileUIConfigOptions();

	const dir = directionForInput ?? (isRtlLocale ? 'rtl' : 'ltr');

	const menuStyles = styles.menu();

	const Icon = isOpen ? ArrowUpIcon : ArrowDownIcon;

	const { onChange: formOnChange, value: formValue, hasErrors, errors, formId } = useReactFormController(props);
	const isReactForm = form && field;
	const value = isReactForm ? formValue : propsValue;
	const onChange = isReactForm ? formOnChange : propsOnChange;
	const selectedOption = options?.find((option) => option[valueKey] === value);

	const onValueChange = (nextValue: TValue[TKey] | undefined) => {
		onChange?.(nextValue);
	};

	const appliedOptionLabel = options
		?.filter((option) => (Array.isArray(value) ? value.includes(option[valueKey]) : option[valueKey] === value))
		.map((option) => option[labelKey ?? (valueKey as keyof typeof option)])
		.join(',');

	const renderMenuVariant = () => (
		<View style={tw`${menuStyles.container(dir === 'rtl')}`}>
			{renderSelectedItem ? (
				renderSelectedItem(selectedOption, isOpen, hasErrors)
			) : (
				<Text style={tw`${menuStyles.label}`}>{appliedOptionLabel || placeholder}</Text>
			)}
			<Icon height={8} width={16} style={tw`${menuStyles.icon}`} />
		</View>
	);

	const renderDefaultVariant = () => {
		return (
			<View style={tw`flex-row justify-between items-center`}>
				{renderSelectedItem ? (
					renderSelectedItem(selectedOption, isOpen, hasErrors)
				) : (
					<View style={tw`${styles.inputArea(hasErrors, isOpen)}`}>
						<Text style={tw`${styles.text(disabled, hasErrors, !!appliedOptionLabel)}`} numberOfLines={1}>
							{appliedOptionLabel ? appliedOptionLabel : placeholder ?? ''}
						</Text>
						{isOpen ? (
							<ArrowUpIcon height={9} width={15} color={tw.color(styles.iconColor(disabled, hasErrors))} />
						) : (
							<ArrowDownIcon height={9} width={15} color={tw.color(styles.iconColor(disabled, hasErrors))} />
						)}
					</View>
				)}
			</View>
		);
	};

	return (
		<>
			<View>
				<FormInputGroup
					label={label}
					isRequired={isRequired}
					popover={popover}
					popoverVariant={popoverVariant}
					layoutClassName={layoutClassName}
					reserveLabelSpacing={reserveLabelSpacing}
					formId={formId}
					hasErrors={hasErrors}
				>
					<Pressable
						ref={inputRef}
						onPress={() => {
							if (disabled) return;
							setIsOpen(!isOpen);
						}}
						hitSlop={variant === 'menu' ? 20 : undefined}
					>
						{variant === 'menu' ? renderMenuVariant() : renderDefaultVariant()}
					</Pressable>
					{hasErrors && (
						<View style={tw`${styles.footerContainer}`}>
							<FormFieldErrors errors={errors} />
						</View>
					)}
				</FormInputGroup>
			</View>
			<DropdownBottomSheet
				isOpen={isOpen}
				options={options}
				isSearchable={isSearchable}
				searchPlaceHolder={searchPlaceHolder}
				noOptionAvailableText={noOptionAvailableText}
				snapPoints={snapPoints}
				onChange={onValueChange}
				renderItem={renderItem}
				labelKey={labelKey}
				valueKey={valueKey}
				bottomSheetTitle={bottomSheetTitle}
				bottomSheetTitleNode={bottomSheetTitleNode}
				bottomSheetCloseButton={bottomSheetCloseButton}
				getIsItemDisabled={getIsItemDisabled}
				withModal={withModal}
				onBottomSheetClose={() => {
					setIsOpen(false);
				}}
			/>
		</>
	);
};

const DropdownWithRef = forwardRef(DropdownBase) as unknown as DropdownBaseType;

const Dropdown = forwardRef(function Dropdown(props, ref?) {
	return <DropdownWithRef {...props} ref={ref} />;
}) as DropdownBaseType;

export default Dropdown;
