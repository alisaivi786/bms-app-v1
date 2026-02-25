import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { useMobileUIConfigOptions } from '../../layouts';
import styles from './Card.styles';

export interface ICardProps {
	children: ReactNode;
}
const Card = ({ children }: ICardProps) => {
	const { tw } = useMobileUIConfigOptions();
	const cardStyles = styles.card();

	return <View style={tw`${cardStyles.container}`}>{children}</View>;
};

export default Card;
