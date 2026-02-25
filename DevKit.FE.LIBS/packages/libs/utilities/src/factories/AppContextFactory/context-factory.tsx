'use client';

import { createContext, useContext } from 'react';
import { ITFunction } from '../../types/shared-types';

export type SystemLocale = 'ar' | 'en';

export type AppPlatform = 'ios' | 'android' | 'web';

export type AppType = 'app' | 'web';

export interface IAppPlatformContext {
	/**
	 * @property translate
	 * @description used as dependency injection for i18n translate method.
	 * it can be set differently in native app and website
	 * then it is accessed through the app context
	 */
	translate: ITFunction;
	platform: AppPlatform;
	/**
	 * @property options
	 * @description used for any extra options required for a specific project.
	 * @example options={appID:'Agent'}
	 * options={deviceID:'123123'}
	 */
	locale: SystemLocale;
}

const context = createContext<
	IAppPlatformContext & {
		isRtlLocale: boolean;
		appType: AppType;
	}
>({
	translate: () => '',
	locale: 'ar',
	appType: 'web',
	platform: 'web',
	isRtlLocale: true,
});

context.displayName = 'AppPlatformContext';

/**
 * @class AppContextFactory
 * @description initiate the app context to be used in project specific product logic library.
 * Doing that through the factory class allow a dynamic set of options to be set and consumed everywhere
 * inside the product logic library. The context itself should wrap all the apps for example "ReactNative and Website"
 * to provide the required values for the logic library
 */
export class AppContextFactory<TOptions = object> {
	initializeHook: (props: IAppPlatformContext & TOptions) => void = () => undefined;

	constructor({
		initializeHook,
	}: {
		initializeHook?: (props: IAppPlatformContext & TOptions) => void;
	} = {}) {
		if (initializeHook) {
			this.initializeHook = initializeHook;
		}
	}

	AppPlatformContextProvider = ({
		children,
		...props
	}: IAppPlatformContext &
		TOptions & {
			children: JSX.Element;
		}) => {
		const { locale, platform } = props;

		const isRtlLocale = locale === 'ar';
		const appType = platform !== 'web' ? 'web' : 'app';

		this.initializeHook(props as IAppPlatformContext & TOptions);

		return (
			<context.Provider
				value={{
					...props,
					isRtlLocale,
					appType,
					...props,
				}}
			>
				{children}
			</context.Provider>
		);
	};

	useAppPlatformContextOptions = () => {
		return useContext(context) as unknown as IAppPlatformContext & TOptions;
	};
}

/** useAppPlatformContextOptions to be used internally in the ui utilities only */
export const useAppPlatformContextOptions = () => {
	return useContext(context);
};
