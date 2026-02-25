import { Menu } from '@headlessui/react';
import { ArrowDownIcon, ArrowUpIcon, CheckIcon, CloseIcon } from '@devkit/icons/web';
import { StringAndNumberKeys } from '@devkit/utilities';

export interface IGroupsMenuProps<TValue, TKey extends keyof TValue> {
	/** The selected menu option */
	selectedOption?: TValue[TKey];
	/** If true, the component is disabled */
	disabled?: boolean;
	/** GroupsMenu contents, a list of objects containing the `title` of the nested list,
	 *  and `items` which is the nested list items */
	groups: { title: string; items: TValue[] }[];
	/** The selected option value key(the provided key for the options item) */
	valueKey: keyof Pick<TValue, TKey>;
	/** A `Callback` function used to handle menu item selection */
	onChange?: (data?: TValue) => void;
	/** A `Callback` function used to render a custom-selected item component */
	renderSelectedItem: (selectedItem?: TValue[TKey]) => React.ReactNode;
	/** A `Callback` function used to pass a reactNode to render a custom list item  */
	renderItem: (items: TValue) => React.ReactNode;
	/** A `Callback` function used to clear the selected option  */
	onClear?: () => void;
}

export const GroupsMenu = <TValue extends object, TKey extends StringAndNumberKeys<TValue>>({
	valueKey,
	groups,
	selectedOption,
	disabled = false,
	onChange = () => {
		return;
	},
	renderSelectedItem,
	renderItem,
	onClear,
}: IGroupsMenuProps<TValue, TKey>) => {
	return (
		<Menu>
			{({ open }) => (
				<div className={`white-scrollbar relative w-full  ${disabled ? 'opacity-30' : ''}`}>
					<Menu.Button
						disabled={disabled}
						className={`relative flex  h-16 w-full items-center justify-between gap-6 rounded-md border px-4 ${
							open ? 'nj-border-brand nj-text-brand  !outline !outline-3 !outline-brand-400' : 'border-gray-200  '
						} `}
					>
						{renderSelectedItem && renderSelectedItem(selectedOption)}

						<div className={` text-caption1 ${open ? 'nj-border-brand' : 'text-black'} `}>
							{open ? <ArrowUpIcon /> : <ArrowDownIcon />}
						</div>
					</Menu.Button>
					<Menu.Items>
						<div className="absolute z-10 flex max-h-108  w-full min-w-fit flex-col gap-7 overflow-y-scroll  rounded-md bg-white py-4 drop-shadow-groupMenu ">
							{groups.map((group, i) => (
								<div key={i} className="flex flex-col gap-2 text-paragraph font-medium ">
									<p className="mx-5 capitalize text-gray-600">{group.title}</p>
									<ul className="flex flex-col">
										{group.items.map((plan, i) => (
											<Menu.Item key={i}>
												<li
													onClick={() => {
														onChange(plan);
													}}
													className="group flex cursor-pointer items-center gap-3 pl-5  text-paragraph font-medium capitalize hover:nj-bg-brand hover:text-white"
												>
													<div className="h-4 w-4 nj-text-brand ">
														{plan[valueKey] === selectedOption && (
															<CheckIcon className="text-caption1 group-hover:text-white" />
														)}
													</div>
													<div className="flex-1 border-b border-gray-200 hover:nj-border-brand">
														{renderItem && renderItem(plan)}
													</div>
												</li>
											</Menu.Item>
										))}
									</ul>
								</div>
							))}
						</div>
					</Menu.Items>
					{selectedOption && !disabled && !open && (
						<button
							onClick={onClear}
							className="absolute -top-3.5 -right-3.5 flex h-7 w-7 items-center justify-around rounded-full bg-gray-600 text-white hover:text-gray-500 "
						>
							<CloseIcon className="text-caption1" />
						</button>
					)}
				</div>
			)}
		</Menu>
	);
};
