'use client';

import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { SfChevronDownIcon, SfChevronUpIcon, SfSidebarLeftIcon } from '@devkit/icons/web';
import { ISideBarItem } from '@devkit/shared-types';
import LogoHeader from '../../../common/LogoHeader';
import { DevkitSimpleBar } from '../../../common/devkitSimpleBar';
import { useWebUIConfigOptions } from '../../ThemeProvider/theme-context';
import '../PartnerSideBar.scss';
import { PartnerLogout } from './PartnerLogout';

type PartnerSideBarSection = {
	title?: string;
	items: ISideBarItem[];
};

type PartnerSideBarProps = {
	isOpen: boolean;
	onMenuToggle: () => void;
	onLogout?: () => void | Promise<void>;
};

type ExpandedSideBarItem = Omit<ISideBarItem, 'items'> & {
	expandPath: number[];
	items?: ExpandedSideBarItem[];
	type?: 'group';
};

const isExpanded = (item: ISideBarItem): boolean =>
	!!item.isActive || !!item.items?.some((childItem) => isExpanded(childItem));

const convertToExpandedItems = (items: ISideBarItem[], parentExpandPath: number[] = []): ExpandedSideBarItem[] => {
	return items.reduce((acc: ExpandedSideBarItem[], item: ISideBarItem, index) => {
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

const getExpandedPath = (items: ExpandedSideBarItem[]): number[] | undefined => {
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
	item,
	isOpen,
	expandedPath,
	levelIndex,
	onExpand,
	index,
	badge,
}: {
	index: number;
	item: ExpandedSideBarItem;
	expandedPath?: number[];
	levelIndex: number;
	isOpen: boolean;
	onExpand: (path: number[] | undefined) => void;
	badge?: string;
}) => {
	const isCurrentExpanded = index === expandedPath?.[levelIndex];
	const hasChildren = !!item.items;
	const isActive = item.isActive;
	const isGroup = item.type === 'group';
	const itemBadge = badge || item.badge;

	if (isGroup) {
		return (
			<div className={clsx('flex flex-col ', item.isHidden && 'hidden')} key={index}>
				{isOpen && (
					<div className="font-normal text-caption1 leading-[18px] text-gray-100 py-2 uppercase tracking-wider">
						{item.label}
					</div>
				)}
			</div>
		);
	}

	return (
		<div
			className={clsx('flex flex-col', item.isHidden && 'hidden')}
			key={index}
			style={{
				paddingInlineStart: isOpen && levelIndex > 0 ? 12 + 16 * levelIndex : 0,
			}}
		>
			<button
				className={clsx(
					'flex items-center rounded-lg text-start transition-colors px-3 py-2 gap-3 hover:bg-white/10 text-white',
					isOpen ? 'w-full' : 'self-center',
					isActive ? 'nj-partner-menu-item-active' : 'hover:nj-partner-menu-item-active'
				)}
				onClick={() => {
					let path = [...item.expandPath];

					if (index === expandedPath?.[levelIndex]) {
						path = path.slice(0, levelIndex);
					}
					onExpand(path);

					if (item.onClick) {
						setTimeout(item.onClick, 200);
					}
				}}
			>
				{item.icon && <item.icon className="h-4 w-4 shrink-0" />}
				{isOpen && (
					<span
						className={clsx('flex-1 truncate text-paragraph transition-opacity', isOpen ? 'opacity-100' : 'opacity-0')}
					>
						{item.label}
					</span>
				)}
				{itemBadge && isOpen && (
					<div className="nj-partner-menu-badge w-11 h-[22px] rounded-full flex items-center justify-center py-0.5 px-2">
						<span className="font-medium text-caption1 leading-[18px] text-center nj-text-brand">{itemBadge}</span>
					</div>
				)}
				{hasChildren && isOpen && (
					<div className="h-4 w-4">
						{isCurrentExpanded ? (
							<SfChevronUpIcon className="rtl:rotate-180 h-4 w-4" />
						) : (
							<SfChevronDownIcon className=" h-4 w-4" />
						)}
					</div>
				)}
			</button>
			{hasChildren && (
				<div
					className={clsx(
						'overflow-hidden transition-all',
						isCurrentExpanded ? 'max-h-screen duration-500 ease-in' : 'max-h-0 duration-300 ease-out'
					)}
				>
					{item.items?.map((childItem, childIndex) => (
						<div key={childIndex} className="py-2 gap-3 ">
							<MenuItem
								key={childIndex}
								index={childIndex}
								item={childItem}
								isOpen={isOpen}
								expandedPath={expandedPath}
								levelIndex={levelIndex + 1}
								onExpand={onExpand}
								badge={childItem.badge}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

const SideBarSection = ({
	section,
	isOpen,
	expandedPath,
	onExpand,
	sectionIndex,
}: {
	section: PartnerSideBarSection;
	isOpen: boolean;
	expandedPath?: number[];
	onExpand: (path: number[] | undefined) => void;
	sectionIndex: number;
}) => {
	const expandedItems = useMemo(() => convertToExpandedItems(section.items), [section.items]);

	return (
		<div className={clsx('flex flex-col', isOpen ? 'gap-3' : 'gap-4')}>
			{section.title && isOpen && (
				<div className="text-caption2 font-normal text-gray-300 h-[18px]">{section.title}</div>
			)}
			{expandedItems.map((item, index) => {
				const originalItem = section.items[index] as ISideBarItem & { badge?: string };

				return (
					<MenuItem
						key={`${sectionIndex}-${index}`}
						index={index}
						item={item}
						isOpen={isOpen}
						expandedPath={expandedPath}
						levelIndex={0}
						onExpand={onExpand}
						badge={originalItem.badge}
					/>
				);
			})}
		</div>
	);
};

export const PartnerSideBar = ({ isOpen, onMenuToggle, onLogout }: PartnerSideBarProps) => {
	const { sideBarItems, currentUser } = useWebUIConfigOptions();
	const { items = [], footer: contextFooter } = sideBarItems ?? {};

	const [expandedPath, setExpandedPath] = useState<number[] | undefined>([]);

	const defaultSections: PartnerSideBarSection[] = useMemo(() => {
		return [{ items }];
	}, [items]);

	useMemo(() => {
		const allItems = defaultSections.flatMap((s) => s.items);
		const expandedItems = convertToExpandedItems(allItems);
		const path = getExpandedPath(expandedItems);

		setExpandedPath(path);
	}, [defaultSections]);

	const footerContent = contextFooter ?? (
		<PartnerLogout lastLoggedIn={currentUser?.lastLoggedIn} onLogout={onLogout} isOpen={isOpen} />
	);

	return (
		<div
			className={clsx(
				'nj-partner-menu flex h-full flex-col text-white transition-all duration-300 pt-8 pb-5 px-5 absolute  lg:relative z-50',
				isOpen ? 'justify-between w-[290px] gap-7' : 'justify-normal w-[88px] gap-8'
			)}
		>
			<div className="flex flex-col gap-7">
				<div className={clsx('flex items-center py-2', isOpen ? 'justify-between' : ' flex-col justify-center')}>
					<div className="opacity-100">
						<LogoHeader logoColorMode="white" />
					</div>
					<button
						className={clsx('p-2 text-white hover:text-gray-300 rounded-lg transition-colors')}
						onClick={onMenuToggle}
					>
						<SfSidebarLeftIcon className="h-5 w-5" />
					</button>
				</div>

				<DevkitSimpleBar className="flex-1 overflow-y-auto">
					<div className={clsx('flex flex-col', isOpen ? 'gap-7' : 'gap-6')}>
						{defaultSections.map((section, index) => (
							<SideBarSection
								key={index}
								section={section}
								isOpen={isOpen}
								expandedPath={expandedPath}
								onExpand={setExpandedPath}
								sectionIndex={index}
							/>
						))}
					</div>
				</DevkitSimpleBar>
			</div>

			{footerContent}
		</div>
	);
};

export type { PartnerSideBarProps, PartnerSideBarSection };
