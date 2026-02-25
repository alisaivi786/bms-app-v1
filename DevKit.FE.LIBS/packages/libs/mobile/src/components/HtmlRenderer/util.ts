import { Text, View } from 'react-native';
import { HtmlNode, TagStyles } from './types';

export const defaultTagMap: { [key: string]: React.ElementType } = {
	div: View,
	span: Text,
	p: Text,
	strong: Text,
	em: Text,
	b: Text,
	i: Text,
	ul: View,
	li: View,
	text: Text,
};

export const defaultTagStyles: TagStyles = {
	b: { fontWeight: 'bold' },
	strong: { fontWeight: 'bold' },
	i: { fontStyle: 'italic' },
	em: { fontStyle: 'italic' },
};

function parseStyle(styleStr: string): { [key: string]: string } {
	return styleStr.split(';').reduce((acc, decl) => {
		if (!decl.includes(':')) return acc;
		const [prop, value] = decl.split(':');
		const camel = prop.trim().replace(/-([a-z])/g, (_, char) => char.toUpperCase());

		acc[camel] = value.trim();

		return acc;
	}, {} as { [key: string]: string });
}

export function parseHtml(html: string): HtmlNode[] {
	const tagRegex = /<\/?([a-z]+)([^>]*)>/gi;
	const stack: HtmlNode[] = [];
	let current: HtmlNode | null = null;
	let lastIndex = 0;
	const root: HtmlNode[] = [];

	const selfClosingTags = new Set([
		'br',
		'hr',
		'img',
		'input',
		'meta',
		'link',
		'area',
		'base',
		'col',
		'command',
		'embed',
		'keygen',
		'param',
		'source',
		'track',
		'wbr',
	]);

	const addText = (text: string) => {
		if (!text.trim()) return;

		const textNode: HtmlNode = { tag: 'text', children: text };

		if (current) {
			(current.children as HtmlNode[]).push(textNode);
		} else {
			root.push(textNode);
		}
	};

	html.replace(tagRegex, (match, tag, attrStr, index) => {
		const text = html.slice(lastIndex, index);

		addText(text);
		lastIndex = index + match.length;

		const isClosing = match.startsWith('</');
		const isSelfClosing = match.endsWith('/>') || selfClosingTags.has(tag.toLowerCase());

		if (isClosing) {
			if (stack.length > 0) {
				const closed = stack.pop()!;

				current = stack[stack.length - 1] || null;

				if (!current) root.push(closed);
			}
		} else {
			const stylesMatch = attrStr.match(/style=['"](.*?)['"]/i);
			const styles = stylesMatch ? parseStyle(stylesMatch[1]) : {};
			const node: HtmlNode = { tag, styles, children: [] };

			if (isSelfClosing) {
				if (current) {
					(current.children as HtmlNode[]).push(node);
				} else {
					root.push(node);
				}
			} else {
				if (current) {
					(current.children as HtmlNode[]).push(node);
				}
				stack.push(node);
				current = node;
			}
		}

		return '';
	});

	if (lastIndex < html.length) {
		addText(html.slice(lastIndex));
	}

	while (stack.length > 0) {
		const node = stack.pop()!;

		root.push(node);
	}

	return root;
}
