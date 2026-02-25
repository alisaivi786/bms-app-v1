import { CardPaymentProps, EPaymentVendors, logger } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { CardPayment as CardPaymentComponent } from '../../../src/components/CardPayment';

type ComponentType = (args: CardPaymentProps) => JSX.Element;

const Template: StoryFn<ComponentType> = () => {
	return (
		<>
			<CardPaymentComponent
				vendor={EPaymentVendors.TelrUAE}
				authorizePayment={async () => {
					await new Promise((resolve) => {
						setTimeout(() => {
							resolve(null);
						}, 3000);
					});

					// return iFrame URL
					return 'https://secure.telr.com/gateway/process_framed.html?o=8CA7640C590B8E1D48D10630B17F8F523A52B958C2F973A82D64B14584201286';
				}}
				capturePayment={async () => {
					logger.log('Capture Payment');
				}}
			/>
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'WEB/CardPayment',
	component: CardPaymentComponent,
	render: Template,
};

export default StoryMeta;

export const CardPaymentTelr: StoryObj<ComponentType> = {
	render: Template,
	args: {
		authorizePayment: async () => {
			logger.log('Checkout Authorize');

			return 'Checkout Authorize';
		},
		capturePayment: async () => {
			logger.log('Checkout Captured');
		},
	},
};
