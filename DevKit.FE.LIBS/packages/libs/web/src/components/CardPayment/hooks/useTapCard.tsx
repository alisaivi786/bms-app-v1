import { useEffect, useRef, useState } from 'react';
import { TapExpectedPaymentMethods, logger } from '@devkit/utilities';
import { useWebUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import { initializeTapPayments } from '../configs/configure-tap-payments';

type TapCardProps = {
	tapConfig: {
		publicKey: string;
		providerProfileId: number;
		merchantId: string;
	};
	isDebug?: boolean;
	paymentTokenizeTimeoutInMilliseconds?: number;
	acceptedPaymentMethods?: (keyof typeof TapExpectedPaymentMethods)[];
	showCardHolder?: boolean;
	displayPaymentBrands?: boolean;
};

export type CardTokenInfo = {
	card_type: string;
	token: string;
	url?: string;
};

export const useTapCard = ({
	tapConfig,
	paymentTokenizeTimeoutInMilliseconds = 20000,
	acceptedPaymentMethods = ['Visa', 'Mastercard', 'Mada'],
	showCardHolder = true,
	displayPaymentBrands = false,
}: TapCardProps) => {
	const [isFormReadyState, setIsFormReadyState] = useState<boolean>(false);
	const [isCardValid, setIsCardValid] = useState(false);
	const [canInitSdk, setCanInitSdk] = useState(false);
	const isTokenizingCardRef = useRef<boolean>(false);
	const tokenizationCallbacksRef = useRef<{
		resolve?: (tokenInfo: CardTokenInfo) => void;
		reject?: () => void;
		cancelTimer?: NodeJS.Timeout;
	}>({});

	const { isRtlLocale, locale } = useWebUIConfigOptions();

	const disableCheckoutSubmit = !isCardValid;

	useEffect(() => {
		if (canInitSdk) {
			initializeSDK();
		}
	}, [canInitSdk]);

	const initializeSDK = () => {
		const CardSDK = window?.CardSDK;

		const { Currencies, Locale, Direction } = CardSDK;

		const localeToUse = locale === 'ar' ? Locale.AR : Locale.EN;
		const directionToUse = isRtlLocale ? Direction.RTL : Direction.LTR;

		const { renderTapCard } = CardSDK;

		// Convert accepted payment methods to Tap's expected format
		const supportedBrands = acceptedPaymentMethods.map((method: string) => {
			switch (method) {
				case 'Visa':
					return 'VISA';
				case 'Mastercard':
					return 'MASTERCARD';
				case 'Mada':
					return 'MADA';
				default:
					return method.toUpperCase();
			}
		});

		const { unmount } = renderTapCard('tap-card-container', {
			publicKey: tapConfig.publicKey,
			merchant: {
				id: tapConfig.merchantId,
			},

			transaction: {
				amount: 1,
				currency: Currencies?.SAR || 'SAR',
			},
			acceptance: {
				supportedBrands,
				supportedCards: 'ALL', // Accept both debit and credit cards
			},
			fields: {
				cardHolder: showCardHolder,
			},
			addons: {
				displayPaymentBrands: displayPaymentBrands,
				loader: true,
				saveCard: false,
			},
			interface: {
				locale: localeToUse,
				theme: 'LIGHT',
				edges: 'CURVED',
				direction: directionToUse,
			},
			onReady: () => {
				setIsFormReadyState(true);
			},
			onValidInput: (validInput: boolean) => {
				if (validInput) {
					setIsCardValid(true);
				}
			},
			onInvalidInput: (isInvalid: boolean) => {
				if (isInvalid) {
					setIsCardValid(false);
				}
			},
			onError: (data: unknown) => {
				logger.error('[TapSDK] Error', data);
				setIsCardValid(false);

				// Handle tokenization error if there's a pending callback
				if (tokenizationCallbacksRef.current.reject) {
					// Clear the timeout timer
					if (tokenizationCallbacksRef.current.cancelTimer) {
						clearTimeout(tokenizationCallbacksRef.current.cancelTimer);
					}

					tokenizationCallbacksRef.current.reject();
					tokenizationCallbacksRef.current = {}; // Clear callbacks
					isTokenizingCardRef.current = false;
				}
			},
			onSuccess: (data: { id: string; card?: { brand?: string }; url?: string }) => {
				// Handle tokenization success if there's a pending callback
				if (tokenizationCallbacksRef.current.resolve) {
					// Clear the timeout timer
					if (tokenizationCallbacksRef.current.cancelTimer) {
						clearTimeout(tokenizationCallbacksRef.current.cancelTimer);
					}

					const tokenInfo: CardTokenInfo = {
						token: data.id,
						card_type: data.card?.brand || '',
						url: data.url || '',
					};

					tokenizationCallbacksRef.current.resolve(tokenInfo);
					tokenizationCallbacksRef.current = {};
					isTokenizingCardRef.current = false;
				}
			},
		});

		window.tapUnmount = unmount;
	};

	const submitForm = () =>
		new Promise((resolve: (tokenInfo: CardTokenInfo) => void, reject: () => void) => {
			if (!isTokenizingCardRef.current) {
				isTokenizingCardRef.current = true;
				const CardSDK = window?.CardSDK;

				if (!CardSDK || !CardSDK.tokenize) {
					logger.error('[TapSDK] CardSDK.tokenize method not available');
					isTokenizingCardRef.current = false;
					reject();

					return;
				}

				// Store the callbacks for the onSuccess/onError handlers to use
				tokenizationCallbacksRef.current = { resolve, reject };

				const cancelTokenizeTimer = setTimeout(() => {
					tokenizationCallbacksRef.current = {}; // Clear callbacks
					isTokenizingCardRef.current = false;
					reject();
				}, paymentTokenizeTimeoutInMilliseconds);

				try {
					CardSDK.tokenize();

					// Store the timer reference so it can be cleared in the success/error callbacks
					tokenizationCallbacksRef.current.cancelTimer = cancelTokenizeTimer;
				} catch (error) {
					clearTimeout(cancelTokenizeTimer);
					logger.error('[TapSDK] Error calling tokenize method', error);
					tokenizationCallbacksRef.current = {}; // Clear callbacks
					isTokenizingCardRef.current = false;
					reject();
				}
			}
		});

	const unmountTapSDK = () => {
		// Clean up Tap SDK
		if (typeof window !== 'undefined' && window?.CardSDK) {
			const tapUnmount = window?.tapUnmount;

			if (tapUnmount && typeof tapUnmount === 'function') {
				try {
					tapUnmount();
				} catch (error) {
					logger.error('[TapSDK] Error during unmount', error);
				}
			}
		}
	};

	useEffect(() => {
		initializeTapPayments(() => {
			setCanInitSdk(true);
		});

		return () => {
			unmountTapSDK();
		};
	}, []);

	return {
		isFormReady: isFormReadyState,
		disableCheckoutSubmit: disableCheckoutSubmit,
		submitForm,
	};
};
