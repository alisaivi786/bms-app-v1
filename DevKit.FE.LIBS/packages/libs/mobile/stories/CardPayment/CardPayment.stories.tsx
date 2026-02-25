import { CardPaymentProps, EPaymentVendors, logger } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { CardPayment as CardPaymentComponent } from '../../src/components/CardPayment';

type ComponentType = (args: CardPaymentProps) => JSX.Element;

const errorMessages = {
	generalPaymentError: 'Something Went Wrong',
	fetchError: 'Something Went Wrong',
	empty: {
		cardNumber: 'Card Number is Required',
		expiryDate: 'Expiry Date is Required',
		cvv: 'CVV is Required',
	},
	invalid: {
		cardNumber: 'Card Number is Invalid',
		expiryDate: 'Expiry Date is Invalid',
		cvv: 'CVV is Invalid',
	},
	cardTypeNotSupported: 'Card Type is not supported',
	networkError: 'Unable to connect. Please check your internet connection and try again.',
};

const labels = {
	cardHolderName: {
		label: 'Card Holder Name',
		placeholder: 'Card Holder Name',
	},
	cardNumber: {
		label: 'Card Number',
	},
	expiryDate: {
		label: 'Expiry Date',
	},
	cvv: {
		label: 'CVV',
		popover: 'CVV',
	},
	payActionButton: 'Pay',
	errors: {
		...errorMessages,
	},
};

const Template: StoryFn<ComponentType> = () => {
	return (
		<CardPaymentComponent
			vendor={EPaymentVendors.CheckoutUAE}
			redirectUrl="https://uat.shory.com/payment-done.html"
			paymentPublicKey="pk_sbox_5mklxhov3njqkhfzdgxmaeqz2e5"
			authorizePayment={async () => {
				logger.log('3DS URL');

				return 'https://authentication-devices.sandbox.checkout.com/sessions-interceptor/sid_ft3yl2jydmhu3c5g2wxuuewk6m';
			}}
			capturePayment={async () => {
				logger.log('Capture Payment');
			}}
			acceptedPaymentMethods={['Visa', 'Mastercard']}
			labels={labels}
			allow3dsModalClose={true}
		/>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Components/CardPayment',
	component: CardPaymentComponent,
	render: Template,
};

export default StoryMeta;

export const CardPayment: StoryObj<ComponentType> = {
	render: Template,
	args: {
		vendor: EPaymentVendors.CheckoutUAE,
		paymentPublicKey: 'pk_sbox_5mklxhov3njqkhfzdgxmaeqz2e5',
		authorizePayment: async () => {
			logger.log('Checkout Authorize');

			return 'https://authentication-devices.sandbox.checkout.com/sessions-interceptor/sid_jnnup6f7tjzezbrz6q3fvfjevy';
		},
		capturePayment: async () => {
			logger.log('Checkout Captured');
		},
		labels: labels,
	},
};
