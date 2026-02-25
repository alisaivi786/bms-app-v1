import React, { forwardRef } from 'react';
import { useBottomSheetScrollableCreator } from '@gorhom/bottom-sheet';
import { FlashList, FlashListProps } from '@shopify/flash-list';

export type BottomSheetFlashListProps<T> = Omit<FlashListProps<T>, 'renderScrollComponent'> & {
	onEndReached?: () => void;
	onEndReachedThreshold?: number;
	estimatedItemSize?: number;
};

function BottomSheetFlashListComponent<T>(props: BottomSheetFlashListProps<T>, ref: React.Ref<FlashList<T>>) {
	const { onEndReached, onEndReachedThreshold = 0.5, ...rest } = props;
	const BottomSheetScrollable = useBottomSheetScrollableCreator();

	return (
		<FlashList<T>
			ref={ref}
			onEndReached={onEndReached}
			onEndReachedThreshold={onEndReachedThreshold}
			renderScrollComponent={BottomSheetScrollable}
			{...rest}
		/>
	);
}

export const BottomSheetFlashList = forwardRef(BottomSheetFlashListComponent) as <T>(
	props: BottomSheetFlashListProps<T> & { ref?: React.Ref<FlashList<T>> }
) => React.ReactElement;
