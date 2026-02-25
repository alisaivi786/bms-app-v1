import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { action } from 'storybook/actions';
import { useMobileUIConfigOptions } from '../../src';
import { RadioButton } from '../../src/components/RadioButton';
// @ts-ignore
import visaIcon from './visa-card.png';

type ItemType = {
	id: string;
	label: string;
	disabled?: boolean;
	description?: string;
	widthFull?: boolean;
	hasError?: boolean;
	highlighted?: boolean;
	size: 'large' | 'medium' | 'small' | 'x-small';
	groupName?: string;
};

export default {
	title: 'Mobile/Forms/Inputs/RadioButton',
	component: RadioButton,
};

export const Default = () => {
	const { tw } = useMobileUIConfigOptions();
	const [radioState, setRadioState] = useState<string | number>('');

	const cards: ItemType[] = [
		{
			id: '1',
			label: 'Credit or Debit Card',
			size: 'large',
			highlighted: true,

			description: 'Highlighted Large Radio Button with a Label',
		},
		{
			description: 'Medium Radio Button with a Label',
			id: '2',
			label: 'Medium',
			size: 'medium',
		},
		{
			description: 'Small Radio Button with a Label',
			id: '3',
			label: 'Small',
			size: 'small',
		},
		{
			description: 'X-Small Radio Button with a Label',
			id: '4',
			label: 'X-Small',
			size: 'x-small',
		},
		{
			description: 'Large Radio Button with a Label and Full Width',
			id: '5',
			label: 'Large',
			size: 'large',
			widthFull: true,
		},
		{ id: '6', label: 'Medium', size: 'medium', description: 'Medium Radio Button with a Label and Full Width' },
		{
			id: '7',
			label: 'Small',
			size: 'small',
			description: 'Small Radio Button with a Label and Full Width',
			widthFull: true,
		},
		{
			id: '8',
			label: 'X-Small',
			size: 'x-small',
			description: 'X-Small Radio Button with a Label and Full Width',
			widthFull: true,
		},
		{
			id: '9',
			label: 'Large',
			size: 'large',
			description: 'Large Radio Button with a Label and Full Width',
			widthFull: true,
		},
		{
			id: '10',
			label: 'Medium',
			size: 'medium',
			description: 'Medium Radio Button with a Label and Full Width',
			widthFull: true,
		},
	];

	return (
		<View>
			{cards.map((card, index) => (
				<View key={card.id} style={[tw`flex w-full`]}>
					{card.description && <Text style={[tw` mb-1`]}>{card.description}</Text>}
					<View key={card.id} style={[tw`flex flex-row items-center gap-2`]}>
						<RadioButton
							id={card.id}
							label={card.label}
							value={radioState}
							disabled={card.disabled}
							hasErrors={false}
							onChange={(value) => {
								setRadioState(value ?? '');
								action('onChange')(value);
							}}
							widthFull={card.widthFull}
							size={card.size}
							highlighted={card.highlighted}
						/>
						<View style={{ minWidth: 40, flexShrink: 0 }}>
							<Image source={visaIcon} style={{ width: 20, height: 20, borderRadius: 4 }} />
						</View>
					</View>
				</View>
			))}
		</View>
	);
};

export const WithError = () => {
	const { tw } = useMobileUIConfigOptions();
	const [radioState, setRadioState] = useState<string | number>('');

	const cards: ItemType[] = [
		{ id: '1', label: 'Large', size: 'large' },
		{ id: '2', label: 'Medium', size: 'medium' },
		{ id: '3', label: 'Small', size: 'small' },
		{ id: '4', label: 'X-Small', size: 'x-small' },
		{ id: '5', label: 'Large', size: 'large' },
		{ id: '6', label: 'Medium', size: 'medium' },
		{ id: '7', label: 'Small', size: 'small' },
		{ id: '8', label: 'X-Small', size: 'x-small' },
		{ id: '9', label: 'Large', size: 'large' },
		{ id: '10', label: 'Medium', size: 'medium' },
	];

	return (
		<View>
			{cards.map((card) => (
				<View key={card.id} style={[tw`flex w-full gap-2 mb-4`]}>
					<RadioButton
						id={card.id}
						label={card.label}
						value={radioState}
						hasErrors={true}
						onChange={(value) => {
							setRadioState(value ?? '');
							action('onChange')(value);
						}}
						size={card.size}
						groupName="radio-group-error"
					/>
				</View>
			))}
		</View>
	);
};

