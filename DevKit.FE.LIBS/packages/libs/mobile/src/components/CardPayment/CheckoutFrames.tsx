import { CardNumber, Cvv, ExpiryDate, Frames } from 'frames-react-native';
import { FramesConsumer } from 'frames-react-native/dist/Frames';
import { FrameValidationChangedParams } from 'frames-react-native/dist/types/types';
import isEmpty from 'lodash/isEmpty';
import { Ref, forwardRef, useImperativeHandle, useState } from 'react';
import { NativeSyntheticEvent, Platform, TextInputChangeEventData, View } from 'react-native';
import { toast } from '@backpackapp-io/react-native-toast';
import { CommonRegex, logger ,
	CardPaymentLabels,
	CardPaymentRef,
	CheckoutExpectedPaymentMethods,
	TokenizationErrorType,
} from '@devkit/utilities';
import { useNetInfo } from '@react-native-community/netinfo';
import { useMobileUIConfigOptions } from '../../layouts';
import { Button } from '../Buttons';
import { FormFieldErrors } from '../FormFieldErrors';
import { FormLabel } from '../FormLabel';
import { TextField } from '../TextField';
import TextFieldStyles from '../TextField/TextField.styles';
import { CardFieldValidator, CardTokenInfo, useCheckoutFrames } from './hooks/index';

type CheckoutFramesProps = {
	checkoutConfig: {
		publicKey: string;
		providerProfileId: number;
	};
	onCardTokenized: (tokenInfo: CardTokenInfo) => void;
	labels: CardPaymentLabels;
	acceptedPaymentMethods?: (keyof typeof CheckoutExpectedPaymentMethods)[];
	onTokenizedError?: (errorType: TokenizationErrorType) => void;
	onFormValidationChange?: (isValid: boolean) => void;
};

const CheckoutSubmit = ({
	onCardSubmit,
	labels,
	onNetworkError,
	disableCheckoutSubmit,
	isLoading,
}: {
	onNetworkError: () => void;
	onCardSubmit: () => void;
	labels: CardPaymentLabels;
	disableCheckoutSubmit: boolean;
	isLoading: boolean;
}) => {
	const { isInternetReachable } = useNetInfo();

	return (
		<Button
			disabled={!!disableCheckoutSubmit}
			isLoading={isLoading}
			onPress={() => {
				if (!isInternetReachable) onNetworkError();
				else {
					onCardSubmit();
				}
			}}
		>
			{labels.payActionButton}
		</Button>
	);
};

type ErrorFormTypes = {
	emptyError: string;
	invalidError: string;
	section: CardFieldValidator;
};

const isEmptyCheck = (section: CardFieldValidator) => {
	const { isEmpty } = section;

	return isEmpty;
};

const showError = (section: CardFieldValidator) => {
	const { isTouched, isValid } = section;

	return isTouched && !isValid;
};

const ErrorForm = ({ invalidError, emptyError, section }: ErrorFormTypes): JSX.Element => {
	if (showError(section)) return <FormFieldErrors errors={isEmptyCheck(section) ? emptyError : invalidError} />;

	return <></>;
};

