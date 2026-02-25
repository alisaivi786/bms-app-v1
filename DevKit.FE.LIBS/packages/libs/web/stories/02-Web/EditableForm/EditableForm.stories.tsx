import * as Yup from 'yup';
import { IFormSchema, mapDropDown, mapNumberField, mapTextField, useReactForm } from '@devkit/utilities';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { EditableForm as EditableFormComponent, IEditableFormProps } from '../../../src/components/EditableForm';

interface IForm {
	fullNameEn?: string;
	licenseNo?: number;
	cityId?: number;
}
type ComponentType = (args: IEditableFormProps<IForm>) => JSX.Element;

const Template: StoryFn<ComponentType> = (args) => {
	const schema: IFormSchema<IForm> = {
		fields: [
			mapTextField({
				field: 'fullNameEn',
				isEditable: true,
				label: 'Name',
				regex: /^[a-zA-Z0-9-.&\s]*$/,
				maxLength: 150,
			}),
			mapNumberField({
				field: 'licenseNo',
				isEditable: true,
				label: 'License Number',
				regex: /^[0-9]*$/,
				maxLength: 15,
			}),
			mapDropDown({
				field: 'cityId',
				isEditable: true,
				label: 'City',
				options: [
					{ id: 1, name: 'Dubai' },
					{ id: 2, name: 'Ajman' },
					{ id: 3, name: 'Sharjah' },
				],
				valueKey: 'id',
				labelKey: 'name',
				onRenderNoneEditable: ({ value }) => <div className="nj-text-brand">{value}</div>,
			}),
		],
		initialValues: {},
		validation: Yup.object({
			fullNameEn: Yup.string().required('Name is Required'),
			licenseNo: Yup.number().required('License Number').min(10, 'Must be greater that or equal 10'),
		}),
	};
	const form = useReactForm<IForm>({
		initialValues: schema.initialValues,
		validation: schema.validation,
	});

	return (
		<section className="flex flex-col gap-6 h-52">
			<EditableFormComponent {...args} fieldsStructure={schema.fields} form={form} />
			<div>Form Values: {JSON.stringify(form.getValues())}</div>
		</section>
	);
};

const StoryMeta: Meta<IEditableFormProps<IForm>> = {
	title: 'Web/Components/EditableForm',
	component: EditableFormComponent,
};

export default StoryMeta;

export const EditableForm: StoryObj<ComponentType> = {
	render: Template,
	args: {
		columnsCount: 3,
		disabled: false,
	},
};
