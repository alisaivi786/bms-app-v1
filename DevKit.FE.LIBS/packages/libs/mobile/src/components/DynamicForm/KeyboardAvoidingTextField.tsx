import { TextField, ITextFieldMobileProps } from '../TextField/TextField';
import { FieldValues } from '@devkit/utilities';
import { forwardRef, memo } from 'react';
import { TextInput } from 'react-native';
import { BottomSheetInputBase } from './BottomSheetInputBase';

const KeyboardAvoidingTextFieldComponent = <IFormFields extends FieldValues>(
	{ onFocus, onBlur, ...rest }: ITextFieldMobileProps<IFormFields>,
	providedRef: React.ForwardedRef<TextInput>,
) => {
	return (
		<BottomSheetInputBase ref={providedRef} onFocus={onFocus} onBlur={onBlur}>
			{(handleOnFocus, handleOnBlur) => (
				<TextField
					{...rest}
					onFocus={handleOnFocus as (e?: object | undefined) => void}
					onBlur={handleOnBlur as (e?: object | undefined) => void}
				/>
			)}
		</BottomSheetInputBase>
	);
};

export const KeyboardAvoidingTextField = memo(
	forwardRef(KeyboardAvoidingTextFieldComponent),
) as <IFormFields extends FieldValues>(
	props: ITextFieldMobileProps<IFormFields> & {
		ref?: React.ForwardedRef<TextInput>;
	},
) => React.ReactElement;


