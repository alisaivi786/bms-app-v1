import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { IMarketSwitcher } from '@devkit/shared-types';
import { useResponsiveView } from '../hooks/useResponsiveView';

interface IMarketSwitcherContext {
	isExpanded: boolean;
	setIsExpanded: (state: boolean) => void;
	setPanelRef: Dispatch<SetStateAction<HTMLDivElement | null>>;
	setToggleRef: Dispatch<SetStateAction<HTMLButtonElement | null>>;
	isMobileSheetOpen: boolean;
	openMobileSheet: () => void;
	closeMobileSheet: () => void;
	marketSwitcher?: IMarketSwitcher;
}
type MarketSwitcherProviderProps = {
	children: React.ReactNode;
	marketSwitcher?: IMarketSwitcher;
};

const defaultMarketSwitcherContext: IMarketSwitcherContext = {
	marketSwitcher: undefined,
	isExpanded: false,
	setIsExpanded: () => undefined,
	setPanelRef: () => undefined,
	setToggleRef: () => undefined,
	isMobileSheetOpen: false,
	openMobileSheet: () => undefined,
	closeMobileSheet: () => undefined,
};

const MarketSwitcherContext = createContext<IMarketSwitcherContext>(defaultMarketSwitcherContext);

export const MarketSwitcherProvider = ({ children, marketSwitcher }: MarketSwitcherProviderProps) => {
	const [panelRef, setPanelRef] = useState<HTMLDivElement | null>(null);
	const [toggleRef, setToggleRef] = useState<HTMLButtonElement | null>(null);
	const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
	const [isMarketSwitcherExpanded, setIsMarketSwitcherExpanded] = useState(false);

	useEffect(() => {
		if (!isMarketSwitcherExpanded) return;

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			if (panelRef?.contains(target)) return;

			if (toggleRef?.contains(target)) return;

			setIsMarketSwitcherExpanded(false);
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isMarketSwitcherExpanded, panelRef, setIsMarketSwitcherExpanded, toggleRef]);

	return (
		<>
			{marketSwitcher ? (
				<MarketSwitcherContext.Provider
					value={{
						marketSwitcher,
						isExpanded: isMarketSwitcherExpanded ?? false,
						setIsExpanded: (state) => setIsMarketSwitcherExpanded(state),
						setPanelRef,
						setToggleRef,
						isMobileSheetOpen,
						openMobileSheet: () => setIsMobileSheetOpen(true),
						closeMobileSheet: () => setIsMobileSheetOpen(false),
					}}
				>
					{children}
				</MarketSwitcherContext.Provider>
			) : (
				children
			)}
		</>
	);
};

export const useMarketSwitcher = () => {
	const context = useContext(MarketSwitcherContext);
	const { setIsExpanded } = context;

	const { max_md } = useResponsiveView();
	const isMobile = max_md ?? false;

	useEffect(() => {
		if (isMobile) {
			setIsExpanded(false);
		}
	}, [isMobile, setIsExpanded]);

	return { ...context };
};
