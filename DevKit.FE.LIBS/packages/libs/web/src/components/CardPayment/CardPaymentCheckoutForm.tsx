import { Ref, forwardRef, useEffect, useRef, useState } from 'react';
import { CardPaymentCheckoutProps, CardPaymentRef, logger } from '@devkit/utilities';
import { useResponsiveView } from '../../hooks/useResponsiveView';
import { Modal } from '../DialogModal';
import CheckoutFrames from './CheckoutFrames';
import { CardTokenInfo } from './hooks';

const CardPaymentCheckoutForm = (
	{
		authorizePayment,
		paymentPublicKey,
		capturePayment,
		labels,
		acceptedPaymentMethods,
		onTokenizedError,
		allow3dsModalClose,
		onFormValidationChange,
	}: Omit<CardPaymentCheckoutProps, 'vendor'>,
	ref?: Ref<CardPaymentRef>
) => {
	const [url3Ds, setUrl3Ds] = useState<string>();
	const cardType = useRef<string>('');
	const { sm: isMobile } = useResponsiveView();

	useEffect(() => {
		logger.log('[useEffect][ThreeDSecure]');
		const messageEvent = (event: MessageEvent) => {
			if (event.data === 'shory:payment-success') {
				setUrl3Ds(undefined);
				capturePayment(cardType.current);
				logger.info('3DSSuccess');
			}
		};

		// register payment 3D secure iframe success post message handler
		window.addEventListener('message', messageEvent, false);

		return () => {
			window.removeEventListener('message', messageEvent);
		};
	}, []);

	return (
		<>
			<Modal
				variant={isMobile ? 'fullScreen' : 'large'}
				height="1000px"
				position="top"
				hasDivider={false}
				hasCloseICon={allow3dsModalClose}
				isOpen={!!url3Ds}
				onClose={() => {
					if (allow3dsModalClose) {
						setUrl3Ds(undefined);
						onTokenizedError?.('CancelledByUser');
						logger.log('3DS modal onClose');
					}
				}}
			>
				<iframe allow="fullscreen" seamless height="100%" width="100%" src={url3Ds}></iframe>
			</Modal>
			<CheckoutFrames
				ref={ref}
				onCardTokenized={async (tokenInfo: CardTokenInfo): Promise<void> => {
					const url3DsResponse = await authorizePayment(tokenInfo.token);

					cardType.current = tokenInfo.card_type;
					setUrl3Ds(url3DsResponse);

					if (!url3DsResponse) {
						capturePayment(tokenInfo.card_type);
					}
					logger.log('onCardTokenReceived', tokenInfo);
				}}
				checkoutConfig={{
					publicKey: paymentPublicKey,
					providerProfileId: 1,
				}}
				labels={labels}
				acceptedPaymentMethods={acceptedPaymentMethods}
				onTokenizedError={onTokenizedError}
				onFormValidationChange={onFormValidationChange}
			/>
		</>
	);
};

export default forwardRef(CardPaymentCheckoutForm);
