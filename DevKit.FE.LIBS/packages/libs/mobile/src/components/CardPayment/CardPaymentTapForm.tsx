import { useCallback, useRef, useState } from 'react';
import { Modal, Pressable } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { CardPaymentTapProps, logger } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts';
import TapCardForm, { CardTokenInfo } from './TapCardForm';
import { isPaymentSuccessDependsOnWebViewUrl } from './utils';

const CardPaymentTapForm = ({
	authorizePayment,
	paymentPublicKey,
	capturePayment,
	labels,
	acceptedPaymentMethods,
	onTokenizedError,
	allow3dsModalClose,
	merchantId,
	showCardHolder,
	displayPaymentBrands,
	redirectUrl,
}: Omit<CardPaymentTapProps, 'vendor'>) => {
	const [url3Ds, setUrl3Ds] = useState<string>();
	const { tw } = useMobileUIConfigOptions();
	const cardType = useRef<string>('');

	const onCardTokenized = async (tokenInfo: CardTokenInfo): Promise<void> => {
		const url3DsResponse = await authorizePayment(tokenInfo.token);

		cardType.current = tokenInfo.cardType;
		setUrl3Ds(url3DsResponse);

		if (!url3DsResponse) {
			capturePayment(tokenInfo.cardType);
		}
		logger.log('onCardTokenReceived', tokenInfo);
	};

	const handleNavigationStateChange = useCallback(
		(e: WebViewNavigation) => {
			const matched = isPaymentSuccessDependsOnWebViewUrl({ webViewNavigation: e, redirectUrl: redirectUrl });

			if (matched) {
				setUrl3Ds(undefined);
				capturePayment(cardType.current);
			}
		},
		[redirectUrl, capturePayment]
	);

	return (
		<>
			<TapCardForm
				tapConfig={{
					publicKey: paymentPublicKey,
					merchantId,
				}}
				labels={labels}
				acceptedPaymentMethods={acceptedPaymentMethods}
				onCardTokenized={onCardTokenized}
				onTokenizedError={onTokenizedError}
				showCardHolder={showCardHolder}
				displayPaymentBrands={displayPaymentBrands}
			/>

			<Modal
				visible={!!url3Ds}
				onRequestClose={() => {
					if (allow3dsModalClose) {
						setUrl3Ds(undefined);
						onTokenizedError?.('CancelledByUser');
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
						}
					}}
				>
					<Pressable style={tw`p-3 pb-8 rounded-t-xl h-2/4 bg-white rounded-xl`}>
						<WebView
							source={url3Ds ? { uri: url3Ds } : undefined}
							allow="fullscreen"
							seamless
							nestedScrollEnabled
							height="100%"
							width="100%"
							onError={(event) => {
								logger.error('[WebView] error:', event, event.nativeEvent);
							}}
							onHttpError={(event) => {
								logger.error('[WebView] HTTP error:', event, event.nativeEvent);
							}}
							onNavigationStateChange={handleNavigationStateChange}
						/>
					</Pressable>
				</Pressable>
			</Modal>
		</>
	);
};

export default CardPaymentTapForm;
