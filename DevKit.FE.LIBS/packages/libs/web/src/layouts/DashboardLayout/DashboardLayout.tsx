'use client';

import { ReactElement, ReactNode, useState } from 'react';
import { DashboardLayoutHeader } from '../../common/CommonLayoutHeader';
import DashboardLayoutSideBar from '../../common/CommonLayoutSideBar';
import { MarketSwitcher } from '../../common/MarketSwitcher';
import { useMarketSwitcher } from '../../common/MarketSwitcherContext';
import MarketSwitcherMobileSheet from '../../common/MarketSwitcherMobileSheet';
import { DevkitSimpleBar } from '../../common/devkitSimpleBar';
import { useResponsiveView } from '../../hooks/useResponsiveView';
import { useWebUIConfigOptions } from '../ThemeProvider/theme-context';
import { MobileLayoutTabNavigation } from './MobileLayoutTabNavigation';

type TContentContainerWidth = 'stretched' | 'container';

export interface IDashboardLayoutProps {
	/** React elements to be rendered.*/
	children: ReactNode;
	/** If true, the header Menu will be disabled. */
	disabled?: boolean;
	/** Width of the content (stretched or container) */
	contentContainerWidth?: TContentContainerWidth;
	/** The subheader component */
	subHeader?: ReactElement;
}

const CONTAINER_CLASS_NAME: Record<TContentContainerWidth, string> = {
	stretched: 'px-8',
	container: 'xl:container xl:mx-auto px-4 md:px-6 xl:px-8',
};

export const DashboardLayout = ({
	children,
	disabled = false,
	contentContainerWidth = 'container',
	subHeader,
}: IDashboardLayoutProps) => {
	const { sideBarItems } = useWebUIConfigOptions();
	const { sm: isMobile } = useResponsiveView();
	const [headerHeight, setHeaderHeight] = useState(0);
	const [tabNavigationHeight, setTabNavigationHeight] = useState(0);
	const [isSideBarExpanded, setIsSideBarExpanded] = useState(false);
	const { isExpanded, setIsExpanded, marketSwitcher } = useMarketSwitcher();

	return (
		<>
			<div
				className="relative w-full bg-white md:h-full md:min-h-screen"
				style={{ paddingBottom: tabNavigationHeight }}
			>
				{isExpanded && (
					<div
						className="fixed inset-0 z-[120] bg-black/50"
						onClick={() => setIsExpanded?.(false)}
						data-testid="market-switcher-overlay"
					/>
				)}
				<div className="w-full md:flex md:h-full md:min-h-screen md:flex-col">
					<div className="md:flex md:h-full">
						<div
							className="flex-1 max-md:!h-auto w-full"
							style={{ height: isMobile ? '' : `calc(100dvh - ${headerHeight}px)` }}
						>
							<div>
								<DashboardLayoutHeader
									onHeaderHeightChange={(height) => {
										setHeaderHeight(height);
									}}
									disabled={disabled}
								/>
								{marketSwitcher && (
									<div className="fixed left-0 right-0 z-layoutSticky" style={{ top: headerHeight }}>
										<MarketSwitcher />
									</div>
								)}
								<MarketSwitcherMobileSheet />
							</div>

							<div className="flex h-full">
								<div
									className="hidden md:flex fixed z-10"
									style={{
										height: isMobile && isSideBarExpanded ? '' : `calc(100dvh - ${headerHeight}px)`,
									}}
								>
									<DashboardLayoutSideBar
										items={sideBarItems?.items}
										footer={sideBarItems?.footer}
										isSideBarExpanded={isSideBarExpanded}
										setIsSideBarExpanded={setIsSideBarExpanded}
									/>
								</div>

								<DevkitSimpleBar
									disable={isMobile}
									tracksZIndex="layout"
									className="w-full h-full overflow-hidden md:ms-24 xl:ms-64"
								>
									<div>{subHeader}</div>
									<div
										className={`flex h-full flex-1 mx-auto flex-col py-4 w-full ${CONTAINER_CLASS_NAME[contentContainerWidth]}`}
									>
										{children}
									</div>
								</DevkitSimpleBar>
							</div>
						</div>
					</div>
				</div>
			</div>
			<MobileLayoutTabNavigation onHeightChange={setTabNavigationHeight} />
		</>
	);
};
