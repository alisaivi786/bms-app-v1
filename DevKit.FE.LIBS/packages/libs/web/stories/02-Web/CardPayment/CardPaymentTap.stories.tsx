import { CardPaymentProps, EPaymentVendors, logger } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { CardPayment as CardPaymentComponent } from '../../../src/components/CardPayment';

type ComponentType = (args: CardPaymentProps) => JSX.Element;

const labels = {
	payActionButton: 'Pay',
};

const Template: StoryFn<ComponentType> = (args) => {
	return <CardPaymentComponent {...args} />;
};

const StoryMeta: Meta<ComponentType> = {
	title: 'WEB/CardPayment',
	component: CardPaymentComponent,
	render: Template,
};

export default StoryMeta;

export const CardPaymentTap: StoryObj<ComponentType> = {
	render: Template,
	args: {
		paymentPublicKey: 'pk_test_dZF7hXznvIkr9wEJjpm6RK0t',
		merchantId: 'merchant_NAUaS152510146KTJ11eA7W918',
		allow3dsModalClose: true,
		authorizePayment: async () => {
			logger.log('Tap Authorize');

			return 'https://acceptance.sandbox.tap.company/gosell/v2/payment/tap_process.aspx?auth=qU%2fYHoOr4bkae%2bEnNsNIg3l8fasnWfkVc9NZYe8ntrg%3d';
		},
		capturePayment: async () => {
			logger.log('Tap Captured');
		},
		labels: labels,
		vendor: EPaymentVendors.Tap,
	},
};

export const CardPaymentTapWithoutPaymentBrandsVisible: StoryObj<ComponentType> = {
	render: Template,
	args: {
		paymentPublicKey: 'pk_test_dZF7hXznvIkr9wEJjpm6RK0t',
		merchantId: 'merchant_NAUaS152510146KTJ11eA7W918',
		showCardHolder: true,
		displayPaymentBrands: false,
		allow3dsModalClose: true,
		authorizePayment: async () => {
			logger.log('Tap Authorize');

			return 'https://acceptance.sandbox.tap.company/gosell/v2/payment/tap_process.aspx?auth=qU%2fYHoOr4bkae%2bEnNsNIg3l8fasnWfkVc9NZYe8ntrg%3d';
		},
		capturePayment: async () => {
			logger.log('Tap Captured');
		},
		labels: labels,
		vendor: EPaymentVendors.Tap,
	},
};

export const CardPaymentTapWithoutCardHolder: StoryObj<ComponentType> = {
	render: Template,
	args: {
		paymentPublicKey: 'pk_test_dZF7hXznvIkr9wEJjpm6RK0t',
		merchantId: 'merchant_NAUaS152510146KTJ11eA7W918',
		showCardHolder: false,
		displayPaymentBrands: true,
		allow3dsModalClose: true,
		authorizePayment: async () => {
			logger.log('Tap Authorize');

			return 'https://acceptance.sandbox.tap.company/gosell/v2/payment/tap_process.aspx?auth=qU%2fYHoOr4bkae%2bEnNsNIg3l8fasnWfkVc9NZYe8ntrg%3d';
		},
		capturePayment: async () => {
			logger.log('Tap Captured');
		},
		labels: labels,
		vendor: EPaymentVendors.Tap,
	},
};
