import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { Collapsible, CollapsibleProps } from '../../src/components/Collapsible';

type ComponentType = (args: CollapsibleProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<View>
			{args.items && <Collapsible {...args} />}

			{args.children && (
				<View>
					<Button onPress={() => setIsOpen(!isOpen)} title="Toggle Collapsible" />
					<View>
						<Collapsible {...args} open={isOpen} />
					</View>
				</View>
			)}
		</View>
	);
};

const CollapsibleMeta: Meta<ComponentType> = {
	title: 'Mobile/Components/Collapsible',
	component: Collapsible,
	render: Template,
};

export default CollapsibleMeta;

export const _1Default: StoryObj<typeof Collapsible> = {
	args: {
		items: [
			{
				title: 'First Item',
				content: <Text>Hello there, the content of the collapsible here is just a simple string.</Text>,
			},
			{
				title: 'Second Item',
				content: (
					<View>
						<Text>The content here is JSX element</Text>
						<Button title="Button" />
					</View>
				),
			},
			{
				title: 'Third Item',
				content: (
					<View>
						<Text>The content here is JSX element with just text</Text>
					</View>
				),
			},
		],
	},
};

export const _2ControlledCollapsible: StoryObj<typeof Collapsible> = {
	render: () => {
		const ControlledCollapsible = () => {
			const [openedItems, setOpenedItems] = useState<number[]>([]);

			return (
				<View>
					<Button
						onPress={() => {
							if (openedItems.includes(0)) {
								setOpenedItems(openedItems.filter((item) => item !== 0));
							} else {
								setOpenedItems([...openedItems, 0]);
							}
						}}
						title="Toggle First Item"
					/>
					<Button
						onPress={() => {
							if (openedItems.includes(1)) {
								setOpenedItems(openedItems.filter((item) => item !== 1));
							} else {
								setOpenedItems([...openedItems, 1]);
							}
						}}
						title="Toggle Second Item"
					/>

					<Collapsible
						items={[
							{
								title: 'First Controlled Item',
								content: <Text>Hello there, the content of the collapsible here is just a simple string.</Text>,
								open: openedItems.includes(0),
							},
							{
								title: 'Second Controlled Item',
								content: (
									<View>
										<Text>The content here is JSX element</Text>
										<Button title="Button" />
									</View>
								),
								open: openedItems.includes(1),
							},
						]}
					/>
				</View>
			);
		};

		return <ControlledCollapsible />;
	},
};

export const _3CollapsibleWithChildren: StoryObj<typeof Collapsible> = {
	args: {
		children: (
			<View style={{ padding: 10, backgroundColor: 'lightgray' }}>
				<Text>This is the content of the collapsible controlled from outside the component</Text>
			</View>
		),
	},
};
