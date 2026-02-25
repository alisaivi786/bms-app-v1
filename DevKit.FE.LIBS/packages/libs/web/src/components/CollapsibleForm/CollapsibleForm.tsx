import isNil from 'lodash/isNil';
import { ReactNode, useEffect, useState } from 'react';
import { DirectionDownCaretFilledIcon, DirectionUpCaretFilledIcon } from '@devkit/icons/web';
import { useHTMLElementObserver } from '../../hooks/useHTMLElementObserver';
import { useResponsiveView } from '../../hooks/useResponsiveView';
import { Button, LinkButton } from '../Buttons';
import { Collapsible, CollapsibleButton, CollapsiblePanel, useCollapsible } from '../Collapsible';
import { FormInputGroup } from '../FormInputGroup';

export interface ICollapsibleFormProps {
	/** If true, the form will be shown. */
	isExpanded?: boolean;
	/** Callback function that returns if form is hidden or shown*/
	onExpandChange?: (isExpanded: boolean) => void;
	/**React elements to be rendered if isExpanded set to false. */
	renderCollapse: ReactNode;
	/**React elements to be rendered if isExpanded set to true. */
	children: ReactNode;
	/**label for show less/more if the isExpanded set to true/false. */
	labels?: {
		less: string;
		more: string;
	};
	/**
	 * height of collapsible form
	 */
	minHeight?: number;
	footer?: ReactNode;
}

const CollapsibleFormChildren = ({
	renderCollapse,
	children,
	labels = { more: 'More', less: 'Less' },
	minHeight,
}: ICollapsibleFormProps) => {
	const [contentHeight, setContentHeight] = useState(minHeight ?? 0);
	const [contentMaxHeight, setContentMaxHeight] = useState(minHeight ?? 0);
	const { open } = useCollapsible();
	const { contentRef } = useHTMLElementObserver<HTMLDivElement>({
		onChange: (element) => {
			if (element.clientHeight > 0) setContentHeight(element.clientHeight);
		},
	});

	const { contentRef: contentChildRef } = useHTMLElementObserver<HTMLDivElement>({
		onChange: (element) => {
			if (element.clientHeight > 0) setContentMaxHeight(element.clientHeight);
		},
	});

	useEffect(() => {
		if (minHeight) setContentHeight(minHeight);
	}, [minHeight]);

	const { sm } = useResponsiveView();

	return (
		<div className="flex flex-col md:flex-row gap-5 justify-center">
			<div className="relative justify-center w-full">
				<CollapsiblePanel minHeight={contentHeight}>
					<div
						className={`w-full ${open ? 'hidden' : 'block'}`}
						style={{ height: `${Math.max(contentHeight, contentMaxHeight)}px` }}
					>
						<div ref={isNil(minHeight) ? contentRef : undefined}>{renderCollapse}</div>
					</div>
					<div className={`w-full ${open ? 'block' : 'hidden'}`}>
						<div ref={contentChildRef}>{children}</div>
					</div>
				</CollapsiblePanel>
			</div>
			<div className="w-full md:w-auto flex justify-end">
				<CollapsibleButton>
					{!sm && (
						<FormInputGroup reserveLabelSpacing>
							<Button
								layoutClassName="w-28"
								variant="secondary"
								iconStart={open ? DirectionUpCaretFilledIcon : DirectionDownCaretFilledIcon}
							>
								{open ? labels.less : labels.more}
							</Button>
						</FormInputGroup>
					)}
					{sm && (
						<LinkButton
							icon={open ? DirectionUpCaretFilledIcon : DirectionDownCaretFilledIcon}
							text={open ? labels.less : labels.more}
						/>
					)}
				</CollapsibleButton>
			</div>
		</div>
	);
};

export const CollapsibleForm = ({
	isExpanded = false,
	renderCollapse,
	onExpandChange,
	children,
	labels,
	minHeight,
	footer,
}: ICollapsibleFormProps) => {
	return (
		<Collapsible open={isExpanded} onToggle={onExpandChange}>
			<CollapsibleFormChildren renderCollapse={renderCollapse} labels={labels} minHeight={minHeight}>
				{children}
			</CollapsibleFormChildren>
			{footer ? <div className="pt-5">{footer}</div> : undefined}
		</Collapsible>
	);
};
