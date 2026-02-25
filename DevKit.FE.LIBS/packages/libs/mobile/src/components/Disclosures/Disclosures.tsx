import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useMobileUIConfigOptions } from '../../layouts';
import { CollapsibleItem, OverrideStyles } from '../Collapsible/components/CollapsibleItem';
import styles from './Disclosures.styles';
import { IDisclosureProps } from './types';

export const Disclosures = ({
	items,
	openItems,
	onToggle,
	displaySeparator = true,
	variant = 'primary',
	disableBorder,
}: IDisclosureProps) => {
	const { tw, reverseLayout } = useMobileUIConfigOptions();
	const [openIndex, setOpenIndex] = useState<React.Key[] | undefined>([]);
	const isTileVersion = variant === 'tile';

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

	const isOpen = (index: React.Key) => (openIndex ?? openItems)?.includes(index);

	const overrideStyles = {
		...styles,
		contentContainer: isTileVersion ? '' : styles.contentContainer,
		collapsiblePressable: styles.collapsiblePressable(reverseLayout),
		collapsibleTitle: styles.collapsibleTitle(isTileVersion),
	};

	const displayItems = items?.map((item, i) => {
		const itemKey = item.key ?? i;

		return {
			title: item.header,
			content: <>{item.body}</>,
			open: isOpen(itemKey),
			onToggle: () => toggleDisclosure(itemKey),
			key: itemKey,
		};
	});

	return (
		<ScrollView>
			<View style={!isTileVersion && !disableBorder && tw`${styles.container}`}>
				{!!displayItems?.length &&
					displayItems.map((item, i, arr) => {
						const isLast = i === arr.length - 1;
						const itemKey = item.key ?? i;

						return (
							<View style={isTileVersion && tw`${styles.tile}`} key={item.key}>
								<CollapsibleItem
									title={item.title}
									headerTextStyle={tw`${overrideStyles[OverrideStyles.CollapsibleTitle] ?? ''}`}
									open={isOpen(itemKey)}
									overrideStyles={overrideStyles}
									isTileVersion={isTileVersion}
									onToggle={() => toggleDisclosure(itemKey)}
								>
									<>
										{isTileVersion && <View style={tw`${styles.separator}`} />}
										{item.content}
									</>
								</CollapsibleItem>

								{!isTileVersion && displaySeparator && !isLast && <View style={tw`${styles.separator}`} />}
							</View>
						);
					})}
			</View>
		</ScrollView>
	);
};
