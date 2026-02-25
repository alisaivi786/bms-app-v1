import clsx from 'clsx';
import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { z } from 'zod';
import { SfCatFillIcon, SfDogFillIcon } from '@devkit/icons/native';
import { useReactForm } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import { RadioCard, RadioCardProps } from '../../src/components/RadioCard';

type ItemType = {
	id: string;
	label: string;
	iconStart?: React.FC<React.SVGProps<SVGSVGElement>>;
	className?: string;
	center?: boolean;
	placeholder?: string;
};

type ComponentType = (args: RadioCardProps) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const [radioCardState, setRadioCardState] = useState<string | number>('');

	const cards: ItemType[] = [
		{
			id: '1',
			label: 'Dog',
			iconStart: SfDogFillIcon,
			className: clsx('border-0 items-start px-0 py-2.5'),
		},
		{
			id: '2',
			label: 'Cat',
			iconStart: SfCatFillIcon,
			className: clsx('border-0 items-start px-0 py-2.5'),
		},
	];

    const validationScheme = z.object({
        reason: z
            .string({ required_error: 'Error message' })
            .min(1, { message: 'Error message' })
    });

    const form = useReactForm<{ reason: string }>({
        initialValues: {
            reason: '',
        },
        validation: validationScheme,
        validationMode: 'zod',
        onFormSubmit: undefined,
        validateBehavior: 'on-submit',
    });

	return (
		<View>
			<RadioCard
				{...args}
				cards={cards}
				form={form}
				field="reason"
				popoverVariant="light"
				value={radioCardState}
				onChange={(value) => {
					setRadioCardState(value ?? '');
				}}
			/>
			<View style={{ marginTop: 20 }}>
				<Button title="submit" onPress={form.submitForm} />
			</View>
		</View>
	);
};

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Forms/Inputs/RadioCard',
	render: Template,
};

export default StoryMeta;

export const RadioCardHasErrors: StoryObj<RadioCardProps> = {
	args: { label: 'RadioCard', isRequired: true, hasErrors: false },
};