export const Disabled = () => {
	const { tw } = useMobileUIConfigOptions();
	const [radioState, setRadioState] = useState<string | number>('');

	const cards: ItemType[] = [
		{ id: '1', label: 'Large', size: 'large', disabled: true },
		{ id: '2', label: 'Medium', size: 'medium', disabled: true },
		{ id: '3', label: 'Small', size: 'small' },
		{ id: '4', label: 'X-Small', size: 'x-small' },
	];

	return (
		<View>
			{cards.map((card) => (
				<View key={card.id} style={[tw`mb-4`]}>
					<View key={card.id} style={[tw`flex w-full flex-row items-center gap-4`]}>
						<RadioButton
							id={card.id}
							label={card.label}
							value={radioState}
							hasErrors={false}
							disabled={card.disabled}
							onChange={(value) => {
								setRadioState(value ?? '');
								action('onChange')(value);
							}}
							size={card.size}
							groupName="radio-group-disabled"
						/>
						<View style={{ minWidth: 40, flexShrink: 0 }}>
							<Image source={visaIcon} style={{ width: 20, height: 20, borderRadius: 4 }} />
						</View>
					</View>
				</View>
			))}
		</View>
	);
};

export const Highlighted = () => {
	const { tw } = useMobileUIConfigOptions();
	const [radioState, setRadioState] = useState<string | number>('');

	const sizes: ('large' | 'medium' | 'small' | 'x-small')[] = ['large', 'medium', 'small', 'x-small'];
	const cards: ItemType[] = [
		{ id: '1', label: 'Large', size: 'large', highlighted: true },
		{ id: '2', label: 'Medium', size: 'medium', highlighted: true },
		{ id: '3', label: 'Small', size: 'small', highlighted: true },
		{ id: '4', label: 'X-Small', size: 'x-small' },
	];

	return (
		<View>
			{cards.map((card) => (
				<View key={card.id} style={[tw`flex w-full gap-2 mb-4`]}>
					<RadioButton
						id={card.id}
						label={card.label}
						value={radioState}
						hasErrors={false}
						highlighted={card.highlighted}
						onChange={(value) => {
							setRadioState(value ?? '');
							action('onChange')(value);
						}}
						size={card.size}
						groupName="radio-group-highlighted"
					/>
				</View>
			))}
		</View>
	);
};

export const RadioButtonWithVeryLongLabel = () => {
	const { tw } = useMobileUIConfigOptions();
	const [radioState, setRadioState] = useState<string | number>('');

	const cards: ItemType[] = [
		{
			id: '1',
			label:
				'This is a very long label for a radio button that should wrap correctly and not overflow the containerThis is a very long label for a radio button that should wrap correctly and not overflow the containerThis is a very long label for a radio button that should wrap correctly and not overflow the containerThis is a very long label for a radio button that should wrap correctly and not overflow the containerThis is a very long label for a radio button that should wrap correctly and not overflow the containerThis is a very long label for a radio button that should wrap correctly and not overflow the containerThis is a very long label for a radio button that should wrap correctly and not overflow the containerThis is a very long label for a radio button that should wrap correctly and not overflow the containerThis is a very long label for a radio button that should wrap correctly and not overflow the containerThis is a very long label for a radio button that should wrap correctly and not overflow the containerThis is a very long label for a radio button that should wrap correctly and not overflow the containerThis is a very long label for a radio button that should wrap correctly and not overflow the container',
			size: 'large',
		},
		{ id: '2', label: 'Short Label', size: 'medium', hasError: true },
	];

	return (
		<View>
			{cards.map((card) => (
				<View key={card.id} style={[tw`flex w-full gap-2`]}>
					<RadioButton
						id={card.id}
						label={card.label}
						value={radioState}
						hasErrors={card.hasError}
						onChange={(value) => {
							setRadioState(value ?? '');
							action('onChange')(value);
						}}
						size={card.size}
					/>
				</View>
			))}
		</View>
	);
};
