import React from 'react';
import { FlexAlignType, LayoutChangeEvent, StyleSheet, View, ViewProps } from 'react-native';

export interface IBoxProps extends ViewProps {
	m?: number;
	mt?: number;
	mb?: number;
	mr?: number;
	ml?: number;
	mh?: number;
	mv?: number;
	p?: number;
	pt?: number;
	pb?: number;
	pr?: number;
	pl?: number;
	ph?: number;
	pv?: number;
	w?: number; // width
	h?: number; // height
	flexDirection?: 'row' | 'column';
	flexGrow?: number;
	flexShrink?: number;
	br?: number; // border-radius
	alignSelf?: 'flex-start' | 'flex-end' | 'center';
	alignItems?: FlexAlignType;
	alignContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around';
	justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

	onLayout?: (event: LayoutChangeEvent) => void;
	children?: React.ReactNode | React.ReactNode[];
}

export const Box = ({
	style,
	m,
	mt,
	mb,
	mr,
	ml,
	mh,
	mv,
	p,
	pt,
	pb,
	pr,
	pl,
	ph,
	pv,
	w,
	h,
	flexDirection,
	flexGrow,
	flexShrink,
	alignItems,
	alignContent,
	justifyContent,
	alignSelf,
	br,
	onLayout,
	children,
}: IBoxProps) => {
	const styles = StyleSheet.create({
		appliedStyle: {
			margin: m,
			marginTop: mt,
			marginBottom: mb,
			marginRight: mr,
			marginLeft: ml,
			marginHorizontal: mh,
			marginVertical: mv,

			padding: p,
			paddingTop: pt,
			paddingBottom: pb,
			paddingRight: pr,
			paddingLeft: pl,
			paddingHorizontal: ph,
			paddingVertical: pv,

			borderRadius: br,
			alignContent,
			alignItems,
			alignSelf,
			justifyContent,

			flexDirection,
			flexGrow: flexGrow !== undefined ? flexGrow : undefined,
			flexShrink: flexShrink !== undefined ? flexShrink : undefined,

			width: w !== undefined ? w : undefined,
			height: h !== undefined ? h : undefined,
		},
	});

	return (
		<View style={[styles.appliedStyle, style]} onLayout={onLayout}>
			{children}
		</View>
	);
};
