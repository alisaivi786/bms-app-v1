import React, { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AgCloseCrossLargeIcon } from '@devkit/icons/native';
import { useMobileUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import styles from './BottomSheet.styles';

export type BottomSheetContentProps = {
	title?: string;
	subTitle?: string;
	description?: ReactNode;
	children?: ReactNode;
	hideCloseButton?: boolean;
	onClose?: () => void;
	titlePosition?: 'start' | 'end' | 'center';
};

const BottomSheetContent = ({
	title,
	subTitle,
	description,
	children,
	hideCloseButton = false,
	onClose,
	titlePosition,
}: BottomSheetContentProps) => {
	const { tw } = useMobileUIConfigOptions();
	const modalStyles = styles.modal(titlePosition);

	return (
		<View style={tw`${modalStyles.content}`}>
			{(title || subTitle) && (
				<View style={tw`${modalStyles.headerContent}`}>
					<View style={tw`${modalStyles.titleContainer}`}>
						{title && <Text style={tw`${modalStyles.title}`}>{title}</Text>}
						{subTitle && <Text style={tw`${modalStyles.subTitle}`}>{subTitle}</Text>}
					</View>
					{!hideCloseButton && (
						<TouchableOpacity onPress={onClose}>
							<AgCloseCrossLargeIcon width={24} height={24} color={tw.color('black')} />
						</TouchableOpacity>
					)}
				</View>
			)}
			{description && <View style={tw`${modalStyles.description}`}>{description}</View>}
			{children}
		</View>
	);
};

export default BottomSheetContent;
