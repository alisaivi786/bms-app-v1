import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type TagStyles = {
	[tag: string]: StyleProp<ViewStyle | TextStyle>;
};

export interface HtmlRendererProps {
	source: string;
	baseStyle?: StyleProp<ViewStyle>;
	tagsStyles?: TagStyles;
}

export interface HtmlNode {
	tag: string;
	children: HtmlNode[] | string;
	styles?: { [key: string]: string };
}
