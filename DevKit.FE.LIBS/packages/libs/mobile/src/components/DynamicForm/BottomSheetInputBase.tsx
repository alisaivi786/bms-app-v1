import { ReactElement, forwardRef, memo, useCallback, useImperativeHandle, useRef } from 'react';
import {
	Dimensions,
	NativeSyntheticEvent,
	TextInput,
	TextInputFocusEventData,
	View,
	findNodeHandle,
} from 'react-native';
import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { useScroll } from '../../hooks/useScroll';

interface BottomSheetInputBaseProps {
	onFocus?: (args?: NativeSyntheticEvent<TextInputFocusEventData>) => void;
	onBlur?: (args?: NativeSyntheticEvent<TextInputFocusEventData>) => void;
	children: (
		onFocus: (args?: NativeSyntheticEvent<TextInputFocusEventData>) => void,
		onBlur: (args?: NativeSyntheticEvent<TextInputFocusEventData>) => void
	) => ReactElement;
}

const BottomSheetInputBaseComponent = forwardRef<View, BottomSheetInputBaseProps>(
	({ onFocus, onBlur, children }, providedRef) => {
		const bottomSheetInternalProps = useBottomSheetInternal(true);
		const ref = useRef<View>(null);
		const { scrollToElement } = useScroll();

		// we don't apply the logic if the component is not rendered inside the BottomSheet
		if (!bottomSheetInternalProps) {
			return children(onFocus as never, onBlur as never);
		}

		const { animatedKeyboardState, textInputNodesRef } = bottomSheetInternalProps;

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const handleOnFocus = useCallback(
			(args?: NativeSyntheticEvent<TextInputFocusEventData>) => {
				if (!args) return;

				animatedKeyboardState.set((state) => ({
					...state,
					target: args.nativeEvent.target,
				}));

				if (onFocus) {
					onFocus(args);
				}

				// scroll to the element, but with some offset to
				// avoid scrolling to the elements in top half of the screen
				if (scrollToElement) {
					setTimeout(() => scrollToElement(ref, -(height / 2)), 200);
				}
			},
			[onFocus, animatedKeyboardState, scrollToElement]
		);

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const handleOnBlur = useCallback(
			(args?: NativeSyntheticEvent<TextInputFocusEventData>) => {
				if (!args) return;

				const keyboardState = animatedKeyboardState.get();
				const currentFocusedInput = findNodeHandle(TextInput.State.currentlyFocusedInput() as never);

				/**
				 * we need to make sure that we only remove the target
				 * if the target belong to the current component and
				 * if the currently focused input is not in the targets set.
				 */
				const shouldRemoveCurrentTarget = keyboardState.target === args.nativeEvent.target;
				const shouldIgnoreBlurEvent = currentFocusedInput && textInputNodesRef.current.has(currentFocusedInput);

				if (shouldRemoveCurrentTarget && !shouldIgnoreBlurEvent) {
					animatedKeyboardState.set((state) => ({
						...state,
						target: undefined,
					}));
				}

				if (onBlur) {
					onBlur(args);
				}
			},
			[onBlur, animatedKeyboardState, textInputNodesRef]
		);

		// eslint-disable-next-line react-hooks/rules-of-hooks
		useImperativeHandle(providedRef, () => ref.current as never, []);

		return <View ref={ref}>{children(handleOnFocus, handleOnBlur)}</View>;
	}
);

const { height } = Dimensions.get('window');

export const BottomSheetInputBase = memo(BottomSheetInputBaseComponent);

BottomSheetInputBaseComponent.displayName = 'BottomSheetInputBase';
