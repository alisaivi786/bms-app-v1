import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { PlusIcon } from '@devkit/icons/native';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import ButtonComponent from '../../src/components/Buttons/Button';

type ComponentType = typeof ButtonComponent;

const VARIANTS = ['primary', 'iconPrimary', 'secondary', 'iconSecondary', 'text', 'iconText', 'social'] as const;
const SIZES = ['xSmall', 'small', 'medium', 'large'] as const;

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Forms/Button',
	component: ButtonComponent,
	args: {
		children: 'Button',
		variant: 'primary',
		state: undefined,
		disabled: false,
		isLoading: false,
		showOutline: false,
		iconStart: undefined,
		iconEnd: undefined,
		icon: undefined,
		size: undefined,
		textWidth: undefined,
	},
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'iconPrimary', 'secondary', 'iconSecondary', 'text', 'iconText', 'social'],
		},
		state: {
			control: 'select',
			options: ['none', 'danger'],
		},
		size: {
			control: 'select',
			options: ['xSmall', 'small', 'medium', 'large'],
		},
	},
};

export default StoryMeta;

export const Default: StoryObj<ComponentType> = {
	args: {
		children: 'Button label',
		variant: 'primary',
	},
};

export const WithIconStart: StoryObj<ComponentType> = {
	args: {
		children: 'Button label',
		variant: 'primary',
		iconStart: PlusIcon,
	},
};

export const WithIconEnd: StoryObj<ComponentType> = {
	args: {
		children: 'Button label',
		iconEnd: PlusIcon,
	},
};

export const WithBothIcons: StoryObj<ComponentType> = {
	args: {
		children: 'Button label',
		iconStart: PlusIcon,
		iconEnd: PlusIcon,
	},
};

export const Icon: StoryObj<ComponentType> = {
	args: {
		variant: 'iconPrimary',
		size: 'xSmall',
		icon: PlusIcon,
	},
	argTypes: {
		variant: { control: 'select', options: ['iconPrimary', 'iconSecondary', 'iconText'] },
	},
};

export const AllVariantsAndSizes: StoryObj<ComponentType> = {
	render: (args) => (
		<ScrollView style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
			{VARIANTS.map((variant) => (
				<View key={variant} style={{ marginBottom: 16 }}>
					<Text style={{ fontWeight: 'bold', marginBottom: 8 }}>{`Variant: ${variant}`}</Text>
					<View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
						{SIZES.map((size) => {
							// For icon variants, use icon prop, for others use children
							const isIconVariant = variant === 'iconPrimary' || variant === 'iconSecondary' || variant === 'iconText';
							const buttonProps = isIconVariant
								? {
										variant,
										size,
										icon: PlusIcon,
										'aria-label': `${variant} ${size}`,
								  }
								: {
										variant,
										size,
										children: `${variant} ${size}`,
								  };
							return (
								<View key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
									<ButtonComponent {...buttonProps} />
									<Text style={{ fontSize: 12, marginTop: 4 }}>{size}</Text>
								</View>
							);
						})}
					</View>
				</View>
			))}
		</ScrollView>
	),
	args: {},
};
