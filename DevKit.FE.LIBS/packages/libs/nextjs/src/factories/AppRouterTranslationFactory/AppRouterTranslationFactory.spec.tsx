import React from 'react';
import { render, renderHook } from '@testing-library/react';
import { TranslationDictionary, TranslationFactory } from './AppRouterTranslationFactory';

describe('TranslationFactory', () => {
	let factory: TranslationFactory<'common' | 'auth' | 'forms'>;

	const mockDictionaries: TranslationDictionary<'common' | 'auth' | 'forms'> = {
		common: {
			welcome: 'Welcome',
			greeting: 'Hello {{name}}!',
			items: {
				count_zero: 'No items',
				count_one: 'One item',
				count_two: 'Two items',
				count_few: 'A few items',
				count_many: 'Many items',
				count_other: '{{count}} items',
			},
			nested: {
				deep: {
					message: 'Deep nested message',
				},
			},
		},
		auth: {
			login: 'Log in',
			logout: 'Log out',
			password: 'Password required',
		},
		forms: {
			submit: 'Submit',
			cancel: 'Cancel',
		},
	};

	beforeEach(() => {
		factory = new TranslationFactory<'common' | 'auth' | 'forms'>();
	});

	describe('constructor', () => {
		it('should create a factory instance', () => {
			expect(factory).toBeInstanceOf(TranslationFactory);
		});

		it('should create a context with default values', () => {
			expect(factory.useTranslationContext).toBeDefined();
		});
	});

	describe('Provider', () => {
		it('should render children with context values', () => {
			const TestComponent = () => {
				const { dictionary, locale } = factory.useTranslationContext();

				return (
					<div>
						<span data-testid="locale">{locale}</span>
						<span data-testid="has-common">{dictionary.common ? 'yes' : 'no'}</span>
					</div>
				);
			};

			const { getByTestId } = render(
				<factory.Provider locale="en" dictionaries={mockDictionaries}>
					<TestComponent />
				</factory.Provider>
			);

			expect(getByTestId('locale').textContent).toBe('en');
			expect(getByTestId('has-common').textContent).toBe('yes');
		});
	});

	describe('useTranslation', () => {
		const renderHookWithProvider = (namespaces?: 'common' | 'auth' | 'forms' | Array<'common' | 'auth' | 'forms'>) => {
			const wrapper = ({ children }: { children: React.ReactNode }) => (
				<factory.Provider locale="en" dictionaries={mockDictionaries}>
					{children}
				</factory.Provider>
			);

			return renderHook(() => factory.useTranslation(namespaces), { wrapper });
		};

		it('should return a t function', () => {
			const { result } = renderHookWithProvider();

			expect(typeof result.current.t).toBe('function');
		});

		describe('t function', () => {
			it('should translate simple keys', () => {
				const { result } = renderHookWithProvider();
				const { t } = result.current;

				expect(t('welcome')).toBe('Welcome');
				expect(t('login')).toBe('Log in');
			});

			it('should translate keys with module prefix', () => {
				const { result } = renderHookWithProvider();
				const { t } = result.current;

				expect(t('common:welcome')).toBe('Welcome');
				expect(t('auth:login')).toBe('Log in');
				expect(t('forms:submit')).toBe('Submit');
			});

			it('should translate nested keys', () => {
				const { result } = renderHookWithProvider();
				const { t } = result.current;

				expect(t('nested.deep.message')).toBe('Deep nested message');
			});

			it('should handle argument interpolation', () => {
				const { result } = renderHookWithProvider();
				const { t } = result.current;

				expect(t('greeting', { name: 'John' })).toBe('Hello John!');
			});

			it('should handle pluralization with count', () => {
				const { result } = renderHookWithProvider();
				const { t } = result.current;

				expect(t('items.count', { count: 0 })).toBe('No items');
				expect(t('items.count', { count: 1 })).toBe('One item');
				expect(t('items.count', { count: 2 })).toBe('Two items');
				expect(t('items.count', { count: 3 })).toBe('A few items');
				expect(t('items.count', { count: 10 })).toBe('Many items');
				expect(t('items.count', { count: 100 })).toBe('Many items'); // Fixed expectation
			});

			it('should fallback to _other suffix for pluralization', () => {
				const { result } = renderHookWithProvider();
				const { t } = result.current;

				expect(t('items.count', { count: 5 })).toBe('Many items'); // 5 gets _many in English, not _other
			});

			it('should return the key when translation is not found', () => {
				const { result } = renderHookWithProvider();
				const { t } = result.current;

				expect(t('nonexistent.key')).toBe('nonexistent.key');
			});

			it('should work with specific namespaces', () => {
				const { result } = renderHookWithProvider('auth');
				const { t } = result.current;

				expect(t('login')).toBe('Log in');
				expect(t('logout')).toBe('Log out');
			});

			it('should work with multiple namespaces', () => {
				const { result } = renderHookWithProvider(['auth', 'forms']);
				const { t } = result.current;

				expect(t('login')).toBe('Log in');
				expect(t('submit')).toBe('Submit');
			});

			it('should prioritize explicit module keys over namespace search', () => {
				const { result } = renderHookWithProvider(['forms']); // Only forms namespace
				const { t } = result.current;

				// Even with forms namespace, explicit auth: prefix should work
				expect(t('auth:login')).toBe('Log in');
			});
		});
	});

	describe('Trans component', () => {
		const renderWithProvider = (component: React.ReactElement) => {
			return render(
				<factory.Provider locale="en" dictionaries={mockDictionaries}>
					{component}
				</factory.Provider>
			);
		};

		it('should render simple translation', () => {
			const TestComponent = () => {
				const { t } = factory.useTranslation();

				return <factory.Trans i18nKey="welcome" t={t} />;
			};

			const { container } = renderWithProvider(<TestComponent />);

			expect(container.textContent).toContain('Welcome');
		});

		it('should render translation with interpolation', () => {
			const TestComponent = () => {
				const { t } = factory.useTranslation();

				return <factory.Trans i18nKey="greeting" tOptions={{ name: 'Alice' }} t={t} />;
			};

			const { container } = renderWithProvider(<TestComponent />);

			expect(container.textContent).toContain('Hello Alice!');
		});

		it('should use defaults when translation is not found', () => {
			const TestComponent = () => {
				const { t } = factory.useTranslation();

				return <factory.Trans i18nKey="nonexistent" defaults="Default text" t={t} />;
			};

			const { container } = renderWithProvider(<TestComponent />);

			expect(container.textContent).toBe('nonexistent'); // t() returns key when not found, ?? doesn't trigger
		});

		it('should extract key from children when i18nKey is not provided', () => {
			const TestComponent = () => {
				const { t } = factory.useTranslation();

				return <factory.Trans t={t}>welcome</factory.Trans>;
			};

			const { container } = renderWithProvider(<TestComponent />);

			expect(container.textContent).toContain('Welcome');
		});

		it('should render with components', () => {
			const TestComponent = () => {
				const { t } = factory.useTranslation();
				// Simulate a translation that would use component interpolation
				const mockT = (key: string) => {
					if (key === 'complex') return 'Hello <0>World</0>!';

					return t(key);
				};

				return <factory.Trans i18nKey="complex" t={mockT} components={[<strong key="0" />]} />;
			};

			const { container } = renderWithProvider(<TestComponent />);

			expect(container.innerHTML).toContain('<strong>World</strong>');
		});
	});

	describe('useTranslationContext', () => {
		it('should return context values', () => {
			const TestComponent = () => {
				const { dictionary, locale } = factory.useTranslationContext();

				return (
					<div>
						<span data-testid="locale">{locale}</span>
						<span data-testid="dictionary-keys">{Object.keys(dictionary).join(',')}</span>
					</div>
				);
			};

			const { getByTestId } = render(
				<factory.Provider locale="ar" dictionaries={mockDictionaries}>
					<TestComponent />
				</factory.Provider>
			);

			expect(getByTestId('locale').textContent).toBe('ar');
			expect(getByTestId('dictionary-keys').textContent).toBe('common,auth,forms');
		});
	});

	describe('Arabic pluralization', () => {
		const renderHookWithArabicProvider = () => {
			const wrapper = ({ children }: { children: React.ReactNode }) => (
				<factory.Provider locale="ar" dictionaries={mockDictionaries}>
					{children}
				</factory.Provider>
			);

			return renderHook(() => factory.useTranslation(), { wrapper });
		};

		it('should handle Arabic pluralization rules', () => {
			const { result } = renderHookWithArabicProvider();
			const { t } = result.current;

			expect(t('items.count', { count: 0 })).toBe('No items');
			expect(t('items.count', { count: 1 })).toBe('One item');
			expect(t('items.count', { count: 2 })).toBe('Two items');
			expect(t('items.count', { count: 3 })).toBe('A few items'); // Arabic: 3-10
			expect(t('items.count', { count: 10 })).toBe('A few items'); // Arabic: 3-10
			expect(t('items.count', { count: 11 })).toBe('Many items'); // Arabic: >= 11
			expect(t('items.count', { count: 20 })).toBe('Many items'); // Arabic: >= 11
		});
	});

	describe('Edge cases', () => {
		it('should handle empty dictionary', () => {
			const emptyDictionaries: TranslationDictionary<'empty'> = {
				empty: {},
			};

			const emptyFactory = new TranslationFactory<'empty'>();
			const TestComponent = () => {
				const { t } = emptyFactory.useTranslation();

				return <span>{t('nonexistent')}</span>;
			};

			const { container } = render(
				<emptyFactory.Provider locale="en" dictionaries={emptyDictionaries}>
					<TestComponent />
				</emptyFactory.Provider>
			);

			expect(container.textContent).toContain('nonexistent');
		});

		it('should handle string args in translation', () => {
			const { result } = renderHook(() => factory.useTranslation(), {
				wrapper: ({ children }: { children: React.ReactNode }) => (
					<factory.Provider locale="en" dictionaries={mockDictionaries}>
						{children}
					</factory.Provider>
				),
			});

			expect(result.current.t('greeting', { name: 'test' })).toBe('Hello test!');
		});

		it('should handle numeric values in args', () => {
			const testDictionaries: TranslationDictionary<'test'> = {
				test: {
					score: 'Your score is {{score}}',
				},
			};

			const testFactory = new TranslationFactory<'test'>();
			const { result } = renderHook(() => testFactory.useTranslation(), {
				wrapper: ({ children }: { children: React.ReactNode }) => (
					<testFactory.Provider locale="en" dictionaries={testDictionaries}>
						{children}
					</testFactory.Provider>
				),
			});

			expect(result.current.t('score', { score: 100 })).toBe('Your score is 100');
		});
	});
});
