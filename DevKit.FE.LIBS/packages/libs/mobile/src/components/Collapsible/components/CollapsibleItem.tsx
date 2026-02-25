import { isNil } from 'lodash';
import { PropsWithChildren, useState } from 'react';
import { Pressable, StyleProp, Text, TextStyle, View } from 'react-native';
import { ArrowDownIcon, ArrowUpIcon, MinusIcon, PlusIcon } from '@devkit/icons/native';
import { useMobileUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import styles from '../collapsible.styles';
import { CollapsibleChildren } from './CollapsibleChildren';

type AccordionItemPros = PropsWithChildren<{
	title: string;
	children: JSX.Element;
	open?: boolean;
	onToggle?: () => void;
	headerTextStyle?: StyleProp<TextStyle>;
	overrideStyles?: { [key in OverrideStyles]?: string };
	isTileVersion?: boolean;
}>;

export enum OverrideStyles {
	CollapsiblePressable = 'collapsiblePressable',
	ItemsContainer = 'itemsContainer',
	CollapsibleTitle = 'collapsibleTitle',
	ExpandIcon = 'expandIcon',
	ContentContainer = 'contentContainer',
	ChildrenWrapper = 'childrenWrapper',
	ChildrenAnimatedContainer = 'childrenAnimatedContainer',
}

export const CollapsibleItem = ({
	children,
	title,
	open,
	onToggle,
	headerTextStyle,
	overrideStyles,
	isTileVersion,
}: AccordionItemPros) => {
	const { tw, reverseLayout } = useMobileUIConfigOptions();
	const [expanded, setExpanded] = useState(false);
	const isUnControlled = isNil(open && onToggle);

	const isExpanded = !!(isUnControlled ? expanded : open);
	const setIsExpanded = () => (isUnControlled ? setExpanded(!expanded) : onToggle?.());

	function toggleItem() {
		setIsExpanded();
	}

	const IconComponent = isExpanded
		? isTileVersion
			? MinusIcon
			: ArrowUpIcon
		: isTileVersion
		? PlusIcon
		: ArrowDownIcon;
	const iconStyle = isTileVersion
		? tw`${styles.dropDownIcon}`
		: tw`${styles.expandIcon} ${overrideStyles?.expandIcon ?? ''}`;

	return (
		<View style={tw`${styles.itemsContainer} ${overrideStyles?.itemsContainer ?? ''}`}>
			<Pressable
				style={tw`${styles.collapsiblePressable(reverseLayout)} ${overrideStyles?.collapsiblePressable ?? ''}`}
				onPress={toggleItem}
				hitSlop={6}
			>
				<Text
					style={[
						tw`${styles.collapsibleTitle(reverseLayout)}`,
						headerTextStyle,
						tw`${overrideStyles?.collapsibleTitle ?? ''}`,
					]}
				>
					{title}
				</Text>
				<IconComponent width={14} height={14} style={iconStyle} />
			</Pressable>

			<CollapsibleChildren open={isExpanded} closedDuration={200}>
				<Pressable
					style={tw`${styles.contentContainer} ${overrideStyles?.contentContainer ?? ''}`}
					onPress={toggleItem}
					hitSlop={6}
				>
					{children}
				</Pressable>
			</CollapsibleChildren>
		</View>
	);
};
