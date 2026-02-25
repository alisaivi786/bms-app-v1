import { FieldValues, FormFieldsSchema, ReactForm } from '@devkit/utilities';
import { Button, ResetButton } from '../Buttons';
import { DynamicForm } from '../DynamicForm';
import { Form } from '../Form';

export interface ISearchFormProps<TFormValues extends FieldValues> {
	/** The Search Form fields object is same as Dynamic Form fields and could be any type of the available field's type a normal TextField, DatePicker, Dropdown, etc. */
	fieldsStructure: FormFieldsSchema<TFormValues>;
	/** Used to pass the form object to handle the field value/validation/submission and more internally by the provided form value, you should be aware if it was added the field value and the onChange function would be ignored! */
	form: ReactForm<TFormValues>;
	/** Submit Button Label */
	submitLabel?: string;
	/** Reset Button Label */
	resetLabel?: string;
	/**	Defines the number of columns to render in each horizontal line and this value will be passed to FormContainer*/
	columnsCount?: number;
}

const SearchForm = <TFormValues extends FieldValues>({
	form,
	fieldsStructure,
	submitLabel = 'Search',
	resetLabel = 'Reset',
	columnsCount = 3,
}: ISearchFormProps<TFormValues>) => {
	return (
		<Form form={form}>
			<div>
				<div className="flex flex-col h-full justify-between p-1 gap-6">
					<DynamicForm form={form} columnsCount={columnsCount} fieldsStructure={fieldsStructure} />
					<div className="flex justify-center gap-8 h-8 items-center">
						<ResetButton variant="secondary">{resetLabel}</ResetButton>
						<Button disabled={form.disableSubmit} onClick={form.submitForm}>
							{submitLabel}
						</Button>
					</div>
				</div>
			</div>
		</Form>
	);
};

export default SearchForm;
