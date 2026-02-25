import { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useMobileUIConfigOptions } from '../../../layouts/ThemeProvider/theme-context';
import styles from '../collapsible.styles';

type CollapsibleChildrenProps = {
	children: JSX.Element;
	open: boolean;
	onToggle?: () => void;
	collapsedOffset?: number;
	closedDuration?: number;
};

export const CollapsibleChildren = ({
	children,
	open,
	onToggle,
	collapsedOffset = 0,
	closedDuration = 300,
}: CollapsibleChildrenProps) => {
	const { tw } = useMobileUIConfigOptions();

	const [contentHeight, setContentHeight] = useState(0);
	const heightShared = useSharedValue(collapsedOffset);
	const [shouldRenderChildren, setShouldRenderChildren] = useState(open || collapsedOffset > 0);

	const unmountChildren = () => setShouldRenderChildren(false);

	useLayoutEffect(() => {
		if (open) {
			setShouldRenderChildren(true);

			if (contentHeight > 0) {
				heightShared.value = withTiming(contentHeight, { duration: 300 });
			}
		} else {
			heightShared.value = withTiming(collapsedOffset, { duration: closedDuration }, (finished) => {
				if (finished && collapsedOffset === 0) {
					runOnJS(unmountChildren)();
				}
			});
		}
		onToggle?.();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open, contentHeight, collapsedOffset, closedDuration, onToggle]);

	const animatedStyle = useAnimatedStyle(() => ({
		height: heightShared.value,
		overflow: 'hidden' as const,
	}));

	return (
		<Animated.View style={[tw`${styles.childrenAnimatedContainer}`, animatedStyle]}>
			<View
				onLayout={(event) => {
					const measuredHeight = event.nativeEvent.layout.height;

					setContentHeight(measuredHeight);
				}}
				style={tw`${styles.childrenWrapper(shouldRenderChildren)}`}
			>
				{shouldRenderChildren && children}
			</View>
		</Animated.View>
	);
};
