import { CardPaymentProps, EPaymentVendors, logger } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { CardPayment as CardPaymentComponent } from '../../src/components/CardPayment';

type ComponentType = (args: CardPaymentProps) => JSX.Element;

const Template: StoryFn<ComponentType> = () => {
	return (
		<CardPaymentComponent
			vendor={EPaymentVendors.TelrUAE}
			redirectUrl="https://uat.shory.com/payment-done.html"
			authorizePayment={async () => {
				/** For testing in storybook get temp iframe url using the API
				 * "https://secure.telr.com/gateway/order.json"
				 *  Postman link to the API: "https://shory-team.postman.co/workspace/Shory~c09ac08e-b9b9-4852-80d2-3401f11e5bff/collection/15733275-877038b9-ef5e-418e-99be-8ca5e00118ea?action=share&creator=15733275"
				 */
				const tempUrl =
					'https://secure.telr.com/gateway/process.html?o=C3B407A63D8546C8D8F342B6BDC95FCC34522EE74FDB10AB7653E9874E820AB6';

				return tempUrl;
			}}
			capturePayment={async () => {
				logger.log('Capture Payment');
			}}
		/>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Components/TelrCardPayment',
	component: CardPaymentComponent,
	render: Template,
};

export default StoryMeta;

export const TelrCardPayment: StoryObj<ComponentType> = {
	render: Template,
	args: {
		vendor: EPaymentVendors.TelrUAE,
		authorizePayment: async () => {
			logger.log('Telr Authorize');

			return 'https://secure.telr.com/gateway/process.html?o=C3B407A63D8546C8D8F342B6BDC95FCC34522EE74FDB10AB7653E9874E820AB6';
		},
		capturePayment: async () => {
			logger.log('Telr Captured');
		},
	},
};
