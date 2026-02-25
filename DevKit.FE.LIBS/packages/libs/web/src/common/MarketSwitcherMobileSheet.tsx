import { useEffect, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { IMarketLocaleSwitcher } from '@devkit/shared-types';
import { useResponsiveView } from '../hooks/useResponsiveView';
import { useWebUIConfigOptions } from '../layouts/ThemeProvider/theme-context';
import { MarketSwitcher } from './MarketSwitcher';
import { useMarketSwitcher } from './MarketSwitcherContext';

const MarketSwitcherMobileSheet = () => {
	const { locale } = useWebUIConfigOptions();
	const { closeMobileSheet, isMobileSheetOpen: isOpen, marketSwitcher } = useMarketSwitcher();

	const { max_md } = useResponsiveView();
	const isMobile = max_md ?? false;
	const marketRegion = marketSwitcher?.marketPlaces.find((market) => market.isActive) || {
		label: '',
		icon: () => null,
		locale: 'en',
	};
	const marketLangAndRegion: IMarketLocaleSwitcher = {
		...marketRegion,
		locale,
	};

	if (!marketSwitcher) return null;

	const { onMarketPlaceChange } = marketSwitcher;

	const [tempMarketLocale, setTempMarketLocale] = useState<IMarketLocaleSwitcher>(marketLangAndRegion);

	useEffect(() => {
		if (!isMobile) {
			setTempMarketLocale(marketLangAndRegion);
			closeMobileSheet();
		}
	}, [isMobile]);

	const handleMarketChange = (market: IMarketLocaleSwitcher) => {
		setTempMarketLocale(market);
	};

	const handleSubmit = async () => {
		if (tempMarketLocale && onMarketPlaceChange) await onMarketPlaceChange({ ...tempMarketLocale });
		closeMobileSheet();
	};
	const handleClose = () => {
		setTempMarketLocale(marketLangAndRegion);
		closeMobileSheet();
	};

	return (
		<>
			<div className="relative">
				<BottomSheet
					className="fixed z-drawer"
					open={isOpen && isMobile}
					onDismiss={handleClose}
					footer={
						<div className="flex justify-center">
							<button
								type="button"
								className="w-full rounded-lg border border-brand-600 bg-brand-600 px-4 py-2 text-paragraph font-semibold text-white"
								onClick={handleSubmit}
							>
								{locale == 'ar' ? 'احفظ و متابعة' : 'Save & continue'}
							</button>
						</div>
					}
				>
					<MarketSwitcher
						handleCloseModal={handleClose}
						marketAndLocalForModal={tempMarketLocale}
						handleMarketLocalChange={handleMarketChange}
					/>
				</BottomSheet>
			</div>
		</>
	);
};

export default MarketSwitcherMobileSheet;
