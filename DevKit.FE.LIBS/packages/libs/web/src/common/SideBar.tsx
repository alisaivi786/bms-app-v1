import { useEffect, useMemo, useRef, useState } from 'react';
import { DirectionDownCaretFilledIcon, DirectionRightCaretFilledIcon } from '@devkit/icons/web';
import { ISideBarItem } from '@devkit/shared-types';
import { Popover } from '../components/Popover';
import { useWebUIConfigOptions } from '../layouts/ThemeProvider/theme-context';
import { DevkitSimpleBar } from './devkitSimpleBar';
import './SideBar.scss';

type IExpandedSideBarItem = Omit<ISideBarItem, 'items'> & {
	expandPath: number[];
	items?: IExpandedSideBarItem[];
};

export interface ISideBarProps {
	isOpen: boolean;
}

const isExpanded = (item: ISideBarItem): boolean =>
	!!item.isActive || !!item.items?.some((childItem) => isExpanded(childItem));

const convertToExpandedItems = (items: ISideBarItem[], parentExpandPath: number[] = []): IExpandedSideBarItem[] => {
	return items.reduce((acc: IExpandedSideBarItem[], item: ISideBarItem, index) => {
		const expandPath = [...parentExpandPath, index];
		const extendedItem = {
			...item,
			isExpanded: !!item.isActive || !!item.items?.some((childItem) => isExpanded(childItem)),
			items: item.items && convertToExpandedItems(item.items, expandPath),
			expandPath,
		};

		acc.push(extendedItem);

		return acc;
	}, []);
};

const getExpandedPath = (items: IExpandedSideBarItem[]): number[] | undefined => {
	for (let index = 0; index < items.length; index++) {
		const item = items[index];

		let path = undefined;

		if (item.isActive) {
			path = item.expandPath;
		} else if (item.items) {
			path = getExpandedPath(item.items);
		}

		if (path) {
			return path;
		}
	}
};

const MenuItem = ({
	className,
	item,
	isOpen,
	expandedPath,
	levelIndex,
	onExpand,
	index,
	isHandheldDevice,
	onExpandedStateChange,
}: {
	index: number;
	className: string;
	item: IExpandedSideBarItem;
	expandedPath?: number[];
	levelIndex: number;
	lastItem?: boolean;
	isHandheldDevice?: boolean;
	onExpandedStateChange: (isExpanded: boolean) => void;
	onExpand: (path: number[] | undefined) => void;
} & ISideBarProps) => {
	const divRef = useRef<HTMLDivElement>(null);
	const [showOpenToolTip, setShowOpenToolTop] = useState(false);

	useEffect(() => {
		if (divRef.current && divRef.current.scrollWidth > divRef.current.offsetWidth) {
			setShowOpenToolTop(true);
		}
	}, [divRef.current]);

	return (
		<div className={`flex flex-col text-body ${className}`} key={index}>
			<button
				style={{ paddingInlineStart: isOpen ? 14 * levelIndex : 0 }}
				className={`nj-admin-menu-item ${item.isHidden ? 'hidden' : ''}
				${item.isActive ? '' : 'nj-admin-menu-item-hover'}
				`}
				onClick={() => {
					let path = [...item.expandPath];

					if (index === expandedPath?.[levelIndex]) {
						path = path.slice(0, levelIndex);
					}
					onExpand(path);

					if (item.onClick) {
						/* delay the execution to allow saving 
                  the accordion state before navigation*/

						setTimeout(item.onClick, 200);

						if (isHandheldDevice) onExpandedStateChange(!isOpen);
					}
				}}
			>
				<div className="nj-admin-menu-item-horizontal-padding">
					<Popover
						popoverVariant="dark"
						className={`rounded-sm !bg-gray-800 text-white ${!isOpen ? '' : 'hidden'}`}
						content={<p className=" px-2 py-0.5 text-paragraph">{item.label}</p>}
						direction="right"
					>
						<div className="flex">{item.icon && <item.icon className="nj-admin-menu-item-child-text-size " />}</div>
					</Popover>
					<div className="flex flex-1 items-center justify-between overflow-hidden">
						<div className="flex flex-1 items-center overflow-hidden truncate " ref={divRef}>
							<Popover
								className={`rounded-sm !bg-gray-800 text-white ${showOpenToolTip ? '' : 'hidden'}`}
								popoverVariant="dark"
								content={<p className=" px-2 py-0.5 text-paragraph">{item.label}</p>}
							>
								<p
									className={`flex-1 truncate text-left transition-opacity duration-300 ease-linear ${
										isOpen ? 'opacity-100' : 'opacity-0'
									}`}
								>
									{item.label}
								</p>
							</Popover>
						</div>
						{!!item.items && (
							<div className="h-4 w-4">
								{index === expandedPath?.[levelIndex] ? (
									<DirectionDownCaretFilledIcon />
								) : (
									<DirectionRightCaretFilledIcon className="rtl:rotate-180" />
								)}
							</div>
						)}
					</div>
				</div>
			</button>
			{!!item.items && (
				<div
					className={`overflow-hidden transition-all  ${
						index === expandedPath?.[levelIndex]
							? 'max-h-screen duration-500 ease-in '
							: 'max-h-0 duration-300 ease-out'
					}`}
				>
					{item.items?.map((item, index) => (
						<MenuItem
							key={index}
							index={index}
							className={`nj-admin-menu-item-child-text-size ${
								item.isActive ? 'nj-admin-menu-item-selected-child' : 'nj-admin-menu-item-unselected-child'
							}`}
							item={item}
							isHandheldDevice={isHandheldDevice}
							isOpen={isOpen}
							onExpandedStateChange={onExpandedStateChange}
							expandedPath={expandedPath}
							levelIndex={levelIndex + 1}
							onExpand={onExpand}
						/>
					))}
				</div>
			)}
		</div>
	);
};

const SideBar = ({ isOpen }: ISideBarProps) => {
	const { sideBarItems } = useWebUIConfigOptions();
	const { items = [], onExpandedStateChange = () => undefined, footer, isExpanded } = sideBarItems ?? {};
	const [expandedPath, setExpandedPath] = useState<number[] | undefined>([]);
	const expandedItems = useMemo(() => {
		const filteredItems = items.filter((item) => !item.type);
		const expandedItems = convertToExpandedItems(filteredItems);
		const path = getExpandedPath(expandedItems);

		setExpandedPath(path);

		return expandedItems;
	}, [items]);

	return (
		<div
			className={` nj-admin-menu ${
				isOpen ? 'nj-admin-menu-expanded' : 'nj-admin-menu-collapsed'
			} absolute  lg:relative`}
		>
			<DevkitSimpleBar className="h-full w-72 overflow-x-hidden">
				{expandedItems?.map((item, index) => (
					<MenuItem
						index={index}
						key={index}
						className={`nj-admin-menu-item-group-text-size ${
							item.isActive ? 'nj-admin-menu-item-selected-group' : 'nj-admin-menu-item-unselected-group'
						} 
						nj-side-menu-item-gap-y
						`}
						item={item}
						onExpandedStateChange={onExpandedStateChange}
						expandedPath={expandedPath}
						isOpen={isOpen}
						levelIndex={0}
						onExpand={setExpandedPath}
					/>
				))}
			</DevkitSimpleBar>
			{footer && isExpanded && <div className="p-4 pb-20  lg:p-4 lg:pb-4">{footer}</div>}
		</div>
	);
};

export default SideBar;
