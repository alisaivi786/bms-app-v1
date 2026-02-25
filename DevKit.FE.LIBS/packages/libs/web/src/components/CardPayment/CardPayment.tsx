import { Ref, forwardRef } from 'react';
import { CardPaymentCheckoutProps, CardPaymentProps, CardPaymentRef, EPaymentVendors } from '@devkit/utilities';
import CardPaymentCheckoutForm from './CardPaymentCheckoutForm';
import CardPaymentTelrForm from './CardPaymentTelrForm';
import CardPaymentTapForm from './tap/CardPaymentTapForm';

const CardPayment = (props: CardPaymentProps, ref?: Ref<CardPaymentRef>) => {
	if (!props.vendor || props.vendor === EPaymentVendors.CheckoutUAE) {
		const {
			paymentPublicKey,
			authorizePayment,
			capturePayment,
			labels,
			acceptedPaymentMethods,
			onTokenizedError,
			allow3dsModalClose = false,
			onFormValidationChange,
		} = props as CardPaymentCheckoutProps;

		return (
			<CardPaymentCheckoutForm
				ref={ref}
				paymentPublicKey={paymentPublicKey}
				authorizePayment={authorizePayment}
				capturePayment={capturePayment}
				labels={labels}
				acceptedPaymentMethods={acceptedPaymentMethods}
				onTokenizedError={onTokenizedError}
				allow3dsModalClose={allow3dsModalClose}
				onFormValidationChange={onFormValidationChange}
			/>
		);
	} else if (props.vendor === EPaymentVendors.Tap) {
		return <CardPaymentTapForm ref={ref} {...props} />;
	} else if (props.vendor === EPaymentVendors.TelrUAE) {
		const { authorizePayment, capturePayment } = props;

		return <CardPaymentTelrForm authorizePayment={authorizePayment} capturePayment={capturePayment} />;
	}
};

export default forwardRef(CardPayment);
