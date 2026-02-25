import React, { useCallback, useRef, useState } from 'react';
import {
	Dimensions,
	GestureResponderEvent,
	LayoutRectangle,
	Modal,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { ComponentPopoverVariantType } from '@devkit/utilities';
import { useMobileUIConfigOptions } from '../../layouts';
import { isHTML } from '../../utils';
import { HtmlRenderer } from '../HtmlRenderer';
import popoverStyles from './Popover.styles';
import PopoverTriggerDefault from './PopoverTriggerDefault';

const POPOVER_MAX_WIDTH_RATIO = 0.9;

interface IPopoverData {
	header?: string;
	description?: string;
}

type AnchorRect = LayoutRectangle | null;
type PopoverPlacement = 'top' | 'bottom';

export interface IPopoverProps {
	/** The triggering element of the popover, it can be icon or any passed element */
	children?: 'icon' | React.ReactNode;
	/** The popover component the child is a custom React element or a header and description as a text */
	content?: IPopoverData | React.ReactNode | string;

	/**	Override or extend the styles applied to the component */
	className?: string;

	/** If true, the component is shown. */
	isOpen?: boolean;

	/** Callback fired when the component requests to be open. */
	onIsOpenChange?: (isOpen: boolean) => void;

	/** Horizontal Padding for the popover */
	horizontalPadding?: number;

	verticalMargin?: number;

	popoverVariant?: ComponentPopoverVariantType;

	defaultPlacement?: PopoverPlacement;
}

const isPopoverData = (value: unknown): value is IPopoverData =>
	!!value && typeof value === 'object' && ('header' in value || 'description' in value);

export const Popover: React.FC<IPopoverProps> = ({
	children = 'icon',
	content,
	popoverVariant = 'dark',
	defaultPlacement = 'top',
	isOpen,
	onIsOpenChange,
	className,
	horizontalPadding = 16,
	verticalMargin = 0,
}) => {
	const { tw, reverseLayout } = useMobileUIConfigOptions();

	const triggerRef = useRef<View | null>(null);
	const [internalOpen, setInternalOpen] = useState(false);
	const [anchorRect, setAnchorRect] = useState<AnchorRect>(null);
	const [contentSize, setContentSize] = useState<{ width: number; height: number } | null>(null);

	const screenWidth = Dimensions.get('window').width;
	const screenHeight = Dimensions.get('window').height;

	const open = useCallback(() => {
		triggerRef.current?.measureInWindow((x, y, width, height) => {
			setAnchorRect({ x, y, width, height });
			onIsOpenChange ? onIsOpenChange(true) : setInternalOpen(true);
		});
	}, [onIsOpenChange]);

	const close = useCallback(() => {
		onIsOpenChange ? onIsOpenChange(false) : setInternalOpen(false);
	}, [onIsOpenChange]);

	const handlePressOutside = (e: GestureResponderEvent) => {
		if (e.target === e.currentTarget) close();
	};

	const visible = isOpen ?? internalOpen;

	const renderContent = () => {
		if (isPopoverData(content)) {
			const { header, description } = content;

			return (
				<View style={tw`${popoverStyles.contentWrapper(className, popoverVariant)}`}>
					{header ? (
						<Text style={tw`${popoverStyles.popoverHeaderStyle(popoverVariant, reverseLayout)}`}>{header}</Text>
					) : null}
					{description ? (
						<Text style={tw`${popoverStyles.popoverDescriptionStyle(popoverVariant, reverseLayout)}`}>
							{description}
						</Text>
					) : null}
				</View>
			);
		}

		if (typeof content === 'string') {
			if (isHTML(content)) {
				return <HtmlRenderer source={content} />;
			} else {
				return (
					<View style={tw`${popoverStyles.contentWrapper(className, popoverVariant)}`}>
						<Text style={tw`${popoverStyles.popoverDescriptionStyle(popoverVariant, reverseLayout)}`}>{content}</Text>
					</View>
				);
			}
		}

		return content;
	};

	const calculateHorizontalPosition = () => {
		if (!anchorRect || !contentSize) {
			return { left: horizontalPadding };
		}

		const triggerCenter = anchorRect.x + anchorRect.width / 2;
		const halfWidth = contentSize.width / 2;
		let left = triggerCenter - halfWidth;

		if (left < horizontalPadding) left = horizontalPadding;

		if (left + contentSize.width > screenWidth - horizontalPadding) {
			left = screenWidth - contentSize.width - horizontalPadding;
		}

		return { left };
	};

	const calculateVerticalPosition = () => {
		if (!anchorRect) {
			return { top: verticalMargin };
		}

		const triggerTop = anchorRect.y;
		const triggerBottom = anchorRect.y + anchorRect.height;

		// Before we know content height → place by preference
		if (!contentSize) {
			if (defaultPlacement === 'top') {
				return { top: Math.max(verticalMargin, triggerTop - verticalMargin) };
			}

			return { top: triggerBottom + verticalMargin };
		}

		const contentHeight = contentSize.height;
		const spaceBelow = screenHeight - triggerBottom - verticalMargin;
		const spaceAbove = triggerTop - verticalMargin;

		const canFitTop = contentHeight <= spaceAbove;
		const canFitBottom = contentHeight <= spaceBelow;

		let placeTop: boolean;

		if (defaultPlacement === 'top') {
			placeTop = canFitTop ? true : canFitBottom ? false : spaceAbove >= spaceBelow;
		} else {
			placeTop = canFitBottom ? false : canFitTop ? true : spaceAbove >= spaceBelow;
		}

		if (placeTop) {
			const desiredTop = triggerTop - contentHeight - verticalMargin;
			const top = Math.max(verticalMargin, desiredTop);

			return { top };
		}

		const desiredTop = triggerBottom + verticalMargin;
		const maxTop = screenHeight - contentHeight - verticalMargin;
		const top = Math.max(verticalMargin, Math.min(desiredTop, maxTop));

		return { top };
	};

	return (
		<>
			<Pressable
				ref={(node) => {
					triggerRef.current = node;
				}}
				hitSlop={10}
				onPress={open}
			>
				{children === 'icon' ? <PopoverTriggerDefault /> : children}
			</Pressable>

			<Modal visible={visible} transparent animationType="fade" onRequestClose={close}>
				<Pressable style={StyleSheet.absoluteFill} onPress={handlePressOutside}>
					{anchorRect && (
						<View
							onLayout={(e) => {
								const { width, height } = e.nativeEvent.layout;

								setContentSize((prev) =>
									prev && prev.width === width && prev.height === height ? prev : { width, height }
								);
							}}
							style={[
								styles.popover,
								Platform.OS === 'ios' ? styles.shadow : {},
								tw`${popoverStyles.contentWrapper(className, popoverVariant)}`,
								{
									position: 'absolute',
									maxWidth: screenWidth * POPOVER_MAX_WIDTH_RATIO,
									...calculateHorizontalPosition(),
									...calculateVerticalPosition(),
								},
							]}
						>
							{renderContent()}
						</View>
					)}
				</Pressable>
			</Modal>
		</>
	);
};

const styles = StyleSheet.create({
	popover: {
		borderRadius: 12,
		padding: 12,
		alignSelf: 'flex-start',
	},
	shadow: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 8,
		elevation: 6,
	},
});
