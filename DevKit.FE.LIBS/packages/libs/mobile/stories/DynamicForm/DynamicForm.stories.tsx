import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { IFormSchema, useReactForm } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import Button from '../../src/components/Buttons/Button';
import { DynamicForm, DynamicFormProps } from '../../src/components/DynamicForm';
import { IUserData, getFormSchema } from './form-schema';

type ComponentType = (args: {
	columnsCount: number;
	isEditable: boolean;
	validationMode?: 'zod' | 'yup';
}) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const schema: IFormSchema<IUserData> = getFormSchema(args);

	const form = useReactForm<IUserData>({
		...schema,
		initialValues: schema.initialValues,
		onFormSubmit: async (values) => {
			Alert.alert(
				'Form Submitted',
				`The form has been submitted successfully. Values: \n${JSON.stringify(values, null, 2)}`
			);

			return new Promise((resolve) => setTimeout(resolve, 10000));
		},
		validateBehavior: 'on-submit',
	});

	const formValues = form.watchValues();

	const addCategories = async () => {
		const errors = await form.validateField('userName');

		if (errors) {
			Alert.alert('Validation Errors', JSON.stringify(errors));
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<DynamicForm {...args} form={form} fieldsStructure={schema.fields} />
			<View style={styles.buttonGroup}>
				<Button onPress={form.submitForm} disabled={form.disableSubmit}>
					Submit
				</Button>
				<Button onPress={form.resetForm}>Reset</Button>
				<Button onPress={() => Alert.alert('Test Submit Pressed')}>Test Submit</Button>
			</View>
			<View style={styles.infoContainer}>
				<Text style={styles.infoHeader}>Errors</Text>
				<Text style={styles.infoContent}>{JSON.stringify(form.fieldsErrors, null, 2)}</Text>
				<Text style={styles.infoHeader}>Values</Text>
				<Text style={styles.infoContent}>{JSON.stringify(form.watchValues(), null, 2)}</Text>
			</View>
			<View style={styles.actionGroup}>
				<Button onPress={form.submitForm}>Submit without Disable</Button>
				<Button
					onPress={() => {
						form.setFieldValue('userName', 'values');
						const values = form.getValues();

						Alert.alert('Get Values', JSON.stringify(values));
					}}
				>
					Test Set Then GetValues
				</Button>
				<Button
					onPress={() => {
						form.setFieldValue('userName', 'watch values');
						const values = form.watchValues();

						Alert.alert('Watch Values', JSON.stringify(values));
					}}
				>
					Test Set Then Watch Values
				</Button>
				<Button
					onPress={() => {
						form.setFieldValue('userName', 'outside');

						Alert.alert(JSON.stringify(formValues));
					}}
				>
					Test Set Then Watch Values
				</Button>
				<Button onPress={() => form.setFieldError('userName', 'Test Error')}>Set Error on User name</Button>
				<Button onPress={() => form.setFieldError('userName', undefined)}>Unset Error on User name</Button>
				<Button onPress={addCategories}>Test Validation</Button>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: 'white',
	},
	buttonGroup: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 10,
	},
	infoContainer: {
		marginVertical: 20,
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: 'black',
	},
	infoHeader: {
		fontWeight: 'bold',
		fontSize: 16,
		marginBottom: 5,
	},
	infoContent: {
		backgroundColor: '#f5f5f5',
		padding: 10,
		borderRadius: 4,
	},
	actionGroup: {
		flexDirection: 'column',
		gap: 10,
		marginTop: 20,
	},
});

const StoryMeta: Meta<DynamicFormProps<IUserData>> = {
	title: 'Mobile/Forms/DynamicForm',
	component: DynamicForm,
};

export default StoryMeta;

export const DynamicForms: StoryObj<ComponentType> = {
	render: Template,
	args: {
		columnsCount: 2,
		isEditable: true,
		validationMode: 'yup',
	},
	argTypes: {
		validationMode: {
			options: ['zod', 'yup'],
			control: { type: 'radio' },
		},
	},
};
