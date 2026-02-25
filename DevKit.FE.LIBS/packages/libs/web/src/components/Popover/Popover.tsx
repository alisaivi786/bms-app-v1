'use client';

import { useRef, useState } from 'react';
import {
	FloatingPortal,
	Placement,
	autoUpdate,
	flip,
	hide,
	limitShift,
	offset,
	safePolygon,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useHover,
	useInteractions,
	useTransitionStyles,
} from '@floating-ui/react';
import { EmptyInfoCircleIcon } from '@devkit/icons/web';
import { ComponentPopoverVariantType } from '@devkit/utilities';
import { isElementCenterCovered } from '../../utils/elementUtils';
import popoverStyles from './Popover.styles';

interface IPopoverData {
	header: string;
	description: string;
}

export interface IPopoverProps {
	/** The positioning of the popover element relative to the triggering element */
	direction?: Placement;
	/** The triggering element of the popover, it can be icon or any passed element */
	children?: 'icon' | React.ReactNode;
	/** The popover component the child is a custom React element or a header and description as a text */
	content?: IPopoverData | React.ReactNode;
	/**	Override or extend the styles applied to the component */
	className?: string;
	/** If true, the component is shown. */
	isOpen?: boolean;
	/** Callback fired when the component requests to be open. */
	onIsOpenChange?: (isOpen: boolean) => void;
	/** If true, then Tooltip will stay open even if cursor goes out of popover */
	persistOnClick?: boolean;
	/** If true, then popover can be flipped when it's going out of window (by default true)  */
	isFlippable?: boolean;
	/** Gap between popover and parent element */

	removeParentGap?: boolean;
	popoverVariant?: ComponentPopoverVariantType;

	hideWhenTargetCovered?: boolean;
}

/** The popovers to show extra content when hovering or focusing on an element */

export const Popover = ({
	direction = 'top',
	content,
	children = 'icon',
	className,
	isOpen,
	onIsOpenChange,
	persistOnClick = false,
	isFlippable = true,
	removeParentGap = false,
	popoverVariant = 'dark',
	hideWhenTargetCovered = false,
}: IPopoverProps) => {
	const isUncontrolled = typeof isOpen === typeof undefined;
	const [currentState, setCurrentState] = useState(isOpen);
	const internalIsOpen = isUncontrolled ? currentState : isOpen;
	const internalSetOpen = isUncontrolled ? setCurrentState : onIsOpenChange;
	const containerRef = useRef<HTMLDivElement>(null);

	const getFloatingMiddlewares = () => {
		const middlewares = [
			offset({ mainAxis: removeParentGap ? 2 : 8 }),
			shift({
				limiter: limitShift(),
			}),
		];

		if (persistOnClick) {
			middlewares.push(hide());
		}

		if (isFlippable) {
			middlewares.push(flip());
		}

		return middlewares;
	};

	const { x, y, refs, strategy, context, middlewareData } = useFloating({
		open: internalIsOpen,
		onOpenChange: internalSetOpen,
		placement: direction,
		middleware: getFloatingMiddlewares(),
		whileElementsMounted: autoUpdate,
	});

	const { isMounted, styles } = useTransitionStyles(context);

	const dismiss = useDismiss(context);
	const click = useClick(context, { enabled: persistOnClick });
	const hover = useHover(context, {
		handleClose: safePolygon(),
		enabled: !persistOnClick,
	});

	const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, click, hover]);

	return (
		<div ref={containerRef} className={popoverStyles.popoverElementStyle}>
			<div ref={refs.setReference} {...getReferenceProps()}>
				{children === 'icon' ? (
					<EmptyInfoCircleIcon className={popoverStyles.infoIconStyle(internalIsOpen)} />
				) : (
					children
				)}
			</div>

			{isMounted && (
				<FloatingPortal>
					<div
						ref={refs.setFloating}
						style={{
							position: strategy,
							top: y ?? 0,
							left: x ?? 0,
							width: 'max-content',
							...styles,
						}}
						{...getFloatingProps()}
						className={popoverStyles.contentWrapper(
							className,
							popoverVariant,
							(persistOnClick && middlewareData?.hide?.referenceHidden) ||
								(hideWhenTargetCovered && isElementCenterCovered(containerRef.current))
						)}
					>
						{typeof content === 'string' ? (
							<div className={popoverStyles.popoverContentWrapper}>
								<p className={popoverStyles.popoverDescriptionStyle(popoverVariant)}>{content}</p>
							</div>
						) : typeof content === 'object' && content && 'header' in content ? (
							<div className={popoverStyles.popoverContentWrapper}>
								{content.header && <p className={popoverStyles.popoverHeaderStyle(popoverVariant)}>{content.header}</p>}
								{content.description && (
									<p className={popoverStyles.popoverDescriptionStyle(popoverVariant)}>{content.description}</p>
								)}
							</div>
						) : (
							content
						)}
					</div>
				</FloatingPortal>
			)}
		</div>
	);
};
