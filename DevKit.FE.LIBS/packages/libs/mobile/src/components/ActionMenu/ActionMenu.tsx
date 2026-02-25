import React, { useState } from 'react';
import { ArrowDownIcon } from '@devkit/icons/native';
import { ComponentSize, TwLayoutClassName } from '@devkit/utilities';
import { Button } from '../Buttons';
import Modal from '../DialogModal/Modal';
import { IGroupActionMenuItem, MenuItems } from './MenuItems';

export interface IActionMenuProps {
	/** The action menu variant */
	variant?: 'primary' | 'secondary' | 'text';
	/** The text size variant */
	textSize?: ComponentSize;
	/** If true, the component is disabled */
	disabled?: boolean;
	/** GroupsMenu contents, a list of objects containing the `renderItem` used to add a custom menu item,
	 *  and `onClick` a callback function to handle item selection, and `disable` which will disable the list item */
	groups: IGroupActionMenuItem[][];
	/** Used to pass title at the menu button */
	children: string;
	layoutClassName?: TwLayoutClassName;
}

export const ActionMenu = ({
	disabled = false,
	variant = 'secondary',
	groups,
	textSize = 'medium',
	children,
	layoutClassName,
}: IActionMenuProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button
				disabled={disabled}
				variant={variant}
				size={textSize}
				onPress={() => setIsOpen(true)}
				layoutClassName={layoutClassName}
				iconEnd={ArrowDownIcon}
			>
				{children}
			</Button>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<MenuItems groups={groups} onClick={() => setIsOpen(false)} />
			</Modal>
		</>
	);
};
