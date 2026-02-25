'use client';

import { Context, ReactElement, ReactNode, createContext, useCallback, useContext } from 'react';
import { ITFunction, ITFunctionOption, SystemLocale } from '@devkit/utilities';
import { AppRouterTranslationUtils } from './AppRouterTranslationUtility';

export type NestedDictionary = {
	[key: string]: string | NestedDictionary;
};

export type TranslationDictionary<M extends string = string> = {
	[module in M]: NestedDictionary;
};

interface TranslationContextProps {
	dictionary: TranslationDictionary;
	locale: SystemLocale;
}

interface TranslationProviderProps {
	locale: SystemLocale;
	dictionaries: TranslationDictionary;
	children: ReactNode;
}

interface TransProps {
	children?: ReactNode;
	i18nKey?: string;
	tOptions?: ITFunctionOption;
	defaults?: string;
	components?: ReactElement[];
	t: ITFunction;
}

export type Args = {
	[key: string]: string | number | undefined;
};

/**
 * Translation Factory class that creates a context and provides hooks and utilities
 * for managing and accessing translations in a type-safe manner.
 */
export class TranslationFactory<M extends string = string> extends AppRouterTranslationUtils<M> {
	private context: Context<TranslationContextProps>;

	constructor() {
		super();
		// Initialize the context with a default value
		this.context = createContext<TranslationContextProps>({
			dictionary: {} as TranslationDictionary,
			locale: 'en', // Default to 'en' as a fallback
		});
		this.context.displayName = 'TranslationContext';
	}

	/**
	 * Provider component to set up the context with dynamically fetched dictionary.
	 */
	Provider = ({ locale, dictionaries, children }: TranslationProviderProps) => {
		return <this.context.Provider value={{ dictionary: dictionaries, locale }}>{children}</this.context.Provider>;
	};

	/**
	 * Custom `useTranslation` hook to provide type suggestions based on the dictionary.
	 */
	useTranslation = (namespaces?: M | Array<M>) => {
		const { dictionary, locale } = useContext(this.context);
		const modules = Object.keys(dictionary) as Array<M>;

		const t: ITFunction = useCallback(
			(key: string, { ...args }: Args = {}) => {
				const [moduleKey, subModuleKey] = key.includes(':')
					? key.split(':')
					: ([undefined, key] as [M | undefined, string]);

				const availableNamespaces = this.getAvailableNamespaces(modules, namespaces);
				const translationKey = this.getTranslationKey(subModuleKey, args, locale);

				if (moduleKey && modules.includes(moduleKey as M)) {
					const moduleTranslation = this.findTranslation(moduleKey as M, translationKey, dictionary, args);

					if (moduleTranslation) return moduleTranslation;
				}

				for (const namespace of availableNamespaces) {
					const translation = this.findTranslation(namespace, translationKey, dictionary, args);

					if (translation) return translation;
				}

				if (!key.includes('_other') && typeof args.count === 'number') {
					const fallbackKey = `${key}_other`;

					for (const namespace of availableNamespaces) {
						const fallbackTranslation = this.findTranslation(namespace, fallbackKey, dictionary, args);

						if (fallbackTranslation) return fallbackTranslation;
					}
				}

				return key;
			},
			[dictionary, namespaces, modules]
		);

		return { t };
	};

	/**
	 * `Trans` component to render translations with nested components.
	 */
	Trans = ({ children, i18nKey, tOptions = {}, defaults, components, t }: TransProps) => {
		const key = i18nKey || super.nodesToString(children) || defaults || '';
		const translation = t(key, { ...tOptions }) ?? defaults ?? '';

		const content = super.renderNodes(children, translation, components);

		return <span>{content}</span>;
	};

	/**
	 * Hook to access the translation context directly.
	 */
	useTranslationContext = () => {
		return useContext(this.context);
	};
}
