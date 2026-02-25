'use client';

import { ReactElement, ReactNode, useRef } from 'react';
import { isSafari } from 'react-device-detect';
import { ThinArrowUpIcon } from '@devkit/icons/web';
import { FullPageLayoutHeader } from '../../common/FullPageLayoutHeader';
import { MarketSwitcher } from '../../common/MarketSwitcher';
import { useMarketSwitcher } from '../../common/MarketSwitcherContext';
import MarketSwitcherMobileSheet from '../../common/MarketSwitcherMobileSheet';
import { DevkitSimpleBar } from '../../common/devkitSimpleBar';
import { useHTMLElementObserver } from '../../hooks/useHTMLElementObserver';
import { useResponsiveView } from '../../hooks/useResponsiveView';

type TContentContainerWidth = 'full-width' | 'stretched' | 'container';

export interface IFullPageLayoutProps {
	/** React elements to be rendered.*/
	children?: ReactNode;
	/** If true, the layout will be centered */
	verticalCenter?: boolean;
	/** The layout footer component  */
	footer?: ReactNode;
	/** ClassName to override footer styles */
	footerClassName?: string;
	/** If true, the header will be sticky will scrolling */
	stickyHeader?: boolean;
	/** If true, the footer will be sticky will scrolling */
	isFooterSticky?: boolean;
	/** If true, the subheader will be sticky will scrolling */
	isSubHeaderSticky?: boolean;
	/** The subheader component */
	subHeader?: ReactElement;
	/** BackToTop button text */
	backToTop?: string;
	/** Use to control the layout container width */
	contentContainerWidth?: TContentContainerWidth;
	/** If true, the component is disabled. */
	disabled?: boolean;
	/** The variant of FullPageLayoutHeader */
	variant?: 'default' | 'primary' | 'full-width';
	hideHeader?: boolean;
}

const CONTAINER_CLASS_NAME: Record<TContentContainerWidth, string> = {
	stretched: 'px-4 lg:px-16 md:px-6 w-full',
	container: 'container',
	'full-width': 'w-full',
};

export const FullPageLayout = ({
	children,
	verticalCenter = false,
	stickyHeader = true,
	footer: FooterComp,
	footerClassName = '',
	contentContainerWidth = 'container',
	isFooterSticky,
	isSubHeaderSticky = false,
	subHeader,
	backToTop,
	disabled = false,
	variant = 'default',
	hideHeader = false,
}: IFullPageLayoutProps) => {
	const topRef = useRef<HTMLDivElement>(null);
	const { sm } = useResponsiveView();
	const footerDivSpacingRef = useRef<HTMLDivElement>(null);
	const { isExpanded, setIsExpanded, marketSwitcher } = useMarketSwitcher();

	const handleClickScroll = () => {
		topRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const { contentRef: headerRef } = useHTMLElementObserver<HTMLDivElement>({
		onChange: (element) => {
			if (topRef.current && stickyHeader) {
				topRef.current.style.marginTop = `${element.clientHeight}px`;

				if (headerRef.current) headerRef.current.className = 'fixed w-full translate-x-0 z-layoutSticky';
			}
		},
	});

	const { contentRef: footerRef } = useHTMLElementObserver<HTMLDivElement>({
		onChange: (element) => {
			if (footerDivSpacingRef.current && isFooterSticky) {
				footerDivSpacingRef.current.style.marginTop = `${element.clientHeight}px`;
			}
		},
	});

	return (
		<>
			{isExpanded && (
				<div
					className="absolute inset-0 z-40 bg-black/50 "
					onClick={() => setIsExpanded?.(false)}
					data-testid="market-switcher-overlay"
				/>
			)}

			<DevkitSimpleBar disable={sm && !isSafari} tracksZIndex="layout" className={`h-full ${!sm && 'overflow-hidden'}`}>
				<div ref={headerRef}>
					{/* Main Header */}
					{!hideHeader && (
						<>
							<FullPageLayoutHeader variant={variant} disabled={disabled} />
							<div className={`${marketSwitcher ? 'fixed left-0 right-0 z-layoutSticky ' : ''}`}>
								<MarketSwitcher />
							</div>

							<MarketSwitcherMobileSheet />
						</>
					)}

					{/* Market switcher panel */}

					{/* Sticky Sub Header */}
					{isSubHeaderSticky && subHeader}
				</div>

				{/* Margin Top for Non Sticky */}
				<div ref={topRef}></div>

				{/* Non Sticky Sub Header */}
				{!isSubHeaderSticky && subHeader}

				<div
					className={`relative mx-auto flex-1 ${variant == 'full-width' ? '' : 'py-8'}
								  ${CONTAINER_CLASS_NAME[contentContainerWidth]} 
									${verticalCenter ? 'flex flex-col justify-center' : ''}`}
				>
					{children}
					{backToTop && <GoToTop backToTop={backToTop} handleClickScroll={handleClickScroll} />}
					<div ref={footerDivSpacingRef}></div>
				</div>
				{Footer && (
					<div
						className={`w-full ${isFooterSticky ? `fixed bottom-0 ${!isExpanded ? 'z-layoutSticky' : ''}` : ''}`}
						ref={footerRef}
					>
						<Footer FooterComp={FooterComp} footerClassName={footerClassName} />
					</div>
				)}
			</DevkitSimpleBar>
		</>
	);
};

interface IFooter {
	FooterComp?: React.ReactNode;
	footerClassName: string;
}

const Footer = ({ FooterComp, footerClassName }: IFooter) => {
	if (!FooterComp) {
		return null;
	}

	return (
		<footer className="w-full bg-white border-t border-t-gray-200">
			<div className={`mx-auto flex h-24 flex-col justify-center px-4 lg:px-16 md:px-6 ${footerClassName}`}>
				{FooterComp}
			</div>
		</footer>
	);
};

interface IGoToTop {
	handleClickScroll: () => void;
	backToTop: string;
}

const GoToTop = ({ handleClickScroll, backToTop }: IGoToTop) => {
	return (
		<section className="flex items-center justify-center my-6">
			<div onClick={handleClickScroll} className="cursor-pointer text-paragraph nj-text-brand">
				{backToTop}
			</div>
			<div className="ml-2 text-caption2 nj-text-brand">
				<ThinArrowUpIcon />
			</div>
		</section>
	);
};
