import { NumberField, INumberFieldMobileProps } from '../TextField/TextField';
import { FieldValues } from '@devkit/utilities';
import { forwardRef, memo } from 'react';
import { TextInput } from 'react-native';
import { BottomSheetInputBase } from './BottomSheetInputBase';

const KeyboardAvoidingNumberFieldComponent = <IFormFields extends FieldValues>(
	{ onFocus, onBlur, ...rest }: INumberFieldMobileProps<IFormFields>,
	providedRef: React.ForwardedRef<TextInput>,
) => {
	return (
		<BottomSheetInputBase ref={providedRef} onFocus={onFocus} onBlur={onBlur}>
			{(handleOnFocus, handleOnBlur) => (
				<NumberField
					{...rest}
					onFocus={handleOnFocus as (e?: object | undefined) => void}
					onBlur={handleOnBlur as (e?: object | undefined) => void}
				/>
			)}
		</BottomSheetInputBase>
	);
};

export const KeyboardAvoidingNumberField = memo(
	forwardRef(KeyboardAvoidingNumberFieldComponent),
) as <IFormFields extends FieldValues>(
	props: INumberFieldMobileProps<IFormFields> & {
		ref?: React.ForwardedRef<TextInput>;
	},
) => React.ReactElement;


