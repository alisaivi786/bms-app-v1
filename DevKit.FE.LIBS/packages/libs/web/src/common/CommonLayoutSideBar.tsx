import { ReactNode, useEffect, useRef } from 'react';
import { SfArrowLeftToLineIcon, SfSidebarLeftIcon } from '@devkit/icons/web';
import { ISideBarItem } from '@devkit/shared-types';
import { useWebUIConfigOptions } from '../layouts/ThemeProvider/theme-context';
import { DevkitSimpleBar } from './devkitSimpleBar';

const DashboardLayoutSideBar = ({
	items,
	footer,
	isDrawer = false,
	closeDrawer,
	isSideBarExpanded,
	setIsSideBarExpanded,
}: {
	items: ISideBarItem[] | undefined;
	footer?: ReactNode;
	isDrawer?: boolean;
	closeDrawer?: () => void;
	isSideBarExpanded: boolean;
	setIsSideBarExpanded: (showSideBar: boolean) => void;
}) => {
	const sideBarRef = useRef<HTMLDivElement>(null);
	const handleCloseSidebar = () => {
		setIsSideBarExpanded(false);
	};

	useEffect(() => {
		const handleBodyClick = (event: MouseEvent) => {
			// Close the sidebar if the click is outside the sidebar and the sidebar is currently shown
			if (sideBarRef.current && !sideBarRef.current.contains(event.target as Node) && isSideBarExpanded) {
				handleCloseSidebar();
			}
		};

		// Attach the event listener when the component mounts
		document.body.addEventListener('click', handleBodyClick);

		return () => {
			// Detach the event listener when the component unmounts
			document.body.removeEventListener('click', handleBodyClick);
		};
	}, [isSideBarExpanded]);

	const { isRtlLocale } = useWebUIConfigOptions();

	return (
		<div
			className={`flex h-full flex-col overflow-y-auto overflow-x-hidden bg-white ${isDrawer ? '' : 'border-e'}`}
			ref={sideBarRef}
		>
			<DevkitSimpleBar
				className={`h-full xl:w-64 overflow-x-hidden flex flex-col grow transition-all duration-500
				${isSideBarExpanded ? 'md:w-64' : 'md:w-24'}`}
			>
				<div className="flex flex-col justify-between h-full">
					<div>
						<button
							className="w-full nj-text-brand items-center flex  xl:hidden py-4 pb-6 px-8"
							onClick={() => {
								setIsSideBarExpanded(!isSideBarExpanded);
							}}
						>
							<SfSidebarLeftIcon
								className={`${isSideBarExpanded ? 'hidden' : ''} ${isRtlLocale ? 'scale-x-[-1]' : ''} h-6 w-6`}
							/>
							<SfArrowLeftToLineIcon
								className={`${isSideBarExpanded ? '' : 'hidden'} ${isRtlLocale ? 'scale-x-[-1]' : ''} h-6 w-6  `}
							/>
						</button>
						{items?.map((item: ISideBarItem, index: number) => {
							return (
								<button
									key={index}
									className={`flex w-full items-center gap-4 py-3.5 ${
										isDrawer ? 'ps-6' : 'ps-8'
									}  text-gray-800 hover:nj-bg-brand hover:text-white ${
										item.isActive ? 'nj-bg-brand text-white' : 'text-gray-800'
									} ${item.isDisabled ? 'opacity-20 cursor-not-allowed' : ''}  ${item.isHidden ? 'hidden' : ''}`}
									disabled={item.isDisabled}
									onClick={() => {
										closeDrawer && closeDrawer();
										item.onClick && item.onClick();
									}}
								>
									<span>{item.icon && <item.icon className="!h-6 !w-6" />}</span>
									<p
										className={`
											flex truncate text-title3 font-medium items-center
											${item.className ?? ''}
											${isSideBarExpanded ? 'md:block' : 'max-xl:hidden'}
										`}
									>
										{item.label}
									</p>
								</button>
							);
						})}
					</div>

					{footer && <div className="hidden p-8 xl:block">{footer}</div>}
				</div>
			</DevkitSimpleBar>
		</div>
	);
};

export default DashboardLayoutSideBar;
