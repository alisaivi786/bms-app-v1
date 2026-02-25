import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useMobileUIConfigOptions } from '../../layouts';
import styles from './ActionMenu.styles';

export interface IGroupActionMenuItem {
	renderItem: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
}

export const MenuItems = ({
	groups,
	onClick,
}: {
	groups: IGroupActionMenuItem[][];
	onClick?: () => void;
}): React.ReactNode => {
	const { tw } = useMobileUIConfigOptions();

	return (
		<>
			{groups.map((items, i, { length }) => (
				<View key={i} style={tw`${styles.itemContainer(length - 1 === i)}`}>
					{items.map((item, index) => (
						<View style={tw`${styles.itemButton(item.disabled)}`} key={index}>
							<Pressable
								onPress={() => {
									if (item.disabled) return;

									item.onClick?.();
									onClick?.();
								}}
							>
								{typeof item.renderItem === 'string' ? <Text>{item.renderItem}</Text> : item.renderItem}
							</Pressable>
						</View>
					))}
				</View>
			))}
		</>
	);
};
