import { useEffect, useState } from 'react';
import { useWebUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';

type ScreenStateKeys<T extends Record<string, number>> = Record<keyof T | `max_${keyof T & string}`, boolean>;

export const useResponsiveView = <
	T extends { sm: number; md: number; lg: number; xl: number; '2xl': number; '3xl': number }
>() => {
	const {
		screens = {
			sm: 576,
			md: 768,
			lg: 1024,
			xl: 1200,
			'2xl': 1320,
			'3xl': 1480,
		},
	} = useWebUIConfigOptions();

	const calculateResponsiveMatch = (useMaxWidth: boolean) => {
		const screensValues = Object.entries(screens).sort((sc1, sc2) => (sc1[1] <= sc2[1] ? -1 : 0));

		// get the window object or the max value from screens in case of SSR
		const windowWidth = !useMaxWidth
			? window.innerWidth
			: Math.max(...Object.entries(screens).map((value) => value[1]));

		const currentState: Partial<ScreenStateKeys<T>> = {};

		// calculate levels
		screensValues.forEach(([name, value], index) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const [_, nextValue] =
				index === screensValues.length - 1
					? ['', Math.max(...Object.entries(screens).map((value) => value[1]))]
					: screensValues[index + 1];

			if (
				((index === 0 && windowWidth < value) || windowWidth >= value) &&
				(index === screensValues.length - 1 || windowWidth < nextValue)
			) {
				currentState[name as keyof T] = true;
			} else {
				currentState[name as keyof T] = false;
			}
		});

		screensValues.forEach(([name, value]) => {
			if (windowWidth >= value) {
				currentState[`max_${name as keyof T & string}`] = false;
			} else {
				currentState[`max_${name as keyof T & string}`] = true;
			}
		});

		return currentState as ScreenStateKeys<T>;
	};

	const [screensState, setScreensState] = useState<ScreenStateKeys<T>>(calculateResponsiveMatch(true));

	useEffect(() => {
		const checkDeviceType = () => {
			const getNewScreensState = calculateResponsiveMatch(false);

			setScreensState(getNewScreensState);
		};

		checkDeviceType();

		window.addEventListener('resize', checkDeviceType);

		return () => {
			window.removeEventListener('resize', checkDeviceType);
		};
	}, []);

	return screensState;
};
