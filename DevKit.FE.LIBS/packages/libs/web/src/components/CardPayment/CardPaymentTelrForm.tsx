import { forwardRef, useEffect, useState } from 'react';
import { CardPaymentTelrProps, logger } from '@devkit/utilities';
import { useWebUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { Spinner } from '../Spinner';

const CardPaymentTelrForm = (props: Omit<CardPaymentTelrProps, 'vendor'>) => {
	const { authorizePayment, capturePayment } = props;
	const [telrPaymentUrl, setTelrPaymentUrl] = useState<string | undefined>(undefined);
	const { locale } = useWebUIConfigOptions();

	const getTelrPaymentUrl = async () => {
		const url = await authorizePayment();

		if (url) setTelrPaymentUrl(url);
	};

	useEffect(() => {
		getTelrPaymentUrl();
		const messageEvent = (event: MessageEvent) => {
			if (event.data === 'shory:payment-success') {
				capturePayment(undefined);
				logger.info('Payment Done');
			}
		};

		// register payment iframe success post message handler
		window.addEventListener('message', messageEvent, false);

		return () => {
			setTelrPaymentUrl(undefined);
			window.removeEventListener('message', messageEvent);
		};
	}, [locale]);

	return (
		<div className="relative w-full">
			{telrPaymentUrl ? (
				<div className="h-[calc(540px)] overflow-y-auto">
					<iframe src={telrPaymentUrl} width="100%" height="100%" id="frame-id" />
				</div>
			) : (
				<div className="h-[calc(540px)] overflow-y-auto justify-center flex   ">
					<div className="mt-12 ">
						<Spinner borderWidth={2} variant="primary" size={20} />
					</div>
				</div>
			)}
		</div>
	);
};

export default forwardRef(CardPaymentTelrForm);
