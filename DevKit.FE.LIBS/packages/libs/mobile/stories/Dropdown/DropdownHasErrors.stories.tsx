import { Button, StyleSheet, View } from 'react-native';
import { z } from 'zod';
import { DropdownProps, useReactForm } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import Dropdown from '../../src/components/Dropdown/Dropdown';

type ItemType = { id: string; label: string };

type ComponentType = (args: DropdownProps<ItemType, 'label', never, undefined>) => JSX.Element;

const Template: StoryFn<ComponentType> = () => {
	const options: ItemType[] = [
		{ id: '1', label: 'Inpatient' },
		{ id: '2', label: 'Dental' },
		{ id: '3', label: 'Outpatient' },
		{ id: '4', label: 'Inpatient2' },
		{ id: '5', label: 'Dental2' },
		{ id: '6', label: 'Outpatient2' },
	];

	const validationScheme = z.object({
		insurance_type: z.string({ required_error: 'Error message 1' }).min(1, { message: 'Error message 2' }),
	});

	const form = useReactForm<{ insurance_type: string }>({
		initialValues: {
			insurance_type: '',
		},
		validation: validationScheme,
		validationMode: 'zod',
		onFormSubmit: undefined,
		validateBehavior: 'on-submit',
	});

	return (
		<View style={styles.container}>
			<Dropdown
				options={options}
				labelKey="label"
				valueKey="id"
				placeholder="Select an option"
				form={form}
				field="insurance_type"
			/>
			<View style={styles.buttonContainer}>
				<Button
					title="submit"
					onPress={() => {
						form.submitForm();
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		height: '100%',
	},
	buttonContainer: {
		marginTop: 20,
	},
});

const StoryMeta: Meta<ComponentType> = {
	title: 'Mobile/Forms/Inputs/Dropdown',
	render: Template,
};

export default StoryMeta;

export const DropdownHasErrors: StoryObj<DropdownProps<ItemType, 'label', never, undefined>> = {
	args: { label: 'Dropdown', placeholder: 'Please select', onSearch: undefined },
};
