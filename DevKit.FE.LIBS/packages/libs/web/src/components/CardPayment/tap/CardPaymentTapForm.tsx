import { Ref, forwardRef, useEffect, useRef, useState } from 'react';
import { CardPaymentRef, logger } from '@devkit/utilities';
import { CardPaymentTapProps } from '@devkit/utilities/src/types';
import { useResponsiveView } from '../../../hooks/useResponsiveView';
import { Modal } from '../../DialogModal';
import { CardTokenInfo } from '../hooks';
import TapCardForm from './TapCardForm';

const CardPaymentTapForm = (
	{
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
	}: Omit<CardPaymentTapProps, 'vendor'>,
	ref?: Ref<CardPaymentRef>
) => {
	const [url3Ds, setUrl3Ds] = useState<string>();
	const cardType = useRef<string>('');
	const { sm: isMobile } = useResponsiveView();

	useEffect(() => {
		// 3DS iframe message event listener to handle the capture
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

	const onCardTokenized = async (tokenInfo: CardTokenInfo): Promise<void> => {
		const url3DsResponse = await authorizePayment(tokenInfo.token);

		cardType.current = tokenInfo.card_type;
		setUrl3Ds(url3DsResponse);

		if (!url3DsResponse) {
			capturePayment(tokenInfo.card_type);
		}
		logger.log('onCardTokenReceived', tokenInfo);
	};

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
			<TapCardForm
				ref={ref}
				tapConfig={{
					publicKey: paymentPublicKey,
					providerProfileId: 4,
					merchantId,
				}}
				labels={labels}
				acceptedPaymentMethods={acceptedPaymentMethods}
				onCardTokenized={onCardTokenized}
				onTokenizedError={onTokenizedError}
				showCardHolder={showCardHolder}
				displayPaymentBrands={displayPaymentBrands}
			/>
		</>
	);
};

export default forwardRef(CardPaymentTapForm);
