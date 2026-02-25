import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckedCircleFilledIcon, SfCloseCrossLargeIcon, UaeFlagIcon } from '@devkit/icons/web';
import { IMarketLocaleSwitcher, IMarketPlace, ISupportedLocales } from '@devkit/shared-types';
import { useDrawer } from '../components/Drawer';
import { useResponsiveView } from '../hooks/useResponsiveView';
import { useWebUIConfigOptions } from '../layouts/ThemeProvider/theme-context';
import { useMarketSwitcher } from './MarketSwitcherContext';

type MarketSwitcherProps = {
	handleMarketLocalChange?: (market: IMarketLocaleSwitcher) => void;
	marketAndLocalForModal?: IMarketLocaleSwitcher;
	handleCloseModal?: () => void;
};

export const MarketSwitcher = ({
	handleMarketLocalChange,
	marketAndLocalForModal,
	handleCloseModal,
}: MarketSwitcherProps) => {
	const { locale: currentLocale, isRtlLocale } = useWebUIConfigOptions();
	const { setIsExpanded, marketSwitcher, isExpanded, setPanelRef } = useMarketSwitcher();
	const contentRef = useRef<HTMLDivElement>(null);
	const [panelHeight, setPanelHeight] = useState(0);
	const layoutDirectionClass = isRtlLocale ? 'md:flex-row-reverse' : 'md:flex-row';
	const MARKET_SWITCHER_TEXT = {
		en: {
			noMarketplaces: 'No marketplaces configured.',
			selectMarket: 'Select your market',
			countryLanguage: 'Country & Language',
			preferredLanguage: 'Preferred language',
		},
		ar: {
			noMarketplaces: 'لا توجد أسواق متاحة.',
			selectMarket: 'اختر الدولة',
			countryLanguage: 'الدولة واللغة',
			preferredLanguage: 'اللغة المفضلة',
		},
	};
	const t = MARKET_SWITCHER_TEXT[(currentLocale ?? 'en') as keyof typeof MARKET_SWITCHER_TEXT];

	const marketPlaces = useMemo(() => marketSwitcher?.marketPlaces ?? [], [marketSwitcher]);
	const isPanelOpen = isExpanded || !!marketAndLocalForModal;
	const targetHeight = panelHeight || (marketAndLocalForModal ? 800 : 320);

	useEffect(() => {
		if (!contentRef.current) return;

		setPanelHeight(contentRef.current.scrollHeight);
	}, [marketPlaces.length, currentLocale, marketAndLocalForModal, isExpanded]);

	const languages: { label: string; value: ISupportedLocales }[] = [
		{ label: 'English', value: 'en' },
		{ label: 'عربي', value: 'ar' },
	];

	if (!marketSwitcher) return null;

	const { onMarketPlaceChange, onLocaleChange } = marketSwitcher;

	const handleMarketSelect = (selectedMarket: IMarketPlace) => {
		if (handleMarketLocalChange) {
			handleMarketLocalChange({ ...selectedMarket, locale: marketAndLocalForModal?.locale ?? currentLocale });

			return;
		}
		onMarketPlaceChange?.({ ...selectedMarket, locale: currentLocale });
		setIsExpanded(false);
	};

	const handleLocaleSelect = async (locale: ISupportedLocales) => {
		if (handleMarketLocalChange && marketAndLocalForModal) {
			handleMarketLocalChange({ ...marketAndLocalForModal, locale });

			return;
		}
		await onLocaleChange?.(locale);
		setIsExpanded(false);
	};

	return (
		<div
			ref={!marketAndLocalForModal ? setPanelRef || undefined : undefined}
			className="relative z-[220] w-full bg-white"
			dir={isRtlLocale ? 'rtl' : 'ltr'}
			data-testid="market-switcher-container"
		>
			<div
				ref={contentRef}
				className="overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out"
				style={{ maxHeight: isPanelOpen ? targetHeight : 0, opacity: isPanelOpen ? 1 : 0 }}
				data-testid="market-switcher-panel"
			>
				<div className="flex flex-col gap-6 bg-white px-4 py-7 shadow-sm md:px-6 lg:px-16">
					<div className="flex items-center justify-between">
						<p className="text-title font-normal text-gray-700">{t.countryLanguage}</p>
						{marketAndLocalForModal && handleCloseModal && (
							<SfCloseCrossLargeIcon onClick={handleCloseModal} className="text-gray-800 " width={24} height={24} />
						)}
					</div>

					<div className={`flex flex-col gap-6 ${layoutDirectionClass}`}>
						<div className="flex w-full flex-col gap-3 md:w-1/2">
							<p className="text-paragraph  font-bold">{t.selectMarket}</p>

							<div className="flex flex-wrap gap-3">
								{marketPlaces.length ? (
									marketPlaces.map((market) => {
										const isActive = marketAndLocalForModal
											? marketAndLocalForModal?.label === market.label
											: market.isActive;

										const renderMarketButtonContent = () => (
											<div className="flex w-full items-center justify-between">
												<div className="flex gap-3">
													<market.icon className="h-5 w-5" />
													<span className=" text-paragraph font-bold">{market.label}</span>
												</div>

												{isActive ? (
													<CheckedCircleFilledIcon className="h-4 w-4 text-brand-500" aria-hidden />
												) : (
													<span className="h-4 w-4" aria-hidden />
												)}
											</div>
										);

										return (
											<button
												key={market.label}
												type="button"
												onClick={() => handleMarketSelect(market)}
												className={`flex h-10 w-full max-w-full sm:max-w-[280px] flex-1 basis-full sm:basis-1/2 lg:basis-1/3 items-center gap-3 rounded-lg border px-4 py-2 text-left rtl:text-right transition-colors ${
													isActive ? 'border-brand-500' : 'border-gray-300 hover:bg-gray-50'
												}`}
												data-testid={`market-switcher-option-${market.label}`}
											>
												{renderMarketButtonContent()}
											</button>
										);
									})
								) : (
									<span className="text-paragraph text-gray-600 font-bold">{t.noMarketplaces}</span>
								)}
							</div>
						</div>

						{onLocaleChange && (
							<div className="flex w-full flex-col gap-3 md:w-1/2">
								<p className="text-paragraph font-bold ">{t.preferredLanguage}</p>
								<div className="flex flex-wrap gap-3">
									{languages.map((lang) => {
										const isActive = lang.value === (marketAndLocalForModal?.locale ?? currentLocale);

										return (
											<button
												key={lang.value}
												type="button"
												className={`flex h-10 w-full max-w-full sm:max-w-[280px] flex-1 basis-full sm:basis-1/2 lg:basis-1/3 items-center gap-3 rounded-lg border px-4 py-2 text-left rtl:text-right rtl:flex-row-reverse transition-colors ${
													isActive ? 'border-brand-500' : 'border-gray-300 hover:bg-gray-50'
												}`}
												onClick={() => {
													if (!isActive) handleLocaleSelect(lang.value);
												}}
												data-testid={`market-switcher-locale-${lang.value}`}
											>
												<span className="flex-1 text-paragraph font-bold">{lang.label}</span>
											</button>
										);
									})}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export const MarketSwitcherToggleButton = () => {
	const { locale, isRtlLocale } = useWebUIConfigOptions();
	const { marketSwitcher, isExpanded, setToggleRef, openMobileSheet, setIsExpanded } = useMarketSwitcher();
	const { closeDrawer } = useDrawer();
	const { max_md } = useResponsiveView();
	const isMobile = max_md ?? false;

	// Require marketSwitcher in all cases; require context only on desktop
	if (!marketSwitcher) return null;

	if (!isMobile && !marketSwitcher) return null;

	const marketLangAndRegion = marketSwitcher.marketPlaces.find((market) => market.isActive) || {
		label: locale,
		icon: UaeFlagIcon,
	};

	const handleToggle = () => {
		if (marketSwitcher.marketPlaces.length === 1) {
			marketSwitcher.onLocaleChange?.(isRtlLocale ? 'en' : 'ar');

			return;
		}

		if (isMobile) {
			openMobileSheet();
			setIsExpanded(false);

			closeDrawer();

			return;
		}
		setIsExpanded(!isExpanded);
	};

	return (
		<>
			<button
				ref={setToggleRef || undefined}
				type="button"
				className="flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-caption1 hover:bg-gray-50 rtl:flex-row-reverse"
				onClick={handleToggle}
				data-testid="market-switcher-toggle"
				dir={isRtlLocale ? 'rtl' : 'ltr'}
			>
				<marketLangAndRegion.icon className="h-4 w-4" />
				<span className="text-paragraph font-bold">{locale == 'ar' ? 'English' : 'عربي'}</span>
			</button>
		</>
	);
};
