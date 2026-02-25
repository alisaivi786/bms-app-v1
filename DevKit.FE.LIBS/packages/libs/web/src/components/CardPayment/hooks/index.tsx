import cloneDeep from 'lodash/cloneDeep';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CardPaymentLabels, CheckoutExpectedPaymentMethods, logger } from '@devkit/utilities';
import textFieldStyles from '../../TextField/TextField.styles';
import { cleanCheckoutFramesScript, initializeCheckoutFrames } from '../configs/configure-checkout-frames';

type CheckoutFramesProps = {
	checkoutConfig: {
		publicKey: string;
		providerProfileId: number;
	};
	isDebug?: boolean;
	paymentTokenizeTimeoutInMilliseconds?: number;
	labels: CardPaymentLabels;
	acceptedPaymentMethods?: (keyof typeof CheckoutExpectedPaymentMethods)[];
	onFormValidationChange?: (isValid: boolean) => void;
};

export type CardTokenInfo = {
	card_type: string;
	token: string;
};

type FramesFieldType = 'card-number' | 'expiry-date' | 'cvv';

export const useCheckoutFrames = ({
	checkoutConfig,
	isDebug = false,
	paymentTokenizeTimeoutInMilliseconds = 20000,
	labels,
	acceptedPaymentMethods = ['Visa', 'Mastercard'],
	onFormValidationChange,
}: CheckoutFramesProps) => {
	const [isFormReady, setIsFormReady] = useState(false);
	const [isNotSupportedCard, setIsNotSupportedCard] = useState(false);
	const [isCardValid, setIsCardValid] = useState(false);
	const [cardPaymentMethodName, setCardPaymentMethodName] = useState<CheckoutExpectedPaymentMethods>();
	const [cardHolderName, setCardHolderName] = useState<string>();
	const isTokenizingCardRef = useRef<boolean>(false);
	const disableCheckoutSubmitRef = useRef<boolean>(true);
	const [fieldsState, setFieldsState] = useState<{
		[key in FramesFieldType]: {
			isEmpty: boolean;
			isFocus: boolean;
			isValid: boolean;
			isTouched: boolean;
		};
	}>({
		'card-number': {
			isEmpty: true,
			isFocus: false,
			isValid: false,
			isTouched: false,
		},
		'expiry-date': {
			isEmpty: true,
			isFocus: false,
			isValid: false,
			isTouched: false,
		},
		cvv: { isEmpty: true, isFocus: false, isValid: false, isTouched: false },
	});

	const disableCheckoutSubmit = useMemo(() => {
		const isFormValid = !isNotSupportedCard && isCardValid;
		const disableCheckoutSubmitNew = !isFormValid;

		if (disableCheckoutSubmitRef.current !== disableCheckoutSubmitNew) {
			onFormValidationChange?.(!disableCheckoutSubmitNew);
		}

		disableCheckoutSubmitRef.current = disableCheckoutSubmitNew;

		return disableCheckoutSubmitNew;
	}, [isNotSupportedCard, isCardValid]);

	const isInitializeFramesCalled = useRef(false);

	const initializeFrames = () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const Frames = (window as any).Frames;

		logger.info('[CheckoutFrames] initializeFrames  called');

		if (isInitializeFramesCalled.current) return;
		isInitializeFramesCalled.current = true;

		setIsFormReady(false);

		Frames.init({
			...checkoutConfig,
			localization: {
				cardNumberPlaceholder: '•••• •••• •••• ••••',
				cvvPlaceholder: '•••',
				expiryMonthPlaceholder: 'MM',
				expiryYearPlaceholder: 'YY',
			},
			style: textFieldStyles.paymentInputStyles,
			debug: isDebug,
			acceptedPaymentMethods,
		});

		Frames.enableSubmitForm(true);

		Frames.addEventHandler(Frames.Events.READY, (event: unknown) => {
			logger.log(`[CheckoutFrames] ${Frames.Events.READY}`, event);
			setIsFormReady(true);
		});

		Frames.addEventHandler(Frames.Events.CARD_VALIDATION_CHANGED, (eventData: { isValid: boolean }) => {
			const { isValid } = eventData;

			logger.log(`[CheckoutFrames] ${Frames.Events.CARD_VALIDATION_CHANGED}`, eventData);
			setIsCardValid(isValid);
		});

		Frames.addEventHandler(
			Frames.Events.PAYMENT_METHOD_CHANGED,
			(eventData: { paymentMethod: CheckoutExpectedPaymentMethods; isPaymentMethodAccepted: boolean }) => {
				const { paymentMethod, isPaymentMethodAccepted } = eventData;

				logger.log(`[CheckoutFrames] ${Frames.Events.PAYMENT_METHOD_CHANGED}`, eventData);
				setCardPaymentMethodName(paymentMethod);
				setIsNotSupportedCard(!isPaymentMethodAccepted);
			}
		);

		Frames.addEventHandler(
			Frames.Events.FRAME_VALIDATION_CHANGED,
			(eventData: { element: FramesFieldType; isValid: boolean; isEmpty: boolean }) => {
				const { element, isValid, isEmpty } = eventData;

				logger.log(`[CheckoutFrames] ${Frames.Events.FRAME_VALIDATION_CHANGED}`, eventData);
				setFieldsState((prevState) => {
					const nextState = cloneDeep(prevState);

					nextState[element].isEmpty = isEmpty;
					nextState[element].isValid = isValid;

					if (prevState[element].isFocus) nextState[element].isTouched = false;

					return nextState;
				});
			}
		);

		Frames.addEventHandler(Frames.Events.FRAME_BLUR, (eventData: { element: FramesFieldType }) => {
			const { element } = eventData;

			logger.log(`[CheckoutFrames] ${Frames.Events.FRAME_BLUR}`, eventData);
			setFieldsState((prevState) => {
				const nextState = cloneDeep(prevState);

				// this condition is to fix ( all fields get touched when focusing one of them on IOS real Device )
				if (nextState[element].isFocus) nextState[element].isTouched = true;
				nextState[element].isFocus = false;

				return nextState;
			});
		});
		Frames.addEventHandler(Frames.Events.FRAME_FOCUS, (eventData: { element: FramesFieldType }) => {
			const { element } = eventData;

			logger.log(`[CheckoutFrames] ${Frames.Events.FRAME_FOCUS}`, eventData);
			setFieldsState((prevState) => {
				const nextState = cloneDeep(prevState);

				nextState[element].isFocus = true;

				return nextState;
			});
		});
	};

	const fieldsErrors: {
		[key in FramesFieldType]: string;
	} = {
		'card-number':
			(fieldsState['card-number'].isEmpty
				? labels?.errors.empty.cardNumber
				: fieldsState['card-number'].isValid
				? isNotSupportedCard
					? labels?.errors.cardTypeNotSupported
					: ''
				: labels?.errors.invalid.cardNumber) || '',
		'expiry-date':
			(fieldsState['expiry-date'].isEmpty
				? labels?.errors.empty.expiryDate
				: fieldsState['expiry-date'].isValid
				? ''
				: labels?.errors.invalid.expiryDate) || '',
		cvv:
			(fieldsState.cvv.isEmpty
				? labels?.errors.empty.cvv
				: fieldsState.cvv.isValid
				? ''
				: labels?.errors.invalid.cvv) || '',
	};

	const submitForm = () =>
		new Promise((resolve: (tokenInfo: CardTokenInfo) => void, reject: () => void) => {
			if (!isTokenizingCardRef.current) {
				isTokenizingCardRef.current = true;
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const Frames = (window as any).Frames;

				Frames.removeAllEventHandlers(Frames.Events.CARD_TOKENIZED);
				Frames.removeAllEventHandlers(Frames.Events.CARD_TOKENIZATION_FAILED);

				const cancelTokenizeTimer = setTimeout(() => {
					Frames.removeAllEventHandlers(Frames.Events.CARD_TOKENIZED);
					Frames.removeAllEventHandlers(Frames.Events.CARD_TOKENIZATION_FAILED);
					reject();
				}, paymentTokenizeTimeoutInMilliseconds);

				Frames.addEventHandler(Frames.Events.CARD_TOKENIZED, (tokenInfo: CardTokenInfo) => {
					if (cancelTokenizeTimer) {
						clearTimeout(cancelTokenizeTimer);
					}

					logger.log('Frames.Events.CARD_TOKENIZED', tokenInfo);

					resolve(tokenInfo);
					isTokenizingCardRef.current = false;
				});

				Frames.addEventHandler(Frames.Events.CARD_TOKENIZATION_FAILED, (eventData: unknown) => {
					if (cancelTokenizeTimer) {
						clearTimeout(cancelTokenizeTimer);
					}

					logger.log('Frames.Events.CARD_TOKENIZATION_FAILED', eventData);
					isTokenizingCardRef.current = false;
					reject();
				});

				Frames.enableSubmitForm();
				Frames.submitCard();
			}
		});

	/**
	 * This useEffect function initializes the checkout frames and loads the checkout
	 * frames script.
	 * On cleanup, it removes the checkout frames script by calling the "cleanCheckoutFramesScript" function.
	 */
	useEffect(() => {
		logger.info('[CheckoutFrames][useEffect] mount');

		initializeCheckoutFrames(() => {
			// load checkout frames script
			initializeFrames();
		});

		return () => {
			cleanCheckoutFramesScript();
		};
	}, []);

	return {
		isFormReady,
		cardPaymentMethodName,
		cardHolderName,
		disableCheckoutSubmit,
		setCardHolderName,
		submitForm,
		fieldsState,
		fieldsErrors,
	};
};
