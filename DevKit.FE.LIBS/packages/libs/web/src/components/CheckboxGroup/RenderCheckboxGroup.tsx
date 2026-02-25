import uniq from 'lodash/uniq';
import { useEffect, useState } from 'react';
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from '@devkit/icons/web';
import { StringAndNumberKeys } from '@devkit/utilities';
import { Checkbox } from '../Checkbox';
import ChildCheckBoxesGroup from './ChildCheckBoxesGroup';
import { CheckOptionStatus, GetAllChidSelection } from './checkbox-util';
import { OptionsGroup } from './types';

const RenderCheckboxGroup = <
	TValue extends object,
	TValueKey extends StringAndNumberKeys<TValue>,
	TValueKeyType extends TValue[TValueKey]
>({
	groupOptions,
	labelKey,
	valueKey,
	checkboxDirection,
	onChange,
	value,
	disabled,
	disabledRow,
	expandAll,
	resetExpandState,
	highlightedOptions,
	isAccordion,
	updateChildGroupExpansion,
	childGroupExpansions,
}: {
	groupOptions: OptionsGroup<TValue & { checked: boolean; disabled: boolean }>;
	valueKey: TValueKey;
	labelKey?: StringAndNumberKeys<TValue>;
	onChange: (newValues: TValueKeyType[]) => void;
	checkboxDirection?: 'row' | 'column';
	value: TValueKeyType[];
	disabled: boolean;
	disabledRow: (row: TValue) => boolean;
	resetExpandState: () => void;
	expandAll: boolean | null;
	highlightedOptions?: TValueKeyType[];
	isAccordion?: boolean;
	updateChildGroupExpansion: (groupId: string, isExpand: boolean) => void;
	childGroupExpansions: Record<string, boolean>;
}) => {
	const { groupName, groupId } = groupOptions;
	const groupStatus = CheckOptionStatus(groupOptions) ?? [];
	const [isBoxExpanded, setIsBoxExpanded] = useState(false);
	const isFirstLevel = groupOptions.level === 0;
	const isExpanded = childGroupExpansions ? childGroupExpansions[groupId] : false;
	const handleToggleBoxExpansion = () => {
		setIsBoxExpanded(!isBoxExpanded);
	};
	const handleToggleExpand = () => {
		const newExpandState = !isExpanded;

		updateChildGroupExpansion(groupId, newExpandState);
		resetExpandState();
		setIsBoxExpanded(false);
	};

	useEffect(() => {
		if (typeof expandAll === 'boolean') {
			setIsBoxExpanded(expandAll);
			updateChildGroupExpansion(groupId, expandAll);
		}
	}, [expandAll]);

	return (
		<div
			className={`flex justify-between ${isFirstLevel && isAccordion && 'border border-gray-200 rounded p-3 w-full'} `}
		>
			<div>
				{isFirstLevel && isAccordion && <p className="font-bold">{groupName?.toString().toUpperCase()}</p>}

				<div className="flex flex-col pt-2">
					<div className="flex">
						<div className="flex items-center">
							{(!isFirstLevel || (isFirstLevel && !isAccordion)) && (
								<>
									{!!groupOptions && isExpanded && (
										<ArrowDownIcon onClick={handleToggleExpand} className="text-black w-2/3 mr-0.5" />
									)}
									{!!groupOptions && !isExpanded && (
										<ArrowRightIcon onClick={handleToggleExpand} className="text-black w-2/3 mr-0.5" />
									)}
								</>
							)}
						</div>
						<div>
							<Checkbox
								disabled={groupStatus.allDisabled}
								isChecked={groupStatus.allChecked}
								isIndeterminate={!groupStatus.allChecked && groupStatus.someChecked ? true : undefined}
								onChange={(isChecked) => {
									const optionsIds = GetAllChidSelection<TValue, TValueKey, TValueKeyType>(groupOptions, valueKey);

									const nextValue = [...value];

									if (isChecked) {
										optionsIds.forEach((optionId) => nextValue.push(optionId));
										onChange(uniq(nextValue));
									} else {
										onChange(uniq(value.filter((v) => !optionsIds.includes(v))));
									}
								}}
								label={<strong>{isFirstLevel && isAccordion ? 'All' : groupName}</strong>}
							/>
						</div>
					</div>
					<div className="flex flex-col gap-4 ps-7">
						{groupOptions.options.length > 0 && isExpanded && (
							<ChildCheckBoxesGroup
								valueKey={valueKey}
								labelKey={labelKey}
								highlightedOptions={highlightedOptions}
								checkboxOptions={groupOptions.options}
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
						)}
					</div>
					<div className={!isAccordion ? 'ps-3' : ''}>
						{(isExpanded || isBoxExpanded) &&
							groupOptions.childrenGroups?.map((childGroup, i) => (
								<RenderCheckboxGroup<TValue, TValueKey, TValueKeyType>
									key={i}
									checkboxDirection={checkboxDirection}
									groupOptions={childGroup}
									disabled={disabled}
									disabledRow={disabledRow}
									valueKey={valueKey}
									labelKey={labelKey}
									resetExpandState={resetExpandState}
									value={value}
									expandAll={expandAll}
									onChange={onChange}
									updateChildGroupExpansion={updateChildGroupExpansion}
									childGroupExpansions={childGroupExpansions}
								></RenderCheckboxGroup>
							))}
					</div>
				</div>
			</div>
			<div>
				{isFirstLevel && isAccordion && (
					<>
						{!isExpanded ? (
							<ArrowDownIcon
								onClick={() => {
									handleToggleBoxExpansion();
									updateChildGroupExpansion(groupId, true);
								}}
								className="text-black w-2/3 mr-0.5"
							/>
						) : (
							<ArrowUpIcon
								onClick={() => {
									handleToggleBoxExpansion();
									updateChildGroupExpansion(groupId, false);
								}}
								className="text-black w-2/3 mr-0.5"
							/>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default RenderCheckboxGroup;
