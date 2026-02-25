import React, { useEffect, useRef } from 'react';
import { FieldValues, PrimitiveKeys, StringAndNumberKeys } from '@devkit/utilities';
import { DevkitSimpleBar } from '../../../common/devkitSimpleBar';
import Button from '../../Buttons/Button';
import styles from '../Dropdown.styles';
import DropdownBottomSheet from './DropdownBottomSheet';
import { useCommonDropdownContextOptions } from './DropdownContext';
import { DropdownMenuPortal } from './DropdownMenuPortal';
import DropdownSkeleton from './DropdownSkeleton';
import { MultiSelectDropdownItem } from './MultiSelectDropdownItem';
import { SelectAllDropdownItem } from './SelectAllDropdownItem';
import { SingleDropdownItem } from './SingleDropdownItem';

export const DropdownMenu = <
	TValue,
	TKey extends PrimitiveKeys<TValue>,
	TForm extends FieldValues,
	TGroupKey extends StringAndNumberKeys<TValue> | undefined
>() => {
	const {
		valueKey,
		onBlur,
		groupedFilteredOptions,
		noOptionAvailableText,
		isBottomSheet,
		size,
		onLoadMore,
		isLoadingMoreOptions,
		...contextValues
	} = useCommonDropdownContextOptions<TValue, TKey, TForm, TGroupKey>();

	useEffect(() => {
		if (isLoadingMoreOptions && loadingRef.current) loadingRef.current?.scrollIntoView();
	}, [isLoadingMoreOptions]);

	const loadingRef = useRef<HTMLDivElement>(null);

	if (isBottomSheet) {
		return <DropdownBottomSheet loadingRef={loadingRef} />;
	}

	return (
		<DropdownMenuPortal>
			{groupedFilteredOptions.type === 'grouped' ? (
				<DevkitSimpleBar onScrollEndReach={onLoadMore}>
					<div>
						{contextValues.dropDownType === 'multiple' && <SelectAllDropdownItem />}
						{groupedFilteredOptions.data?.map((group, groupIndex) => (
							<div key={groupIndex}>
								<div className={styles.groupLabelStyle}>{group.label}</div>
								{group?.options?.map((option, index) => (
									<React.Fragment key={`${option[valueKey]}-${index}`}>
										{contextValues.dropDownType === 'single' && <SingleDropdownItem option={option} index={index} />}
										{contextValues.dropDownType === 'multiple' && <MultiSelectDropdownItem option={option} />}
									</React.Fragment>
								))}
								{isLoadingMoreOptions && <DropdownSkeleton loadingRef={loadingRef} />}
							</div>
						))}
					</div>
				</DevkitSimpleBar>
			) : (
				<DevkitSimpleBar onScrollEndReach={onLoadMore}>
					<div>
						{contextValues.dropDownType === 'multiple' && <SelectAllDropdownItem />}
						{groupedFilteredOptions.data.map((option, index) => (
							<React.Fragment key={`${option[valueKey]}-${index}`}>
								{contextValues.dropDownType === 'single' && <SingleDropdownItem option={option} index={index} />}
								{contextValues.dropDownType === 'multiple' && <MultiSelectDropdownItem option={option} />}
							</React.Fragment>
						))}
						{isLoadingMoreOptions && <DropdownSkeleton loadingRef={loadingRef} />}
					</div>
				</DevkitSimpleBar>
			)}

			{groupedFilteredOptions.data.length === 0 && (
				<div className={`${styles.defaultOptionStyle}`}>{noOptionAvailableText}</div>
			)}

			{contextValues.dropDownType === 'multiple' && !contextValues.directChange && (
				<div className={styles.menuFooterStyle}>
					<Button
						variant="secondary"
						onClick={() => {
							onBlur?.();
						}}
						size={size === 'small' ? 'small' : 'medium'}
						layoutClassName="flex-1"
					>
						{contextValues.cancelButtonText || 'Cancel'}
					</Button>
					<Button
						variant="primary"
						onClick={() => {
							contextValues.onApplyClick();
							onBlur?.();
						}}
						layoutClassName="flex-1"
						disabled={!contextValues.isDirty}
						size={size === 'small' ? 'small' : 'medium'}
					>
						{contextValues.applyButtonText || 'Apply'}
					</Button>
				</div>
			)}
		</DropdownMenuPortal>
	);
};