const CheckoutFrames = (
	{
		checkoutConfig,
		onCardTokenized,
		labels,
		acceptedPaymentMethods = [],
		onTokenizedError,
		onFormValidationChange,
	}: CheckoutFramesProps,
	ref?: Ref<CardPaymentRef>
) => {
	const { tw } = useMobileUIConfigOptions();
	const [paymentMethod, setPaymentMethod] = useState<keyof typeof CheckoutExpectedPaymentMethods | undefined>(
		undefined
	);

	const {
		cardHolderName,
		setCardHolderName,
		isSupportedCardType,
		formValidation,
		setNextFormValidation,
		isTokenizingCard,
		isCardTypeSupported,
		setIsCardTypeSupported,
		tokenizeCard,
	} = useCheckoutFrames({
		paymentMethod,
		acceptedPaymentMethods,
		onTokenizedError,
	});

	useImperativeHandle(ref, () => ({
		onSubmit: async () => {
			await tokenizeCard();
		},
	}));

	const showToast = () => {
		toast.error(labels.errors.networkError ?? '');
	};

	return (
		<View style={tw`relative`}>
			<Frames
				paymentMethodChanged={(event) => {
					setPaymentMethod(event.paymentMethod as keyof typeof CheckoutExpectedPaymentMethods);
				}}
				frameValidationChanged={(event: FrameValidationChangedParams) => {
					logger.info('[CardPayment] frame validation', event);

					setIsCardTypeSupported(!!isSupportedCardType());

					if (event.element === 'cvv') {
						setNextFormValidation('cvv', {
							isValid: event.isValid,
						});
					} else if (event.element === 'card-number') {
						setNextFormValidation('cardNumber', {
							isValid: event.isValid,
						});
					} else if (event.element === 'expiry-date') {
						setNextFormValidation('expiryDate', {
							isValid: event.isValid,
						});
					}
				}}
				cardTokenized={(tokenization) => {
					onCardTokenized({ card_type: tokenization.card_type ?? '', token: tokenization.token });
				}}
				cardTokenizationFailed={(error) => onTokenizedError?.(error.error_type as TokenizationErrorType)}
				cardValidationChanged={(event) => {
					onFormValidationChange?.(event.isValid);
				}}
				config={{
					debug: false,
					publicKey: checkoutConfig.publicKey,
					cardholder: {
						name: cardHolderName,
					},
				}}
			>
				<View style={tw`w-full gap-2`}>
					{/* Card Holder Name */}
					<TextField
						label={labels?.cardHolderName.label}
						placeholder={labels?.cardHolderName.placeholder}
						value={cardHolderName}
						onChange={(value) => setCardHolderName(value)}
						maxLength={50}
						regex={CommonRegex.alphabetEnglish}
					/>

					<>
						<FormLabel>{labels.cardNumber.label}</FormLabel>
						{/* Card Number */}
						<CardNumber
							onFocus={() => {
								setNextFormValidation('cardNumber', { isFocused: true });
							}}
							placeholderTextColor="#9898A0"
							style={tw`${TextFieldStyles.inputContainer(
								false,
								showError(formValidation.cardNumber),
								formValidation.cardNumber.isFocused ?? false,
								false
							)} p-2`}
							autoFocus
							returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
							onBlur={() => {
								setNextFormValidation('cardNumber', {
									isTouched: true,
									isFocused: false,
								});
							}}
							onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
								setNextFormValidation('cardNumber', {
									isTouched: true,
									isEmpty: !e.nativeEvent.text.length,
								});
							}}
						/>

						{ErrorForm({
							invalidError: labels.errors.invalid.cardNumber,
							emptyError: labels.errors.empty.cardNumber,
							section: formValidation.cardNumber,
						})}
						{!isEmpty(FormFieldErrors) &&
							!isCardTypeSupported &&
							!showError(formValidation.cardNumber) &&
							formValidation.cardNumber.isTouched && <FormFieldErrors errors={labels.errors.cardTypeNotSupported} />}
					</>

					<>
						<FormLabel>{labels.expiryDate.label}</FormLabel>
						<ExpiryDate
							onFocus={() => {
								setNextFormValidation('expiryDate', { isFocused: true });
							}}
							style={tw`${TextFieldStyles.inputContainer(
								false,
								showError(formValidation.expiryDate),
								formValidation.expiryDate.isFocused ?? false,
								false
							)} p-2`}
							returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
							placeholderTextColor="#9898A0"
							onBlur={() => {
								setNextFormValidation('expiryDate', {
									isTouched: true,
									isFocused: false,
								});
							}}
							onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
								setNextFormValidation('expiryDate', {
									isTouched: false,
									isEmpty: !e.nativeEvent.text.length,
								});
							}}
						/>

						{ErrorForm({
							invalidError: labels.errors.invalid.expiryDate,
							emptyError: labels.errors.empty.expiryDate,
							section: formValidation.expiryDate,
						})}
					</>

					<>
						<FormLabel popover={{ header: labels.cvv.popover, description: '' }}>{labels.cvv.label}</FormLabel>

						<Cvv
							onFocus={() => {
								setNextFormValidation('cvv', { isFocused: true });
							}}
							style={tw`${TextFieldStyles.inputContainer(
								false,
								showError(formValidation.cvv),
								formValidation.cvv.isFocused ?? false,
								false
							)} p-2`}
							onBlur={() => {
								setNextFormValidation('cvv', {
									isTouched: true,
									isFocused: false,
								});
							}}
							onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
								setNextFormValidation('cvv', {
									isTouched: false,
									isEmpty: !e.nativeEvent.text.length,
								});
							}}
							placeholderTextColor="#9898A0"
						/>
						{ErrorForm({
							invalidError: labels.errors.invalid.cvv,
							emptyError: labels.errors.empty.cvv,
							section: formValidation.cvv,
						})}
					</>

					<FramesConsumer>
						{({ submitCard }) => (
							<>
								{labels?.payActionButton && (
									<CheckoutSubmit
										isLoading={!!isTokenizingCard}
										disableCheckoutSubmit={
											!formValidation.cardNumber.isValid ||
											!formValidation.expiryDate.isValid ||
											!formValidation.cvv.isValid ||
											!isCardTypeSupported
										}
										labels={labels}
										onCardSubmit={() => {
											submitCard();
										}}
										onNetworkError={showToast}
									/>
								)}
							</>
						)}
					</FramesConsumer>
				</View>
			</Frames>
		</View>
	);
};

export default forwardRef(CheckoutFrames);
