import RNTapCardView, {
	ColorStyle,
	Config,
	Direction,
	Edges,
	ITapCardViewInputRef,
	Locale,
	Purpose,
	Scope,
	SupportedFundSource,
	SupportedPaymentAuthentications,
	SupportedSchemes,
	TapCurrencyCode,
	Theme,
} from 'card-react-native';
import { useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { TapExpectedPaymentMethods, TapPaymentLabels, TokenizationErrorType, logger } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts';
import { Button } from '../Buttons';

const TapCardView = 'default' in RNTapCardView ? (RNTapCardView.default as typeof RNTapCardView) : RNTapCardView;

export type CardTokenInfo = {
	cardType: string;
	token: string;
};

type TapCardFormProps = {
	tapConfig: {
		publicKey: string;
		merchantId: string;
	};
	onCardTokenized: (tokenInfo: CardTokenInfo) => void;
	labels: TapPaymentLabels;
	acceptedPaymentMethods?: (keyof typeof TapExpectedPaymentMethods)[];
	onTokenizedError?: (errorType: TokenizationErrorType) => void;
	showCardHolder?: boolean;
	displayPaymentBrands?: boolean;
};

const TapCardForm = ({
	tapConfig,
	onCardTokenized,
	labels,
	acceptedPaymentMethods = ['Visa', 'Mastercard', 'Mada'],
	onTokenizedError,
	showCardHolder = true,
	displayPaymentBrands = false,
}: TapCardFormProps) => {
	const { tw, locale, isRtlLocale } = useMobileUIConfigOptions();
	const [isTokenizingCard, setIsTokenizingCard] = useState(false);

	const [isCardValid, setIsCardValid] = useState(false);

	const localeToUse = locale === 'ar' ? Locale.ar : Locale.en;
	const directionToUse = isRtlLocale ? Direction.rtl : Direction.ltr;

	const cardSdkRef = useRef<ITapCardViewInputRef>(null);

	const config = useMemo(() => {
		return {
			merchant: {
				id: tapConfig.merchantId,
			},
			order: {
				amount: 1,
				currency: TapCurrencyCode.SAR,
			},
			purpose: Purpose.Charge,
			operator: {
				publicKey: tapConfig.publicKey,
			},
			scope: Scope.Token,
			acceptance: {
				supportedSchemes: getSupportedSchemes(acceptedPaymentMethods),
				supportedFundSource: [SupportedFundSource.Debit, SupportedFundSource.Credit],
				supportedPaymentAuthentications: [SupportedPaymentAuthentications.secured],
			},
			fieldsVisibility: {
				card: {
					cardHolder: showCardHolder,
					cvv: true,
				},
			},
			interface: {
				loader: true,
				locale: localeToUse,
				theme: Theme.light,
				edges: Edges.curved,
				cardDirection: directionToUse,
				colorStyle: ColorStyle.colored,
			},
			features: {
				alternativeCardInputs: {
					cardNFC: false,
					cardScanner: false,
				},
				customerCards: {
					saveCard: false,
					autoSaveCard: false,
				},
				acceptanceBadge: displayPaymentBrands,
			},
		};
	}, [tapConfig, acceptedPaymentMethods, showCardHolder, displayPaymentBrands, localeToUse, directionToUse]);

	const tokenizeCard = async (): Promise<void> => {
		if (!cardSdkRef.current) {
			onTokenizedError?.('CardPaymentTokenizationError');

			return;
		}

		setIsTokenizingCard(true);
		try {
			cardSdkRef.current.generateToken();
		} catch (error) {
			setIsTokenizingCard(false);
			onTokenizedError?.('CardPaymentTokenizationError');
			logger.error('TapCardForm tokenization error:', error);
		}
	};

	const handleSuccess = (data: object) => {
		setIsTokenizingCard(false);

		if (!data || typeof data !== 'string') {
			logger.error('TapCardForm unexpected success data format:', data);
			onTokenizedError?.('CardPaymentTokenizationError');

			return;
		}

		const parsedData = JSON.parse(data);
		const cardTokenInfo: CardTokenInfo = {
			token: parsedData.id,
			cardType: parsedData.card?.brand || '',
		};

		onCardTokenized(cardTokenInfo);
	};

	const handleError = (error: object) => {
		setIsTokenizingCard(false);
		logger.error('TapCardForm tokenization error:', error);
		onTokenizedError?.('CardPaymentTokenizationError');
	};

	const disableCheckoutSubmit = !isCardValid || isTokenizingCard;

	return (
		<View style={tw`w-full`}>
			<TapCardView
				ref={cardSdkRef}
				style={tw`w-full`}
				config={config as never as Config}
				onSuccess={handleSuccess}
				onError={handleError}
				onReady={() => {
					logger.log('[TapCardView] ready');
				}}
				onFocus={() => {
					logger.log('[TapCardView] focused');
				}}
				onBinIdentification={(binIdentification: object) => {
					logger.log('[TapCardView] bin identification:', binIdentification);
				}}
				onInvalidInput={(invalidInput: boolean) => {
					logger.log('[TapCardView] invalid input:', invalidInput);
					setIsCardValid(!invalidInput);
				}}
				onHeightChange={(height: number) => {
					logger.log('[TapCardView] height changed:', height);
				}}
				onChangeSaveCard={(saveCard: boolean) => {
					logger.log('[TapCardView] height changed:', saveCard);
				}}
			/>
			{labels?.payActionButton ? (
				<View style={tw`pt-6 px-2 -mx-2 pb-1`}>
					<Button
						variant="primary"
						onPress={() => {
							tokenizeCard();
						}}
						disabled={disableCheckoutSubmit}
						isLoading={isTokenizingCard}
						layoutClassName="w-full"
					>
						{labels?.payActionButton}
					</Button>
				</View>
			) : null}
		</View>
	);
};

const getSupportedSchemes = (methods: (keyof typeof TapExpectedPaymentMethods)[]) => {
	return methods.map((method) => {
		switch (method) {
			case 'Visa':
				return SupportedSchemes.VISA;
			case 'Mastercard':
				return SupportedSchemes.MASTERCARD;
			case 'Mada':
				return SupportedSchemes.MADA;
			default:
				return SupportedSchemes.VISA;
		}
	});
};

export default TapCardForm;
