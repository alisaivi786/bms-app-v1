import { Ref, forwardRef, useImperativeHandle, useState } from 'react';
import {
	CardPaymentLabels,
	CardPaymentRef,
	CheckoutExpectedPaymentMethods,
	TokenizationErrorType,
 CommonRegex } from '@devkit/utilities';
import { Button } from '../Buttons';
import { FormContainer } from '../FormContainer/FormContainer';
import { Spinner } from '../Spinner';
import { TextField } from '../TextField';
import PaymentFormInputGroup from './components/PaymentFormInputGroup';
import { CardTokenInfo, useCheckoutFrames } from './hooks/index';

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

const CheckoutFrames = (
	{
		checkoutConfig,
		onCardTokenized,
		labels,
		acceptedPaymentMethods,
		onTokenizedError,
		onFormValidationChange,
	}: CheckoutFramesProps,
	ref?: Ref<CardPaymentRef>
) => {
	const [isTokenizingCard, setIsTokenizingCard] = useState(false);

	const {
		isFormReady,
		cardPaymentMethodName,
		cardHolderName,
		disableCheckoutSubmit,
		setCardHolderName,
		submitForm,
		fieldsErrors,
		fieldsState,
	} = useCheckoutFrames({
		checkoutConfig,
		labels,
		acceptedPaymentMethods,
		onFormValidationChange,
	});

	const tokenizeCard = async (): Promise<void> => {
		if (!navigator.onLine) {
			onTokenizedError?.('NetworkErrorOffline');
		}

		setIsTokenizingCard(true);
		try {
			const cardToken = await submitForm();

			setIsTokenizingCard(false);
			onCardTokenized(cardToken);
		} catch (e) {
			setIsTokenizingCard(false);
			onTokenizedError?.('CardPaymentTokenizationError');
		}
	};

	useImperativeHandle(ref, () => ({
		onSubmit: async () => {
			await tokenizeCard();
		},
	}));

	return (
		<div className="relative">
			<FormContainer>
				{/* Card Holder Name */}
				<TextField
					label={labels?.cardHolderName.label}
					placeholder={labels?.cardHolderName.placeholder}
					value={cardHolderName}
					onChange={(value) => setCardHolderName(value)}
					maxLength={50}
					regex={CommonRegex.alphabetEnglish}
				></TextField>
				{/* Card Number */}
				<PaymentFormInputGroup
					inputName="card-number-frame"
					layoutClassName="flex-1"
					isFocus={fieldsState['card-number'].isFocus}
					errors={!fieldsState['card-number'].isFocus ? fieldsErrors['card-number'] : ''}
					label={labels?.cardNumber.label || ''}
					image={{ name: cardPaymentMethodName, alt: 'card payment method' }}
					isTouched={fieldsState['card-number'].isTouched}
				/>

				{/* Expiry and CVV */}
				<div className="flex flex-col md:flex-row gap-5">
					<PaymentFormInputGroup
						inputName="expiry-date-frame"
						layoutClassName="flex-1"
						isFocus={fieldsState['expiry-date'].isFocus}
						errors={!fieldsState['expiry-date'].isFocus ? fieldsErrors['expiry-date'] : ''}
						label={labels?.expiryDate.label || ''}
						isTouched={fieldsState['expiry-date'].isTouched}
					/>
					<PaymentFormInputGroup
						isFocus={fieldsState.cvv.isFocus}
						inputName="cvv-frame"
						layoutClassName="flex-1"
						popover={labels?.cvv.popover}
						errors={!fieldsState.cvv.isFocus ? fieldsErrors.cvv : ''}
						label={labels?.cvv.label || ''}
						isTouched={fieldsState.cvv.isTouched}
					/>
				</div>
				{labels?.payActionButton && (
					<Button
						variant="primary"
						layoutClassName={['w-full']}
						onClick={tokenizeCard}
						isLoading={isTokenizingCard}
						disabled={disableCheckoutSubmit}
					>
						{labels?.payActionButton}
					</Button>
				)}

				{!isFormReady && (
					<div className="flex items-center justify-center absolute top-0 w-full h-full bg-white">
						<Spinner borderWidth={2} size={20} />
					</div>
				)}
			</FormContainer>
		</div>
	);
};

export default forwardRef(CheckoutFrames);
