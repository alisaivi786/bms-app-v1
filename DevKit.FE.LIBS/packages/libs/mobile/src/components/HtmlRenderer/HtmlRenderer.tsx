import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { useMobileUIConfigOptions } from '../../layouts';
import { HtmlNode, HtmlRendererProps } from './types';
import { defaultTagMap, defaultTagStyles, parseHtml } from './util';

export const HtmlRenderer: React.FC<HtmlRendererProps> = ({ source }) => {
	const parsed = parseHtml(source);
	const { tw } = useMobileUIConfigOptions();

	const renderNode = (node: HtmlNode | string, index: string | number): React.ReactNode => {
		if (typeof node === 'string' || node.tag === 'text') {
			const style = StyleSheet.flatten([
				defaultTagStyles?.text,
				typeof node !== 'string' ? node.styles : undefined,
			]) as TextStyle;

			return (
				<Text key={index} style={style}>
					{typeof node === 'string' ? node : typeof node.children === 'string' ? node.children : null}
				</Text>
			);
		}

		const TagComponent = defaultTagMap[node.tag] || View;

		const tagStyle = defaultTagStyles[node.tag] || {};
		const inlineStyle = node.styles || {};
		const combinedStyle = StyleSheet.flatten([tagStyle, inlineStyle]);

		if (node.tag === 'li') {
			const liStyle = StyleSheet.flatten([defaultTagStyles?.li as ViewStyle, node.styles as ViewStyle]);

			return (
				<View key={index} style={[tw`flex-row items-start gap-2`, liStyle]}>
					<View style={tw`h-2 w-2 rounded-full bg-gray-500 mt-2`} />
					<View style={tw`flex-1`}>
						{(node.children as HtmlNode[]).map((child, idx) => renderNode(child, `${index}-${idx}`))}
					</View>
				</View>
			);
		}

		const children = (node.children as HtmlNode[]).map((child, idx) => renderNode(child, `${index}-${idx}`));

		return (
			<TagComponent key={index} style={combinedStyle}>
				{children}
			</TagComponent>
		);
	};

	return <View>{parsed.map((node, i) => renderNode(node, i))}</View>;
};
