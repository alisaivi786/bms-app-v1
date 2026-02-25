import React from 'react';
import { FloatingPortal, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/react';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { ArrowDownIcon, ArrowUpIcon } from '@devkit/icons/web';
import { DevkitSimpleBar } from '../../common/devkitSimpleBar';
import Button from '../Buttons/Button';
import { Checkbox } from '../Checkbox';
import { SearchBox } from '../SearchBox';
import styles from './ButtonDropdown.styles';
import { ButtonDropdownOption } from './ButtonDropdownOption';

export type ButtonDropdownOptionType = {
	id: string;
	label: string;
	group?: string;
	section?: string;
	disabled?: boolean;
};

export interface IButtonDropdownType {
	/** The label of component */
	label?: string;
	/** The label is applied for cancel button if provided */
	cancelLabel?: string;
	/** The label is applied for apply button if provided */
	applyLabel?: string;
	/** If true, the component is disabled */
	disabled?: boolean;
	/** The initial selected option Ids */
	value?: string[];
	/**
	 * The flat array of options. Each option can optionally include group and section information.	*/
	options: ButtonDropdownOptionType[];
	/** A callback function triggered when the user clicks the Apply button and return all selected option Ids */
	onApplyClick: (options: string[]) => void;
	/** A callback function triggered when the user clicks the Apply button */
	validation?: 'min-one';
}

export const ButtonDropdown = ({
	label,
	cancelLabel = 'Cancel',
	applyLabel = 'Apply',
	options,
	value,
	disabled = false,
	onApplyClick,
	validation,
}: IButtonDropdownType) => {
	const initialSelectedIds = React.useRef<string[]>(value ?? []);

	const [selectedIds, setSelectedIds] = React.useState<string[]>(value ?? []);
	const selectedSet = new Set(selectedIds);

	const [searchValue, setSearchValue] = React.useState('');
	const { refs, floatingStyles, strategy } = useFloating({
		placement: 'bottom-start',
		whileElementsMounted: autoUpdate,
		middleware: [flip(), offset({ mainAxis: 5 }), shift({ padding: 8 })],
	});

	const syncDraftWithAppliedValue = React.useCallback(() => {
		setSelectedIds(value ?? []);
		setSearchValue('');
	}, [value]);

	React.useEffect(() => {
		const nextSelectedIds = value ?? [];

		setSelectedIds(nextSelectedIds);
		initialSelectedIds.current = nextSelectedIds;
	}, [value]);

	const disableApplyButton = validation === 'min-one' ? selectedIds.length === 0 : false;
	/**
	 * Filters the options array to include only those whose label or group
	 * contains the current search value.
	 */
	const filteredOptions = options.filter((opt) => {
		const search = searchValue.toLowerCase();

		return opt.label.toLowerCase().includes(search) || (opt.group?.toLowerCase().includes(search) ?? false);
	});

	const enabledFilteredOptions = filteredOptions.filter((opt) => !opt.disabled);
	const isAllSelected =
		enabledFilteredOptions.length > 0 && enabledFilteredOptions.every((opt) => selectedSet.has(opt.id));

	/**
	 * Toggles selection state for all currently filtered options.
	 * If isChecked is true, adds all filtered option IDs to the selection.
	 * If isChecked is false, removes all filtered option IDs from the selection.
	 */
	const handleSelectAll = (isChecked: boolean) => {
		if (isChecked) {
			setSelectedIds((prev) => Array.from(new Set([...prev, ...enabledFilteredOptions.map((opt) => opt.id)])));
		} else {
			setSelectedIds((prev) => prev.filter((id) => !enabledFilteredOptions.map((opt) => opt.id).includes(id)));
		}
	};

	/**
	 * Handles selection or deselection of an option or group.
	 * If a group parent is selected, toggles only its currently filtered (visible) children.
	 * If a single option is selected, toggles its selection state.
	 */
	const handleClickOption = (item: ButtonDropdownOptionType, checked: boolean) => {
		if (item.disabled) return;

		// Use filteredOptions for group children if filtering is active
		const groupOptions = filteredOptions.filter((opt) => opt.group === item.group && !opt.disabled);

		if (item.id === item.group) {
			// Group parent: select/deselect only filtered group options
			if (checked) {
				setSelectedIds((prev) => Array.from(new Set([...prev, ...groupOptions.map((opt) => opt.id)])));
			} else {
				setSelectedIds((prev) => prev.filter((id) => !groupOptions.map((opt) => opt.id).includes(id)));
			}
		} else {
			// Single option
			if (checked) {
				setSelectedIds((prev) => [...prev, item.id]);
			} else {
				setSelectedIds((prev) => prev.filter((id) => id !== item.id));
			}
		}
	};

	/**
	 * Organizes the flat options array into a nested structure for rendering.
	 * - Sections: maps section names to their groups and options.
	 * - Groups: maps group names to their options (if not in a section).
	 * - Flat: collects options that do not belong to any group or section.
	 */
	const groupOptions = (options: ButtonDropdownOptionType[]) => {
		const sections: Record<string, Record<string, ButtonDropdownOptionType[]>> = {};
		const groups: Record<string, ButtonDropdownOptionType[]> = {};
		const flat: ButtonDropdownOptionType[] = [];

		options.forEach((opt) => {
			if (opt.section) {
				if (!sections[opt.section]) sections[opt.section] = {};
				const groupKey = opt.group || '';

				if (!sections[opt.section][groupKey]) sections[opt.section][groupKey] = [];
				sections[opt.section][groupKey].push(opt);
			} else if (opt.group) {
				if (!groups[opt.group]) groups[opt.group] = [];
				groups[opt.group].push(opt);
			} else {
				flat.push(opt);
			}
		});

		return { sections, groups, flat };
	};

	const { sections, groups, flat } = groupOptions(filteredOptions);

	const renderOptions = (options: ButtonDropdownOptionType[], className?: string) =>
		options.map((option) => (
			<ButtonDropdownOption
				key={option.id}
				isChecked={selectedSet.has(option.id)}
				isDisabled={option.disabled}
				item={option}
				onOptionSelected={handleClickOption}
				className={className}
			/>
		));

	const renderGroups = (groupsObj: Record<string, ButtonDropdownOptionType[]>, section = '') =>
		Object.entries(groupsObj).map(([group, options]) => {
			const enabledOptions = options.filter((opt) => !opt.disabled);
			const isGroupDisabled = enabledOptions.length === 0;
			const optionsToCheck = isGroupDisabled ? options : enabledOptions;
			const isGroupChecked = optionsToCheck.length > 0 && optionsToCheck.every((opt) => selectedSet.has(opt.id));

			return group ? (
				// add top border if there are no sections
				<div key={group} className={`${!hasSections ? 'border-t border-gray-300' : ''}`}>
					<ButtonDropdownOption
						key={group}
						isChecked={isGroupChecked}
						isDisabled={isGroupDisabled}
						item={{ id: group, label: group, group, section }}
						onOptionSelected={handleClickOption}
						className="font-bold"
					/>
					<div>{renderOptions(options, 'pl-[27px] red')}</div>
				</div>
			) : (
				renderOptions(options)
			);
		});

	const renderSections = () =>
		Object.entries(sections).map(([section, groupObj]) => (
			<div key={section} className="border-t border-gray-300">
				<div className="font-bold py-3 px-3 text-caption1 text-dark-1">{section}</div>
				{renderGroups(groupObj, section)}
			</div>
		));

	const hasSections = Object.keys(sections).length;

	return (
		<Menu>
			{({ open, close }) => (
				<div className="relative w-full">
					<MenuButton
						ref={refs.setReference}
						onFocus={syncDraftWithAppliedValue}
						onClick={syncDraftWithAppliedValue}
						disabled={disabled}
						className="flex w-full items-center justify-between gap-2 rounded-md border nj-border-brand py-2 px-4 text-paragraph nj-text-brand h-10 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400"
					>
						{label}
						{open ? (
							<ArrowUpIcon className={`text-caption1 ${disabled ? 'text-gray-400' : 'nj-text-brand'}`} />
						) : (
							<ArrowDownIcon className={`text-caption1 ${disabled ? 'text-gray-400' : 'nj-text-brand'}`} />
						)}
					</MenuButton>

					<FloatingPortal>
						<MenuItems ref={refs.setFloating} style={{ position: strategy, ...floatingStyles }} className="z-floating">
							<div className="pt-[5px] flex flex-col rounded-md bg-white drop-shadow-tooltip max-h-[420px] overflow-y-auto min-w-[270px]">
								<DevkitSimpleBar>
									{/* #region Search Input and Select All Checkbox */}
									<div className="px-3">
										<div className="py-2.5">
											<SearchBox
												size="small"
												placeholder="Search"
												// No debounce needed since filtering is done on the client
												debounceTimeInMilliseconds={0}
												onChange={(value) => {
													setSearchValue(value ?? '');
												}}
												value={searchValue}
											/>
										</div>
										<div className="flex py-3">
											<Checkbox
												isChecked={isAllSelected}
												onChange={handleSelectAll}
												label={<p className="text-xs font-bold text-gray-700">Select All</p>}
												disabled={enabledFilteredOptions.length === 0}
											/>
										</div>
									</div>
									{/*  #endregion */}

									{/* #region Menu main content (sections, groups, or flat options) */}
									{hasSections
										? renderSections()
										: Object.keys(groups).length > 0
										? renderGroups(groups)
										: renderOptions(flat)}
									{/*  #endregion */}

									{/* #region Menu Footer (Cancel and Apply Buttons) */}
									<div className={styles.menuFooterStyle}>
										<Button
											variant="secondary"
											onClick={() => {
												setSelectedIds(initialSelectedIds.current);
												setSearchValue('');
												close();
											}}
											size="small"
											layoutClassName="flex-1"
										>
											{cancelLabel}
										</Button>
										<Button
											variant="primary"
											onClick={() => {
												close();
												setSearchValue('');
												onApplyClick(selectedIds);
											}}
											layoutClassName="flex-1"
											size="small"
											disabled={disableApplyButton}
										>
											{applyLabel}
										</Button>
									</div>
									{/*  #endregion */}
								</DevkitSimpleBar>
							</div>
						</MenuItems>
					</FloatingPortal>
				</div>
			)}
		</Menu>
	);
};
