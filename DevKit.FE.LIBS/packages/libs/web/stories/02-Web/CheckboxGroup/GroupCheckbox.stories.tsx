import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { CheckboxGroup, IGroupCheckbox } from '../../../src/components/CheckboxGroup';
import { checkboxOptions, optionsGroups } from './checkbox-data';

type ComponentType = (
	args: IGroupCheckbox<(typeof checkboxOptions)[0], 'displayName', string, (typeof optionsGroups)[0]>
) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [checked, setChecked] = useState<number[]>([]);
	const { groupKey, grouping, disabled, disabledRow, checkboxDirection, showExpandAll, expandByDefault, variant } =
		args || {};

	return (
		<>
			<CheckboxGroup
				checkboxOptions={checkboxOptions}
				valueKey="id"
				labelKey="displayName"
				onChange={(newValue) => {
					setChecked(newValue);
				}}
				value={checked}
				showExpandAll={showExpandAll}
				expandByDefault={expandByDefault}
				checkboxDirection={checkboxDirection}
				groupKey={groupKey}
				grouping={grouping}
				disabled={disabled}
				disabledRow={disabledRow}
				highlightedOptions={[1, 2]}
				gridCols={4}
				variant={variant}
			/>
			<p className="pt-4">Status: {`${checked}`}</p>
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'WEB/Forms/CheckboxGroup',
	component: CheckboxGroup,
};

export default StoryMeta;

export const GroupCheckbox: StoryObj<ComponentType> = {
	render: Template,
	args: { disabled: false },
};

export const Grouping: StoryObj<ComponentType> = {
	render: Template,
	args: {
		disabled: false,
		groupKey: 'screenId',
		expandByDefault: true,
		showExpandAll: true,
		grouping: {
			groupsData: optionsGroups,
			groupIDKey: 'id',
			groupLabelKey: 'displayName',
			groupParentKey: 'parentScreenId',
		},
	},
};

export const DisabledGrouping: StoryObj<ComponentType> = {
	render: Template,
	args: {
		groupKey: 'screenId',
		grouping: {
			groupsData: optionsGroups,
			groupIDKey: 'id',
			groupLabelKey: 'displayName',
		},
		disabledRow: (row) => row.screenId > 2 && row.screenId < 5,
	},
};

export const GroupingRow: StoryObj<ComponentType> = {
	render: Template,
	args: {
		groupKey: 'screenId',
		grouping: {
			groupsData: optionsGroups,
			groupIDKey: 'id',
			groupLabelKey: 'displayName',
		},
		checkboxDirection: 'row',
	},
};
