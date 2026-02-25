import React, { PropsWithChildren, RefObject } from 'react';
import { I18nManager, SafeAreaView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SfChevronBackwardIcon } from '@devkit/icons/native';
import { AppHeaderComponent } from '../../components/Header/AppHeader';
import { AppHeaderRightComponent } from '../../components/Header/AppHeader.types';
import { useScroll } from '../../hooks';
import { useMobileUIConfigOptions } from '../ThemeProvider';

export type FullScreenLayoutProps = {
	/** Optional subheader content to display below the header */
	subHeader?: React.ReactNode;
	/** Whether the back button is disabled */
	isBackButtonDisabled?: boolean;
	/** Callback function triggered when the back button is pressed */
	onBackPress?: () => void;
	/** Title to display in the header */
	pageTitle?: string;
	/** Optional right components to display in the header */
	rightComponents?: AppHeaderRightComponent[];
	/** Optional footer content to display at the bottom of the layout */
	footer?: React.ReactNode;
	/** Background color for the footer area ('gray' or 'white') */
	footerBgColor?: 'gray' | 'white';
	/** Determines when the keyboard should stay visible after a tap.
	 *  @default 'handled'
	 */
	keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
	scrollRef?: React.RefObject<KeyboardAwareScrollView> | null;
};

const getFooterBgColor = (footerBgColor?: 'gray' | 'white') => {
	switch (footerBgColor) {
		case 'gray':
			return 'bg-gray-50';
		case 'white':
			return 'bg-white';
		default:
			return 'bg-white';
	}
};

export const FullScreenLayout: React.FC<PropsWithChildren<FullScreenLayoutProps>> = ({
	children,
	subHeader,
	isBackButtonDisabled = false,
	onBackPress,
	pageTitle,
	rightComponents,
	footer,
	footerBgColor,
	keyboardShouldPersistTaps = 'handled',
	scrollRef = null,
}) => {
	const { tw } = useMobileUIConfigOptions();
	const { top: topInset, bottom: bottomInset } = useSafeAreaInsets();
	const { scrollViewRef, childrenRef } = useScroll();

	const isHeaderHidden = !pageTitle && !onBackPress;
	const isFooterHidden = !footer;

	const handleBackPress = () => {
		if (onBackPress && !isBackButtonDisabled) {
			onBackPress();
		}
	};

	const leftIcon = onBackPress ? (
		<View
			style={[
				tw`items-center bg-brand-50 rounded-full h-6 justify-center w-6`,
				{
					transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
				},
			]}
		>
			<SfChevronBackwardIcon
				width={14}
				height={14}
				style={tw`text-brand-900 ${isBackButtonDisabled ? 'opacity-50' : ''}`}
			/>
		</View>
	) : undefined;

	return (
		<View testID="full-screen-layout" style={[tw`flex-1 bg-gray-100`, { marginTop: topInset }]}>
			<SafeAreaView testID="safe-area-view" style={tw`flex-1 bg-gray-100`}>
				<KeyboardAwareScrollView
					ref={scrollRef}
					testID="scroll-view"
					stickyHeaderIndices={isHeaderHidden ? [] : [0]}
					keyboardDismissMode="interactive"
					keyboardShouldPersistTaps={keyboardShouldPersistTaps}
					showsVerticalScrollIndicator={false}
					enableOnAndroid={true}
					scrollEnabled={true}
					nestedScrollEnabled={true}
					enableResetScrollToCoords={false}
					{...(scrollViewRef ? { ref: scrollViewRef as unknown as RefObject<KeyboardAwareScrollView> } : {})}
				>
					{!isHeaderHidden && (
						<View testID="header-container" style={tw`bg-white w-full`}>
							<AppHeaderComponent
								leftIcon={leftIcon}
								onLeftPress={handleBackPress}
								title={pageTitle}
								rightComponents={rightComponents}
							/>
							{subHeader}
						</View>
					)}
					<View testID="content-container" style={tw`p-4`} {...(childrenRef ? { ref: childrenRef } : {})}>
						{children}
					</View>
				</KeyboardAwareScrollView>
			</SafeAreaView>
			{!isFooterHidden && (
				<View
					testID="footer-container"
					style={[
						tw`${getFooterBgColor(footerBgColor)}`,
						{
							paddingBottom: bottomInset,
						},
					]}
				>
					{footer}
				</View>
			)}
		</View>
	);
};
