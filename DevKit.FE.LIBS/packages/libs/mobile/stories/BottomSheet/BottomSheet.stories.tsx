import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { BottomSheet } from '../../src/components/BottomSheet';
import { Button } from '../../src/components/Buttons';
import { useMobileUIConfigOptions } from '../../src/layouts/ThemeProvider/theme-context';

const BasicBottomSheetModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
	const { tw } = useMobileUIConfigOptions();

	const footerComponent = (
		<View style={tw`bg-white shadow-lg p-4`}>
			<Button onPress={onClose}>Close</Button>
		</View>
	);

	return (
		<BottomSheet
			isOpen={isOpen}
			onClose={onClose}
			title={'Basic Bottom Sheet'}
			footer={footerComponent}
			enableDynamicSizing={true}
		>
			<View>
				<Text style={tw`text-body mb-4`}>This is a basic example of the BottomSheet component.</Text>
				<Text style={tw`text-paragraph mb-4`}>
					You can customize the content, header, and footer according to your needs.
				</Text>
				<Text style={tw`text-paragraph`}>For more complex examples, check out the separate story files:</Text>
				<Text style={tw`text-paragraph mt-2`}>• FamilyInsuranceSteps.stories.tsx</Text>
				<Text style={tw`text-paragraph`}>• ChooseIDType.stories.tsx</Text>
			</View>
		</BottomSheet>
	);
};

const meta: Meta<typeof BottomSheet> = {
	title: 'Mobile/Components/BottomSheet',
	component: BottomSheet,
	parameters: {
		docs: {
			description: {
				component:
					'A flexible BottomSheet component with sticky header and footer support. For complex examples, see separate story files.',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

const BasicBottomSheetWrapper = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => setIsOpen(false);

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
			<Button onPress={() => setIsOpen(true)}>Open Basic Bottom Sheet</Button>
			<BasicBottomSheetModal isOpen={isOpen} onClose={handleClose} />
		</View>
	);
};

export const Basic: Story = {
	render: () => <BasicBottomSheetWrapper />,
	parameters: {
		docs: {
			description: {
				story: 'A basic BottomSheet example with header, content, and footer.',
			},
		},
	},
};

const WithOutCloseButtonWrapper = () => {
	const { tw } = useMobileUIConfigOptions();
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => setIsOpen(false);

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
			<Button onPress={() => setIsOpen(true)}>Open Bottom Sheet without Close Button</Button>
			<BottomSheet
				isOpen={isOpen}
				onClose={handleClose}
				title="Bottom Sheet without Close Button"
				subTitle="This example shows the built-in close button"
				hideCloseButton={true}
				enableDynamicSizing={true}
				nonScrollable={true}
			>
				<View>
					<Text style={tw`text-body mb-4`}>This BottomSheet has a built-in close button in the header.</Text>
					<Text style={tw`text-paragraph mb-4`}>
						The close button can be shown or hidden using the `hideCloseButton` prop.
					</Text>
					<Text>Click the close button (×) in the top right corner to dismiss this bottom sheet.</Text>
				</View>
			</BottomSheet>
		</View>
	);
};

export const WithOutCloseButton: Story = {
	render: () => <WithOutCloseButtonWrapper />,
	parameters: {
		docs: {
			description: {
				story: 'A BottomSheet with the built-in close button enabled using hideCloseButton={true}.',
			},
		},
	},
};

// Sample data for FlashList
type ListItem = {
	id: string;
	title: string;
	description: string;
};

const generateSampleData = (count: number, startIndex: number = 0): ListItem[] => {
	return Array.from({ length: count }, (_, index) => ({
		id: `item-${startIndex + index}`,
		title: `Item ${startIndex + index + 1}`,
		description: `This is a description for item ${
			startIndex + index + 1
		}. FlashList efficiently recycles views for better performance.`,
	}));
};

const WithFlashListWrapper = () => {
	const { tw } = useMobileUIConfigOptions();
	const [isOpen, setIsOpen] = useState(false);
	const [data, setData] = useState(() => generateSampleData(20));
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	const handleClose = () => setIsOpen(false);

	const loadMore = () => {
		if (isLoadingMore || data.length >= 1000) return;

		setIsLoadingMore(true);

		// Simulate loading delay
		setTimeout(() => {
			const currentCount = data.length;
			const itemsToAdd = Math.min(20, 1000 - currentCount);
			const newItems = generateSampleData(itemsToAdd, currentCount);
			setData((prevData) => [...prevData, ...newItems]);
			setIsLoadingMore(false);
		}, 500);
	};

	const renderItem = ({ item, index }: { item: ListItem; index: number }) => (
		<TouchableOpacity
			style={tw`p-4 border-b border-gray-200 bg-white active:bg-gray-50`}
			onPress={() => {
				console.log('Item pressed:', item.title);
			}}
		>
			<View style={tw`flex-row items-center justify-between`}>
				<View style={tw`flex-1`}>
					<Text style={tw`text-body font-semibold mb-1`}>{item.title}</Text>
					<Text style={tw`text-paragraph text-gray-600`}>{item.description}</Text>
				</View>
				<Text style={tw`text-caption text-gray-400 ml-2`}>#{index + 1}</Text>
			</View>
		</TouchableOpacity>
	);

	const footerComponent = (
		<View style={tw`bg-white shadow-lg p-4 border-t border-gray-200`}>
			<Text style={tw`text-caption text-gray-500 text-center mb-2`}>
				Showing {data.length} of 1000 items with FlashList
				{isLoadingMore && ' (Loading more...)'}
			</Text>
			<Button onPress={handleClose}>Close</Button>
		</View>
	);

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
			<Button onPress={() => setIsOpen(true)}>Open Bottom Sheet with FlashList</Button>
			<BottomSheet
				isOpen={isOpen}
				onClose={handleClose}
				title="FlashList Example"
				subTitle="Efficiently renders large lists"
				description={
					<Text style={tw`text-paragraph text-gray-600`}>
						This example demonstrates using FlashList within a BottomSheet for optimal performance with large datasets.
					</Text>
				}
				footer={footerComponent}
				flashListProps={{
					data,
					renderItem,
					keyExtractor: (item) => item.id,
					onEndReached: loadMore,
					onEndReachedThreshold: 0.5,
				}}
				snapPoints={['50%', '90%']}
				enableDynamicSizing={false}
			/>
		</View>
	);
};

export const WithFlashList: Story = {
	render: () => <WithFlashListWrapper />,
	parameters: {
		docs: {
			description: {
				story:
					'A BottomSheet with FlashList integration for rendering large lists efficiently. FlashList recycles views to provide better performance than standard FlatList.',
			},
		},
	},
};
