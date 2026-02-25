import { ReactNode, RefObject, createContext, useContext, useRef } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const defaultScrollToElement = () => {
	// No-op function when ScrollProvider is not available
};

const ScrollContext = createContext<{
	scrollViewRef: RefObject<KeyboardAwareScrollView> | null;
	childrenRef: RefObject<View> | null;
	scrollToElement: (elementRef: RefObject<View>, offset?: number) => void;
}>({
	scrollViewRef: null,
	childrenRef: null,
	scrollToElement: defaultScrollToElement,
});

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
	const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
	const childrenRef = useRef<View>(null);

	const scrollToElement = (elementRef: RefObject<View>, offset = 0) => {
		if (childrenRef.current && elementRef?.current) {
			elementRef.current.measureLayout(
				childrenRef.current,
				(x, y) => {
					const yOffset = y + offset > 0 ? y + offset : 0;

					if (scrollViewRef?.current) {
						scrollViewRef.current.scrollToPosition(x, yOffset, true);
					}
				},
				() => {
					// Ignore measureLayout errors
				}
			);
		}
	};

	return (
		<ScrollContext.Provider value={{ scrollViewRef, scrollToElement, childrenRef }}>{children}</ScrollContext.Provider>
	);
};

export const useScroll = () => useContext(ScrollContext);
