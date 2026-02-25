import React, { ReactElement, ReactNode, cloneElement, isValidElement } from 'react';
import { SystemLocale } from '@devkit/utilities';
import { Args, TranslationDictionary } from './AppRouterTranslationFactory';

export class AppRouterTranslationUtils<K extends string> {
	/**
	 * Retrieves available namespaces for translation based on module keys and namespaces provided.
	 */
	protected getAvailableNamespaces = (moduleKeys: Array<K>, namespaces?: K | Array<K>): Array<K> => {
		return namespaces ? (Array.isArray(namespaces) ? namespaces : [namespaces]) : moduleKeys;
	};

	/**
	 * Find and return the appropriate translation string from the dictionary.
	 */
	protected findTranslation = (
		moduleKey: K,
		translationKey: string,
		dictionary: TranslationDictionary,
		args: Args
	): string | undefined => {
		const moduleTranslation = dictionary[moduleKey] as unknown as TranslationDictionary;

		if (moduleTranslation) {
			const translation = this.getTranslationStringByKey({
				dictionary: moduleTranslation,
				key: translationKey,
			});

			if (translation) {
				return this.replaceTranslationArgs(translation, args);
			}
		}

		return undefined;
	};

	/**
	 * Retrieve translation string based on a key path.
	 */
	protected getTranslationStringByKey({
		dictionary,
		key,
	}: {
		dictionary: TranslationDictionary;
		key: string;
	}): string | undefined {
		const keys = key.split('.');
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let translation: any = dictionary;

		for (const k of keys) {
			if (typeof translation === 'object' && translation !== null) {
				translation = translation[k];
			} else {
				translation = undefined;
				break;
			}
		}

		return translation;
	}

	/**
	 * Replace placeholders in translation strings with actual arguments.
	 */
	protected replaceTranslationArgs(translation: string, args: Args) {
		Object.keys(args).forEach((argKey) => {
			translation = translation.replace(`{{${argKey}}}`, String(args[argKey]));
		});

		return translation;
	}

	/**
	 * Transform translation keys based on locale and pluralization rules.
	 */
	protected getTranslationKey = (translationKey: string, args: Args, locale: SystemLocale = 'en'): string => {
		if (typeof args.count === 'number') {
			return `${translationKey}${this.getTranslationSuffix(args.count, locale)}`;
		}

		return translationKey;
	};

	/**
	 * Get appropriate translation suffix for a given count and locale.
	 */
	protected getTranslationSuffix = (count: number, locale: SystemLocale): string => {
		const isArabic = locale === 'ar';

		return isArabic ? this.getArabicTranslationSuffixByCount(count) : this.getEnglishTranslationSuffixByCount(count);
	};

	protected getEnglishTranslationSuffixByCount(count: number) {
		if (count === 0) return '_zero';

		if (count === 1) return '_one';

		if (count === 2) return '_two';

		if (count <= 4) return '_few';

		if (count >= 5) return '_many';

		return '_other';
	}

	protected getArabicTranslationSuffixByCount(count: number) {
		if (count === 0) return '_zero';

		if (count === 1) return '_one';

		if (count === 2) return '_two';

		if (count % 100 >= 3 && count % 100 <= 10) return '_few';

		if (count % 100 >= 11) return '_many';

		return '_other';
	}

	/**
	 * Convert React node elements to a string for translation key extraction.
	 */
	protected nodesToString(children: ReactNode): string {
		if (!children) return '';
		let stringNode = '';

		React.Children.forEach(children, (child) => {
			if (typeof child === 'string') {
				stringNode += child;
			} else if (isValidElement(child)) {
				const element = child as React.ReactElement;

				stringNode += `<${element.type}>${this.nodesToString(element.props.children)}</${element.type}>`;
			}
		});

		return stringNode;
	}

	/**
	 * Render translation nodes with provided components.
	 */
	protected renderNodes(children: ReactNode, translation: string, components?: ReactElement[]): ReactNode {
		if (!translation) return children;

		if (!components) return translation;

		const elements: ReactNode[] = [];
		const parsedTranslation = translation.split(/(<\d+>.*?<\/\d+>)/).filter(Boolean);

		parsedTranslation.forEach((part, index) => {
			const match = part.match(/<(\d+)>(.*?)<\/\1>/);

			if (match) {
				const [, componentIndex, content] = match;
				const Component = components[parseInt(componentIndex, 10)];

				elements.push(
					<span key={index} style={{ display: 'inline' }}>
						{cloneElement(Component, { key: index }, content)}
					</span>
				);
			} else {
				elements.push(part);
			}
		});

		return <>{elements}</>;
	}
}
