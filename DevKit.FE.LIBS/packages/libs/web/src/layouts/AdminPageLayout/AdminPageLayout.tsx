'use client';
import { ReactNode, useEffect, useState } from 'react';
import { DevkitSimpleBar } from '../../common/devkitSimpleBar';
import SideBar from '../../common/SideBar';
import { useResponsiveView } from '../../hooks/useResponsiveView';
import { useWebUIConfigOptions } from '../ThemeProvider/theme-context';
import { AdminHeader } from './AdminHeader';

export interface IAdminPageLayoutProps {
	/** React elements to be rendered.*/
	children: ReactNode;
}

export const AdminPageLayout = ({ children }: { children: ReactNode }) => {
	const { sideBarItems } = useWebUIConfigOptions();
	const { isExpanded = true, onExpandedStateChange = () => undefined } = sideBarItems ?? {};

	const [isOpen, setIsOpen] = useState(isExpanded);
	const [headerHeight, setHeaderHeight] = useState(0);
	const { sm: isMobile, md: isTablet } = useResponsiveView();

	useEffect(() => {
		if (isExpanded != isOpen) {
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

	return (
		<div className="h-full min-h-screen w-full">
			<div className="flex h-full min-h-screen w-full flex-col">
				<AdminHeader
					onMenuToggle={() => {
						setIsOpen(!isOpen);
					}}
					onHeaderHeightChange={(height) => {
						setHeaderHeight(height);
					}}
				/>

				<div className="flex" style={{ height: `calc(100% - ${headerHeight}px)` }}>
					<div className={isExpanded ? 'block' : 'hidden lg:block'}>
						<SideBar isOpen={isOpen} />
					</div>
					<div className="h-full flex-1 overflow-hidden" onClick={onSideBarBlur}>
						<DevkitSimpleBar className="h-full">
							<div className="flex min-h-full flex-1 flex-col p-4">{children}</div>
						</DevkitSimpleBar>
					</div>
				</div>
			</div>
		</div>
	);
};
