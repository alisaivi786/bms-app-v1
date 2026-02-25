import React, { ReactNode } from 'react';

export interface IDisclosureProps {
	/** A List of item, allow user to show and hide sections of related content. */
	items: { header: string; body: React.ReactNode; key?: React.Key; tooltipMessage?: string }[];
	/** Override or extend the styles applied to the component */
	className?: string;
	/** The variant to use (primary and secondary)*/
	variant?: 'primary' | 'secondary';
	/** (Optional) List of opened item*/
	openItems?: React.Key[];
	/** (Optional) fire event when item is opened or closed*/
	onToggle?: (openItems: React.Key[], itemKey: React.Key) => void;
}

export interface ICollapsibleItemProps {
	/**React elements to be rendered if isExpanded set to false. */
	content: ReactNode;
	/** If true, the content will be shown. */
	open: boolean;
	/** The variant to use (primary and secondary)*/
	variant: Exclude<IDisclosureProps['variant'], undefined>;
}
