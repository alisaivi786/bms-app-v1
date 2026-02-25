import { renderHook } from '@testing-library/react';
import { useLocale } from './useLocale';

const replace = jest.fn();

jest.mock('../useRouter', () => {
	const originalModule = jest.requireActual('next/router');
	const useRouter = () => {
		const locale = 'en';
		const pathname = '/';
		const query = '';
		const asPath = '';

		return {
			locale,
			pathname,
			query,
			asPath,
			replace,
		};
	};

	return {
		__esModule: true,
		...originalModule,
		useRouter,
	};
});

describe('useLocale', () => {
	it('should return values', () => {
		const { result } = renderHook(() => useLocale());
		const { locale, isRtlLocale, toggleLanguage, setLocaleLang } = result.current;

		expect(locale).toBe('en');
		expect(isRtlLocale).toBe(false);
		toggleLanguage();
		setLocaleLang('en');
		expect(replace).toHaveBeenCalledTimes(2);
	});
});
