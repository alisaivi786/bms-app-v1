'use client';

import { useState } from 'react';
import { Placement } from '@floating-ui/react-dom';
import { ComponentPopoverVariantType } from '@devkit/utilities';
import { useHTMLElementObserver } from '../../hooks/useHTMLElementObserver';
import { Popover } from '../Popover';

export interface ITextEllipsisTooltipProps {
	/** The positioning of the Tooltip element relative to the triggering element */
	direction?: Placement;

	/** The string content to be shown for ellipsis and inside popover on hover */
	content: string;

	/** Maximum width after which ellipsis will be visible */
	maxWidth?: `${number}${'px' | '%'}`;
	popoverVariant?: ComponentPopoverVariantType;
}

const RenderParentElement = ({
	maxWidth,
	content,
	setEnablePopover,
}: {
	maxWidth: `${number}${'px' | '%'}`;
	content: string;
	setEnablePopover: (isEnable: boolean) => void;
}) => {
	const { contentRef } = useHTMLElementObserver<HTMLDivElement>({
		onChange: (element) => {
			if (element.offsetWidth < element.scrollWidth) {
				setEnablePopover(true);
			}
		},
	});

	return (
		<div
			ref={contentRef}
			style={{
				maxWidth,
			}}
			className="whitespace-nowrap text-ellipsis overflow-hidden"
		>
			{content}
		</div>
	);
};

export const TextEllipsisTooltip = ({
	content,
	maxWidth = '100%',
	popoverVariant,
	direction = 'bottom-start',
}: ITextEllipsisTooltipProps) => {
	const [enablePopover, setEnablePopover] = useState(false);

	return (
		<Popover
			isOpen={enablePopover ? undefined : false}
			content={content}
			direction={direction}
			popoverVariant={popoverVariant}
		>
			<RenderParentElement maxWidth={maxWidth} content={content} setEnablePopover={setEnablePopover} />
		</Popover>
	);
};
