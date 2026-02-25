import { Fragment, ReactNode } from 'react';
import { Tab, Transition } from '@headlessui/react';
import { ArrowRightIcon } from '@devkit/icons/web';

export interface IVerticalTabProps {
	/**The tab title text */
	title: string;
	/**ReactElement which will be rendered as a view page */
	tabPanel?: () => JSX.Element;
	/**The tab icon provided(optional)*/
	icon?: ReactNode | React.FC<React.SVGProps<SVGSVGElement>>;
	/**If true, the tab will be disabled */
	disabled?: boolean;
}

export interface IVerticalTabNavigation {
	/**	Callback fired when the tab is clicked, which will change the view related to the tab(tabPanel) */
	onSelectedTabIndexChanged: (tabIndex: number) => void;
	/** The tabs components, add tab title, tabPanel witch is the view(optional), and icon */
	tabs: IVerticalTabProps[];
	/**The index of the selected tab */
	selectedTabIndex: number;
	/**The tabs footer element(optional) */
	footer?: JSX.Element;
}

const classNames = (...classes: (string | undefined)[]) => {
	return classes.filter(Boolean).join(' ');
};

/** Use the VerticalTabNavigation to explore and switch between different views. */
export const VerticalTabNavigation = ({
	selectedTabIndex,
	onSelectedTabIndexChanged,
	tabs,
	footer,
}: IVerticalTabNavigation) => {
	return (
		<div className="flex h-full max-h-full w-full flex-1 flex-row  gap-8">
			<Tab.Group selectedIndex={selectedTabIndex} onChange={onSelectedTabIndexChanged} as={Fragment}>
				<div className="flex h-full w-72 flex-col  justify-between rounded-md border bg-gray-50">
					<Tab.List className="flex flex-col">
						{tabs.map((tab, index) => (
							<Tab
								key={tab.title}
								disabled={tab.disabled}
								className={({ selected }) =>
									classNames(
										`${'h-11 min-h-0  w-full py-2 text-paragraph '} font-ping`,
										selected ? 'bg-gray-300 ' : '',
										index == 0 ? 'rounded-tl-md rounded-tr-md' : '',
										tab.disabled ? 'text-gray-200' : ''
									)
								}
							>
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
									<div className="flex flex-row items-center justify-between px-5">
										<div className="flex flex-row items-center gap-3">
											<>{tab?.icon}</>
											<>{tab.title}</>
										</div>
										<ArrowRightIcon
											className={`${
												tab.disabled ? 'text-gray-200' : index === selectedTabIndex ? 'text-black' : 'text-gray-600'
											}`}
										/>
									</div>
								</Transition>
							</Tab>
						))}
					</Tab.List>
					{footer}
				</div>
				<Tab.Panels className="flex flex-1 flex-col">
					{tabs.map((tab, idx) => (
						<Tab.Panel key={idx} as={Fragment}>
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
								<div className="-mx-1 flex max-h-full flex-1 flex-col overflow-hidden px-1">{tab.tabPanel?.()}</div>
							</Transition>
						</Tab.Panel>
					))}
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
};
