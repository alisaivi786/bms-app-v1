import React from 'react';
import { I18nManager, Platform, PlatformColor, Pressable, Text, View } from 'react-native';
import { SfChevronForwardIcon } from '@devkit/icons/native';
import { useMobileUIConfigOptions } from '../../layouts';
import styles from './MenuCard.styles';
import { MenuButtonProps, MenuCardProps } from './MenuCard.types';

export const MenuCard = ({ title, items }: MenuCardProps) => {
	const { tw, reverseLayout } = useMobileUIConfigOptions();

	if (!items || items.length === 0) return null;

	const IOS_UNDERLAY = (Platform.OS === 'ios' && PlatformColor?.('systemFill')) || 'rgba(60,60,67,0.12)';

	const hasMultipleItems = items.length > 1;

	const RowContent = ({ item }: { item: MenuButtonProps }) => (
		<View style={tw`${styles.contentRow}`}>
			{item?.startComponents ? (
				<View style={tw`${styles.row}`}>
					{item.startComponents.map((item, index) => (
						<View key={item.key || index}>{item.component}</View>
					))}
				</View>
			) : (
				<View style={tw`${styles.leftSection}`}>
					{item.icon}
					<Text style={tw`${styles.titleText}`}>{item.title}</Text>
				</View>
			)}

			{item?.endComponents ? (
				<View style={tw`${styles.row}`}>
					{item.endComponents.map((item, index) => (
						<View key={item.key || index}>{item.component}</View>
					))}
				</View>
			) : (
				<View
					style={
						I18nManager.isRTL || reverseLayout
							? {
									transform: [
										{
											rotate: '180deg',
										},
									],
							  }
							: undefined
					}
				>
					<SfChevronForwardIcon height={20} width={20} color={tw.color('gray-500')} />
				</View>
			)}
		</View>
	);

	const renderItem = (item: MenuButtonProps, index: number) => (
		<React.Fragment key={index}>
			<Pressable
				onPress={item.onPress}
				disabled={!item.onPress}
				accessibilityRole="button"
				style={({ pressed }) => [
					tw`${styles.itemContainer} overflow-hidden`,
					Platform.OS === 'ios' &&
						pressed && {
							backgroundColor: IOS_UNDERLAY,
						},
				]}
				android_ripple={{
					color: 'rgba(0,0,0,0.08)',
					borderless: false,
				}}
			>
				<RowContent item={item} />
			</Pressable>

			{index < items.length - 1 && <View style={tw`${styles.divider}`} />}
		</React.Fragment>
	);

	return (
		<View style={tw`${styles.container}`}>
			{title && <Text style={tw`${styles.title}`}>{title}</Text>}

			<View style={tw`${styles.card(hasMultipleItems)}`}>{items.map(renderItem)}</View>
		</View>
	);
};
