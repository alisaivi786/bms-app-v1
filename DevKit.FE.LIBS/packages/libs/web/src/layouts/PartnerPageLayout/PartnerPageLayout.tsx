'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { DevkitSimpleBar } from '../../common/devkitSimpleBar';
import { useResponsiveView } from '../../hooks/useResponsiveView';
import { IAdminPageLayoutProps } from '../AdminPageLayout';
import { useWebUIConfigOptions } from '../ThemeProvider/theme-context';
import { PartnerHeader } from './components/PartnerHeader';
import { PartnerSideBar } from './components/PartnerSideBar';

export type IPartnerPageLayoutProps = IAdminPageLayoutProps;

export const PartnerPageLayout = ({ children }: IPartnerPageLayoutProps) => {
	const { sideBarItems, onSideMenuLogout } = useWebUIConfigOptions();
	const { isExpanded = true, onExpandedStateChange = () => undefined } = sideBarItems ?? {};

	const [isOpen, setIsOpen] = useState(isExpanded);
	const { sm: isMobile, md: isTablet } = useResponsiveView();

	useEffect(() => {
		if (isExpanded !== isOpen) {
			onExpandedStateChange(isOpen);
		}
	}, [isOpen]);

	useEffect(() => {
		if (isExpanded !== isOpen) {
			setIsOpen(isExpanded);
		}
	}, [isExpanded]);

	const onSideBarBlur = () => {
		if (isMobile || isTablet) onExpandedStateChange(false);
	};

	const handleMenuToggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="flex h-screen w-full overflow-hidden bg-gray-50">
			<div className={clsx('shrink-0', isExpanded ? 'block' : 'hidden lg:block')}>
				<PartnerSideBar isOpen={isOpen} onMenuToggle={handleMenuToggle} onLogout={onSideMenuLogout} />
			</div>

			<div className="flex flex-1 flex-col overflow-hidden">
				<PartnerHeader />

				<div className="flex-1 overflow-hidden" onClick={onSideBarBlur}>
					<DevkitSimpleBar className="h-full">
						<div className="flex min-h-full flex-1 flex-col p-6">{children}</div>
					</DevkitSimpleBar>
				</div>
			</div>
		</div>
	);
};
