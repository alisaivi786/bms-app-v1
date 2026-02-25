import { useEffect, useState } from 'react';
import { logger } from '@devkit/utilities';
import { useRouter } from '../useRouter';

declare let window: Window & {
	Microsoft?: {
		Omnichannel?: {
			LiveChatWidget?: {
				SDK?: {
					startChat: ({ inNewWindow }: { inNewWindow: boolean }) => void;
					closeChat: () => void;
					setContextProvider: (arg: TContextProvider) => void;
					getContextProvider: () => TContextProvider;
				};
			};
		};
	};
};

type TContextProvider = () => {
	locale: TContext;
	username?: TContext;
	currentWebUrl: TContext;
	email?: TContext;
	isLoggedIn?: TContext;
	project?: TContext;
};

type TContext = { value: string; isDisplayable: boolean };

export type TUseLiveChatWidgetProps = {
	userInfo: {
		isUserLoggedIn: boolean;
		user?: {
			email?: string;
			mobileNumber?: string;
		};
	};
	appConfig: {
		orgId: string;
		appId: string;
		orgUrl: string;
		appId_AR: string;
	};
	productName: string;
	customWidgetColor?: string;
};

const useLiveChatWidget = ({ userInfo, appConfig, productName, customWidgetColor }: TUseLiveChatWidgetProps) => {
	const [isOmniChatReady, setIsOmniChatReady] = useState(false);
	const { locale, pathname } = useRouter();
	const { isUserLoggedIn, user } = userInfo;
	const { orgId, appId, orgUrl, appId_AR } = appConfig;

	const chatExists = () =>
		typeof window !== 'undefined' &&
		window?.Microsoft?.Omnichannel?.LiveChatWidget &&
		!!document.getElementById('Microsoft_Omnichannel_LCWidget_Chat_Iframe_Window');

	const updateContext = () => {
		if (isOmniChatReady) {
			window?.Microsoft?.Omnichannel?.LiveChatWidget?.SDK?.setContextProvider(() => {
				return {
					isLoggedIn: { value: isUserLoggedIn?.toString(), isDisplayable: true },
					email: {
						value: user?.email?.toString() ?? '',
						isDisplayable: !!user?.email,
					},
					mobileNumber: {
						value: `${user?.mobileNumber?.toString() ?? ''}`,
						isDisplayable: !!user?.mobileNumber,
					},
					currentWebUrl: { value: pathname?.toString(), isDisplayable: true },
					locale: { value: locale ?? 'en', isDisplayable: true },
					project: {
						value: productName,
						isDisplayable: true,
					},
				};
			});
		}
	};

	useEffect(() => {
		updateContext();
	}, [isUserLoggedIn, isOmniChatReady, locale, pathname, productName, user?.email, user?.mobileNumber]);

	useEffect(() => {
		if (!isOmniChatReady) {
			initializeChatWidget();
		}

		const chatReady = () => {
			setIsOmniChatReady(true);
		};

		window.addEventListener('lcw:ready', chatReady);

		return () => {
			if (isOmniChatReady) {
				clearChatWidget();
			}
		};
	}, []);

	useEffect(() => {
		changeOmniChatLang();
	}, [locale]);

	const initializeChatWidget = () => {
		let script: HTMLScriptElement | null = document.querySelector('#Microsoft_Omnichannel_LCWidget');

		if (!script) {
			script = document.createElement('script');

			script.src = `https://oc-cdn-public-eur.azureedge.net/livechatwidget/scripts/LiveChatBootstrapper.js?appId=${new Date().getTime()}`;
			script.async = true;
			script.id = 'Microsoft_Omnichannel_LCWidget';
			script.type = 'text/javascript';
			script.defer = true;

			script.setAttribute('data-lcw-version', 'prod');
			script.setAttribute('data-org-id', orgId);
			script.setAttribute('data-app-id', locale === 'ar' ? appId_AR : appId);
			script.setAttribute('data-org-url', orgUrl);
			script.setAttribute('data-color-override', customWidgetColor ?? '#1D68FF');
			script.setAttribute('data-hide-chat-button', 'true');
			script.setAttribute('data-disable-telemetry', 'true');
			script.setAttribute('v2', '');

			document.body.appendChild(script);
		}
	};

	const logoutChatClient = () => {
		if (chatExists() && isOmniChatReady) {
			window?.Microsoft?.Omnichannel?.LiveChatWidget?.SDK?.closeChat();
		}

		setIsOmniChatReady(false);
	};

	const changeOmniChatLang = () => {
		clearChatWidget();
		initializeChatWidget();

		if (chatExists()) {
			const element = document.getElementById('Microsoft_Omnichannel_LCWidget_Chat_Iframe_Window');

			element?.remove();
		}
	};

	const clearChatWidget = () => {
		logoutChatClient();

		// remove the script if it is already there
		if (document.querySelector('#Microsoft_Omnichannel_LCWidget')) {
			window.document.body.removeChild(window.document.querySelector('#Microsoft_Omnichannel_LCWidget') as Node);
		}

		if (document.getElementById('Microsoft_Omnichannel_LCWidget_Chat_Iframe_Window')) {
			document.getElementById('Microsoft_Omnichannel_LCWidget_Chat_Iframe_Window')?.remove();
		}

		window.removeEventListener('lcw:ready', () => {
			logger.info('[Omni Chat][useEffect] Remove lcw:ready event listener');
		});
	};

	const startChat = () => {
		if (chatExists()) {
			logger.info('[Omni Chat] Start Chat');
			window?.Microsoft?.Omnichannel?.LiveChatWidget?.SDK?.startChat({
				inNewWindow: false,
			});
		}
	};

	return {
		startChat,
		isChatReady: isOmniChatReady,
		logoutChatClient,
	};
};

export default useLiveChatWidget;
