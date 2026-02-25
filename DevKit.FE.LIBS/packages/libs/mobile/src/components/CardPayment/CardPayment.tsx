import clsx from 'clsx';
import { Ref, forwardRef } from 'react';
import { View } from 'react-native';
import { Toasts } from '@backpackapp-io/react-native-toast';
import { CardPaymentProps, CardPaymentRef, EPaymentVendors } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts';
import CardPaymentCheckoutForm from './CardPaymentCheckoutForm';
import CardPaymentTapForm from './CardPaymentTapForm';
import CardPaymentTelrForm from './CardPaymentTelrForm';

const CardPayment = (props: CardPaymentProps, ref?: Ref<CardPaymentRef>) => {
	const { tw } = useMobileUIConfigOptions();

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
			layoutClassName,
			redirectUrl,
		} = props;

		return (
			<View style={tw`${clsx('mb-20', layoutClassName)}`}>
				<Toasts />
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
					redirectUrl={redirectUrl}
				/>
			</View>
		);
	} else if (props.vendor === EPaymentVendors.TelrUAE) {
		const { authorizePayment, capturePayment, redirectUrl } = props;

		return (
			<CardPaymentTelrForm
				authorizePayment={authorizePayment}
				capturePayment={capturePayment}
				redirectUrl={redirectUrl}
			/>
		);
	} else if (props.vendor === EPaymentVendors.Tap) {
		return <CardPaymentTapForm {...props} />;
	}
};

export default forwardRef(CardPayment);
