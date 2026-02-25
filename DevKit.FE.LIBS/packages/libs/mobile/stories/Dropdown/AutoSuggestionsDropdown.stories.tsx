import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import { AutoSuggestionsDropdown, IAutoSuggestionsDropdownProps } from '../../src/components/AutoSuggestionsDropdown';

type ItemType = { value: number; name: string };

type ComponentType = (args: IAutoSuggestionsDropdownProps<ItemType, 'value'>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const items = [
		{ value: 1, name: 'Jone Doe1' },
		{ value: 2, name: 'John' },
		{ value: 3, name: 'Jonny' },
		{ value: 4, name: 'John Doe' },
		{ value: 5, name: 'John Dummy' },
	];

	const [val, setVal] = useState<number | undefined>();

	const serverSideSearch = (searchText: string) => {
		return new Promise<ItemType[]>((resolve) => {
			const filteredItems = items
				.filter((item) => item?.name?.toLowerCase().startsWith(searchText.toLowerCase()))
				.sort((a, b) => (a?.name > b?.name ? 1 : -1))
				.slice(0, 5);

			setTimeout(() => resolve(filteredItems), 500);
		});
	};

	return (
		<ScrollView contentContainerStyle={{ padding: 40 }} style={{ flex: 1 }}>
			<View>
				<View style={{ height: 200 }} />
				<AutoSuggestionsDropdown
					{...args}
					valueKey="value"
					labelKey="name"
					placeholder={args.placeholder}
					debounceTimeInMilliseconds={2000}
					onSearch={serverSideSearch}
					value={items.find((item) => item.value === val)}
					onValueChange={setVal}
				/>
				<Text>this text should get covered</Text>
				<View style={{ height: 1000 }} />
			</View>
		</ScrollView>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Components/AutoSuggestionsDropdown',
	render: Template,
	component: AutoSuggestionsDropdown,
};

export default StoryMeta;

export const AutoSuggestDropdownStory = {
	args: {
		disabled: false,
		debounceTimeInMilliseconds: 2000,
	},
};
