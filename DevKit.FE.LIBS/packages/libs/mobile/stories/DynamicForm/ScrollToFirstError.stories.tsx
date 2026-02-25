import React, { useRef } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { z } from 'zod';
import { IFormSchema, mapNumberField, mapTextField, useReactForm } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-webpack5';
import Button from '../../src/components/Buttons/Button';
import { DynamicForm, DynamicFormProps, FormFieldsRefsProvider } from '../../src/components/DynamicForm';
import { ScrollProvider, useScroll, useScrollToFirstError } from '../../src/hooks';

interface IScrollTestFormData {
	field1?: string;
	field2?: string;
	field3?: string;
	field4?: number;
	field5?: string;
	field6?: string;
	field7?: string;
	field8?: number;
	field9?: string;
	field10?: string;
}

const validationSchema = z.object({
	field1: z.string({ required_error: 'Field 1 is required' }).min(1, 'Field 1 is required'),
	field2: z.string({ required_error: 'Field 2 is required' }).min(1, 'Field 2 is required'),
	field3: z.string({ required_error: 'Field 3 is required' }).min(1, 'Field 3 is required'),
	field4: z.number({ required_error: 'Field 4 is required' }).min(18, 'Must be at least 18'),
	field5: z.string({ required_error: 'Field 5 is required' }).min(1, 'Field 5 is required'),
	field6: z.string({ required_error: 'Field 6 is required' }).min(1, 'Field 6 is required'),
	field7: z.string({ required_error: 'Field 7 is required' }).min(1, 'Field 7 is required'),
	field8: z.number({ required_error: 'Field 8 is required' }),
	field9: z.string({ required_error: 'Field 9 is required' }).min(1, 'Field 9 is required'),
	field10: z.string({ required_error: 'Field 10 is required' }).min(1, 'Field 10 is required'),
});

const getFormSchema = (): IFormSchema<IScrollTestFormData> => ({
	initialValues: {},
	validation: validationSchema,
	validationMode: 'zod',
	fields: [
		mapTextField({
			field: 'field1',
			label: 'Field 1 - Name',
			placeholder: 'Enter your name',
			isRequired: true,
		}),
		mapTextField({
			field: 'field2',
			label: 'Field 2 - Email',
			placeholder: 'Enter your email',
			isRequired: true,
		}),
		mapTextField({
			field: 'field3',
			label: 'Field 3 - Address',
			placeholder: 'Enter your address',
			isRequired: true,
		}),
		mapNumberField({
			field: 'field4',
			label: 'Field 4 - Age',
			placeholder: 'Enter your age',
			isRequired: true,
			description: 'Must be at least 18',
		}),
		mapTextField({
			field: 'field5',
			label: 'Field 5 - City',
			placeholder: 'Enter your city',
			isRequired: true,
		}),
		mapTextField({
			field: 'field6',
			label: 'Field 6 - Country',
			placeholder: 'Enter your country',
			isRequired: true,
		}),
		mapTextField({
			field: 'field7',
			label: 'Field 7 - Occupation',
			placeholder: 'Enter your occupation',
			isRequired: true,
		}),
		mapNumberField({
			field: 'field8',
			label: 'Field 8 - Phone',
			placeholder: 'Enter your phone number',
			isRequired: true,
		}),
		mapTextField({
			field: 'field9',
			label: 'Field 9 - Company',
			placeholder: 'Enter your company',
			isRequired: true,
		}),
		mapTextField({
			field: 'field10',
			label: 'Field 10 - Notes',
			placeholder: 'Enter notes',
			isRequired: true,
		}),
	],
});

/**
 * Inner component that uses the scroll context
 */
