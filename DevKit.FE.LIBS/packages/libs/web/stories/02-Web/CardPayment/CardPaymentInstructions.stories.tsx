import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

const StoryComponent: StoryFn = () => (
	<div className="flex flex-col gap-5">
		<h2>
			<b>Card Payment Component</b>
		</h2>
		<h3>
			This component is a wrapper over Checkout API with the full interface needed to start accepting card payments
		</h3>

		<p>The component expects 7 props</p>

		<li>
			<b>paymentPublicKey:</b> The key to be used when configuring the Checkout API
		</li>
		<li>
			<b>authorizePayment:</b> A promise that takes in the card token number that you have acquired from the
			tokenization API, and should return the string 3DS url if required, else undefined. After returning that, and if
			3DS is required, a modal will open for the user to enter his 3DS OTP.
		</li>
		<li>
			<b>capturePayment:</b> A promise that takes in the card token number that you have acquired from the tokenization
			API where you should perform your capture API request and then either resolve if it was successful, or reject if
			it failed.
		</li>
		<li>
			<b>labels:</b> Label for the different fields (card holder name, card number, cvv, expiry date, errors, etc..)
		</li>
		<li>
			<b>acceptedPaymentMethods:</b> An array of the accepted payment methods (Visa, Mastercard, Maestro, etc...)
		</li>
		<li>
			<b>allow3dsModalClose:</b> A boolean to indicate if the 3DS modal can be cancellable
		</li>
		<li>
			<b>onTokenizedError:</b> A callback function to be called when the card tokenization fails
		</li>

		<p>
			Once initialized the component, Checkout will automatically initialize and setup the fields for the user to input
			the Card details.
		</p>

		<img src="./CardPaymentImage.png" alt="alt" className="w-full" />

		<p>
			After the user enters the his card number, an icon of the payment method will appear (Visa, Mastercard, Maestro,
			etc...) which comes from the https://cdn.shory.com/static/common/payment-cards CDN For example
			https://cdn.shory.com/static/common/payment-cards/visa.svg and
			https://cdn.shory.com/static/common/payment-cards/mastercard.svg
		</p>
	</div>
);

const StoryMeta: Meta = {
	title: 'WEB/CardPayment',
	component: StoryComponent,
};

export default StoryMeta;

export const Instructions: StoryObj = {};
