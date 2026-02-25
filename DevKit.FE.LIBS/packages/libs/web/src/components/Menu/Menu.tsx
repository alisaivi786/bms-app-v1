import { Menu } from '@headlessui/react';
import { ArrowDownIcon, CheckIcon } from '@devkit/icons/web';

export interface IMenuType {
	/** The selected menu option */
	selectedOption?: string;
	/** If true, the component is disabled */
	disabled?: boolean;
	/** Menu contents, a list of objects containing `label` and `id` */
	items: { label: string; id: string }[];
	/** A `Callback` function to handle menu item selection */
	onClick?: (data?: { label: string; id: string }) => void;
}

export const MenuComponent = ({
	items,
	selectedOption = '',
	disabled = false,
	onClick = () => {
		return;
	},
}: IMenuType) => {
	return (
		<Menu>
			{({ open }) => (
				<div className={`relative w-full ${disabled ? 'opacity-30' : ''}`}>
					<Menu.Button
						disabled={disabled}
						className={`flex w-full items-center justify-between gap-2 rounded-md border nj-border-brand py-1.5 px-4 text-paragraph nj-text-brand  ${
							open ? '!outline !outline-3 !outline-brand-400' : ''
						}`}
					>
						{items.find((item) => item.id === selectedOption)?.label}
						<ArrowDownIcon className="text-caption1 nj-text-brand" />
					</Menu.Button>
					<Menu.Items>
						<ul className=" absolute z-10 flex flex-col rounded-md bg-white py-2.5 drop-shadow-tooltip">
							{items.map((item) => {
								return (
									<Menu.Item key={item.id}>
										{({ close }) => (
											<li
												onClick={() => {
													onClick(item);
													close();
												}}
												className="group flex cursor-pointer items-center gap-3 px-4 py-2.5 text-paragraph font-normal hover:nj-bg-brand hover:text-white"
											>
												<div className="w-3.5 text-caption1 nj-text-brand">
													{item.id === selectedOption && <CheckIcon className="group-hover:text-white" />}
												</div>
												<p className="whitespace-nowrap">{item.label}</p>
											</li>
										)}
									</Menu.Item>
								);
							})}
						</ul>
					</Menu.Items>
				</div>
			)}
		</Menu>
	);
};
