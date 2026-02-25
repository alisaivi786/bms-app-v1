import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { IAutoSuggestionsDropdownProps } from '../../../src/components/AutoSuggestionsDropdown';
import { AutoSuggestionsDropdown } from '../../../src/components/AutoSuggestionsDropdown/AutoSuggestionsDropdown';

interface IRenderItemProps {
	item: string;
	searchText: string;
}
const RenderItem = ({ item, searchText }: IRenderItemProps) => {
	const truncateString = item.toLowerCase().split(searchText.toLowerCase());

	const truncateLength = !truncateString[0] ? searchText.length : truncateString[0].length;

	return (
		<p className="flex flex-row text-paragraph">
			{item.slice(0, truncateLength)}
			<span className="font-bold underline text-paragraph">{item.slice(truncateLength)}</span>
		</p>
	);
};

type ItemType = { value: number; name: string };

type ComponentType = (args: IAutoSuggestionsDropdownProps<ItemType, 'value'>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [dropDownState, setDropdownState] = useState<string>();

	const items = [
		{ value: 1, name: 'Jone Doe1' },
		{ value: 2, name: 'John' },
		{ value: 3, name: 'Jonny' },
		{ value: 4, name: 'John Doe' },
		{ value: 5, name: 'John Dummy' },
	];
	const serverSideSearch = (searchText: string) => {
		const filteredItems = items
			.filter((item) => item?.name?.toLowerCase().startsWith(searchText.toLowerCase()))
			.sort((a, b) => (a?.name > b?.name ? 1 : -1))
			.slice(0, 5);

		return filteredItems;
	};

	const onChange = (val: string | undefined) => {
		setDropdownState(val);
	};

	return (
		<>
			<div className="p-5">
				<AutoSuggestionsDropdown
					{...args}
					valueKey="name"
					labelKey="name"
					value={items.find((item) => item.name === dropDownState)}
					onValueChange={onChange}
					placeholder={args.placeholder}
					debounceTimeInMilliseconds={2000}
					onSearch={serverSideSearch}
					renderItem={(searchText, item?) => <RenderItem searchText={searchText} item={item?.name ?? ''} />}
				/>
			</div>
		</>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Web/Components/AutoSuggestionsDropdown',
	render: Template,
	component: AutoSuggestionsDropdown,
};

export default StoryMeta;

export const AutoSuggestDropdownUsingAsyncSelectWithState = {};
