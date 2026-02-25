import { CardPaymentProps, logger } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { CardPayment as CardPaymentComponent } from '../../../src/components/CardPayment';

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
			paymentPublicKey="pk_sbox_5mklxhov3njqkhfzdgxmaeqz2e5"
			authorizePayment={async () => {
				logger.log('3DS URL');

				return '3DS URL';
			}}
			capturePayment={async () => {
				logger.log('Capture Payment');
			}}
			labels={labels}
			allow3dsModalClose={true}
		/>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'WEB/CardPayment',
	component: CardPaymentComponent,
	render: Template,
};

export default StoryMeta;

export const CardPayment: StoryObj<ComponentType> = {
	render: Template,
	args: {
		paymentPublicKey: 'pk_sbox_5mklxhov3njqkhfzdgxmaeqz2e5',
		authorizePayment: async () => {
			logger.log('Checkout Authorize');

			return 'Checkout Authorize';
		},
		capturePayment: async () => {
			logger.log('Checkout Captured');
		},
		labels: labels,
	},
};
