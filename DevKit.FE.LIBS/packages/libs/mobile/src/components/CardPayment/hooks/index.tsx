import { useEffect, useState } from 'react';
import { CheckoutExpectedPaymentMethods, TokenizationErrorType } from '@devkit/utilities';
import { useNetInfo } from '@react-native-community/netinfo';

export type CardTokenInfo = {
	card_type: string;
	token: string;
};

export type CardFieldValidator = {
	isValid: boolean;
	isTouched: boolean;
	isEmpty: boolean;
	isFocused: boolean;
};

export const useCheckoutFrames = ({
	paymentMethod,
	acceptedPaymentMethods,
	onTokenizedError,
}: {
	onTokenizedError: ((errorType: TokenizationErrorType) => void) | undefined;
	paymentMethod: keyof typeof CheckoutExpectedPaymentMethods | undefined;
	acceptedPaymentMethods: (keyof typeof CheckoutExpectedPaymentMethods | undefined)[];
}) => {
	const { isInternetReachable } = useNetInfo();

	const [isTokenizingCard, setIsTokenizingCard] = useState(false);
	const [cardHolderName, setCardHolderName] = useState<string>();
	const [isCardTypeSupported, setIsCardTypeSupported] = useState(true);
	const [formValidation, setFormValidation] = useState<{
		[key in 'cardNumber' | 'expiryDate' | 'cvv']: CardFieldValidator;
	}>({
		cardNumber: {
			isValid: false,
			isTouched: false,
			isEmpty: true,
			isFocused: false,
		},
		expiryDate: {
			isValid: false,
			isTouched: false,
			isEmpty: true,
			isFocused: false,
		},
		cvv: { isValid: false, isTouched: false, isEmpty: true, isFocused: false },
	});

	useEffect(() => {
		setIsCardTypeSupported(isSupportedCardType() ?? true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paymentMethod]);

	const isSupportedCardType = () => (paymentMethod ? acceptedPaymentMethods?.includes(paymentMethod) : false);

	const setNextFormValidation = (section: keyof typeof formValidation, newState: Partial<CardFieldValidator>) => {
		setFormValidation({
			...formValidation,
			[section]: {
				...formValidation[section],
				...newState,
			},
		});
	};

	const tokenizeCard = async (): Promise<void> => {
		if (!isInternetReachable) {
			onTokenizedError?.('NetworkErrorOffline');
		}

		setIsTokenizingCard(true);
		try {
			setIsTokenizingCard(false);
		} catch (e) {
			setIsTokenizingCard(false);
			onTokenizedError?.('CardPaymentTokenizationError');
		}
	};

	const isEmptyCheck = (section: keyof typeof formValidation) => {
		const { isEmpty } = formValidation[section];

		return isEmpty;
	};

	return {
		cardHolderName,
		setCardHolderName,
		isSupportedCardType,
		setNextFormValidation,
		formValidation,
		setFormValidation,
		tokenizeCard,
		isTokenizingCard,
		isEmptyCheck,
		isCardTypeSupported,
		setIsCardTypeSupported,
	};
};
