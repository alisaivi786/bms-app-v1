import groupBy from 'lodash/groupBy';
import uniq from 'lodash/uniq';
import { useState } from 'react';
import { ArrowUpIcon } from '@devkit/icons/web';
import { StringAndNumberKeys } from '@devkit/utilities';
import { Checkbox } from '../Checkbox';
import ChildCheckBoxesGroup from './ChildCheckBoxesGroup';
import RenderCheckboxGroup from './RenderCheckboxGroup';
import { CheckOptionStatus, GetAllChidSelection, getChildOptions } from './checkbox-util';
import { IGroupCheckbox, OptionsGroup, Primitives } from './types';

export const CheckboxGroup = <
	TValue extends object,
	TValueKey extends StringAndNumberKeys<TValue>,
	TValueKeyType extends TValue[TValueKey],
	TGroup extends object
>({
	value,
	onChange,
	checkboxOptions,
	checkboxDirection = 'column',
	groupKey,
	grouping,
	valueKey,
	labelKey,
	disabledRow = () => false,
	disabled = false,
	expandByDefault = true,
	showExpandAll = true,
	gridCols,
	highlightedOptions,
	variant = 'default',
}: IGroupCheckbox<TValue, TValueKey, TValueKeyType, TGroup>) => {
	const [expand, setExpand] = useState<boolean | null>(expandByDefault);
	const mappedOptions = checkboxOptions.map((option) => ({
		...option,
		checked: !!value.find((valueItem) => valueItem === option[valueKey]),
		disabled: disabled || disabledRow(option),
	}));
	const [childGroupExpansions, setChildGroupExpansions] = useState<Record<string, boolean>>({});

	const isAccordion = variant === 'Accordion';
	let groupTree: OptionsGroup<TValue & { disabled: boolean; checked: boolean }>[] = [];
	const { groupsData, groupParentKey, groupIDKey, groupLabelKey } = grouping ?? {};

	if (groupKey && groupIDKey && groupsData && groupParentKey) {
		const topLevelGroups = groupsData.filter((group) => !group[groupParentKey]);

		groupTree = topLevelGroups.map((group) =>
			getChildOptions(group, mappedOptions, groupKey, groupIDKey, groupLabelKey, groupParentKey, groupsData, 0)
		);
	} else if (groupKey) {
		const groups = groupBy(mappedOptions, (group) => group[groupKey]);

		groupTree = Object.keys(groups).map((currentGroup) => {
			const groupId = groups[currentGroup][0][groupKey] as unknown as Primitives;

			const groupItem = groupsData?.find((g) => (g[groupIDKey as keyof TGroup] as unknown as Primitives) === groupId);

			const groupName =
				groupLabelKey && groupItem && groupItem[groupLabelKey]
					? (groupItem[groupLabelKey] as unknown as Primitives)
					: groupId;

			return {
				groupName,
				options: groups[currentGroup],
				childrenOptions: undefined,
				level: 0,
				groupId: `${groupItem?.[groupIDKey as keyof typeof groupItem]}`,
			};
		});
	}

	const groupStatusAll: {
		allChecked: boolean;
		someChecked: boolean;
		allDisabled: boolean;
	}[] = [];

	groupTree.forEach((groupOptions) => {
		groupStatusAll.push(CheckOptionStatus(groupOptions));
	});
	const allChecked = groupStatusAll.every((a) => a.allChecked);

	const someChecked = groupStatusAll.some((a) => a.someChecked);

	const updateChildGroupExpansion = (groupId: string, isExpanded: boolean) => {
		setChildGroupExpansions((prevExpansions) => ({
			...prevExpansions,
			[groupId]: isExpanded,
		}));

		// Recursively update the expand state
		const updateChildGroups = (group: OptionsGroup<TValue & { checked: boolean; disabled: boolean }>) => {
			if (group.childrenGroups) {
				group.childrenGroups.forEach((childGroup) => {
					setChildGroupExpansions((prevExpansions) => ({
						...prevExpansions,
						[childGroup.groupId]: isExpanded,
					}));
					updateChildGroups(childGroup);
				});
			}
		};

		// Map through groupTree to get each Group
		const findGroupInTree = (groups: OptionsGroup<TValue & { checked: boolean; disabled: boolean }>[]) => {
			for (const group of groups) {
				if (group.groupId === groupId) {
					updateChildGroups(group);
				} else if (group.childrenGroups) {
					findGroupInTree(group.childrenGroups);
				}
			}
		};

		findGroupInTree(groupTree);
	};

	const areAllItemsExpandedHandler = () => {
		return Object.values(childGroupExpansions).every((isExpanded) => isExpanded);
	};
	const areAllItemsExpanded = areAllItemsExpandedHandler();

	return (
		<div className="flex flex-col gap-2">
			<div className={`${isAccordion ? 'flex justify-between' : ''}`}>
				{isAccordion && (
					<Checkbox
						isChecked={allChecked}
						isIndeterminate={!allChecked && someChecked ? true : undefined}
						onChange={(isChecked) => {
							let optionsIds: TValueKeyType[] = [];

							groupTree.forEach((groupOption) => {
								const ids = GetAllChidSelection<TValue, TValueKey, TValueKeyType>(groupOption, valueKey);

								optionsIds = [...optionsIds, ...ids];
							});

							const nextValue = [...value];

							if (isChecked) {
								optionsIds.forEach((optionId) => nextValue.push(optionId));
								onChange(uniq(nextValue));
							} else {
								onChange(uniq(value.filter((v) => !optionsIds.includes(v))));
							}
						}}
						label="Select All for FULL ACCESS"
					/>
				)}
				{showExpandAll && groupTree?.length > 0 && (
					<div className="flex justify-end">
						<div
							className="flex items-center p-2 cursor-pointer"
							onClick={() => {
								setExpand(!expand);
							}}
						>
							<span className="nj-text-brand"> {areAllItemsExpanded ? 'Collapse All' : 'Expand All'} </span>
							<ArrowUpIcon
								className={`duration-300 mx-2 nj-text-brand ${
									areAllItemsExpanded ? 'rotate-0  ease-in' : 'rotate-180 ease-out'
								}`}
							/>
						</div>
					</div>
				)}
			</div>
			<div className={`flex flex-wrap gap-4 ${checkboxDirection == 'row' ? 'flex-row' : 'flex-col'}`}>
				{groupTree.length > 0 ? (
					groupTree.map((groupOptions, index) => {
						return (
							<RenderCheckboxGroup
								key={index}
								groupOptions={groupOptions}
								valueKey={valueKey}
								labelKey={labelKey}
								onChange={onChange}
								value={value}
								highlightedOptions={highlightedOptions}
								disabled={disabled}
								disabledRow={disabledRow}
								expandAll={expand}
								checkboxDirection={checkboxDirection}
								updateChildGroupExpansion={(groupId, isExpanded) => {
									updateChildGroupExpansion(groupId, isExpanded);
								}}
								resetExpandState={() => {
									setExpand(null);
								}}
								isAccordion={isAccordion}
								childGroupExpansions={childGroupExpansions}
							></RenderCheckboxGroup>
						);
					})
				) : (
					<>
						<ChildCheckBoxesGroup
							valueKey={valueKey}
							labelKey={labelKey}
							checkboxDirection={checkboxDirection}
							checkboxOptions={mappedOptions}
							highlightedOptions={highlightedOptions}
							gridCols={gridCols}
							onChange={(itemValue, isChecked) => {
								const nextValue = [...value];

								if (isChecked) {
									nextValue.push(itemValue as TValueKeyType);
									onChange(uniq(nextValue));
								} else {
									onChange(uniq(value.filter((v) => v !== itemValue)));
								}
							}}
						></ChildCheckBoxesGroup>
					</>
				)}
			</div>
		</div>
	);
};
