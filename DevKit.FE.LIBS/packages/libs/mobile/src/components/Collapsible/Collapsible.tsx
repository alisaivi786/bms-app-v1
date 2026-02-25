import { Platform, StyleProp, TextStyle, UIManager } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from '../Divider';
import { CollapsibleChildren } from './components/CollapsibleChildren';
import { CollapsibleItem, OverrideStyles } from './components/CollapsibleItem';

// To enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

type CollapsibleItemModel = {
	title: string;
	content: JSX.Element;
	open?: boolean;
};

export type CollapsibleProps =
	| {
			items: CollapsibleItemModel[];
			/** Text style for the collapsible header */
			headerTextStyle?: StyleProp<TextStyle>;
			onToggle?: (item: CollapsibleItemModel) => void;
			open?: never;
			children?: never;
			overrideStyles?: { [key in OverrideStyles]?: string };
			hideDivider?: boolean;
			collapsedOffset?: never
	  }
	| {
			open: boolean;
			children: JSX.Element;
			onToggle?: () => void;
			items?: never;
			headerTextStyle?: never;
			overrideStyles?: { [key in OverrideStyles]?: string };
			hideDivider?: boolean;
			collapsedOffset?: number;
	  };

export const Collapsible = ({
	headerTextStyle,
	items,
	open = false,
	onToggle,
	children,
	overrideStyles,
	hideDivider = false,
	collapsedOffset,
}: CollapsibleProps) => {
	return (
		<ScrollView>
			{items &&
				items.map((item, index) => [
					<CollapsibleItem
						title={item.title}
						headerTextStyle={headerTextStyle}
						open={item.open}
						onToggle={() => onToggle?.(item)}
						key={index}
						overrideStyles={overrideStyles}
					>
						{item.content}
					</CollapsibleItem>,
					!hideDivider ? <Divider key={item.title} /> : null,
				])}

			{children && (
				<CollapsibleChildren open={open} collapsedOffset={collapsedOffset}>
					{children}
				</CollapsibleChildren>
			)}
		</ScrollView>
	);
};
