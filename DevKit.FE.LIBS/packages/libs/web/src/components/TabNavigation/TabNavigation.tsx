import { Fragment } from 'react';
import { Tab, Transition } from '@headlessui/react';
import { DevkitSimpleBar } from '../../common/devkitSimpleBar';
import styles from './TabNavigation.styles';

export interface ITabProps {
	title: string | JSX.Element;
	tabPanel?: () => JSX.Element;
}

export interface ITabNavigation {
	/**	Callback fired when the tab is clicked, which will change the view related to the tab(tabPanel) */
	onSelectedTabIndexChanged: (tabIndex: number) => void;
	/** The tabs components, add tab title and tab view(optional) */
	tabs: ITabProps[];
	selectedTabIndex: number;
	/** The tabs buttons variant, it determines the tabs styles the default is 'filled-dark' */
	variant: 'filled' | 'filled-dark' | 'gradient';
	/**If true, the container border will be removed
	 * It is optional
	 */
	noContainerBorder?: boolean;
	titleContainerWidth?: 'fit-content' | string;
	actionComponent?: React.ReactNode;
	/**If true, the transition effect will be disabled
	 * It is optional, false by default
	 */
	disableTransition?: boolean;
}

const classNames = (...classes: (string | undefined)[]) => {
	return classes.filter(Boolean).join(' ');
};

/** use TabNavigation to explore and switch between different views. The the tabs are Horizontally */
export const TabNavigation = ({
	selectedTabIndex,
	onSelectedTabIndexChanged,
	tabs,
	variant = 'filled-dark',
	noContainerBorder = false,
	titleContainerWidth = '100%',
	actionComponent,
	disableTransition = false,
}: ITabNavigation) => {
	const hasTabsPanel = tabs.some((tab) => !!tab.tabPanel);

	const listStyle = styles.stylesByVariant[variant].listStyle;
	const tabStyle = styles.stylesByVariant[variant].tabStyle;
	const selectedStyle = styles.stylesByVariant[variant].selected;
	const notSelectedStyle = styles.stylesByVariant[variant].notSelected;

	return (
		<div className={styles.tabContainer(noContainerBorder)}>
			<Tab.Group selectedIndex={selectedTabIndex} onChange={onSelectedTabIndexChanged} as={Fragment}>
				<div className="flex flex-col-reverse justify-between gap-6 md:flex-row">
					<DevkitSimpleBar className="flex-1">
						<Tab.List className={listStyle} style={{ width: titleContainerWidth }}>
							{' '}
							{tabs.map((tab, idx) => (
								<Tab
									key={`tab-${idx}`}
									className={({ selected }) =>
										classNames(
											tabStyle,
											selected ? selectedStyle : notSelectedStyle,
											titleContainerWidth === 'fit-content' ? '' : 'w-full'
										)
									}
								>
									{!disableTransition ? (
										<Transition
											appear
											show={true}
											enter="transition-opacity duration-500"
											enterFrom="opacity-0"
											enterTo="opacity-100"
											leave="transition-opacity duration-500"
											leaveFrom="opacity-100"
											leaveTo="opacity-0"
										>
											<div>{tab.title}</div>
										</Transition>
									) : (
										<div>{tab.title}</div>
									)}
								</Tab>
							))}
						</Tab.List>
					</DevkitSimpleBar>
					{actionComponent}
				</div>
				{hasTabsPanel && (
					<Tab.Panels className={styles.tabPanels(noContainerBorder)}>
						{tabs.map((tab, idx) => (
							<Tab.Panel key={idx} as={Fragment}>
								{!disableTransition ? (
									<Transition
										appear
										show={selectedTabIndex == idx}
										enter="transition-opacity duration-500"
										enterFrom="opacity-0"
										enterTo="opacity-100"
										leave="transition-opacity duration-500"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<div>{tab.tabPanel?.()}</div>
									</Transition>
								) : (
									<div>{tab.tabPanel?.()}</div>
								)}
							</Tab.Panel>
						))}
					</Tab.Panels>
				)}
			</Tab.Group>
		</div>
	);
};
