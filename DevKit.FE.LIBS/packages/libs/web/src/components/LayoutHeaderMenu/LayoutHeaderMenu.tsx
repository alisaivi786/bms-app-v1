'use client';

import clsx from 'clsx';
import { FC, PropsWithChildren, ReactNode, useRef, useState } from 'react';
import {
	FloatingArrow,
	FloatingPortal,
	Placement,
	arrow,
	autoUpdate,
	flip,
	offset,
	safePolygon,
	useClick,
	useDismiss,
	useFloating,
	useHover,
	useInteractions,
} from '@floating-ui/react';
import { TwLayoutClassName } from '@devkit/utilities';
import { useWebUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { enableTestId } from '../../utils/lib-config';

export type MenuItem = {
	content: FC<PropsWithChildren<{ closeMenu: () => void }>> | ReactNode;
	onClick?: () => void;
	icon?: React.FC<React.SVGProps<SVGSVGElement>> | ReactNode;
	className?: string;
	link?: {
		href: string;
		isExternal?: boolean;
		target?: Target;
	};
	isActive?: boolean;
	isDisabled?: boolean;
	testId?: string;
};

export type LayoutHeaderMenuProps = {
	placement?: Placement;
	/**
	 * Make the icon not clickable
	 */
	disabled?: boolean;

	/**
	 * the content of the menu (react node or array of objects)
	 */
	menuItems: MenuItem[] | ReactNode;
	/**
	 * the content of the footer items in menu (react node or array of objects)
	 */
	menuFooterItems?: MenuItem[] | ReactNode;
	/**
	 * an object that specify the icons that should appear when the menu is opened or closed
	 */
	triggerComponent?: FC<{ isOpen?: boolean }>;
	hideIcons?: boolean;
	minWidth?: number;
	showBehavior?: 'click' | 'hover';
	variant?: 'no-container-padding';
	layoutClassName?: TwLayoutClassName;
	/**
	 * used with data-testid attribute
	 */
	testId?: string;
};
type Target = '_blank' | '_self' | '_parent' | '_top' | 'framename';

const LinkComponent: FC<
	PropsWithChildren<{
		isRouterLink?: boolean;
		href?: string;
		onClick?: () => void;
		className?: string;
		target?: Target;
		isDisabled?: boolean;
		testId?: string;
	}>
> = ({ isRouterLink, children, href = '#', onClick, className = '', target = '_self', isDisabled, testId }) => {
	const { renderLink: Link } = useWebUIConfigOptions();

	if (isDisabled)
		return (
			<span className={`${className} text-gray-600`} data-testid={enableTestId ? testId : undefined}>
				{children}
			</span>
		);

	if (onClick || !isRouterLink || !Link)
		return (
			<a
				href={href}
				target={target}
				className={className}
				onClick={
					onClick
						? (e) => {
								e.preventDefault();
								e.stopPropagation();
								onClick();
						  }
						: undefined
				}
				data-testid={enableTestId ? testId : undefined}
			>
				{children}
			</a>
		);

	return (
		<a href={href} target={target} className={className}>
			{children}
		</a>
	);
};

const LayoutHeaderMenu: FC<LayoutHeaderMenuProps> = (props) => {
	const {
		disabled = false,
		placement = 'bottom-end',
		menuItems,
		menuFooterItems,
		triggerComponent: TriggerComponent = () => <></>,
		minWidth,
		showBehavior = 'click',
		variant,
		layoutClassName,
		testId,
	} = props;

	const hideMenuItem = !(
		(!menuItems || (Array.isArray(menuItems) && menuItems.length === 0)) &&
		(!menuFooterItems || (Array.isArray(menuFooterItems) && menuFooterItems.length === 0))
	);
	const [isOpen, setIsOpen] = useState(false);

	const arrowRef = useRef(null);

	const { refs, floatingStyles, strategy, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		placement,
		middleware: [
			flip(),
			offset({ mainAxis: 8 }),
			arrow({
				element: arrowRef,
			}),
		],
		whileElementsMounted: autoUpdate,
	});

	const useBehaviorHook = showBehavior === 'click' ? useClick : useHover;

	const behavior = useBehaviorHook(context, { enabled: !disabled, handleClose: safePolygon() });
	const dismiss = useDismiss(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([behavior, dismiss]);

	return (
		<>
			<div
				ref={refs.setReference}
				{...getReferenceProps()}
				className={clsx(layoutClassName)}
				data-testid={enableTestId ? testId : undefined}
			>
				<TriggerComponent isOpen={isOpen} />
			</div>
			{isOpen && hideMenuItem && (
				<FloatingPortal>
					<div
						className="z-floating"
						ref={refs.setFloating}
						style={{ position: strategy, ...floatingStyles }}
						{...getFloatingProps()}
					>
						<div
							className={`max-w-sm rounded-md bg-white break-words text-black shadow-menu ${
								variant !== 'no-container-padding' ? 'p-4' : 'p-0'
							}`}
							style={{ minWidth }}
						>
							<FloatingArrow ref={arrowRef} context={context} fill="white" />
							{!Array.isArray(menuItems) ? (
								<div onClick={() => setIsOpen(false)}>{menuItems}</div>
							) : (
								menuItems.map((menuItem, index) => (
									<LinkComponent
										key={index}
										className={`flex w-full gap-4 items-center whitespace-nowrap py-3 hover:bg-gray-50 ${
											variant !== 'no-container-padding' ? 'px-3' : 'px-0'
										} rounded-md text-start text-paragraph
										${menuItem.isActive ? 'nj-text-brand' : ''}
										${menuItem.className ?? ''}`}
										onClick={
											menuItem?.onClick
												? () => {
														menuItem?.onClick?.();

														if (menuItem?.onClick && typeof menuItem.content !== 'function') setIsOpen(false);
												  }
												: undefined
										}
										target={menuItem.link?.target}
										href={menuItem.link?.href}
										isRouterLink={!menuItem.link?.isExternal}
										isDisabled={menuItem.isDisabled}
										testId={menuItem.testId}
									>
										<>
											{typeof menuItem.icon === 'function' ? <menuItem.icon className="w-5 h-5" /> : menuItem.icon}
											{typeof menuItem.content === 'function'
												? menuItem.content({
														closeMenu: () => {
															setIsOpen(false);
														},
												  })
												: menuItem.content}
										</>
									</LinkComponent>
								))
							)}
							{menuFooterItems && menuItems && <div className="my-1.5 border-t border-gray-200"></div>}
							{!Array.isArray(menuFooterItems) ? (
								<>{menuFooterItems}</>
							) : (
								menuFooterItems?.map((menuItem, index) => (
									<LinkComponent
										key={index}
										className={`flex w-full items-center whitespace-nowrap py-3 text-start text-paragraph !text-red-500 hover:opacity-70 ${
											menuItem.className ?? ''
										}`}
										onClick={
											menuItem?.onClick
												? () => {
														menuItem?.onClick?.();

														if (menuItem?.onClick && typeof menuItem.content !== 'function') setIsOpen(false);
												  }
												: undefined
										}
										href={menuItem.link?.href}
										target={menuItem.link?.target}
										isRouterLink={!menuItem.link?.isExternal}
										isDisabled={menuItem.isDisabled}
									>
										<>
											{typeof menuItem.icon === 'function' ? <menuItem.icon className="w-5 h-5" /> : menuItem.icon}
											{typeof menuItem.content === 'function'
												? menuItem.content({
														closeMenu: () => {
															setIsOpen(false);
														},
												  })
												: menuItem.content}
										</>
									</LinkComponent>
								))
							)}
						</div>
					</div>
				</FloatingPortal>
			)}
		</>
	);
};

export default LayoutHeaderMenu;
