import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { action } from 'storybook/actions';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import { JourneyStepper } from '../../src/components/JourneyStepper';
import { FullScreenLayout } from '../../src/layouts/FullScreenLayout';
import { FullScreenLayoutProps } from '../../src/layouts/FullScreenLayout/FullScreenLayout';
import { TextField } from '../../src/components/TextField';

type ComponentType = (args: FullScreenLayoutProps) => JSX.Element;

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 16,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: '#e0e0e0',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 8,
		color: '#333',
	},
	cardText: {
		fontSize: 14,
		color: '#666',
		marginBottom: 12,
	},
	button: {
		backgroundColor: '#007AFF',
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 8,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
	footerButton: {
		backgroundColor: '#007AFF',
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 8,
		alignItems: 'center',
		marginBottom: 8,
	},
	footerText: {
		fontSize: 14,
		color: '#666',
		textAlign: 'center',
	},
});

const SampleContent = () => {
	const [state, setState] = useState<string | undefined>();

	return (
		<View style={{ padding: 16 }}>
			<Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#333' }}>Welcome to the App</Text>
			<View style={styles.card}>
				<Text style={styles.cardTitle}>Feature One</Text>
				<Text style={styles.cardText}>
					Explore our amazing features to enhance your experience. This is a sample card showcasing content.
				</Text>
				<Pressable style={styles.button} onPress={action('Card button clicked')}>
					<Text style={styles.buttonText}>Learn More</Text>
				</Pressable>
			</View>
			<View style={styles.card}>
				<Text style={styles.cardTitle}>Feature Two</Text>
				<Text style={styles.cardText}>
					Another great feature to demonstrate the layout's flexibility with scrollable content.
				</Text>
				<Pressable style={styles.button} onPress={action('Card button clicked')}>
					<Text style={styles.buttonText}>Get Started</Text>
				</Pressable>
			</View>
			<Text style={{ fontSize: 14, color: '#666', marginTop: 16, marginBottom: 16 }}>Scroll down to see more content in this layout.</Text>

			<TextField
				value={state}
				onChange={setState}
				onPaste={(value: string) => {
					const pastedValue = value.replace(/-|\s/g, '');
					const finalValue = pastedValue.startsWith('784') ? pastedValue.substring(3) : pastedValue;

					return finalValue;
				}}
			/>
		</View>
	);
};

const SampleSubHeader = () => (
	<JourneyStepper
		currentStepIndex={1}
		steps={[
			{ title: 'Members' },
			{ title: 'Declaration' },
			{ title: 'Quote' },
			{ title: 'Documents' },
			{ title: 'Payment' },
		]}
	/>
);

const SampleFooter = () => (
	<View style={{ padding: 16, borderTopWidth: 1, borderColor: '#e0e0e0' }}>
		<Pressable style={styles.footerButton} onPress={action('Footer button clicked')}>
			<Text style={styles.buttonText}>Take Action</Text>
		</Pressable>
		<Text style={styles.footerText}>Sample footer content</Text>
	</View>
);

const Template: StoryFn<ComponentType> = (args) => {
	const [isBackDisabled, setIsBackDisabled] = useState(args.isBackButtonDisabled || false);

	return (
		<FullScreenLayout
			{...args}
			isBackButtonDisabled={isBackDisabled}
			onBackPress={() => {
				action('Back pressed')();
				setIsBackDisabled(true); // Simulate state change on back press
			}}
		>
			<SampleContent />
		</FullScreenLayout>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Layout/FullScreenLayout',
	component: Template,
	argTypes: {
		pageTitle: {
			control: 'text',
			defaultValue: 'Sample Page',
			description: 'Title to display in the header',
		},
		isBackButtonDisabled: {
			control: 'boolean',
			defaultValue: false,
			description: 'Whether the back button is disabled',
		},
		subHeader: {
			control: 'boolean',
			defaultValue: false,
			description: 'Optional subheader content to display below the header',
			mapping: {
				true: <SampleSubHeader />,
				false: undefined,
			},
		},
		footer: {
			control: 'boolean',
			defaultValue: false,
			description: 'Optional footer content to display at the bottom of the layout',
			mapping: {
				true: <SampleFooter />,
				false: undefined,
			},
		},
		footerBgColor: {
			control: { type: 'select', options: ['gray', 'white'] },
			defaultValue: 'white',
			description: "Background color for the footer area ('gray' or 'white')",
		},
	},
};

export default StoryMeta;

export const Default = {
	args: {
		pageTitle: 'Default Layout',
	},
};

export const WithFooter = {
	args: {
		pageTitle: 'With Footer',
		footer: true,
		footerBgColor: 'gray',
	},
};

export const WithWhiteFooter = {
	args: {
		pageTitle: 'With White Footer',
		footer: true,
		footerBgColor: 'white',
	},
};

export const WithSubHeader = {
	args: {
		pageTitle: 'With Subheader',
		subHeader: true,
	},
};

export const NoHeader = {
	args: {},
};

export const NoFooter = {
	args: {
		pageTitle: 'No Footer',
	},
};

export const DisabledBackButton = {
	args: {
		pageTitle: 'Disabled Back',
		isBackButtonDisabled: true,
		onBackPress: action('Back pressed'),
	},
};

export const FullConfiguration = {
	args: {
		pageTitle: 'Full Configuration',
		subHeader: true,
		footer: true,
		footerBgColor: 'gray',
		onBackPress: action('Back pressed'),
	},
};
