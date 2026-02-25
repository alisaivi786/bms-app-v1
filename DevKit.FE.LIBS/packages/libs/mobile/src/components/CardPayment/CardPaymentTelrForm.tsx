import { forwardRef, useEffect, useState } from 'react';
import { View } from 'react-native';
import { WebView, WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';
import { CardPaymentTelrProps, logger } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { Spinner } from '../Spinner';
import { isPaymentSuccessDependsOnWebViewUrl } from './utils';

const INJECTED_JAVASCRIPT = `
  const meta = document.createElement('meta');
  meta.setAttribute('content', 'width=width, initial-scale=1.0, maximum-scale=1.0');
  meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
`;

const LoadingIndicatorView = () => {
	const { tw } = useMobileUIConfigOptions();

	return (
		<View style={tw`absolute inset-0 flex-1 w-full h-64 items-center justify-center bg-white`}>
			<Spinner size="large" />
		</View>
	);
};

const CardPaymentTelrForm = (props: Omit<CardPaymentTelrProps, 'vendor'>) => {
	const { authorizePayment, capturePayment, redirectUrl, scrollEnabled = false } = props;
	const [telrPaymentUrl, setTelrPaymentUrl] = useState<string | undefined>(undefined);
	const { tw, locale } = useMobileUIConfigOptions();

	useEffect(() => {
		const getTelrPaymentUrl = async () => {
			const url = await authorizePayment();

			if (url) setTelrPaymentUrl(url);
		};

		getTelrPaymentUrl();

		return () => {
			setTelrPaymentUrl(undefined);
		};
	}, [locale, authorizePayment]);

	const handleNavigationStateChange = (e: WebViewNavigation) => {
		const matched = isPaymentSuccessDependsOnWebViewUrl({ webViewNavigation: e, redirectUrl: redirectUrl });

		if (matched) {
			capturePayment(undefined);
		}
	};

	const handleWebviewMessage = (event: WebViewMessageEvent) => {
		logger.log('Telr Webview Message' + event.nativeEvent.data);
	};

	if (!telrPaymentUrl) return <LoadingIndicatorView />;

	return (
		<WebView
			source={{ uri: telrPaymentUrl ?? '' }}
			allow="fullscreen"
			width="100%"
			height="100%"
			containerStyle={tw`flex-1 h-100`}
			onMessage={handleWebviewMessage} // Required for injectedJavaScript to work
			onNavigationStateChange={handleNavigationStateChange}
			onError={(e) => {
				logger.log('Error in Telr Webview' + e);
			}}
			onHttpError={(e) => {
				logger.log('Error in Telr Webview' + e);
			}}
			injectedJavaScript={INJECTED_JAVASCRIPT}
			renderLoading={LoadingIndicatorView}
			nestedScrollEnabled={false}
			scrollEnabled={scrollEnabled}
			startInLoadingState
			javaScriptEnabled
			scalesPageToFit
		/>
	);
};

export default forwardRef(CardPaymentTelrForm);
