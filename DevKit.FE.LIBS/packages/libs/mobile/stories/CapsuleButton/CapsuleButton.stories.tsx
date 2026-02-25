import { ReactNode, useState } from 'react';
import { Text, View } from 'react-native';
import { CapsuleButtonFieldProps } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { CapsuleButton as CapsuleButtonComponent } from '../../src/components/CapsuleButton';

type ItemType = { id: number; label: string | ReactNode };

// Type for single select stories
type SingleSelectComponentType = (
	args: CapsuleButtonFieldProps<ItemType, 'id'> & { multiSelect?: false }
) => JSX.Element;

// Type for multi select stories
type MultiSelectComponentType = (args: CapsuleButtonFieldProps<ItemType, 'id'> & { multiSelect: true }) => JSX.Element;

const SingleSelectTemplate: StoryFn<SingleSelectComponentType> = (args) => {
	const [selectedCardId, setSelectedCardId] = useState<number | undefined>();

	return (
		<>
			<View>
				<CapsuleButtonComponent
					{...args}
					multiSelect={false}
					selected={selectedCardId}
					onChange={(id) => {
						setSelectedCardId(id);
					}}
				/>
			</View>
			<Text style={{ marginTop: 10 }}>Selected: {`${selectedCardId ?? 'None'}`}</Text>
		</>
	);
};

const MultiSelectTemplate: StoryFn<MultiSelectComponentType> = (args) => {
	const [selectedCardIds, setSelectedCardIds] = useState<number[] | undefined>();

	return (
		<>
			<View>
				<CapsuleButtonComponent
					{...args}
					multiSelect={true}
					selected={selectedCardIds}
					onChange={(ids) => {
						setSelectedCardIds(ids);
					}}
				/>
			</View>
			<Text style={{ marginTop: 10 }}>Selected: {selectedCardIds?.length ? selectedCardIds.join(', ') : 'None'}</Text>
		</>
	);
};

const StoryMeta: Meta<SingleSelectComponentType> = {
	title: 'Mobile/Components/CapsuleButton',
	component: CapsuleButtonComponent,
	argTypes: {
		size: {
			control: { type: 'select' },
			options: ['small', 'medium', 'large'],
			description: 'Size of the capsule buttons',
		},
		multiSelect: {
			control: { type: 'boolean' },
			description: 'Enable multi-select functionality',
		},
		variant: {
			control: { type: 'select' },
			options: ['gray', 'dark'],
			description: 'Visual variant of the capsule buttons',
		},
		overflowWrap: {
			control: { type: 'select' },
			options: ['wrap', 'no-wrap'],
			description: 'Controls whether buttons wrap or scroll horizontally',
		},
	},
};

export default StoryMeta;

const defaultOptions = [
	{
		id: 1,
		label: <Text style={{ color: 'red' }}>First Capsule Button</Text>,
	},
	{
		id: 2,
		label: 'Testing',
	},
	{
		id: 3,
		label: <Text>normal text</Text>,
	},
	{
		id: 4,
		label: <Text>Testing Second</Text>,
	},
	{
		id: 5,
		label: <Text>normal text Third</Text>,
	},
];

export const SingleSelect: StoryObj<SingleSelectComponentType> = {
	render: SingleSelectTemplate,
	args: {
		options: defaultOptions,
		valueKey: 'id',
		labelKey: 'label',
		size: 'small',
		multiSelect: false,
		variant: 'gray',
	},
};

export const MultiSelect: StoryObj<MultiSelectComponentType> = {
	render: MultiSelectTemplate,
	args: {
		options: defaultOptions,
		labelKey: 'label',
		valueKey: 'id',
		size: 'small',
		multiSelect: true,
		variant: 'gray',
	},
};

export const MultiSelectWithMinWidth: StoryObj<MultiSelectComponentType> = {
	render: MultiSelectTemplate,
	args: {
		options: defaultOptions,
		labelKey: 'label',
		valueKey: 'id',
		size: 'small',
		multiSelect: true,
		variant: 'gray',
		minWidth: 150,
	},
};

// Keep the original story for backward compatibility
export const CapsuleButton: StoryObj<SingleSelectComponentType> = {
	render: SingleSelectTemplate,
	args: {
		options: defaultOptions,
		labelKey: 'label',
		valueKey: 'id',
		size: 'small',
		multiSelect: false,
		variant: 'gray',
	},
};

export const DarkVariant: StoryObj<SingleSelectComponentType> = {
	render: SingleSelectTemplate,
	args: {
		options: defaultOptions,
		labelKey: 'label',
		valueKey: 'id',
		size: 'small',
		multiSelect: false,
		variant: 'dark',
	},
};

const manyOptions = [
	{ id: 1, label: 'Option 1' },
	{ id: 2, label: 'Option 2' },
	{ id: 3, label: 'Option 3' },
	{ id: 4, label: 'Option 4' },
	{ id: 5, label: 'Option 5' },
	{ id: 6, label: 'Option 6' },
	{ id: 7, label: 'Option 7' },
	{ id: 8, label: 'Option 8' },
	{ id: 9, label: 'Option 9' },
	{ id: 10, label: 'Option 10' },
];

export const ScrollableNoWrap: StoryObj<SingleSelectComponentType> = {
	render: SingleSelectTemplate,
	args: {
		options: manyOptions,
		labelKey: 'label',
		valueKey: 'id',
		size: 'small',
		multiSelect: false,
		variant: 'gray',
		overflowWrap: 'no-wrap',
	},
};

export const ScrollableNoWrapMultiSelect: StoryObj<MultiSelectComponentType> = {
	render: MultiSelectTemplate,
	args: {
		options: manyOptions,
		labelKey: 'label',
		valueKey: 'id',
		size: 'small',
		multiSelect: true,
		variant: 'gray',
		overflowWrap: 'no-wrap',
	},
};
