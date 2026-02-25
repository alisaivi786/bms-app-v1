import pick from 'lodash/pick';
import { UserConfig } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const sharedConfig = {
	keys: [],
} as { keys: string[]; config?: UserConfig };

export const setServerSideTranslationsConfig = (config: typeof sharedConfig) => {
	sharedConfig.keys = config.keys;
	sharedConfig.config = config.config;
};

export const serverSideTranslationsKeys = async (
	locale: string | undefined,
	resources: {
		ns: string;
		keys?: string[];
	}[]
) => {
	const localeValue = locale || 'en';
	const { _nextI18Next } = await serverSideTranslations(localeValue, undefined, sharedConfig.config);
	const { initialI18nStore, userConfig } = _nextI18Next ?? {};

	const keysToLoad: string[] = [];

	resources.forEach((resource) => {
		if (resource.keys) {
			resource.keys.forEach((key) => {
				keysToLoad.push(`${resource.ns}.${key}`);
			});
		} else {
			keysToLoad.push(`${resource.ns}`);
		}
	});

	const allKeysToLoad = [...sharedConfig.keys, ...keysToLoad];

	const pageInitialI18nStore = pick(initialI18nStore, [
		...allKeysToLoad.map((key) => `en.${key}`),
		...allKeysToLoad.map((key) => `ar.${key}`),
	]);

	return {
		_nextI18Next: {
			initialI18nStore: pageInitialI18nStore,
			userConfig,
		},
	};
};
