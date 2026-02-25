import { useState } from 'react';
import { View } from 'react-native';
import { FieldValues } from '@devkit/utilities';
import { action } from 'storybook/actions';
import { useMobileUIConfigOptions } from '../../src';
import { RadioButtonGroup } from '../../src/components/RadioButton/RadioButtonGroup';

type ItemType = {
	id: string;
	label: string;
	highlighted?: boolean;
};

export default {
	title: 'Mobile/Forms/Inputs/RadioButtonGroup',
	component: RadioButtonGroup,
	parameters: {
		// layout: 'centered',
	},
};

export const Default = () => {
	const { tw } = useMobileUIConfigOptions();
	const [radioState, setRadioState] = useState<string | number>('');

	const cards: ItemType[] = [
		{ id: '1', label: 'Dog', highlighted: true },
		{ id: '2', label: 'Cat' },
		{ id: '3', label: 'Parrot' },
		{ id: '4', label: 'Hamster' },
		{ id: '5', label: 'Goldfish' },
		{ id: '6', label: 'Rabbit' },
		{ id: '7', label: 'Turtle' },
		{ id: '8', label: 'Guinea Pig' },
		{ id: '9', label: 'Ferret' },
		{ id: '10', label: 'Lizard' },
	];

	return (
		<View style={[tw`bg-white`]}>
			<RadioButtonGroup
				label="Choose a Pet"
				options={cards}
				value={radioState}
				onChange={(value) => {
					setRadioState(value ?? '');
					action('onChange')(value);
				}}
				hasErrors={false}
				size="medium"
				columnsCount={2}
			/>
		</View>
	);
};

export const TwoColumns = () => {
	const { tw } = useMobileUIConfigOptions();
	const [radioState, setRadioState] = useState<string | number>('');

	const cards: ItemType[] = [
		{ id: '1', label: 'Dog' },
		{ id: '2', label: 'Cat' },
		{ id: '3', label: 'Parrot' },
		{ id: '4', label: 'Hamster' },
		{ id: '5', label: 'Goldfish' },
		{ id: '6', label: 'Rabbit' },
		{ id: '7', label: 'Turtle' },
		{ id: '8', label: 'Guinea Pig' },
		{ id: '9', label: 'Ferret' },
		{ id: '10', label: 'Lizard' },
	];

	return (
		<View style={[tw`bg-white`]}>
			<RadioButtonGroup
				label="Choose a Pet"
				options={cards}
				value={radioState}
				onChange={(value) => {
					setRadioState(value ?? '');
					action('onChange')(value);
				}}
				hasErrors={false}
				size="large"
				columnsCount={2}
			/>
		</View>
	);
};

export const WithError = () => {
	const { tw } = useMobileUIConfigOptions();
	const [radioState, setRadioState] = useState<string | number>('');

	const cards: ItemType[] = [
		{ id: '1', label: 'Dog' },
		{ id: '2', label: 'Cat' },
		{ id: '3', label: 'Parrot' },
		{ id: '4', label: 'Hamster' },
		{ id: '5', label: 'Goldfish' },
		{ id: '6', label: 'Rabbit' },
		{ id: '7', label: 'Turtle' },
		{ id: '8', label: 'Guinea Pig' },
		{ id: '9', label: 'Ferret' },
		{ id: '10', label: 'Lizard' },
	];

	return (
		<View style={[tw`bg-white`]}>
			<RadioButtonGroup
				label="Choose a Pet"
				options={cards}
				value={radioState}
				onChange={(value) => {
					setRadioState(value ?? '');
					action('onChange')(value);
				}}
				hasErrors={true}
				errors={['Please select a pet']}
				size="medium"
				columnsCount={1}
			/>
		</View>
	);
};
