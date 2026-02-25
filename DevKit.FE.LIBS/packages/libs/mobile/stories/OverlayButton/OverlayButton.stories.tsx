import { useState } from 'react';
import { Alert, View } from 'react-native';
import {
	AgLine3HorizontalDecrease1Icon,
	ArrowLeftIcon,
	ArrowRightIcon,
	PlusIcon,
	SfArrowDownArrowUpIcon,
	SfCheckmarkIcon,
	SfChevronForwardIcon,
	SfHeartFillIcon,
	SfStarFillIcon,
} from '@devkit/icons/native';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { OverlayButton as OverlayButtonComponent } from '../../src/components/OverlayButton';

type ComponentType = typeof OverlayButtonComponent;

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Forms/OverlayButton',
	component: OverlayButtonComponent,
	args: {
		buttons: [
			{
				text: 'Sort By',
				iconStart: SfArrowDownArrowUpIcon,
				onPress: () => Alert.alert('Sort pressed'),
			},
			{
				text: 'Filter By',
				iconEnd: AgLine3HorizontalDecrease1Icon,
				onPress: () => Alert.alert('Filter pressed'),
			},
		],
		layoutClassName: undefined,
	},
	argTypes: {
		buttons: {
			description:
				'Array of button configurations with text, optional iconStart (icon before text), iconEnd (icon after text), onPress handler, and optional loading/disabled states',
		},
		layoutClassName: {
			control: 'text',
			description: 'Additional Tailwind CSS classes to apply',
		},
	},
	decorators: [
		(Story) => (
			<View
				style={{
					height: '100%',
					backgroundColor: '#f0f0f0',
					position: 'relative',
					width: '100%',
				}}
			>
				<Story />
			</View>
		),
	],
};

export default StoryMeta;

export const Default: StoryObj<ComponentType> = {
	args: {},
};

export const SingleButton: StoryObj<ComponentType> = {
	args: {
		buttons: [
			{
				text: 'Sort By',
				iconStart: SfArrowDownArrowUpIcon,
				onPress: () => Alert.alert('Sort pressed'),
			},
		],
	},
};

export const ThreeButtons: StoryObj<ComponentType> = {
	args: {
		buttons: [
			{
				text: 'Sort',
				iconStart: SfArrowDownArrowUpIcon,
				onPress: () => Alert.alert('Sort pressed'),
			},
			{
				text: 'Filter',
				iconEnd: AgLine3HorizontalDecrease1Icon,
				onPress: () => Alert.alert('Filter pressed'),
			},
			{
				text: 'Add',
				iconStart: PlusIcon,
				onPress: () => Alert.alert('Add pressed'),
			},
		],
	},
};

export const TextOnlyButtons: StoryObj<ComponentType> = {
	args: {
		buttons: [
			{
				text: 'Cancel',
				onPress: () => Alert.alert('Cancel pressed'),
			},
			{
				text: 'Confirm',
				onPress: () => Alert.alert('Confirm pressed'),
			},
		],
	},
};

export const MixedButtons: StoryObj<ComponentType> = {
	args: {
		buttons: [
			{
				text: 'Sort',
				iconStart: SfArrowDownArrowUpIcon,
				onPress: () => Alert.alert('Sort pressed'),
			},
			{
				text: 'Cancel',
				onPress: () => Alert.alert('Cancel pressed'),
			},
			{
				text: 'Add',
				iconEnd: PlusIcon,
				onPress: () => Alert.alert('Add pressed'),
			},
		],
	},
};

export const LoadingAndDisabledStates: StoryObj<ComponentType> = {
	args: {
		buttons: [
			{
				text: 'Loading',
				iconStart: SfArrowDownArrowUpIcon,
				onPress: () => Alert.alert('This should not fire'),
				isLoading: true,
			},
			{
				text: 'Disabled',
				iconEnd: AgLine3HorizontalDecrease1Icon,
				onPress: () => Alert.alert('This should not fire'),
				disabled: true,
			},
			{
				text: 'Normal',
				iconStart: PlusIcon,
				onPress: () => Alert.alert('Normal button pressed'),
			},
		],
	},
};

export const IconStartOnly: StoryObj<ComponentType> = {
	args: {
		buttons: [
			{
				text: 'Save',
				iconStart: SfCheckmarkIcon,
				onPress: () => Alert.alert('Save pressed'),
			},
			{
				text: 'Favorite',
				iconStart: SfHeartFillIcon,
				onPress: () => Alert.alert('Favorite pressed'),
			},
		],
	},
};

export const IconEndOnly: StoryObj<ComponentType> = {
	args: {
		buttons: [
			{
				text: 'Next',
				iconEnd: ArrowRightIcon,
				onPress: () => Alert.alert('Next pressed'),
			},
			{
				text: 'Continue',
				iconEnd: SfChevronForwardIcon,
				onPress: () => Alert.alert('Continue pressed'),
			},
		],
	},
};

export const BothIcons: StoryObj<ComponentType> = {
	args: {
		buttons: [
			{
				text: 'Rate',
				iconStart: SfStarFillIcon,
				iconEnd: SfChevronForwardIcon,
				onPress: () => Alert.alert('Rate pressed'),
			},
			{
				text: 'Navigate',
				iconStart: ArrowLeftIcon,
				iconEnd: ArrowRightIcon,
				onPress: () => Alert.alert('Navigate pressed'),
			},
		],
	},
};

export const MixedIconPositions: StoryObj<ComponentType> = {
	args: {
		buttons: [
			{
				text: 'Back',
				iconStart: ArrowLeftIcon,
				onPress: () => Alert.alert('Back pressed'),
			},
			{
				text: 'Settings',
				onPress: () => Alert.alert('Settings pressed'),
			},
			{
				text: 'Forward',
				iconEnd: ArrowRightIcon,
				onPress: () => Alert.alert('Forward pressed'),
			},
			{
				text: 'Complete',
				iconStart: SfCheckmarkIcon,
				iconEnd: SfChevronForwardIcon,
				onPress: () => Alert.alert('Complete pressed'),
			},
		],
	},
};

// Interactive story with state management
export const AsyncOperationExample = () => {
	const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

	const handleAsyncOperation = async (buttonId: string, operation: string) => {
		setLoadingStates((prev) => ({ ...prev, [buttonId]: true }));

		try {
			// Simulate async operation
			await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));
			Alert.alert(`${operation} completed successfully!`);
		} catch (error) {
			Alert.alert('Operation failed');
		} finally {
			setLoadingStates((prev) => ({ ...prev, [buttonId]: false }));
		}
	};

	const buttons = [
		{
			text: 'Save Data',
			iconStart: PlusIcon,
			onPress: () => handleAsyncOperation('save', 'Save'),
			isLoading: loadingStates.save,
		},
		{
			text: 'Load Data',
			iconEnd: SfArrowDownArrowUpIcon,
			onPress: () => handleAsyncOperation('load', 'Load'),
			isLoading: loadingStates.load,
		},
		{
			text: 'Filter',
			iconStart: AgLine3HorizontalDecrease1Icon,
			onPress: () => handleAsyncOperation('filter', 'Filter'),
			isLoading: loadingStates.filter,
		},
	];

	return (
		<View
			style={{
				height: '100%',
				backgroundColor: '#f0f0f0',
				position: 'relative',
				width: '100%',
			}}
		>
			<OverlayButtonComponent buttons={buttons} />
		</View>
	);
};
