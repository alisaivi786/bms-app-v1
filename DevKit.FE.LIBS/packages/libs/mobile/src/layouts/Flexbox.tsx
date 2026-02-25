import React from 'react';
import { FlexAlignType, StyleSheet } from 'react-native';
import { Box, IBoxProps } from './Box';

export interface IFlexboxProps extends IBoxProps {
	f?: number; // flex
	fd?: 'row' | 'column' | 'row-reverse' | 'column-reverse'; // flexDirection
	alignItems?: FlexAlignType;

	justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
	flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | undefined;
}

export const Flexbox = (props: IFlexboxProps) => {
	const { style, children, f, fd, alignItems, alignContent, justifyContent, flexWrap } = props;
	const styles = StyleSheet.create({
		appliedStyle: {
			flex: f,
			flexDirection: fd,
			alignItems,
			justifyContent,
			alignContent,
			flexWrap,
		},
	});

	return (
		<Box {...props} style={[styles.appliedStyle, style]}>
			{children}
		</Box>
	);
};
