import React, { Fragment, useEffect, useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@devkit/icons/web';
import { Collapsible, CollapsibleButton, CollapsiblePanel } from '../Collapsible';
import { Tooltip } from '../Tooltip';
import classNames from './Disclosure.styles';
import { IDisclosureProps } from './types';

export const Disclosures = ({ items, className, variant = 'primary', openItems, onToggle }: IDisclosureProps) => {
	const [openIndex, setOpenIndex] = useState<React.Key[] | undefined>([]);

	useEffect(() => {
		setOpenIndex(openItems);
	}, [openItems]);

	const toggleDisclosure = (itemKey: React.Key) => {
		let newOpenItems;

		if (openIndex?.includes(itemKey)) {
			newOpenItems = openIndex?.filter((o) => o !== itemKey) ?? [];
		} else {
			newOpenItems = openIndex?.concat([itemKey]) ?? [itemKey];
		}

		setOpenIndex(newOpenItems);
		onToggle?.(newOpenItems, itemKey);
	};

	const isOpen = (index: React.Key) => (openItems ?? openIndex)?.includes(index);

	return (
		<div className={classNames[variant].container(className)}>
			{items.map((item, i) => {
				const itemKey = item.key ?? i;

				return (
					<Fragment key={itemKey}>
						<Collapsible open={isOpen(itemKey)} onToggle={() => toggleDisclosure(itemKey)}>
							<div className={`${classNames[variant].buttonContainer} `}>
								<CollapsibleButton>
									<div className={classNames[variant].button}>
										<div className="flex items-center gap-2">
											{item.header}
											{item?.tooltipMessage ? (
												<div className="flex">
													<Tooltip childElement={item.tooltipMessage} direction="right" />
												</div>
											) : null}
										</div>

										<div className={classNames[variant].arrow}>
											{isOpen(itemKey) ? <ArrowUpIcon /> : <ArrowDownIcon />}
										</div>
									</div>
								</CollapsibleButton>
								<CollapsiblePanel>
									<div className={classNames[variant].body}>{item.body}</div>
								</CollapsiblePanel>
							</div>
						</Collapsible>

						<div className={classNames[variant].separator} />
					</Fragment>
				);
			})}
		</div>
	);
};
