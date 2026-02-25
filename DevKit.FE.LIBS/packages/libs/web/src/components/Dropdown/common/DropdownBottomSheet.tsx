import React, { useRef, useState } from 'react';
import { FieldValues, PrimitiveKeys, StringAndNumberKeys } from '@devkit/utilities';
import Button from '../../Buttons/Button';
import { BottomSheet } from '../../DialogModal/BottomSheet';
import { TextField } from '../../TextField/TextField';
import { useCommonDropdownContextOptions } from './DropdownContext';
import DropdownSkeleton from './DropdownSkeleton';
import { MultiSelectDropdownItem } from './MultiSelectDropdownItem';
import { SingleDropdownItem } from './SingleDropdownItem';

const DropdownBottomSheet = <
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
>({
	loadingRef,
}: {
	loadingRef: React.RefObject<HTMLDivElement>;
}) => {
	const contextValues = useCommonDropdownContextOptions<TValue, TKey, TForm, TGroupKey>();

	const {
		dropDownType,
		isFocused,
		onBlur,
		searchPlaceHolder,
		isSearchable,
		setSearchText,
		searchText,
		groupedFilteredOptions,
		onLoadMore,
		isLoadingMoreOptions,
	} = contextValues;

	const [contentHeight, setContentHeight] = useState('max-content');
	const contentRef = useRef<HTMLDivElement>(null);

	return (
		<BottomSheet
			onScrollEndReach={onLoadMore}
			contentKey={searchText}
			isOpen={isFocused}
			onClose={() => {
				onBlur?.();
			}}
			title={
				isSearchable && (
					<TextField
						placeholder={searchPlaceHolder}
						onChange={(value) => setSearchText(value ?? '')}
						value={searchText}
						onFocus={() => {
							if (contentRef.current)
								setContentHeight(
									contentRef.current.scrollHeight >= contentRef.current.clientHeight
										? '100vh'
										: `${contentRef.current.clientHeight}px`
								);
						}}
					/>
				)
			}
			footer={
				dropDownType === 'multiple' &&
				!contextValues.directChange && (
					<div className="flex justify-evenly sticky bottom-0  w-full gap-4  ">
						<Button
							variant="secondary"
							onClick={() => {
								onBlur?.();
							}}
							layoutClassName="w-full"
						>
							{contextValues.cancelButtonText || 'Cancel'}
						</Button>
						<Button
							variant="primary"
							onClick={() => {
								contextValues.onApplyClick();
								onBlur?.();
							}}
							layoutClassName="w-full"
							disabled={!contextValues.isDirty}
						>
							{contextValues.applyButtonText || 'Apply'}
						</Button>
					</div>
				)
			}
			hasDivider={false}
		>
			<div className="flex flex-col gap-4 h-full" ref={contentRef} style={{ minHeight: contentHeight }}>
				<div className="flex-1 flex flex-col h-full">
					{groupedFilteredOptions.type === 'grouped' &&
						groupedFilteredOptions.data?.map((group, groupIndex) => (
							<div key={groupIndex}>
								<div className="bg-gray-100  text-caption1 px-2.5 py-2 uppercase">{group.label}</div>
								{group?.options?.map((option, index) => (
									<React.Fragment key={index}>
										{dropDownType === 'multiple' && <MultiSelectDropdownItem option={option} />}
										{dropDownType === 'single' && <SingleDropdownItem option={option} index={index} />}
									</React.Fragment>
								))}
								{isLoadingMoreOptions && <DropdownSkeleton loadingRef={loadingRef} />}
							</div>
						))}
					{groupedFilteredOptions.type === 'options' && (
						<>
							{groupedFilteredOptions?.data?.map((option, index) => (
								<React.Fragment key={index}>
									{dropDownType === 'multiple' && <MultiSelectDropdownItem option={option} />}
									{dropDownType === 'single' && <SingleDropdownItem option={option} index={index} />}
								</React.Fragment>
							))}
							{isLoadingMoreOptions && <DropdownSkeleton loadingRef={loadingRef} />}
						</>
					)}
				</div>
			</div>
		</BottomSheet>
	);
};

export default DropdownBottomSheet;
