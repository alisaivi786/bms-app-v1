import { useEffect } from 'react';
import { useRouter } from '../useRouter';

export const useLocale = () => {
	const { locale, pathname, query, asPath, replace } = useRouter();

	const localeValue = locale as 'ar' | 'en';

	useEffect(() => {
		document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`;
	}, [locale]);

	const getUrl = (lng: 'ar' | 'en') => {
		const pathStartsWithLocale = pathname.startsWith(`/${locale}/`);

		const UrlQuery = new URLSearchParams(query as unknown as URLSearchParams);
		const url = `${pathname}?${UrlQuery.toString()}`;

		if (pathStartsWithLocale) {
			return url.replace(`/${locale}/`, `/${lng}/`);
		} else {
			return `/${lng}${url}`;
		}
	};

	return {
		isRtlLocale: locale === 'ar',
		locale: localeValue,
		toggleLanguage: () => {
			replace(getUrl(locale === 'ar' ? 'en' : 'ar'), asPath);
		},
		setLocaleLang: (lang: 'ar' | 'en') => {
			replace(getUrl(lang), asPath, {
				locale: lang,
			});
		},
	};
};
