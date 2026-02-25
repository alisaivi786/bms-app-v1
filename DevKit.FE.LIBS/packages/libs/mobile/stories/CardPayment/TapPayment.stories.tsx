import { CardPaymentProps, EPaymentVendors, logger } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { CardPayment as CardPaymentComponent } from '../../src/components/CardPayment';

type ComponentType = (args: CardPaymentProps) => JSX.Element;

const labels = {
	payActionButton: 'Pay',
};

const Template: StoryFn<ComponentType> = () => {
	return (
		<CardPaymentComponent
			vendor={EPaymentVendors.Tap}
			redirectUrl="https://dev.shory.com/payment-done.html"
			paymentPublicKey="pk_test_dZF7hXznvIkr9wEJjpm6RK0t"
			merchantId="merchant_NAUaS152510146KTJ11eA7W918"
			authorizePayment={async (cardToken: string) => {
				/** For testing in storybook get temp 3DS url using the API
				 * Replace with actual Tap payment authorization endpoint
				 */
				logger.log('Tap Authorize with token:', cardToken);

				// Simulate 3DS URL response - replace with actual implementation
				const temp3DsUrl =
					'https://acceptance.sandbox.tap.company/gosell/v2/payment/tap_process.aspx?auth=qU%2fYHoOr4bkae%2bEnNsNIg3l8fasnWfkVc9NZYe8ntrg%3d';

				return temp3DsUrl;
			}}
			capturePayment={async (cardType: string | undefined) => {
				logger.log('Tap Capture Payment for card type:', cardType);
			}}
			labels={labels}
			acceptedPaymentMethods={['Visa', 'Mastercard', 'Mada']}
			allow3dsModalClose={true}
			showCardHolder={true}
			displayPaymentBrands={false}
		/>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Components/TapCardPayment',
	component: CardPaymentComponent,
	render: Template,
};

export default StoryMeta;

export const TapCardPayment: StoryObj<ComponentType> = {
	render: Template,
	args: {
		vendor: EPaymentVendors.Tap,
		paymentPublicKey: 'pk_test_dZF7hXznvIkr9wEJjpm6RK0t',
		merchantId: 'merchant_NAUaS152510146KTJ11eA7W918',
		authorizePayment: async (cardToken: string) => {
			logger.log('Tap Authorize with token:', cardToken);

			// Simulate 3DS URL response for testing
			return 'https://acceptance.sandbox.tap.company/gosell/v2/payment/tap_process.aspx?auth=qU%2fYHoOr4bkae%2bEnNsNIg3l8fasnWfkVc9NZYe8ntrg%3d';
		},
		capturePayment: async (cardType: string | undefined) => {
			logger.log('Tap Captured for card type:', cardType);
		},
		labels: labels,
		acceptedPaymentMethods: ['Visa', 'Mastercard', 'Mada'],
		allow3dsModalClose: true,
		showCardHolder: true,
		displayPaymentBrands: false,
	},
};
