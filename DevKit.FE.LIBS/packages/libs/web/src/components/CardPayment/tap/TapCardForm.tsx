import { Ref, forwardRef, useImperativeHandle, useState } from 'react';
import { CardPaymentRef, TapExpectedPaymentMethods, TapPaymentLabels, TokenizationErrorType } from '@devkit/utilities';
import { Button } from '../../Buttons';
import { FormContainer } from '../../FormContainer/FormContainer';
import { Spinner } from '../../Spinner';
import { CardTokenInfo, useTapCard } from '../hooks/useTapCard';

type TapCardFormProps = {
	tapConfig: {
		publicKey: string;
		providerProfileId: number;
		merchantId: string;
	};
	onCardTokenized: (tokenInfo: CardTokenInfo) => void;
	labels: TapPaymentLabels;
	acceptedPaymentMethods?: (keyof typeof TapExpectedPaymentMethods)[];
	onTokenizedError?: (errorType: TokenizationErrorType) => void;
	showCardHolder?: boolean;
	displayPaymentBrands?: boolean;
};

const TapCardForm = (
	{
		tapConfig,
		onCardTokenized,
		labels,
		acceptedPaymentMethods,
		onTokenizedError,
		showCardHolder,
		displayPaymentBrands,
	}: TapCardFormProps,
	ref?: Ref<CardPaymentRef>
) => {
	const [isTokenizingCard, setIsTokenizingCard] = useState(false);

	const { isFormReady, disableCheckoutSubmit, submitForm } = useTapCard({
		tapConfig,
		acceptedPaymentMethods,
		showCardHolder,
		displayPaymentBrands,
	});

	const tokenizeCard = async (): Promise<void> => {
		if (!navigator.onLine) {
			onTokenizedError?.('NetworkErrorOffline');
		}

		setIsTokenizingCard(true);
		try {
			const cardToken = await submitForm();

			setIsTokenizingCard(false);
			onCardTokenized(cardToken);
		} catch (e) {
			setIsTokenizingCard(false);
			onTokenizedError?.('CardPaymentTokenizationError');
		}
	};

	useImperativeHandle(ref, () => ({
		onSubmit: async () => {
			await tokenizeCard();
		},
	}));

	return (
		<div className="relative w-full">
			<FormContainer>
				{/* Tap Card SDK Container - This will be populated by Tap SDK */}
				<div id="tap-card-container">{/* Tap SDK will render the card form here */}</div>

				{labels?.payActionButton && (
					<div className="max-w-[500px] w-full m-auto">
						<Button
							variant="primary"
							layoutClassName={['w-full']}
							onClick={tokenizeCard}
							isLoading={isTokenizingCard}
							disabled={disableCheckoutSubmit}
						>
							{labels?.payActionButton}
						</Button>
					</div>
				)}

				{!isFormReady && (
					<div className="flex items-center justify-center absolute top-0 w-full h-full bg-white">
						<Spinner borderWidth={2} size={20} />
					</div>
				)}
			</FormContainer>
		</div>
	);
};

export default forwardRef(TapCardForm);