const ScrollToFirstErrorFormContent = () => {
	const { scrollViewRef, childrenRef } = useScroll();
	const schema = getFormSchema();

	const form = useReactForm<IScrollTestFormData>({
		...schema,
		initialValues: schema.initialValues,
		onFormSubmit: async (values) => {
			Alert.alert('Form Submitted', `Values: \n${JSON.stringify(values, null, 2)}`);
		},
		validateBehavior: 'on-submit',
		onSubmitThrowErrors: true,
	});

	const { scrollToFirstError } = useScrollToFirstError({ form });

	const handleSubmitWithScroll = async () => {
		try {
			await form.submitForm();
		} catch {
			// Scroll to the first field with an error
			scrollToFirstError();
		}
	};

	const handleScrollToFirstError = () => {
		scrollToFirstError();
	};

	return (
		<ScrollView
			ref={scrollViewRef as React.RefObject<ScrollView>}
			contentContainerStyle={styles.scrollContent}
			keyboardShouldPersistTaps="handled"
		>
			<View ref={childrenRef} style={styles.container}>
				<Text style={styles.title}>Scroll to First Error Demo</Text>
				<Text style={styles.description}>
					This story demonstrates the scroll-to-first-error feature. Fill in some fields, leave others empty, and click
					"Submit with Scroll" to see the form scroll to the first field with an error.
				</Text>

				<View style={styles.instructions}>
					<Text style={styles.instructionTitle}>How to test:</Text>
					<Text style={styles.instructionText}>1. Scroll down to the bottom of the form</Text>
					<Text style={styles.instructionText}>2. Fill in the last few fields only</Text>
					<Text style={styles.instructionText}>3. Click "Submit with Scroll"</Text>
					<Text style={styles.instructionText}>4. The form will scroll to the first field with an error</Text>
				</View>

				<DynamicForm form={form} fieldsStructure={schema.fields.slice(0, 5)} columnsCount={1} />

				<DynamicForm form={form} fieldsStructure={schema.fields.slice(5)} columnsCount={1} />

				<View style={styles.buttonGroup}>
					<Button onPress={handleSubmitWithScroll} disabled={form.isSubmitting}>
						Submit with Scroll
					</Button>
					<Button onPress={handleScrollToFirstError} variant="secondary">
						Scroll to First Error
					</Button>
					<Button onPress={form.resetForm} variant="text">
						Reset Form
					</Button>
				</View>

				<View style={styles.infoContainer}>
					<Text style={styles.infoHeader}>Current Errors:</Text>
					<Text style={styles.infoContent}>
						{Object.keys(form.fieldsErrors).length > 0
							? JSON.stringify(form.fieldsErrors, null, 2)
							: 'No errors (submit the form to trigger validation)'}
					</Text>
				</View>

				<View style={styles.spacer} />
			</View>
		</ScrollView>
	);
};

/**
 * Main component wrapped with ScrollProvider
 */
const ScrollToFirstErrorForm = () => {
	return (
		<ScrollProvider>
			<FormFieldsRefsProvider>
				<ScrollToFirstErrorFormContent />
			</FormFieldsRefsProvider>
		</ScrollProvider>
	);
};

const styles = StyleSheet.create({
	scrollContent: {
		flexGrow: 1,
	},
	container: {
		padding: 20,
		backgroundColor: 'white',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
		color: '#333',
	},
	description: {
		fontSize: 14,
		color: '#666',
		marginBottom: 20,
		lineHeight: 20,
	},
	instructions: {
		backgroundColor: '#f0f8ff',
		padding: 15,
		borderRadius: 8,
		marginBottom: 20,
		borderWidth: 1,
		borderColor: '#b0d4f1',
	},
	instructionTitle: {
		fontWeight: 'bold',
		marginBottom: 8,
		color: '#0066cc',
	},
	instructionText: {
		fontSize: 13,
		color: '#444',
		marginBottom: 4,
		paddingLeft: 10,
	},
	buttonGroup: {
		flexDirection: 'column',
		gap: 10,
		marginTop: 20,
		marginBottom: 20,
	},
	infoContainer: {
		marginVertical: 20,
		backgroundColor: '#f9f9f9',
		padding: 15,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#ddd',
	},
	infoHeader: {
		fontWeight: 'bold',
		fontSize: 16,
		marginBottom: 10,
		color: '#333',
	},
	infoContent: {
		backgroundColor: '#fff',
		padding: 10,
		borderRadius: 4,
		fontFamily: 'monospace',
		fontSize: 12,
		color: '#666',
	},
	spacer: {
		height: 100,
	},
});

type ComponentType = () => JSX.Element;

const Template: StoryFn<ComponentType> = () => <ScrollToFirstErrorForm />;

const StoryMeta: Meta<DynamicFormProps<IScrollTestFormData>> = {
	title: 'Mobile/Forms/DynamicForm/ScrollToFirstError',
	component: DynamicForm,
};

export default StoryMeta;

export const Default: StoryObj<ComponentType> = {
	render: Template,
};

