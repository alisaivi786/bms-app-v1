import uniq from 'lodash/uniq';
import { StringAndNumberKeys } from '@devkit/utilities';
import { OptionsGroup, Primitives } from './types';

export const getChildOptions: <
	TValue extends object,
	TValueKey extends StringAndNumberKeys<TValue>,
	TGroup extends object
>(
	parentGroup: TGroup,
	options: (TValue & { disabled: boolean; checked: boolean })[],
	groupKey: TValueKey,
	groupIDKey: StringAndNumberKeys<TGroup>,
	groupLabelKey: StringAndNumberKeys<TGroup> | undefined,
	parentKey: StringAndNumberKeys<TGroup>,
	groupsData: TGroup[],
	level?: number
) => OptionsGroup<TValue & { disabled: boolean; checked: boolean }> = (
	parentGroup,
	options,
	groupKey,
	groupIDKey,
	groupLabelKey,
	parentKey,
	groupsData,
	level = 0
) => {
	const currentGroupId = parentGroup[groupIDKey];

	const groupOptions = options.filter(
		(option) => (option[groupKey] as unknown as Primitives) === (currentGroupId as unknown as Primitives)
	);

	const groupChildGroups = groupsData.filter((group) => group[parentKey] === currentGroupId);

	return {
		options: groupOptions,
		groupName: (groupLabelKey && parentGroup[groupLabelKey]
			? parentGroup[groupLabelKey]
			: currentGroupId) as unknown as Primitives,
		childrenGroups: groupChildGroups.map((group) =>
			getChildOptions(group, options, groupKey, groupIDKey, groupLabelKey, parentKey, groupsData, level + 1)
		),
		level: level,
		groupId: `${currentGroupId}`,
	};
};

export const CheckOptionStatus: <TValue extends object>(
	options: OptionsGroup<TValue & { checked: boolean; disabled: boolean }>
) => {
	allChecked: boolean;
	someChecked: boolean;
	allDisabled: boolean;
} = (options) => {
	const childOptionStatus = options.childrenGroups
		? options.childrenGroups.map((group) => CheckOptionStatus(group))
		: undefined;

	const checkedCount = options.options?.filter((option) => option.checked).length;

	const childrenAllChecked =
		options.childrenGroups && childOptionStatus
			? childOptionStatus.filter((childStatus) => childStatus.allChecked).length === options.childrenGroups.length
			: true;

	const childrenSomeChecked =
		options.childrenGroups && childOptionStatus
			? childOptionStatus.filter((childStatus) => childStatus.someChecked || childStatus.allChecked).length > 0
			: false;

	const childrenAllDisabled =
		options.childrenGroups && childOptionStatus
			? childOptionStatus.filter((childStatus) => childStatus.allDisabled).length === options.childrenGroups.length
			: true;

	const allChecked = checkedCount === options.options.length && childrenAllChecked;
	const someChecked = checkedCount > 0 || childrenSomeChecked;
	const allDisabled =
		options.options?.filter((option) => option.disabled).length === options.options.length && childrenAllDisabled;

	return {
		allChecked,
		someChecked,
		allDisabled,
	};
};

export const GetAllChidSelection = <
	TValue extends object,
	TValueKey extends StringAndNumberKeys<TValue>,
	TValueKeyType extends TValue[TValueKey]
>(
	options: OptionsGroup<TValue & { checked: boolean; disabled: boolean }>,
	valueKey: TValueKey
) => {
	const optionToSelect = options.options.map((option) => option[valueKey] as TValueKeyType);

	if (options.childrenGroups) {
		options.childrenGroups.forEach((groupChild) =>
			GetAllChidSelection<TValue, TValueKey, TValueKeyType>(groupChild, valueKey).forEach((valueToSelect) => {
				optionToSelect.push(valueToSelect);
			})
		);
	}

	return uniq(optionToSelect);
};
