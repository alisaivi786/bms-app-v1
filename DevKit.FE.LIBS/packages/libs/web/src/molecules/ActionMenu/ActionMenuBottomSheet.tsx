import React, { useState } from 'react';
import Button from '../../components/Buttons/Button';
import { BottomSheet } from '../../components/DialogModal';
import { IActionMenuProps } from './ActionMenu';
import { MenuItems } from './MenuItems';

export const ActionMenuBottomSheet = ({
	disabled = false,
	variant = 'secondary',
	groups,
	textSize = 'medium',
	children,
	layoutClassName,
	iconStart,
	iconEnd,
}: IActionMenuProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button
				disabled={disabled}
				variant={variant}
				size={textSize}
				onClick={() => setIsOpen(true)}
				layoutClassName={layoutClassName}
				iconStart={iconStart}
				iconEnd={iconEnd}
			>
				{children}
			</Button>
			<BottomSheet isOpen={isOpen} hasDivider={false} onClose={() => setIsOpen(false)}>
				<MenuItems groups={groups} onClick={() => setIsOpen(false)} />
			</BottomSheet>
		</>
	);
};
