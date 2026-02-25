'use client';
import { EditPencilIcon } from '@devkit/icons/web';
import {
	ComponentPopoverVariantType,
	FieldValues,
	FormFieldsSchema,
	ReactForm,
	TwLayoutClassName,
} from '@devkit/utilities';
import { useWebUIConfigOptions } from '../../layouts/ThemeProvider/theme-context';
import { Button, LinkButton } from '../Buttons';
import { DynamicForm } from '../DynamicForm';
import { FormLabel } from '../FormLabel';

export type TButton = {
	label: string;
	disabled?: boolean;
	loading?: boolean;
	layoutClassName?: TwLayoutClassName;
	onClick: () => Promise<void> | void;
	variant?: 'primary' | 'secondary';
};

const labelVariant: Record<'field' | 'section', string> = {
	field: 'text-caption1 font-normal',
	section: 'text-paragraph font-bold',
};

export interface IFormFieldWithEdit<IForm extends FieldValues> {
	/** The EditForm fields object could be any type of the available field's type a normal TextField, DatePicker, Dropdown, etc. */
	fieldsStructure: FormFieldsSchema<IForm>;
	/** Used to pass the form object to handle the field value/validation/submission and more internally by the provided form value, you should be aware if it was added the field value and the onChange function would be ignored! */
	form: ReactForm<IForm>;
	/** The initial field label*/
	label: string;
	/** The initial field value*/
	value: string;
	/**
	 * The label of the edit button
	 * @default editLabel : 'EDIT' */
	editLabel?: string;
	/** A boolean value which determine whither the form is open or closed */
	isEditFormOpen: boolean;
	/**  `Callback` function to show the edit form buttons, and the editable fields */
	showEditForm: () => void;
	/**
	 * Used to pass the form buttons array for example: 
	 *buttonGroup={[{ 
							disabled: true;
							loading: false;
							label: 'Cancel',
							variant: 'secondary',
							onClick: () => hideEditForm(),
						},...]} */
	buttonGroup: TButton[];
	/**
	 * Used to determine label/button style
	 */
	variant?: 'field' | 'section';
	/**
	 * If true, the edit button will be hidden
	 */
	hideEdit?: boolean;
	popover?: React.ReactNode | { header: string; description: string };
	popoverVariant?: ComponentPopoverVariantType;
}

/**Is a custom component used to handle Edit operations on any type of field, build above the Dynamic form */
function FormFieldWithEdit<IForm extends FieldValues>({
	fieldsStructure,
	form,
	label,
	value,
	editLabel = 'EDIT',
	buttonGroup,
	isEditFormOpen = false,
	showEditForm,
	variant,
	hideEdit = false,
	popover,
}: IFormFieldWithEdit<IForm>) {
	const { isRtlLocale } = useWebUIConfigOptions();

	return (
		<div className="flex flex-col gap-4">
			<div className={`items-start justify-between gap-2 ${isEditFormOpen ? 'hidden' : 'flex'}`}>
				<div className="flex flex-col items-start gap-1 p-0">
					<div className={`capitalize text-gray-700 ${variant ? labelVariant[variant] : labelVariant.field}`}>
						<FormLabel popover={popover}>{label}</FormLabel>
					</div>
					<div className="font-medium text-paragraph" dir={isRtlLocale ? 'ltr' : ''}>
						{value}
					</div>
				</div>

				{!hideEdit && (
					<LinkButton
						text={editLabel}
						icon={EditPencilIcon}
						onClick={() => {
							showEditForm();
						}}
						iconPosition="start"
					/>
				)}
			</div>

			<div className={`flex-col gap-4 ${isEditFormOpen ? 'flex' : 'hidden'}`}>
				<DynamicForm form={form} fieldsStructure={fieldsStructure} />
				<div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-end">
					{buttonGroup.map((button) => (
						<Button
							key={button.label}
							layoutClassName={button?.layoutClassName}
							onClick={button.onClick}
							disabled={button.disabled}
							isLoading={button.loading}
							variant={button.variant}
						>
							{button.label}
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}

export default FormFieldWithEdit;
