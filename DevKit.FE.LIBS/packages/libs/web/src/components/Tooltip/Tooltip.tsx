/* eslint-disable linebreak-style */
import { useState } from 'react';
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

interface ITooltipData {
	header: string;
	description: string;
}

export interface ITooltip {
	/** The positioning of the tooltip element relative to the triggering element */
	direction?: Placement;
	/** The triggering element of the tooltip, it can be icon or any passed element */
	parentElement?: 'icon' | React.ReactNode;
	/** The tooltip component the child is a custom React element or a header and description as a text */
	childElement: ITooltipData | React.ReactNode;
	/**	Override or extend the styles applied to the component */
	className?: string;
	/** The Tooltip style padding variant*/
	variant?: 'default' | 'no-padding';
	/** If true, the component is shown. */
	isOpen?: boolean;
	/** Callback fired when the component requests to be open. */
	onIsOpenChange?: (isOpen: boolean) => void;
	/** If true, then Tooltip will stay open even if cursor goes out of tooltip */
	persistOnClick?: boolean;
	/** If true, then tooltip can be flipped when it's going out of window (by default true)  */
	isFlippable?: boolean;
	/** Gap between tooltip and parent element */

	removeParentGap?: boolean;
}

/** The tooltips to show extra content when hovering or focusing on an element */

export const Tooltip = ({
	direction = 'top',
	childElement,
	parentElement = 'icon',
	className,
	variant = 'default',
	isOpen,
	onIsOpenChange,
	persistOnClick = false,
	isFlippable = true,
	removeParentGap = false,
}: ITooltip) => {
	const isUncontrolled = typeof isOpen === typeof undefined;
	const [currentState, setCurrentState] = useState(isOpen);
	const internalIsOpen = isUncontrolled ? currentState : isOpen;
	const internalSetOpen = isUncontrolled ? setCurrentState : onIsOpenChange;

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
		<div className="inline-block overflow-hidden">
			<div ref={refs.setReference} {...getReferenceProps()}>
				{parentElement === 'icon' ? (
					<EmptyInfoCircleIcon
						className={`text-body text-gray-600 hover:text-black ${internalIsOpen ? '!text-black' : ''}`}
					/>
				) : (
					parentElement
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
							width: 'min(max-content, 100vw)',
							...styles,
						}}
						{...getFloatingProps()}
						className={`z-floating max-w-sm rounded-md bg-black break-words text-white
						${persistOnClick && middlewareData?.hide?.referenceHidden ? 'hidden' : ''}
						${variant === 'no-padding' ? '' : 'p-4'} drop-shadow-tooltip ${className}`}
					>
						{typeof childElement === 'object' && childElement && 'header' in childElement ? (
							<div className="flex flex-col gap-2">
								<p className="text-paragraph font-bold">{childElement.header}</p>
								<p className="text-caption1 font-normal">{childElement.description}</p>
							</div>
						) : (
							childElement
						)}
					</div>
				</FloatingPortal>
			)}
		</div>
	);
};
