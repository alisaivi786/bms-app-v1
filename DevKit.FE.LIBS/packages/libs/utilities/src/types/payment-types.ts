import { TwLayoutClassName } from '.';
import { CheckoutExpectedPaymentMethods, EPaymentVendors, TapExpectedPaymentMethods } from '../common/Enums';

export type CardPaymentLabels = {
	/**
	 * Card holder
	 */
	cardHolderName: {
		label: string;
		placeholder: string;
	};
	/**
	 * Card number
	 */
	cardNumber: {
		label: string;
	};
	/**
	 * Expiry date
	 */
	expiryDate: {
		label: string;
	};
	/**
	 * CVV
	 */
	cvv: {
		label: string;
		popover: string;
	};
	/**
	 * Label for payment action button
	 */
	payActionButton?: string;
	/**
	 * Error Messages to be shown wh
	 */
	errors: {
		empty: {
			cardNumber: string;
			expiryDate: string;
			cvv: string;
		};
		invalid: {
			cardNumber: string;
			expiryDate: string;
			cvv: string;
		};
		cardTypeNotSupported: string;
		networkError?: string;
	};
};

export type TapPaymentLabels = {
	/**
	 * Label for payment action button
	 */
	payActionButton?: string;
};

export type TokenizationErrorType = 'NetworkErrorOffline' | 'CardPaymentTokenizationError' | 'CancelledByUser';

export type CardPaymentBaseProps = {
	/**
	 * Method to execute to capture payment
	 * @param cardType
	 */
	capturePayment: (cardType: string | undefined) => Promise<void>;

	/**
	 * Override or extend the styles applied to the component
	 */
	layoutClassName?: TwLayoutClassName;
	/**
	 * Link to redirect to after successful 3DS payment //used in Mobile only
	 */
	redirectUrl?: string | string[];

	scrollEnabled?: boolean;
};

export type CardPaymentCheckoutProps = CardPaymentBaseProps & {
	/** Vendor discriminator */
	vendor?: EPaymentVendors.CheckoutUAE;
	/**
	 * Payment public key
	 */
	paymentPublicKey: string;
	/**
	 * Callback function to be called when the card tokenization fails
	 * Will return the error type as a string
	 * @param errorType
	 */
	onTokenizedError?: (errorType: TokenizationErrorType) => void;
	/**
	 * The labels of the different elements (action button, cvv, card holder name, expiry date, etc..)
	 */
	labels: CardPaymentLabels;
	/**
	 * whether to show or hide the close button on the 3DS modal
	 */
	allow3dsModalClose?: boolean;
	/**
	 * Method to execute to authorize payment
	 * It can return the 3DS url or return undefined if no 3DS is setup for the card
	 * @param cardToken
	 * @returns a promise
	 */
	authorizePayment: (cardToken: string) => Promise<string | undefined>;
	/**
	 * The accepted payment methods (Visa, Mastercard, etc..)
	 */
	acceptedPaymentMethods?: (keyof typeof CheckoutExpectedPaymentMethods)[];

	/**
	 * Callback function to provide if the form is valid or not
	 */

	onFormValidationChange?: (isValid: boolean) => void;
};

export type CardPaymentTapProps = CardPaymentBaseProps & {
	/** Vendor discriminator */
	vendor?: EPaymentVendors.Tap;
	/**
	 * Payment public key
	 */
	paymentPublicKey: string;
	/**
	 * Callback function to be called when the card tokenization fails
	 * Will return the error type as a string
	 * @param errorType
	 */
	onTokenizedError?: (errorType: TokenizationErrorType) => void;
	/**
	 * The labels of the different elements (action button, cvv, card holder name, expiry date, etc..)
	 */
	labels: TapPaymentLabels;
	/**
	 * whether to show or hide the close button on the 3DS modal
	 */
	allow3dsModalClose?: boolean;
	/**
	 * Method to execute to authorize payment
	 * It can return the 3DS url or return undefined if no 3DS is setup for the card
	 * @param cardToken
	 * @returns a promise
	 */
	authorizePayment: (cardToken: string) => Promise<string | undefined>;
	/**
	 * The accepted payment methods (Visa, Mastercard, etc..)
	 */
	acceptedPaymentMethods?: (keyof typeof TapExpectedPaymentMethods)[];
	/**
	 * Merchant ID for the payment
	 */
	merchantId: string;
	/**
	 * Controls whether to show the card holder field in the Tap SDK form
	 * @default true
	 */
	showCardHolder?: boolean;
	/**
	 * Controls whether to display payment brands in the Tap SDK form
	 * @default false
	 */
	displayPaymentBrands?: boolean;
};

export type CardPaymentTelrProps = CardPaymentBaseProps & {
	/** Vendor discriminator */
	vendor: EPaymentVendors.TelrUAE;
	/**
	 * Method to execute to authorize payment
	 * It can return the 3DS url or return undefined if no 3DS is setup for the card
	 * @returns a promise
	 */
	authorizePayment: () => Promise<string | undefined>;
};

export type CardPaymentProps = CardPaymentCheckoutProps | CardPaymentTelrProps | CardPaymentTapProps;

export type CardPaymentRef = {
	/**
	 * Method to trigger the form with custom button using ref.
	 * Will return the isTokenizingCard type as a boolean and disableCheckoutSubmit as a boolean.
	 *
	 */
	onSubmit: () => Promise<void>;
};

export type CardPaymentErrors = 'NetworkErrorOffline' | 'CardPaymentTokenizationError';
