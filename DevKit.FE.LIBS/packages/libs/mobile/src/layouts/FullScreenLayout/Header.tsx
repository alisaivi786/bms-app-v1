import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@devkit/icons/native';
import { useMobileUIConfigOptions } from '../ThemeProvider';
import { FullScreenLayoutProps } from './FullScreenLayout';

export const Header: React.FC<Pick<FullScreenLayoutProps, 'onBackPress' | 'pageTitle' | 'isBackButtonDisabled'>> = ({
	onBackPress,
	pageTitle,
	isBackButtonDisabled,
}) => {
	const { tw, isRtlLocale } = useMobileUIConfigOptions();

	const handleBackPress = () => {
		if (onBackPress && !isBackButtonDisabled) {
			onBackPress();
		}
	};

	return (
		<View testID="header" style={tw`bg-white border-b border-gray-200 w-full px-4 py-2.5 flex-row items-center`}>
			<Pressable testID="back-button" onPress={handleBackPress} disabled={isBackButtonDisabled}>
				{isRtlLocale ? (
					<ArrowLongRightIcon style={tw`text-brand-600 ${isBackButtonDisabled ? 'opacity-50' : ''}`} />
				) : (
					<ArrowLongLeftIcon style={tw`text-brand-600 ${isBackButtonDisabled ? 'opacity-50' : ''}`} />
				)}
			</Pressable>
			<View testID="title-container" style={tw`flex-1 flex-row items-center justify-center`}>
				<Text testID="header-title" style={tw`text-body font-main-bold text-black`}>
					{pageTitle}
				</Text>
			</View>
			<View testID="spacer" style={tw`w-6`} />
		</View>
	);
};
