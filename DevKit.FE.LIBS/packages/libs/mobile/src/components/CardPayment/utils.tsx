import { WebViewNavigation } from 'react-native-webview';
import { CardPaymentTapProps } from '@devkit/utilities';

/**
 * This function checks if the payment was successful based on the WebView's URL.
    It takes two parameters:
    - webViewNavigation: The navigation object from the WebView component.
    - redirectUrl: The URL that should be included in the payment's redirect.
 */
export const isPaymentSuccessDependsOnWebViewUrl = ({
	webViewNavigation,
	redirectUrl = '',
}: {
	webViewNavigation: WebViewNavigation;
	redirectUrl: CardPaymentTapProps['redirectUrl'];
}) => {
	let urlsToMatch: string[] = [];

	if (Array.isArray(redirectUrl)) {
		urlsToMatch = redirectUrl;
	} else if (redirectUrl) {
		urlsToMatch = [redirectUrl];
	}

	if (!urlsToMatch?.length) return false;

	const currentUrl = decodeURIComponent(webViewNavigation.url || '').toLowerCase();

	const matched = urlsToMatch.some((part) => part && currentUrl.includes(part.toLowerCase()));

	return matched;
};
