import React, { ReactNode } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Box } from './Box';
import { Flexbox, IFlexboxProps } from './Flexbox';

export interface IMultiColumnLayoutProps extends IFlexboxProps {
	style?: ViewStyle;
	ignorePadding?: boolean;
	children: ReactNode[];
}

export const MultiColumnLayout = (props: IMultiColumnLayoutProps) => {
	const { style, ignorePadding, children } = props;

	const styles = StyleSheet.create({
		container: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-evenly',
		},
		columnContainer: {
			flex: 1,
			paddingHorizontal: ignorePadding ? 0 : 8,
			alignItems: 'center',
		},
	});

	return (
		<Flexbox {...props} style={[styles.container, style]}>
			{children.map((child, index) => {
				return (
					<Box key={index} style={styles.columnContainer}>
						{child}
					</Box>
				);
			})}
		</Flexbox>
	);
};