export const WithPrefilledData: StoryObj<ComponentType> = {
	render: () => {
		const PrefilledForm = () => {
			return (
				<ScrollProvider>
					<FormFieldsRefsProvider>
						<PrefilledFormContent />
					</FormFieldsRefsProvider>
				</ScrollProvider>
			);
		};

		const PrefilledFormContent = () => {
			const { scrollViewRef, childrenRef } = useScroll();
			const schema = getFormSchema();

			const form = useReactForm<IScrollTestFormData>({
				...schema,
				// Prefill some fields to demonstrate scrolling to a field in the middle
				initialValues: {
					field1: 'John Doe',
					field2: 'john@example.com',
					field3: '123 Main St',
					// field4 is empty - this will be the first error
					field5: 'New York',
					field6: 'USA',
					field7: 'Engineer',
					field8: 1234567890,
					field9: 'Acme Corp',
					field10: 'Some notes',
				},
				onFormSubmit: async (values) => {
					Alert.alert('Form Submitted', `Values: \n${JSON.stringify(values, null, 2)}`);
				},
				validateBehavior: 'on-submit',
				onSubmitThrowErrors: true,
			});

			const { scrollToFirstError } = useScrollToFirstError({ form });

			const handleSubmitWithScroll = async () => {
				try {
					await form.submitForm();
				} catch {
					scrollToFirstError();
				}
			};

			return (
				<ScrollView
					ref={scrollViewRef as React.RefObject<ScrollView>}
					contentContainerStyle={styles.scrollContent}
					keyboardShouldPersistTaps="handled"
				>
					<View ref={childrenRef} style={styles.container}>
						<Text style={styles.title}>Prefilled Form Demo</Text>
						<Text style={styles.description}>
							This form has most fields prefilled except Field 4 (Age). When you submit, it will scroll to Field 4 which
							is the first field with an error.
						</Text>

						<DynamicForm form={form} fieldsStructure={schema.fields} columnsCount={1} />

						<View style={styles.buttonGroup}>
							<Button onPress={handleSubmitWithScroll}>Submit with Scroll</Button>
							<Button onPress={form.resetForm} variant="text">
								Reset Form
							</Button>
						</View>

						<View style={styles.infoContainer}>
							<Text style={styles.infoHeader}>Current Errors:</Text>
							<Text style={styles.infoContent}>
								{Object.keys(form.fieldsErrors).length > 0 ? JSON.stringify(form.fieldsErrors, null, 2) : 'No errors'}
							</Text>
						</View>
					</View>
				</ScrollView>
			);
		};

		return <PrefilledForm />;
	},
};

export const WithMultipleDynamicForms: StoryObj<ComponentType> = {
	render: () => {
		const PrefilledForm = () => {
			return (
				<ScrollProvider>
					<FormFieldsRefsProvider>
						<PrefilledFormContent />
					</FormFieldsRefsProvider>
				</ScrollProvider>
			);
		};

		const PrefilledFormContent = () => {
			const { scrollViewRef, childrenRef } = useScroll();
			const schema = getFormSchema();

			const form = useReactForm<IScrollTestFormData>({
				...schema,
				// Prefill some fields to demonstrate scrolling to a field in the middle
				initialValues: {
					field1: 'John Doe',
					field2: 'john@example.com',
					field3: '123 Main St',
					// field4 is empty - this will be the first error
					field5: 'New York',
					field6: 'USA',
					field7: 'Engineer',
					field8: 1234567890,
					field9: 'Acme Corp',
					field10: 'Some notes',
				},
				onFormSubmit: async (values) => {
					Alert.alert('Form Submitted', `Values: \n${JSON.stringify(values, null, 2)}`);
				},
				validateBehavior: 'on-submit',
				onSubmitThrowErrors: true,
			});

			const { scrollToFirstError } = useScrollToFirstError({ form });

			const handleSubmitWithScroll = async () => {
				try {
					await form.submitForm();
				} catch {
					scrollToFirstError();
				}
			};

			return (
				<ScrollView
					ref={scrollViewRef as React.RefObject<ScrollView>}
					contentContainerStyle={styles.scrollContent}
					keyboardShouldPersistTaps="handled"
				>
					<View ref={childrenRef} style={styles.container}>
						<Text style={styles.title}>Multiple Dynamic Forms Demo</Text>
						<Text style={styles.description}>
							This story demonstrates the scroll-to-first-error feature with multiple dynamic forms. Fill in some
							fields, leave others empty, and click "Submit with Scroll" to see the form scroll to the first field with
							an error.
						</Text>

						<DynamicForm form={form} fieldsStructure={schema.fields} columnsCount={1} />

						<View style={styles.buttonGroup}>
							<Button onPress={handleSubmitWithScroll}>Submit with Scroll</Button>
							<Button onPress={form.resetForm} variant="text">
								Reset Form
							</Button>
						</View>

						<View style={styles.infoContainer}>
							<Text style={styles.infoHeader}>Current Errors:</Text>
							<Text style={styles.infoContent}>
								{Object.keys(form.fieldsErrors).length > 0 ? JSON.stringify(form.fieldsErrors, null, 2) : 'No errors'}
							</Text>
						</View>
					</View>
				</ScrollView>
			);
		};

		return <PrefilledForm />;
	},
};
