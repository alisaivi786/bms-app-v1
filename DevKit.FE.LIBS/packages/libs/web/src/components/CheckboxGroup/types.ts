import { StringAndNumberKeys } from '@devkit/utilities';

export type Primitives = string | number | undefined;

export type OptionsGroup<TValue extends { disabled: boolean; checked: boolean }> = {
	groupName: Primitives;
	options: TValue[];
	childrenGroups?: OptionsGroup<TValue>[];
	level?: number;
	groupId: string;
};

export interface IChildGroupProps<
	TValue extends object,
	TValueKey extends StringAndNumberKeys<TValue>,
	TValueKeyType extends TValue[TValueKey]
> {
	checkboxOptions: (TValue & { disabled: boolean; checked: boolean })[];
	valueKey: TValueKey;
	labelKey?: StringAndNumberKeys<TValue>;
	checkboxDirection?: 'row' | 'column';
	onChange: (value: TValueKeyType, isChecked: boolean) => void;
	gridCols?: number;
	highlightedOptions?: TValueKeyType[];
}

/**
 * Represents a group checkbox configuration.
 * @template TValue - The type of the checkbox options.
 * @template TValueKey - The key type of the checkbox option values.
 * @template TValueKeyType - The specific value type of the checkbox option values.
 * @template TGroup - The type of the grouping data.
 */
export interface IGroupCheckbox<
	TValue extends object,
	TValueKey extends StringAndNumberKeys<TValue>,
	TValueKeyType extends TValue[TValueKey],
	TGroup extends object
> {
	/**
	 * An array of checkbox options.
	 */
	checkboxOptions: TValue[];

	/**
	 * The key of the value in the checkbox options.
	 */
	valueKey: TValueKey;

	/**
	 * The key of the label in the checkbox options. (Optional)
	 */
	labelKey?: StringAndNumberKeys<TValue>;

	/**
	 * The key of the group in the checkbox options. (Optional)
	 */
	groupKey?: StringAndNumberKeys<TValue>;

	/**
	 * The configuration for grouping the checkbox options. (Optional)
	 */
	grouping?: {
		/**
		 * An array of groups data.
		 */
		groupsData: TGroup[];

		/**
		 * The key of the group ID in the groups data.
		 */
		groupIDKey: StringAndNumberKeys<TGroup>;

		/**
		 * The key of the group label in the groups data. (Optional)
		 */
		groupLabelKey?: StringAndNumberKeys<TGroup>;

		/**
		 * The key of the parent group in the groups data. (Optional)
		 */
		groupParentKey?: StringAndNumberKeys<TGroup>;
	};

	/**
	 * The callback function triggered when the checkbox values change.
	 * @param newValues - The new checkbox values.
	 */
	onChange: (newValues: TValueKeyType[]) => void;

	/**
	 * The direction of the checkboxes layout. (Optional)
	 */
	checkboxDirection?: 'row' | 'column';

	/**
	 * The currently selected checkbox values.
	 */
	value: TValueKeyType[];

	/**
	 * Indicates if the component is disabled.
	 */
	disabled?: boolean;

	/**
	 * Indicates if the checkboxes should be expanded by default.
	 */
	expandByDefault?: boolean;

	/**
	 * Indicates if the "Expand All" option should be displayed.
	 */
	showExpandAll?: boolean;

	/**
	 * A function to determine if a specific row should be disabled.
	 * @param row - The row data.
	 * @returns True if the row should be disabled, false otherwise.
	 */
	disabledRow?: (row: TValue) => boolean;

	/**
	 * The number of grid column of the checkboxes layout. (Optional)
	 */
	gridCols?: number;
	/**  The values to be highlighted.*/
	highlightedOptions?: TValueKeyType[];
	variant?: 'default' | 'Accordion';
}
