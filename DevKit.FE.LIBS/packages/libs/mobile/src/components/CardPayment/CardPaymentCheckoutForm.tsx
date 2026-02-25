import { Ref, forwardRef, useEffect, useRef, useState } from 'react';
import { Modal, Pressable } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { WebView } from 'react-native-webview';
import { CardPaymentCheckoutProps, CardPaymentRef, TokenizationErrorType, logger } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts';
import CheckoutFrames from './CheckoutFrames';
import { emitConfig } from './configs/emitConfig';
import { CardTokenInfo } from './hooks';
import { isPaymentSuccessDependsOnWebViewUrl } from './utils';

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
		redirectUrl,
	}: Omit<CardPaymentCheckoutProps, 'vendor'>,
	ref?: Ref<CardPaymentRef>
) => {
	const [url3Ds, setUrl3Ds] = useState<string>();
	const cardType = useRef<string>('');
	const { tw } = useMobileUIConfigOptions();

	useEffect(() => {
		const emitSubscribe = EventRegister.addEventListener(emitConfig.PAYMENT_SUCCESS_MESSAGE, (message) => {
			if (message === 'shory:payment-success') {
				setUrl3Ds(undefined);
				capturePayment(cardType.current);
				logger.info('3DSSuccess');
			}
			logger.log('[useEffect][ThreeDSecure][emitSubscribe] Message', message);
		});

		return () => {
			EventRegister.removeEventListener(emitSubscribe.toString());
		};
	}, [capturePayment]);

	return (
		<>
			<Modal
				visible={!!url3Ds}
				onRequestClose={() => {
					if (allow3dsModalClose) {
						setUrl3Ds(undefined);
						onTokenizedError?.('CancelledByUser' as TokenizationErrorType);
						logger.log('3DS modal onClose');
					}
				}}
				transparent={true}
			>
				<Pressable
					style={[tw` bg-gray-500 h-full flex flex-col justify-end opacity-90`]}
					onPress={() => {
						if (allow3dsModalClose) {
							setUrl3Ds(undefined);
							onTokenizedError?.('CancelledByUser');
							logger.log('3DS modal onClose');
						}
					}}
				>
					<Pressable style={tw`p-3 pb-8 rounded-t-xl h-2/4 bg-white rounded-xl`}>
						<WebView
							source={url3Ds ? { uri: url3Ds } : undefined}
							allow="fullscreen"
							seamless
							height="100%"
							width="100%"
							onNavigationStateChange={(e) => {
								if (isPaymentSuccessDependsOnWebViewUrl({ webViewNavigation: e, redirectUrl: redirectUrl })) {
									EventRegister.emitEvent(emitConfig.PAYMENT_SUCCESS_MESSAGE, 'shory:payment-success');
								}
							}}
						/>
					</Pressable>
				</Pressable>
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
					logger.log('[CardPaymentCheckoutForm] onCardTokenReceived', tokenInfo);
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
