import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, I18nManager, LayoutChangeEvent, PanResponder, View, ViewStyle } from 'react-native';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import styles from './BottomTabBar.styles';
import { TabItem } from './TabItem';

const windowWidth = Dimensions.get('window').width;

export interface BottomTabBarProps {
	tabs: {
		label: string;
		icon: React.ReactElement;
		onPress: () => void;
		isFocused: boolean;
		accessibilityLabel?: string;
		accessible?: boolean;
	}[];
	style?: ViewStyle;
	backgroundColor?: string;
	activePillColor?: string;
	labelColor?: string;
	bounce?: boolean;
	duration?: number;
	damping?: number;
	stiffness?: number;
}

const TAB_BAR_HEIGHT = 52;
const TAB_BAR_RADIUS = 100;
const PILL_RADIUS = 100;
const TAB_BAR_MARGIN = 16;
const DEFAULT_ACTIVE_BG = '#2563FF';
const DEFAULT_BG = '#000000';
const DEFAULT_LABEL = '#FFFFFF';

export default function BottomTabBar({
	tabs,
	style,
	backgroundColor = DEFAULT_BG,
	activePillColor = DEFAULT_ACTIVE_BG,
	labelColor = DEFAULT_LABEL,
	bounce = true,
	duration = 250,
	damping = 15,
	stiffness = 150,
}: BottomTabBarProps) {
	const { tw, reverseLayout } = useMobileUIConfigOptions();

	const isRTL = I18nManager.isRTL || reverseLayout;

	const safeBackgroundColor = backgroundColor || DEFAULT_BG;

	const safeActivePillColor = activePillColor || DEFAULT_ACTIVE_BG;

	const safeLabelColor = labelColor || DEFAULT_LABEL;

	const [tabWidth, setTabWidth] = useState((windowWidth - TAB_BAR_MARGIN * 2) / tabs.length);

	const [containerWidth, setContainerWidth] = useState(windowWidth - TAB_BAR_MARGIN * 2);

	const activeIndex = tabs.findIndex((tab) => tab.isFocused);

	const translateX = useRef(new Animated.Value(tabWidth * activeIndex)).current;
	const startXRef = useRef(0);

	const onContainerLayout = (e: LayoutChangeEvent) => {
		const width = e.nativeEvent.layout.width;

		setContainerWidth(width);

		const newTabWidth = width / tabs.length;

		setTabWidth(newTabWidth);
	};

	useEffect(() => {
		const targetValue = tabWidth * activeIndex;

		if (bounce) {
			Animated.spring(translateX, {
				toValue: targetValue,
				damping,
				stiffness,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.timing(translateX, {
				toValue: targetValue,
				duration,
				useNativeDriver: true,
			}).start();
		}
	}, [activeIndex, tabWidth, tabs.length, bounce, translateX, duration, damping, stiffness]);

	const onEndDrag = useCallback(
		(idx: number) => {
			if (tabs[idx] && !tabs[idx].isFocused) tabs[idx].onPress();
		},
		[tabs]
	);

	const panResponder = useMemo(
		() =>
			PanResponder.create({
				onStartShouldSetPanResponder: () => tabs.length > 1,
				onMoveShouldSetPanResponder: () => tabs.length > 1,
				onPanResponderGrant: () => {
					translateX.stopAnimation((value) => {
						startXRef.current = value;
					});
				},
				onPanResponderMove: (_, gestureState) => {
					const dx = isRTL ? -gestureState.dx : gestureState.dx;
					let nextX = startXRef.current + dx;

					nextX = Math.max(0, Math.min(nextX, containerWidth - tabWidth));
					translateX.setValue(nextX);
				},
				onPanResponderRelease: (_, gestureState) => {
					const dx = isRTL ? -gestureState.dx : gestureState.dx;
					let nextX = startXRef.current + dx;

					nextX = Math.max(0, Math.min(nextX, containerWidth - tabWidth));
					const idx = Math.round(nextX / tabWidth);

					const targetValue = tabWidth * idx;

					if (bounce) {
						Animated.spring(translateX, {
							toValue: targetValue,
							damping,
							stiffness,
							useNativeDriver: true,
						}).start();
					} else {
						Animated.timing(translateX, {
							toValue: targetValue,
							duration,
							useNativeDriver: true,
						}).start();
					}
					onEndDrag(idx);
				},
			}),
		[tabs.length, isRTL, containerWidth, tabWidth, bounce, duration, damping, stiffness, onEndDrag, translateX]
	);

	const animatedStyle = {
		transform: [
			{
				translateX: isRTL
					? translateX.interpolate({
							inputRange: [0, containerWidth || 1],
							outputRange: [0, -(containerWidth || 1)],
					  })
					: translateX,
			},
		],
		width: tabWidth,
	};

	return (
		<View
			style={[tw.style(styles.outer), { backgroundColor: safeBackgroundColor, borderRadius: TAB_BAR_RADIUS }, style]}
		>
			<View style={[tw.style(styles.container), { height: TAB_BAR_HEIGHT }]} onLayout={onContainerLayout}>
				<Animated.View
					style={[
						tw.style(styles.activePill),
						animatedStyle,
						{
							height: TAB_BAR_HEIGHT,
							backgroundColor: safeActivePillColor,
							borderRadius: PILL_RADIUS,
						},
					]}
				/>

				<Animated.View
					{...panResponder.panHandlers}
					style={[
						tw.style(styles.activePill),
						animatedStyle,
						{
							height: TAB_BAR_HEIGHT,
							borderRadius: PILL_RADIUS,
							zIndex: 1000,
						},
					]}
				/>

				{tabs.map((tab, idx) => (
					<TabItem
						key={tab.label}
						isActive={idx === activeIndex}
						tabWidth={tabWidth}
						labelColor={safeLabelColor}
						accessibilityLabel={tab.accessibilityLabel}
						accessible={tab.accessible}
						{...tab}
					/>
				))}
			</View>
		</View>
	);
}
